import API from 'api/axios'
import { Student } from 'models/Student'
import { StudentProps } from 'models/interfaces/User'

export const getAllStudents = async () => {
  const students = await API.get(`api/student/all`)
  console.log(students)
  return students.data.map((student: StudentProps) => new Student(student))
}
