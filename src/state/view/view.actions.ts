export enum ViewActionKeys {
  SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER'
}

export interface SetCurrentPlayerAction {
  readonly type: ViewActionKeys.SET_CURRENT_PLAYER
  readonly payload: {
    player: string
  }
}

export const setCurrentPlayer = (pName: string) => ({
  type: ViewActionKeys.SET_CURRENT_PLAYER,
  payload: {
    player: pName
  }
} as SetCurrentPlayerAction)

type ViewActions = SetCurrentPlayerAction

export default ViewActions
