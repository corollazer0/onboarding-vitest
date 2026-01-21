import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers ?? {}
      config.headers.Authorization = `Bearer ${token}`
    }

    if (import.meta.env.DEV) {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`)
    }

    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error

    if (response) {
      switch (response.status) {
        case 401:
          localStorage.removeItem('token')
          window.location.href = '/login'
          break
        case 403:
          console.error('접근 권한이 없습니다.')
          break
        case 404:
          console.error('리소스를 찾을 수 없습니다.')
          break
        case 500:
          console.error('서버 오류가 발생했습니다.')
          break
        default:
          console.error('알 수 없는 오류가 발생했습니다.')
          break
      }
    } else {
      console.error('네트워크 오류가 발생했습니다.')
    }

    return Promise.reject(error)
  }
)

export function setupAxios() {
  // reserved for future setup steps
}

export default apiClient
