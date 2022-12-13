import { useState } from 'react'
import './app.scss'
import Slider from './components/atoms/slider/slider'
import DeleteIcon from './assets/delete-icon.svg'
import EditIcon from './assets/edit-icon.svg'
import CloseIcon from './assets/close-icon.svg'
import Button from './components/atoms/button'
import Input from './components/atoms/input'
import Image from './components/atoms/image'
import PlayerCard from './components/molecules/player-card'
import { Modal } from './components/atoms/modal'

function App() {
  const [showModal, setShowModal] = useState<boolean>(true)

  return (
    <div className="app">
      {showModal && (
        <Modal handleClose={() => setShowModal(!showModal)} title="Agregar player">
          <div style={{ minWidth: 500 }}>Form</div>
        </Modal>
      )}
      <h1 className="app__title">MI EQUIPO</h1>

      <div>
        <Slider label="Puntaje" value={55} />
      </div>
      <Button variant="secondary">
        <img src={DeleteIcon} alt="delete-icon" />
      </Button>
      <div>
        <img src={EditIcon} alt="edit-icon" />
        <img src={CloseIcon} alt="close-icon" />
      </div>
      <Input label="Prueba" />
      <Image src="https://media.gettyimages.com/photos/lionel-messi-of-fc-barcelona-waves-to-the-crowd-prior-to-the-joan-picture-id1166074663?s=612x612" />

      <div className="grid">
        {[0, 1, 2, 3].map(() => (
          <PlayerCard
            player={{
              skills: 50,
              attack: 50,
              defense: 50,
              firstName: 'Leo',
              lastName: 'Messi',
              image:
                'https://media.gettyimages.com/photos/lionel-messi-of-fc-barcelona-waves-to-the-crowd-prior-to-the-joan-picture-id1166074663?s=612x612'
            }}
          ></PlayerCard>
        ))}
      </div>
    </div>
  )
}

export default App
