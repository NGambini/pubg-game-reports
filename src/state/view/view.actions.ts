export enum ViewActionKeys {
  SET_CURRENT_PLAYER = 'SET_CURRENT_PLAYER'
}

export interface SetCurrentPlayerAction {
  readonly type: ViewActionKeys.SET_CURRENT_PLAYER
  readonly payload: {
    player: string
  }
}

type ViewActions = SetCurrentPlayerAction

export default ViewActions
