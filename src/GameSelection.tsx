import * as React from 'react'
import { connect } from 'react-redux'

import Region from './state/playerInfo/regions'
import * as PlayerInfoActions from './state/playerInfo/playerinfo.actions'
import { Dispatch } from 'redux';
import IStoreState from './state/IStoreState'

const initialState = {
  authToken: '',
  playerName: '',
  regionId: Region["pc-eu"]
}

type Props = {
  setPlayerInfo: (token: string, playerName: string, regionId: Region) => void
}
type State = Readonly<typeof initialState>

export class GameSelectionInternal extends React.Component<Props, State> {
  readonly state: State = initialState


  constructor(props: Props, state: State) {
    super(props, state);

    this.handleSubmit = this.handleSubmit.bind(this)
    this.changePlayerName = this.changePlayerName.bind(this)
    this.changeToken = this.changeToken.bind(this)
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
        </form>
      </div>
    )
  }
}

interface StateFromProps {}

interface DispatchFromProps {
  setPlayerInfo: (token: string, playerName: string, regionId: Region) => void;
}

const mapStateToProps = (state: IStoreState) => ({})

const mapDispatchToProps = (dispatch: Dispatch): DispatchFromProps => ({
  setPlayerInfo: (token: string, playerName: string, regionId: Region) =>
    dispatch(PlayerInfoActions.setPlayerInfo(token, playerName, regionId))
});

export default connect<StateFromProps, DispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(GameSelectionInternal)

