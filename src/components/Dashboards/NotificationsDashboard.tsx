import { useState } from 'react'
import { NotifCard } from 'components/NotifCard/NotifCard'
import { useOnInit } from 'utils/useOnInit'
import { NotifProps } from 'models/interfaces/Notification'
import notificationService from 'services/NotificationService'
import { SearchBar } from 'components/Searchbar/Searchbar'
import './Dashboard.scss'
import { useNotification } from 'components/hooks/NotificationContext'
import { PrintError } from 'components/PrintError/PrintError'
import { authService } from 'services/AuthService'
import { enqueueSnackbar } from 'notistack'
import { FilterArgs, emptyFilter } from 'root/src/models/interfaces/types'
import { SubmitHandler } from 'react-hook-form'

interface NotifDashboardProps {
  deleteButton?: boolean
}

function NotificationsDashboard({ deleteButton = false }: NotifDashboardProps) {
  const { updateNotifications } = useNotification()
  const [notifications, setNotifications] = useState<NotifProps[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [lastFilter, setLastFilter] = useState<FilterArgs>(emptyFilter)

  const getData: SubmitHandler<FilterArgs> = async (data) => {
    try {
      const notifs = authService.adminStatus()
        ? await notificationService.getAllGeneralNotifications(data)
        : await notificationService.getAllNotificationsByParentId(data)
      setNotifications(notifs)
      updateNotifications(notifs.filter((notification: NotifProps) => !notification.read).length)
      setLastFilter(data)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  }

  useOnInit(async () => {
    getData(emptyFilter)
  })

  const handlePinned = async (notifId: number) => {
    try {
      await notificationService.pinNotification(notifId)
      getData(lastFilter)
    } catch {
      setErrorMessage('No se pudo pinnear la notificación')
    }
  }

  const handleRead = async (notifId: number) => {
    try {
      await notificationService.readNotification(notifId)
      getData(lastFilter)
    } catch {
      setErrorMessage('No se pudo setear como leída la notificación')
    }
  }

  const handleDelete = async (notifId: number) => {
    try {
      await notificationService.deleteById(notifId)
      getData(lastFilter)
      enqueueSnackbar('Notificación borrada', { variant: 'error' })
    } catch {
      setErrorMessage('error')
    }
  }

  const notifList = () => {
    return notifications.map((data, index) => (
      <NotifCard
        key={index}
        notifProps={data}
        deleteButton={deleteButton}
        handleDelete={deleteButton ? () => handleDelete(data.id) : undefined}
        handlePinned={handlePinned}
        handleRead={handleRead}
        testNumber={index}
      />
    ))
  }

  return (
    <>
      <SearchBar onSubmit={getData} />
      <div className="dashboard">
        <div className="dashboard__grid">{notifList()}</div>
        <PrintError error={errorMessage} />
      </div>
    </>
  )
}

export default NotificationsDashboard
