import { Circle } from 'state/matches/telemetry/computedObjects'
import { TelemetryEventType, LogGameStatePeriodic } from 'state/matches/telemetry/events'
import { getEventsOfType } from 'state/matches/match.selectors'
import IStoreState from '../../../IStoreState'


export function getBlueZone(state: IStoreState): Circle {
  const match = state.matches.matches[state.matches.current]
  const elapsed = state.matches.viewState.elapsed

  const gStateEvents = getEventsOfType(match, TelemetryEventType.LogGameStatePeriodic) as Array<LogGameStatePeriodic>

  if (gStateEvents.length === 0) { return null }

  const event = gStateEvents.filter((e: LogGameStatePeriodic) => {
    return elapsed > e.time && elapsed - 10000 < e.time
  })
  .sort((a, b) => a.time - b.time)[0]

  return event ? {
    location: event.gameState.safetyZonePosition,
    radius: event.gameState.safetyZoneRadius,
  } : null
}
