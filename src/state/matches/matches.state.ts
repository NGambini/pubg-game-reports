import Match from './match.model'
import { TelemetryEventType, HeatmapEvents } from 'state/matches/telemetry/events'

export interface MatchViewState {
  elapsed: number,
  startTime: Date,
  isPlaying: boolean,
  heatmapEvent: HeatmapEvents,
  showCircles: boolean,
  showPlanePath: boolean,
  showRedZones: boolean
}

export default interface MatchesState {
  isLoading: boolean,
  matches: { [id: string]: Match },
  current: string, //selected match id
  viewState: MatchViewState
}

export const initialState: MatchesState = {
  isLoading: false,
  matches: {},
  current: null,
  viewState: {
    elapsed: 0,
    startTime: null,
    isPlaying: false,
    heatmapEvent: TelemetryEventType.LogPlayerPosition,
    showCircles: true,
    showPlanePath: true,
    showRedZones: false
  }
}
