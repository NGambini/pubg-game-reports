import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import GameSelection from './GameSelection'

import './App.css'

import logo from './logo.svg'

class App extends React.Component {
  public render() {
    return (
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
    )
  }
}

export default App
