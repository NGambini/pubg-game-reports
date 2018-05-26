import * as React from 'react'
import { Stage, Layer, Circle } from 'react-konva'
import { Circle as CirclePos, PlanePath } from 'state/matches/telemetry/computedObjects'

type MapCanvasProps = {
  circles: Array<CirclePos>,
  planePath: PlanePath
}

export default class MapCanvas extends React.Component<MapCanvasProps, {}> {
  canvas: HTMLCanvasElement
  public componentDidMount() {

  }

  public render() {
    return (<Stage width={800} height={800} >
      <Layer>
        {this.props.circles && this.props.circles.map((c: CirclePos) =>
          <Circle
            key={c.radius}
            x={c.location.x / 816000.0 * 800}
            y={c.location.y / 816000.0 * 800}
            radius={c.radius / 816000.0 * 800}
            strokeWidth={2}
            stroke="white" />
        )}
      </Layer>
    </Stage>)
  }
}
