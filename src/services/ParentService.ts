import API from 'api/axios'
import { VITE_REST_SERVER_URL } from 'constants/constants'
import { ParentProps, StudentProps } from 'models/interfaces/User'
import { Parent } from 'models/Parent'
import { Student } from 'models/Student'
import { authService } from './AuthService'
class ParentService {
  getAll = async (): Promise<Parent[]> => {
    const parents = await API.get(`${VITE_REST_SERVER_URL}/api/parent/all`)
    return parents.data.map((parent: ParentProps) => Parent.fromJson(parent))
  }
}
export const parentService = new ParentService()

export const getMyChildren = async (): Promise<Student[]> => {
  const students = await API.get(`api/parent/childs/${authService.getUserId()}`)
  return students.data.map((student: StudentProps) => new Student(student))
}
