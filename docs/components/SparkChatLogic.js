// SparkChatLogic.js
import { ref, reactive, nextTick } from 'vue'
import { connectToSparkAPI } from './SparkAPIClient'

// Example usage
import { processBlogPost } from './blogProcessor.js';

export function useSparkChat() {
    const isOpen = ref(false)
    const userInput = ref('')
    const messages = reactive([
        { content: "hello啊！", isUser: false },
    ])
    const messagesContainer = ref(null)
    const instructions = ref(`
        你是一个橙子的助手,为博客提供帮助。这个博客是关于橙子的生活和coding的一些记录。主要包含WebGL,Three.js,Cesium,Leaflet,shader等内容。
        请提供有用且简洁的回答,与博客内容相关。
        说话可以风趣一些。
        如果有人问你橙子是谁，你记住是博客的主人，不是一种水果，当别人问橙子是什么的时候，你可以说是一种水果。
        请对橙子保持尊敬。
        如果被问到博客未涵盖的主题,请礼貌地建议查看博客以获取更多信息,或询问是否需要该主题的一般信息。
        `)


    const togglePanel = () => {
        isOpen.value = !isOpen.value
    }

    const sendMessage = async () => {
        if (userInput.value.trim()) {
            messages.push({
                content: userInput.value,
                isUser: true
            })

            try {
                const response = await connectToSparkAPI(userInput.value, instructions.value)
                messages.push({
                    content: response,
                    isUser: false
                })
            } catch (error) {
                console.error('连接Spark API时出错:', error)
                messages.push({
                    content: "抱歉,我遇到了一些问题。请稍后再试。",
                    isUser: false
                })
            }

            userInput.value = ''
            scrollToBottom()
        }
    }

    const scrollToBottom = () => {
        nextTick(() => {
            if (messagesContainer.value) {
                messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
            }
        })
    }

    const setInstructions = (newInstructions) => {
        instructions.value = newInstructions
    }

    return {
        isOpen,
        userInput,
        messages,
        messagesContainer,
        instructions,
        togglePanel,
        sendMessage,
        scrollToBottom,
        setInstructions
    }
}