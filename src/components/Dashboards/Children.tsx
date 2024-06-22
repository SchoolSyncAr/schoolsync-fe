import { useState } from 'react'
import { useOnInit } from 'utils/useOnInit'
import { getMyChildren } from '../../services/ParentService'
import { Student } from 'models/Student'
import { UserCard } from '../UserCard/UserCard'
import "./Dashboard.scss"

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

  const childrenList = () => {
    return children.map((child, index) => (
      <UserCard 
        user={child}
        key={index}
      />
    ))
  }

  return (
    <div className="dashboard">
      <div className="dashboard__grid">{childrenList()}</div>
    </div>
  )
}

export default Children
