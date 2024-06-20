import { MouseEvent, ReactNode } from 'react'
import { BaseVariants } from 'models/interfaces/types'

type ButtonBehavior = 'submit' | 'reset' | 'button' | undefined
type ButtonVariants = BaseVariants | 'icon'

interface ButtonProps {
  text: string | ReactNode
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
  variant?: ButtonVariants
  fullWidth?: boolean
  taller?: boolean
  disabled?: boolean
  rounded?: boolean
  animated?: boolean
  className?: string
  type?: ButtonBehavior
}

export const Button = (props: ButtonProps) => {
  const {
    text,
    onClick,
    variant = 'primary',
    fullWidth,
    taller,
    disabled,
    className,
    rounded,
    animated,
    type,
    ...rest
  } = props

  return (
    <button
      className={[
        `button button--${variant}`,
        rounded ? 'button--rounded' : '',
        !fullWidth ? 'button--medium' : '',
        taller ? 'button--tall' : '',
        disabled ? 'button--disabled' : '',
        animated && !disabled ? 'animated' : '',
        'text text--strong text--spaced text--upper shadow shadow--box',
        className || '',
      ].join(' ')}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {text}
    </button>
  )
}
