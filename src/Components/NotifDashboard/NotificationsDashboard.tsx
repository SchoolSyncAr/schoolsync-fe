import Button from "../Button"
import { useNavigate } from "react-router-dom"
import { getAllGeneralNotifications } from "../../Services/NotificationService"
import { NotifCard } from "../NotifCard/NotifCard"
import { useState } from "react"
import { useOnInit } from "../../Utils/useOnInit"
import './NotificationDashboard.css'
import { NotifProps } from "../../interfaces/Notification"

function NotificationsDashboard() {

  const [notifications, setNotifications] = useState<NotifProps[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const notifs = await getAllGeneralNotifications()
      console.log("desde useOnInit")
      console.log(notifs)
      setNotifications(notifs)
      console.log("desde useOnInit longitud segundo  " + notifications.length)
      
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  })

  const notifList = () => {
    return notifications.map((data) => (
      <NotifCard 
        id={data.id}
        title={data.title}
        content={data.content}
      />
    ))
  }

  const navigate = useNavigate()

  return ( 
    <>
      <div className="notif-grid">{notifList()}</div>

      <br></br>
      <br></br>
      <div className="buttonsToRightEnd">
        <Button className='forAllButtons buttonReturn' height={60} actionOnClick={()=>navigate('/parentDashboard')}>Volver</Button>
      </div>
    </>
  )
}
 
export default NotificationsDashboard