<template>
  <div>
    <button @click="togglePanel" class="chat-toggle-btn">
      {{ isOpen ? '关闭聊天' : '打开聊天' }}
    </button>

    <div v-if="isOpen" class="chat-panel">
      <div class="chat-header">
        <h3>橙子助手</h3>
      </div>
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

    <div v-if="showInstructions" class="instructions-panel">
      <h4>AI助手指令</h4>
      <textarea v-model="instructions" rows="4"></textarea>
      <button @click="updateInstructions">更新指令</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useSparkChat } from './SparkChatLogic'

const {
    isOpen,
    userInput,
    messages,
    messagesContainer,
    instructions,
    togglePanel,
    sendMessage: originalSendMessage,
    setInstructions,
    isLoading
} = useSparkChat()

const showInstructions = ref(false)

const updateInstructions = () => {
    setInstructions(instructions.value)
    showInstructions.value = false
}

// 修改发送消息的函数以清空输入框
const sendMessage = () => {
    originalSendMessage()
    userInput.value = ''  // 清空输入框
}
</script>

<style scoped>
.chat-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background: linear-gradient(145deg, #ffbb00, #d8a20d);
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.chat-toggle-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

.chat-panel {
  position: fixed;
  bottom: 80px;
  right: 20px;
  width: 350px;
  height: 480px;
  background-color: #f8f9fa;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #f1f3f5;
  border-bottom: 1px solid #dee2e6;
}

.chat-header h3 {
  margin-left: 10px;
  font-size: 18px;
  color: #343a40;
}

.messages-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: white;
}

.message {
  display: flex;
  align-items: flex-start;
  margin-bottom: 15px;
}

.message-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  margin-left: 10px;
  padding: 8px 12px;
  border-radius: 18px;
  max-width: calc(100% - 50px);
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.4;
}

.user-message {
  flex-direction: row-reverse;
}

.user-message .message-content {
  margin-left: 0;
  margin-right: 10px;
  background: linear-gradient(145deg, #ffbb00, #d8a20d);
  color: white;
}

.message:not(.user-message) .message-content {
  background-color: #e9ecef;
  color: #343a40;
}

.input-container {
  display: flex;
  padding: 12px;
  background-color: #e9ecef;
  border-top: 1px solid #dee2e6;
}

.input-container input {
  flex-grow: 1;
  margin-right: 10px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 14px;
}

.input-container button {
  padding: 8px 16px;
  background: linear-gradient(145deg, #ffbb00, #d8a20d);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.input-container button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.instructions-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
  z-index: 1000;
  max-width: 300px;
}

.instructions-panel h4 {
  margin-top: 0;
  color: #343a40;
}

.instructions-panel textarea {
  width: 100%;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 8px;
  resize: vertical;
}

.instructions-panel button {
  padding: 8px 16px;
  background: linear-gradient(145deg, #28a745, #218838);
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.instructions-panel button:hover {
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
  .chat-panel {
    width: 90%;
    height: 70vh;
    left: 5%;
    right: 5%;
    bottom: 70px;
  }

  .chat-toggle-btn {
    left: 20px;
    right: auto;
  }

  .instructions-panel {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}
</style>