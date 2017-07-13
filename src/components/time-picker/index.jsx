import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import flatpickr from 'flatpickr'

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
        this.onChange = this.onChange.bind(this)
        this.onClose = this.onClose.bind(this)

        this.state = {
            value: this.props.defaultTime
        }
    }

    componentDidMount() {
        const {
            defaultTime,
            twentyFourHour
        } = this.props

        this.fp = flatpickr(this._container, {
            altInput: !twentyFourHour,
            defaultDate: defaultTime,
            enableTime: true,
            noCalendar: true,
            time_24hr: twentyFourHour,
            wrap: true,
            onChange: this.onChange,
            onClose: this.onClose
        })
    }

    onChange(selectedDates, dateStr, instance) {
    }

    onClose(selectedDates, dateStr, instance) {
        if (dateStr !== this.state.value) {
            this.props.onChange(dateStr)
            this.setState({
                value: dateStr
            })
        }
    }

    render() {
        const {
            className,
            inputClassName,
            label,
            labelClassName,
            placeholder,
            required
        } = this.props

        const classes = classNames('td-time-picker', className)
        const inputClasses = classNames('td-time-picker__input', inputClassName)
        const inputWrapperClasses = classNames('td-time-picker__input-wrapper')
        let labelClasses

        if (label) {
            labelClasses = classNames('td-time-picker__label', labelClassName)
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

const DateFormatPropType = (props, propName, componentName) => {
    if (!/^\d{1,2}:\d{1,2}$/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
}

const now = new Date()

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
    onChange: PropTypes.func,
}

TimePicker.defaultProps = {
    defaultTime: `${now.getHours() + 1}:00`,
    required: false,
    onChange: noop
}

export default TimePicker
