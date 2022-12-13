import { FC } from 'react'

import Player from '../../../shared/interfaces/Player'

import EditIcon from '../../../assets/edit-icon.svg'
import DeleteIcon from '../../../assets/delete-icon.svg'
import Button from '../../atoms/button'
import './player-card.scss'

export interface PlayerCardProps {
  player: Player
  onEdit?: (player: Player) => void
  onDelete?: (player: Player) => void
}

const PlayerCard: FC<PlayerCardProps> = ({ player, onDelete = () => {}, onEdit = () => {} }) => {
  return (
    <div className="player-card">
      <div className="player-card__header">
        <img className="player-card__image" src={player.image} alt={player.lastName} />
        <div className="player-card__shadow" />
        <div className="player-card__player-name">{`${player.firstName} ${player.lastName}`}</div>
      </div>
      <div className="player-card__body">
        <div className="player-card__skill">
          <div>
            <p>Ataque</p>
            <p>{player.attack}</p>
          </div>
          <div>
            <p>Defensa</p>
            <p>{player.defense}</p>
          </div>
          <div>
            <p>Skills</p>
            <p>{player.skills}</p>
          </div>
        </div>
        <div className="player-card__buttons">
          <Button variant="secondary" onClick={() => onEdit(player)}>
            <img className="player-card__button" src={EditIcon} alt="edit-icon" />
          </Button>
          <Button variant="secondary" onClick={() => onDelete(player)}>
            <img className="player-card__button" src={DeleteIcon} alt="delete-icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PlayerCard
