import { ParentProps } from './interfaces/Parent'

export class Parent {
  id: number
  firstName: string
  lastName: string
  isFatherOf?: number[]
  notifications?: number[]
  notificationGroups?: string[]

  constructor(props?: ParentProps) {
    this.id = props?.id ?? 0
    this.firstName = props?.firstName ?? ''
    this.lastName = props?.lastName ?? ''
    this.isFatherOf = props?.isFatherOf ?? []
    this.notifications = props?.notifications ?? []
    this.notificationGroups = props?.notificationGroups ?? []
  }

  static fromJson(data: ParentProps) {
    return new Parent(data)
  }
}