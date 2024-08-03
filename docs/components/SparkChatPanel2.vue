<template>
  <div class="fullscreen-chat">
    <div ref="messagesContainer" class="messages-container">
      <div v-for="(message, index) in messages" :key="index" :class="['message', { 'user-message': message.isUser }]">
        <img :src="message.isUser ? '/logo.png' : '/czzs.png'" :alt="message.isUser ? 'User Avatar' : 'AI Avatar'" class="message-avatar">
        <div class="message-content">
          {{ message.content }}
        </div>
      </div>
      <div v-if="isLoading" class="message">
        <img src="/czzs.png" alt="AI Avatar" class="message-avatar">
        <div class="message-content loading-animation">
          <div class="dot"></div>
          <div class="dot"></div>
          <div class="dot"></div>
        </div>
      </div>
    </div>
    <div class="input-container">
      <input v-model="userInput" @keyup.enter="sendMessage" placeholder="请输入您的问题..." :disabled="isLoading" />
      <button @click="sendMessage" :disabled="isLoading">发送</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSparkChat } from './SparkChatLogic'

const {
    userInput,
    messages,
    messagesContainer,
    sendMessage: originalSendMessage,
    isLoading
} = useSparkChat()

// 修改发送消息的函数以清空输入框
const sendMessage = () => {
    originalSendMessage()
    userInput.value = ''  // 清空输入框
}

onMounted(() => {
    // 在组件挂载后，可以添加一些初始化逻辑
    // 例如，可以在这里添加一个欢迎消息
    messages.value.push({
        content: "欢迎来到全屏对话模式！我是橙子助手，有什么可以帮助您的吗？",
        isUser: false
    })
})
</script>

<style scoped>
.VPDoc .content main img {
  margin: unset;
}
.messages-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: white;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 20px;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  margin-left: 15px;
  padding: 10px 15px;
  border-radius: 18px;
  max-width: 70%;
  word-wrap: break-word;
  font-size: 16px;
  line-height: 1.5;
}

.user-message {
  flex-direction: row-reverse;
}

.user-message .message-content {
  margin-left: 0;
  margin-right: 15px;
  background: linear-gradient(145deg, #ffbb00, #d8a20d);
  color: white;
}

.message:not(.user-message) .message-content {
  background-color: #e9ecef;
  color: #343a40;
}

.input-container {
  display: flex;
  padding: 20px;
  background-color: #e9ecef;
  border-top: 1px solid #dee2e6;
}

.input-container input {
  flex-grow: 1;
  margin-right: 15px;
  padding: 12px;
  border: 1px solid #ced4da;
  border-radius: 25px;
  font-size: 16px;
}

.input-container button {
  padding: 10px 20px;
  background: linear-gradient(145deg, #ffbb00, #d8a20d);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  font-size: 16px;
  transition: all 0.3s ease;
}

.input-container button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.loading-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 24px;
}

.dot {
  width: 8px;
  height: 8px;
  background-color: #ffbb00;
  border-radius: 50%;
  margin: 0 4px;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% { 
    transform: scale(0);
  } 40% { 
    transform: scale(1.0);
  }
}

.input-container input:disabled,
.input-container button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .message-content {
    max-width: 85%;
  }

  .input-container {
    padding: 15px;
  }

  .input-container input {
    font-size: 14px;
  }

  .input-container button {
    font-size: 14px;
    padding: 8px 16px;
  }
}
</style>