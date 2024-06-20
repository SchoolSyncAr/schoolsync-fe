import { RouteObject } from 'react-router-dom'
import NotificationsDashboard from 'components/NotifDashboard/NotificationsDashboard'
import CreateNotification from 'components/CreateNotification/CreateNotification'
import { SeeAllStudents } from 'components/notifications/SeeAllStudents'
import SeeAllParents from 'components/notifications/seeAllParents'
import { NotFound } from 'components/NotFound'
import { ProtectedRoute } from './protectedRoute'
import { LayoutWrap } from 'components/LayoutWrap'
import { LoginPage } from 'pages/Login/LoginPage'
import Children from './components/Children/Children'

export const routes: RouteObject[] = [
  { path: '', element: <LoginPage /> },
  { path: 'login', element: <LoginPage /> },
  {
    path: '/',
    element: <ProtectedRoute />,
    children: [
      {
        path: '/',
        element: <LayoutWrap />,
        children: [
          { path: 'parent_dashboard', element: <NotificationsDashboard /> },
          { path: 'children', element: <Children /> },
          { path: 'admin_dashboard', element: <NotificationsDashboard deleteButton={true} /> },
          { path: 'seeAllStudents', element: <SeeAllStudents /> },
          { path: 'seeAllParents', element: <SeeAllParents /> },
          { path: 'createNotification', element: <CreateNotification /> },
        ],
      },
    ],
  },
  { path: '*', element: <NotFound /> },
]
