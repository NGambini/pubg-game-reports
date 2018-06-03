import * as React from 'react'

import { GameMaps } from 'state/enums/gameMaps'
import MapCanvas from './canvas/MapCanvas'
import Heatmap from './heatmapOverlay/Heatmap'

import * as styles from './Map.scss'

import { HeatmapData } from 'state/matches/telemetry/events'
import { Circle, PlanePath, PlayerStory } from 'state/matches/telemetry/computedObjects'

type MapProps = {
  mapName: GameMaps,
  heatmapData: Array<HeatmapData>,
  planePath: PlanePath,
  circles: Array<Circle>,
  redZones: Array<Circle>,
  blueZone: Circle,
  playerStory: PlayerStory
}

export default class Map extends React.Component<MapProps, {}> {
  public render() {
    const { blueZone, circles, planePath, redZones, playerStory } = this.props

    return (
    <div className={styles.mapErangel}>
      <Heatmap style={{ 'width': '800px', 'height': '800px' }} data={this.props.heatmapData} />
      <MapCanvas
        blueZone={blueZone}
        circles={circles}
        planePath={planePath}
        redZones={redZones}
        playerStory={playerStory}
      />
    </div>)
  }
}
