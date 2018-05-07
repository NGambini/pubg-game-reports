import Match from './match.model'

export default interface MatchesState {
  isLoading: boolean,
  matches: Array<Match>,
  current: string //selected match id
}

export const initialState: MatchesState = {
  isLoading: false,
  matches: [],
  current: null
}
