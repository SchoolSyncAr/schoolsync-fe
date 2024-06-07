import { SetStateAction, useState } from 'react'
import notificationService from 'services/NotificationService'
import { useNavigate } from 'react-router-dom'
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
} from '@mui/material'
import { Notification } from 'models/Notification'
import { parentService } from 'services/ParentService'
import { useOnInit } from 'utils/useOnInit'
import { authService } from 'services/AuthService'
import './CreateNotification.scss'
import { Parent } from 'models/Parent'
import { NotifProps } from 'models/interfaces/Notification'

function CreateNotification() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [weight, setWeight] = useState('')
  const [parents, setParents] = useState<Parent[]>([])
  const [groups, setGroups] = useState<string[]>([])
  const [recipientGroups, setRecipientGroups] = useState<string[]>([])
  const [recipient, setRecipient] = useState<Parent>(new Parent())
  const [scope, setScope] = useState<string>('')

  const navigate = useNavigate()

  const getParents = async () => {
    try {
      const fetchedParents = await parentService.getAll()
      setParents(fetchedParents)
    } catch (error) {
      // Error
    }
  }

  const getGroups = async () => {
    try {
      const fetchedGroups = await notificationService.getGroups()
      setGroups(fetchedGroups)
    } catch (error) {
      // Error
    }
  }

  function getWeights() {
    return ['BAJO', 'MEDIO', 'ALTO']
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

  const handleScopeChange = (event: { target: { value: SetStateAction<string> } }) => {
    setRecipientGroups([])
    setRecipient(new Parent())
    setScope(event.target.value)
  }

  function recipientChangeHandler(event: SelectChangeEvent<Parent>) {
    const { value } = event.target
    setRecipient(value as Parent)
  }

  function recipientGroupChangeHandler(event: SelectChangeEvent<string[]>) {
    const { value } = event.target
    setRecipientGroups(Array.isArray(value) ? value : [value])
  }

  function createNewNotificationEventHandler(event: { preventDefault: () => void }) {
    event.preventDefault()
    const newNotification = new Notification({
      id: 0,
      title: title,
      content: content,
      weight: weight,
      sender: Number(authService.getUserId()),
      scope: scope.toUpperCase(),
      recipientGroups: recipientGroups,
      recipient: recipient.id,
      date: '',
    })
    notificationService
      .createNotification(newNotification as NotifProps)
      .then((result) => {
        console.log(result)
      })
      .catch((error) => {
        console.log(error)
      })
    clearAll()
    console.log(newNotification)
  }

  function clearAll() {
    setTitle('')
    setContent('')
    setRecipient(new Parent())
    setRecipientGroups([])
  }

  useOnInit(() => {
    getParents()
    getGroups()
  })

  return (
    <>
      <article className="new-notif">
        <section className="new-notif_header">
          <div className="text text--xl">Crear Notificacion</div>
        </section>
        <form onSubmit={createNewNotificationEventHandler} className="new-notif_form">
          <div className="new-notif_form-body">
            <div onSubmit={createNewNotificationEventHandler} className="new-notif_text">
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
            <div className="new-notif_settings">
              <div className="new-notif_settings-section">
                <label className="text text--white text--md text--strong">Peso</label>
                <FormControl className="field field--select field--rounded animated shadow">
                  <Select
                    value={weight}
                    onChange={weightChangeHandler}
                    className="field field--select field--rounded shadow"
                  >
                    {getWeights().map((weight) => (
                      <MenuItem key={weight} value={weight}>
                        {weight}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className="new-notif_settings-section">
                <label className="text text--white text--md text--strong">A quien le llega</label>
                <FormControl sx={{ color: 'white' }}>
                  <RadioGroup row value={scope} onChange={handleScopeChange}>
                    <FormControlLabel
                      value="General"
                      control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />}
                      label="General"
                    />
                    <FormControlLabel
                      value="Individual"
                      control={<Radio sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }} />}
                      label="Individual"
                    />
                  </RadioGroup>
                </FormControl>
                <FormControl className="field field--select field--rounded animated shadow">
                  {scope === 'Individual' && (
                    <Select
                      value={recipient}
                      onChange={recipientChangeHandler}
                      className="field field--select field--rounded shadow"
                    >
                      {parents.map((parent) => (
                        <MenuItem key={parent.id} value={parent.id}>
                          {parent.firstName}, {parent.lastName}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  {scope === 'General' && (
                    <>
                      <Select
                        multiple
                        value={recipientGroups}
                        onChange={recipientGroupChangeHandler}
                        className="field field--select field--rounded shadow"
                      >
                        {groups.map((group, index) => (
                          <MenuItem key={index} value={group}>
                            {group}
                          </MenuItem>
                        ))}
                      </Select>
                      <FormHelperText sx={{ color: 'var(--color-white)', fontFamily: 'var(--typeface-main)' }}>
                        (Seleccione 1 o más)
                      </FormHelperText>
                    </>
                  )}
                </FormControl>
              </div>
            </div>
          </div>
          <button
            className="button button--primary button--tall button--rounded text--md text--spaced text--upper animated shadow--box"
            // disabled={!isDirty || !isValid || isSubmitting}
            type="submit"
            data-testid="new-notif-submit"
          >
            Crear
          </button>
        </form>
        <section className="control-buttons">
          <button
            className="button button--primary button--medium button--rounded text--md text--spaced text--upper animated shadow--box"
            onClick={() => navigate('/adminDashboard')}
          >
            Volver
          </button>
        </section>
      </article>
    </>
  )
}

export default CreateNotification
