import MatchesActions, { MatchesActionKeys } from './matches.actions'
import MatchesState, { initialState } from './matches.state'

export default function matchesReducer(state: MatchesState = initialState, action: MatchesActions): MatchesState {
  switch (action.type) {
    case MatchesActionKeys.GET_PLAYER_MATCHES:
      return {...state, isLoading: true}
    case MatchesActionKeys.GET_PLAYER_MATCHES_SUCCESS:
      const matches = action.payload.data.data[0].relationships.matches.data
      return {...state, matches: matches, isLoading: false}
    case MatchesActionKeys.GET_MATCH_DETAILED_SUCCESS:
      return state
    default:
      return state
  }
}
