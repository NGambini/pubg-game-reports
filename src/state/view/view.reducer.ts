import ViewActions, { ViewActionKeys } from './view.actions'
import PlayerInfoState, { initialState } from './view.state'

export default function viewReducer(state: PlayerInfoState = initialState, action: ViewActions): PlayerInfoState {
  switch (action.type) {
    case ViewActionKeys.SET_CURRENT_PLAYER:
      return { ...state, currentPlayer: action.payload.player }
    default:
      return state
  }
}
