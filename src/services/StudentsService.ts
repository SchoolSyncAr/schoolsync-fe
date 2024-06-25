import API from 'api/axios'
import { Student } from 'models/Student'
import { StudentProps } from 'models/interfaces/User'

class StudentService {
  getAll = async (): Promise<Student[]> => {
    const students = await API.get(`api/student/all`)
    return students.data.map((student: StudentProps) => Student.fromJson(student))
  }
}

export const studentService = new StudentService()

// export const getAllStudents = async () => {
//   const students = await API.get(`api/student/all`)
//   console.log(students)
//   return students.data.map((student: StudentProps) => new Student(student))
// }

