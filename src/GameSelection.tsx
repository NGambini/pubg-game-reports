import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Region from './state/playerInfo/regions'
import Match from './state/matches/match.model'
import * as PlayerInfoActions from './state/playerInfo/playerinfo.actions'
import * as MatchesActions from './state/matches/matches.actions'

import IStoreState from './state/IStoreState'
// import store from './state/store'

import GameEntry from './components/selection/GameEntry'

const initialState = {
  authToken: '',
  playerName: '',
  regionId: Region["pc-eu"]
}

type Props = {
  setPlayerInfo: (token: string, playerName: string, regionId: Region) => void,
  getMatchDetailed: (gameId: string) => void
}
type State = Readonly<typeof initialState>

export class GameSelectionInternal extends React.Component<Props & StateToProps, State> {
  readonly state: State = initialState

  constructor(props: Props & StateToProps, state: State) {
    super(props, state);

    this.handleSubmit = this.handleSubmit.bind(this)
    this.changePlayerName = this.changePlayerName.bind(this)
    this.changeToken = this.changeToken.bind(this)
    this.getMatchDetailed = this.getMatchDetailed.bind(this)
  }

  public getMatchDetailed(gameId: string) {
    this.props.getMatchDetailed(gameId)
  }

  public handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault()
    this.props.setPlayerInfo(this.state.authToken, this.state.playerName, this.state.regionId)
  }

  public changeRegion = (e: React.FormEvent<any>) => {
    this.setState({
      regionId: e.currentTarget.value
    })
  }

  public changePlayerName = (e: React.FormEvent<any>) => {
    this.setState({
      playerName: e.currentTarget.value
    })
  }

  public changeToken(e: React.FormEvent<any>) {
    this.setState({
      authToken: e.currentTarget.value
    })
  }

  public render() {
    let regionShards = []

    for (let region in Region) {
      if (isNaN(Number(region))) {
        regionShards.push(<option key={region} value={region}>{region}</option>)
      }
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Token:
            <input type="text" value={this.state.authToken} onChange={this.changeToken} />
          </label>
          <label>
            Player name:
            <input type="text" value={this.state.playerName} onChange={this.changePlayerName} />
          </label>
          <select onChange={this.changeRegion} value={this.state.regionId}>
            {regionShards}
          </select>
          <input type="submit" value="Submit" />
          <br/>
          <br/>
          { this.props.matches.map(m => <GameEntry key={m.id} gameId={m.id}/>) }
        </form>
      </div>
    )
  }
}

interface StateToProps {
  matches: Array<Match>,
  isLoading: boolean
}

interface DispatchToProps {
  setPlayerInfo: (token: string, playerName: string, regionId: Region) => void,
  getMatchDetailed: (gameId: string) => void
}

const mapStateToProps = (state: IStoreState) => ({
  matches: state.matches.matches,
  isLoading: state.matches.isLoading
})

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchToProps => ({
  setPlayerInfo: (token: string, playerName: string, regionId: Region) => {
    dispatch(PlayerInfoActions.setPlayerInfo(token, playerName, regionId))
    dispatch(MatchesActions.getPlayerMatches())
  },
  getMatchDetailed: (gameId: string) => {
    dispatch(MatchesActions.getMatchDetailed(gameId))
  }
})

export default connect<StateToProps, DispatchToProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(GameSelectionInternal)

