import { renderHook, act } from '@testing-library/react-hooks'
import useInput from './use-input'

describe('useInput tests', () => {
  it('should return change of value', () => {
    const { result } = renderHook(() => useInput({ initialValue: '', onChange: () => {} }))

    act(() => {
      result.current.handleOnChange({
        target: { value: '11' }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(result.current.value).toBe('11')
  })

  it('should execute onChange function', () => {
    const mockOnChange = jest.fn()

    const { result } = renderHook(() => useInput({ initialValue: '', onChange: mockOnChange }))

    act(() => {
      result.current.handleOnChange({
        target: { value: '11' }
      } as React.ChangeEvent<HTMLInputElement>)
    })

    expect(mockOnChange).toBeCalledWith({ target: { value: '11' } })
  })
})
