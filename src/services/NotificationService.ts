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
    const notificationsCountJson = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/count`)
    return notificationsCountJson.data
  }

  deleteNotificationById = async (notificationId: number, token: string) => {
    const headers = {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    }

    const data = {
      searchField: '',
      orderParam: 'date',
      sortDirection: 'asc'
    }

    const notificationJson = await api.delete(`api/notification/deleteNotification/${notificationId}?searchField=&orderParam=date&sortDirection=asc"`, {headers, data})
    return notificationJson.data.map((notificationJson: { id: number; title: string; content: string }) => Notification.fromJson(notificationJson))
  }

  getGroups = async () : Promise<string[]> => {
    const recipientGroups = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/recipient-groups`)
    return recipientGroups.data
  }
}

const notificationService = new NotificationService()
export default notificationService