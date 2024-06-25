import { fireEvent, render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import notificationService from 'root/src/services/NotificationService'
import { NotifProps } from 'root/src/models/interfaces/Notification'
import { Notification } from 'root/src/models/Notification'
import { NotificationProvider } from '../hooks/NotificationContext'
import { act } from 'react'
import NotificationsDashboard from './NotificationsDashboard'

describe('CreateNotification component', () => {
  const mockNotification: NotifProps = {
    id: 1,
    title: 'Acto 25 de mayo',
    content:
      'Estimados Padres y Encargados: \nNos complace invitarlos a nuestro próximo acto escolar con motivo de conmemorar el 25 de Mayo, fecha tan significativa en nuestra historia nacional. El evento se llevará a cabo el Lunes 27 de Mayo a las 15:00hs en el patio común de recreo.    \nEste acto reviste una gran importancia para nuestra comunidad educativa, ya que nos brinda la oportunidad de reflexionar y celebrar juntos los valores de nuestra patria. Será una ocasión especial donde nuestros estudiantes demostrarán sus habilidades artísticas y compartirán con ustedes momentos de orgullo y emoción.    \nEl programa del acto incluirá presentaciones de danzas folclóricas, declamaciones patrióticas, y otras actividades preparadas con esmero por nuestros alumnos y docentes.    \nEsperamos contar con su presencia en este evento, que fortalece los lazos entre la escuela y las familias, y enriquece la experiencia educativa de nuestros queridos estudiantes.    \n\n¡Los esperamos con entusiasmo!\n\nAtentamente,\nDirectora Silvana y el Complejo Educativo',
    weight: 'MEDIA',
    date: '2024-05-15T00:00:00',
    read: false,
  }

  vi.spyOn(notificationService, 'getAllGeneralNotifications').mockReturnValue(
    Promise.resolve([new Notification(mockNotification)]),
  )
  vi.spyOn(notificationService, 'getAllNotificationsByParentId').mockReturnValue(
    Promise.resolve([new Notification(mockNotification)]),
  )

  beforeEach(async () => {
    await act(async () => {
      render(
        <NotificationProvider>
          <NotificationsDashboard deleteButton={true} />
        </NotificationProvider>,
      )
    })
  })

  it('should render the mock notification for ADMIN role', async () => {
    sessionStorage.setItem('role', 'ADMIN')
    const notificationCards = screen.getByTestId('notification-card0')
    expect(notificationCards).toBeInTheDocument()
  })

  it('should render the mock notification for PARENT role', async () => {
    sessionStorage.setItem('role', 'PARENT')
    const notificationCards = screen.getByTestId('notification-card0')
    expect(notificationCards).toBeInTheDocument()
  })

  it('should render card delete button, for ADMIN role', () => {
    sessionStorage.setItem('role', 'ADMIN')
    const button = screen.getByTestId('notification-delete0') as HTMLDivElement
    expect(button).toBeTruthy()
  })

  it('should render the modal when clickin "VER MÁS" button', async () => {
    sessionStorage.setItem('role', 'ADMIN')
    const button = (await screen.findByRole('button', { name: /VER MÁS/i })) as HTMLButtonElement
    fireEvent.click(button)

    const modal = screen.getByTestId('notification-modal0')
    expect(modal).toBeTruthy()
  })

  it('should render card title', () => {
    const title = screen.getByTestId('notification-title0') as HTMLDivElement
    expect(title.textContent?.toLowerCase()).toContain('acto 25 de mayo')
  })

  it('should render card content', () => {
    const content = screen.getByTestId('notification-content0') as HTMLDivElement
    expect(content.textContent?.toLowerCase()).toContain('estimados')
  })

  it('should render card date', () => {
    const date = screen.getByTestId('notification-date0') as HTMLDivElement
    expect(date.textContent?.toLowerCase()).toContain('2024')
  })
})
