import { autoserialize } from 'cerialize'
import TelemetryEventType from './telemetryEventType'

// location as expected by heatmap.js
export interface HeatmapData {
  x: number,
  y: number,
  value: number
}

export abstract class TelemetryEvent<T extends TelemetryEventType> {
  @autoserialize _V: number // event version
  @autoserialize _D: Date
  @autoserialize _T: T

  abstract toHeatmapData(): HeatmapData
}
