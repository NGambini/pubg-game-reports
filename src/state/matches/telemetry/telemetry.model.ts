import TelemetryEventType from './telemetry.enum'

export default interface TelemetryEvent {
  _V: number, // event version
  _D: Date,
  _T: TelemetryEventType
}
