import React from 'react'
import './Button.css'
import { CSSProperties } from 'react'

interface ButtonProps {
  padding?: number | string
  margin?: number | string
  width?: number | string
  height?: number | string
  fontSize?: number | string
  buttonBehavior?: 'button' | 'submit' | 'reset'
  actionOnClick?: () => void
  className?: string
  children: React.ReactNode
}

const Button: React.FC<ButtonProps> = (props) => {
  //button style
  const buttonStyle: CSSProperties = {
    padding: props.padding || 10,
    margin: props.margin || 10,
    width: props.width || 100,
    height: props.height || 80,
    display: 'inline-block',
    fontFamily: 'monospace',
    fontSize: props.fontSize || 20,
    textAlign: 'center' as const,
  }

  // const {type = 'button'} = props
  return (
    <button
      style={buttonStyle}
      className={'button ' + (props.className || '')}
      type={props.buttonBehavior}
      onClick={props.actionOnClick}
    >
      {props.children}
    </button>
  )
}

export default Button
