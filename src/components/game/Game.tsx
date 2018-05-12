import * as React from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps, withRouter } from 'react-router'

import Match, { getEventsOfTypeAsHeatmapDatum } from '../../state/matches/match.model'
import * as MatchesActions from '../../state/matches/matches.actions'

import IStoreState from '../../state/IStoreState'

import Heatmap from './heatmap/Heatmap'
import TelemetryEventType from '../../state/matches/telemetry/telemetry.enum';
import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';


interface OwnProps {
}

interface State {

}

interface DispatchToProps {
  setCurrentMatch: (matchId: string) => MatchesActions.SetActiveMatchAction,
  getMatchDetailed: ActionCreator<ThunkAction<void, IStoreState, {}>>,
  getMatchTelemetry: ActionCreator<ThunkAction<void, IStoreState, {}>>
}

interface StateToProps {
  displayedMatch: Match, // calling the key match would collide with the attr match from withRouter
  isLoading: boolean
}

type Props = OwnProps & DispatchToProps & StateToProps & RouteComponentProps<{ gameId: string }>

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
    this.props.getMatchTelemetry(this.props.displayedMatch)
  }

  public render() {
    return (<div>
      game detail view
      <br />
      {
        <button onClick={this.getMatchTelemetry} > get game telemetry</button>
      }
      <Heatmap background="erangel" style={{'width': '800px', 'height': '800px'}}
      data={{ 'max': 5, 'data': getEventsOfTypeAsHeatmapDatum(this.props.displayedMatch, TelemetryEventType.LogPlayerPosition)}} />
    </div>)
  }

  public componentWillUnmount() {
    this.props.setCurrentMatch(null)
  }
}

const mapStateToProps = (state: IStoreState) => ({
  displayedMatch: state.matches.matches[state.matches.current],
  isLoading: true
})

const mapDispatchToProps: DispatchToProps = {
  setCurrentMatch: MatchesActions.setCurrentMatch,
  getMatchDetailed: MatchesActions.getMatchDetailed,
  getMatchTelemetry: MatchesActions.getMatchTelemetry,
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Game) as any)
