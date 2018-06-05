import IStoreState from '../../IStoreState'
import { MatchIncluded, ParticipantAttributes } from '../match.model'

export const getParticipantStatistics = (state: IStoreState) => {
  const match = state.matches.matches[state.matches.current]

  const player = match && match.included.find((i: MatchIncluded) => i.type === 'participant' &&
    (i.attributes as ParticipantAttributes).stats.name === state.view.currentPlayer)

 
  return player ? (player.attributes as ParticipantAttributes).stats : null
}
