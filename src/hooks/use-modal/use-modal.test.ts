import { renderHook, act } from '@testing-library/react-hooks'
import useModal from './use-modal'

describe('useModal tests', () => {
  it('should return default value', () => {
    const { result } = renderHook(() => useModal())

    expect(result.current.showModal).toBeFalsy()
  })

  it('should change the state of modal', () => {
    const { result } = renderHook(() => useModal())

    act(() => result.current.setShowModal(true))

    expect(result.current.showModal).toBeTruthy()
  })
})
