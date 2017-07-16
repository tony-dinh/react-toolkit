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

import Icon from '../icon';

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

        _this.onDateSelected = _this.onDateSelected.bind(_this);
        _this.onPickerClose = _this.onPickerClose.bind(_this);
        _this.onPickerOpen = _this.onPickerOpen.bind(_this);
        _this.showPicker = _this.showPicker.bind(_this);

        _this.dateFormat = 'YYYY-MM-DD';
        _this.state = {
            iconDimension: 0,
            selectedDates: [_this.props.defaultDate],
            dateString: moment(_this.props.defaultDate).format(_this.dateFormat)
        };
        return _this;
    }

    _createClass(DatePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _props = this.props,
                defaultDate = _props.defaultDate,
                disabledDates = _props.disabledDates,
                humanReadable = _props.humanReadable,
                maxDate = _props.maxDate,
                minDate = _props.minDate,
                mode = _props.mode,
                showIcon = _props.showIcon,
                onChange = _props.onChange;


            this.fp = flatpickr(this._container, {
                altInput: humanReadable,
                defaultDate: defaultDate,
                disable: disabledDates,
                enableTime: false,
                maxDate: maxDate,
                minDate: minDate,
                mode: mode,
                wrap: true,
                onClose: this.onPickerClose,
                onOpen: this.onPickerOpen
            });

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
        key: 'onPickerOpen',
        value: function onPickerOpen() {
            this.props.onFocus();
        }
    }, {
        key: 'onPickerClose',
        value: function onPickerClose(selectedDates, dateString, instance) {
            this.onDateSelected(selectedDates, dateString, instance);
            this.props.onBlur();
        }
    }, {
        key: 'onDateSelected',
        value: function onDateSelected(selectedDates, dateString, instance) {
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
                iconClassName = _props2.iconClassName,
                iconName = _props2.iconName,
                iconPosition = _props2.iconPosition,
                inputClassName = _props2.inputClassName,
                inputWrapperClassName = _props2.inputWrapperClassName,
                label = _props2.label,
                labelClassName = _props2.labelClassName,
                placeholder = _props2.placeholder,
                required = _props2.required,
                showIcon = _props2.showIcon;


            var classes = classNames('td-date-picker', className);
            var inputClasses = classNames('td-date-picker__input', inputClassName, {
                'td--icon-left': showIcon && iconPosition === 'left',
                'td--icon-right': showIcon && iconPosition === 'right'
            });
            var inputWrapperClasses = classNames('td-date-picker__input-wrapper', inputWrapperClassName);

            var iconClasses = void 0;
            var labelClasses = void 0;
            var iconStyle = void 0;

            if (label) {
                labelClasses = classNames('td-date-picker__label', labelClassName);
            }

            if (showIcon) {
                iconClasses = classNames('td-date-picker__icon-wrapper', iconClassName);
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
     * Defines an array of dates that are not be selectable.
     */
    disabledDates: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.instanceOf(Date)), PropTypes.arrayOf(PropTypes.func)]),

    /**
     * Specifies whether to display the date in human readable format (e.g. January 1, 2017)
     */
    humanReadable: PropTypes.bool,

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
     * Adds a user-defined class to the input element.
     */
    inputClassName: PropTypes.string,

    /**
     * Defines the label text to be displayed above the input field.
     */
    label: PropTypes.string,

    /**
     * Adds a user-defined class to the label element.
     */
    labelClassName: PropTypes.string,

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
     *  Specifies whether display an icon.
     */
    showIcon: PropTypes.bool,

    /**
     *  User-defined function which triggers when the picker dismisses.
     */
    onBlur: PropTypes.func,

    /**
     *  User-defined function which triggers when the selected date has changed.
     *  `function(dateString, selectedDates) {...}`
     */
    onChange: PropTypes.func,

    /**
     *  User-defined function which triggers when the picker appears.
     */
    onFocus: PropTypes.func
};

DatePicker.defaultProps = {
    defaultDate: today,
    disabledDates: [],
    humanReadable: true,
    iconName: 'calendar',
    iconPosition: 'left',
    minDate: today,
    mode: 'single',
    required: false,
    showIcon: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop
};

export default DatePicker;