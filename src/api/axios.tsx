import axios from 'axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'

export default axios.create({
  baseURL: REACT_APP_REST_SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  // withCredentials: true
})