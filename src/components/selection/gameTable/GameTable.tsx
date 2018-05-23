import * as React from 'react'
import * as moment from 'moment'

import { Table, Column, Cell, RegionCardinality } from '@blueprintjs/table'
import Match from 'state/matches/match.model'
import { gameMapFromString } from 'state/enums/gameMaps'
import { Button } from '@blueprintjs/core'
import { Link } from 'react-router-dom';

import * as styles from './GameTable.scss'

type TableProps = {
  matchesArray: Array<Match>
}

export default class GameTable extends React.Component<TableProps> {
  constructor(props: TableProps) {
    super(props)
    this.gameIdRenderer = this.gameIdRenderer.bind(this)
    this.dateTimeRenderer = this.dateTimeRenderer.bind(this)
    this.mapNameRenderer = this.mapNameRenderer.bind(this)
    this.durationRenderer = this.durationRenderer.bind(this)
    this.finalScoreRenderer = this.finalScoreRenderer.bind(this)
    this.actionsRenderer = this.actionsRenderer.bind(this)
  }

  public gameIdRenderer = (rowIndex: number) => {
    return <Cell >{this.props.matchesArray[rowIndex].id}</Cell>
  }

  public dateTimeRenderer = (rowIndex: number) => {
    const match = this.props.matchesArray[rowIndex]

    return <Cell loading={match.data === undefined}>
      {match.data ? moment(match.data.attributes.createdAt).format('MMMM Do YYYY, h:mm a') : null}
    </Cell>
  }

  public mapNameRenderer = (rowIndex: number) => {
    const match = this.props.matchesArray[rowIndex]

    return <Cell loading={match.data === undefined}>
      {match.data ? gameMapFromString(match.data.attributes.mapName) : null}
    </Cell>
  }

  public durationRenderer = (rowIndex: number) => {
    const match = this.props.matchesArray[rowIndex]

    return <Cell loading={match.data === undefined}>
      {match.data ? moment().startOf('day').seconds(match.data.attributes.duration).format('mm:ss') : null}
    </Cell>
  }

  public finalScoreRenderer = (rowIndex: number) => {
    return <Cell loading={true}>
      {'game score todo'}
    </Cell>
  }

  public actionsRenderer = (rowIndex: number) => {
    return <Cell loading={false}>
      <Link to={'/game/' + this.props.matchesArray[rowIndex].id}>
        <Button className="pt-intent-success pt-small" rightIcon='plus' text="View details" />
      </Link>
    </Cell>
  }

  public render() {
    return (
      <Table enableColumnResizing={false} className={styles.gameTable}defaultRowHeight={45} selectionModes={[RegionCardinality.FULL_TABLE]} numRows={this.props.matchesArray.length}>
        <Column name='Game ID' cellRenderer={this.gameIdRenderer} />
        <Column name='Date and time' cellRenderer={this.dateTimeRenderer} />
        <Column name='Map name' cellRenderer={this.mapNameRenderer} />
        <Column name='Duration' cellRenderer={this.durationRenderer} />
        <Column name='Final Score' cellRenderer={this.finalScoreRenderer} />
        <Column name='Actions' cellRenderer={this.actionsRenderer} />
      </Table>
    )
  }
}
