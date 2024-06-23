import { act, render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect } from 'vitest'
import CreateNotification from './CreateNotification'

describe('CreateNotification component', () => {
  beforeEach(async () => {
    await act(() => {
      render(<CreateNotification />)
    })
  })

  it('should render submit Button', () => {
    const submitButton = screen.getByTestId('new-notif-submit')
    expect(submitButton).toBeInTheDocument()
  })

  it('input de título renderizado correctamente', () => {
    const inputElement = screen.getByTestId('login-username')
    expect(inputElement).toBeInTheDocument()
  })

  it('selección de prioridad renderizada correctamente', () => {
    const selectElement = screen.getByTestId('select-priority')
    expect(selectElement).toBeInTheDocument()
  })

  it('textarea de contenido renderizado correctamente', () => {
    const textareaElement = screen.getByLabelText('Contenido')
    expect(textareaElement).toBeInTheDocument()
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
