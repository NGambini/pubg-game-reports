import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import { ActionCreator } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router'

import IStoreState from 'state/IStoreState'
import Match from 'state/matches/match.model'
import { TelemetryEventType } from 'state/matches/telemetry/events'
import { getEventsOfTypeAsHeatmapDatum, getPlanePath, getSafeZones } from 'state/matches/match.selectors'
import * as MatchesActions from 'state/matches/matches.actions'

import Heatmap from './heatmap/Heatmap'

interface OwnProps { }

interface State { }

interface DispatchToProps {
  setCurrentMatch: (matchId: string) => MatchesActions.SetActiveMatchAction,
  calcSafeZones: (matchId?: string) => MatchesActions.CalcSafeZonesAction,
  getMatchDetailed: ActionCreator<ThunkAction<void, IStoreState, {}>>,
  getMatchTelemetry: ActionCreator<ThunkAction<void, IStoreState, {}>>
}

interface StateToProps {
  displayedMatch: Match, // calling the key match would collide with the attr match from withRouter
  isLoading: boolean
}

const mapStateToProps = (state: IStoreState) => ({
  displayedMatch: state.matches.matches[state.matches.current],
  isLoading: true
})

const mapDispatchToProps: DispatchToProps = {
  setCurrentMatch: MatchesActions.setCurrentMatch,
  calcSafeZones: MatchesActions.calcSafeZones,
  getMatchDetailed: MatchesActions.getMatchDetailed,
  getMatchTelemetry: MatchesActions.getMatchTelemetry,
}

type Props = OwnProps & DispatchToProps & StateToProps & RouteComponentProps<{ gameId: string }>

export class Game extends React.Component<Props, State> {
  constructor(props: Props, state: State) {
    super(props, state)

    this.getMatchTelemetry = this.getMatchTelemetry.bind(this)
    this.calcSafeZones = this.calcSafeZones.bind(this)
  }

  public componentDidMount() {
    const matchId = this.props.match.params.gameId
    this.props.getMatchDetailed(matchId)
    this.props.setCurrentMatch(matchId)
  }

  public getMatchTelemetry() {
    this.props.getMatchTelemetry(this.props.displayedMatch)
  }

  public calcSafeZones() {
    this.props.calcSafeZones(this.props.match.params.gameId)
  }

  public render() {
    return (<div>
      game detail view
      <br />

      <button onClick={this.getMatchTelemetry}>get game telemetry</button>
      <button onClick={this.calcSafeZones}>calc safe zone</button>

      <div>plane path : {JSON.stringify(getPlanePath(this.props.displayedMatch))}</div>
      <div>circle coordinates : {JSON.stringify(getSafeZones(this.props.displayedMatch))}</div>
      <Heatmap background="erangel" style={{ 'width': '800px', 'height': '800px' }}
        data={{ min: 0, max: 5, data: getEventsOfTypeAsHeatmapDatum(this.props.displayedMatch, TelemetryEventType.LogPlayerPosition) }} />
    </div>)
  }

  public componentWillUnmount() {
    this.props.setCurrentMatch(null)
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Game) as any)
