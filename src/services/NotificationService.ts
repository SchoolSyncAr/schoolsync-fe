import api from 'api/axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'
import { Notification } from 'models/Notification'
import { authService } from './AuthService'
import { NotifProps } from 'models/interfaces/Notification'

class NotificationService {
  getAllGeneralNotifications = async (filter: { searchField: string; orderParam: string; sortDirection: string }) => {
    const allNotificationsJson = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/all`, {
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
    const notifsJson = await api.get(`${REACT_APP_REST_SERVER_URL}/api/parent/${authService.getUserId()}/notifications`, {
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
    const response = await api.post(`${REACT_APP_REST_SERVER_URL}/api/notification/create`, notification)
    return response.data
  }

  getNotificationsCount = async () => {
    const param: number = 3
    const notificationsCountJson = await api.get(`api/notification/count`, {params: {userId: param}})
    return notificationsCountJson.data
  }

  // deleteNotificationById = async (notificationId: number, token: string) => {
  //   const headers = {
  //     Authorization: `Bearer ${token}`,
  //     'Content-Type': 'application/json'
  //   }

  //   const data = {
  //     searchField: '',
  //     orderParam: 'date',
  //     sortDirection: 'asc'
  //   }

  //   const notificationJson = await api.delete(`api/notification/deleteNotification/${notificationId}?searchField=&orderParam=date&sortDirection=asc"`, {headers, data})
  //   return notificationJson.data.map((notificationJson: { id: number; title: string; content: string }) => Notification.fromJson(notificationJson))
  // }

  deleteById = async (notifId: number) => {
    await api.delete(`${REACT_APP_REST_SERVER_URL}/api/notification/${notifId}/delete`)
  }

  getGroups = async (): Promise<string[]> => {
    const recipientGroups = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/recipient-groups`)
    return recipientGroups.data
  }

  pinNotification = async (notificationId: number) => {
    const notificationJson = await api.put(`api/notification/pin`, notificationId)
    return notificationJson.data
  }

  readNotification = async (notificationId: number) => {
    /* const notificationJson =  */ await api.put(`api/notification/read`, notificationId)
    /* return notificationJson.data */
  }
}

const notificationService = new NotificationService()
export default notificationService
