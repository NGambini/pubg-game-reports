export enum GameMaps {
  Erangel = 'Erangel',
  Miramar = 'Miramar',
  Unknown = 'Unknown'
}

export const gameMapFromString = (input: string) => {
  switch (input) {
    case 'Erangel_Main':
      return GameMaps.Erangel
    case 'Desert_Main':
      return GameMaps.Miramar
    default:
      return GameMaps.Unknown
  }
}
