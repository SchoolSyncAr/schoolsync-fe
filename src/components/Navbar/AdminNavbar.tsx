import './navbar.scss'
import { useNavigate } from 'react-router-dom'

const AdminNavbar = () => {
  const navigate = useNavigate()

  const getNavItemClass = (path: string) => {
    return location.pathname === path ? 'text--highlight' : 'text--white'
  }
  return (
    <nav className="navbar">
      <div onClick={() => navigate('/deleteNotification')} className={`nav-item text text--md text--strong ${getNavItemClass('/deleteNotification')}`}>
        Notificaciones
      </div>
      <div onClick={() => navigate('/createNotification')} className={`nav-item text text--md text--strong ${getNavItemClass('/createNotification')}`}>
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
