import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom'
import ParentDashboard from './Components/ParentDashboard'
import NotificationsDashboard from './Components/NotificationsDashboard'
import Children from './Components/Children'
import AdminDashboard from './Components/AdminDashboard'


export const MyRoutes = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<ParentDashboard />} />
      <Route path="/parentDashboard" element={<ParentDashboard />} />
      <Route path="/notificationsDashboard" element={<NotificationsDashboard />} />
      <Route path='/children' element={<Children />} />
      <Route path='/adminDashboard' element={<AdminDashboard />} />
      <Route path='*' element={<Navigate to='/login' />} /> 
    </Routes>

    <Link to="/login">Iniciar sesión</Link>
  </Router>
)