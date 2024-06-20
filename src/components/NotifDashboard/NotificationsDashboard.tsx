import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { NotifCard } from 'components/NotifCard/NotifCard'
import { useOnInit } from 'utils/useOnInit'
import { NotifProps } from 'models/interfaces/Notification'
import notificationService from 'services/NotificationService'
import { SearchBar } from 'components/Searchbar/Searchbar'
import './NotificationDashboard.scss'
import { useNotification } from 'components/hooks/NotificationContext'
import { Button } from 'components/basic/Button/Button'
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
  //const [params, setParams] = useSearchParams()
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

  // useEffect(() => {
  //   const newParams = new URLSearchParams()
  //   newParams.append('searchField', filter.searchField)
  //   newParams.append('orderParam', filter.orderParam)
  //   newParams.append('sortDirection', filter.sortDirection)
  //   setParams(newParams)
  // }, [filter, setParams])

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
        handlePinned={handlePinned}
        handleRead={handleRead}
        {...(deleteButton ? { deleteButton, handleDelete } : {})}
      />
    ))
  }

  const navigate = useNavigate()

  return (
    <>
      <SearchBar onSubmit={getData} />
      <div className="notif">
        <div className="notif__grid">{notifList()}</div>
        <div>
          <div className="notif__go-back">
            <Button
              text={'Volver'}
              onClick={() => navigate(deleteButton ? '/admin_dashboard' : '/parentDashboard')}
              animated
              rounded
            />
          </div>
        </div>
        <PrintError error={errorMessage} />
      </div>
    </>
  )
}

export default NotificationsDashboard
