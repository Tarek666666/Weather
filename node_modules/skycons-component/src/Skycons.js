import * as React from 'react'
import * as ReactDOM from 'react-dom'
import SkyconsModule from 'skycons'
import PropTypes from 'prop-types'
import {
  compose,
  lifecycle,
  setPropTypes,
  defaultProps,
  mapProps,
} from 'recompose'
const _Skycons = SkyconsModule(window)

const enhance = compose(
  defaultProps({
    defaultColor: 'black',
    animate: true,
    icon: '',
  }),
  setPropTypes({
    animate: PropTypes.bool,
    icon: PropTypes.oneOf([
      'clear-day',
      'clear-night',
      'partly-cloudy-day',
      'partly-cloudy-night',
      'cloudy',
      'rain',
      'sleet',
      'wind',
      'fog',
    ]).isRequired,
    style: PropTypes.object,
  }),
  lifecycle({
    componentDidMount() {
      const { iconColor, defaultColor, icon, animate } = this.props
      const skycons = new _Skycons({
        color: iconColor || defaultColor,
      })
      skycons.add(ReactDOM.findDOMNode(this), icon)

      // Starting animation if animate is set to true
      animate && skycons.play()
    },
  }),
)

const StatelessSkycons = ({ style }) => <canvas {...style} />

export const Skycons = enhance(StatelessSkycons)
