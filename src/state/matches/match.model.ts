import { Deserialize } from 'cerialize'

import Region from '../playerInfo/regions'
import TelemetryEvent, { HeatmapData, LogPlayerKill, LogPlayerPosition } from './telemetry/telemetry.model'
import TelemetryEventType from './telemetry/telemetry.enum'

export interface ParticipantStatistics {
  DBNOs: number,
  assists: number,
  boosts: number,
  damageDealt: number,
  deathType: string, //TODO enum of death types
  headshotKills: number,
  heals: number,
  killPlace: number,
  killPoints: number,
  killPointsDelta: number,
  killStreaks: number,
  kills: number,
  lastKillPoints: number,
  lastWinPoints: number,
  longestKill: number,
  mostDamage: number,
  name: string,
  playerId: string,
  revives: number,
  rideDistance: number,
  roadKills: number,
  teamKills: number,
  timeSurvived: number,
  vehicleDestroys: number,
  walkDistance: number,
  weaponsAcquired: number,
  winPlace: 85,
  winPoints: number,
  winPointsDelta: number
}

export interface ParticipantAttributes {
  stats: ParticipantStatistics,
  shardId: string
}

export interface RosterAttributes {
  stats: ParticipantStatistics,
  shardId: string
}

export interface TelemetryAttributes {
  name: string,
  createdAt: Date,
  URL: string
}

export interface MatchIncluded {
  type: string,
  id: string,
  attributes: ParticipantAttributes | RosterAttributes | TelemetryAttributes,
  relationships: {
    participants: {
      data: Array<{ id: string, type: string }>
    }
  }
}

export default interface Match {
  id: string,
  data: {
    type: string,
    id: string,
    attributes: {
      shardId: Region,
      createdAt: Date,
      mapName: string, // todo map enum
      duration: number,
      gameMode: string
    },
    relationships: {
      rosters: any,
      assets: {
        data: Array<{ type: 'asset', id: string }>
      }
    } // will be used for understanding relations between players (teams)
  }
  included: Array<MatchIncluded>, //all rosters and players without nesting
  telemetry: Array<TelemetryEvent<TelemetryEventType>> // all game events
}

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

export function getEventsOfTypeAsHeatmapDatum(match: Match, eventType: TelemetryEventType): Array<HeatmapData> {
  if (match && match.telemetry && match.telemetry.length > 0) {
    const filtered = match.telemetry.filter(m => m._T === eventType)
    switch (eventType) {
      case TelemetryEventType.LogPlayerKill:
        return filtered.map(m => Deserialize(m, LogPlayerKill).toHeatmapData())
      case TelemetryEventType.LogPlayerPosition:
        return filtered.map(m => Deserialize(m, LogPlayerPosition).toHeatmapData())
      default:
        return []
    }
  }
  return []
}
