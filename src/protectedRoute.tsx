import { Navigate, Outlet } from 'react-router-dom'
import { authService } from 'services/AuthService'

export const ProtectedRoute = () => {
  const isAuthenticated = authService.getUserId() !== null

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}
