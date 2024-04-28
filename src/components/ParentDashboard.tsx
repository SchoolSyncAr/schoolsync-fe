
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
            <Button className='forAllButtons button2 col-6'color="white" height= {150} width = {200} margin = {80} actionOnClick={()=>navigate('/notificationsDashboard')}>Notificaciones</Button>
          </div>
          <div className="row">
            <Button className='forAllButtons button3' bgcolor="blue" height={150} width={200} margin={80} actionOnClick={()=>navigate ('/adminDashboard')}>Provisoriamente va a AdminDashboard</Button>
            <Button className='forAllButtons button4' bgcolor="pink" height={150} width={200} margin={80} actionOnClick={()=>navigate ('/deleteNotification')}>Provisoriamente a delete notifications</Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ParentDashboard
