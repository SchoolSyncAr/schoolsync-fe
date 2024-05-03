import axios from "axios"
import { REACT_APP_REST_SERVER_URL } from "constants/constants"
import { Student } from "models/Student"

export const getAllStudents = async () => {
  console.log("estoy en getallstudents student service")
  const allStudentsJson = await axios.get(`${REACT_APP_REST_SERVER_URL}/students/all`)
  console.log("allstudents  " + allStudentsJson)
  return allStudentsJson.data.map((allStudentsJson: { id: number; firstName: string; lastName: string; birthDate: Date; enrolledSubjects: any; undergradedSubjects: any })=>Student.fromJson(allStudentsJson))
}
