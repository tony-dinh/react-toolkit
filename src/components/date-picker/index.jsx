import React, {PropTypes} from 'react'
import classNames from 'classnames'
import flatpickr from 'flatpickr'

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
    }

    componentDidMount() {
        const {
            defaultDate,
            humanReadable,
            minDate,
            maxDate,
            onChange
        } = this.props

        this.fp = flatpickr(this._container, {
            altInput: humanReadable,
            defaultDate,
            enableTime: false,
            minDate,
            maxDate,
            wrap: true,
            onChange
        })
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

const DatePropType = PropTypes.oneOfType([
    PropTypes.instanceOf(Date),
    PropTypes.string
])

DatePicker.propTypes = {
    defaultDate: DatePropType,
    disabledDates: PropTypes.arrayOf(DatePropType),
    humanReadable: PropTypes.bool,
    label: PropTypes.string,
    mode: PropTypes.oneOf([
        'single',
        'multiple',
        'range'
    ]),
    minDate: DatePropType,
    maxDate: DatePropType,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    onChange: PropTypes.func,
}

DatePicker.defaultProps = {
    defaultDate: 'today',
    humanReadable: true,
    minDate: 'today',
    mode: 'single',
    onChange: noop,
    required: false
}

export default DatePicker
