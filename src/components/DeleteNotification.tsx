import { useNavigate } from "react-router-dom"
import Button from "./Button"
import MockNotifications from "./MockNotifications"


function DeleteNotification() {

  const navigate = useNavigate()
  return (<>
    {/* <h3>Delete Notification</h3> */}
    <div className="notif-grid"/>
    <MockNotifications />
    <div className="buttonsToRightEnd">
      <Button className="forAllButtons buttonReturn" height={60} actionOnClick={() => navigate('/adminDashboard')}>
          Volver
      </Button>
    </div>
  </>)
}

export default DeleteNotification