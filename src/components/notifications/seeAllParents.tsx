import React, { useState } from 'react'
import './notifications.scss'
import { useNavigate } from 'react-router-dom'
import { useOnInit } from 'utils/useOnInit'
import { Parent } from 'models/Parent'
import AddCardIcon from '@mui/icons-material/AddCard'
import { parentService } from 'services/ParentService'
import { Button } from '../basic/Button/Button'
import PrintError from '../PrintError/PrintError'

function SeeAllParents() {
  const [parents, setParents] = useState<Parent[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const parentData = await parentService.getAll()
      setParents(parentData)
    } catch {
      setErrorMessage('No se pudo obtener info parents')
    }
  })

  const navigate = useNavigate()
  return (
    <article className="notifications">
      <h3 className="notifications__title text--strong">Listado de padres</h3>
      <ul className="notifications__list shadow">
        {parents.map((parent) => (
          <div key={parent.id} className="notifications__text">
            <span>
              {parent.lastName}, {parent.firstName}{' '}
            </span>
            <AddCardIcon style={{ color: 'green' }}></AddCardIcon>
          </div>
        ))}
        <PrintError error={errorMessage} />
      </ul>
      <section className="notifications__actions">
        <Button text={'volver'} onClick={() => navigate('/adminDashboard')} taller rounded animated />
      </section>
    </article>
  )
}
export default SeeAllParents
