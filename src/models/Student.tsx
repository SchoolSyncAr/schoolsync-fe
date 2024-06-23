import { Parent } from "./Parent"
import { StudentProps } from "./interfaces/User"

export class Student {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  parents: Parent[]
  absences: number
  notifications: number[]
  
  constructor( data: StudentProps) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data?.email ?? ''
    this.phoneNumber = data?.phoneNumber ?? ''
    this.parents = data.parents ?? []
    this.absences = data.absences ?? 0
    this.notifications = data.notifications ?? []
  }
}