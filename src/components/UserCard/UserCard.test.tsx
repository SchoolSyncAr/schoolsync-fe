import { UserCard } from './UserCard'
import { act, render, screen } from '@testing-library/react'
import { describe, it, beforeEach, expect, vi } from 'vitest'
import { studentService } from 'services/StudentsService'
import { parentService } from 'root/src/services/ParentService'
import { Student } from 'root/src/models/Student'
import { Parent } from 'root/src/models/Parent'
import { BrowserRouter } from 'react-router-dom'

describe('userCard component', () => {
  const student = [
    {
      id: 4,
      firstName: 'Mateo',
      lastName: 'Rodriguez',
      absences: 0,
    },
    {
      id: 5,
      firstName: 'Delfina',
      lastName: 'Rodriguez',
      absences: 0,
    },
    {
      id: 6,
      firstName: 'Nicolas',
      lastName: 'Rodriguez',
      absences: 0,
    },
    {
      id: 7,
      firstName: 'Martin',
      lastName: 'Melo',
      absences: 0,
    },
    {
      id: 10,
      firstName: 'Federico',
      lastName: 'Alvarez',
      absences: 3,
    },
    {
      id: 11,
      firstName: 'Joaquin',
      lastName: 'Alvarez',
      absences: 20,
    },
  ].map((student) => Student.fromJson(student))

  vi.spyOn(studentService, 'getAll').mockResolvedValue(student)

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

  const user = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '123456789',
    absences: 0,
  }

  beforeEach(async () => {
    await act(() => {
      render(
        <BrowserRouter>
          <UserCard user={user} />
        </BrowserRouter>,
      )
    })
  })

  it('should render users', () => {
    const userComponent = screen.getByTestId('allusers') as HTMLDivElement
    expect(userComponent).toBeTruthy()
  })

  it('should render users', () => {
    const userComponent = screen.getByTestId('allusersname') as HTMLDivElement
    expect(userComponent).toBeTruthy()
  })
})
