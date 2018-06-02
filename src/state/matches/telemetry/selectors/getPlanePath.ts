import { PlanePath } from 'state/matches/telemetry/computedObjects'
import { TelemetryEventType, LogPlayerPosition } from 'state/matches/telemetry/events'
import { getEventsOfType } from 'state/matches/match.selectors'
import IStoreState from '../../../IStoreState'

export function getPlanePath(state: IStoreState): PlanePath {
  const match = state.matches.matches[state.matches.current]

  const planePathLength = 200000000

  const posEvents = getEventsOfType(match, TelemetryEventType.LogPlayerPosition) as Array<LogPlayerPosition>
  if (posEvents.length === 0) {
    return null
  }
  const planeZ = Math.max.apply(Math, posEvents.map(e => Math.round(e.character.location.z)))
  const locationsInPlane = posEvents
    .filter(e => Math.round(e.character.location.z) === planeZ)
    .map(e => e.character.location)

  const x0 = locationsInPlane[0].x,
    y0 = locationsInPlane[0].y,
    x1 = locationsInPlane[locationsInPlane.length - 1].x,
    y1 = locationsInPlane[locationsInPlane.length - 1].y

  const angle = Math.atan2(y1 - y0, x1 - x0)

  // far end so plane path doesnt stop at last air drop
  const endX = x0 + planePathLength * Math.cos(angle)
  const endY = y0 + planePathLength * Math.sin(angle)

  return {
    endX: endX,
    endY: endY,
    startX: x0,
    startY: y0
  }
}