import api from "api/axios"
import { REACT_APP_REST_SERVER_URL } from "constants/constants"
import { ParentProps, StudentProps } from "models/interfaces/User"
import { Parent } from "models/Parent"
import { Student } from "models/Student"
import { authService } from "./AuthService"

// export const getAllChildrenForAParent = async (parentId: number) => {
//   console.log("parent service parent id is: " + parentId)

// }

class ParentService {
  getAll = async (): Promise<Parent[]>  => {
    const parents = await api.get(`${REACT_APP_REST_SERVER_URL}/api/parent/all`)
    return parents.data.map((parent: ParentProps) => Parent.fromJson(parent))
  }
}
export const parentService = new ParentService()

export const getMyChildren = async (): Promise<Student[]> => {
  const students = await api.get(`api/parent/childs/${authService.getUserId()}`)
  return students.data.map((student: StudentProps) => new Student(student))
}
