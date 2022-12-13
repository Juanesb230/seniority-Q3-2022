import { useAppContext } from '../../../../context'
import { PlayerService } from '../../../../services/players'

export interface UseTargetReturn {
  onEdit(): void
  onDelete(): Promise<void>
}

const useTarget = (id: number): UseTargetReturn => {
  const { playerReducer, modal } = useAppContext()
  const { playerDispatch } = playerReducer
  const { setShowModal } = modal

  const onDelete = async () => {
    try {
      await PlayerService.deletePlayer(id)
      playerDispatch({ type: 'deletePlayer', payload: id })
    } catch (e) {}
  }

  const onEdit = () => {
    playerDispatch({ type: 'getPlayer', payload: id })
    setShowModal((state) => !state)
  }

  return {
    onEdit,
    onDelete
  }
}

export default useTarget
