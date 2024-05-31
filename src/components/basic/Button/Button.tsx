import { MouseEvent } from 'react'

type ButtonBehavior = 'submit' | 'reset' | 'button' | undefined
type ButtonVariants = 'primary' | 'secondary' | 'icon'

interface ButtonProps {
  text: string
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
      className={`button button--${variant} 
        ${rounded && 'button--rounded'} 
        ${!fullWidth && 'button--medium'} 
        ${taller && 'button--tall'}
        ${disabled && 'button--disabled'}
        ${animated && !disabled && 'animated'} 
        ${className || ''}}`}
      onClick={onClick}
      disabled={disabled}
      type={type}
      {...rest}
    >
      {text}
    </button>
  )
}
