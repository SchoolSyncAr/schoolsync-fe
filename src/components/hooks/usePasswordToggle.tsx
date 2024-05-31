import { useState } from 'react'

export const UsePasswordToggle = () => {
  const [visible, setVisibility] = useState(false)

  const eye = <i className="fas fa-eye"></i>
  const slashedEye = <i className="fas fa-eye-slash"></i>

  const icon = visible ? eye : slashedEye

  const iconHandle = () => setVisibility((visible) => !visible)

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation()
    iconHandle()
  }

  const Icon = <span onClick={handleClick}>{icon}</span>

  const InputType = visible ? 'text' : 'password'

  return [InputType, Icon]
}
