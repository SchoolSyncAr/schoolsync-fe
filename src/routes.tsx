import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import ParentDashboard from './Components/ParentDashboard'
import NotificationsDashboard from './Components/NotifDashboard/NotificationsDashboard'
import Children from './Components/Children'
import AdminDashboard from './Components/AdminDashboard'
import { LayoutWrap } from './Components/LayoutWrap'

export const MyRoutes = () => (
  <Routes>
    {/* Aca iría login */}
    <Route path="" element={<ParentDashboard />} />
    <Route path="/" element={<LayoutWrap />}>
      {/* <Route path="/login" element={<ParentDashboard />} /> */}
      <Route path="parentDashboard" element={<ParentDashboard />} />
      <Route path="notificationsDashboard" element={<NotificationsDashboard />} />
      <Route path="children" element={<Children />} />
      <Route path="adminDashboard" element={<AdminDashboard />} />
    </Route>

    <Route path="*" element={<Navigate to="" />} />
    {/* <Link to="/login">Iniciar sesión</Link> */}
  </Routes>
)

export const SchoolSyncRouter = () => {
  return (
    <Router>
      <MyRoutes />
    </Router>
  )
}
