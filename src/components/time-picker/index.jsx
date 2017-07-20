import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import flatpickr from 'flatpickr'
import moment from 'moment'

import Icon from '../icon'

import '../../vendor/styles/flatpickr.min.css'
import './_base.scss'

const noop = () => {}

/**
 * ```jsx
 * import TimePicker from '@tonydinh/react-toolkit/dist/components/time-picker
 * ```
 * An date input component
 */

class TimePicker extends React.PureComponent {
    constructor(props) {
        super(props)

        this.fp = null
        this.timeFormat = 'HH:mm'
        this.TimeSelected = this.TimeSelected.bind(this)
        this.showPicker = this.showPicker.bind(this)
        this.onPickerClose = this.onPickerClose.bind(this)
        this.onPickerOpen = this.onPickerOpen.bind(this)
        this.validDefaultTime = this.validDefaultTime.bind(this)

        this.state = {
            iconDimension: 0,
            value: this.props.defaultTime
        }
    }

    validDefaultTime(defaultTime, minTime, maxTime) {
        const defaultDate = moment(defaultTime, this.timeFormat)
        const minDate = minTime
            ? moment(minTime, this.timeFormat)
            : undefined

        const maxDate = maxTime
            ? moment(maxTime, this.timeFormat)
            : undefined

        return defaultDate < minDate || defaultDate > maxDate
            ? minTime ? minTime : maxTime
            : defaultTime
    }

    componentDidMount() {
        const {
            defaultTime,
            maxTime,
            minTime,
            showIcon,
            twentyFourHour
        } = this.props

        const flatPickrOptions = {
            altInput: !twentyFourHour,
            enableTime: true,
            noCalendar: true,
            time_24hr: twentyFourHour,
            wrap: true,
            onClose: this.onPickerClose,
            onOpen: this.onPickerOpen
        }

        flatPickrOptions.defaultDate = maxTime || minTime
            ? this.validDefaultTime(defaultTime, minTime, maxTime)
            : defaultTime

        if (maxTime) {
            flatPickrOptions.maxDate = maxTime
        }

        if (minTime) {
            flatPickrOptions.minDate = minTime
        }

        this.fp = flatpickr(this._container, flatPickrOptions)

        if (showIcon) {
            this.setState({
                iconDimension: this._input.clientHeight
            })
        }
    }

    showPicker() {
        this.fp.open()
    }

    TimeSelected(selectedDates, dateStr, instance) {
        if (dateStr !== this.state.value) {
            this.props.onChange(dateStr)
            this.setState({
                value: dateStr
            })
        }
    }

    onPickerOpen() {
        this.props.onFocus()
    }

    onPickerClose(selectedDates, dateStr, instance) {
        this.TimeSelected(selectedDates, dateStr, instance)
        this.props.onBlur()
    }

    render() {
        const {
            className,
            iconName,
            iconPosition,
            iconClassName,
            inputClassName,
            inputWrapperClassName,
            label,
            labelClassName,
            placeholder,
            required,
            showIcon
        } = this.props

        const classes = classNames('td-time-picker', className)
        const inputClasses = classNames('td-time-picker__input', inputClassName, {
            'td--icon-left': showIcon && iconPosition === 'left',
            'td--icon-right': showIcon && iconPosition === 'right',
        })
        const inputWrapperClasses = classNames('td-time-picker__input-wrapper', inputWrapperClassName)

        let labelClasses
        let iconClasses
        let iconStyle

        if (label) {
            labelClasses = classNames('td-time-picker__label', labelClassName)
        }

        if (showIcon) {
            iconClasses = classNames('td-time-picker__icon-wrapper', iconClassName)
            iconStyle = {
                height: `${this.state.iconDimension}px`,
                width: `${this.state.iconDimension}px`
            }
        }

        return (
            <div className={classes}
                ref={(el) => { this._container = el }}
            >
                {label &&
                    <span className={labelClasses}>
                        {label}
                    </span>
                }
                <div className={inputWrapperClasses}
                    ref={(el) => { this._input = el }}
                >
                    {showIcon && iconPosition === 'left' &&
                        <Icon className={iconClasses}
                            name={iconName}
                            style={iconStyle}
                            onClick={this.showPicker}
                        />
                    }

                    <input className={inputClasses}
                        placeholder={placeholder}
                        required={required}
                        data-input
                    />

                    {showIcon && iconPosition === 'right' &&
                        <div className={iconClasses}
                            style={iconStyle}
                            onClick={this.showPicker}
                        >
                            <Icon name={iconName} />
                        </div>
                    }
                </div>
            </div>
        )
    }
}

const DateFormatPropType = (props, propName, componentName) => {
    if (props[propName] == null) {
        return
    }

    if (!/^\d{1,2}:\d{1,2}$/.test(props[propName])) {
        debugger
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
}

const now = new Date()
const nextHour = (now.getHours() + 1) % 24

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
    iconPosition: PropTypes.oneOf([
        'left',
        'right'
    ]),

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

}

TimePicker.defaultProps = {
    defaultTime: `${nextHour}:00`,
    iconName: 'time',
    iconPosition: 'left',
    required: false,
    showIcon: false,
    onBlur: noop,
    onChange: noop,
    onFocus: noop
}

export default TimePicker
