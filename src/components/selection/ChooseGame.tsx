import * as React from 'react'
import { Dispatch } from 'redux'
import { connect } from 'react-redux'

import Region from 'state/playerInfo/regions'
import Match from 'state/matches/match.model'

import * as MatchesActions from 'state/matches/matches.actions'

import IStoreState from 'state/IStoreState'

import GameTable from './gameTable/GameTable'
import ChooseGameForm from 'components/selection/form/ChooseGameForm'
import { Card } from '@blueprintjs/core'

import * as styles from './ChooseGame.scss'

const initialState = {
}

type State = Readonly<typeof initialState>

type Props = DispatchToProps & StateToProps

export class ChooseGame extends React.Component<Props, State> {
  readonly state: State = initialState

  constructor(props: Props, state: State) {
    super(props, state)
  }

  public componentDidUpdate(prevProps: Props, prevState: State) {
    // when new matches ids appear we must fetch the detailed object
    if (prevProps.matches.length != this.props.matches.length) {
      this.props.getMatchesDetailed()
    }
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
        <Card className={styles.cardForm}>
          <ChooseGameForm />
        </Card>
        <br />
        {this.props.matches.length > 0 ?
          <Card className={styles.cardTable}>
            <GameTable matchesArray={this.props.matches} />
          </Card> : null}
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
)(ChooseGame)
