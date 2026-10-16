import axios from 'axios'
import router from '../router'

// 创建 axios 实例
const request = axios.create({
  baseURL: '/',
  timeout: 600000,
  withCredentials: true
})

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 可在此统一携带 token 等
    // config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // 统一返回业务数据
    return response.data
  },
  (error) => {
    // 统一错误处理
    return Promise.reject(error)
  }
)

// 处理流式接口
export async function fetchStream(URL,data,onChunk,onComplete,onError) {
  // 中止的请求控制器
  const controller = new AbortController()

  const response = await fetch(`/api/travel/${URL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data), // ✅ body放真正业务数据
      signal: controller.signal
    })

  // 创建响应体的可读流读取器
  const reader = response.body.getReader()
  // 将二进制数据解码为字符串
  const decoder = new TextDecoder()

  let result = ''

  while(true) {
    const {done,value} = await reader.read()
    if(done) break;
    const chunk = decoder.decode(value,{stream:true})
    console.log(chunk)
    const lines = chunk.split('\n').filter(line => line.trim())
    for(const line of lines) {
      if(line.startsWith('data:')) {
        const jsonStr = line.substring(5)
        try {
          if(jsonStr) {
          const jsonData = JSON.parse(jsonStr)

          if(jsonData.type === 'chunk') {
            // 分片的数据
            onChunk(jsonData.content)
          }
          else if(jsonData.done) {
            // 完成的数量
            onComplete()
          }else if(jsonData.error) {
            // 错误的数据
            onError(jsonData.error)
          }
        }
      }catch(error) {
          console.error('解析 JSON 失败:', error)
        }
    }
  }
}
  return controller.abort()
}

export default request
