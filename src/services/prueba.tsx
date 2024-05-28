// import api from "api/axios"
// import { Notification } from 'models/Notification'


// export const deleteNotificationById2 = async (notificationId: number, token: string) => {
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
//   return notificationJson.data.map((notificationJson: any) => Notification.fromJson(notificationJson))

// }
