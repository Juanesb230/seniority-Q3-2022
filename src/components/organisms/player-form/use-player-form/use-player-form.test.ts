import { renderHook, act } from '@testing-library/react-hooks'
import axiosMock from '../../../../mocks/axiosMock'
import { playerMock } from '../../../../mocks/playerMocks'
import WrapperProviderTest from '../../../../mocks/WrapperProviderTest'
import usePlayerForm from './use-player-form'

describe('usePlayerForm tests', () => {
  it('should form empty', () => {
    const { result } = renderHook(() => usePlayerForm(), { wrapper: WrapperProviderTest })

    expect(result.current.showModal).toBeFalsy()
    expect(result.current.player.attack).toBe(50)
    expect(result.current.player.defense).toBe(50)
    expect(result.current.player.skills).toBe(50)
    expect(result.current.player.firstName).toBe('')
    expect(result.current.player.lastName).toBe('')
    expect(result.current.player.image).toBe('')
  })

  it('should form with initial player', () => {
    const { result } = renderHook(() => usePlayerForm(), {
      wrapper: WrapperProviderTest,
      initialProps: {
        values: {
          serverData: [],
          players: [],
          player: {
            firstName: 'Leo',
            lastName: '1',
            image: 'leo-image',
            attack: 0,
            defense: 0,
            skills: 0
          }
        }
      }
    })

    expect(result.current.showModal).toBeFalsy()
    expect(result.current.player.attack).toBe(0)
    expect(result.current.player.defense).toBe(0)
    expect(result.current.player.skills).toBe(0)
    expect(result.current.player.firstName).toBe('Leo')
    expect(result.current.player.lastName).toBe('1')
    expect(result.current.player.image).toBe('leo-image')
  })

  it('should onClose and erase player', () => {
    const { result } = renderHook(() => usePlayerForm(), {
      wrapper: WrapperProviderTest,
      initialProps: {
        values: {
          serverData: [],
          players: [],
          player: {
            firstName: 'Leo',
            lastName: '1',
            image: 'leo-image',
            attack: 0,
            defense: 0,
            skills: 0
          }
        }
      }
    })

    act(() => result.current.onClose())

    expect(result.current.player.attack).toBe(50)
    expect(result.current.player.defense).toBe(50)
    expect(result.current.player.skills).toBe(50)
    expect(result.current.player.firstName).toBe('')
    expect(result.current.player.lastName).toBe('')
    expect(result.current.player.image).toBe('')
  })

  it('should onChange values of player', () => {
    const { result } = renderHook(() => usePlayerForm(), { wrapper: WrapperProviderTest })

    act(() =>
      result.current.onChange({
        target: { name: 'firstName', value: 'Leo' }
      } as React.ChangeEvent<HTMLInputElement>)
    )

    expect(result.current.player.firstName).toBe('Leo')
  })

  it('should callServer with createPlayer', async () => {
    axiosMock.post.mockResolvedValueOnce(playerMock)
    const { result } = renderHook(() => usePlayerForm(), { wrapper: WrapperProviderTest })

    await act(() => result.current.callServer('createPlayer'))

    expect(result.error).toBeUndefined()
  })

  it('should callServer with updatePlayer', async () => {
    const { result } = renderHook(() => usePlayerForm(), { wrapper: WrapperProviderTest })

    await act(() => result.current.callServer('updatePlayer'))

    expect(result.error).toBeUndefined()
    expect(result.current.player.attack).toBe(50)
    expect(result.current.player.defense).toBe(50)
    expect(result.current.player.skills).toBe(50)
    expect(result.current.player.firstName).toBe('')
    expect(result.current.player.lastName).toBe('')
    expect(result.current.player.image).toBe('')
  })
})
