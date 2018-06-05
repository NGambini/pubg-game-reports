import PlayerInfoState from './playerInfo/playerinfo.state'
import MatchesState from './matches/matches.state'
import ViewState from './view/view.state'

export default interface IStoreState {
  playerInfo: PlayerInfoState,
  matches: MatchesState,
  view: ViewState
}
