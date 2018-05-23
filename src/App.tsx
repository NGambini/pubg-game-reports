import * as React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import Header from 'components/layout/header/Header'
import Footer from 'components/layout/footer/Footer'

import GameSelection from './components/selection/GameSelection'
import Game from './components/game/Game'
import store from './state/store'

import * as styles from './App.scss'

class App extends React.Component {
  public render() {
    return (
      <Provider store={store}>
        <div className={styles.App}> //'App pt-app pt-dark'
          <Header />
          <Router>
            <main>
              <br/>
              <br/>
              <br/>
              <br/>
              <br/>
              <Route path='/choose-game' component={GameSelection} />
              <Route path='/game/:gameId' component={Game} />
            </main>
          </Router>
          <Footer />
        </div>
      </Provider>
    )
  }
}

export default App
