import api from 'api/axios'
import { REACT_APP_REST_SERVER_URL } from 'constants/constants'
import { Notification } from 'models/Notification'
// import { NotifProps } from 'interfaces/Notification'
class NotificationService {
  getAllGeneralNotifications = async (filter: { searchField: string; orderParam: string; sortDirection: string }) => {
    const allNotificationsJson = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/all`, {
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
    const response = await api.post(`${REACT_APP_REST_SERVER_URL}/api/notification/create`, notification)
    return response.data
  }

  getNotificationsCount = async () => {
    const notificationsCountJson = await api.get(`${REACT_APP_REST_SERVER_URL}/api/notification/count`) //array de objetos
    // console.log(notificationsCountJson.data + 'del service')
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
}

const notificationService = new NotificationService()
export default notificationService


//  return allNotificationsJson.data.map((allNotificationsJson: { id: number; title: string; content: string }) =>
//     Notification.fromJson(allNotificationsJson),
//   )