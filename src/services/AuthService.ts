import axios from 'axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'

class AuthService {
  async validarUsuario(username: string, password: string) {
    const usuarioId = await axios.post(`${REACT_APP_REST_SERVER_URL}/login`, { username: username, password: password })
    return usuarioId.data
  }
}

const authService = new AuthService()
export default authService
