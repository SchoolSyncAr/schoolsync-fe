import { ParentProps } from "interfaces/Parent"

export class Parent {
  id: number
  fullName: string
  constructor(props?: ParentProps) {
    this.id = props?.id ?? 0
    this.fullName = props?.fullName ?? ''
  }

  static fromJson(data: ParentProps) {
    return new Parent(data)
  }
}