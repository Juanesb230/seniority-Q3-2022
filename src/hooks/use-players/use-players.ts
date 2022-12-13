import { useReducer } from 'react'
import { Player } from '../../services/players'

export interface PlayerState {
  players: Player[]
  serverData: Player[]
  player: Player
}

type PlayerReducerAction =
  | {
      type: 'getPlayers' | 'getForServer'
      payload: Player[]
    }
  | {
      type: 'deletePlayer' | 'getPlayer'
      payload: number
    }
  | {
      type: 'searchPlayer'
      payload: string
    }
  | {
      type: 'clearPlayer'
    }
  | {
      type: 'changePlayer'
      payload: {
        inputName: string
        inputValue: string | number
      }
    }
  | {
      type: 'addPlayer' | 'updatePlayer'
      payload: Player
    }

export const INITIAL_STATE = {
  players: [],
  serverData: [],
  player: { firstName: '', lastName: '', image: '', attack: 50, defense: 50, skills: 50 }
}

const playersReducer = (state: PlayerState, action: PlayerReducerAction): PlayerState => {
  let filter
  switch (action.type) {
    case 'getForServer':
      return {
        ...state,
        serverData: action.payload,
        players: action.payload
      }
    case 'getPlayers':
      return {
        ...state,
        players: action.payload
      }
    case 'getPlayer':
      filter = state.players.find((t) => t.id === +action.payload)
      if (filter) {
        return {
          ...state,
          player: filter
        }
      }
      return state
    case 'clearPlayer':
      return {
        ...state,
        player: INITIAL_STATE.player
      }
    case 'deletePlayer':
      filter = state.serverData.filter((t) => t.id !== action.payload)
      return {
        ...state,
        serverData: filter,
        players: filter
      }
    case 'searchPlayer':
      if (action.payload !== '')
        return {
          ...state,
          players: state.players.filter((t: Player) =>
            t.lastName.toLowerCase().includes(action.payload.toLowerCase())
          )
        }
      return { ...state, players: state.serverData }
    case 'changePlayer':
      const { inputName, inputValue } = action.payload
      return {
        ...state,
        player: {
          ...state.player,
          [inputName]: inputValue
        }
      }
    case 'addPlayer':
      return {
        ...state,
        players: [...state.players, action.payload],
        serverData: [...state.players, action.payload]
      }
    case 'updatePlayer':
      filter = state.players.map((p) => {
        if (p.id === action.payload.id) return action.payload
        return p
      })
      return {
        ...state,
        players: filter,
        serverData: filter
      }
  }
}

const usePlayers = (initialState?: PlayerState) => {
  const [playerState, playerDispatch] = useReducer(playersReducer, initialState ?? INITIAL_STATE)
  return { playerState, playerDispatch }
}

export default usePlayers
export type PlayerHook = ReturnType<typeof usePlayers>
