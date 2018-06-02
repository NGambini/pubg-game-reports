import * as React from 'react'

import { GameMaps } from 'state/enums/gameMaps'
import MapCanvas from './canvas/MapCanvas'
import Heatmap from './heatmapOverlay/Heatmap'

import * as styles from './Map.scss'

import { HeatmapData } from 'state/matches/telemetry/events'
import { Circle, PlanePath } from 'state/matches/telemetry/computedObjects'

type MapProps = {
  mapName: GameMaps,
  heatmapData: Array<HeatmapData>,
  planePath: PlanePath,
  circles: Array<Circle>,
  redZones: Array<Circle>
}

export default class Map extends React.Component<MapProps, {}> {
  public render() {
    return (
    <div className={styles.mapErangel}>
      <Heatmap style={{ 'width': '800px', 'height': '800px' }} data={this.props.heatmapData} />
      <MapCanvas circles={this.props.circles} planePath={this.props.planePath} redZones={this.props.redZones} />
    </div>)
  }
}
