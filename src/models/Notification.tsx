import { NotifProps } from 'models/interfaces/Notification'

export class Notification {
  id?: number
  title: string
  content: string
  weight: string
  sender: number
  scope: string
  recipientGroups: string[]
  recipients: number[]
  date: string
  read: boolean
  pinned: boolean

  constructor(props?: NotifProps) {
    this.id = props?.id ?? 0
    this.title = props?.title ?? ''
    this.content = props?.content ?? ''
    this.weight = props?.weight ?? ''
    this.sender = props?.sender ?? 0
    this.scope = props?.scope ?? ''
    this.recipientGroups = props?.recipientGroups ?? []
    this.recipients = props?.recipients ?? []
    this.date = props?.date ?? ''
    this.read = props?.read ?? false
    this.pinned = props?.pinned ?? false
  }

  static fromJson(notifData: NotifProps) {
    return new Notification(notifData)
  }
}
