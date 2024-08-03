// SparkAPIClient.js
import CryptoJS from 'crypto-js'
import { searchRelevantContent } from './blogProcessor.js';

const APPID = 'cf516420'
const API_SECRET = 'OTNiNjMwOGNhMDQ4NzQ4MGE3YjhiNzY2'
const API_KEY = '134631ce98a328390cd8d8bd6605aa5b'
// const GPT_URL = 'wss://spark-api.xf-yun.com/v3.5/chat'
const GPT_URL = 'wss://spark-api.xf-yun.com/v4.0/chat'


function createUrl() {
    const host = new URL(GPT_URL).host;
    const path = new URL(GPT_URL).pathname;
    const date = new Date().toUTCString();
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET ${path} HTTP/1.1`;
    const signatureSha = CryptoJS.HmacSHA256(signatureOrigin, API_SECRET);
    const signature = CryptoJS.enc.Base64.stringify(signatureSha);
    const authorizationOrigin = `api_key="${API_KEY}", algorithm="hmac-sha256", headers="host date request-line", signature="${signature}"`;
    const authorization = btoa(authorizationOrigin);
  
    const url = new URL(GPT_URL);
    url.searchParams.append('authorization', authorization);
    url.searchParams.append('date', date);
    url.searchParams.append('host', host);
  
    return url.toString();
}

export function connectToSparkAPI(query, instructions) {
    return new Promise((resolve, reject) => {
        let url;
        try {
            url = createUrl();
        } catch (error) {
            reject(error);
            return;
        }

        const relevantContent = searchRelevantContent(query);
        const enhancedInstructions = relevantContent
            ? `${instructions}\n\nRelevant blog content: ${relevantContent}`
            : instructions;

        const ws = new WebSocket(url);
        let responseText = '';

        ws.onopen = () => {
            console.log('WebSocket connection opened');
            const data = {
                header: { app_id: APPID },
                // parameter: { chat: { domain: "generalv3.5", temperature: 1.0, max_tokens: 4096 } },
                parameter: { chat: { domain: "4.0Ultra", temperature: 1.0, max_tokens: 4096 } },
                payload: { 
                    message: { 
                        text: [
                            { role: "system", content: enhancedInstructions },
                            { role: "user", content: query }
                        ] 
                    } 
                }
            };
            ws.send(JSON.stringify(data));
        };

        ws.onmessage = (event) => {
            const response = JSON.parse(event.data);
            if (response.header.code !== 0) {
                console.error(`Error: ${response.header.code} - ${response.header.message}`);
                ws.close();
                reject(new Error(response.header.message));
                return;
            }

            const content = response.payload.choices.text[0].content;
            responseText += content;
            if (response.header.status === 2) {
                ws.close();
                resolve(responseText);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket Error:', error);
            reject(error);
        };

        ws.onclose = (event) => {
            if (!event.wasClean) {
                console.error(`WebSocket connection closed unexpectedly. Code: ${event.code}, Reason: ${event.reason}`);
                reject(new Error('WebSocket connection closed unexpectedly'));
            }
        };
    });
}