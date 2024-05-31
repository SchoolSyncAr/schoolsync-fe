import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LayoutWrap } from 'components/LayoutWrap'
import { LoginPage } from 'pages/Login/LoginPage'
import NotificationsDashboard from 'components/NotifDashboard/NotificationsDashboard'
import CreateNotification from 'components/CreateNotification/CreateNotification'
import ParentDashboard from 'components/ParentDashboard'
import AdminDashboard from 'components/AdminDashboard'
import SeeAllStudents from 'components/SeeAllStudents'
import SeeAllParents from 'components/seeAllParents'
import Children from 'components/Children'
import NotFound from 'components/NotFound'

export const MyRoutes = () => (
  <Routes>
    <Route path="" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<LayoutWrap />}>
      <Route path="parentDashboard" element={<ParentDashboard />} />
      <Route path="notificationsDashboard" element={<NotificationsDashboard />} />
      <Route path="children" element={<Children />} />
      <Route path="adminDashboard" element={<AdminDashboard />} />
      <Route path="deleteNotification" element={<NotificationsDashboard deleteButton={true} />} />
      <Route path="seeAllStudents" element={<SeeAllStudents />} />
      <Route path="seeAllParents" element={<SeeAllParents />} />
      <Route path="createNotification" element={<CreateNotification />} />
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
