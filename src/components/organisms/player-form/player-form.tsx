import usePlayerForm from './use-player-form'

import CloseIcon from '../../../assets/close-icon.svg'

import Button from '../../atoms/button'
import Input from '../../atoms/input'
import Slider from '../../atoms/slider'

import './player-form.scss'

const PlayerForm = () => {
  const { player, onChange, onClose, onCreatePlayer, onUpdatePlayer } = usePlayerForm()
  const buttonDisabled = !!!player.firstName || !!!player.lastName || !!!player.image

  return (
    <>
      <div className="player-form__all" onClick={onClose} />
      <div className="player-form__container">
        <div className="player-form__header">
          <h3 style={{ fontWeight: 'bold', margin: '8px' }}>Jugador</h3>
          <Button variant="secondary" onClick={onClose}>
            <img src={CloseIcon} alt="edit-icon" style={{ width: 20 }} />
          </Button>
        </div>
        <div className="player-form__body">
          <img alt={player.firstName} src={player.image} />
          <div>
            <div className="player-form__inputs">
              <Input
                placeholder="Nombre"
                initialValue={player.firstName}
                name="firstName"
                onChange={onChange}
              />
              <Input
                placeholder="Apellido"
                name="lastName"
                initialValue={player.lastName}
                onChange={onChange}
              />
            </div>
            <div className="player-form__inputs">
              <Input
                placeholder="Imagen"
                initialValue={player.image}
                name="image"
                onChange={onChange}
                width="100%"
              />
            </div>
            <div>
              <Slider
                label="Ataque"
                defaultValue={player.attack}
                name="attack"
                onChange={onChange}
              />
              <Slider
                label="Defensa"
                defaultValue={player.defense}
                name="defense"
                onChange={onChange}
              />
              <Slider
                label="Skills"
                defaultValue={player.skills}
                name="skills"
                onChange={onChange}
              />
            </div>
            {player.id && (
              <Button onClick={onUpdatePlayer} disabled={buttonDisabled}>
                Editar
              </Button>
            )}
            {!player.id && (
              <Button onClick={onCreatePlayer} disabled={buttonDisabled}>
                Agregarlo
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default PlayerForm
