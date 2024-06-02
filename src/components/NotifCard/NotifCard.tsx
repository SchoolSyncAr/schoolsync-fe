import { useState, useRef } from 'react'
import { NotifProps } from 'models/interfaces/Notification'
import { IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import PushPinIcon from '@mui/icons-material/PushPin'
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined'
import MarkChatUnreadIcon from '@mui/icons-material/MarkChatUnread'
import MarkChatReadIcon from '@mui/icons-material/MarkChatRead'
import './NotifCard.scss'

export const NotifCard = (props: NotifProps) => {
  const [modalOpen, setModalOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const { title, content } = props

  const handleToggleModal = () => setModalOpen(!modalOpen)

  const handlePinned = async () => {
    props.handlePinned && (await props.handlePinned(props.id))
  }

  const handleRead = async () => {
    props.handleRead && (await props.handleRead(props.id))
  }

  return (
    <>
      <article
        className={`notif-card ${props.weight} ${props.read ? 'read-true' : ''}`} /* onClick={handleToggleModal} */
      >
        <section className="notif-card__title">
          {title}
          <section>
            {props.pinned ? (
              <IconButton style={{ color: 'inherit' }} onClick={handlePinned}>
                <PushPinIcon />
              </IconButton>
            ) : (
              <IconButton style={{ color: 'inherit' }} onClick={handlePinned}>
                <PushPinOutlinedIcon />
              </IconButton>
            )}

            {props.read ? (
              <IconButton style={{ color: 'inherit' }} onClick={handleRead}>
                <MarkChatReadIcon />
              </IconButton>
            ) : (
              <IconButton style={{ color: 'inherit' }} onClick={handleRead}>
                <MarkChatUnreadIcon />
              </IconButton>
            )}
          </section>
        </section>
        <section className="notif-card__body" ref={contentRef}>
          {content}
        </section>
        <section className="notif-card__button">
          <button
            className="button button--secondary button--rounded text--xs text--spaced text--upper animated shadow--box"
            onClick={handleToggleModal} // Eliminamos el `}` antes del `=>`
          >
            Ver Más
          </button>
        </section>
      </article>
      <Modal open={modalOpen} onClose={handleToggleModal}>
        <article className={`notif-card notif-modal ${props.weight}`}>
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
