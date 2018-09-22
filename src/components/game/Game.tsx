import * as React from 'react'
import { connect } from 'react-redux'
import { ThunkAction } from 'redux-thunk'
import { ActionCreator } from 'redux'
import { RouteComponentProps, withRouter } from 'react-router'

import IStoreState from 'state/IStoreState'
import Match from 'state/matches/match.model'
import { HeatmapData } from 'state/matches/telemetry/events'
import { GameMaps } from 'state/enums/gameMaps'
import { getEventsOfTypeAsHeatmapDatum } from 'state/matches/match.selectors'
import { getRedZones, getBlueZone, getSafeZones, getPlanePath, getPlayerStory } from 'state/matches/telemetry/selectors'
import * as MatchesActions from 'state/matches/matches.actions'
import { Circle, PlanePath, PlayerStory } from 'state/matches/telemetry/computedObjects'

import GameControls from './controls/Controls'
import TeamInfo from './teaminfo/TeamInfo'
import GameSummary from './summary/GameSummary'
import Map from './map/Map'

import * as styles from './Game.scss'

interface OwnProps { }

const initialState = {
}

type State = typeof initialState

interface DispatchToProps {
  setCurrentMatch: (matchId: string) => MatchesActions.SetActiveMatchAction,
  getMatchDetailed: ActionCreator<ThunkAction<void, IStoreState, {}>>
}

interface StateToProps {
  displayedMatch: Match, // calling the key match would collide with the attr match from withRouter
  isLoading: boolean,
  elapsed: number,
  planePath: PlanePath,
  heatmapData: HeatmapData[],
  safeZones: Array<Circle>,
  redZones: Array<Circle>,
  blueZone: Circle,
  playerStory: PlayerStory
}

const mapStateToProps = (state: IStoreState) => ({
  displayedMatch: state.matches.matches[state.matches.current],
  isLoading: false,
  elapsed: state.matches.viewState.elapsed,
  planePath: getPlanePath(state),
  heatmapData: getEventsOfTypeAsHeatmapDatum(state),
  safeZones: getSafeZones(state),
  redZones: getRedZones(state),
  blueZone: getBlueZone(state),
  playerStory: getPlayerStory(state)
})

const mapDispatchToProps: DispatchToProps = {
  setCurrentMatch: MatchesActions.setCurrentMatch,
  getMatchDetailed: MatchesActions.getMatchDetailed
}

type Props = OwnProps & DispatchToProps & StateToProps & RouteComponentProps<{ gameId: string }>

export class Game extends React.Component<Props, State> {
  readonly state: State = initialState

  constructor(props: Props, state: State) {
    super(props, state)
  }

  public componentDidMount() {
    const matchId = this.props.match.params.gameId
    this.props.getMatchDetailed(matchId)
    this.props.setCurrentMatch(matchId)
  }

  public render() {
    return (<div className={styles.game}>
      <div className="row">
        <div className="col-xs-12 col-sm-6">
          <GameSummary />
        </div>
        <div className="col-xs-12 col-sm-6">
          <TeamInfo />
        </div>
      </div>
      <GameControls />

      <div className="row">
        <div className="col-xs-12 col-sm-12 col-md-9">
          <Map
            planePath={this.props.planePath}
            circles={this.props.safeZones}
            mapName={GameMaps.Erangel}
            heatmapData={this.props.heatmapData}
            redZones={this.props.redZones}
            blueZone={this.props.blueZone}
            playerStory={this.props.playerStory}
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-3">
          player story here
        </div>
      </div>
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
