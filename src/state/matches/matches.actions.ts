import { Dispatch } from 'redux';
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { ThunkAction } from 'redux-thunk'

import Match from './match.model'
import { getTelemetryUrl } from 'state/matches/match.selectors'
import { MatchViewState } from 'state/matches/matches.state'

import IStoreState from '../IStoreState'
import { ActionCreator } from 'redux'

export enum MatchesActionKeys {
  // FETCH actions
  GET_PLAYER_MATCHES = 'GET_PLAYER_MATCHES',
  GET_PLAYER_MATCHES_SUCCESS = 'GET_PLAYER_MATCHES_SUCCESS',
  GET_MATCH_DETAILED = 'GET_MATCH_DETAILED',
  GET_MATCH_DETAILED_SUCCESS = 'GET_MATCH_DETAILED_SUCCESS',
  GET_MATCH_TELEMETRY = 'GET_MATCH_TELEMETRY',
  GET_MATCH_TELEMETRY_SUCCESS = 'GET_MATCH_TELEMETRY_SUCCESS',
  GET_PLAYER_MATCHES_DETAILED = 'GET_PLAYER_MATCHES_DETAILED',
  // VIEW actions
  SET_VIEW_STATE = 'SET_VIEW_STATE',
  SET_CURRENT_MATCH = 'SET_CURRENT_MATCH',
  // CALC actions
  CALC_SAFE_ZONES = 'CALC_SAFE_ZONES'
}

export interface SetViewStateAction {
  readonly type: MatchesActionKeys.SET_VIEW_STATE,
  readonly payload: Partial<MatchViewState>
}

export interface GetPlayerMatchesDetailedAction {
  readonly type: MatchesActionKeys.GET_PLAYER_MATCHES_DETAILED,
}

export interface CalcSafeZonesAction {
  readonly type: MatchesActionKeys.CALC_SAFE_ZONES,
  readonly payload: {
    matchId?: string // none passed will calc current
  }
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
  readonly payload: AxiosResponse
}

export interface GetMatchTelemetryAction {
  readonly type: MatchesActionKeys.GET_MATCH_TELEMETRY
  readonly payload: {
    request: AxiosRequestConfig
  }
}

export interface GetMatchTelemetrySuccessAction {
  readonly type: MatchesActionKeys.GET_MATCH_TELEMETRY_SUCCESS
  readonly payload: AxiosResponse
}

export interface SetActiveMatchAction {
  readonly type: MatchesActionKeys.SET_CURRENT_MATCH,
  readonly payload: {
    matchId: string
  }
}

export function setViewState(data: Partial<MatchViewState>): SetViewStateAction {
  return {
    type: MatchesActionKeys.SET_VIEW_STATE,
    payload: data
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
          baseURL: 'https://api.playbattlegrounds.com/',
          url: `/shards/${shard}/players?filter[playerNames]=${playerName}`,
        }
      }
    } as GetPlayerMatchesAction)
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
          baseURL: 'https://api.playbattlegrounds.com/',
          url: `/shards/${shard}/matches/${matchId}`
        } as AxiosRequestConfig
      }
    })
  }
}

export const getMatchTelemetry: ActionCreator<ThunkAction<void, IStoreState, {}>> = (match: Match) => {
  return (dispatch: Dispatch<IStoreState>, getState: () => IStoreState, extraArg: {}) => {
    const telemetryUrl = getTelemetryUrl(match)

    // TODO raise error if no url, match is null, etc
    dispatch({
      type: MatchesActionKeys.GET_MATCH_TELEMETRY,
      payload: {
        request: {
          method: 'GET',
          url: telemetryUrl,
          params: {
            matchId: match.id
          }
        } as AxiosRequestConfig
      }
    })
  }
}

export const getPlayerMatchesDetailed: ActionCreator<ThunkAction<void, IStoreState, {}>> = () => {
  return (dispatch: Dispatch<IStoreState>, getState: () => IStoreState, extraArg: {}) => {
    const shard = getState().playerInfo.regionId
    const gameIds = Object.keys(getState().matches.matches) //gets the ids of dictionary
    .filter((k) => !getState().matches.matches[k].data) // avoid already fetched matches

    for (let i = 0; i < gameIds.length; i++) {
      dispatch({
        type: MatchesActionKeys.GET_MATCH_DETAILED,
        payload: {
          request: {
            method: 'GET',
            baseURL: 'https://api.playbattlegrounds.com/',
            url: `/shards/${shard}/matches/${gameIds[i]}`
          } as AxiosRequestConfig
        }
      })
    }
  }
}

export function calcSafeZones(matchId: string = null): CalcSafeZonesAction {
  return {
    type: MatchesActionKeys.CALC_SAFE_ZONES,
    payload: {
      matchId: matchId
    }
  }
}

export function setCurrentMatch(matchId: string): SetActiveMatchAction {
  return {
    type: MatchesActionKeys.SET_CURRENT_MATCH,
    payload: {
      matchId: matchId
    }
  }
}

type MatchesActions = GetPlayerMatchesAction |
  GetPlayerMatchesSuccessAction |
  GetMatchDetailedAction |
  GetMatchDetailedSuccessAction |
  SetActiveMatchAction |
  GetMatchTelemetryAction |
  GetMatchTelemetrySuccessAction |
  CalcSafeZonesAction |
  GetPlayerMatchesDetailedAction |
  SetViewStateAction

export default MatchesActions
