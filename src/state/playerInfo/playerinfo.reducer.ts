import PlayerInfoActions, { PlayerInfoActionKeys } from './playerinfo.actions'
import PlayerInfoState, { initialState } from './playerinfo.state'

export default function playerInfoReducer(state = initialState, action: PlayerInfoActions): PlayerInfoState {
  switch (action.type) {
    case PlayerInfoActionKeys.SET_PLAYER_INFO:
      return { ...action.payload }
  }
}
