import { Link, useNavigate } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'
import { useOnInit } from 'utils/useOnInit'
import { Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import notificationService from 'services/NotificationService'
import { Logout } from '@mui/icons-material'
import { authService } from 'services/AuthService'

function Header() {
  const [data, setData] = useState(0)
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
    <nav className="nav">
      <div className="left-group-container">
        <img className="left_logo" src="/images/logo.png" alt="SchoolSync" />
        <h2 className="nav-title">SchoolSyncAr</h2>
      </div>
      <div className="nav-links">
        <Link to={'/notificationsDashboard'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Badge badgeContent={data} color="error">
            <NotificationsIcon color="action" />
          </Badge>
        </Link>
        <button
          onClick={handleLogout}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
        >
          <Logout color="action" />
        </button>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </nav>
  )
}

export default Header
