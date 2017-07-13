import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import flatpickr from 'flatpickr'
import moment from 'moment'
import {isEqual} from 'lodash'

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
        this.onClose = this.onClose.bind(this)
        this.dateFormat = 'YYYY-MM-DD'
        this.state = {
            selectedDates: [this.props.defaultDate],
            dateString: moment(this.props.defaultDate).format(this.dateFormat)
        }
    }

    componentDidMount() {
        window.moment = moment
        const {
            defaultDate,
            humanReadable,
            maxDate,
            minDate,
            mode,
            onChange
        } = this.props

        this.fp = flatpickr(this._container, {
            altInput: humanReadable,
            defaultDate,
            enableTime: false,
            maxDate,
            minDate,
            mode,
            wrap: true,
            onChange: this.onChange,
            onClose: this.onClose
        })
    }

    onChange(selectedDates, dateString, instance) {
        console.log(selectedDates)
        console.log(dateString)
    }

    onClose(selectedDates, dateString, instance) {
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
            inputClassName,
            label,
            placeholder,
            required
        } = this.props

        const classes = classNames('td-date-picker', className)
        const inputClasses = classNames('td-date-picker__input', inputClassName)
        const inputWrapperClasses = classNames('td-date-picker__input-wrapper')
        let labelClasses

        if (label) {
            labelClasses = 'td-date-picker__label'
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
                <div className={inputWrapperClasses}>
                    <input className={inputClasses}
                        placeholder={placeholder}
                        required={required}
                        data-input
                    />
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
     *  User-defined function which triggers when the selected date has changed.
     *  `function(dateString, selectedDates) {...}`
     */
    onChange: PropTypes.func,
}

DatePicker.defaultProps = {
    defaultDate: today,
    humanReadable: true,
    minDate: today,
    mode: 'single',
    onChange: noop,
    required: false
}

export default DatePicker
