import { useCallback, useEffect } from 'react'

import { useAppContext } from '../../../../context'
import { Player, PlayerService } from '../../../../services/players'

export interface UseTargetListReturn {
  players: Player[]
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
}

const useTargetList = (): UseTargetListReturn => {
  const { playerReducer, modal } = useAppContext()
  const { setShowModal } = modal
  const { playerState, playerDispatch } = playerReducer
  const { players } = playerState

  const refetch = useCallback(async () => {
    const payload = await PlayerService.getPlayers()
    playerDispatch({ type: 'getForServer', payload })
  }, [playerDispatch])

  useEffect(() => {
    refetch()
  }, [refetch])

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    playerDispatch({ type: 'searchPlayer', payload: value })
  }

  const onClose = () => {
    setShowModal((state) => !state)
  }

  return {
    players,
    onSearch,
    onClose
  }
}

export default useTargetList
