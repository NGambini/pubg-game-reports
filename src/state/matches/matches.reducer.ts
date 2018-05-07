import MatchesActions, { MatchesActionKeys } from './matches.actions'
import MatchesState, { initialState } from './matches.state'
import Match from './match.model'

// we need to ensure the match id can be accessed through instance.id (instead of instance.data.id)
// so our code works either after GET_ALL_MATCHES OR GET_DETAILED_MATCH
function matchFromObject(data: object): Match {
  const ret = data as Match

  ret.id = ret.data.id
  return ret
}

export default function matchesReducer(state: MatchesState = initialState, action: MatchesActions): MatchesState {
  switch (action.type) {
    case MatchesActionKeys.GET_PLAYER_MATCHES:
      return {...state, isLoading: true}
    case MatchesActionKeys.GET_PLAYER_MATCHES_SUCCESS:
      const matches = action.payload.data.data[0].relationships.matches.data
      return {...state, matches: matches, isLoading: false}
    case MatchesActionKeys.SET_CURRENT_MATCH:
      return {...state, current: action.payload.matchId}
    case MatchesActionKeys.GET_MATCH_DETAILED_SUCCESS:
      return {...state, matches: state.matches.concat(matchFromObject(action.payload.data))}
    default:
      return state
  }
}
