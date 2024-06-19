import './navbar.scss'
import { useNavigate } from 'react-router-dom'
import { IconButton, Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useOnInit } from 'utils/useOnInit'
import notificationService from 'services/NotificationService'
import { useState } from 'react'
import { useNotification } from '../hooks/NotificationContext'

const ParentNavbar = () => {
  const [data, setData] = useState(0)
  const { notifications, init } = useNotification()
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useOnInit(async () => {
    try {
      const notificationCount = await notificationService.getNotificationsCount()
      setData(notificationCount)
    } catch {
      errorMessage
      setErrorMessage('No se pudo obtener info notifications')
    }
  })

  const getNavItemClass = (path: string) => {
    return location.pathname === path ? 'text--highlight' : 'text--white'
  }

  return (
    <nav className="navbar">
      <div onClick={() => navigate('/children')} className={`nav-item text text--md text--strong ${getNavItemClass('/children')}`}>
        Hijos
      </div>
      <IconButton onClick={() => navigate('/notificationsDashboard')}>
        <Badge badgeContent={init ? data : notifications} color="error">
          <NotificationsIcon className={`nav-links__icon ${getNavItemClass('/notificationsDashboard')}`} />
        </Badge>
      </IconButton>
    </nav>
  )
}

export default ParentNavbar
