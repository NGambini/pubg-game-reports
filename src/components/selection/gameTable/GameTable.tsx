import * as React from 'react'
import * as moment from 'moment'

import Match from 'state/matches/match.model'
import { gameMapFromString } from 'state/enums/gameMaps'
import { Button } from '@blueprintjs/core'
import { Link } from 'react-router-dom';

// import * as styles from './GameTable.scss'

type TableProps = {
  matchesArray: Array<Match>
}

export default class GameTable extends React.Component<TableProps> {
  constructor(props: TableProps) {
    super(props)
  }

  public render() {
    return (
      <table className="pt-html-table pt-interactive">
        <thead>
          <tr>
            <th>Game ID</th>
            <th>Date and time</th>
            <th>Map name</th>
            <th>Duration</th>
            <th>Final score</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.matchesArray.map((m: Match, index: number) => (<tr>
            <td className={!m.data ? 'pt-skeleton' : null}>{m.data ? m.data.id : m.id} </td>
            <td className={!m.data ? 'pt-skeleton' : null}>{m.data ? moment(m.data.attributes.createdAt).format('MMMM Do YYYY, h:mm a') : 'Time unknown'}</td>
            <td className={!m.data ? 'pt-skeleton' : null}>{m.data ? gameMapFromString(m.data.attributes.mapName) : 'No map known'} </td>
            <td className={!m.data ? 'pt-skeleton' : null}>{m.data ? moment().startOf('day').seconds(m.data.attributes.duration).format('mm:ss') : 'Duration unknown'} </td>
            <td className={!m.data ? 'pt-skeleton' : null}>final score todo</td>
            <td className={!m.data ? 'pt-skeleton' : null}>
              <Link to={'/game/' + this.props.matchesArray[index].id}>
                <Button className="pt-intent-success pt-small" rightIcon='plus' text="View details" />
              </Link>
            </td>
          </tr>))}
        </tbody>
      </table>
    )
  }
}
