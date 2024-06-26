import { studentService } from 'root/src/services/StudentsService'
import { Student } from 'root/src/models/Student'
import { UserCard } from '../UserCard/UserCard'
import { useOnInit } from 'utils/useOnInit'
import { useState } from 'react'
import './Dashboard.scss'

export const SeeAllStudents = () => {
  const [students, setStudents] = useState<Student[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const studentData = await studentService.getAll()
      setStudents(studentData)
    } catch {
      errorMessage
      setErrorMessage('No se pudo obtener info notifications')
    }
  })

  const studentList = () => {
    return students.map((student, index) => <UserCard user={student} key={index} />)
  }

  return (
    <div className="dashboard">
      <div className="dashboard__grid">{studentList()}</div>
    </div>
  )
}
