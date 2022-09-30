import { FC } from 'react'

import useTarget from './use-target'
import EditIcon from '../../../assets/edit-icon.svg'
import DeletIcon from '../../../assets/delete-icon.svg'

import Button from '../../atoms/button'

import './soccer-target.scss'

export interface SoccerTargetProps {
  id: number
  name: string
  attack: number
  defense: number
  skills: number
  image: string
}

export interface StadisticLabelProps {
  label: string
  value: number
}

const StadisticLabel: FC<StadisticLabelProps> = ({ label, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <p style={{ margin: '0px' }}>{label}</p>
    <h5 style={{ fontWeight: 'bold', margin: '8px' }}>{value}</h5>
  </div>
)

const SoccerTarget: FC<SoccerTargetProps> = ({ id, name, attack, defense, skills, image }) => {
  const { onEdit, onDelete } = useTarget(id)

  return (
    <div className="soccer-target">
      <div className="soccer-target__image">
        <img alt={name} src={image} />
        <h3 style={{ fontWeight: 'bold', textAlign: 'center' }}>{name.toUpperCase()}</h3>
      </div>
      <div className="soccer-target__panel">
        <div className="soccer-target__stadistics">
          <StadisticLabel label="Ataque" value={attack} />
          <StadisticLabel label="Defensa" value={defense} />
          <StadisticLabel label="Skills" value={skills} />
        </div>
        <div className="soccer-target__buttons">
          <Button id="edit" variant="secondary" onClick={onEdit}>
            <img src={EditIcon} alt="edit-icon" />
          </Button>
          <Button id="delete" variant="secondary" onClick={() => onDelete(id)}>
            <img src={DeletIcon} alt="delete-icon" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SoccerTarget
