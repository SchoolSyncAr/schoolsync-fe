import axios from "axios"
import { REACT_APP_REST_SERVER_URL } from "constants/constants"



export const deleteNotificationById2 = async (notificationId: number, token: string) => {
  console.log("deletttttttttttt")
  console.log(notificationId)
  console.log(token)
  const headers = {
    Authorization: `Bearer ${token}`
  }

  const notificationJson = await axios.delete(`http://localhost:8080/notification/deleteNotification/${notificationId}?searchField=&orderParam=date&sortDirection=asc`, { headers })
  return notificationJson.data.map((notificationJson: any)=>{Notification.fromJson(notificationJson)})
}


//REACT_APP_REST_SERVER_URL=http://localhost:8080

//REACT_APP_REST_SERVER_URL=http://localhost:8081





//asi estaba antes de empezar a cambierlo 
// import axios from "axios"
// import { REACT_APP_REST_SERVER_URL } from "constants/constants"



// export const deleteNotificationById2 = async (notificationId: number) => {
//   const notificationJson = await axios.delete(`${REACT_APP_REST_SERVER_URL}/notification/deleteNotification/${notificationId}?searchField=&orderParam=date&sortDirection=asc`)
//   return notificationJson.data.map((notificationJson: any)=>{Notification.fromJson(notificationJson)})
// }