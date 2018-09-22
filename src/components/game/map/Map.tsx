import * as React from 'react'
import { Card } from '@blueprintjs/core'

import { GameMaps } from 'state/enums/gameMaps'
import MapCanvas from './canvas/MapCanvas'
import Heatmap from './heatmapOverlay/Heatmap'
import { HeatmapData } from 'state/matches/telemetry/events'
import { Circle, PlanePath, PlayerStory } from 'state/matches/telemetry/computedObjects'

import * as styles from './Map.scss'
import Erangel = require('../../../assets/maps/erangel.jpg');

type MapProps = {
  mapName: GameMaps,
  heatmapData: Array<HeatmapData>,
  planePath: PlanePath,
  circles: Array<Circle>,
  redZones: Array<Circle>,
  blueZone: Circle,
  playerStory: PlayerStory
}

type MapState = {
  containerRef: HTMLDivElement
}

export default class Map extends React.Component<MapProps, MapState> {
  readonly state: MapState = { containerRef: null }

  constructor(props: MapProps) {
    super(props)
    this.refBinder = this.refBinder.bind(this)
  }

  public refBinder(input: HTMLDivElement) {
    this.setState({containerRef: input})
  }

  public render() {
    const { blueZone, circles, planePath, redZones, playerStory } = this.props
    const width = this.state.containerRef ? this.state.containerRef.offsetWidth : void 0
    const height = this.state.containerRef ? this.state.containerRef.offsetHeight : void 0

    return (
      <Card>
        <div ref={this.refBinder} className={styles.mapErangel}>
          {width && height &&
            <>
              <Heatmap data={this.props.heatmapData} width={width} height={height} />
              <MapCanvas
                width={width}
                height={height}
                blueZone={blueZone}
                circles={circles}
                planePath={planePath}
                redZones={redZones}
                playerStory={playerStory}
              />
            </>}
          <img src={Erangel} style={{ visibility: "hidden", width: "100%" }} />
        </div>
      </Card>)
  }
}
