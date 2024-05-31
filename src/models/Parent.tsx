export class Parent {
  id: number
  firstName: string
  lastName: string
  notifications: any[] = []
  constructor(
    id: number,
    firstName: string,
    lastName: string,
    notifications: any[] = []
  ) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.notifications = notifications
  }
  //funcion que recibe un Parent Json y retorna un Parent
  static fromJson(allParentsJson: { id: number; firstName: string; lastName: string; notifications: any }) {
    return new Parent(
      allParentsJson.id,
      allParentsJson.firstName,
      allParentsJson.lastName,
      allParentsJson.notifications,
    )
  }
}