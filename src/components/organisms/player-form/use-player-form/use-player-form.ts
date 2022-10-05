import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../../../../redux/hooks'
import {
  Player,
  selectById,
  useAddPlayerMutation,
  useUpdatePlayerMutation
} from '../../../../redux/players/playerSlice'
import { DEFAULT_PLAYER } from '../../../../constants'

export interface UsePlayerFormReturn {
  player: Player
  showModal: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onCreatePlayer: () => void
  onUpdatePlayer: () => void
  onClose: () => void
}

const usePlayerForm = (): UsePlayerFormReturn => {
  const navigate = useNavigate()
  const { playerId } = useParams()

  const initialPlayer =
    useAppSelector((state) => selectById(state, playerId ?? -1)) ?? DEFAULT_PLAYER
  const [player, setPlayer] = useState(initialPlayer)

  const [addPlayer] = useAddPlayerMutation()
  const [updatePlayer] = useUpdatePlayerMutation()

  const onClose = () => {
    navigate('/')
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target
    setPlayer((state) => ({ ...state, [name]: value }))
  }

  const onUpdatePlayer = async () => {
    await updatePlayer(player)
    onClose()
  }

  const onCreatePlayer = async () => {
    await addPlayer(player)
    onClose()
  }

  return {
    player,
    showModal: false,
    onChange,
    onClose,
    onCreatePlayer,
    onUpdatePlayer
  }
}

export default usePlayerForm
