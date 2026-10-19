import { reactive, computed } from 'vue'
import router from '../router'
import { showToast } from 'vant'

const STORAGE_KEY = 'userInfo'

// 从 localStorage 读取登录信息
const loadFromStorage = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    try {
      const data = JSON.parse(raw)
      // 新增：判断过期时间
      if (data.expireTime && Date.now() > data.expireTime) {
        // 已过期，删除本地存储
        localStorage.removeItem(STORAGE_KEY)
        return null
      } 
      // 未过期则返回用户信息并更新过期时间,jwt的过期时间为7天
      // 期间，若在有效期内登录，直接保存用户信息，无需重新登录获取新的jwt token
      // 如果前端不在有效期内重新登录，需重新登录获取新的jwt token
      // 测试：是否存在前端未登录但是jwt token可以用于继续访问的情况
      // 所有请求都需要携带userId,封装一个访问userId的方法，如果userId不存在，则提示用户重新登录
      // 重新登录后，将userId保存到本地存储中
      data.expireTime = Date.now() + 12 * 3600 * 1000
      return data
    } catch (e) {
      // json解析失败，清理脏数据
      localStorage.removeItem(STORAGE_KEY)
      return null
    }
  }
  return null
}

// value：你的登录对象；expireSec：有效期，单位秒
export const saveToStorage = (value) => {
  userStore.userInfo = value
  const storeObj = {
    ...value,
    expireTime: Date.now() + 12 * 3600 * 1000
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(storeObj))
}

export const getUserId = () => {
  if (!userStore.userInfo) {
    showToast('请先登录')
    router.push('/login')
    return null
  }
  return userStore.userInfo?.userId
}

// 全局登录信息（reactive 单例，跨组件共享）
const userStore = reactive({
  userInfo: loadFromStorage(),
})

// 是否已登录
export const isLoggedIn = computed(() => !!userStore.userInfo)

// // 保存登录信息（同步至 localStorage）
// export const setUser = (info) => {
//   userStore.userInfo = info
//   localStorage.setItem(STORAGE_KEY, JSON.stringify(info))
// }

// 更新用户信息
export const updateUserInfo = (info) => {
  userStore.userInfo = info
}


// 登出
export const logout = () => {
  userStore.userInfo = null
  localStorage.removeItem(STORAGE_KEY)
}

export const updateNickname = (nickname) => {
  userStore.userInfo.nickName = nickname
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userStore.userInfo))
}

export default userStore
