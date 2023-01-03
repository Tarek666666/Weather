'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Skycons = undefined;

var _react = require('react');

var React = _interopRequireWildcard(_react);

var _reactDom = require('react-dom');

var ReactDOM = _interopRequireWildcard(_reactDom);

var _skycons = require('skycons');

var _skycons2 = _interopRequireDefault(_skycons);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _recompose = require('recompose');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var _Skycons = (0, _skycons2.default)(window);

var enhance = (0, _recompose.compose)((0, _recompose.defaultProps)({
  defaultColor: 'black',
  animate: true,
  icon: ''
}), (0, _recompose.setPropTypes)({
  animate: _propTypes2.default.bool,
  icon: _propTypes2.default.oneOf(['clear-day', 'clear-night', 'partly-cloudy-day', 'partly-cloudy-night', 'cloudy', 'rain', 'sleet', 'wind', 'fog']).isRequired,
  style: _propTypes2.default.object
}), (0, _recompose.lifecycle)({
  componentDidMount: function componentDidMount() {
    var _props = this.props,
        iconColor = _props.iconColor,
        defaultColor = _props.defaultColor,
        icon = _props.icon,
        animate = _props.animate;

    var skycons = new _Skycons({
      color: iconColor || defaultColor
    });
    skycons.add(ReactDOM.findDOMNode(this), icon);

    // Starting animation if animate is set to true
    animate && skycons.play();
  }
}));

var StatelessSkycons = function StatelessSkycons(_ref) {
  var style = _ref.style;
  return React.createElement('canvas', style);
};

var Skycons = exports.Skycons = enhance(StatelessSkycons);