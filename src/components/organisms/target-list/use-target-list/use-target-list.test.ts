import { renderHook, act } from '@testing-library/react-hooks'
import axiosMock from '../../../../mocks/axiosMock'
import { playersMocks } from '../../../../mocks/playerMocks'
import WrapperProviderTest from '../../../../mocks/WrapperProviderTest'
import useTargetlist from './use-target-list'

describe('useTargetList tests', () => {
  beforeEach(() => {
    axiosMock.get.mockResolvedValueOnce(playersMocks)
  })

  it('should list with players', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTargetlist(), {
      wrapper: WrapperProviderTest
    })

    await waitForNextUpdate()

    expect(result.current.players).toHaveLength(3)
  })

  it('should search player', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTargetlist(), {
      wrapper: WrapperProviderTest
    })

    await waitForNextUpdate()

    act(() =>
      result.current.onSearch({ target: { value: '1' } } as React.ChangeEvent<HTMLInputElement>)
    )

    expect(result.current.players).toHaveLength(1)
  })

  it('should onClose', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useTargetlist(), {
      wrapper: WrapperProviderTest
    })

    await waitForNextUpdate()

    act(() => result.current.onClose())

    expect(result.error).toBeUndefined()
  })
})
