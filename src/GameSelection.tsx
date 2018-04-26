import * as React from 'react'

import Region from './state/playerInfo/regions'

const initialState = {
  authToken: '',
  playerName: '',
  regionId: undefined
}

type State = Readonly<typeof initialState>

export default class GameSelection extends React.Component<object, State> {
  readonly state: State = initialState


  constructor(props: object, state: State) {
    super(props, state);

    this.handleSubmit = this.handleSubmit.bind(this)
    this.changePlayerName = this.changePlayerName.bind(this)
    this.changeToken = this.changeToken.bind(this)
  }

  public handleSubmit = (e: React.FormEvent<any>) => {
    e.preventDefault()
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
        regionShards.push(<option  key={region} value={region}>{region}</option>)
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