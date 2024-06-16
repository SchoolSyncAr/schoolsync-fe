import './dashboard.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from './basic/Button/Button'

const AdminDashboard = () => {
  const navigate = useNavigate()
  return (
    <main className="dashboard">
      <Button text={'Agregar'} onClick={() => navigate('/createNotification')} taller animated rounded />
      <Button text={'Borrar'} onClick={() => navigate('/deleteNotification')} taller animated rounded />
      <Button text={'Estudiantes'} onClick={() => navigate('/seeAllStudents')} taller animated rounded />
      <Button text={'Padres'} onClick={() => navigate('/seeAllParents')} taller animated rounded />
    </main>
  )
}

export default AdminDashboard
