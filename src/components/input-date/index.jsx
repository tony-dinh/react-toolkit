import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import flatpickr from 'flatpickr'

import Input from '../input'

import '../../vendor/styles/flatpickr.min.css'

const noop = () => {}

class InputDate extends React.PureComponent {
    constructor(props) {
        super(props)

        this.fp = null
        this.getValue = this.getValue.bind(this)
        this.setValue = this.setValue.bind(this)
        this.blur = this.blur.bind(this)
        this.focus = this.focus.bind(this)

        this.state = {
            value: []
        }
    }

    componentDidMount() {
        const {
            dateFormat,
            defaultDate,
            disabledDates,
            maxDate,
            minDate,
            mode,
            onChange
        } = this.props

        this.fp = flatpickr(this._inputComponent.getInput(), {
            dateFormat,
            disable: disabledDates,
            enableTime: false,
            maxDate,
            minDate,
            mode,
            onChange: this.setValue,
            onClose: this.blur,
            onOpen: this.focus
        })
    }

    getValue() {
        const {
            value: selectedDates
        } = this.state

        let value = ''

        if (this.fp && selectedDates.length) {
            // Parse dates based on mode
            if (this.props.mode === 'single') {
                value = this.fp.formatDate(selectedDates[0], this.props.dateFormat)

            } else if (this.props.mode === 'range') {
                const earliestDate = this.fp.formatDate(selectedDates[0], this.props.dateFormat)
                const latestDate = this.fp.formatDate(selectedDates[selectedDates.length - 1], this.props.dateFormat)

                value = earliestDate !== latestDate
                    ? `${earliestDate} to ${latestDate}`
                    : earliestDate

            } else if (this.props.mode === 'multiple') {
                const formattedDates = selectedDates.map((date) => {
                    return this.fp.formatDate(date, this.props.dateFormat)
                })

                value = formattedDates.join('; ')
            }
        }

        return value
    }

    setValue(value, valueString, instance) {
        this.setState({
            value,
            valueString
        }, () => {
            this.props.onChange(value)
            this.props.onUpdate(value)
        })
    }

    blur(selectedDates, dateString, instance) {
        this._inputComponent.blur()
        this.props.onBlur()
    }

    focus() {
        this._inputComponent.focus()
        this.props.onFocus()
    }

    render() {
        const {
            className,
            dateFormat,
            defaultDate,
            disabled,
            disabledDates,
            maxDate,
            minDate,
            mode,
            onFocus,
            onBlur,
            onUpdate,
            ...rest
        } = this.props

        const value = this.getValue()
        const classes = classNames('td-input-date', className)

        return (
            <Input
                {...rest}
                className={classes}
                disabled={disabled}
                value={value}
                readonly
                ref={el => this._inputComponent = el}
            />
        )
    }
}

InputDate.propTypes = {
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
     * Specifies the date format that will be displayed in the input.
     * [Check supported formats](https://chmln.github.io/flatpickr/formatting/)
     */
    dateFormat: PropTypes.string,

    /**
     *  Sets the disable state of the input.
     */
    disabled: PropTypes.bool,

    /**
     * Provide an error message to display under the input.
     */
    error: PropTypes.string,

    /**
     * Specifies the ID of form the input belongs to if any.
     */
    formId: PropTypes.string,

    /**
     * Defines the text for the input's label.
     */
    label: PropTypes.string,

    /**
     * Specifies a lower bound for displayed dates.
     */
    minDate: PropTypes.instanceOf(Date),

    /**
     * Defines an upper bound for displayed dates.
     */
    maxDate: PropTypes.instanceOf(Date),

    /**
     * Specifies the date selection mode.
     */
    mode: PropTypes.oneOf([
        'single',
        'multiple',
        'range'
    ]),

    /**
     * Defines the name of the input.
     */
    name: PropTypes.string,

    /**
     * Defines a placeholder for the input.
     */
    placeholder: PropTypes.string,

    /**
     * Specifies the value of the input
     */
    value: PropTypes.arrayOf(PropTypes.instanceOf(Date)),

    /**
     * User-defined function which triggers when the input loses focus.
     */
    onBlur: PropTypes.func,

    /**
     * User-defined function which triggers upon every input change.
     */
    onChange: PropTypes.func,

    /**
     * User-defined function which triggers when the input focuses.
     */
    onFocus: PropTypes.func,

    /**
     * User-defined function which triggers when the input value has been set.
     */
    onUpdate: PropTypes.func
}

InputDate.defaultProps = {
    disabledDates: [],
    dateFormat: 'Y-m-d',
    mode: 'single',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onUpdate: noop
}

export default InputDate