import * as React from 'react'
import { connect } from 'react-redux'
import { Card, Elevation, Button } from '@blueprintjs/core'

import IStoreState from 'state/IStoreState'
import { getParticipantTeam } from 'state/matches/selectors'
import { Team } from 'state/matches/computedObjects/Team'
import * as ViewActions from 'state/view/view.actions'

// import * as styles from './TeamInfo.scss'

type StateToProps = {
  team: Team
}

type DispatchToProps =  {
  setCurrentPlayer: (pName: string) => ViewActions.SetCurrentPlayerAction
}

const mapStateToProps = (state: IStoreState) => ({
  team: getParticipantTeam(state)
})

const mapDispatchToProps: DispatchToProps = {
  setCurrentPlayer: ViewActions.setCurrentPlayer
}

type Props = StateToProps & DispatchToProps

class TeamInfo extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)

  }

  public setCurrentPlayer(pName: string) {
    this.props.setCurrentPlayer(pName)
  }

  public render() {
    const { team } = this.props

    return (
      <Card interactive={true} elevation={Elevation.TWO}>
        <h5>Your team: </h5>
        <p>{JSON.stringify(team)}</p>
        {team && team.players && team.players.map(p => 
          <Button key={p.id} onClick={() => this.setCurrentPlayer(p.name)}>{p.name}</Button>)
        }
      </Card>)
  }
}

export default connect<StateToProps, DispatchToProps, void>(mapStateToProps, mapDispatchToProps)(TeamInfo)
