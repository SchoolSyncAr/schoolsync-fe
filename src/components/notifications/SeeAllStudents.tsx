import './notifications.scss'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useOnInit } from 'utils/useOnInit'
import { getAllStudents } from '../../services/StudentsService'
import { Student } from '../../models/Student'
import AddCardIcon from '@mui/icons-material/AddCard'
import { Button } from '../basic/Button/Button'
import { PrintError } from 'components/PrintError/PrintError'

export const SeeAllStudents = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const studentData = await getAllStudents()
      setStudents(studentData)
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
          {students.map((student) => (
            <div key={student.id} className="notifications__text">
              <span>
                {student.lastName}, {student.firstName}{' '}
              </span>
              <AddCardIcon style={{ color: 'green' }}></AddCardIcon>
            </div>
          ))}
          <PrintError error={errorMessage} />
        </ul>
      </section>
      <section className="notifications__actions">
        <Button text={'volver'} onClick={() => navigate('/adminDashboard')} taller rounded animated />
      </section>
    </article>
  )
}
