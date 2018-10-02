import * as React from 'react'
import { connect } from 'react-redux'
import { Stage, Layer, Circle, Line } from 'react-konva'
import { Circle as CirclePos, PlanePath, PlayerStory } from 'state/matches/telemetry/computedObjects'
import { Location } from 'state/matches/telemetry/objects'

import * as styles from './MapCanvas.scss'
import IStoreState from 'state/IStoreState'
import { MatchViewState } from 'state/matches/matches.state'

type MapCanvasProps = {  
  circles: Array<CirclePos>,
  redZones: Array<CirclePos>,
  blueZone: CirclePos,
  planePath: PlanePath,
  playerStory: PlayerStory,
  width?: number,
  height?: number
}


interface StateToProps {
  viewState: MatchViewState
}

const mapStateToProps = (state: IStoreState) => ({
  viewState: state.matches.viewState
})

type Props = MapCanvasProps & StateToProps

class MapCanvas extends React.Component<Props, {}> {
  canvas: HTMLCanvasElement
  public componentDidMount() {

  }

  public render() {
    const { blueZone, playerStory, width, height } = this.props

    const linePoints = new Array<number>()

    if (playerStory) {
      playerStory.points.forEach((p: Location) => linePoints.push(p.x / 816000.0 * width, p.y / 816000.0 * height))
    }

    return (<Stage className={styles.mapCanvas} width={width} height={height} >
      <Layer>
        {playerStory &&
          <Line
            strokeWidth={5}
            stroke="#62ff06"
            points={linePoints} />
        }
        {this.props.viewState.showCircles && this.props.blueZone &&
          <Circle
            key={blueZone.location.x * blueZone.location.y}
            x={blueZone.location.x / 816000.0 * width}
            y={blueZone.location.y / 816000.0 * width}
            radius={blueZone.radius / 816000.0 * width}
            strokeWidth={2}
            stroke="blue" />
        }
        {this.props.viewState.showCircles && this.props.circles && this.props.circles.map((c: CirclePos) =>
          <Circle
            key={c.location.x * c.location.y}
            x={c.location.x / 816000.0 * width}
            y={c.location.y / 816000.0 * width}
            radius={c.radius / 816000.0 * width}
            strokeWidth={2}
            stroke="white" />
        )}
        {this.props.viewState.showRedZones && this.props.redZones && this.props.redZones.map((c: CirclePos) =>
          <Circle
            key={c.location.x * c.location.y}
            x={c.location.x / 816000.0 * width}
            y={c.location.y / 816000.0 * width}
            radius={c.radius / 816000.0 * width}
            opacity={0.4}
            fill="red" />
        )}
        {this.props.viewState.showPlanePath && this.props.planePath &&
          <Line tension={1} stroke="yellow" points={[
            this.props.planePath.startX / 816000.0 * width,
            this.props.planePath.startY / 816000.0 * width,
            this.props.planePath.endX / 816000.0 * width,
            this.props.planePath.endY / 816000.0 * width
          ]} />}
      </Layer>
    </Stage>)
  }
}
export default connect(mapStateToProps, {})(MapCanvas)
