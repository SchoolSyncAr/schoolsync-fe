import axios from 'api/axios'
import { LoginArgs } from 'models/interfaces/types'


const AuthService = () => {
  const login = async (credentials: LoginArgs ) => {
    try {
      const response = await axios.post('/api/auth', credentials)
      const token = response.data.token
      const role = response.data.role
      const user_id = response.data.id_logged_user

      console.log(JSON.stringify(response?.data))
      sessionStorage.setItem("auth", token)
      sessionStorage.setItem("role", role)
      sessionStorage.setItem("user_id", user_id)

      return token
      

    } catch (error) {
      throw new Error('Error en la autenticación. Por favor, verifica tus credenciales.')
    }
  }

  const getUserToken = () => {
    return sessionStorage.getItem("auth")
  }

  function getUserId() {
    return sessionStorage.getItem("id_logged_user")
  }

  return {
    login, getUserToken, getUserId
  }
}

export const authService = AuthService()
