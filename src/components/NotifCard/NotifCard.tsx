import { useState, useRef } from 'react'
import { NotifProps } from 'models/interfaces/Notification'
import { IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead'
import DeleteIcon from '@mui/icons-material/Delete'

import './NotifCard.scss'

interface NotifCardProps {
  notifProps: NotifProps
  deleteButton?: boolean
  handleDelete?: (notifId: number) => void
  handlePinned?: (notifId: number) => void
  handleRead?: (notifId: number) => void
}

export const NotifCard = ({ notifProps, deleteButton, handleDelete, handlePinned, handleRead }: NotifCardProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { title, content, weight, pinned, read } = notifProps

  const handleToggleModal = () => setModalOpen(!modalOpen)

  return (
    <>
      <article className={`notif-card ${weight} ${read ? 'read-true' : ''}`}>
        <section className="notif-card__title">
          {title}
          {!deleteButton ? (
            <div>
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
            <IconButton onClick={() => handleDelete(notifProps.id)}>
              <DeleteIcon style={{ fontSize: '1.3em' }} />
            </IconButton>
          )}
        </section>

        <section className="notif-card__body" ref={contentRef}>
          {content}
        </section>
        <section className="notif-card__button">
          <button
            className="button button--secondary button--rounded text--xs text--spaced text--upper animated shadow--box"
            onClick={handleToggleModal}
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
          <section className="notif-card__body scollable" ref={contentRef}>
            {content}
          </section>
        </article>
      </Modal>
    </>
  )
}
