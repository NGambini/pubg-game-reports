import { autoserialize } from 'cerialize'

import TelemetryEventType from './telemetryEventType'
import { TelemetryEvent, HeatmapData } from './telemetryEvent'
import { Character } from '../objects'

export class LogPlayerKill extends TelemetryEvent<TelemetryEventType.LogPlayerKill> {
  @autoserialize attackId: number
  @autoserialize killer: Character
  @autoserialize victim: Character
  @autoserialize damageTypeCategory: string
  @autoserialize damageCauserName: string
  @autoserialize distance: number

  public toHeatmapData(): HeatmapData {
    // we only represent the victim position
    return {
      x: this.victim.location.x,
      y: this.victim.location.y,
      value: 1
    }
  }
}
