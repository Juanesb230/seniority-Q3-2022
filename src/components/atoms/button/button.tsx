import { FC } from 'react'
import classNames from 'classnames'
import './button.scss'

export interface ButtonProps {
  id?: string
  width?: string
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  onClick?(): void
}

const Button: FC<ButtonProps> = ({
  id,
  width,
  onClick,
  children,
  variant = 'primary',
  disabled = false
}) => (
  <button
    data-testid={id}
    id={id}
    className={classNames('button', { 'button--secondary': variant === 'secondary' })}
    style={{ width }}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
)

export default Button
