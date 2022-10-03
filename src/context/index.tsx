import { createContext } from 'react'
import { INITIAL_STATE as playerInitialState, PlayerHookType } from '../hooks/use-players'
import { ModalHookType } from '../hooks/use-modal'

interface AppContextInterface {
  playerReducer: PlayerHookType
  modal: ModalHookType
}

const AppContext = createContext<AppContextInterface>({
  playerReducer: { playerState: playerInitialState, playerDispatch: () => {} },
  modal: { showModal: false, setShowModal: () => {} }
})

export default AppContext
