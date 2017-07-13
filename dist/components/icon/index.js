import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import './theme.scss';

var CheckIcon = function CheckIcon(_ref) {
    var className = _ref.className;

    return React.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', preserveAspectRatio: 'xMidYMid meet' },
        React.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
        React.createElement('path', { d: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' })
    );
};

var ChevronLeftIcon = function ChevronLeftIcon(_ref2) {
    var className = _ref2.className;

    return React.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', preserveAspectRatio: 'xMidYMid meet' },
        React.createElement('path', { d: 'M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z' }),
        React.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
    );
};

var ChevronRightIcon = function ChevronRightIcon(_ref3) {
    var className = _ref3.className;

    return React.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', preserveAspectRatio: 'xMidYMid meet' },
        React.createElement('path', { d: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z' }),
        React.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' })
    );
};

var TimerIcon = function TimerIcon(_ref4) {
    var className = _ref4.className;

    return React.createElement(
        'svg',
        { className: className, viewBox: '0 0 24 24', preserveAspectRatio: 'xMidYMid meet' },
        React.createElement('path', { d: 'M0 0h24v24H0z', fill: 'none' }),
        React.createElement('path', { d: 'M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z' })
    );
};

var ICONS = {
    'check': CheckIcon,
    'timer': TimerIcon,
    'chevron-left': ChevronRightIcon,
    'chevron-right': ChevronRightIcon
};

var Icon = function (_React$PureComponent) {
    _inherits(Icon, _React$PureComponent);

    function Icon(props) {
        _classCallCheck(this, Icon);

        return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).call(this, props));
    }

    _createClass(Icon, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                name = _props.name;


            var classes = classNames('td-icon', className);
            var Icon = ICONS[name];
            return React.createElement(Icon, { className: classes });
        }
    }]);

    return Icon;
}(React.PureComponent);

Icon.propTypes = {
    className: PropTypes.string,
    name: PropTypes.oneOf(['check', 'timer', 'chevron-left', 'chevron-right']).isRequired
};

export default Icon;