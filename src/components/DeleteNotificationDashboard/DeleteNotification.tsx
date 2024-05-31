import { useNavigate } from "react-router-dom"
import Button from "../Button"
import MockNotifications from "../MockNotifications"


function DeleteNotification() {

  const navigate = useNavigate()
  return (<>
    <div className="notif-grid"/>
    <MockNotifications />
    <div className="buttonsToRightEnd">
      <Button className="forAllButtons buttonReturn" height={60} actionOnClick={() => navigate('/parentDashboard')}>
          Volver
      </Button>
    </div>
  </>)
}

export default DeleteNotification