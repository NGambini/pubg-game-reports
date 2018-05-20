import * as React from 'react'

import { Table, Column, Cell } from '@blueprintjs/table'
import Match from 'state/matches/match.model';

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
  }

  public gameIdRenderer = (rowIndex: number) => {
    return <Cell>{this.props.matchesArray[rowIndex].id}</Cell>
  }

  public dateTimeRenderer = (rowIndex: number) => {
    const match = this.props.matchesArray[rowIndex]

    return <Cell loading={match.data === undefined}>
      {match.id}
    </Cell>
  }

  public mapNameRenderer = (rowIndex: number) => {
    const match = this.props.matchesArray[rowIndex]

    return <Cell loading={match.data === undefined}>
      {match.data ? match.data.attributes.mapName : null}
    </Cell>
  }

  public durationRenderer = (rowIndex: number) => {
    const match = this.props.matchesArray[rowIndex]

    return <Cell loading={match.data === undefined}>
      {match.data ? match.data.attributes.duration : null}
    </Cell>
  }

  public finalScoreRenderer = (rowIndex: number) => {
    return <Cell loading={true}>
      {'game score todo'}
    </Cell>
  }

  public render() {
    return (<Table numRows={this.props.matchesArray.length}>
      <Column name='Game ID' cellRenderer={this.gameIdRenderer} />
      <Column name='Date and time' cellRenderer={this.dateTimeRenderer} />
      <Column name='Map name' cellRenderer={this.mapNameRenderer} />
      <Column name='Duration' cellRenderer={this.durationRenderer} />
      <Column name='Final Score' cellRenderer={this.finalScoreRenderer} />
    </Table>)
  }
}
