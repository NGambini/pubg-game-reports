import { AxiosRequestConfig, AxiosResponse } from 'axios'

import Region from '../playerInfo/regions'

export enum MatchesActionKeys {
  GET_PLAYER_MATCHES = 'GET_PLAYER_MATCHES',
  GET_PLAYER_MATCHES_SUCCESS = 'GET_PLAYER_MATCHES_SUCCESS'
}

export interface GetPlayerMatchesAction {
  readonly type: MatchesActionKeys.GET_PLAYER_MATCHES
  readonly payload: {
    request: AxiosRequestConfig
  }
}

export interface GetPlayerMatchesSuccessAction {
  readonly type: MatchesActionKeys.GET_PLAYER_MATCHES_SUCCESS
  readonly payload: AxiosResponse
}

export function getPlayerMatches(authToken: string, playerName: string, regionId: Region): GetPlayerMatchesAction {
  return {
    type: MatchesActionKeys.GET_PLAYER_MATCHES,
    payload: {
      request: {
        method: 'GET',
        url: `/shards/${regionId}/players?filter[playerNames]=${playerName}`
      } as AxiosRequestConfig
    }
  }
}

type MatchesActions = GetPlayerMatchesAction | GetPlayerMatchesSuccessAction

export default MatchesActions
