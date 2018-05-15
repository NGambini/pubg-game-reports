import * as _ from 'lodash'
import * as h337 from 'heatmap.js'
import * as ReactDOM from 'react-dom'
import * as React from 'react'

import { Location } from 'state/matches/telemetry/telemetry.model'

type Props = {
  background: string,
  style: any,
  config: any,
  data: {
    data: Array<Location>,
    min: number,
    max: number
  }
}

export class Heatmap extends React.Component<Props, never> {

  private setupHeatmap() {
    const { style, data, config } = this.props;

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

    // now adapt data for the ratio
    const finalData = data 
    
    finalData.data = finalData.data.map(d => ({
      x: d.x / 816000.0 * width,
      y: d.y / 816000.0 * height,
      value: d.value
    }))
    this.heatmapInstance.setData(finalData)
  }


  render() {
    return (
      <div className={'map-' + this.props.background} ref="react-heatmap"></div>
    )
  }
}

export default Heatmap