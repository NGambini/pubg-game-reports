import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Region from 'state/playerInfo/regions'
import Match from 'state/matches/match.model'

import * as MatchesActions from 'state/matches/matches.actions'

import IStoreState from 'state/IStoreState'

import GameTable from './GameTable'
import ChooseGameForm from './ChooseGameForm'
import { Card } from '@blueprintjs/core';

const initialState = {
}

type State = Readonly<typeof initialState>

export class GameSelection extends React.Component<DispatchToProps & StateToProps, State> {
  readonly state: State = initialState

  constructor(props: DispatchToProps & StateToProps, state: State) {
    super(props, state)
  }

  public render() {
    let regionShards = []

    for (let region in Region) {
      if (isNaN(Number(region))) {
        regionShards.push(<option key={region} value={region}>{region}</option>)
      }
    }

    return (
      <div>
        <Card>
          <ChooseGameForm />
        </Card>
        <br />
        <Card>
          <GameTable matchesArray={this.props.matches} />
        </Card>
      </div>
    )
  }
}

interface StateToProps {
  matches: Array<Match>,
  isLoading: boolean
}

interface DispatchToProps {
  getMatchesDetailed: () => void
}

const mapStateToProps = (state: IStoreState) => ({
  matches: Object.keys(state.matches.matches).map((k) => state.matches.matches[k]),
  isLoading: state.matches.isLoading
})

const mapDispatchToProps = (dispatch: Dispatch<IStoreState>): DispatchToProps => ({
  getMatchesDetailed: () => {
    dispatch(MatchesActions.getPlayerMatchesDetailed())
  }
})

export default connect<StateToProps, DispatchToProps, void>(
  mapStateToProps,
  mapDispatchToProps
)(GameSelection)

