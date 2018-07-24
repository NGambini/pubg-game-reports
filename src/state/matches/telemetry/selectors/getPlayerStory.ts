import { PlayerStory } from 'state/matches/telemetry/computedObjects'
import { TelemetryEventType, LogPlayerPosition } from 'state/matches/telemetry/events'
import { getEventsOfType } from 'state/matches/match.selectors'
import IStoreState from '../../../IStoreState'


export function getPlayerStory(state: IStoreState): PlayerStory {
  const match = state.matches.matches[state.matches.current]
  const elapsed = state.matches.viewState.elapsed
  if (!match) { return null }

  const pPosEvents = getEventsOfType(match.telemetry, TelemetryEventType.LogPlayerPosition) as Array<LogPlayerPosition>
  if (pPosEvents.length === 0) { return null }

  return {
    points: pPosEvents
      .filter((p: LogPlayerPosition) => p.character.name === 'D2P2')
      .filter((p: LogPlayerPosition) => p.time < elapsed)
      .map((p: LogPlayerPosition) => p.character.location)
  } 
}
