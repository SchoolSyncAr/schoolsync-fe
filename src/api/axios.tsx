import axios from 'axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'
import { authService } from 'services/AuthService.ts'

const api = axios.create({
  baseURL: REACT_APP_REST_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = authService.getUserToken()
    if (token) {
      config.headers.Authorization = `Bearer ${authService.getUserToken()}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

export default api