import api from "api/axios"
import { REACT_APP_REST_SERVER_URL } from "constants/constants"
import { ParentProps } from "interfaces/Parent"
import { Parent } from "models/interfaces/Parent"
import { Student } from "models/Student"

export const getAllChildrenForAParent = async (parentId: number) => {
  console.log("parent service parent id is: " + parentId)

}

class ParentService {

  getAll = async () => {
    const parents = await api.get(`${REACT_APP_REST_SERVER_URL}/api/parent/all`)
    return parents.data.map((parent: ParentProps) => Parent.fromJson(parent))
  }
}

export const parentService = new ParentService()
export const getMyChildren = async () => {     //eventualmente hay que agregar (parentId: number)
  console.log("estoy en getMyChildren del Student servicce")
  const allMyChildrenJson = await api.get(`api/parent/myChildren/7`)
  console.log("all my children " + allMyChildrenJson)
  return allMyChildrenJson.data.map((allStudentsJson: { id: number; firstName: string; lastName: string; absences: number; notifications: any })=>Student.fromJson(allStudentsJson))
}
