import Region from './regions'

export enum PlayerInfoActionKeys {
  SET_PLAYER_INFO = 'SET_PLAYER_INFO'
}

export interface SetPlayerInfoAction {
  readonly type: PlayerInfoActionKeys.SET_PLAYER_INFO
  readonly payload: {
    authToken: string,
    playerName: string,
    regionId: Region
  }
}

export function setPlayerInfo(authToken: string, playerName: string, regionId: Region): SetPlayerInfoAction {
  return {
    type: PlayerInfoActionKeys.SET_PLAYER_INFO,
    payload: {
      authToken: authToken,
      playerName: playerName,
      regionId: regionId
    }
  }
}

type PlayerInfoActions = SetPlayerInfoAction

export default PlayerInfoActions
