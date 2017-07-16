import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';
import prefixAll from 'inline-style-prefixer/static';

import './_base.scss';

var RectLoader = function RectLoader(_ref) {
    var className = _ref.className,
        color = _ref.color,
        count = _ref.count,
        duration = _ref.duration;

    var classes = classNames('td-rect-loader', className);
    var rectClass = 'td-rect-loader__rect';

    var rectangles = Array(count).fill().map(function (_, index) {
        var rectClasses = classNames(rectClass, 'td--rect-' + index);
        var delay = index !== 0 ? -duration + index * 100 : 0;

        var rectStyle = prefixAll({
            animationDuration: duration + 'ms',
            animationDelay: delay + 'ms',
            backgroundColor: color
        });

        return React.createElement('div', { key: 'rect-loader__rect-' + index, className: rectClasses, style: rectStyle });
    });

    return React.createElement(
        'div',
        { className: classes },
        rectangles
    );
};

var LOADERS = {
    rect: RectLoader
};

var Loader = function (_React$PureComponent) {
    _inherits(Loader, _React$PureComponent);

    function Loader(props) {
        _classCallCheck(this, Loader);

        return _possibleConstructorReturn(this, (Loader.__proto__ || Object.getPrototypeOf(Loader)).call(this, props));
    }

    _createClass(Loader, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                color = _props.color,
                count = _props.count,
                duration = _props.duration,
                name = _props.name;


            var Loader = LOADERS[name];
            return React.createElement(Loader, { className: className,
                color: color,
                count: count,
                duration: duration
            });
        }
    }]);

    return Loader;
}(React.PureComponent);

Loader.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    count: PropTypes.number,
    duration: PropTypes.number,
    name: PropTypes.oneOf(Object.keys(LOADERS))
};

Loader.defaultProps = {
    count: 3,
    color: 'black',
    name: 'rect',
    duration: 1200
};

export default Loader;