import { LogPlayerKill, LogPlayerPosition } from 'state/matches/telemetry/events'

// location as expected by heatmap.js
export interface HeatmapData {
  x: number,
  y: number,
  value: number
}

export class HeatmapTranslator {
  static fromLogPlayerKill(event: LogPlayerKill): HeatmapData {
    return {
      x: event.victim.location.x,
      y: event.victim.location.y,
      value: 1
    }
  }
  static fromLogPlayerPosition(event: LogPlayerPosition): HeatmapData {
    return {
      x: Math.floor(event.character.location.x),
      y: Math.floor(event.character.location.y),
      value: 1
    }
  }
}
