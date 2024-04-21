import { useState } from "react"
import { createNotification } from "../Services/NotificationService"



function AdminDashboard() {

  let [title, setTitle] = useState('')
  let [content, setContent] = useState('')

  function titleInputHandler(event) {
    setTitle(event.target.value)
  }

  function contentInputHandler(event) {
    setContent(event.target.value)
  }

  function createNewNotificationEventHandler(event) {
    event.preventDefault()
    const newNotification = {
      title: title,
      content: content
    }
    createNotification(newNotification).then(result => {
      console.log(result)
    }).catch(error => {
      console.log(error)
    })
    console.log(newNotification)
  }

  return (<>
    <h1>adminDashboard</h1>
 
    <form onSubmit={createNewNotificationEventHandler}>
      <div className="container">
        <div className="row mt-5">
          <ul className="list-group shadow"></ul>
          <input type="text" onChange={titleInputHandler} placeholder="Titulo de la Notificacion"/>
          <textarea onChange={contentInputHandler} name="notificationContent" placeholder="Contenido" cols={30} rows={10}></textarea>
          <button className="btn btn-primary" type="submit">Guardar</button>
        </div>
      </div>
    </form>
  </>)
}

export default AdminDashboard