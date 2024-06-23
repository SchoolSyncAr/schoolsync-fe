import API from 'api/axios'
import { Student } from 'models/Student'
import { StudentProps } from 'models/interfaces/User'

// import { VITE_REST_SERVER_URL } from '../models/constants/constants'

export const getAllStudents = async () => {
  const students = await API.get(`api/student/all`)
  return students.data.map((student: StudentProps) => new Student(student))
}






// class StudentService {
//   getAll = async (): Promise<Student[]> => {
//     const students = await API.get(`${VITE_REST_SERVER_URL}/api/student/all`)
//     return students.data.map((student: StudentProps) => Student.fromJson(student))
//   }
// }
// export const studentService = new StudentService()
