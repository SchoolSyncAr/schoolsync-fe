import { StudentProps } from "./interfaces/User"

export class Student {
  id: number
  firstName: string
  lastName: string
  absences: number
  notifications: number[]
  
  constructor( data: StudentProps) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.absences = data.absences ?? 0
    this.notifications = data.notifications ?? []
  }
}