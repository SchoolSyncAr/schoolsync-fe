export class Notification {
  id: number  //ver si es necesario
  title: string
  content: string
  constructor(
    id: number,
    title: string,
    content: string
  ) {
    this.id = id
    this.title = title
    this.content = content
  }


  //funcion que recibe una Notification Json y retorna una Notification
  static fromJson(allNotificationsJson: { id: number; title: string; content: string }) {
    return new Notification(
      allNotificationsJson.id,
      allNotificationsJson.title,
      allNotificationsJson.content,
    )
  }
}