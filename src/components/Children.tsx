import { useState } from 'react'
import './notifications/notifications.scss'
import './dashboard.scss'
import { useNavigate } from 'react-router-dom'
import { useOnInit } from 'utils/useOnInit'
import { getMyChildren } from '../services/ParentService'
import { Student } from 'models/Student'
import { Button } from './basic/Button/Button'
import { PrintError } from './PrintError/PrintError'

function Children() {
  const [children, setChildren] = useState<Student[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const childrenData = await getMyChildren()
      setChildren(childrenData)
    } catch {
      setErrorMessage('No se pudo obtener info children')
    }
  })

  const navigate = useNavigate()

  return (
    <main className="dashboard">
      {children.map((child) => {
        return <Button key={child.id} text={child.firstName} taller rounded animated />
      })}
      <PrintError error={errorMessage} />
      <Button text={'volver'} onClick={() => navigate('/parentDashboard')} taller rounded animated />
    </main>
  )
}

export default Children
