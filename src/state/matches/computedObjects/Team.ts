export type TeamType = 'SOLO' | 'DUO' | 'SQUAD'

export interface TeamPlayer {
  id: string,
  name: string
}

export interface Team {
  type: TeamType,
  players: Array<TeamPlayer>
}
