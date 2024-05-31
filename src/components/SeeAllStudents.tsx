import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { useState } from "react"
import { useOnInit } from "utils/useOnInit"
import { getAllStudents } from '../services/StudentsService'
import { Student } from '../models/Student'
import AddCardIcon from '@mui/icons-material/AddCard'

function SeeAllStudents() {

  const [studentInfoBackend, setStudentInfoBackend] = useState<Array<Student>>([])  //Esto es porque me marca error de type NEVER -- property-id-does-not-exist-on-type-never-on-map-function
  const [errorMessage, setErrorMessage] = useState('')


  useOnInit(async () => {
    try {
      const studentData = await getAllStudents()
      console.log('desde useOnInit')
      console.log(studentData)
      setStudentInfoBackend(studentData)
      console.log('desde useOnInit  ' + studentData.length)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  })



  const navigate = useNavigate()
  return (
    <>
      <h3>Todos los estudiantes del Colegio</h3>
      <div className="container">
        <div className="row mt-5">
          <ul className="list-group shadow">
            {studentInfoBackend.map((student) => {
              return (
                <>
                  <div>
                    <div className="col-12 bg-light h3">{student.lastName}, {student.firstName} </div>
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

export default SeeAllStudents
