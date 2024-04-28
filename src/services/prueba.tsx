import axios from "axios"
// import { REST_SERVER_URL } from "../constants/constants"


export const deleteNotificationById2 = async (notificationId: number) => {
  const notificationJson = await axios.delete(`http://localhost:8080/deleteNotification/${notificationId}`)
  return notificationJson.data.map((notificationJson: any)=>{Notification.fromJson(notificationJson)})
}