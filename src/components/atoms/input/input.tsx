import { HTMLProps, FC } from 'react'
import classNames from 'classnames'
import useInput from './use-input'
import './input.scss'

interface InputProps extends HTMLProps<HTMLInputElement> {
  label?: string
  showError?: boolean
}

const Input: FC<InputProps> = ({ label, showError = false, ...props }) => {
  const { handleChange, inputValue } = useInput(props)
  const displayError = showError && inputValue === ''
  return (
    <div className="input">
      {label && <label className="input__title">{label}</label>}{' '}
      <input
        className={classNames('input__box', { 'input__box--error': displayError })}
        onChange={handleChange}
        value={inputValue}
        {...props}
      />
      {showError && inputValue === '' && (
        <span className="input__error">{`${label} no valido`}</span>
      )}
    </div>
  )
}

export default Input
