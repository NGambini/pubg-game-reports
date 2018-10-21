export enum GameMaps {
  Erangel = 'Erangel',
  Miramar = 'Miramar',
  Sanhok = 'Sanhok',
  Unknown = 'Unknown'
}

export const gameMapFromString = (input: string) => {
  switch (input) {
    case 'Erangel_Main':
      return GameMaps.Erangel
    case 'Desert_Main':
      return GameMaps.Miramar
    case 'Savage_Main':
      return GameMaps.Sanhok
    default:
      return GameMaps.Unknown
  }
}
