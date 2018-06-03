import { AxiosRequestConfig, AxiosResponse } from "axios";
import { getTelemetryUrl } from 'state/matches/match.selectors'
import Match from 'state/matches/match.model'
import { MatchesActionKeys } from 'state/matches/matches.actions'
import store from 'state/store'

export const telemetryInterceptor = (response: AxiosResponse) => {
  if ((response.config as any).reduxSourceAction.type === MatchesActionKeys.GET_MATCH_DETAILED) {
    const telemetryUrl = getTelemetryUrl(response.data as Match)

    store.dispatch({
      type: MatchesActionKeys.GET_MATCH_TELEMETRY,
      payload: {
        request: {
          method: 'GET',
          url: telemetryUrl,
          params: {
            matchId: response.data.data.id
          }
        } as AxiosRequestConfig
      }
    })
  }
  return response
}