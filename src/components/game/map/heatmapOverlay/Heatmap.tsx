import * as React from 'react'

import { HeatmapData } from 'state/matches/telemetry/events'
var WebGLHeatmap = require('webgl-heatmap')

type HeatmapProps = {
  background: string,
  style: any,
  config?: any,
  data: {
    data: Array<HeatmapData>,
    min: number,
    max: number
  }
}

type HeatmapState = {
  canvas: HTMLCanvasElement
}

export class Heatmap extends React.Component<HeatmapProps, HeatmapState> {
  private heatmap: any

  constructor(props: HeatmapProps, state: HeatmapState) {
    super(props, state)
    this.refBinder = this.refBinder.bind(this)
  }

  public componentDidUpdate(prevProps: HeatmapProps, prevState: HeatmapState) {
    if (this.state && this.state.canvas && (!prevState || this.state.canvas != prevState.canvas)) {
      // if new canvas ref, init the heatmap
      this.heatmap = new WebGLHeatmap({
        canvas: this.state.canvas,
        width: 800,
        height: 800
      })
    }

    if (this.props.data && prevProps.data) {
      const finalData = this.props.data.data.map(d => ({
        x: d.x / 816000.0 * 800,
        y: d.y / 816000.0 * 800,
        intensity: 0.35,
        size: 15
      }))

      this.heatmap.clear()
      this.heatmap.addPoints(finalData)
      this.heatmap.update()
      this.heatmap.display()
    }
  }

  public refBinder(input: HTMLCanvasElement) {
    this.setState({
      canvas: input
    }) 
  }

  render() {
    return (
      <canvas ref={this.refBinder} className={'map-' + this.props.background} />
    )
  }
}

export default Heatmap