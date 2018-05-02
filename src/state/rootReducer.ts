import { combineReducers } from 'redux'
import IStoreState from './IStoreState'
import playerInfoReducer from './playerInfo/playerinfo.reducer'
import matchesReducer from './matches/matches.reducer'

const rootReducer = combineReducers<IStoreState>({
  playerInfo: playerInfoReducer,
  matches: matchesReducer
})

export default rootReducer
