import { renderHook, act } from '@testing-library/react-hooks'
import WrapperProviderTest from '../../../../mocks/WrapperProviderTest'
import useTarget from './use-target'

describe('useTarget tests', () => {
  it('should onEdit without errors', () => {
    const { result } = renderHook(() => useTarget(-1), { wrapper: WrapperProviderTest })

    act(() => result.current.onEdit())

    expect(result.error).toBeUndefined()
  })

  it('should onDelete without errors', async () => {
    const { result } = renderHook(() => useTarget(1), { wrapper: WrapperProviderTest })

    await act(async () => result.current.onDelete())

    expect(result.error).toBeUndefined()
  })
})
