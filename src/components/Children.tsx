import React, { useState } from 'react'
import './notifications/notifications.scss'
import './dashboard.scss'
import { useNavigate } from 'react-router-dom'
import { useOnInit } from 'utils/useOnInit'
import { getMyChildren } from '../services/ParentService'
import { Student } from 'models/Student'
import { Button } from './basic/Button/Button'
import { PrintError } from './PrintError/PrintError'

function Children() {
  const [childrenInfoBackend, setchildrenInfoBackend] = useState<Array<Student>>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const childrenData = await getMyChildren()
      setchildrenInfoBackend(childrenData)
    } catch {
      setErrorMessage('No se pudo obtener info children')
    }
  })

  const navigate = useNavigate()

  return (
    <main className="dashboard">
      {childrenInfoBackend.map((child) => {
        return <Button key={child.id} text={child.firstName} taller rounded animated />
      })}
      <PrintError error={errorMessage} />
      <Button text={'volver'} onClick={() => navigate('/parentDashboard')} taller rounded animated />
    </main>
  )
}

export default Children
