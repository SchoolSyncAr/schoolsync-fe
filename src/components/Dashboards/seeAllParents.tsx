import { parentService } from 'services/ParentService'
import { UserCard } from '../UserCard/UserCard'
import { useOnInit } from 'utils/useOnInit'
import { Parent } from 'models/Parent'
import { useState } from 'react'
import './Dashboard.scss'

function SeeAllParents() {
  const [parents, setParents] = useState<Parent[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const parentData = await parentService.getAll()
      setParents(parentData)
    } catch {
      errorMessage
      setErrorMessage('No se pudo obtener info parents')
    }
  })

  const parentList = () => {
    return parents.map((parent, index) => (
      <UserCard 
        user={parent}
        key={index}
      />
    ))
  }

  return (
    <div className="dashboard">
      <div className="dashboard__grid">{parentList()}</div>
    </div>
  )
}
export default SeeAllParents
