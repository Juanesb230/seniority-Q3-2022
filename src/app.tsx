import './app.scss'
import { AppContextProvider } from './context'

import TargetList from './components/organisms/target-list'
import PlayerForm from './components/organisms/player-form'

function App() {
  return (
    <AppContextProvider>
      <PlayerForm />
      <div className="app">
        <h1 className="app__title">MI EQUIPO</h1>
        <TargetList />
      </div>
    </AppContextProvider>
  )
}

export default App
