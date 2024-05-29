export class Student {
  id: number
  firstName: string
  lastName: string
  // birthDate: Date
  // enrolledSubjects: any[] = []
  // undergradedSubjects: any[] = []
  absences: number
  notifications: any[] = []
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    // birthDate: Date,
    // enrolledSubjects: any[],
    // undergradedSubjects: any[]
    absences: number,
    notifications: any[] = []
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    // this.birthDate = birthDate
    // this.enrolledSubjects = enrolledSubjects
    // this.undergradedSubjects = undergradedSubjects
    this.absences = absences
    this.notifications = notifications
  }
  //funcion que recibe un Student Json y retorna un Student
  static fromJson(allStudentsJson: { id: number; firstName: string; lastName: string; absences: number; notifications: any }) {
    return new Student(
      allStudentsJson.id,
      allStudentsJson.firstName,
      allStudentsJson.lastName,
      allStudentsJson.absences,
      allStudentsJson.notifications,
    )
  }
}