import { Link } from 'react-router-dom'
import './Header.css'
import { useState } from 'react'
import { useOnInit } from 'utils/useOnInit'
import { Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'
import notificationService from 'services/NotificationService'
import { Logout } from '@mui/icons-material'

function Header() {
  const [data, setData] = useState(0)
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const notificationCount = await notificationService.getNotificationsCount()
      setData(notificationCount)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  })
  return (
    <nav className="nav">
      <div className="left-group-container">
        <img className="left_logo" src="/images/logo.png" alt="SchoolSync" />
        <h2 className="nav-title">
          {/* <a href="/parentDashboard" className="nav-title"> */}
          SchoolSyncAr
          {/* </a> */}
        </h2>
      </div>
      <div className="nav-links">
        {/* <a href="">Link 1</a>
        <a href="">Link 2</a>
        <a href="">Link 3</a>
        <a href="">Link 4</a> */}
        {/* <a href="/notificationsDashboard" className="notification">
          <i className="fa fa-regular fa-bell" />
          <span className="notification__badge">2</span>
        </a> */}
        <Link to={'/notificationsDashboard'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Badge badgeContent={data} color="error">
            <NotificationsIcon color="action" />
          </Badge>
        </Link>
        <Link to={'/login'} style={{ textDecoration: 'none', color: 'inherit' }}>
          <Logout color="action" />
        </Link>
      </div>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </nav>
  )
}

export default Header
