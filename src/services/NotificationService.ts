import axios from 'axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'
import { Notification } from 'models/Notification'

class NotificationService {
  getAllGeneralNotifications = async () => {
    const allNotificationsJson = await axios.get(`${REACT_APP_REST_SERVER_URL}/notifications/all`) //array de objetos
    return allNotificationsJson.data.map((allNotificationsJson: { id: number; title: string; content: string }) =>
      Notification.fromJson(allNotificationsJson),
    )
  }

  createNotification = async (notification: {
      title: string
      content: string
    }) => {
    const response = await axios.post(`${REACT_APP_REST_SERVER_URL}/createNotifications`, notification)
    return response.data
  }

  getNotificationsCount = async () => {
    const notificationsCountJson = await axios.get(`${REACT_APP_REST_SERVER_URL}/notifications/count`) //array de objetos
    console.log(notificationsCountJson.data + 'del service')
    return notificationsCountJson.data
  }
}

export const notificationService = new NotificationService()
