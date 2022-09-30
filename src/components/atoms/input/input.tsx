import React, { FC, useEffect, useState } from 'react'
import './input.scss'

export interface InputProps {
  initialValue?: string
  placeholder?: string
  width?: string
  type?: string
  name?: string
  showError?: boolean
  showLabel?: boolean
  onChange?(e: React.ChangeEvent<HTMLInputElement>): void
}

const Input: FC<InputProps> = ({
  initialValue = '',
  type = 'text',
  placeholder,
  name = 'input',
  width,
  onChange = () => {},
  showLabel = true,
  showError = true
}) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)
    onChange(event)
  }

  return (
    <div style={{ width }}>
      {showLabel && <label style={{ fontSize: '12px', fontWeight: 'bold' }}>{placeholder}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        name={name}
        className="input"
        onChange={handleOnChange}
      ></input>
      {!value && showError && (
        <p style={{ fontSize: '10px', color: 'red' }}>El campo {placeholder} es obligatorio</p>
      )}
    </div>
  )
}

export default Input
