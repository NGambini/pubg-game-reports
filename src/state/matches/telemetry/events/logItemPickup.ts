import TelemetryEventType from './telemetryEventType'
import { TelemetryEvent } from './telemetryEvent'
import { Character } from '../objects'

export interface LogGameStatePeriodic extends TelemetryEvent<TelemetryEventType.LogGameStatePeriodic> {
  character: Character,
  item: Item
}
