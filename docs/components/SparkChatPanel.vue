<template>
    <div>
        <button @click="togglePanel" class="chat-toggle-btn">
            {{ isOpen ? '关闭聊天' : '打开聊天' }}
        </button>

        <div v-if="isOpen" class="chat-panel">
            <div ref="messagesContainer" class="messages-container">
                <div v-for="(message, index) in messages" :key="index" :class="['message', { 'user-message': message.isUser }]">
                    {{ message.content }}
                </div>
            </div>
            <div class="input-container">
                <input v-model="userInput" @keyup.enter="sendMessage" placeholder="请输入您的问题..." />
                <button @click="sendMessage">发送</button>
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
    sendMessage,
    setInstructions
} = useSparkChat()

const showInstructions = ref(false)

const updateInstructions = () => {
    setInstructions(instructions.value)
    showInstructions.value = false
}
</script>

<style scoped>
.chat-toggle-btn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

.chat-panel {
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 300px;
    height: 400px;
    background-color: white;
    border: 1px solid #ccc;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
}

.messages-container {
    flex-grow: 1;
    overflow-y: auto;
    padding: 10px;
}

.message {
    margin-bottom: 10px;
    padding: 5px 10px;
    border-radius: 5px;
    background-color: #f0f0f0;
}

.user-message {
    background-color: #007bff;
    color: white;
    align-self: flex-end;
}

.input-container {
    display: flex;
    padding: 10px;
}

.input-container input {
    flex-grow: 1;
    margin-right: 10px;
    padding: 5px;
}

.input-container button {
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 3px;
    cursor: pointer;
}

.instructions-panel {
    position: fixed;
    top: 20px;
    right: 20px;
    background-color: white;
    padding: 15px;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.1);
    z-index: 1000;
}

.instructions-panel textarea {
    width: 100%;
    margin-bottom: 10px;
}
</style>
<style scoped>
.chat-toggle-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 12px 24px;
  background: linear-gradient(145deg, #007bff, #0056b3);
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
  width: 320px;
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

.messages-container {
  flex-grow: 1;
  overflow-y: auto;
  padding: 15px;
  background-color: white;
}

.message {
  margin-bottom: 12px;
  padding: 8px 12px;
  border-radius: 18px;
  max-width: 80%;
  word-wrap: break-word;
  font-size: 14px;
  line-height: 1.4;
}

.user-message {
  background: linear-gradient(145deg, #007bff, #0056b3);
  color: white;
  align-self: flex-end;
  margin-left: auto;
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
  background: linear-gradient(145deg, #007bff, #0056b3);
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