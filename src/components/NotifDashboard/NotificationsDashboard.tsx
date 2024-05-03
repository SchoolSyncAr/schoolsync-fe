import Button from 'components/Button'
import { useNavigate } from 'react-router-dom'
import { NotifCard } from 'components/NotifCard/NotifCard'
import { useState } from 'react'
import { useOnInit } from 'utils/useOnInit'
import './NotificationDashboard.css'
import { NotifProps } from 'interfaces/Notification'
import { notificationService } from 'services/NotificationService'
import SearchBar from 'components/Searchbar/Searchbar'

function NotificationsDashboard() {
  const [notifications, setNotifications] = useState<NotifProps[]>([])
  const [errorMessage, setErrorMessage] = useState('')
  const [searchField, setSearchField] = useState('')

  useOnInit(async () => {
    try {
      const notifs = await notificationService.getAllGeneralNotifications()
      console.log('desde useOnInit')
      console.log(notifs)
      setNotifications(notifs)
      console.log('desde useOnInit longitud segundo  ' + notifications.length)
    } catch {
      setErrorMessage('No se pudo obtener info notifications')
    }
  })

  const handleSearchInit = () => {
    useOnInit(async () => {
      try {
        const notifs = await notificationService.getAllGeneralNotifications()
        setNotifications(notifs)
      } catch {
        setErrorMessage('No se pudo obtener info notifications')
      }
    })
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchField(event.target.value)
  }

  const notifList = () => {
    return notifications.map((data) => <NotifCard id={data.id} title={data.title} content={data.content} />)
  }

  const navigate = useNavigate()

  return (
    <>
      <SearchBar handleSearchInit={handleSearchInit} handleChange={handleChange} searchField={searchField} />
      <div className="notif-grid">{notifList()}</div>
      <br></br>
      <br></br>
      <div className="buttonsToRightEnd">
        <Button className="forAllButtons buttonReturn" height={60} actionOnClick={() => navigate('/parentDashboard')}>
          Volver
        </Button>
      </div>
    </>
  )
}

export default NotificationsDashboard
