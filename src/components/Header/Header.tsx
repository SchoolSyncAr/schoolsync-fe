import { useNavigate } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'
import { useOnInit } from 'utils/useOnInit'
import { Badge, IconButton } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import notificationService from 'services/NotificationService'
import { Logout } from '@mui/icons-material'
import { authService } from 'services/AuthService'
import { useNotification } from '../hooks/NotificationContext'
import { Logo } from 'components/Logo/Logo'

export const Header = () => {
  const [data, setData] = useState(0)
  const { notifications } = useNotification()
  const [errorMessage, setErrorMessage] = useState('')
  const navigate = useNavigate()

  useOnInit(async () => {
    try {
      const notificationCount = await notificationService.getNotificationsCount()
      setData(notificationCount)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  })

  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <header className="main__header">
      <Logo imgUrl={'/images/logo.png'} alt={'SchoolSync'}/>  
      <div className="nav-links">
        <IconButton onClick={() => navigate('/notificationsDashboard')}>
          <Badge badgeContent={notifications.length == 0 ? data : notifications.length} color="error">
            <NotificationsIcon className='nav-links__icon'/>
          </Badge>
        </IconButton>
        <IconButton onClick={handleLogout} >
          <Logout className='nav-links__icon'/>
        </IconButton>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </header>
  )
}
