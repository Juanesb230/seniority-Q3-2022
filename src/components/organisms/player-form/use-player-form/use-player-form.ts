import { useAppContext } from '../../../../context'
import { Player, PlayerService } from '../../../../services/players'

export interface UsePlayerFormReturn {
  player: Player
  showModal: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  callServer: (method: 'createPlayer' | 'updatePlayer') => void
  onClose: () => void
}

const usePlayerForm = (): UsePlayerFormReturn => {
  const { modal, playerReducer } = useAppContext()
  const { showModal, setShowModal } = modal
  const { playerState, playerDispatch } = playerReducer
  const { player } = playerState

  const onClose = () => {
    playerDispatch({ type: 'clearPlayer' })
    setShowModal((state) => !state)
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name: inputName, value: inputValue } = e.target
    playerDispatch({ type: 'changePlayer', payload: { inputName, inputValue } })
  }

  const callServer = async (method: 'createPlayer' | 'updatePlayer') => {
    try {
      const data = await PlayerService[method](player)
      if (method === 'createPlayer')
        playerDispatch({ type: 'addPlayer', payload: { ...player, id: data.id } })
      if (method === 'updatePlayer') playerDispatch({ type: 'updatePlayer', payload: player })
      onClose()
    } catch (e) {}
  }

  return {
    player,
    showModal,
    onChange,
    callServer,
    onClose
  }
}

export default usePlayerForm
