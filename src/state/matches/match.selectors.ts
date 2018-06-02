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
import IStoreState from '../IStoreState'

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
  const planePathLength = 200000000

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

export function getEventsOfTypeAsHeatmapDatum(state: IStoreState): Array<HeatmapData> {
  const displayWindowSeconds = 30
  const match = state.matches.matches[state.matches.current],
    eventType = state.matches.viewState.heatmapEvent,
    maxTick = state.matches.viewState.elapsed



  if (match && match.telemetry && match.telemetry.length > 0) {
    let filtered = match.telemetry.filter(m => m._T === eventType)

    if (maxTick && match.data) {
      filtered = filtered.filter((e: TelemetryEvent<TelemetryEventType>) => (
        match.data.attributes.createdAtMilliseconds + maxTick > e.time &&
        match.data.attributes.createdAtMilliseconds + maxTick - (1000 * displayWindowSeconds) < e.time
      ))
    }

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
