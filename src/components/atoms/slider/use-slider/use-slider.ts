import { useEffect, useState } from 'react'

export interface UseSliderArgs {
  value?: number
  defaultValue?: number
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export interface UseSliderReturn {
  currentValue: number
  handleCurrentValue: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function useSlider(args?: UseSliderArgs): UseSliderReturn {
  const [currentValue, setCurrentValue] = useState(args?.defaultValue ?? 55)

  useEffect(() => {
    setCurrentValue((state) => (args?.value ? args.value : state))
  }, [args?.value])

  const handleCurrentValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valueSlider = Number(e.target.value)

    if (args?.onChange) args?.onChange(e)

    setCurrentValue(valueSlider)
  }

  return {
    currentValue,
    handleCurrentValue
  }
}

export default useSlider
