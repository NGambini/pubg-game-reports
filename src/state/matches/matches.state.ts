import Match from './match.model'

export default interface MatchesState {
  isLoading: boolean,
  matches: Array<Match>
}

export const initialState: MatchesState = {
  isLoading: false,
  matches: []
}

