import TelemetryEventType from './telemetryEventType'

export class TelemetryEvent<T extends TelemetryEventType> {
  _V: number // event version
  _D: Date
  _T: T
}
