import { withRouter, BrowserRouter } from 'react-router-dom'
import { RouteComponentProps } from 'react-router'
import * as React from 'react'

export interface GameEntryProps {
  router?: BrowserRouter,
  gameId: string
}

class GameEntry extends React.Component<GameEntryProps & RouteComponentProps<{}>, {}> {
  constructor(props: GameEntryProps & RouteComponentProps<{}>) {
    super(props)
}

  public render() {
    return (<button type='button' onClick={() => { this.props.history.push('/game/' + this.props. gameId) }}>
    go to game {this.props.gameId}
    </button>)
  }
}

export default withRouter(GameEntry)