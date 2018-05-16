import TelemetryEventType from './telemetryEventType'
import { TelemetryEvent } from './telemetryEvent'
import { GameState } from '../objects'

export interface LogGameStatePeriodic extends TelemetryEvent<TelemetryEventType.LogGameStatePeriodic> {
  gamestate: GameState
}
