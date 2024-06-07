import './dashboard.scss'
import { useNavigate } from 'react-router-dom'
import { Button } from './basic/Button/Button'

const ParentDashboard = () => {
  const navigate = useNavigate()
  return (
    <main className="dashboard">
      <Button text={'Hijos'} onClick={() => navigate('/children')} animated rounded taller />
      <Button text={'Notificaciones'} onClick={() => navigate('/notificationsDashboard')} animated rounded taller />
    </main>
  )
}

export default ParentDashboard
