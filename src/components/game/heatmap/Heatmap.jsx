import _ from 'lodash'
import h337 from 'heatmap.js'
import ReactDOM, { render } from 'react-dom'
import React, { Component, PropTypes } from 'react'

class ReactHeatmap extends Component {

  constructor(props, context) {
    super(props, context)
    this.state = { cfg: null }
  }

  // TODO optimize using shouldupdate etc...
  // The range for the X and Y axes is 0 - 816,000 for 8km maps.
  // Location values are measured in centimeters
  // adapt to width & height
  componentDidUpdate() {
    const { style, data, config } = this.props;

    const width = style.width.replace('px', '') || _container.offsetWidth
    const height = style.height.replace('px', '') || _container.offsetHeight

    let c = config || {}
    let _container = ReactDOM.findDOMNode(this);
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
    console.log("final data", finalData)
    this.heatmapInstance.setData(finalData)
  }

  componentWillReceiveProps(nextProps) {
    return nextProps != this.props
  }

  shouldComponentUpdate(nextProps) {
    return nextProps != this.props
  }

  render() {
    return (
      <div className={'map-' + this.props.background} ref="react-heatmap"></div>
    )
  }
}

export default ReactHeatmap
