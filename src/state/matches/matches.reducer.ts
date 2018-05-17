import update from 'immutability-helper'

import MatchesActions, { MatchesActionKeys } from './matches.actions'
import MatchesState, { initialState } from './matches.state'
import Match from './match.model'
import { getSafeZones } from './match.selectors'

// we need to ensure the match id can be accessed through instance.id (instead of instance.data.id)
// so our code works either after GET_ALL_MATCHES OR GET_DETAILED_MATCH
function matchFromObject(data: object): Match {
  const ret = data as Match
  ret.id = ret.data.id

  return ret
}

export default function matchesReducer(state: MatchesState = initialState, action: MatchesActions): MatchesState {
  console.log("action: ", action)
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
      const match = matchFromObject(action.payload.data)
      return update(state, {
        matches: {
          [match.id]: { $set: match }
        }
      })
    case MatchesActionKeys.GET_MATCH_TELEMETRY_SUCCESS:
      return update(state, {
        matches: {
          [action.payload.config.params['matchId']]: {
            telemetry: { $set: action.payload.data },
            computed: { $set: {}} // why do we need this ? see https://github.com/kolodny/immutability-helper/issues/16
          }
        }
      })
    case MatchesActionKeys.CALC_SAFE_ZONES:
      return update(state, {
        matches: {
          [action.payload.matchId]: {
            computed: {
              safeZones: { $set: getSafeZones(state.matches[action.payload.matchId]) }
            }
          }
        }
      })
    default:
      return state
  }
}
