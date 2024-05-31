import { SetStateAction, useState } from 'react'
import  notificationService  from 'services/NotificationService'
import Button from '../Button'
import './CreateNotification.scss'
import { useNavigate } from 'react-router-dom'

function CreateNotification() {
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
      <article className='new-notif'>
        <section className='new-notif_header'>
          <h3>Crear Notificacion</h3>
        </section>
        <form onSubmit={createNewNotificationEventHandler}>
          <div className="new-notif_container">
            <label className="field__label text text--light">Titulo</label>
            <input
              onChange={titleInputHandler}
              value={title}
              className="field field--rounded animated shadow"
              autoFocus={true}
              required
            />
          </div>
          <div className="field__container">
            <label className="field__label text text--light">Contenido</label>
            <input
              onChange={contentInputHandler}
              value={content}
              className="field field--rounded animated shadow"
              autoFocus={true}
              required
            />
          </div>
          {/* <div className="container">
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
                <Button className='forAllButtons buttonReturn' height={60} actionOnClick={() => navigate('/parentDashboard')}>Volver</Button>
              </div>
            </div>
          </div> */}
        </form>
        <section className='go-back'>
          <Button className='forAllButtons buttonReturn' height={60} actionOnClick={() => navigate('/parentDashboard')}>Volver</Button>
        </section>
      </article>
    </>
  )
}

export default CreateNotification
