import TelemetryEventType from './telemetryEventType'
import { TelemetryEvent } from './telemetryEvent'
import { Character } from '../objects'

export interface LogPlayerKill extends TelemetryEvent<TelemetryEventType.LogPlayerKill> {
  attackId: number
  killer: Character
  victim: Character
  damageTypeCategory: string
  damageCauserName: string
  distance: number
}
