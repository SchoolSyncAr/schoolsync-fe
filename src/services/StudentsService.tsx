import axios from "axios"
import api from 'api/axios'
import { REACT_APP_REST_SERVER_URL } from "constants/constants"
import { Student } from "models/Student"

export const getAllStudents = async () => {
  console.log("estoy en getallstudents student service")
  const allStudentsJson = await api.get(`api/student/all`)
  console.log("allstudents  " + allStudentsJson)
  return allStudentsJson.data.map((allStudentsJson: { id: number; firstName: string; lastName: string; absences: number; notifications: any })=>Student.fromJson(allStudentsJson))
}






// export const getMyChildren = async () => {     //eventualmente hay que agregar (parentId: number)
//   console.log("estoy en getMyChildren del Student servicce")
//   const allMyChildrenJson = await api.get(`api/parent/myChildren/7`)
//   console.log("all my children " + allMyChildrenJson)
//   return allMyChildrenJson.data.map((allStudentsJson: { id: number; firstName: string; lastName: string; absences: number; notifications: any })=>Student.fromJson(allStudentsJson))
// }