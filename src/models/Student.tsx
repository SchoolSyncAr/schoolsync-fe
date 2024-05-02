export class Student {
  id: number
  firstName: string
  lastName: string
  birthDate: Date
  enrolledSubjects: any[] = []
  undergradedSubjects: any[] = []
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    birthDate: Date,
    enrolledSubjects: any[],
    undergradedSubjects: any[]
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.birthDate = birthDate
    this.enrolledSubjects = enrolledSubjects
    this.undergradedSubjects = undergradedSubjects
  }
  //funcion que recibe una Notification Json y retorna una Notification
  static fromJson(allStudentsJson: { id: number; firstName: string; lastName: string; birthDate: Date; enrolledSubjects: any; undergradedSubjects: any }) {
    return new Student(
      allStudentsJson.id,
      allStudentsJson.firstName,
      allStudentsJson.lastName,
      allStudentsJson.birthDate,
      allStudentsJson.enrolledSubjects,
      allStudentsJson.undergradedSubjects
    )
  }
}