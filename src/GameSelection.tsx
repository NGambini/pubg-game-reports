import * as React from 'react'

const initialState = {
  authToken: '',
  playerName: '',
  shard_id: null
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
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }

}