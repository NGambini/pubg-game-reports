import Region from './regions'

export default interface PlayerInfoState {
  authToken: string,
  playerName: string,
  regionId: Region
}

export const initialState: PlayerInfoState = {
  authToken: '',
  playerName: '',
  regionId: Region["pc-eu"]
}
