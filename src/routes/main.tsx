import { createBrowserRouter } from 'react-router-dom'
import PlayerForm from '../components/organisms/player-form'
import Root from './root'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: 'update/:playerId',
        element: <PlayerForm />
      },
      {
        path: 'create',
        element: <PlayerForm />
      }
    ]
  }
])

export default router
