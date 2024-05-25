import { SetStateAction, useState } from 'react'
import  notificationService  from 'services/NotificationService'
import Button from '../Button'
import './AdminDashboard.scss'
import { useNavigate } from 'react-router-dom'
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material'

function AdminDashboard() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [weight, setWeight] = useState('')
  const [recipients, setRecipients] = useState<string[]>([])


  const navigate = useNavigate()

  function getRecipients() {
    return ['Todos','1er Grado','2do Grado','3er Grado']
  }

  function getWeights() {
    return ['Alto','Medio','Bajo']
  }

  function titleInputHandler(event: { target: { value: SetStateAction<string> } }) {
    setTitle(event.target.value)
  }

  function contentInputHandler(event: { target: { value: SetStateAction<string> } }) {
    setContent(event.target.value)
  }

  function weightChangeHandler(event: { target: { value: SetStateAction<string> } }) {
    setWeight(event.target.value)
  }

  function recipientChangeHandler (event: SelectChangeEvent<string[]>) {
    const {
      target: { value },
    } = event
    setRecipients(
      typeof value === 'string' ? value.split(',') : value,
    )
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

        <form onSubmit={createNewNotificationEventHandler} className='new-notif_form'>
          <div onSubmit={createNewNotificationEventHandler} className='new-notif_body'>
            <div className="field__container">
              <input
                id="newNotifTitle"
                className="field field--rounded animated shadow"
                onChange={titleInputHandler}
                value={title}
                autoFocus={true}
                data-testid="login-username"
                required
              />
              <label className="field__label text text--light" htmlFor="newNotifTitle">
                Titulo
              </label>
            </div>
            <div className="field__container">
              <textarea
                id="newNotifContent"
                onChange={contentInputHandler}
                value={content}
                className="field field--textarea field--rounded animated shadow"
                required
              />
              <label className="field__label--textarea text text--light" htmlFor="newNotifContent">
                Contenido
              </label>
            </div>
          </div>
          <div className='new-notif_settings'>
            <div className='new-notif_settings-section'>
              <label className="text text--white text--md text--strong">
                Peso
              </label>
              <FormControl className="field field--select field--rounded animated shadow">
                <Select
                  value={weight}
                  onChange={weightChangeHandler}
                  className="field field--select field--rounded shadow"
                >
                  {getWeights().map((weight) => (
                    <MenuItem
                      key={weight}
                      value={weight}
                    >
                      {weight}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div className='new-notif_settings-section'>
              <label className="text text--white text--md text--strong">
                A quien le llega
              </label>
              <FormControl className="field field--select field--rounded animated shadow">
                <Select
                  multiple
                  value={recipients}
                  onChange={recipientChangeHandler}
                  className="field field--select field--rounded shadow"
                >
                  {getRecipients().map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText sx={{color: 'var(--color-white)', fontFamily: 'var(--typeface-main)'}}>(Seleccione 1 o más)</FormHelperText>
              </FormControl>
            </div>
          </div>
        </form>
        <button
          className="button button--primary button--tall button--rounded text--md text--spaced text--upper animated shadow--box"
          // disabled={!isDirty || !isValid || isSubmitting}
          type="submit"
          data-testid="new-notif-submit"
        >
          Crear
        </button>
        <section className='control-buttons'>
          <Button className='forAllButtons buttonReturn' height={60} actionOnClick={() => navigate('/parentDashboard')}>Volver</Button>
        </section>
      </article>
    </>
  )
}

export default AdminDashboard
