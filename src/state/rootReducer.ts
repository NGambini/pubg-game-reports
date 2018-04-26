import { combineReducers } from "redux";
import IStoreState from './IStoreState';
import playerInfoReducer from './playerInfo/playerinfo.reducer';

const rootReducer = combineReducers<IStoreState>({
  playerInfo: playerInfoReducer
})

export default rootReducer
