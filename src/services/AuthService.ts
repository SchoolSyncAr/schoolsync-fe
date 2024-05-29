import { LoginArgs } from 'models/interfaces/types'
import api from 'api/axios.tsx'

const AuthService = () => {
  const login = async (credentials: LoginArgs) => {
    try {
      const response = await api.post('/api/auth', credentials)
      const token = response.data.accessToken
      const role = response.data.role
      const userId = response.data.userId

      sessionStorage.setItem('token', token)
      sessionStorage.setItem('role', role)
      sessionStorage.setItem('userId', userId)

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

  const clearUser = () => {
    console.log('session clear')
    sessionStorage.removeItem('auth')
  }

  return {
    login,
    getUserToken,
    getUserRole,
    clearUser,
    getUserId,
  }
}

export const authService = AuthService()
