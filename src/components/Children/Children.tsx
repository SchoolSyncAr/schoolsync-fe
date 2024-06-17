import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOnInit } from 'utils/useOnInit'
import { getMyChildren } from '../../services/ParentService'
import { Student } from 'models/Student'
import { Button } from '../basic/Button/Button'
import "./Children.scss"

function Children() {
  const [children, setChildren] = useState<Student[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const childrenData = await getMyChildren()
      setChildren(childrenData)
    } catch {
      errorMessage
      setErrorMessage('No se pudo obtener info children')
    }
  })

  const navigate = useNavigate()

  return (
    <div className="children-dashboard">
      <div className="children-dashboard__items">
        {children.map((child) => (
          <Button key={child.id} text={child.firstName} taller rounded animated />
        ))}
      </div>
      <div className="children-dashboard__actions">
        <Button text={'volver'} onClick={() => navigate('/parentDashboard')} taller rounded animated />
      </div>
    </div>
  )
}

export default Children
