  import * as React from 'react'
  import { connect } from 'react-redux'
  import * as moment from 'moment'

  import { Slider, ButtonGroup, Button, Checkbox, Icon } from "@blueprintjs/core"

  import IStoreState from 'state/IStoreState'
  import { MatchViewState } from 'state/matches/matches.state'
  import Match from 'state/matches/match.model'
  import * as MatchesActions from 'state/matches/matches.actions'

  import * as styles from './Controls.scss'

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
      if (this.props.viewState.isPlaying &&
          this.props.match &&
          this.props.viewState.elapsed / 1000 < this.props.match.data.attributes.duration) {
        this.props.setViewState({
          elapsed: this.props.viewState.elapsed + (1500)
        })
      } else if (this.props.match &&
        this.props.viewState.elapsed / 1000 > this.props.match.data.attributes.duration) {
        // wait a bit and reset play state
        setTimeout(() => this.props.setViewState({ isPlaying: false, elapsed: 0 }), 200)
      }
    }

    public stop() {
      this.props.setViewState({
        isPlaying: false
      })
    }

    public toggleViewProp(prop: string) {
      const payload = {} as any

      payload[prop] = !this.props.viewState[prop]
      this.props.setViewState(payload)
    }

    public render() {
      return (<div>
        {this.props.match && this.props.match.data && <Slider
          min={0}
          max={this.props.match.data.attributes.duration}
          stepSize={15}
          labelStepSize={180}
          onChange={(value: number) => this.props.setViewState({ elapsed: value * 1000 })}
          labelRenderer={(value: number) => moment().startOf('day').seconds(value).format('mm:ss')}
          value={this.props.viewState.elapsed / 1000}
        />}
        {this.props.match && this.props.match.data && <ButtonGroup minimal={true} large={false}>
          <Button icon="fast-backward" />
          <Button icon={!this.props.viewState.isPlaying ? 'play' : 'pause'} onClick={this.playPause} />
          <Button icon="fast-forward" />
          <Button icon="stop" onClick={this.stop} />
        </ButtonGroup>}
        <div className={styles.controlsCheckboxContainer}>
          <Checkbox className={styles.controlsCheckbox} checked={this.props.viewState.showPlanePath} onChange={() => this.toggleViewProp('showPlanePath')}>
            <Icon style={{ marginRight: '0.3em' }} icon="airplane" />
            Show Plane Path
          </Checkbox>
          <Checkbox className={styles.controlsCheckbox} checked={this.props.viewState.showRedZones} onChange={() => this.toggleViewProp('showRedZones')}>
            <Icon style={{ marginRight: '0.3em' }} icon="flame" />
            Show Red Zone
          </Checkbox>
          <Checkbox className={styles.controlsCheckbox} checked={this.props.viewState.showCircles} onChange={() => this.toggleViewProp('showCircles')}>
            <Icon style={{ marginRight: '0.3em' }} icon="circle" />
            Show Circles
          </Checkbox>
        </div>
      </div>)
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(GameControls)
