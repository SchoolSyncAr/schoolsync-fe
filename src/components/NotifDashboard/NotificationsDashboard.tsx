import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from 'components/Button'
import { NotifCard } from 'components/NotifCard/NotifCard'
import { useOnInit } from 'utils/useOnInit'
import './NotificationDashboard.css'
import { NotifProps } from 'interfaces/Notification'
import notificationService from 'services/NotificationService'
import SearchBar from 'components/Searchbar/Searchbar'

function NotificationsDashboard() {
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
      console.log('solic notif ', notifs)
      setNotifications(notifs)
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

  const notifList = () => {
    return notifications.map((data) => (
      <NotifCard key={data.id} id={data.id} title={data.title} content={data.content} />
    ))
  }

  const navigate = useNavigate()

  return (
    <>
      <SearchBar
        handleSearchInit={getData}
        handleChange={handleChange}
        filter={filter}
        handleFilterChange={handleFilterChange} // Pasa la nueva prop
      />
      <div className="notif-grid">{notifList()}</div>
      <div>
        <div className="buttonsToRightEnd">
          <Button className="forAllButtons buttonReturn" height={60} actionOnClick={() => navigate('/parentDashboard')}>
            Volver
          </Button>
        </div>
      </div>
    </>
  )
}

export default NotificationsDashboard
