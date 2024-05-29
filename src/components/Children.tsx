import { useNavigate } from "react-router-dom"
import Button from "./Button"
import { useOnInit } from "utils/useOnInit"
import { getMyChildren} from '../services/ParentService'
import { Student } from "models/Student"
import { useState } from "react"

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
  }
  )

  const assignColor = (index: number) => {
    const colors = ['#89f788', '#f78889', '#f7d488']
    return colors[index % colors.length]
  }

  const navigate = useNavigate()

  return (
    <>
      <div>
        {childrenInfoBackend.map((child, index) => {
          const color = assignColor(index)
          return (
            <Button key={ index} className='forAllButtons' height={60} backgroundColor={color}>{child.firstName}</Button>
          )
        })}
      </div>
      <div className="buttonsToRightEnd">
        <Button className='forAllButtons buttonReturn' height={60} actionOnClick={() => navigate('/parentDashboard')}>Volver</Button>
      </div>
    </>
  )
}

export default Children