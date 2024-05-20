import api from 'api/axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'
import { Notification } from 'models/Notification'
// import { NotifProps } from '../interfaces/Notification'

class NotificationService {
  getAllGeneralNotifications = async (filter: { searchField: string; orderParam: string; sortDirection: string }) => {
    const allNotificationsJson = await api.get(`${REACT_APP_REST_SERVER_URL}/notifications/all`, {
      params: {
        searchField: filter.searchField,
        orderParam: filter.orderParam,
        sortDirection: filter.sortDirection,
      },
    })
    return allNotificationsJson.data.map((allNotificationsJson: { id: number; title: string; content: string }) =>
      Notification.fromJson(allNotificationsJson),
    )
  }

  createNotification = async (notification: { title: string; content: string }) => {
    const response = await api.post(`${REACT_APP_REST_SERVER_URL}/createNotifications`, notification)
    return response.data
  }

  getNotificationsCount = async () => {
    const notificationsCountJson = await api.get(`${REACT_APP_REST_SERVER_URL}/notifications/count`) //array de objetos
    console.log(notificationsCountJson.data + 'del service')
    return notificationsCountJson.data
  }

  //   deleteNotificationById = async (notificationId: any) => {
  //   console.log("sevide")
  //   console.log(notificationId)
  //   const notificationJson = await axios.delete(`${REST_SERVER_URL}/deleteNotification/${notificationId}`)
  //   return notificationJson.data.map((notificationJson: NotifProps)=>{Notification.fromJson(notificationJson)})
  // }

  deleteNotificationById = async (notificationId: number) => {
    const notificationJson = await api.delete(`${REACT_APP_REST_SERVER_URL}/deleteNotification/${notificationId}`)
    return notificationJson.data.map((notificationJson: string) => {
      Notification.fromJson(notificationJson)
    })
  }
}

const notificationService = new NotificationService()
export default notificationService
