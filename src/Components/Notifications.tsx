import Button from "./Button";
import { useNavigate } from "react-router-dom";
import MockNotifications from "./MockNotifications";

// const mockNotifications2 = [
//   {
//     nId: 1,
//     nTitle: "Titulo Notificacion 1",
//     nContenido: "Contenido Notificacion 1"
//   },
//   {
//     nId: 2,
//     nTitle: "Titulo Notificacion 2",
//     nContenido: "Contenido Notificacion 2"
// },{
//     nId: 3,
//     nTitle: "Titulo Notificacion 3",
//     nContenido: "Contenido Notificacion 3"
// }
// ]



function Notifications() {

  const navigate = useNavigate()

  return ( 
    <>
    
      <MockNotifications></MockNotifications>

        <br></br>
        <br></br>
        <br></br>
        <br></br>
      <br></br>
      <div className="buttonsToRightEnd">
    <Button className='forAllButtons buttonReturn' height={60} actionOnClick={()=>navigate('/parentDashboard')}>Volver</Button>
   </div>
      </>
      );
}
 
export default Notifications;