import Match, { TelemetryAttributes } from 'state/matches/match.model'
import { createSelector } from 'reselect'

import {
  TelemetryEventType,
  LogPlayerPosition,
  TelemetryEvent,
  LogPlayerKill,
  HeatmapData,
  HeatmapTranslator,
  HeatmapEvents
} from 'state/matches/telemetry/events'
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

const getCurrentMatch = (state: IStoreState) => state.matches.matches[state.matches.current]

const getHeatMapEventType = (state: IStoreState) => state.matches.viewState.heatmapEvent

const getMatchElapsed = (state: IStoreState) => state.matches.viewState.elapsed



export const getEventsOfTypeAsHeatmapDatum = createSelector(
  [getCurrentMatch, getHeatMapEventType, getMatchElapsed],
  (match: Match, eventType: HeatmapEvents, maxTick: number) => {
    const displayWindowSeconds = 10

    if (match && match.telemetry && match.telemetry.length > 0) {
      let filtered = match.telemetry.filter(m => m._T === eventType)
  
      if (maxTick && match.data) {
        filtered = filtered.filter((e: TelemetryEvent<TelemetryEventType>) => (
          maxTick > e.time &&
          maxTick - (1000 * displayWindowSeconds) < e.time
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
)

export function getEventsOfTypeAsHeatmapDatum2(state: IStoreState): Array<HeatmapData> {
  const displayWindowSeconds = 30
  const match = state.matches.matches[state.matches.current],
    eventType = state.matches.viewState.heatmapEvent,
    maxTick = state.matches.viewState.elapsed

  if (match && match.telemetry && match.telemetry.length > 0) {
    let filtered = match.telemetry.filter(m => m._T === eventType)

    if (maxTick && match.data) {
      filtered = filtered.filter((e: TelemetryEvent<TelemetryEventType>) => (
        maxTick > e.time &&
        maxTick - (1000 * displayWindowSeconds) < e.time
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
