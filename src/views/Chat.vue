<template>
  <div class="page-container chat-page">
    <div class="page-header" style="height: 46px;">
      <van-nav-bar
      title="AI旅游助手"
      left-arrow
      @click-left="goBack"
      left-text="返回"
      fixed
      />
    </div>
    <div class="chat-container" ref="chatContainer">
      <!-- 还没有进行对话 -->
       <div v-if="messages.length === 0" class="chat-empty">
        <van-empty description="开始和 AI旅游助手 对话吧！"/>
        <div class="quick-questions">
          <div class="quick-title">常见问题</div>
          <van-tag v-for="question in quickQuestions" :key="question" class="quick-tag" mark size="large" @click="handleClickQuestion(question)">{{ question }}</van-tag>
        </div>
       </div>
       <div class="message-list" v-else>
        <ChatBubble v-for="message in messages" :key="message.id" :message="message" />
        <div v-if="isStreaming" class="streaming-indicator">
          <van-loading type="spinner" size="20px"/>
          <span>AI正在回复中...</span>
        </div>
       </div>
    </div>
    <div class="chat-input-area">
      <van-field
        v-model="inputMessage"
        placeholder="输入您的问题..."
        :disabled="isStreaming"
      >
        <template #button>
          <van-button :disabled="!inputMessage.trim()" @click="sendMessage" size="small" type="primary">发送</van-button>
        </template>
      </van-field>
    </div>
  </div>
</template>


<script setup>
import router from '../router'
import { ref, onMounted, nextTick } from 'vue'
import request, { fetchStream } from '../utils/request'
import { showToast } from 'vant'
import ChatBubble from '../components/ChatBubble.vue'
import { getUserId, isLoggedIn } from '../store/user'

// 聊天容器
const chatContainer = ref(null)

// 置底的滚动
const scrollToBottom = () => {
  if(chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

// 输入框
const inputMessage = ref('')
// 是否正在流式响应
const isStreaming = ref(false)

const goBack = () => {
  router.back()
}

const sendMessage = () => {
  const msg = inputMessage.value.trim()
  if(!msg || isStreaming.value) {
    return
  }

  // 创建用户的会话消息
  const userMsg = addUserMessage(msg)
  // 清空输入框的内容
  inputMessage.value = ''
  // 发送流式请求
  fetchAIResponse(msg, userMsg)
}

const addUserMessage = (msg) => {
  const message = {
    id: Date.now() + 1,
    role: 'user',
    content: msg,
    timestamp: new Date().toISOString()
  }
  messages.value.push(message)
  return message
}

// 获取流式响应
const fetchAIResponse = (msg, userMsg) => {
  isStreaming.value = true
  // 添加AI返回的消息
  messages.value.push({
    id: Date.now() + 1,
    role: 'AI',
    content: '',
    timestamp: new Date().toISOString()
  })

  let fullResponse = ''

 fetchStream('chat',{ message: msg },(chunk) => {
    fullResponse += chunk
    // AI正在回复的消息
    const lastMessage = messages.value[messages.value.length - 1]
    if(lastMessage && lastMessage.role === 'AI') {
      lastMessage.content = fullResponse
    }
    scrollToBottom()
  },() => {
    // AI回复完成
    isStreaming.value = false
    scrollToBottom()
    // 保存这一轮对话到后端
    saveChatRound(userMsg, fullResponse)
  }, (errMsg) => {
    // AI回复失败
    const lastMessage = messages.value[messages.value.length - 1]
    if(lastMessage && lastMessage.role === 'AI') {
      lastMessage.content = `抱歉，AI发生错误:${errMsg}`
      scrollToBottom()
    }
    isStreaming.value = false
    showToast('AI回复失败，请稍后重试')
   })
}

// 常见问题
const quickQuestions = ref([
  '北京有哪些必去的景点？',
  '上海美食推荐',
  '成都三日游攻略',
  '如何选择旅行保险？'
])

// 对话消息
const messages = ref([])

const handleClickQuestion = (question) => {
  inputMessage.value += question
}

// 接口地址（按后端实际路径调整）
const SAVE_API = '/api/travel/chatsave'
const HISTORY_API = '/api/travel/chatget'

// 保存一轮对话到后端
const saveChatRound = async (userMsg, aiContent) => {
  if (!isLoggedIn.value) return
  try {
    await request.post(SAVE_API, {
      userId: getUserId(),
      userMsg: userMsg.content,
      userTime: userMsg.timestamp,
      aiMsg: aiContent,
      aiTime: new Date().toISOString()
    })
  } catch (err) {
    console.error('保存对话失败:', err)
  }
}

// 登录后获取历史聊天记录
const fetchHistory = async () => {
  if (!isLoggedIn.value) return
  try {
    const res = await request.post(HISTORY_API, {},{
      params: { userId: getUserId() }
    })
    const records = Array.isArray(res) ? res : (res?.data || [])
    // 按用户提问时间升序排序
    records.sort((a, b) => new Date(a.user_time) - new Date(b.user_time))
    // 每条记录拆成用户消息和AI消息
    const history = []
    records.forEach((r) => {
      history.push({ id: `${r.id}-u`, role: 'user', content: r.userMsg, timestamp: r.userTime })
      history.push({ id: `${r.id}-a`, role: 'AI', content: r.aiMsg, timestamp: r.aiTime })
    })
    messages.value = history
    await nextTick()
    scrollToBottom()
  } catch (err) {
    console.error('获取历史聊天记录失败:', err)
  }
}

onMounted(() => {
  fetchHistory()
})

</script>

<style scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-bottom: 50px;
}

.chat-container {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  padding-bottom: 70px;
}

.chat-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.quick-questions {
  margin-top: 32px;
  text-align: center;
}

.quick-title {
  font-size: 14px;
  color: #999;
  margin-bottom: 16px;
}

.quick-tag {
  margin: 8px;
  cursor: pointer;
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.streaming-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  color: #999;
  font-size: 14px;
}

.chat-input-area {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  background: #fff;
  padding: 8px 16px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.05);
  max-width: 750px;
  margin: 0 auto;
}

.chat-input-area :deep(.van-field) {
  background: #f7f8fa;
  border-radius: 20px;
  padding: 8px 16px;
}
</style>
