import Match, { TelemetryAttributes } from 'state/matches/match.model'
import {
  TelemetryEventType,
  LogPlayerPosition,
  TelemetryEvent,
  LogPlayerKill,
  HeatmapData,
  HeatmapTranslator,
  LogGameStatePeriodic
} from 'state/matches/telemetry/events'
import { PlanePath, Circle } from 'state/matches/telemetry/computedObjects'
import telemetryEventType from 'state/matches/telemetry/events/telemetryEventType'
import { Location } from 'state/matches/telemetry/objects'

//TODO move into selectors file
export function getTelemetryUrl(match: Match): string {
  const telemetryId = match && match.data.relationships.assets.data && match.data.relationships.assets.data[0].id
  return telemetryId ? (match.included.find(i => i.id === telemetryId).attributes as TelemetryAttributes).URL : null
}

// do we have match detail or just the id from GET_ALL_MATCHES ?
export function isMatchFetched(match: Match): boolean {
  return match && match.data != undefined && match.data != null
}

// do we have the match telemetry ?
export function isMatchTelemetryFetched(match: Match): boolean {
  return match && match.data != undefined && match.telemetry != null && match.telemetry.length > 0
}

export function getEventsOfType(match: Match, eventType: TelemetryEventType): Array<TelemetryEvent<TelemetryEventType>> {
  if (match && match.telemetry && match.telemetry.length > 0) {
    return match.telemetry.filter(m => m._T === eventType)
  }
  return []
}

export function getPlanePath(match: Match): PlanePath {
  const posEvents = getEventsOfType(match, TelemetryEventType.LogPlayerPosition) as Array<LogPlayerPosition>
  if (posEvents.length === 0) {
    return null
  }
  const planeZ = Math.max.apply(Math, posEvents.map(e => Math.round(e.character.location.z)))
  const locationsInPlane = posEvents.filter(e => Math.round(e.character.location.z) === planeZ).map(e => e.character.location)

  const x0 = locationsInPlane[0].x,
    y0 = locationsInPlane[0].y,
    x1 = locationsInPlane[locationsInPlane.length - 1].x,
    y1 = locationsInPlane[locationsInPlane.length - 1].y

  const angle = Math.atan2(y1 - y0, x1 - x0)
  console.log('Math.round(x0 / 800)', Math.round(x0 / 800))
  console.log('Math.round(y0 / 800)', Math.round(y0 / 800))
  console.log('angle', angle)
  return null
}

export function getSafeZones(match: Match): Array<Circle> {
  type WeightedCircle = Circle & { weight: number }
  const gStateEvents = getEventsOfType(match, telemetryEventType.LogGameStatePeriodic) as Array<LogGameStatePeriodic>
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
    if (coordsDict[c.location.x]) {
      coordsDict[c.location.x].radius++
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

export function getEventsOfTypeAsHeatmapDatum(match: Match, eventType: TelemetryEventType): Array<HeatmapData> {
  if (match && match.telemetry && match.telemetry.length > 0) {
    const filtered = match.telemetry.filter(m => m._T === eventType)
    switch (eventType) {
      case TelemetryEventType.LogPlayerKill:
        return filtered.map(m => HeatmapTranslator.fromLogPlayerKill(m as LogPlayerKill))
      case TelemetryEventType.LogPlayerPosition:
        return filtered.map(m => HeatmapTranslator.fromLogPlayerPosition(m as LogPlayerPosition))
      default:
        return []
    }
  }
  return []
}