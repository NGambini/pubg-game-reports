import * as React from 'react'
import { connect } from 'react-redux'
import * as moment from 'moment'

import { Slider, ButtonGroup, Button } from "@blueprintjs/core"

import IStoreState from 'state/IStoreState'
import { MatchViewState } from 'state/matches/matches.state'
import Match from 'state/matches/match.model'
import * as MatchesActions from 'state/matches/matches.actions'

type State = {}

interface DispatchToProps {
  setViewState: (data: Partial<MatchViewState>) => MatchesActions.SetViewStateAction
}

interface StateToProps {
  match: Match,
  viewState: MatchViewState
}

const mapDispatchToProps: DispatchToProps = {
  setViewState: MatchesActions.setViewState
}

const mapStateToProps = (state: IStoreState) => ({
  match: state.matches.matches[state.matches.current],
  viewState: state.matches.viewState
})

type Props = DispatchToProps & StateToProps

class GameControls extends React.Component<Props, State> {
  private static tickDuration = 5
  // // multiplier for play speed
  // private static playSpeed = 4

  constructor(props: Props) {
    super(props)

    this.handleTick = this.handleTick.bind(this)
    this.stop = this.stop.bind(this)
    this.playPause = this.playPause.bind(this)

    setInterval(this.handleTick, GameControls.tickDuration)
  }

  public playPause() {
    this.props.setViewState({
      isPlaying: !this.props.viewState.isPlaying,
      startTime: !this.props.viewState.isPlaying ? Date.now() : null
    })
  }

  private handleTick() {
    if (this.props.viewState.isPlaying) {
      this.props.setViewState({
        elapsed: this.props.viewState.elapsed + (300)
      })
    }
  }

  public stop() {
    this.props.setViewState({
      isPlaying: false
    })
  }
  public render() {
    return (<div>
      {this.props.match && this.props.match.data && <Slider
        min={0}
        max={this.props.match.data.attributes.duration}
        stepSize={15}
        labelStepSize={60}
        onChange={(value: number) => this.props.setViewState({ elapsed: value })}
        labelRenderer={(value: number) => moment().startOf('day').seconds(value).format('mm:ss')}
        value={this.props.viewState.elapsed / 1000}
      />}
      {this.props.match && this.props.match.data && <ButtonGroup minimal={true} large={false}>
        <Button icon="fast-backward" />
        <Button icon={!this.props.viewState.isPlaying ? 'play' : 'pause'} onClick={this.playPause} />
        <Button icon="fast-forward" />
        <Button icon="stop" onClick={this.stop} />
      </ButtonGroup>}
    </div>)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameControls)
