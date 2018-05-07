import Region from '../playerInfo/regions'
import TelemetryEvent from './telemetry/telemetry.model'

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
      data: Array<{id: string, type: string}>
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
        data: Array<{type: 'asset', id: string}>
      }
    } // will be used for understanding relations between players (teams)
  }
  included: Array<MatchIncluded>, //all rosters and players without nesting
  telemetry: Array<TelemetryEvent> // all game events
}

export function getTelemetryUrl(match: Match): string {
  const telemetryId = match && match.data.relationships.assets.data && match.data.relationships.assets.data[0].id
 
  return telemetryId ? (match.included.find(i => i.id === telemetryId).attributes as TelemetryAttributes).URL : null
}
