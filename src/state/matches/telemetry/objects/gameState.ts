import { Location } from './location'

export interface GameState {
  elapsedTime: number,
  numAliveTeams: number,
  numJoinPlayers: number,
  numStartPlayers: number,
  numAlivePlayers: number,
  safetyZonePosition: Location,
  safetyZoneRadius: number,
  poisonGasWarningPosition: Location,
  poisonGasWarningRadius: number,
  redZonePosition: Location,
  redZoneRadius: number
}
