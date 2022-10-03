import { renderHook, act, cleanup } from '@testing-library/react-hooks'
import { playersMocks } from '../../mocks/playerMocks'
import usePlayers from './use-players'

describe('usePlayers tests', () => {
  afterEach(() => cleanup())

  it('should with default state', () => {
    const { result } = renderHook(() => usePlayers())

    expect(result.current.playerState.serverData).toStrictEqual([])
    expect(result.current.playerState.players).toStrictEqual([])
    expect(result.current.playerState.player.firstName).toBe('')
  })

  it('should dispatch from server', () => {
    const { result } = renderHook(() => usePlayers())

    act(() => result.current.playerDispatch({ type: 'getForServer', payload: playersMocks.data }))

    expect(result.current.playerState.serverData).toStrictEqual(playersMocks.data)
    expect(result.current.playerState.players).toStrictEqual(playersMocks.data)
  })

  it('should dispatch players', () => {
    const { result } = renderHook(() => usePlayers())

    act(() => result.current.playerDispatch({ type: 'getPlayers', payload: playersMocks.data }))

    expect(result.current.playerState.serverData).toStrictEqual([])
    expect(result.current.playerState.players).toStrictEqual(playersMocks.data)
  })

  it('should dispatch player', () => {
    const values = {
      players: playersMocks.data,
      serverData: [],
      player: { firstName: '', lastName: '', image: '', attack: 50, defense: 50, skills: 50 }
    }

    const { result } = renderHook(() => usePlayers(values))

    act(() => result.current.playerDispatch({ type: 'getPlayer', payload: 1 }))

    expect(result.current.playerState.player.firstName).toBe('Leo')
    expect(result.current.playerState.player.lastName).toBe('1')
  })

  it('should dispatch not found player', () => {
    const values = {
      players: playersMocks.data,
      serverData: [],
      player: { firstName: '', lastName: '', image: '', attack: 50, defense: 50, skills: 50 }
    }

    const { result } = renderHook(() => usePlayers(values))

    act(() => result.current.playerDispatch({ type: 'getPlayer', payload: -5 }))

    expect(result.current.playerState.player.firstName).toBe('')
    expect(result.current.playerState.player.lastName).toBe('')
  })

  it('should dispatch clearPlayer', () => {
    const values = {
      players: [],
      serverData: [],
      player: playersMocks.data[0]
    }

    const { result } = renderHook(() => usePlayers(values))

    expect(result.current.playerState.player.firstName).not.toBe('')
    expect(result.current.playerState.player.lastName).not.toBe('')

    act(() => result.current.playerDispatch({ type: 'clearPlayer' }))

    expect(result.current.playerState.player.firstName).toBe('')
    expect(result.current.playerState.player.lastName).toBe('')
  })

  it('should dispatch deletePlayer', () => {
    const values = {
      players: playersMocks.data,
      serverData: playersMocks.data,
      player: { firstName: '', lastName: '', image: '', attack: 50, defense: 50, skills: 50 }
    }

    const { result } = renderHook(() => usePlayers(values))

    expect(result.current.playerState.serverData).toHaveLength(3)
    expect(result.current.playerState.players).toHaveLength(3)

    act(() => result.current.playerDispatch({ type: 'deletePlayer', payload: 1 }))

    expect(result.current.playerState.serverData).toHaveLength(2)
    expect(result.current.playerState.players).toHaveLength(2)
  })

  it('should dispatch searchPlayer without search value', () => {
    const values = {
      players: playersMocks.data,
      serverData: playersMocks.data,
      player: { firstName: '', lastName: '', image: '', attack: 50, defense: 50, skills: 50 }
    }

    const { result } = renderHook(() => usePlayers(values))

    expect(result.current.playerState.serverData).toHaveLength(3)
    expect(result.current.playerState.players).toHaveLength(3)

    act(() => result.current.playerDispatch({ type: 'searchPlayer', payload: '' }))

    expect(result.current.playerState.serverData).toHaveLength(3)
    expect(result.current.playerState.players).toHaveLength(3)
  })

  it('should dispatch searchPlayer with search value', () => {
    const values = {
      players: playersMocks.data,
      serverData: playersMocks.data,
      player: { firstName: '', lastName: '', image: '', attack: 50, defense: 50, skills: 50 }
    }

    const { result } = renderHook(() => usePlayers(values))

    expect(result.current.playerState.serverData).toHaveLength(3)
    expect(result.current.playerState.players).toHaveLength(3)

    act(() => result.current.playerDispatch({ type: 'searchPlayer', payload: '1' }))

    expect(result.current.playerState.serverData).toHaveLength(3)
    expect(result.current.playerState.players).toHaveLength(1)
  })

  it('should dispatch changePlayer', () => {
    const values = {
      players: playersMocks.data,
      serverData: playersMocks.data,
      player: { firstName: '', lastName: '', image: '', attack: 50, defense: 50, skills: 50 }
    }

    const { result } = renderHook(() => usePlayers(values))

    act(() =>
      result.current.playerDispatch({
        type: 'changePlayer',
        payload: { inputName: 'firstName', inputValue: 'Leo' }
      })
    )

    expect(result.current.playerState.player.firstName).toBe('Leo')
  })

  it('should dispatch addPlayer', () => {
    const values = {
      players: playersMocks.data,
      serverData: playersMocks.data,
      player: { firstName: '', lastName: '', image: '', attack: 50, defense: 50, skills: 50 }
    }

    const { result } = renderHook(() => usePlayers(values))

    expect(result.current.playerState.serverData).toHaveLength(3)
    expect(result.current.playerState.players).toHaveLength(3)

    act(() =>
      result.current.playerDispatch({
        type: 'addPlayer',
        payload: {
          firstName: 'Leo',
          lastName: '4',
          image: 'leo-image',
          attack: 100,
          defense: 100,
          skills: 100
        }
      })
    )

    expect(result.current.playerState.serverData).toHaveLength(4)
    expect(result.current.playerState.players).toHaveLength(4)
  })

  it('should dispatch updatePlayer', () => {
    const values = {
      players: playersMocks.data,
      serverData: playersMocks.data,
      player: { firstName: '', lastName: '', image: '', attack: 50, defense: 50, skills: 50 }
    }

    const { result } = renderHook(() => usePlayers(values))

    act(() =>
      result.current.playerDispatch({
        type: 'updatePlayer',
        payload: {
          firstName: 'Leo',
          lastName: '3 Editado',
          image: 'leo-image',
          attack: 100,
          defense: 100,
          skills: 100,
          id: 3
        }
      })
    )

    expect(result.current.playerState.serverData[2].lastName).toBe('3 Editado')
    expect(result.current.playerState.players[2].lastName).toBe('3 Editado')
  })
})
