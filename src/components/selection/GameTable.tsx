import * as React from 'react'

import { Table, Column, Cell } from '@blueprintjs/table'

type TableProps = {
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
    return <Cell>{`${('gameid')}`}</Cell>
  }

  public dateTimeRenderer = (rowIndex: number) => {
    return <Cell>{`${('datetime')}`}</Cell>
  }

  public mapNameRenderer = (rowIndex: number) => {
    return <Cell>{`${('mapname')}`}</Cell>
  }

  public durationRenderer = (rowIndex: number) => {
    return <Cell>{`${('duration')}`}</Cell>
  }

  public finalScoreRenderer = (rowIndex: number) => {
    return <Cell>{`${('finalscore')}`}</Cell>
  }

  public render() {
    return (<Table numRows={4}>
      <Column name='Game ID' cellRenderer={this.gameIdRenderer} />
      <Column name='Date and time' cellRenderer={this.dateTimeRenderer} />
      <Column name='Map name' cellRenderer={this.mapNameRenderer} />
      <Column name='Duration' cellRenderer={this.durationRenderer} />
      <Column name='Final Score' cellRenderer={this.finalScoreRenderer} />
    </Table>)
  }
}
