import * as React from 'react'

import { HeatmapData } from 'state/matches/telemetry/events'
var WebGLHeatmap = require('webgl-heatmap')

import * as styles from './Heatmap.scss'

type HeatmapProps = {
  style?: any,
  config?: any,
  data: Array<HeatmapData>,
  width?: number,
  height?: number,
  mapSize: number
}

type HeatmapState = {
  canvas: HTMLCanvasElement,
  activated: boolean
}

export class Heatmap extends React.Component<HeatmapProps, HeatmapState> {
  readonly state: HeatmapState = {
    canvas: null,
    activated: false
  }
  private heatmap: any

  constructor(props: HeatmapProps, state: HeatmapState) {
    super(props, state)
    this.refBinder = this.refBinder.bind(this)
  }

  public componentDidUpdate(prevProps: HeatmapProps, prevState: HeatmapState) {
    if (this.state && this.state.canvas && (!prevState || this.state.canvas != prevState.canvas || this.props.height != prevProps.height)) {
      // if new canvas ref or width height changed, init the heatmap
      this.heatmap = new WebGLHeatmap({
        canvas: this.state.canvas,
        width: this.props.width,
        height: this.props.height
      })
    }


    if (this.props.data && prevProps.data) {
      const finalData = this.props.data.map(d => ({
        x: d.x / this.props.mapSize * this.props.width,
        y: d.y / this.props.mapSize * this.props.height,
        intensity: 0.5,
        size: this.props.width / 60
      }))

      if (this.heatmap) {
        this.heatmap.clear()
        this.heatmap.addPoints(finalData)
        this.heatmap.update()
        this.heatmap.display()
      }
    }
  }

  public refBinder(input: HTMLCanvasElement) {
    // QUESTION should refs be in state ?
    this.setState({
      canvas: input
    })
  }

  render() {
    return (
      <canvas className={styles.heatmapCanvas} ref={this.refBinder} />
    )
  }
}

export default Heatmap