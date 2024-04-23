import axios from "axios"
import { REST_SERVER_URL } from "./Constants"
import { Notification } from "../models/Notification"
import { NotifProps } from "../interfaces/Notification"

export const getAllGeneralNotifications = async () => {
  const allNotificationsJson = await axios.get(`${REST_SERVER_URL}/notifications/all`)
  return allNotificationsJson.data.map((notifData: NotifProps) => Notification.fromJson(notifData) )
}

export const createNotification = async (notification: { title: string; content: string }) =>
{
  const response = await fetch(`${REST_SERVER_URL}/createNotifications`, {
    method: "POST",
    body: JSON.stringify(notification)
  })
  const result = await response.json()
  return result
}