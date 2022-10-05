import { FC } from 'react'
import './button.scss'

export interface ButtonProps {
  id?: string
  width?: string
  onClick?(): void
  variant?: string
  disabled?: boolean
}

const Button: FC<ButtonProps> = ({
  id,
  width,
  onClick,
  children,
  variant = 'primary',
  disabled = false
}) => {
  return (
    <button
      data-testid={id}
      id={id}
      className={`button button--${variant}`}
      style={{ width }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
