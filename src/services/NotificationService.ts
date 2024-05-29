import api from 'api/axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'
import { Notification } from 'models/Notification'
import { authService } from './AuthService'
import { NotifProps } from 'interfaces/Notification'

class NotificationService {
  getAllGeneralNotifications = async (filter: { searchField: string; orderParam: string; sortDirection: string }) => {
    const allNotificationsJson = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/all`, {
      params: {
        searchField: filter.searchField,
        orderParam: filter.orderParam,
        sortDirection: filter.sortDirection,
      },
    })
    console.log(allNotificationsJson)
    return allNotificationsJson.data.map((allNotificationsJson: Notification) =>
      Notification.fromJson(allNotificationsJson)
    )
  }

  getAllNotificationsByParentId = async (filter: { searchField: string; orderParam: string; sortDirection: string }) => {
    const notifsJson = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/${authService.getUserId()}/all`, {
      params: {
        searchField: filter.searchField,
        orderParam: filter.orderParam,
        sortDirection: filter.sortDirection,
      },
    })
    console.log(notifsJson)
    return notifsJson.data.map((notif: NotifProps) =>
      Notification.fromJson(notif)
    )
  }

  createNotification = async (notification: NotifProps) => {
    const response = await api.post(`${REACT_APP_REST_SERVER_URL}/api/notification/create`, notification)
    return response.data
  }

  getNotificationsCount = async () => {
    const notificationsCountJson = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/count`) //array de objetos
    console.log(notificationsCountJson.data + 'del service')
    return notificationsCountJson.data
  }

  //   deleteNotificationById = async (notificationId: any) => {
  //   console.log("sevide")
  //   console.log(notificationId)
  //   const notificationJson = await axios.delete(`${REST_SERVER_URL}/deleteNotification/${notificationId}`)
  //   return notificationJson.data.map((notificationJson: NotifProps)=>{Notification.fromJson(notificationJson)})
  // }

  // deleteNotificationById = async (notificationId: number) => {
  //   await api.delete(`${REACT_APP_REST_SERVER_URL}/deleteNotification/${notificationId}`)
  //   return notificationJson.data.map((notificationJson: string) => {
  //     Notification.fromJson(notificationJson)
  //   })
  // }

  getGroups = async () : Promise<string[]> => {
    const recipientGroups = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/recipient-groups`)
    return recipientGroups.data
  }
}

const notificationService = new NotificationService()
export default notificationService
