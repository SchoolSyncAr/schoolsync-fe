import { SyntheticEvent, useEffect, useState } from 'react'
import notificationService from 'services/NotificationService'
import { Autocomplete, MenuItem, Select, TextField } from '@mui/material'
import { Notification } from 'models/Notification'
import { parentService } from 'services/ParentService'
import { authService } from 'services/AuthService'
import './CreateNotification.scss'
import { Parent } from 'models/Parent'
import { NotifProps } from 'models/interfaces/Notification'
import { enqueueSnackbar } from 'notistack'

interface FormState {
  title: string
  content: string
  priority: string
  recipients: Parent[]
  recipientGroups: string[]
}

function CreateNotification() {
  const [formState, setFormState] = useState<FormState>({
    title: '',
    content: '',
    priority: "default",
    recipients: [],
    recipientGroups: [],
  })

  const [parents, setParents] = useState<Parent[]>([])
  const [groups, setGroups] = useState<string[]>([])
  const [priorities, setPriorities] = useState<string[]>([])
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({
    title: '',
    content: '',
    priority: '',
    recipients: '',
  })

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedParents = await parentService.getAll()
        const fetchedGroups = await notificationService.getGroups()
        const fetchedPriorities = await notificationService.getPriorities()

        setParents(fetchedParents)
        setGroups(fetchedGroups)
        setPriorities(fetchedPriorities)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  function validateForm() {
    let valid = true
    const errors: { [key: string]: string } = {}

    if (!formState.title.trim()) {
      errors['title'] = 'El título es requerido'
      valid = false
    }

    if (!formState.content.trim()) {
      errors['content'] = 'El contenido es requerido'
      valid = false
    }

    if (formState.priority == "default") {
      errors['priority'] = 'Seleccione una prioridad'
      valid = false
    }

    if (formState.recipients.length === 0 && formState.recipientGroups.length === 0) {
      errors['recipients'] = 'Seleccione al menos uno'
      valid = false
    }

    setFormErrors(errors)
    return valid
  }

  function titleInputHandler(event: { target: { value: string } }) {
    setFormState({ ...formState, title: event.target.value })
  }

  function contentInputHandler(event: { target: { value: string } }) {
    setFormState({ ...formState, content: event.target.value })
  }

  function weightChangeHandler(event: { target: { value: string } }) {
    setFormState({ ...formState, priority: event.target.value })
  }

  const handleRecipientChange = (event: SyntheticEvent<Element, Event>, value: Parent[]) => {
    event
    setFormState({ ...formState, recipients: value })
  }

  function recipientGroupChangeHandler(event: SyntheticEvent<Element, Event>, value: string[]) {
    event
    setFormState({ ...formState, recipientGroups: value })
  }

  async function createNewNotificationEventHandler(event: { preventDefault: () => void }) {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    const newNotification = new Notification({
      id: 0,
      title: formState.title,
      content: formState.content,
      weight: formState.priority,
      sender: Number(authService.getUserId()),
      recipientGroups: formState.recipientGroups,
      recipients: formState.recipients.map((parent) => parent.id),
    })

    try {
      await notificationService.createNotification(newNotification as NotifProps)
      enqueueSnackbar('Notificacion creada con exito', { variant: 'success' })
      clearAll()
    } catch (error) {
      console.error('Error creating notification:', error)
      enqueueSnackbar('No se pudo crear la notificación', { variant: 'error' })
    }
  }

  function clearAll() {
    setFormState({ ...formState, title: '', content: '', priority: "default", recipients: [], recipientGroups: [] })
  }

  return (
    <>
      <form onSubmit={createNewNotificationEventHandler} className="new-notif">
        <section className="new-notif__form-body">
          <div onSubmit={createNewNotificationEventHandler} className="new-notif__text">
            <div className="text text--xl text--strong text--white">Crear Notificacion</div>
            <div className="new-notif__field">
              <label className="text text--white text--strong">
                Titulo {formErrors['title'] && <span className="text text--xs text--error">{formErrors['title']}</span>}
              </label>
              <TextField 
                id="outlined-basic" 
                value={formState.title}
                onChange={titleInputHandler}
                className='field field--rounded field--dropdown shadow'
                autoFocus
              />
            </div>  
            <div className="new-notif__field">
              <label className="text text--white text--strong">
                Contenido {formErrors['content'] && <span className="text text--xs text--error">{formErrors['content']}</span>}
              </label>
              <TextField 
                id="outlined-basic" 
                value={formState.content} 
                onChange={contentInputHandler}
                className='field field--textarea field--rounded field--dropdown shadow'
                multiline
                rows={8}
              />
            </div>              
            {/* <div className="field__container">
              <input
                id="newNotifTitle"
                className="field field--rounded animated shadow"
                onChange={titleInputHandler}
                value={formState.title}
                autoFocus={true}
              />
              <label className="field__label text" htmlFor="newNotifTitle">
                Titulo {formErrors['title'] && <span className="text text--xs text--error">{formErrors['title']}</span>}
              </label>
            </div> */}
            {/* <div className="field__container">
              <textarea
                id="newNotifContent"
                className="field field--textarea field--rounded animated shadow"
                onChange={contentInputHandler}
                value={formState.content}
              />
              <label className="field__label--textarea text" htmlFor="newNotifContent">
                Contenido{' '}
                {formErrors['content'] && <span className="text text--xs text--error">{formErrors['content']}</span>}
              </label>
            </div> */}
          </div>
          <div className="new-notif__settings">
            <div className="new-notif__settings-section">
              <div className="new-notif__field">
                <label className="text text--white text--md text--strong">
                  Prioridad {formErrors['priority'] && <span className="text text--xs text--error">{formErrors['priority']}</span>}
                </label>
                <Select
                  value={formState.priority}
                  onChange={weightChangeHandler}
                  className="field field--rounded field--dropdown shadow"
                >
                  <MenuItem value="default" className='text--light'>Seleccione una opción</MenuItem>
                  {priorities.map((item) => (
                    <MenuItem key={item} value={item}>
                      {item}
                    </MenuItem>
                  ))} 
                </Select>
              </div>
            </div>
            <div className="new-notif__settings-section">
              <label> 
                <span className="text text--white text--md text--strong">A quien le llega {formErrors['recipients'] && <span className="text text--xs text--error">{formErrors['recipients']}</span>}</span>
                <div className="text text--xs text--white">(Seleccione 1 o más)</div>
              </label>
              <div className="new-notif__field">
                <label className="text text--white text--strong">Padres:</label>
                <Autocomplete
                  multiple
                  options={parents}
                  getOptionLabel={(option) => `${option.firstName}, ${option.lastName}`}
                  value={formState.recipients}
                  onChange={handleRecipientChange}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Buscar..."
                      sx={{ background: 'var(--color-white)', borderRadius: 'var(--border-radius-sm)' }}
                    />
                  )}
                />
              </div>
              <div className="new-notif__field">
                <label className="text text--white text--strong">Grupos:</label>
                <Autocomplete
                  multiple
                  options={groups}
                  value={formState.recipientGroups}
                  onChange={recipientGroupChangeHandler}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Buscar..."
                      sx={{ background: 'var(--color-white)', borderRadius: 'var(--border-radius-sm)' }}
                    />
                  )}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="control-buttons">
          <button
            className="button button--tertiary button--tall button--rounded text--md text--spaced text--upper animated shadow--box"
            // disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
            data-testid="new-notif-submit"
          >
            Crear
          </button>
        </section>
      </form>
    </>
  )
}

export default CreateNotification
