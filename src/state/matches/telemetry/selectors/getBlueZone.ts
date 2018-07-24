import { Circle } from 'state/matches/telemetry/computedObjects'
import { TelemetryEventType, LogGameStatePeriodic } from 'state/matches/telemetry/events'
import { getEventsOfType } from 'state/matches/match.selectors'
import IStoreState from '../../../IStoreState'


export function getBlueZone(state: IStoreState): Circle {
  const match = state.matches.matches[state.matches.current]
  const elapsed = state.matches.viewState.elapsed

  if (!match) { return null }

  const gStateEvents = getEventsOfType(match.telemetry, TelemetryEventType.LogGameStatePeriodic) as Array<LogGameStatePeriodic>
  if (gStateEvents.length === 0) { return null }

  const event = gStateEvents
    .filter((e: LogGameStatePeriodic) => {
      return elapsed > e.time
    })
    .sort((a, b) => b.time - a.time)[0]

  // console.log(elapsed)

  return event ? {
    location: event.gameState.safetyZonePosition,
    radius: event.gameState.safetyZoneRadius,
  } : null
}
