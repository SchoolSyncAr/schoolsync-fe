import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { LoginPage } from 'pages/Login/LoginPage'
import NotificationsDashboard from 'components/NotifDashboard/NotificationsDashboard'
import CreateNotification from 'components/CreateNotification/CreateNotification'
import { SeeAllStudents } from 'components/notifications/SeeAllStudents'
import SeeAllParents from 'components/notifications/seeAllParents'
import Children from 'components/Children/Children'
import NotFound from 'components/NotFound'
import ProtectedRoute from 'protectedRoute'
import { NotificationProvider } from 'components/hooks/NotificationContext'
import { LayoutWrap } from 'components/LayoutWrap'
import ParentNavbar from 'components/Navbar/ParentNavbar'
import AdminNavbar from 'components/Navbar/AdminNavbar'

export const MyRoutes = () => (
  <Routes>
    <Route path="" element={<LoginPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/" element={<ProtectedRoute />}>
      <Route path="/" element={<LayoutWrap />}>
        <Route path="parentDashboard" element={<ParentNavbar />} />
        <Route path="notificationsDashboard" element={<NotificationsDashboard />} />
        <Route path="children" element={<Children />} />
        <Route path="adminDashboard" element={<AdminNavbar />} />
        <Route path="deleteNotification" element={<NotificationsDashboard deleteButton={true} />} />
        <Route path="seeAllStudents" element={<SeeAllStudents />} />
        <Route path="seeAllParents" element={<SeeAllParents />} />
        <Route path="createNotification" element={<CreateNotification />} />
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>
)

export const SchoolSyncRouter = () => {
  return (
    <NotificationProvider>
      <Router >
        <MyRoutes />
      </Router>
    </NotificationProvider>
  )
}
