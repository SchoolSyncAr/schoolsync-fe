import axios from 'axios'
import { REACT_APP_REST_SERVER_URL, REACT_APP_USER_KEY_STORAGE } from 'constants/constants'
import { LoginArgs } from 'models/interfaces/types'

const AuthService = () => {
  const login = async (credentials: LoginArgs ) => {
    try {
      const response = await axios.post(`${REACT_APP_REST_SERVER_URL}/api/auth`, credentials)
      
      const token = response.data.token 
      sessionStorage.setItem(REACT_APP_USER_KEY_STORAGE!, token) 
      
      return token
    } catch (error) {
      throw new Error('Error en la autenticación. Por favor, verifica tus credenciales.')
    }
  }

  return {
    login
  }
}

export const authService = AuthService()
