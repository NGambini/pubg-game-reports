import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import { ActionCreator } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router'

import IStoreState from 'state/IStoreState'
import Match from 'state/matches/match.model'
import {  HeatmapData } from 'state/matches/telemetry/events'
import { GameMaps } from 'state/enums/gameMaps'
import { getEventsOfTypeAsHeatmapDatum, getSafeZones, getPlanePath, getRedZones } from 'state/matches/match.selectors'
import * as MatchesActions from 'state/matches/matches.actions'

import GameControls from './controls/Controls'
import TeamInfo from './teaminfo/TeamInfo'
import GameSummary from './summary/GameSummary'
import Map from './map/Map'


interface OwnProps { }

const initialState = {
}

type State = typeof initialState

interface DispatchToProps {
  setCurrentMatch: (matchId: string) => MatchesActions.SetActiveMatchAction,
  calcSafeZones: (matchId?: string) => MatchesActions.CalcSafeZonesAction,
  getMatchDetailed: ActionCreator<ThunkAction<void, IStoreState, {}>>,
  getMatchTelemetry: ActionCreator<ThunkAction<void, IStoreState, {}>>
}

interface StateToProps {
  displayedMatch: Match, // calling the key match would collide with the attr match from withRouter
  isLoading: boolean,
  elapsed: number,
  heatmapData: HeatmapData[]
}

const mapStateToProps = (state: IStoreState) => ({
  displayedMatch: state.matches.matches[state.matches.current],
  isLoading: true,
  elapsed: state.matches.viewState.elapsed,
  heatmapData: getEventsOfTypeAsHeatmapDatum(state)
})

const mapDispatchToProps: DispatchToProps = {
  setCurrentMatch: MatchesActions.setCurrentMatch,
  calcSafeZones: MatchesActions.calcSafeZones,
  getMatchDetailed: MatchesActions.getMatchDetailed,
  getMatchTelemetry: MatchesActions.getMatchTelemetry,
}

type Props = OwnProps & DispatchToProps & StateToProps & RouteComponentProps<{ gameId: string }>

export class Game extends React.Component<Props, State> {
  readonly state: State = initialState

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

      <GameSummary/>
      <TeamInfo/>
      <GameControls/>
      <Map
        planePath={getPlanePath(this.props.displayedMatch)}
        circles={getSafeZones(this.props.displayedMatch)}
        mapName={GameMaps.Erangel}
        heatmapData={this.props.heatmapData}
        redZones={getRedZones(this.props.displayedMatch)}
      />
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
