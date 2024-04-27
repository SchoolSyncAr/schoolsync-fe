import { Link } from 'react-router-dom'
import './Header.css'
import { notificationService } from '../services/NotificationService'
import { useState } from 'react'
import { useOnInit } from '../utils/useOnInit'
import { Badge } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications'

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
      <h2>
        <a href="/parentDashboard" className="nav-title">
          SchoolSyncAr
        </a>
      </h2>
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
      </div>
    </nav>
  )
}

export default Header
