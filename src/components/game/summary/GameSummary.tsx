import * as React from 'react'
import { Card, Elevation } from '@blueprintjs/core'
import classnamer from 'classnamer'
import * as styles from './GameSummary.scss'
import IStoreState from 'state/IStoreState'
import { ParticipantStatistics } from 'state/matches/match.model'
import { getParticipantStatistics } from 'state/matches/selectors'
import { connect } from 'react-redux';

type StateToProps = {
  participantStatistics: ParticipantStatistics
}

const mapStateToProps = (state: IStoreState) => ({
  participantStatistics: getParticipantStatistics(state)
})

type Props = StateToProps

class GameSummary extends React.Component<Props, {}> {
  public render() {
    const { participantStatistics } = this.props

    return (
      <Card interactive={true} elevation={Elevation.TWO} className={styles.summary}>
        <h5>General info</h5>
        {this.props.participantStatistics && <table className={classnamer(styles.table, 'pt-html-table', 'pt-html-table-striped')}>
          <tbody>
            <tr>
              <td>Finished {participantStatistics.winPlace} with {participantStatistics.winPoints} points</td>
              <td>Time survived : {participantStatistics.timeSurvived}</td>
            </tr>
            <tr>
              <td>Kills : {participantStatistics.kills}</td>
              <td>Headshots : {participantStatistics.headshotKills}</td>
            </tr>
            <tr>
              <td>assists : {participantStatistics.assists}</td>
              <td>revives : {participantStatistics.revives}</td>
            </tr>
            <tr>
              <td>Walked {participantStatistics.walkDistance}</td>
              <td>Drove {participantStatistics.rideDistance}</td>
            </tr>
          </tbody>
        </table>}
      </Card>)
  }
}

export default connect<StateToProps, void, void>(mapStateToProps, undefined)(GameSummary)
