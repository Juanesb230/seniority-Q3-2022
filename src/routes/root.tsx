import { Outlet } from 'react-router-dom'
import TargetList from '../components/organisms/target-list'
import './root.scss'

const Root = () => (
  <>
    <Outlet />
    <div className="app">
      <h1 className="app__title">MI EQUIPO</h1>
      <TargetList />
    </div>
  </>
)

export default Root
