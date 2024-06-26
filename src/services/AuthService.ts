import API from 'api/axios'
import { jwtDecode } from 'jwt-decode'
import { LoginArgs } from 'models/interfaces/types'

interface DecodedTokenArgs {
  userId: string
  role: string
  exp: number
}

const AuthService = () => {
  const login = async (credentials: LoginArgs) => {
    const response = await API.post('/api/auth', credentials)
    const token = response.data.accessToken
    setStorage(token)
    return token
  }

  const setStorage = (token: string) => {
    const decodedToken: DecodedTokenArgs = jwtDecode(token)

    sessionStorage.setItem('token', token)
    sessionStorage.setItem('role', decodedToken.role)
    sessionStorage.setItem('userId', decodedToken.userId)
    sessionStorage.setItem('tokenExpiration', decodedToken.exp.toString())
  }

  const getUserToken = () => {
    return sessionStorage.getItem('token')
  }

  const getUserRole = () => {
    return sessionStorage.getItem('role')
  }

  const getUserId = () => {
    return sessionStorage.getItem('userId')
  }

  const getTokenExpiration = (): Date => {
    const tokenExpiration = sessionStorage.getItem('tokenExpiration')
    const expirationTime = tokenExpiration ? parseInt(tokenExpiration, 10) * 1000 : 0
    return new Date(expirationTime)
  }

  const clearUser = () => {
    console.log('session clear')
    sessionStorage.removeItem('auth')
  }

  const logout = () => {
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('role')
    sessionStorage.removeItem('userId')
    sessionStorage.removeItem('tokenExpiration')
  }

  const adminStatus = () => getUserRole() == 'ADMIN'

  return {
    login,
    getUserToken,
    getUserRole,
    clearUser,
    getUserId,
    getTokenExpiration,
    logout,
    adminStatus,
    setStorage,
  }
}

export const authService = AuthService()
