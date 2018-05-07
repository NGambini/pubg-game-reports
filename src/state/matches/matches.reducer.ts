import update from 'immutability-helper'

import MatchesActions, { MatchesActionKeys } from './matches.actions'
import MatchesState, { initialState } from './matches.state'
import Match from './match.model'

// we need to ensure the match id can be accessed through instance.id (instead of instance.data.id)
// so our code works either after GET_ALL_MATCHES OR GET_DETAILED_MATCH
function matchFromObject(data: object): Match {
  const ret = data as Match
  console.log("in matchfrom object before", ret)
  ret.id = ret.data.id

  console.log("in matchfrom object after", ret)
  return ret
}

export default function matchesReducer(state: MatchesState = initialState, action: MatchesActions): MatchesState {
  switch (action.type) {
    case MatchesActionKeys.GET_PLAYER_MATCHES:
      return { ...state, isLoading: true }
    case MatchesActionKeys.GET_PLAYER_MATCHES_SUCCESS:
      const matchesArray: Array<Match> = action.payload.data.data[0].relationships.matches.data
      const indexedMatches = matchesArray.reduce( // this stores the matches as dictionary
        (indexed: { [id: string]: Match }, match: Match) => {
          indexed[match.id] = match
          return indexed
        }, {})

      return { ...state, matches: indexedMatches, isLoading: false }
    case MatchesActionKeys.SET_CURRENT_MATCH:
      return { ...state, current: action.payload.matchId }
    case MatchesActionKeys.GET_MATCH_DETAILED_SUCCESS:
      return update(state, {
        matches: {// TODO : conditionally set or merge depending on null check
          [action.payload.data.id]: { $merge: matchFromObject(action.payload.data) }
        }
      })
    case MatchesActionKeys.GET_MATCH_TELEMETRY_SUCCESS:
      console.log("my key is : ", action.payload.config.params['matchId'])
      return update(state, {
        matches: {
          [action.payload.config.params['matchId']]: {
            telemetry: { $set: action.payload.data }
          }
        }
      })
    default:
      return state
  }
}
