import { authService } from 'services/AuthService.ts'
import { VITE_REST_SERVER_URL } from 'models/constants/constants'
import axios from 'axios'

const API = axios.create({
  baseURL: VITE_REST_SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
})

API.interceptors.request.use(
  (config) => {
    const token = authService.getUserToken()
    if (token) {
      config.headers.Authorization = `Bearer ${authService.getUserToken()}`
    }
    return config
  },
  (error) => Promise.reject(error),
)

export default API
