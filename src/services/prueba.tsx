import axios from "axios"
import { REACT_APP_REST_SERVER_URL } from "constants/constants"
// import { REST_SERVER_URL } from "../constants/constants"


export const deleteNotificationById2 = async (notificationId: number) => {
  const notificationJson = await axios.delete(`${REACT_APP_REST_SERVER_URL}/deleteNotification/${notificationId}`)
  return notificationJson.data.map((notificationJson: any)=>{Notification.fromJson(notificationJson)})
}