// In addition, there is a difference between the key casing for pc and xbox telemetry.
// pc telemetry will have keys starting with a lowercase character,
// while xbox telemetry will have the same keys but starting with an uppercase character.

export enum TelemetryEvent {
  LogPlayerLogin = 'LogPlayerLogin',
  LogPlayerCreate = 'LogPlayerCreate',
  LogPlayerPosition = 'LogPlayerPosition',
  LogPlayerAttack = 'LogPlayerAttack',
  LogItemPickup = 'LogItemPickup',
  LogItemEquip = 'LogItemEquip',
  LogItemUnequip = 'LogItemUnequip',
  LogVehicleRide = 'LogVehicleRide',
  LogMatchDefinition = 'LogMatchDefinition',
  LogMatchStart = 'LogMatchStart',
  LogGameStatePeriodic = 'LogGameStatePeriodic',
  LogVehicleLeave = 'LogVehicleLeave',
  LogPlayerTakeDamage = 'LogPlayerTakeDamage',
  LogPlayerLogout = 'LogPlayerLogout',
  LogItemAttach = 'LogItemAttach',
  LogItemDrop = 'LogItemDrop',
  LogPlayerKill = 'LogPlayerKill',
  LogItemDetach = 'LogItemDetach',
  LogItemUse = 'LogItemUse',
  LogCarePackageSpawn = 'LogCarePackageSpawn',
  LogVehicleDestroy = 'LogVehicleDestroy',
  LogCarePackageLand = 'LogCarePackageLand',
  LogMatchEnd = 'LogMatchEnd'
}