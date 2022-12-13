import { createContext, useContext, FC } from 'react'
import { INITIAL_STATE as playerInitialState, PlayerHook } from '../hooks/use-players'
import { ModalHook } from '../hooks/use-modal'
import usePlayers from '../hooks/use-players/use-players'
import useModal from '../hooks/use-modal/use-modal'

interface AppContextHooks {
  playerReducer: PlayerHook
  modal: ModalHook
}

const AppContext = createContext<AppContextHooks>({
  playerReducer: { playerState: playerInitialState, playerDispatch: () => {} },
  modal: { showModal: false, setShowModal: () => {} }
})

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider: FC = ({ children }) => {
  const playerReducer = usePlayers()
  const modal = useModal()

  const store = {
    playerReducer,
    modal
  }

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}

export default AppContext
