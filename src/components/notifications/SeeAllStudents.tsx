import './notifications.scss'
import { useState } from 'react'
import { useOnInit } from 'utils/useOnInit'
import { Student } from '../../models/Student'
import AddCardIcon from '@mui/icons-material/AddCard'
import { PrintError } from 'components/PrintError/PrintError'
import { studentService } from 'root/src/services/StudentsService'

export const SeeAllStudents = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const studentData = await studentService.getAll()
      setStudents(studentData)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  })

  return (
    <article className="notifications" data-testid="allstudents">
      <h3 className="notifications__title text--strong" data-testid="allstudents-title">
        Listado de estudiantes
      </h3>
      <section className="notifications__body" data-testid="allstudents-body">
        <ul className="notifications__body-list shadow" data-testid="allstudents-list">
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
    </article>
  )
}
