import { useState, useRef } from 'react'
import { NotifProps } from 'models/interfaces/Notification'
import { IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import DeleteIcon from '@mui/icons-material/Delete'
import './NotifCard.scss'

interface NotifCardProps {
  notifProps: NotifProps
  deleteButton?: boolean
  handleDelete?: (notifId: number) => void
}

export const NotifCard = ({ notifProps, deleteButton, handleDelete }: NotifCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { title, content, weight, date } = notifProps

  const handleToggleModal = () => setModalOpen(!modalOpen)

  const formattedDate = new Date(date)
    .toLocaleString('es-AR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    })
    .replace(',', ' a las')

  return (
    <>
      <article className={`notif-card ${weight}`}>
        <section className="notif-card__title">
          {title}
          {deleteButton && handleDelete && (
            <div>
              <IconButton onClick={() => handleDelete(notifProps.id)}>
                <DeleteIcon style={{ fontSize: '1.3em' }} />
              </IconButton>
            </div>
          )}
        </section>
        <section className="notif-card__body" ref={contentRef}>
          {content}
        </section>
        <section className="notif-card__date">{formattedDate}</section>
        <section className="notif-card__button">
          <button
            onClick={handleToggleModal}
            className="button button--secondary button--rounded text--xs text--spaced text--upper animated shadow--box"
          >
            Ver Más
          </button>
        </section>
      </article>
      <Modal open={modalOpen} onClose={handleToggleModal}>
        <article className={`notif-card notif-modal ${weight}`}>
          <IconButton style={{ position: 'absolute', top: '0.5em', right: '0.5em' }} onClick={handleToggleModal}>
            <CloseIcon />
          </IconButton>
          <section className="notif-card__title">{title}</section>
          <section className="notif-card__body scrollable" ref={contentRef}>
            {content}
          </section>
        </article>
      </Modal>
    </>
  )
}
