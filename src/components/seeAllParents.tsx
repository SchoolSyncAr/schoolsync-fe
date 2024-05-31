import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { useState } from "react"
import { useOnInit } from "utils/useOnInit"
import { getAllStudents } from '../services/StudentsService'
import { Student } from '../models/Student'
import { getAllParents } from "services/ParentService"
import { Parent } from "models/Parent"
import AddCardIcon from '@mui/icons-material/AddCard'

function SeeAllParents() {

  const [parentInfoBackend, setParentInfoBackend] = useState<Array<Parent>>([])  //Esto es porque me marca error de type NEVER -- property-id-does-not-exist-on-type-never-on-map-function
  const [errorMessage, setErrorMessage] = useState('')


  useOnInit(async () => {
    try {
      const parentData = await getAllParents()
      console.log('desde useOnInit')
      console.log(parentData)
      setParentInfoBackend(parentData)
      console.log('desde useOnInit  ' + parentData.length)
    } catch {
      setErrorMessage('No se pudo obtener info parents')
    }
  })



  const navigate = useNavigate()
  return (
    <>
      <h3>Todos los padres del colegio</h3>
      <div className="container">
        <div className="row mt-5">
          <ul className="list-group shadow">
            {parentInfoBackend.map((parent) => {
              return (
                <>
                  <div>
                    <div className="col-12 bg-light h3">{parent.lastName}, {parent.firstName} </div>
                    <div className="buttonsToRightEnd">
                      <AddCardIcon style={{ color: 'green'}} ></AddCardIcon>
                    </div>
                  </div>
                </>
              )
            })}
          </ul > 
          <div className="buttonsToRightEnd">
            <Button className='forAllButtons buttonReturn' height={60} actionOnClick={() => navigate('/adminDashboard')}>Volver</Button>
          </div>
        </div> 
      </div>
    </>
  )
}

export default SeeAllParents
