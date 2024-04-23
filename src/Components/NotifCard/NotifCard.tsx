import { useState, useRef } from 'react'
import { NotifProps } from '../../interfaces/Notification'
import { Modal } from '@mui/material'
import './NotifCard.scss'

export const NotifCard = (props: NotifProps) => {
  const [modalOpen, setModalOpen] = useState(false) // Nuevo estado para controlar el modal
  const contentRef = useRef<HTMLDivElement>(null)
  const { title, content } = props

  const handleCardClick = () => {
    setModalOpen(true) // Abre el modal al hacer clic en la tarjeta
  }

  const handleCloseModal = () => {
    setModalOpen(false) // Cierra el modal
  }

  return (
    <>
      <article className="notif-card" onClick={handleCardClick}>
        <section className="notif-card__title">{title}</section>
        <section className="notif-card__body" ref={contentRef}>
          {content}
        </section>
      </article>
      {/* Modal */}
      <Modal open={modalOpen} onClose={handleCloseModal} >
        <article className="notif-card notif-modal">
          <section className="notif-card__title">{title}</section>
          <section className="notif-card__body scollable" ref={contentRef}>
            {content}
          </section>
        </article>
      </Modal>
    </>
  )
}
