import { autoserialize } from 'cerialize'

import TelemetryEventType from './telemetryEventType'
import { TelemetryEvent, HeatmapData } from './telemetryEvent'
import { GameState } from '../objects'

export class LogGameStatePeriodic extends TelemetryEvent<TelemetryEventType.LogGameStatePeriodic> {
  @autoserialize gamestate: GameState

  public toHeatmapData(): HeatmapData {
    // we only represent the victim position
    return {
      x: 1,
      y: 1,
      value: 1
    }
  }
}