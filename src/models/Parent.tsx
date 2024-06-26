import { Student } from './Student'
import { ParentProps } from './interfaces/User'

export class Parent {
  id: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  children: Student[] = []
  notifications?: number[]
  notificationGroups?: string[]

  constructor(props?: ParentProps) {
    this.id = props?.id ?? 0
    this.firstName = props?.firstName ?? ''
    this.lastName = props?.lastName ?? ''
    this.email = props?.email ?? ''
    this.phoneNumber = props?.phoneNumber ?? ''
    this.children = props?.children ?? []
    this.notifications = props?.notifications ?? []
    this.notificationGroups = props?.notificationGroups ?? []
  }

  static fromJson(data: ParentProps) {
    return new Parent(data)
  }
}