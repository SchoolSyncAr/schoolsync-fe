import axios from 'axios'
import { REACT_APP_REST_SERVER_URL } from './config'
import { Notification } from '../components/Notification'

export const getAllGeneralNotifications = async () => {
  const allNotificationsJson = await axios.get(`${REACT_APP_REST_SERVER_URL}/notifications/all`) //array de objetos
  return allNotificationsJson.data.map((allNotificationsJson: { id: number; title: string; content: string }) =>
    Notification.fromJson(allNotificationsJson),
  )
}

export const createNotification = async (notification: { title: string; content: string }) => {
  const response = await fetch(`${REACT_APP_REST_SERVER_URL}/createNotifications`, {
    method: 'POST',
    body: JSON.stringify(notification),
  })
  const result = await response.json()
  return result
}
