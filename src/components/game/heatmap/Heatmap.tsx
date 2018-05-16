import * as _ from 'lodash'
import * as h337 from 'heatmap.js'
import * as ReactDOM from 'react-dom'
import * as React from 'react'

import { HeatmapData } from 'state/matches/telemetry/events'

type Props = {
  background: string,
  style: any,
  config?: any,
  data: {
    data: Array<HeatmapData>,
    min: number,
    max: number
  }
}

export class Heatmap extends React.Component<Props, never> {
  private heatmapInstance: h337.Heatmap<"value", "x", "y">

  private setupHeatMap() {
    const { style, config } = this.props

    const width = style.width.replace('px', '')
    const height = style.height.replace('px', '')

    let c = config || {}
    let _container = ReactDOM.findDOMNode(this)
    let defaultCfg = {
      width: width,
      height: height,
      radius: 10,
      // opacity: .6
    }
    let _cfg = _.merge(defaultCfg, c)
    _cfg.container = _container
    this.heatmapInstance = h337.create(_cfg)
    this.setState({ cfg: _cfg })
  }

  componentDidMount() {
    this.setupHeatMap()
  }

  componentDidUpdate() {
    const { style, data } = this.props

    const width = style.width.replace('px', '')
    const height = style.height.replace('px', '')

    // now adapt data for the ratio
    const finalData = data 
    
    finalData.data = finalData.data.map(d => ({
      x: d.x / 816000.0 * width,
      y: d.y / 816000.0 * height,
      value: d.value
    }))
    this.heatmapInstance.setData(finalData)
  }

  componentWillReceiveProps(nextProps: Props) {
    return nextProps != this.props
  }

  shouldComponentUpdate(nextProps: Props) {
    return nextProps != this.props
  }

  render() {
    return (
      <div className={'map-' + this.props.background}/>
    )
  }
}

export default Heatmap