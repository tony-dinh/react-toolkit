import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';
import flatpickr from 'flatpickr';
import moment from 'moment';

import Icon from '../icon';

import '../../vendor/styles/flatpickr.min.css';
import './_base.scss';

var noop = function noop() {};

/**
 * ```jsx
 * import TimePicker from '@tonydinh/react-toolkit/dist/components/time-picker
 * ```
 * An date input component
 */

var TimePicker = function (_React$PureComponent) {
    _inherits(TimePicker, _React$PureComponent);

    function TimePicker(props) {
        _classCallCheck(this, TimePicker);

        var _this = _possibleConstructorReturn(this, (TimePicker.__proto__ || Object.getPrototypeOf(TimePicker)).call(this, props));

        _this.fp = null;
        _this.timeFormat = 'HH:mm';
        _this.TimeSelected = _this.TimeSelected.bind(_this);
        _this.showPicker = _this.showPicker.bind(_this);
        _this.onPickerClose = _this.onPickerClose.bind(_this);
        _this.onPickerOpen = _this.onPickerOpen.bind(_this);
        _this.validDefaultTime = _this.validDefaultTime.bind(_this);

        _this.state = {
            iconDimension: 0,
            value: _this.props.defaultTime
        };
        return _this;
    }

    _createClass(TimePicker, [{
        key: 'validDefaultTime',
        value: function validDefaultTime(defaultTime, minTime, maxTime) {
            var defaultDate = moment(defaultTime, this.timeFormat);
            var minDate = minTime ? moment(minTime, this.timeFormat) : undefined;

            var maxDate = maxTime ? moment(maxTime, this.timeFormat) : undefined;

            return defaultDate < minDate || defaultDate > maxDate ? minTime ? minTime : maxTime : defaultTime;
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                defaultTime = _props.defaultTime,
                maxTime = _props.maxTime,
                minTime = _props.minTime,
                showIcon = _props.showIcon,
                twentyFourHour = _props.twentyFourHour;


            var flatPickrOptions = {
                altInput: !twentyFourHour,
                enableTime: true,
                noCalendar: true,
                time_24hr: twentyFourHour,
                wrap: true,
                onClose: this.onPickerClose,
                onOpen: this.onPickerOpen
            };

            flatPickrOptions.defaultDate = maxTime || minTime ? this.validDefaultTime(defaultTime, minTime, maxTime) : defaultTime;

            if (maxTime) {
                flatPickrOptions.maxDate = maxTime;
            }

            if (minTime) {
                flatPickrOptions.minDate = minTime;
            }

            this.fp = flatpickr(this._container, flatPickrOptions);

            if (showIcon) {
                this.setState({
                    iconDimension: this._input.clientHeight
                });
            }
        }
    }, {
        key: 'showPicker',
        value: function showPicker() {
            this.fp.open();
        }
    }, {
        key: 'TimeSelected',
        value: function TimeSelected(selectedDates, dateStr, instance) {
            if (dateStr !== this.state.value) {
                this.props.onChange(dateStr);
                this.setState({
                    value: dateStr
                });
            }
        }
    }, {
        key: 'onPickerOpen',
        value: function onPickerOpen() {
            this.props.onFocus();
        }
    }, {
        key: 'onPickerClose',
        value: function onPickerClose(selectedDates, dateStr, instance) {
            this.TimeSelected(selectedDates, dateStr, instance);
            this.props.onBlur();
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                className = _props2.className,
                iconName = _props2.iconName,
                iconPosition = _props2.iconPosition,
                iconClassName = _props2.iconClassName,
                inputClassName = _props2.inputClassName,
                inputWrapperClassName = _props2.inputWrapperClassName,
                label = _props2.label,
                labelClassName = _props2.labelClassName,
                placeholder = _props2.placeholder,
                required = _props2.required,
                showIcon = _props2.showIcon;


            var classes = classNames('td-time-picker', className);
            var inputClasses = classNames('td-time-picker__input', inputClassName, {
                'td--icon-left': showIcon && iconPosition === 'left',
                'td--icon-right': showIcon && iconPosition === 'right'
            });
            var inputWrapperClasses = classNames('td-time-picker__input-wrapper', inputWrapperClassName);

            var labelClasses = void 0;
            var iconClasses = void 0;
            var iconStyle = void 0;

            if (label) {
                labelClasses = classNames('td-time-picker__label', labelClassName);
            }

            if (showIcon) {
                iconClasses = classNames('td-time-picker__icon-wrapper', iconClassName);
                iconStyle = {
                    height: this.state.iconDimension + 'px',
                    width: this.state.iconDimension + 'px'
                };
            }

            return React.createElement(
                'div',
                { className: classes,
                    ref: function ref(el) {
                        _this2._container = el;
                    }
                },
                label && React.createElement(
                    'span',
                    { className: labelClasses },
                    label
                ),
                React.createElement(
                    'div',
                    { className: inputWrapperClasses,
                        ref: function ref(el) {
                            _this2._input = el;
                        }
                    },
                    showIcon && iconPosition === 'left' && React.createElement(
                        'div',
                        { className: iconClasses,
                            style: iconStyle,
                            onClick: this.showPicker
                        },
                        React.createElement(Icon, { name: iconName })
                    ),
                    React.createElement('input', { className: inputClasses,
                        placeholder: placeholder,
                        required: required,
                        'data-input': true
                    }),
                    showIcon && iconPosition === 'right' && React.createElement(
                        'div',
                        { className: iconClasses,
                            style: iconStyle,
                            onClick: this.showPicker
                        },
                        React.createElement(Icon, { name: iconName })
                    )
                )
            );
        }
    }]);

    return TimePicker;
}(React.PureComponent);

var DateFormatPropType = function DateFormatPropType(props, propName, componentName) {
    if (props[propName] == null) {
        return;
    }

    if (!/^\d{1,2}:\d{1,2}$/.test(props[propName])) {
        debugger;
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
    }
};

var now = new Date();
var nextHour = (now.getHours() + 1) % 24;

TimePicker.propTypes = {
    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * User-defined default selected time with the 24-hour format `HH:mm`.
     */
    defaultTime: DateFormatPropType,

    /**
     * Adds a user-defined class to the icon wrapper element.
     */
    iconClassName: PropTypes.string,

    /**
     * Specifies which icon to display.
     */
    iconName: PropTypes.string,

    /**
     * Specifies which side of the input the icon should appear.
     */
    iconPosition: PropTypes.oneOf(['left', 'right']),

    /**
     *  Adds a user-defined class to the input element.
     */
    inputClassName: PropTypes.string,

    /**
     * Specifies the label text to be displayed above the input field.
     */
    label: PropTypes.string,

    /**
     *  Adds a user-defined class to the label element.
     */
    labelClassName: PropTypes.string,

    /**
     * User-defined maximum time with the 24-hour format `HH:mm`.
     */
    maxTime: DateFormatPropType,

    /**
     * User-defined minimum time with the 24-hour format `HH:mm`.
     */
    minTime: DateFormatPropType,

    /**
     *  Specifies the placeholder text to be displayed in the input field.
     */
    placeholder: PropTypes.string,

    /**
     *  Specifies whether the input is required to be non-empty when nested in a form.
     */
    required: PropTypes.bool,

    /**
     *  Specifies whether display an icon.
     */
    showIcon: PropTypes.bool,

    /**
     *  Specifies whether to display times in a 24-hour clock format.
     */
    twentyFourHour: PropTypes.bool,

    /**
     *  User-defined function which triggers when the picker dismisses.
     */
    onBlur: PropTypes.func,

    /**
     *  User-defined function which triggers when the selected time has changed.
     *  `function(timeString) {...}`
     */
    onChange: PropTypes.func,

    /**
     *  User-defined function which triggers when the picker appears.
     */
    onFocus: PropTypes.func

};

TimePicker.defaultProps = {
    defaultTime: nextHour + ':00',
    iconName: 'time',
    iconPosition: 'left',
    required: false,
    showIcon: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop
};

export default TimePicker;