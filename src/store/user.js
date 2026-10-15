import { reactive, computed } from 'vue'

const STORAGE_KEY = 'userInfo'

// 从 localStorage 读取登录信息
const loadFromStorage = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      return JSON.parse(raw)
    } catch (e) {
      return null
    }
  }
  return null
}

// 全局登录信息（reactive 单例，跨组件共享）
const userStore = reactive({
  userInfo: loadFromStorage(),
})

// 是否已登录
export const isLoggedIn = computed(() => !!userStore.userInfo)

// 保存登录信息（同步至 localStorage）
export const setUser = (info) => {
  userStore.userInfo = info
  localStorage.setItem(STORAGE_KEY, JSON.stringify(info))
}

// 更新用户信息
export const updateUserInfo = (info) => {
  userStore.userInfo = info
  localStorage.removeItem(STORAGE_KEY)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(info))
}


// 登出
export const logout = () => {
  userStore.userInfo = null
  localStorage.removeItem(STORAGE_KEY)
}

export default userStore
