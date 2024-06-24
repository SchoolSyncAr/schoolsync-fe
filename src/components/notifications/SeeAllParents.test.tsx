import SeeAllParents from './seeAllParents'
import { act, render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { parentService } from 'services/ParentService'
import { Parent } from 'root/src/models/Parent'

describe('SeeAllParents component', () => {
  const parents = [
    {
      id: 2,
      firstName: 'Daniel',
      lastName: 'Follio',
      notificationGroups: ['TODOS', 'PADRES'],
    },
    {
      id: 3,
      firstName: 'Juan Ignacio',
      lastName: 'Rodriguez',
      notificationGroups: ['EQUIPO_FUTBOL', 'GRADO2', 'TODOS', 'PADRES'],
    },
    {
      id: 9,
      firstName: 'Tomas',
      lastName: 'Alvarez',
      notificationGroups: ['EQUIPO_FUTBOL', 'GRADO2', 'TODOS', 'PADRES'],
    },
  ].map((parent) => Parent.fromJson(parent))

  vi.spyOn(parentService, 'getAll').mockResolvedValue(parents)

  beforeEach(async () => {
    await act(() => {
      render(<SeeAllParents />)
    })
  })

  it('should render', () => {
    const parentComponent = screen.getByTestId('allparents') as HTMLDivElement
    expect(parentComponent).toBeTruthy()
  })

  it('should render title', () => {
    const parentComponent = screen.getByTestId('allparents-title') as HTMLDivElement
    expect(parentComponent).toBeTruthy()
  })

  it('should render body', () => {
    const parentComponent = screen.getByTestId('allparents-body') as HTMLDivElement
    expect(parentComponent).toBeTruthy()
  })

  it('should render list', () => {
    const parentComponent = screen.getByTestId('allparents-list') as HTMLDivElement
    expect(parentComponent).toBeTruthy()
  })

  it('should render parents list with correct length', () => {
    const parentList = screen.getByTestId('allparents-list').children
    expect(parentList.length).toBe(parents.length)
  })
})
