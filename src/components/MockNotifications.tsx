import { useState } from 'react'
import { notificationService } from '../services/NotificationService'
import { useOnInit } from '../Utils/useOnInit'

function MockNotifications() {
  const [generalNotificationsInfoBackend, setGeneralNotificationsInfoBackend] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const generalNotificationData = await notificationService.getAllGeneralNotifications()
      console.log('desde useOnInit')
      console.log(generalNotificationData)
      setGeneralNotificationsInfoBackend(generalNotificationData)
      console.log('desde useOnInit longitud segundo  ' + generalNotificationsInfoBackend.length)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  })

  const mockNotifications2 = [
    {
      nId: 1,
      nTitle: 'Día de la bandera',
      nContenido: 'Acto en el salón de actos a las 12.hs',
    },
    {
      nId: 2,
      nTitle: '9 de julio',
      nContenido: 'Se festejará con empanadas',
    },
    {
      nId: 3,
      nTitle: 'Jornada Docente',
      nContenido: 'El colegio permanecerá cerrado',
    },
  ]

  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <ul className="list-group shadow">
            {generalNotificationsInfoBackend.map((notification) => {
              return (
                <>
                  <div className="col-12 bg-light h3 text-center">{notification.title} </div>
                  <div className="col-12 bg-light mt-2 mb-5 h5">{notification.content}</div>
                </>
              )
            })}

            {/*lo dejo para usar sin levantar el back, pero eventualmente hay que sacarlo*/}

            {/* {
            mockNotifications2.map((notification) => {
              return (
                <><div className="col-12 bg-light h3 text-center">
                  {notification.nTitle} </div>
                <div className="col-12 bg-light mt-2 mb-5 h5">
                  {notification.nContenido}
                </div></>)
            })
          } */}
          </ul>
        </div>
      </div>
    </>
  )
}

export default MockNotifications
