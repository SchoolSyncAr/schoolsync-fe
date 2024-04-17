import { useNavigate } from "react-router-dom";
import Button from "./Button";

function Children() {

  const navigate = useNavigate()

  return ( 
    <>
      <div>
        <Button className='forAllButtons'>Juan</Button>
        <Button className='forAllButtons'>Pedro</Button>
      </div>
      <div className="buttonsToRightEnd">
      <Button className='forAllButtons buttonReturn' height={60} actionOnClick={()=>navigate('/parentDashboard')}>Volver</Button>
      </div>
    </>
   );
}

export default Children;