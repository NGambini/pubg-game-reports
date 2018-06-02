import { Circle, RedZone } from 'state/matches/telemetry/computedObjects'
import { TelemetryEventType, LogGameStatePeriodic } from 'state/matches/telemetry/events'
import { getEventsOfType } from 'state/matches/match.selectors'
import IStoreState from '../../../IStoreState'


export function getRedZones(state: IStoreState): Array<Circle> {
  const match = state.matches.matches[state.matches.current]
  const elapsed = state.matches.viewState.elapsed

  const gStateEvents = getEventsOfType(match, TelemetryEventType.LogGameStatePeriodic) as Array<LogGameStatePeriodic>
  const ret = new Array<RedZone>()

  if (gStateEvents.length === 0) { return null }

  gStateEvents
    .filter((e: LogGameStatePeriodic) => e.gameState.redZonePosition)
    .forEach((e: LogGameStatePeriodic) => {
      const index = ret.findIndex((r: RedZone) =>
        r.circle.location.x === e.gameState.redZonePosition.x &&
        r.circle.location.y === e.gameState.redZonePosition.y)

      if (index != -1) {
        ret[index].endTick = e.time - match.data.attributes.createdAtMilliseconds
      } else {
        ret.push({
          startTick: e.time - match.data.attributes.createdAtMilliseconds,
          endTick: e.time - match.data.attributes.createdAtMilliseconds,
          circle: {
            location: e.gameState.redZonePosition,
            radius: e.gameState.redZoneRadius
          }
        })
      }
    })

  return ret.filter((rz: RedZone) => {
    console.log('rz.startTick', rz.startTick)
    console.log('rz.endTick', rz.endTick)
    console.log('elapsed', elapsed)

    return rz.startTick < elapsed && rz.endTick > elapsed
  }).map((rz: RedZone) => rz.circle)
}
