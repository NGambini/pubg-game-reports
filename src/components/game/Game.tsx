import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

import Match, { getTelemetryUrl, isMatchFetched, isMatchTelemetryFetched } from '../../state/matches/match.model'
import * as MatchesActions from '../../state/matches/matches.actions'

import IStoreState from '../../state/IStoreState'

interface OwnProps {
}

interface State {

}

interface DispatchToProps {
  setCurrentMatch: (matchId: string) => void,
  getMatchDetailed: (matchId: string) => void,
  getMatchTelemetry: (match: Match) => void,
}

interface StateToProps {
  displayedMatch: Match, // calling the key match would collide with the attr match from withRouter
  isLoading: boolean
}

type Props = OwnProps & DispatchToProps & StateToProps & RouteComponentProps<{gameId: string}>

export class Game extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state)

    this.getMatchTelemetry = this.getMatchTelemetry.bind(this)
  }

  public componentDidMount() {
    const matchId = this.props.match.params.gameId
    this.props.getMatchDetailed(matchId)
    this.props.setCurrentMatch(matchId)
  }

  public getMatchTelemetry() {
    console.log("getting match telemetry from url : ", getTelemetryUrl(this.props.displayedMatch))
    this.props.getMatchTelemetry(this.props.displayedMatch)
  }

  public render() {
    return (<div>
      game detail view
      <br />
      {isMatchFetched(this.props.displayedMatch) && !isMatchTelemetryFetched(this.props.displayedMatch) &&
        <button onClick={this.getMatchTelemetry} > get game telemetry</button>
      }
    </div>)
  }

  public componentWillUnmount() {
    this.props.setCurrentMatch(null)
  }
}

const mapStateToProps = (state: IStoreState): StateToProps => ({
  displayedMatch: state.matches.matches.find(m => m.id === state.matches.current),
  isLoading: true
})

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>) => ({
  setCurrentMatch: (matchId: string) => {
    dispatch(MatchesActions.setCurrentMatch(matchId))
  },
  getMatchDetailed: (matchId: string) => {
    dispatch(MatchesActions.getMatchDetailed(matchId))
  },
  getMatchTelemetry: (match: Match) => {
    dispatch(MatchesActions.getMatchTelemetry(match))
  }
})

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Game) as any)


