import { Dispatch } from 'redux';
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ThunkAction } from 'redux-thunk'


// import Region from '../playerInfo/regions'
import IStoreState from '../IStoreState'
import { ActionCreator } from 'redux'

export enum MatchesActionKeys {
  GET_PLAYER_MATCHES = 'GET_PLAYER_MATCHES',
  GET_PLAYER_MATCHES_SUCCESS = 'GET_PLAYER_MATCHES_SUCCESS',
  GET_MATCH_DETAILED = 'GET_MATCH_DETAILED',
  GET_MATCH_DETAILED_SUCCESS = 'GET_MATCH_DETAILED_SUCCESS',
  SET_ACTIVE_MATCH = 'SET_ACTIVE_MATCH'
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

export interface GetMatchDetailedAction {
  readonly type: MatchesActionKeys.GET_MATCH_DETAILED
  readonly payload: {
    request: AxiosRequestConfig
  }
}

export interface GetMatchDetailedSuccessAction {
  readonly type: MatchesActionKeys.GET_MATCH_DETAILED_SUCCESS
  readonly payload: {
    request: AxiosRequestConfig
  }
}

export interface SetActiveMatchAction {
  readonly type: MatchesActionKeys.SET_ACTIVE_MATCH,
  readonly payload: {
    matchId: string
  }
}

export const getPlayerMatches: ActionCreator<ThunkAction<void, IStoreState, {}>> = () => {
  return (dispatch: Dispatch<IStoreState>, getState: () => IStoreState, extraArg: {}) => {
    const shard = getState().playerInfo.regionId
    const playerName = getState().playerInfo.playerName
    dispatch({
      type: MatchesActionKeys.GET_PLAYER_MATCHES,
      payload: {
        request: {
          method: 'GET',
          url: `/shards/${shard}/players?filter[playerNames]=${playerName}`
        } as AxiosRequestConfig
      }
    })
  }
}

export const getMatchDetailed: ActionCreator<ThunkAction<void, IStoreState, {}>> = (matchId: string) => {
  return (dispatch: Dispatch<IStoreState>, getState: () => IStoreState, extraArg: {}) => {
    const shard = getState().playerInfo.regionId

    dispatch({
      type: MatchesActionKeys.GET_MATCH_DETAILED,
      payload: {
        request: {
          method: 'GET',
          url: `/shards/${shard}/matches/${matchId}`
        } as AxiosRequestConfig
      }
    })
  }
}

export function setActiveMatch(matchId: string): SetActiveMatchAction {
  return {
    type: MatchesActionKeys.SET_ACTIVE_MATCH,
    payload: {
      matchId: matchId
    }
  }
}

type MatchesActions = GetPlayerMatchesAction |
                      GetPlayerMatchesSuccessAction |
                      GetMatchDetailedAction |
                      GetMatchDetailedSuccessAction | 
                      SetActiveMatchAction

export default MatchesActions
