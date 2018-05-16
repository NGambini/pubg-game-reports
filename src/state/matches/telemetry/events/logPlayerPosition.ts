import { autoserialize } from 'cerialize'

import TelemetryEventType from './telemetryEventType'
import { TelemetryEvent, HeatmapData } from './telemetryEvent'
import { Character } from '../objects'


export class LogPlayerPosition extends TelemetryEvent<TelemetryEventType.LogPlayerPosition> {
  @autoserialize character: Character
  @autoserialize elapsedTime: number
  @autoserialize numAlivePlayers: number

  public toHeatmapData(): HeatmapData {
    // we only represent the victim position
    return {
      x: Math.floor(this.character.location.x),
      y: Math.floor(this.character.location.y),
      value: 1
    }
  }
}
