
import Button from "./Button"
import "./ParentDashboard.css"
import { useNavigate } from "react-router-dom"

const ParentDashboard = () => {

  const navigate = useNavigate()
  return (
    <>
      <div className="container-md">
        <div className = "buttonsInParentDashboard">
          <div className="row">
            <Button className='forAllButtons button1 col-6' height={150} width={200} margin={80} actionOnClick={()=>navigate('/children')}>Hijos</Button>
            <Button className='forAllButtons button1 col-6'color="white" height= {150} width = {200} margin = {80} actionOnClick={()=>navigate('/notificationsDashboard')}>Notificaciones</Button>
          </div>
          <div className="row">
            <Button className='forAllButtons button1' bgcolor="blue" height={150} width={200} margin={20} actionOnClick={()=>navigate ('/adminDashboard')}>Provisoriamente va a Add new notification</Button>
            <Button className='forAllButtons button1' bgcolor="pink" height={150} width={200} margin={20} actionOnClick={() => navigate('/deleteNotification')}>Provisoriamente a delete notifications</Button>
            <Button className='forAllButtons button1' bgcolor="pink" height={150} width={200} margin={20} actionOnClick={()=>navigate ('/seeAllStudents')}>Provisoriamente a See All Students</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParentDashboard
