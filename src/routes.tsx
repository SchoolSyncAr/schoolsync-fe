import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import ParentDashboard from 'components/ParentDashboard'
import NotificationsDashboard from 'components/NotifDashboard/NotificationsDashboard'
import Children from 'components/Children'
import AdminDashboard from 'components/CreateNotification/CreateNotification'
import { LayoutWrap } from 'components/LayoutWrap'
import NotFound from 'components/NotFound'
import DeleteNotification from 'components/DeleteNotification'
import SeeAllStudents from 'components/SeeAllStudents'
import { LoginPage } from 'pages/Login/LoginPage'
import SeeAllParents from 'components/seeAllParents'
import CreateNotification from 'components/CreateNotification/CreateNotification'

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
