import { Notification } from 'models/Notification'
import { authService } from './AuthService'
import { NotifProps } from 'models/interfaces/Notification'
import API from 'api/axios'
import { VITE_REST_SERVER_URL } from 'constants/constants'

class NotificationService {
  getAllGeneralNotifications = async (filter: { searchField: string; orderParam: string; sortDirection: string }) => {
    const allNotificationsJson = await API.get(`${VITE_REST_SERVER_URL}/api/notification/all`, {
      params: {
        searchField: filter.searchField,
        orderParam: filter.orderParam,
        sortDirection: filter.sortDirection,
      },
    })

    return allNotificationsJson.data.map((notification: Notification) =>
      Notification.fromJson(notification as NotifProps),
    )
  }

  getAllNotificationsByParentId = async (filter: {
    searchField: string
    orderParam: string
    sortDirection: string
  }) => {
    const notifsJson = await API.get(`${VITE_REST_SERVER_URL}/api/parent/${authService.getUserId()}/notifications`, {
      params: {
        searchField: filter.searchField,
        orderParam: filter.orderParam,
        sortDirection: filter.sortDirection,
      },
    })
    console.log(notifsJson)
    return notifsJson.data.map((notif: NotifProps) => Notification.fromJson(notif))
  }

  createNotification = async (notification: NotifProps) => {
    const response = await API.post(`${VITE_REST_SERVER_URL}/api/notification/create`, notification)
    return response.data
  }

  getNotificationsCount = async () => {
    const notificationsCountJson = await API.get(`${VITE_REST_SERVER_URL}/api/notification/count`)
    return notificationsCountJson.data
  }

  deleteById = async (notifId: number) => {
    await API.delete(`${VITE_REST_SERVER_URL}/api/notification/${notifId}/delete`)
  }

  getGroups = async (): Promise<string[]> => {
    const recipientGroups = await API.get(`${VITE_REST_SERVER_URL}/api/notification/recipient-groups`)
    return recipientGroups.data
  }

  getPriorities = async (): Promise<string[]> => {
    const priorities = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/priorities`)
    return priorities.data
  }

  pinNotification = async (notificationId: number) => {
    const notificationJson = await API.put(`api/notification/pin`, notificationId)
    return notificationJson.data
  }

  readNotification = async (notificationId: number) => {
    /* const notificationJson =  */ await API.put(`api/notification/read`, notificationId)
    /* return notificationJson.data */
  }
}

const notificationService = new NotificationService()
export default notificationService
