import './notifications.scss'
import { useState } from 'react'
import { useOnInit } from 'utils/useOnInit'
import { Parent } from 'models/Parent'
import AddCardIcon from '@mui/icons-material/AddCard'
import { parentService } from 'services/ParentService'
import { PrintError } from 'components/PrintError/PrintError'

function SeeAllParents() {
  const [parents, setParents] = useState<Parent[]>([]) //Esto es porque me marca error de type NEVER -- property-id-does-not-exist-on-type-never-on-map-function
  const [errorMessage, setErrorMessage] = useState('')

  useOnInit(async () => {
    try {
      const parentData = await parentService.getAll()
      setParents(parentData)
    } catch {
      setErrorMessage('No se pudo obtener info parents')
    }
  })

  return (
    <article className="notifications" data-testid="allparents">
      <h3 className="notifications__title text--strong" data-testid="allparents-title">Listado de padres</h3>
      <section className="notifications__body" data-testid="allparents-body">
        <ul className="notifications__body-list shadow" data-testid="allparents-list">
          {parents.map((parent) => (
            <li key={parent.id} className="notifications__text">
              <span>
                {parent.lastName}, {parent.firstName}{' '}
              </span>
              <AddCardIcon style={{ color: 'green' }}></AddCardIcon>
            </li>
          ))}
          <PrintError error={errorMessage} />
        </ul>
      </section>
    </article>
  )
}
export default SeeAllParents
