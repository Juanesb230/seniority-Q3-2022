import { FC } from 'react'
import './button.scss'

export interface ButtonProps {
  id?: string
  width?: string
  onClick?(): void
  variant?: string
}

const Button: FC<ButtonProps> = ({ id, width, onClick, children, variant = 'primary' }) => {
  return (
    <button
      data-testid={id}
      id={id}
      className={`button button--${variant}`}
      style={{ width }}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
