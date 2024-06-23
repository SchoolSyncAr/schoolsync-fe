// import { SeeAllStudents } from './SeeAllStudents'
// import { act, render, screen } from '@testing-library/react'
// import { describe, it, beforeEach, expect, vi } from 'vitest'
// // import { studentService } from 'services/StudentsService'
// import { Student } from 'root/src/models/Student'
// import { getAllStudents } from 'services/StudentsService'

// describe('SeeAllStudents component', () => {
//   const students = [
//     {
//       id: 4,
//       firstName: 'Mateo',
//       lastName: 'Rodriguez',
//       absences: 0,
//     },
//     {
//       id: 5,
//       firstName: 'Delfina',
//       lastName: 'Rodriguez',
//       absences: 0,
//     },
//     {
//       id: 6,
//       firstName: 'Nicolas',
//       lastName: 'Rodriguez',
//       absences: 0,
//     },
//     {
//       id: 7,
//       firstName: 'Martin',
//       lastName: 'Melo',
//       absences: 0,
//     },
//     {
//       id: 10,
//       firstName: 'Federico',
//       lastName: 'Alvarez',
//       absences: 3,
//     },
//     {
//       id: 11,
//       firstName: 'Joaquin',
//       lastName: 'Alvarez',
//       absences: 20,
//     },
//   ].map((student) => Student.fromJson(student))

//   vi.spyOn(getAllStudents, 'getAllStudents').mockResolvedValueOnce(students)

//   beforeEach(async () => {
//     await act(() => {
//       render(<SeeAllStudents />)
//     })
//   })

//   it('should render students', () => {
//     const studentComponent = screen.getByTestId('allstudents') as HTMLDivElement
//     expect(studentComponent).toBeTruthy()
//   })

//   it('should render students title', () => {
//     const studentComponent = screen.getByTestId('allstudents-title') as HTMLDivElement
//     expect(studentComponent).toBeTruthy()
//   })

//   it('should render students body', () => {
//     const studentComponent = screen.getByTestId('allstudents-body') as HTMLDivElement
//     expect(studentComponent).toBeTruthy()
//   })

//   it('should render student list', () => {
//     const studentComponent = screen.getByTestId('allstudents-list') as HTMLDivElement
//     expect(studentComponent).toBeTruthy()
//   })

//   it('should render list with correct length with number', () => {
//     const studentList = screen.getByTestId('allstudents-list').childElementCount
//     expect(studentList).toBe(1)
//   })

//   it('should render list with correct length', () => {
//     const studentList = screen.getByTestId('allstudents-list').childElementCount
//     expect(studentList).toBe(students.length)
//   })
// })
