import { FC } from 'react'
import './slider.scss'
import useSlider from './use-slider'

export interface SliderProps {
  label?: string
  value?: number
  defaultValue?: number
  name?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const MAX_RANGE = 100
const MIN_RANGE = 0

const Slider: FC<SliderProps> = ({ label, value, defaultValue, onChange, name }) => {
  const { currentValue, handleCurrentValue } = useSlider({
    defaultValue,
    onChange,
    value
  })

  return (
    <div className="slider">
      <div className="slider__input-container">
        {label && (
          <label className="slider__label" htmlFor={label}>
            {label}
          </label>
        )}
        <div className="slider__input-container-value">
          <input
            className="slider__input"
            type="range"
            id={label}
            name={name}
            value={currentValue}
            min={MIN_RANGE}
            max={MAX_RANGE}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleCurrentValue(e)}
          />
          <span className="slider__value">{currentValue}</span>
        </div>
      </div>
    </div>
  )
}

export default Slider
