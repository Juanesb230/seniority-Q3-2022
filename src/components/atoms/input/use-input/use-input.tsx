import { useState, ChangeEvent, HTMLProps } from 'react'

const useInput = (props: HTMLProps<HTMLInputElement>) => {
  const [inputValue, setInputValue] = useState<string>()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) props.onChange(e)
    setInputValue(e.target.value)
  }
  return { handleChange, inputValue }
}
export default useInput
