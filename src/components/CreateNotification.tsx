import { SetStateAction, useState } from 'react'
import  notificationService  from 'services/NotificationService'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

function AdminDashboard() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const navigate = useNavigate()

  function titleInputHandler(event: { target: { value: SetStateAction<string> } }) {
    setTitle(event.target.value)
  }

  function contentInputHandler(event: { target: { value: SetStateAction<string> } }) {
    setContent(event.target.value)
  }

  function createNewNotificationEventHandler(event: { preventDefault: () => void }) {
    event.preventDefault()
    const newNotification = {
      title: title,
      content: content,
    }
    notificationService
      .createNotification(newNotification)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
    setTitle('')
    setContent('')
    console.log(newNotification)
  }

  return (
    <>
      <h1>adminDashboard</h1>

      <form onSubmit={createNewNotificationEventHandler}>
        <div className="container">
          <div className="row mt-5">
            <ul className="list-group shadow"></ul>
            <input type="text" onChange={titleInputHandler} placeholder="Titulo de la Notificacion" value={title} />
            <textarea
              onChange={contentInputHandler}
              name="notificationContent"
              value={content}
              placeholder="Contenido"
              cols={30}
              rows={10}
            ></textarea>
            <button className="button button1" type="submit">
              Guardar
            </button>
            <div className="buttonsToRightEnd">
              <Button className='forAllButtons buttonReturn' height={60} actionOnClick={() => navigate('/adminDashboard')}>Volver</Button>
            </div>
          </div>
        </div>
      </form>
    </>
  )
}

export default AdminDashboard
