import { REST_SERVER_URL } from './config'
import axios from 'axios'

class AuthService {
  async validarUsuario(username: string, password: string) {
    const usuarioId = await axios.post(`${REST_SERVER_URL}/login`, { username: username, password: password })
    return usuarioId.data
  }
}

const authService = new AuthService()
export default authService
