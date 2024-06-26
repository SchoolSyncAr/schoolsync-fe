import { useNavigate } from 'react-router-dom'
import { Logout } from '@mui/icons-material'
import { authService } from 'services/AuthService'
import { Logo } from 'components/Logo/Logo'
import './Header.css'
import { IconButton } from '@mui/material'
import ParentNavbar from 'components/Navbar/ParentNavbar'
import AdminNavbar from 'components/Navbar/AdminNavbar'

export const Header = () => {
  const navigate = useNavigate()
  const handleLogout = () => {
    authService.logout()
    navigate('/login')
  }

  return (
    <header className="main__header">
      <Logo imgUrl={'/images/logo.png'} linkTo={authService.getUserRole() == 'ADMIN' ? '/admin_dashboard' : '/parent_dashboard'} alt={'SchoolSync'} />
      <div className="nav-links">
        {authService.getUserRole() == 'ADMIN' && AdminNavbar()}
        {authService.getUserRole() != 'ADMIN' && ParentNavbar()}
        <IconButton onClick={handleLogout}>
          <Logout className="nav-links__icon" />
        </IconButton>
      </div>
    </header>
  )
}
