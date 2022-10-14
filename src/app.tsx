import './app.scss'
import Slider from './components/atoms/slider/slider'
import DeleteIcon from './assets/delete-icon.svg'
import EditIcon from './assets/edit-icon.svg'
import CloseIcon from './assets/close-icon.svg'
import Button from './components/atoms/button'
import Input from './components/atoms/input'
import Image from './components/atoms/image'
import PlayerCard from './components/molecules/player-card'
function App() {
  return (
    <div className="app">
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
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
        <PlayerCard></PlayerCard>
      </div>
    </div>
  )
}

export default App
