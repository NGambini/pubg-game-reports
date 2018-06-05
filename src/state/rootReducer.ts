import { combineReducers } from 'redux'
import IStoreState from './IStoreState'
import playerInfoReducer from './playerInfo/playerinfo.reducer'
import matchesReducer from './matches/matches.reducer'
import viewReducer from './view/view.reducer'

const rootReducer = combineReducers<IStoreState>({
  playerInfo: playerInfoReducer,
  matches: matchesReducer,
  view: viewReducer
})

export default rootReducer
