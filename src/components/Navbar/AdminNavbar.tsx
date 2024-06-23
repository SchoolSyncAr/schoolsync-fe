import './navbar.scss'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
  const navigate = useNavigate()

  const getNavItemClass = (path: string) => {
    return location.pathname === path ? 'text--highlight' : 'text--white'
  }
  return (
    <nav className="navbar">
      <div onClick={() => navigate('/admin_dashboard')} className={`nav-item text text--md text--strong ${getNavItemClass('/admin_dashboard')}`}>
        Notificaciones
      </div>
      <div onClick={() => navigate('/create_notification')} className={`nav-item text text--md text--strong ${getNavItemClass('/create_notification')}`}>
        Crear
      </div>
      <div onClick={() => navigate('/seeAllStudents')} className={`nav-item text text--md text--strong ${getNavItemClass('/seeAllStudents')}`}>
        Estudiantes
      </div>
      <div onClick={() => navigate('/seeAllParents')} className={`nav-item text text--md text--strong ${getNavItemClass('/seeAllParents')}`}>
        Padres
      </div>
    </nav>
  )
}

export default AdminNavbar
