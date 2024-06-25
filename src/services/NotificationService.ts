import { Notification } from 'models/Notification'
import { authService } from './AuthService'
import { NotifProps } from 'models/interfaces/Notification'
import API from 'api/axios'
import { VITE_REST_SERVER_URL } from 'constants/constants'
import { FilterArgs } from '../models/interfaces/types'

class NotificationService {
  getAllGeneralNotifications = async (filter: FilterArgs) => {
    const notificationsJson = await API.get(`${VITE_REST_SERVER_URL}/api/notification/all`, {
      params: {
        searchField: filter.searchField,
        sortField: filter.sortField,
      },
    })

    return notificationsJson.data.map((notification: Notification) => new Notification(notification as NotifProps))
  }

  getAllNotificationsByParentId = async (filter: FilterArgs) => {
    const notificationsJson = await API.get(
      `${VITE_REST_SERVER_URL}/api/parent/${authService.getUserId()}/notifications`,
      {
        params: {
          searchField: filter.searchField,
          sortField: filter.sortField,
          /* children: filter.children, */
          unread: filter.read,
        },
      },
    )
    return notificationsJson.data.map((notification: NotifProps) => new Notification(notification))
  }

  createNotification = async (notification: NotifProps) => {
    const response = await API.post(`${VITE_REST_SERVER_URL}/api/notification/create`, notification)
    return response.data
  }

  getNotificationsCount = async () => {
    const param: number = 3
    const notificationsCountJson = await API.get(`api/notification/count`, { params: { userId: param } })

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
    const priorities = await API.get(`${VITE_REST_SERVER_URL}/api/notification/priorities`)
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
