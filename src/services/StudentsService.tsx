import api from 'api/axios'
import { Student } from "models/Student"
import { StudentProps } from 'models/interfaces/User'

export const getAllStudents = async () => {
  const students = await api.get(`api/student/all`)
  return students.data.map((student: StudentProps)=> new Student(student))
}