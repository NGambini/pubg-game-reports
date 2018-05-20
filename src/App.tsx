import * as React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from 'components/layout/header/Header'
import Footer from 'components/layout/footer/Footer'

import GameSelection from './GameSelection'
import Game from './components/game/Game'
import store from './state/store'

import './App.css'

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Header />
          <Router>
            <div>
              <Route path="/choose-game" component={GameSelection} />
              <Route path="/game/:gameId" component={Game} />
              <Link to="/choose-game">choose game</Link>
            </div>
          </Router>
          <Footer />
        </div>
      </Provider>
    )
  }
}

export default App
