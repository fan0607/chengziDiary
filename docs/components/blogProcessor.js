// blogProcessor.js
import { marked } from 'marked';
import { removeStopwords } from 'stopword';


let blogDatabase = {};

export function processBlogPost(id, title, content) {
    const plainText = marked.parse(content, { gfm: true });
    const words = plainText.toLowerCase().match(/\b(\w+)\b/g);
    const keywordText = removeStopwords(words).join(' ');
    
    blogDatabase[id] = {
        title,
        content: plainText,
        keywords: keywordText
    };
}
// processBlogPost(1, "Introduction to JavaScript", "JavaScript is a programming language...");
// processBlogPost(2, "React Hooks Explained", "React Hooks are a new addition in React 16.8...");
export function searchRelevantContent(query) {
    const queryWords = removeStopwords(query.toLowerCase().split(' '));
    let bestMatch = { id: null, score: 0 };

    for (const [id, post] of Object.entries(blogDatabase)) {
        const score = queryWords.filter(word => post.keywords.includes(word)).length;
        if (score > bestMatch.score) {
            bestMatch = { id, score };
        }
    }

    if (bestMatch.id) {
        const post = blogDatabase[bestMatch.id];
        return `Title: ${post.title}\n\nExcerpt: ${post.content.substring(0, 200)}...`;
    }

    return null;
}
