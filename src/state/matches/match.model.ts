import Region from '../playerInfo/regions'
import { TelemetryEventType, TelemetryEvent } from './telemetry/events'
import { Circle, PlanePath } from 'state/matches/telemetry/computedObjects'

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
  winPlace: number,
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
  type: 'participant' | 'roster' | 'telemetry',
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
      createdAt: string,
      createdAtMilliseconds: number,
      mapName: string, // todo map enum
      duration: number,
      gameMode: string
    },
    relationships: {
      rosters: any,
      assets: {
        data: Array<{ type: 'asset', id: string }>
      }
    }
  }
  included: Array<MatchIncluded>, //all rosters and players without nesting
  telemetry: Array<TelemetryEvent<TelemetryEventType>>, // all game events
  computed: {
    safeZones: Array<Circle>,
    redZones: Array<Circle>,
    planePath: PlanePath
  }
}
