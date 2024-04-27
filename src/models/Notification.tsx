import { NotifProps } from "interfaces/Notification"

export class Notification {
  id: number  //ver si es necesario
  title: string
  content: string
  constructor(props: NotifProps) {
    this.id = props.id
    this.title = props.title
    this.content = props.content
  }

  static fromJson(notifData: NotifProps) {
    return new Notification(notifData)
  }
}