import { LoginArgs } from 'models/interfaces/types'
import api from 'api/axios.tsx'

const AuthService = () => {
  const login = async (credentials: LoginArgs ) => {
    try {
      const response = await api.post('/api/auth', credentials)
      const token = response.data.accessToken
      const role = response.data.role
      const id = response.data.id

      localStorage.setItem("token", token)
      localStorage.setItem("role", role)
      localStorage.setItem("id", id)

      return token
      
    } catch (error) {
      throw new Error('Error en la autenticación. Por favor, verifica tus credenciales.')
    }
  }

  const getUserToken = () => {
    return localStorage.getItem("token")
  }

  const getUserRole = () => {
    return localStorage.getItem("role")
  }

  const getUserId = () => {
    return localStorage.getItem("id")
  }

  const clearUser = () => {
    console.log("session clear")
    localStorage.removeItem("auth")
  }

  return {
    login, getUserToken, getUserRole, getUserId, clearUser
  }

}

export const authService = AuthService()
