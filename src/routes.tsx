import { Navigate, RouteObject } from 'react-router-dom'
import ParentDashboard from './components/ParentDashboard'
import NotificationsDashboard from './components/NotificationsDashboard'
import Children from './components/Children'
import AdminDashboard from './components/AdminDashboard'
import { Auth } from './pages/Auth/Auth'

export const routerConfig: RouteObject[] = [
  { path: '/login', element: <Auth /> },
  { path: '/parent', element: <ParentDashboard /> },
  { path: '/notifications', element: <NotificationsDashboard /> },
  { path: '/children', element: <Children /> },
  { path: '/admin', element: <AdminDashboard /> },
  { path: '*', element: <Navigate to="/login" /> },
]
