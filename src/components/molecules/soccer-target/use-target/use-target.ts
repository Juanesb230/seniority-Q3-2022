import { useNavigate } from 'react-router-dom'
import { useDeletePlayerMutation } from '../../../../redux/players/playerSlice'

export interface UseTargetReturn {
  onEdit(): void
  onDelete(): Promise<void>
}

const useTarget = (id: number): UseTargetReturn => {
  const navigate = useNavigate()
  const [deletePlayer] = useDeletePlayerMutation()

  const onDelete = async () => {
    deletePlayer(id)
  }

  const onEdit = () => {
    navigate(`/update/${id}`)
  }

  return {
    onEdit,
    onDelete
  }
}

export default useTarget
