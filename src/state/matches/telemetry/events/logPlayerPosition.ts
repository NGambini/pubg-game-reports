import TelemetryEventType from './telemetryEventType'
import { TelemetryEvent } from './telemetryEvent'
import { Character, Vehicle } from '../objects'

export interface LogPlayerPosition extends TelemetryEvent<TelemetryEventType.LogPlayerPosition> {
  character: Character
  elapsedTime: number
  numAlivePlayers: number,
  vehicle: Vehicle
}
