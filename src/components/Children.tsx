import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { useOnInit } from "utils/useOnInit"
import { getAllChildrenForAParent} from '../services/ParentService'

function Children() {

  const navigate = useNavigate()

  const unhijo = ["juan"]
  const cuatrohijos = ["JUan", "lola", "pepe", "ana"]

  useOnInit(async () => {
    getAllChildrenForAParent(6)

    // try {
    //   const generalNotificationData = await notificationService.getAllGeneralNotifications()
    //   console.log('desde useOnInit')
    //   console.log(generalNotificationData)
    //   setGeneralNotificationsInfoBackend(generalNotificationData)
    //   console.log('desde useOnInit longitud segundo  ' + generalNotificationsInfoBackend.length)
    // } catch {
    //   setErrorMessage('No se pudo obtener info notifications')
    // }
  })





  return (
    <>
      <div>
        {cuatrohijos.map((hijo) => {
          return (
            <Button className='forAllButtons buttonReturn' height={60}>{hijo}</Button>
          )
        })}
      </div>
      <div className="buttonsToRightEnd">
        <Button className='forAllButtons buttonReturn' height={60} actionOnClick={() => navigate('/parentDashboard')}>Volver</Button>
      </div>
    </>
  )
}

export default Children