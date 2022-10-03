import { FC } from 'react'
import { PlayerState } from '../hooks/use-players/use-players'

import AppContext from '../context'
import useModal from '../hooks/use-modal/use-modal'
import usePlayers from '../hooks/use-players/use-players'

export interface WrapperProviderTestProps {
  values?: PlayerState
}

const WrapperProviderTest: FC<WrapperProviderTestProps> = ({ values, children }) => {
  const playerReducer = usePlayers(values)
  const modal = useModal()

  const store = {
    playerReducer,
    modal
  }

  return <AppContext.Provider value={store}>{children}</AppContext.Provider>
}

export default WrapperProviderTest
