import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { searchPlayer, Player } from '../../../../redux/players/playerSlice'
import { useAppSelector } from '../../../../redux/hooks'

export interface UseTargetListReturn {
  players: Player[]
  onSearch: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
}

const useTargetList = (): UseTargetListReturn => {
  const navigate = useNavigate()
  const [searchValue, setSearchValue] = useState('')
  const players = useAppSelector((state: any) => searchPlayer(state, searchValue))

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setSearchValue(value)
  }

  const onClose = () => {
    navigate('/create')
  }

  return {
    players,
    onSearch,
    onClose
  }
}

export default useTargetList
