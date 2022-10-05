import useTargetList from './use-target-list'

import Button from '../../atoms/button'
import Input from '../../atoms/input'
import SoccerTarget from '../../molecules/soccer-target'

import './target-list.scss'

const TargetList = () => {
  const { players, onSearch, onClose } = useTargetList()

  return (
    <>
      <div className="target-list__search">
        <Input
          showError={false}
          showLabel={false}
          placeholder="Buscar por apellido"
          onChange={onSearch}
        />
        <Button width="150px" onClick={onClose}>
          Agregar
        </Button>
      </div>
      <div className="target-list__container">
        {players.map((p) => (
          <SoccerTarget
            key={p.id}
            id={p.id || -1}
            name={`${p.firstName} ${p.lastName}`}
            image={p.image}
            attack={p.attack}
            defense={p.defense}
            skills={p.skills}
          />
        ))}
      </div>
    </>
  )
}

export default TargetList
