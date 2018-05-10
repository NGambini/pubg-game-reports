import { autoserialize } from 'cerialize'

import TelemetryEventType from './telemetry.enum'

// location as expected by heatmap.js
export interface HeatmapData {
  x: number,
  y: number,
  value: number
}

// location as return by API
export interface Location {
  x: number,
  y: number,
  z: number
}

export interface Character {
  name: string,
  teamId: number,
  health: number,
  location: Location,
  ranking: number,
  accountId: string
}

export abstract class TelemetryEvent<T extends TelemetryEventType> {
  @autoserialize _V: number // event version
  @autoserialize _D: Date
  @autoserialize _T: T

  abstract toHeatmapData(): HeatmapData
}

export class LogPlayerKill extends TelemetryEvent<TelemetryEventType.LogPlayerKill> {
  @autoserialize attackId: number
  @autoserialize killer: Character
  @autoserialize victim: Character
  @autoserialize damageTypeCategory: string
  @autoserialize damageCauserName: string
  @autoserialize distance: number

  constructor() {
    super()
  }

  public toHeatmapData(): HeatmapData {
    // we only represent the victim position
    return {
      x: this.victim.location.x,
      y: this.victim.location.y,
      value: 1
    }
  }
}

export class LogPlayerPosition extends TelemetryEvent<TelemetryEventType.LogPlayerPosition> {
  @autoserialize character: Character
  @autoserialize elapsedTime: number
  @autoserialize numAlivePlayers: number

  constructor() {
    super()
  }

  public toHeatmapData(): HeatmapData {
    // we only represent the victim position
    return {
      x: Math.floor(this.character.location.x),
      y: Math.floor(this.character.location.y),
      value: 1
    }
  }
}

export default TelemetryEvent
