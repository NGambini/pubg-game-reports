import update from 'immutability-helper'

import MatchesActions, { MatchesActionKeys } from './matches.actions'
import MatchesState, { initialState } from './matches.state'
import Match from './match.model'
import { TelemetryEvent, TelemetryEventType, LogGameStatePeriodic } from 'state/matches/telemetry/events'
import { getEventsOfType } from 'state/matches/match.selectors'

// we need to ensure the match id can be accessed through instance.id (instead of instance.data.id)
// so our code works either after GET_ALL_MATCHES OR GET_DETAILED_MATCH
function matchFromJson(data: object): Match {
  const ret = data as Match

  ret.id = ret.data.id
  ret.data.attributes.createdAtMilliseconds = Date.parse(ret.data.attributes.createdAt)


  return ret
}

function interpolateBlueZones(telemetry: Array<TelemetryEvent<TelemetryEventType>>): Array<TelemetryEvent<TelemetryEventType>> {
  // get two occurences of gameState (10 seconds delta)
  // creates additional data with relative radius (if different)
  const gStateEvents = getEventsOfType(telemetry, TelemetryEventType.LogGameStatePeriodic) as Array<LogGameStatePeriodic>
  const eventsToAdd: Array<TelemetryEvent<TelemetryEventType>> = []

  // sort by order
  gStateEvents.sort((a, b) => a.time - b.time)
  console.log('sorted: ', gStateEvents.map(e => e.time + ' ' + e._T))

  for (var i = 0 ; i < gStateEvents.length ; i = i + 1 ) {
    const leftEvent = gStateEvents[i]
    const rightEvent = gStateEvents[i + 1]
    const nbToFill = 5

    if (leftEvent && rightEvent) {
      const timeDiff = rightEvent.time - leftEvent.time
      // console.log('left time :', leftEvent.time, 'right time : ', rightEvent.time)

      // if ticks are not of same radius, interpolate filler data
      if (leftEvent.gameState.safetyZoneRadius !== rightEvent.gameState.safetyZoneRadius) {
        console.log('left event position : ', leftEvent.gameState.safetyZonePosition, ' radius ', leftEvent.gameState.safetyZoneRadius)
        for (var j = 1 ; j <= nbToFill ; j++) {
          const newEvent = leftEvent
          // les positions et radii ne sont pas dans l'ordre
          newEvent.gameState.safetyZonePosition.x = leftEvent.gameState.safetyZonePosition.x +
            (leftEvent.gameState.safetyZonePosition.x / rightEvent.gameState.safetyZonePosition.x) * (j / nbToFill)
          newEvent.gameState.safetyZonePosition.y = leftEvent.gameState.safetyZonePosition.y +
            (leftEvent.gameState.safetyZonePosition.y / rightEvent.gameState.safetyZonePosition.y) * (j / nbToFill)
          newEvent.gameState.safetyZoneRadius = rightEvent.gameState.safetyZoneRadius +
            (rightEvent.gameState.safetyZoneRadius / leftEvent.gameState.safetyZoneRadius) * (j / nbToFill)
          newEvent.time = newEvent.time + timeDiff * (j / nbToFill)
          console.log('create event position : ', newEvent.gameState.safetyZonePosition,  ' radius ', newEvent.gameState.safetyZoneRadius)


          // eventsToAdd.push(newEvent)
        }
        console.log('right event position : ', rightEvent.gameState.safetyZonePosition,  ' radius ', rightEvent.gameState.safetyZoneRadius)

        console.log('---end loop')

      }
    }
  }

  console.log('adding these gamestate events : ', eventsToAdd)
  return telemetry.concat(eventsToAdd)
}

function telemetryFromJson(data: object, match: Match): Array<TelemetryEvent<TelemetryEventType>> {
  let ret = data as Array<TelemetryEvent<TelemetryEventType>>

  // we store events time as milliseconds instead of date for faster computations
  ret = ret.map((e: TelemetryEvent<TelemetryEventType>) => {
    return ({...e, time: Date.parse(e._D) - match.data.attributes.createdAtMilliseconds})
  })

  // we interpolate some extra data for better rendering
  // TODO better chaining of those
  return interpolateBlueZones(ret)
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
      const match = matchFromJson(action.payload.data)
      return update(state, {
        matches: {
          [match.id]: { $set: match }
        }
      })

    case MatchesActionKeys.GET_MATCH_TELEMETRY_SUCCESS:
      return update(state, {
        matches: {
          [action.payload.config.params['matchId']]: {
            telemetry: { $set: telemetryFromJson(action.payload.data, state.matches[state.current]) },
            computed: { $set: {}} // why do we need this ? see https://github.com/kolodny/immutability-helper/issues/16
          }
        }
      })

    case MatchesActionKeys.SET_VIEW_STATE:
      return update(state, {
        viewState: { $merge: action.payload }
      })

    default:
      return state
  }
}
