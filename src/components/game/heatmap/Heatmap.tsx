// import * as _ from 'lodash'
// import * as h337 from 'heatmap.js'
import * as ReactDOM from 'react-dom'
import * as React from 'react'
// import { debounce } from 'lodash'

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

export class Heatmap extends React.Component<HeatmapProps, {}> {
  // private heatmapInstance: h337.Heatmap<"value", "x", "y">
  private heatmap: any

  constructor(props: HeatmapProps) {
    super(props)

    this.heatmap = new WebGLHeatmap({
      canvas: ReactDOM.findDOMNode(this),
      width: 800,
      height: 800
    })
  }

  private setupHeatMap() {
    // const { style, config } = this.props

    // const width = style.width.replace('px', '')
    // const height = style.height.replace('px', '')

    // let c = config || {}
    // let _container = ReactDOM.findDOMNode(this)
    // let defaultCfg = {
    //   width: width,
    //   height: height,
    //   radius: 10,
    //   // opacity: .6
    // }
    // let _cfg = _.merge(defaultCfg, c)
    // _cfg.container = _container
    // this.heatmapInstance = h337.create(_cfg)
    // this.setState({ cfg: _cfg })
  }

  componentDidMount() {
        this.setupHeatMap()
  }

  componentDidUpdate() {
    const { style, data } = this.props

    const width = style.width.replace('px', '')
    const height = style.height.replace('px', '')

    // now adapt data for the ratio
    const finalData = data.data.map(d => ({
      x: d.x / 816000.0 * width,
      y: d.y / 816000.0 * height,
      intensity: d.value,
      size: 1
    }))


    this.heatmap.addPoints(finalData)
    this.heatmap.update()
    this.heatmap.display()
  }

  render() {
    return (
      <canvas className={'map-' + this.props.background}/>
    )
  }
}

export default Heatmap