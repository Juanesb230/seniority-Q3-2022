import React from 'react'
import ReactDOM from 'react-dom'
import App from './app'
import reportWebVitals from './reportWebVitals'

import { setupStore } from './redux/store'
import { playerSlice } from './redux/players/playerSlice'
import { Provider } from 'react-redux'

import './index.scss'

async function start() {
  const store = setupStore()
  store.dispatch(playerSlice.endpoints.getPlayers.initiate())

  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  )
}

start()
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
