import { useEffect, useState } from 'react'

export interface UseInputArgs {
  initialValue: string
  onChange(e: React.ChangeEvent<HTMLInputElement>): void
}

export interface UseInputReturn {
  value: string
  handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void
}

const useInput = ({ initialValue, onChange }: UseInputArgs): UseInputReturn => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    setValue(inputValue)
    onChange(event)
  }

  return {
    value,
    handleOnChange
  }
}

export default useInput
