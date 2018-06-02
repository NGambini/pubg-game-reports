import TelemetryEventType from './telemetryEventType'

export class TelemetryEvent<T extends TelemetryEventType> {
  _V: number // event version
  _D: string
  _T: T
  time: number
}
