import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';
import flatpickr from 'flatpickr';
import moment from 'moment';
import { isEqual } from 'lodash';

import '../../vendor/styles/flatpickr.min.css';
import './_base.scss';

var noop = function noop() {};

/**
 * ```jsx
 * import DatePicker from '@tonydinh/react-toolkit/dist/components/date-picker
 * ```
 * An date input component
 */

var DatePicker = function (_React$PureComponent) {
    _inherits(DatePicker, _React$PureComponent);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        var _this = _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));

        _this.fp = null;
        _this.onClose = _this.onClose.bind(_this);
        _this.dateFormat = 'YYYY-MM-DD';
        _this.state = {
            selectedDates: [_this.props.defaultDate],
            dateString: moment(_this.props.defaultDate).format(_this.dateFormat)
        };
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            window.moment = moment;
            var _props = this.props,
                defaultDate = _props.defaultDate,
                humanReadable = _props.humanReadable,
                maxDate = _props.maxDate,
                minDate = _props.minDate,
                mode = _props.mode,
                onChange = _props.onChange;


            this.fp = flatpickr(this._container, {
                altInput: humanReadable,
                defaultDate: defaultDate,
                enableTime: false,
                maxDate: maxDate,
                minDate: minDate,
                mode: mode,
                wrap: true,
                onChange: this.onChange,
                onClose: this.onClose
            });
        }
    }, {
        key: 'onChange',
        value: function onChange(selectedDates, dateString, instance) {
            console.log(selectedDates);
            console.log(dateString);
        }
    }, {
        key: 'onClose',
        value: function onClose(selectedDates, dateString, instance) {
            if (this.props.mode === 'single') {
                if (dateString !== this.state.dateString) {
                    this.setState({
                        dateString: dateString,
                        selectedDates: selectedDates
                    });
                    this.props.onChange(dateString, selectedDates);
                }
            } else {
                if (!isEqual(selectedDates, this.state.selectedDates) || !isEqual(dateString, this.state.dateString)) this.setState({
                    dateString: dateString,
                    selectedDates: selectedDates
                });
                this.props.onChange(dateString, selectedDates);
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
                placeholder = _props2.placeholder,
                required = _props2.required;


            var classes = classNames('td-date-picker', className);
            var inputClasses = classNames('td-date-picker__input', inputClassName);
            var inputWrapperClasses = classNames('td-date-picker__input-wrapper');
            var labelClasses = void 0;

            if (label) {
                labelClasses = 'td-date-picker__label';
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

    return DatePicker;
}(React.PureComponent);

var today = new Date();

DatePicker.propTypes = {
    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * User-defined default selected date.
     */
    defaultDate: PropTypes.instanceOf(Date),

    /**
     * Defines an array of date objects that are not be selectable.
     */
    disabledDates: PropTypes.arrayOf(PropTypes.instanceOf(Date)),

    /**
     * Specifies whether to display the date in human readable format (e.g. January 1, 2017)
     */
    humanReadable: PropTypes.bool,

    /**
     * Adds a user-defined class to the input element.
     */
    inputClassName: PropTypes.string,

    /**
     * Defines the label text to be displayed above the input field.
     */
    label: PropTypes.string,

    /**
     *  Specifies the date selection mode.
     */
    mode: PropTypes.oneOf(['single', 'multiple', 'range']),

    /**
     * Specifies a lower bound for displayed dates.
     */
    minDate: PropTypes.instanceOf(Date),

    /**
     * Defines an upper bound for displayed dates.
     */
    maxDate: PropTypes.instanceOf(Date),

    /**
     * Defines the placeholder text to be displayed in the input field.
     */
    placeholder: PropTypes.string,

    /**
     *  Specifies whether the input is required to be non-empty when nested in a form.
     */
    required: PropTypes.bool,

    /**
     *  User-defined function which triggers when the selected date has changed.
     *  `function(dateString, selectedDates) {...}`
     */
    onChange: PropTypes.func
};

DatePicker.defaultProps = {
    defaultDate: today,
    humanReadable: true,
    minDate: today,
    mode: 'single',
    onChange: noop,
    required: false
};

export default DatePicker;