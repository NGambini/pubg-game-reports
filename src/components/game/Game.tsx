import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Match from '../../state/matches/match.model'
import * as MatchesActions from '../../state/matches/matches.actions'

import IStoreState from '../../state/IStoreState'
// import store from './state/store'

type Props = {
  getMatchDetailed: (gameId: string) => void
}

type State = {
}

export class GameInternal extends React.Component<Props & StateFromProps, State> {
  public readonly props: Props & StateFromProps
}

interface DispatchFromProps {
  getMatchDetailed: (gameId: string) => void
}

interface StateFromProps {
  matches: Array<Match>
}

const mapStateToProps = (state: IStoreState) => ({
  matches: state.matches.matches,
  isLoading: state.matches.isLoading
})

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchFromProps => ({
  getMatchDetailed: (gameId: string) => {
    dispatch(MatchesActions.getMatchDetailed(gameId))
  }
})

export default connect<StateFromProps, DispatchFromProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(GameInternal)
