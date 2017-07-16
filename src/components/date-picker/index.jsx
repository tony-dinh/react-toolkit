import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import flatpickr from 'flatpickr'
import moment from 'moment'
import {isEqual} from 'lodash'

import Icon from '../icon'

import '../../vendor/styles/flatpickr.min.css'
import './_base.scss'

const noop = () => {}

/**
 * ```jsx
 * import DatePicker from '@tonydinh/react-toolkit/dist/components/date-picker
 * ```
 * An date input component
 */

class DatePicker extends React.PureComponent {
    constructor(props) {
        super(props)
        this.fp = null

        this.onDateSelected = this.onDateSelected.bind(this)
        this.onPickerClose = this.onPickerClose.bind(this)
        this.onPickerOpen = this.onPickerOpen.bind(this)
        this.showPicker = this.showPicker.bind(this)

        this.dateFormat = 'YYYY-MM-DD'
        this.state = {
            iconDimension: 0,
            selectedDates: [this.props.defaultDate],
            dateString: moment(this.props.defaultDate).format(this.dateFormat)
        }
    }

    componentDidMount() {
        const {
            defaultDate,
            disabledDates,
            humanReadable,
            maxDate,
            minDate,
            mode,
            showIcon,
            onChange
        } = this.props

        this.fp = flatpickr(this._container, {
            altInput: humanReadable,
            defaultDate: defaultDate,
            disable: disabledDates,
            enableTime: false,
            maxDate,
            minDate,
            mode,
            wrap: true,
            onClose: this.onPickerClose,
            onOpen: this.onPickerOpen
        })

        if (showIcon) {
            this.setState({
                iconDimension: this._input.clientHeight
            })
        }
    }

    showPicker() {
        this.fp.open()
    }

    onPickerOpen() {
        this.props.onFocus()
    }

    onPickerClose(selectedDates, dateString, instance) {
        this.onDateSelected(selectedDates, dateString, instance)
        this.props.onBlur()
    }

    onDateSelected(selectedDates, dateString, instance) {
        if (this.props.mode === 'single') {
            if (dateString !== this.state.dateString) {
                this.setState({
                    dateString,
                    selectedDates
                })
                this.props.onChange(dateString, selectedDates)
            }
        } else {
            if (!isEqual(selectedDates, this.state.selectedDates) || !isEqual(dateString, this.state.dateString))
            this.setState({
                dateString,
                selectedDates
            })
            this.props.onChange(dateString, selectedDates)
        }
    }

    render() {
        const {
            className,
            iconClassName,
            iconName,
            iconPosition,
            inputClassName,
            inputWrapperClassName,
            label,
            labelClassName,
            placeholder,
            required,
            showIcon
        } = this.props

        const classes = classNames('td-date-picker', className)
        const inputClasses = classNames('td-date-picker__input', inputClassName, {
            'td--icon-left': showIcon && iconPosition === 'left',
            'td--icon-right': showIcon && iconPosition === 'right',
        })
        const inputWrapperClasses = classNames('td-date-picker__input-wrapper', inputWrapperClassName)

        let iconClasses
        let labelClasses
        let iconStyle

        if (label) {
            labelClasses = classNames('td-date-picker__label', labelClassName)
        }

        if (showIcon) {
            iconClasses = classNames('td-date-picker__icon-wrapper', iconClassName)
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
                        <div className={iconClasses}
                            style={iconStyle}
                            onClick={this.showPicker}
                        >
                            <Icon name={iconName} />
                        </div>
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

const today = new Date()

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
    disabledDates: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.instanceOf(Date)),
        PropTypes.arrayOf(PropTypes.func)
    ]),

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
    iconPosition: PropTypes.oneOf([
        'left',
        'right'
    ]),

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
    mode: PropTypes.oneOf([
        'single',
        'multiple',
        'range'
    ]),

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
}

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
}

export default DatePicker
