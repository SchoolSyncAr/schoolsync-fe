// src/components/NotifDashboard/NotificationsDashboard.tsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { NotifCard } from 'components/NotifCard/NotifCard'
import { useOnInit } from 'utils/useOnInit'
import { NotifProps } from 'models/interfaces/Notification'
import notificationService from 'services/NotificationService'
import SearchBar from 'components/Searchbar/Searchbar'
import './NotificationDashboard.scss'
import { useNotification } from 'components/hooks/NotificationContext'

interface NotifDashboardProps {
  deleteButton?: boolean
}

function NotificationsDashboard({ deleteButton = false }: NotifDashboardProps) {
  const { updateNotifications } = useNotification()
  const [notifications, setNotifications] = useState<NotifProps[]>([])
  const [params, setParams] = useSearchParams()
  const [errorMessage, setErrorMessage] = useState('')
  const [filter, setFilter] = useState({
    searchField: params.get('searchField') || '',
    orderParam: params.get('sortData') || '',
    sortDirection: params.get('sortDirection') || '',
  })

  const getData = async () => {
    try {
      const notifs = await notificationService.getAllGeneralNotifications(filter)
      setNotifications(notifs)
      updateNotifications(notifs) // Actualizar el contexto
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  }

  useOnInit(async () => {
    getData()
  })

  useEffect(() => {
    const newParams = new URLSearchParams()
    newParams.append('searchField', filter.searchField)
    newParams.append('orderParam', filter.orderParam)
    newParams.append('sortDirection', filter.sortDirection)
    setParams(newParams)
  }, [filter, setParams])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target
    const param = type === 'checkbox' ? checked : value
    setFilter((prevfilter) => ({
      ...prevfilter,
      [name]: param,
    }))
  }

  const handleFilterChange = (filterName: string, filterValue: string) => {
    setFilter((prevfilter) => ({
      ...prevfilter,
      [filterName]: filterValue,
    }))
  }

  const handlePinned = async (notifId: number) => {
    try {
      console.log(notifId)
      await notificationService.pinNotification(notifId)
      getData()
    } catch {
      setErrorMessage('No se pudo pinnear la notificación')
    }
  }

  const handleRead = async (notifId: number) => {
    try {
      console.log(notifId)
      await notificationService.readNotification(notifId)
      getData()
    } catch {
      setErrorMessage('No se pudo setear como leída la notificación')
    }
  }

  const handleDelete = async (notifId: number) => {
    try {
      await notificationService.deleteById(notifId)
      getData()
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
      <SearchBar
        handleSearchInit={getData}
        handleChange={handleChange}
        filter={filter}
        handleFilterChange={handleFilterChange}
      />
      <div className="notif">
        <div className="notif__grid">{notifList()}</div>
        <div>
          <div className="notif__go-back">
            <button
              className="button button--primary button--medium button--rounded text--md text--spaced text--upper animated shadow--box"
              onClick={() => navigate(deleteButton ? '/adminDashboard' : '/parentDashboard')}
            >
              Volver
            </button>
          </div>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </>
  )
}

export default NotificationsDashboard
