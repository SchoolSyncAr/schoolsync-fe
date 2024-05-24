import { useState, useRef } from 'react'
import { NotifProps } from 'interfaces/Notification'
import { IconButton, Modal } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import './NotifCard.scss'

export const NotifCard = (props: NotifProps) => {
  const [modalOpen, setModalOpen] = useState(false) // Nuevo estado para controlar el modal
  const contentRef = useRef<HTMLDivElement>(null)
  const { title, content } = props

  const handleToggleModal = () => setModalOpen(!modalOpen)

  return (
    <>
      <article className="notif-card" onClick={handleToggleModal}>
        <section className="notif-card__title">{title}</section>
        <section className="notif-card__body" ref={contentRef}>
          {content}
        </section>
        <section className="notif-card__button">
          <button>Mostrar Mas</button>
        </section>
        
      </article>
      <Modal open={modalOpen} onClose={handleToggleModal} >
        <article className="notif-card notif-modal">
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
