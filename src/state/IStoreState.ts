import PlayerInfoState from './playerInfo/playerinfo.state'
import MatchesState from './matches/matches.state'

export default interface IStoreState {
  playerInfo: PlayerInfoState,
  matches: MatchesState
}
