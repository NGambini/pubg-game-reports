import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import GameSelection from './GameSelection'
import store from './state/store'

import './App.css'

import logo from './logo.svg'

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Welcome to React</h1>
          </header>
          <Router>
            <div>
            <Route path="/choose-game" component={GameSelection} />
            <Link to="/choose-game">choose game</Link>
            </div>
          </Router>
        </div>
      </Provider>
    )
  }
}

export default App
