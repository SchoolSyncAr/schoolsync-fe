import { LoginArgs } from 'models/interfaces/types'
import axios from 'axios'
import api from 'api/axios.tsx'


const AuthService = () => {
  const login = async (credentials: LoginArgs ) => {
    try {
      const response = await api.post('/api/auth', credentials)
      const token = response.data.accessToken
      const role = response.data.role

      localStorage.setItem("token", token)
      localStorage.setItem("role", role)

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

  const clearUser = () => {
    console.log("session clear")
    localStorage.removeItem("auth")
  }

  return {
    login, getUserToken, getUserRole, clearUser
  }

}

export const authService = AuthService()
