import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import prefixAll from 'inline-style-prefixer/static';
import classNames from 'classnames';

import './_base.scss';

var noop = function noop() {};

var Input = function (_React$Component) {
    _inherits(Input, _React$Component);

    function Input(props) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, (Input.__proto__ || Object.getPrototypeOf(Input)).call(this, props));

        _this.adjustLabelTopPosition = _this.adjustLabelTopPosition.bind(_this);
        _this.animateLabel = _this.animateLabel.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.onChange = _this.onChange.bind(_this);
        _this.onFocus = _this.onFocus.bind(_this);

        _this.state = {
            isFocused: false,
            value: '',
            initialTop: 'initial',
            labelStyle: {
                top: 'initial'
            }
        };
        return _this;
    }

    _createClass(Input, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.adjustLabelTopPosition();
        }
    }, {
        key: 'adjustLabelTopPosition',
        value: function adjustLabelTopPosition() {
            var initialTop = window.getComputedStyle(this._label).top;
            this.setState({
                initialTop: initialTop
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(e) {
            var value = e.currentTarget.value;
            this.props.onValueChanged(value);
            this.setState({ value: value });
        }
    }, {
        key: 'onFocus',
        value: function onFocus(e) {
            e.currentTarget.scrollIntoViewIfNeeded(true);
            this.animateLabel('up');
            this.setState({
                isFocused: true
            });
        }
    }, {
        key: 'onBlur',
        value: function onBlur(e) {
            this.animateLabel('down');
            this.setState({
                isFocused: false
            });
        }
    }, {
        key: 'animateLabel',
        value: function animateLabel(direction) {
            var _this2 = this;

            var _state = this.state,
                initialTop = _state.initialTop,
                value = _state.value;

            // Don't animate if there is already text

            if (value) {
                return;
            }

            var isUp = direction === 'up';
            var startTop = isUp ? initialTop : '0px';

            var endTop = isUp ? '0px' : initialTop;

            var animationFrame = function animationFrame() {
                return new Promise(function (resolve) {
                    window.requestAnimationFrame(resolve);
                });
            };

            var setStartState = function setStartState() {
                return new Promise(function (resolve) {
                    _this2.setState({
                        labelStyle: {
                            top: startTop
                        }
                    }, resolve);
                });
            };

            var setEndState = function setEndState() {
                return new Promise(function (resolve) {
                    _this2.setState({
                        labelStyle: {
                            top: endTop
                        }
                    }, resolve);
                });
            };

            animationFrame().then(setStartState).then(animationFrame).then(setEndState);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                className = _props.className,
                autoFocus = _props.autoFocus,
                label = _props.label,
                name = _props.name,
                maxLength = _props.maxLength,
                type = _props.type;
            var _state2 = this.state,
                isFocused = _state2.isFocused,
                value = _state2.value,
                labelStyle = _state2.labelStyle;


            var classes = classNames('td-input', className, {
                'td-input--active': isFocused || value
            });
            var innerClasses = 'td-input__inner';
            var prefixedLabelStyle = prefixAll(labelStyle);

            return React.createElement(
                'div',
                { className: classes, ref: function ref(el) {
                        _this3._component = el;
                    } },
                React.createElement(
                    'div',
                    { className: innerClasses },
                    label && React.createElement(
                        'span',
                        { style: prefixedLabelStyle, className: 'td-input__label',
                            ref: function ref(el) {
                                _this3._label = el;
                            }
                        },
                        label
                    ),
                    React.createElement('input', { className: 'td-input__field',
                        type: 'text',
                        value: value,
                        name: name,
                        autoFocus: autoFocus,
                        maxLength: maxLength,
                        onFocus: this.onFocus,
                        onBlur: this.onBlur,
                        onChange: this.onChange
                    })
                ),
                React.createElement('span', { className: 'td-input__highlight-bar ' + (isFocused ? 'td--focus' : '') }),
                maxLength && React.createElement(
                    'span',
                    { className: 'td-input__input-count' },
                    value.length + '/' + maxLength
                )
            );
        }
    }]);

    return Input;
}(React.Component);

Input.propTypes = {
    autoFocus: PropTypes.bool,
    name: PropTypes.string,
    maxLength: PropTypes.number,
    onValueChanged: PropTypes.func
};

Input.defaultProps = {
    autoFocus: false,
    onValueChanged: noop
};

export default Input;