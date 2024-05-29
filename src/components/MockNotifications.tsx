import { useState } from 'react'
import notificationService  from 'services/NotificationService'
import { useOnInit } from 'utils/useOnInit'
import DeleteIcon from '@mui/icons-material/Delete'
import { authService } from 'services/AuthService.ts'
import { Notification } from 'models/Notification'

function MockNotifications() {
  const [generalNotificationsInfoBackend, setGeneralNotificationsInfoBackend] = useState<Array<Notification>>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const generalNotificationData = await notificationService.getAllGeneralNotifications({
        searchField: '',
        orderParam: '',
        sortDirection: ''
      })
      setGeneralNotificationsInfoBackend(generalNotificationData)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  })

  const handleDeleteNotification = async (notificationId: number) => {
    try {
      const token = authService.getUserToken()
      if (token) {
        const newNotificationList = await notificationService.deleteNotificationById(notificationId, token)
        setGeneralNotificationsInfoBackend(newNotificationList)
      } else {
        throw new Error("Token is null")
      }
    } catch {
      setErrorMessage("error")
    }
    finally {
      rechargeNotification()
      updateNotificationCount()
    }
  }

  const rechargeNotification = async () => {
    try {
      const generalNotificationData = await notificationService.getAllGeneralNotifications({
        searchField: '',
        orderParam: '',
        sortDirection: ''
      })
      setGeneralNotificationsInfoBackend(generalNotificationData)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  }
  const updateNotificationCount = async () => {
    try {
      const notificationCount = await notificationService.getNotificationsCount()
      const newNotificationCount = notificationCount
      return newNotificationCount
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  }

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <ul className="list-group shadow">
            {generalNotificationsInfoBackend.map((notification) => {
              return (
                <>
                  <div className="col-12 bg-light h3 text-center">{notification.title} </div>
                  <div className="buttonsToRightEnd">
                    <DeleteIcon style={{ color: 'red'}} onClick={() => handleDeleteNotification(notification.id)}></DeleteIcon>
                  </div>
                  <div className="col-12 bg-light mt-2 mb-5 h5">{notification.content}</div>
                </>
              )
            })
            }
          </ul>
        </div>
      </div>
    </>
  )
}

export default MockNotifications
