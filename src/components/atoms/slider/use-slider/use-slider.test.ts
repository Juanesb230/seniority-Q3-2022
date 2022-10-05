import { renderHook, act } from '@testing-library/react-hooks'
import useSlider from './use-slider'

describe('useSlider tests', () => {
  it('should return default value', () => {
    const { result } = renderHook(() => useSlider())

    expect(result.current.currentValue).toBe(55)
  })

  it('should return custom default value', () => {
    const { result } = renderHook(() =>
      useSlider({
        defaultValue: 11
      })
    )

    expect(result.current.currentValue).toBe(11)
  })

  it('should execute change the value', () => {
    const { result } = renderHook(() => useSlider())

    act(() => {
      result.current.handleCurrentValue({
        target: { value: '11' }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.currentValue).toBe(11)
  })

  it('should execute onChange function', () => {
    const mockOnChange = jest.fn()

    const { result } = renderHook(() =>
      useSlider({
        onChange: mockOnChange
      })
    )

    act(() => {
      result.current.handleCurrentValue({
        target: { value: '11' }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(mockOnChange).toBeCalledWith({ target: { value: '11' } })
  })
})
