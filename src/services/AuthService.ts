import axios from 'axios'
import { REACT_APP_REST_SERVER_URL, REACT_APP_USER_KEY_STORAGE } from './config'
import { LoginArgs } from '../model/interfaces/types'

const AuthService = () => {
  const login = async (credentials: LoginArgs) => {
    const response$ = await axios.post(`${REACT_APP_REST_SERVER_URL}/api/user/login`, credentials)
    sessionStorage.setItem(REACT_APP_USER_KEY_STORAGE!!, response$.data.userId)
    return response$.data.userId
  }

  return {
    login,
  }
}

export const authService = AuthService()
