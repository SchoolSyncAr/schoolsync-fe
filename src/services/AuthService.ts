import { LoginArgs } from 'models/interfaces/types'
import api from 'api/axios.tsx'
import { jwtDecode } from 'jwt-decode'

interface DecodedTokenArgs {
  userId: string
  role: string
  exp: number
}

const AuthService = () => {
  const login = async (credentials: LoginArgs) => {
    try {
      const response = await api.post('/api/auth', credentials)
      const token = response.data.accessToken

      const decodedToken: DecodedTokenArgs = jwtDecode(token)

      sessionStorage.setItem('token', token)
      sessionStorage.setItem('role', decodedToken.role)
      sessionStorage.setItem('userId', decodedToken.userId)
      sessionStorage.setItem('tokenExpiration', decodedToken.exp.toString())

      return token
    } catch (error) {
      throw new Error('Error en la autenticación. Por favor, verifica tus credenciales.')
    }
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

  return {
    login,
    getUserToken,
    getUserRole,
    clearUser,
    getUserId,
    getTokenExpiration,
    logout,
  }
}

export const authService = AuthService()
