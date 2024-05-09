import axios from 'axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'

const api = axios.create({
  baseURL: REACT_APP_REST_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
})

export default api