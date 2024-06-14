import './notifications.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useOnInit } from 'utils/useOnInit'
import { getAllStudents } from '../../services/StudentsService'
import { Student } from '../../models/Student'
import AddCardIcon from '@mui/icons-material/AddCard'
import { Button } from '../basic/Button/Button'

export const SeeAllStudents = () => {
  const [studentInfoBackend, setStudentInfoBackend] = useState<Array<Student>>([]) //Esto es porque me marca error de type NEVER -- property-id-does-not-exist-on-type-never-on-map-function
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const studentData = await getAllStudents()
      setStudentInfoBackend(studentData)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  })

  const navigate = useNavigate()
  return (
    <article className="notifications">
      <h3 className="notifications__title text--strong">Listado de estudiantes</h3>
      <section className="notifications__body">
        <ul className="notifications__body-list shadow">
          {studentInfoBackend.map((student) => (
            <div key={student.id} className="notifications__text">
              <span>
                {student.lastName}, {student.firstName}{' '}
              </span>
              <AddCardIcon style={{ color: 'green' }}></AddCardIcon>
            </div>
          ))}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </ul>
      </section>
      <section className="notifications__actions">
        <Button text={'volver'} onClick={() => navigate('/adminDashboard')} taller rounded animated />
      </section>
    </article>
  )
}
