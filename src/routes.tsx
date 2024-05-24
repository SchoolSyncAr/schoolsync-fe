import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ParentDashboard from 'components/ParentDashboard'
import NotificationsDashboard from 'components/NotifDashboard/NotificationsDashboard'
import Children from 'components/Children'
import AdminDashboard from 'components/AdminDashboard'
import { LayoutWrap } from 'components/LayoutWrap'
import NotFound from 'components/NotFound'
import DeleteNotification from 'components/DeleteNotification'
import SeeAllStudents from 'components/SeeAllStudents'
import { LoginPage } from 'pages/Login/LoginPage'

export const MyRoutes = () => (
  <Routes>
    <Route path="" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<LayoutWrap />}>
      <Route path="parentDashboard" element={<ParentDashboard />} />
      <Route path="notificationsDashboard" element={<NotificationsDashboard />} />
      <Route path="children" element={<Children />} />
      <Route path="adminDashboard" element={<AdminDashboard />} />
      <Route path="deleteNotification" element={<DeleteNotification />} />
      <Route path="seeAllStudents" element={<SeeAllStudents />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export const SchoolSyncRouter = () => {
  return (
    <Router>
      <MyRoutes />
    </Router>
  )
}
