import * as React from 'react'
import { Stage, Layer, Circle, Line } from 'react-konva'
import { Circle as CirclePos, PlanePath } from 'state/matches/telemetry/computedObjects'

type MapCanvasProps = {
  circles: Array<CirclePos>,
  redZones: Array<CirclePos>,
  blueZone: CirclePos,
  planePath: PlanePath
}

export default class MapCanvas extends React.Component<MapCanvasProps, {}> {
  canvas: HTMLCanvasElement
  public componentDidMount() {

  }

  public render() {
    const { blueZone } = this.props

    return (<Stage width={800} height={800} >
      <Layer>
        {this.props.blueZone &&
          <Circle
            key={blueZone.location.x * blueZone.location.y}
            x={blueZone.location.x / 816000.0 * 800}
            y={blueZone.location.y / 816000.0 * 800}
            radius={blueZone.radius / 816000.0 * 800}
            strokeWidth={2}
            stroke="blue" />
        }
        {this.props.circles && this.props.circles.map((c: CirclePos) =>
          <Circle
            key={c.location.x * c.location.y}
            x={c.location.x / 816000.0 * 800}
            y={c.location.y / 816000.0 * 800}
            radius={c.radius / 816000.0 * 800}
            strokeWidth={2}
            stroke="white" />
        )}
        {this.props.redZones && this.props.redZones.map((c: CirclePos) =>
          <Circle
            key={c.location.x * c.location.y}
            x={c.location.x / 816000.0 * 800}
            y={c.location.y / 816000.0 * 800}
            radius={c.radius / 816000.0 * 800}
            opacity={0.4}
            fill="red" />
        )}
        {this.props.planePath &&
          <Line tension={1} stroke="yellow" points={[
            this.props.planePath.startX / 816000.0 * 800,
            this.props.planePath.startY / 816000.0 * 800,
            this.props.planePath.endX / 816000.0 * 800,
            this.props.planePath.endY / 816000.0 * 800
          ]} />}
      </Layer>
    </Stage>)
  }
}
