import IStoreState from '../../IStoreState'
import Match, { MatchIncluded, ParticipantAttributes } from '../match.model'
import { Team } from 'state/matches/computedObjects/Team'

// TODO handle one-two man squad
const teamTypeFromTeamLength = (length: number) => {
  switch (length) {
    case 1:
      return 'SOLO'
    case 2:
      return 'DUO'
    case 3:
    case 4:
      return 'SQUAD'
    default:
      return 'SOLO'
  }
}

export const getTeamPlayerById = (match: Match, id: string) => {
  const player = match && match.included.find((i: MatchIncluded) => i.type === 'participant' && i.id === id)

  return player ? {
    id: player.id,
    name: (player.attributes as ParticipantAttributes).stats.name
  } : null
}

const teamPlayersFromIds = (match: Match, ids: Array<string>) => {
  return ids.map((id: string) => getTeamPlayerById(match, id))
}

export const getParticipantTeam = (state: IStoreState) => {
  const match = state.matches.matches[state.matches.current]

  const player = match && match.included.find((i: MatchIncluded) => i.type === 'participant' &&
    (i.attributes as ParticipantAttributes).stats.name === state.view.currentPlayer)

  if (!player) { return null }

  const team = match && match.included.find((i: MatchIncluded) => i.type === 'roster' &&
    i.relationships.participants.data.findIndex(d => d.id == player.id) != -1)

  return team && team.relationships ? {
    type: teamTypeFromTeamLength(team.relationships.participants.data.length),
    players: teamPlayersFromIds(match, team.relationships.participants.data.map(d => d.id))
  } as Team : null
}
