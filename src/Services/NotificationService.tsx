import axios from "axios"
import { REST_SERVER_URL } from "./Constants"
import { Notification } from "../Components/Notification"

export const getAllGeneralNotifications = async () => {
  const allNotificationsJson = await axios.get(`${REST_SERVER_URL}/notifications/all`) //array de objetos
  return allNotificationsJson.data.map((allNotificationsJson: { id: number; title: string; content: string }) => Notification.fromJson(allNotificationsJson) )
}