import SeeAllParents from './seeAllParents'
import { RenderResult, act, render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect, afterEach, vi } from 'vitest'
import { parentService } from 'services/ParentService'
import { Parent } from 'root/src/models/Parent'

describe('SeeAllParents component', () => {
  let renderResult: RenderResult

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

  vi.spyOn(parentService, 'getAll').mockResolvedValueOnce(parents)

  beforeEach(async () => {
    await act(() => {
      render(<SeeAllParents />)
    })
  })

  it('should render', () => {
    const parentComponent = screen.getByTestId('allparents') as HTMLDivElement
    expect(parentComponent).toBeTruthy()
  })

  // it('renders list of parents', async () => {
  //   const { getByTestId } = render(<SeeAllParents />)

  //   // Verificar que se renderice al menos un padre en la lista
  //   const parentList = getByTestId('parent-list')
  //   expect(parentList.children.length).toBe(parents.length)
  // })
})
