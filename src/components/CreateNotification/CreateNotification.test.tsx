import { act, render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import CreateNotification from './CreateNotification'
import { parentService } from 'root/src/services/ParentService'
import notificationService from 'root/src/services/NotificationService'

describe('CreateNotification component', () => {
  vi.spyOn(parentService, 'getAll').mockReturnValue(Promise.resolve([]))
  vi.spyOn(notificationService, 'getGroups').mockReturnValue(Promise.resolve([]))
  vi.spyOn(notificationService, 'getPriorities').mockReturnValue(Promise.resolve([]))

  beforeEach(async () => {
    await act(() => {
      render(<CreateNotification />)
    })
  })

  it('should render submit Button', () => {
    const submitButton = screen.getByTestId('new-notif-submit')
    expect(submitButton).toBeInTheDocument()
  })

  it('selección de prioridad renderizada correctamente', () => {
    const selectElement = screen.getByTestId('select-priority')
    expect(selectElement).toBeInTheDocument()
  })

  it('selección de padres renderizada correctamente', () => {
    const autocompleteElement = screen.getByTestId('autocomplete-parents')
    expect(autocompleteElement).toBeInTheDocument()
  })

  it('selección de grupos renderizada correctamente', () => {
    const autocompleteElement = screen.getByTestId('autocomplete-groups')
    expect(autocompleteElement).toBeInTheDocument()
  })

  it('sección de configuración de notificación renderizada correctamente', () => {
    const sectionElement = screen.getByText('Prioridad')
    expect(sectionElement).toBeInTheDocument()
  })

  it('título de sección de destinatarios renderizado correctamente', () => {
    const labelElement = screen.getByText('A quien le llega')
    expect(labelElement).toBeInTheDocument()
  })
})
