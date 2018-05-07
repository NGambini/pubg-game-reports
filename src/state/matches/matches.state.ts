import Match from './match.model'

export default interface MatchesState {
  isLoading: boolean,
  matches: { [id: string]: Match },
  current: string //selected match id
}

export const initialState: MatchesState = {
  isLoading: false,
  matches: {},
  current: null
}
