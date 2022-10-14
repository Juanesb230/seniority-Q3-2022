import { useContext, useLayoutEffect } from 'react'
import AppContext from '../../../../context'
import { PlayerService } from '../../../../services/players'

const usePlayerForm = () => {
  const { modal, playerReducer } = useContext(AppContext)
  const { showModal, setShowModal } = modal
  const { playerState, playerDispatch } = playerReducer
  const { player } = playerState

  useLayoutEffect(() => {}, [])

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