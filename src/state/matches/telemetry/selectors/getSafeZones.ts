import { Circle } from 'state/matches/telemetry/computedObjects'
import { getEventsOfType } from 'state/matches/match.selectors';
import { LogGameStatePeriodic } from 'state/matches/telemetry/events'
import TelemetryEventType from 'state/matches/telemetry/events/telemetryEventType'
import { Location } from 'state/matches/telemetry/objects'
import IStoreState from '../../../IStoreState'

export function getSafeZones(state: IStoreState): Array<Circle> {
  const match = state.matches.matches[state.matches.current]

  type WeightedCircle = Circle & { weight: number }
  const gStateEvents = getEventsOfType(match, TelemetryEventType.LogGameStatePeriodic) as Array<LogGameStatePeriodic>
  if (gStateEvents.length === 0) { return null }
  const coordsDict: { [id: number]: WeightedCircle } = {}

  gStateEvents.map((e: LogGameStatePeriodic) => ({
    radius: e.gameState.safetyZoneRadius,
    location: {
      x: Math.round(e.gameState.safetyZonePosition.x),
      y: Math.round(e.gameState.safetyZonePosition.y),
      z: Math.round(e.gameState.safetyZonePosition.z)
    } as Location
  } as Circle)).forEach((c: Circle) => { // weight circles by occurences
    if (coordsDict[c.location.x] != undefined) {
      coordsDict[c.location.x].weight++
    } else {
      coordsDict[c.location.x] = {
        weight: 1,
        location: c.location,
        radius: c.radius
      }
    }
  })
  return Object.keys(coordsDict)
    .map((key: string) => coordsDict[key])
    .filter((c: WeightedCircle) => c.weight > 4)
}
