import { Circle } from 'state/matches/telemetry/computedObjects'

export interface RedZone {
  circle: Circle,
  startTick: number,
  endTick: number
}
