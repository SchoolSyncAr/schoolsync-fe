import axios from 'axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'

const api = axios.create({
  baseURL: REACT_APP_REST_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
})

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('auth')
    if (token) {
      console.log("token presente")
      config.headers.Authorization = token
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default api