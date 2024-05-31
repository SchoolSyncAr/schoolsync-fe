import api from 'api/axios'
// import { REACT_APP_REST_SERVER_URL } from "constants/constants"
import { Student } from "models/Student"
import { Parent } from 'models/Parent'

// export const getAllChildrenForAParent = async (parentId: number) => {
//   console.log("parent service parent id is: " + parentId)

// }

export const getMyChildren = async () => {     //eventualmente hay que agregar (parentId: number)
  console.log("estoy en getMyChildren del Student servicce")
  const allMyChildrenJson = await api.get(`api/parent/myChildren/7`)
  console.log("all my children " + allMyChildrenJson)
  return allMyChildrenJson.data.map((allStudentsJson: { id: number; firstName: string; lastName: string; absences: number; notifications: any })=>Student.fromJson(allStudentsJson))
}

export const getAllParents = async () => {
  console.log("estoy en getallparents parent service")
  const allParentsJson = await api.get(`api/parent/all`)
  console.log("allstudents  " + allParentsJson)
  return allParentsJson.data.map((allParentsJson: { id: number; firstName: string; lastName: string; notifications: any })=>Parent.fromJson(allParentsJson))
}
