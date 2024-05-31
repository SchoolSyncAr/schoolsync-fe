import { NotifProps } from "interfaces/Notification"

export class Notification {
  id: number
  title: string
  content: string
  weight: string
  scope: string[]
  constructor(props: NotifProps) {
    this.id = props.id
    this.title = props.title
    this.content = props.content
    this.weight = props.weight
    this.scope = props.scope ?? []
  }

  static fromJson(notifData: NotifProps) {
    return new Notification(notifData)
  }
}