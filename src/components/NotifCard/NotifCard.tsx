import { useState, useRef } from 'react'
import { NotifProps } from 'models/interfaces/Notification'
import { IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead'
import DeleteIcon from '@mui/icons-material/Delete'
import { Button } from 'components/basic/Button/Button'
import './NotifCard.scss'
import { ModalDelete } from '../Modal/DeleteModal'

interface NotifCardProps {
  notifProps: NotifProps
  deleteButton?: boolean
  handleDelete?: () => void
  handlePinned?: (notifId: number) => void
  handleRead?: (notifId: number) => void
  testNumber: number
}

export const NotifCard = ({
  notifProps,
  deleteButton,
  handleDelete,
  handlePinned,
  handleRead,
  testNumber = 0,
}: NotifCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { title, content, weight, date, pinned, read } = notifProps

  const handleToggleModal = () => setModalOpen(!modalOpen)

  const formattedDate = (date ? new Date(date) : new Date())
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
      <article
        className={`notif-card ${weight} ${read ? 'read-true' : ''}`}
        data-testid={`notification-card${testNumber}`}
      >
        <section className="notif-card__title" data-testid={`notification-title${testNumber}`}>
          {title}
          {!deleteButton ? (
            <div className="notif-card__actions">
              {handlePinned &&
                (pinned ? (
                  <IconButton style={{ color: 'inherit' }} onClick={() => handlePinned(notifProps.id)}>
                    <PushPinIcon />
                  </IconButton>
                ) : (
                  <IconButton style={{ color: 'inherit' }} onClick={() => handlePinned(notifProps.id)}>
                    <PushPinOutlinedIcon />
                  </IconButton>
                ))}

              {handleRead &&
                (read ? (
                  <IconButton style={{ color: 'inherit' }} onClick={() => handleRead(notifProps.id)}>
                    <MarkChatReadIcon />
                  </IconButton>
                ) : (
                  <IconButton style={{ color: 'inherit' }} onClick={() => handleRead(notifProps.id)}>
                    <MarkChatUnreadIcon />
                  </IconButton>
                ))}
            </div>
          ) : null}
          {deleteButton && handleDelete && (
            <IconButton onClick={() => setDeleteModalOpen(true)} data-testid={`notification-delete${testNumber}`}>
              <DeleteIcon style={{ fontSize: '1.3em', color: 'var(--color-white)' }} />
            </IconButton>
          )}
        </section>

        <section className="notif-card__body" ref={contentRef} data-testid={`notification-content${testNumber}`}>
          {content}
        </section>
        <section className="notif-card__date" data-testid={`notification-date${testNumber}`}>
          {formattedDate}
        </section>
        <section className="notif-card__button">
          <Button variant="secondary" text="Ver Más" onClick={handleToggleModal} animated rounded />
        </section>
      </article>
      <Modal open={modalOpen} onClose={handleToggleModal} data-testid={`notification-modal${testNumber}`}>
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
      {handleDelete && (
        <ModalDelete
          isOpen={deleteModalOpen}
          handleClose={() => setDeleteModalOpen(false)}
          onSubmit={() => handleDelete()}
        />
      )}
    </>
  )
}
