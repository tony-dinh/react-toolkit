import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';
import flatpickr from 'flatpickr';

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
        _this.onClose = _this.onClose.bind(_this);

        _this.state = {
            value: _this.props.defaultTime
        };
        return _this;
    }

    _createClass(TimePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                defaultTime = _props.defaultTime,
                twentyFourHour = _props.twentyFourHour;


            this.fp = flatpickr(this._container, {
                altInput: !twentyFourHour,
                defaultDate: defaultTime,
                enableTime: true,
                noCalendar: true,
                time_24hr: twentyFourHour,
                wrap: true,
                onClose: this.onClose
            });
        }
    }, {
        key: 'onClose',
        value: function onClose(selectedDates, dateStr, instance) {
            if (dateStr !== this.state.value) {
                this.props.onChange(dateStr);
                this.setState({
                    value: dateStr
                });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props2 = this.props,
                className = _props2.className,
                inputClassName = _props2.inputClassName,
                label = _props2.label,
                labelClassName = _props2.labelClassName,
                placeholder = _props2.placeholder,
                required = _props2.required;


            var classes = classNames('td-time-picker', className);
            var inputClasses = classNames('td-time-picker__input', inputClassName);
            var inputWrapperClasses = classNames('td-time-picker__input-wrapper');
            var labelClasses = void 0;

            if (label) {
                labelClasses = classNames('td-time-picker__label', labelClassName);
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
                    { className: inputWrapperClasses },
                    React.createElement('input', { className: inputClasses,
                        placeholder: placeholder,
                        required: required,
                        'data-input': true
                    })
                )
            );
        }
    }]);

    return TimePicker;
}(React.PureComponent);

var DateFormatPropType = function DateFormatPropType(props, propName, componentName) {
    if (!/^\d{1,2}:\d{1,2}$/.test(props[propName])) {
        return new Error('Invalid prop `' + propName + '` supplied to' + ' `' + componentName + '`. Validation failed.');
    }
};

var now = new Date();

TimePicker.propTypes = {
    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * User-defined default selected time with the format `HH:mm`.
     */
    defaultTime: DateFormatPropType,

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
     *  Specifies the placeholder text to be displayed in the input field.
     */
    placeholder: PropTypes.string,

    /**
     *  Specifies whether the input is required to be non-empty when nested in a form.
     */
    required: PropTypes.bool,

    /**
     *  Specifies whether to display times in a 24-hour clock format.
     */
    twentyFourHour: PropTypes.bool,

    /**
     *  User-defined function which triggers when the selected time has changed.
     *  `function(timeString) {...}`
     */
    onChange: PropTypes.func
};

TimePicker.defaultProps = {
    defaultTime: now.getHours() + 1 + ':00',
    required: false,
    onChange: noop
};

export default TimePicker;