import { SetStateAction, useState } from 'react'
import { createNotification } from '../services/notificationService'

function AdminDashboard() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

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
    createNotification(newNotification)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
    console.log(newNotification)
  }

  return (
    <>
      <h1>adminDashboard</h1>

      <form onSubmit={createNewNotificationEventHandler}>
        <div className="container">
          <div className="row mt-5">
            <ul className="list-group shadow"></ul>
            <input type="text" onChange={titleInputHandler} placeholder="Titulo de la Notificacion" />
            <textarea
              onChange={contentInputHandler}
              name="notificationContent"
              placeholder="Contenido"
              cols={30}
              rows={10}
            ></textarea>
            <button className="btn btn-primary" type="submit">
              Guardar
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default AdminDashboard
