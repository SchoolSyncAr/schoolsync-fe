import { useState } from 'react'
import notificationService  from 'services/NotificationService'
import { useOnInit } from 'utils/useOnInit'
import DeleteIcon from '@mui/icons-material/Delete'
import { deleteNotificationById2 } from '../services/prueba'
import '../components/NotifDashboard/NotificationDashboard.css'
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
        const newNotificationList = await deleteNotificationById2(notificationId, token)
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
        
            {/* ***** */}
        
            {/* {mockNotifications2.map((notification) => { */}
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










//no usar borrar

// const mockNotifications2 = [
//   {
//     id: 1,
//     title: 'Día de la bandera',
//     content: ' "Estimados Padres y Encargados:" Este acto reviste una gran importancia para nuestra comunidad educativa, ya que nos brinda la oportunidad de reflexionar y celebrar juntos los valores de nuestra patria. Será una ocasión especial donde nuestros estudiantes demostrarán sus habilidades artísticas y compartirán con ustedes momentos de orgullo y emoción. El programa del acto incluirá presentaciones de danzas folclóricas, declamaciones patrióticas, y otras actividades preparadas con esmero por nuestros alumnos y docentes. Esperamos contar con su presencia en este evento, que fortalece los lazos entre la escuela y las familias, y enriquece la experiencia educativa de nuestros queridos estudiantes.¡Los esperamos con entusiasmo! Atentamente,\n Directora Silvana y el Complejo Educativo" '
//   },
//   {
//     id: 2,
//     title: 'Reunión de Padres y Maestros - Recordatorio',
//     content: '"Estimados Padres y Encargados: Queremos recordarles amablemente sobre nuestra próxima Reunión de Padres y Maestros, que se llevará a cabo el [fecha] a las [hora] en nuestras instalaciones escolares. Esta reunión es una oportunidad invaluable para discutir el progreso académico y el desarrollo de sus hijos con sus maestros. Agradecemos de antemano su participación y compromiso con la educación de sus hijos. Esperamos verlos a todos allí y trabajar juntos en beneficio de nuestros estudiantes."¡Muchas gracias! Atentamente, Directora Silvana y el Complejo Educativo"',
//   },
//   {
//     id: 3,
//     title: 'Cambio de Horario Salida - Nivel Primario',
//     content: '"Estimada Comunidad Educativa: Queremos informarles que a partir del próximo Lunes 16 de Agosto, habrá un cambio en el horario escolar. Este cambio se implementa con el objetivo de mejorar la distribución de salida para el Nivel Primario. El nuevo horario será el siguiente: Grados 1 y 2: 15:00hs.   Grados 3 y 4: 15:20hs.  Grados 5 y 6: 15:40hs.  Agradecemos su comprensión y cooperación durante este ajuste. Por favor, asegúrense de que sus hijos estén informados sobre el nuevo horario y lleguen a la escuela a tiempo. Atentamente,\n Directora Silvana y el Complejo Educativo"',

//   },
// ]
