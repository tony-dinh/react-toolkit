import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './_base.scss'

const noop = () => {}

class Input extends React.Component {
    constructor(props) {
        super(props)

        this.setInitialBounds = this.setInitialBounds.bind(this)
        this.blur = this.blur.bind(this)
        this.change = this.change.bind(this)
        this.click = this.click.bind(this)
        this.focus = this.focus.bind(this)
        this.keypress = this.keypress.bind(this)

        this.getValue = this.getValue.bind(this)
        this.setValue = this.setValue.bind(this)

        this.state = {
            focus: false,
            height: 0,
            value: props.value === undefined
                ? ''
                : props.value
        }
    }

    componentDidMount() {
        this.setInitialBounds()
        this.props.onUpdate(this.getValue())
    }

    setInitialBounds() {
        if (!this._input || !this._component) {
            return
        }

        const componentHeight = this._component.getBoundingClientRect().height
        const inputHeight = this._input.getBoundingClientRect().height

        this.setState({
            componentHeight,
            inputHeight,
        })
    }

    getInput() {
        return this._input
    }

    getValue() {
        return this.props.value === undefined
            ? this.state.value
            : this.props.value
    }

    setValue(value) {
        if (this.state.focus) {
            this.props.onChange(value)
        } else {
            this.props.onUpdate(value)
        }

        if (this.props.value !== undefined) {
            return
        }

        this.setState({
            value
        })
    }

    blur(e) {
        const {
            onBlur,
            onUpdate
        } = this.props

        this.setState({
            focus: false
        }, () => {
            onBlur(e)
            onUpdate(this.getValue())
        })
    }

    change(e) {
        this.setValue(e.currentTarget.value)
    }

    click(e) {
        // the component is intended to be in a focus state
        // after being clicked. Some browsers don't trigger focus on a click
        !this.state.focus && this.focus()

        this.props.onClick(e)
    }

    focus(e) {
        e && e.currentTarget.scrollIntoViewIfNeeded(true)
        this.setState({
            focus: true
        })

        this.props.onFocus(e)
    }

    keypress(e) {
        this.props.onKeyPress(e)

        if (e.key === 'Enter') {
            this._input.blur()
        }
    }

    render() {
        const {
            autoFocus,
            className,
            disabled,
            error,
            formId,
            icon,
            label,
            name,
            maxLength,
            maxNum,
            minNum,
            stepValue,
            placeholder,
            readOnly,
            tabIndex,
            type,
        } = this.props

        const {
            componentHeight,
            focus,
            inputHeight
        } = this.state

        const value = this.getValue()
        const active = focus || value || error || disabled
        const classes = classNames('td-input', className, {
            'td-input--active': active || !label,
            'td-input--disabled': disabled,
            'td-input--blur': !focus,
            'td-input--focus': focus,
            'td-input--error': error,
            'td-input--with-icon': icon
        })
        const innerClasses = 'td-input__inner'
        const inputClasses = 'td-input__input'
        const countClasses = classNames('td-input__count', {
            'td-input--invisible': maxLength === null || maxLength === undefined
        })
        const accessoryWrapperClasses = 'td-input__input-accessories'
        const decorationWrapperClasses = 'td-input__decorations'
        const errorClasses = 'td-input__error'
        const labelClasses = 'td-input__label'
        const phantomInputClasses = 'td-input__phantom-input'

        const accessoryWrapperStyles = {
            height: `${componentHeight}px`
        }

        const inputStyles = active
            ? {height: `${inputHeight}px`}
            : null

        let IconComponent

        if (icon) {
            const iconClasses = classNames('td-input__icon', icon.props.className)
            IconComponent = React.cloneElement(icon, {className: iconClasses})
        }

        return (
            <div className={classes} aria-disabled={disabled} ref={(el) => { this._component = el }}>
                <div className={innerClasses}>

                    {/* Input, Error, MaxLength Labels */}
                    <div className={accessoryWrapperClasses}
                        style={accessoryWrapperStyles}
                    >
                        {label &&
                            <label className={labelClasses} htmlFor={name}>
                                {label}
                            </label>
                        }
                        <div className={phantomInputClasses} style={inputStyles} />

                        <div className={decorationWrapperClasses}>
                            {error && error.length &&
                                <span title={error} className={errorClasses}>
                                    {error}
                                </span>
                            }

                            <span className={countClasses}>
                                {`${value.length}/${maxLength}`}
                            </span>
                        </div>
                    </div>

                    {IconComponent}

                    <input className={inputClasses}
                        form={formId}
                        readOnly={readOnly}
                        tabIndex={disabled ? -1 : tabIndex}
                        type={type}
                        value={value}
                        name={name}
                        autoFocus={autoFocus}
                        maxLength={maxLength}
                        max={maxNum}
                        min={minNum}
                        step={stepValue}
                        placeholder={placeholder}
                        onFocus={this.focus}
                        onBlur={this.blur}
                        onChange={this.change}
                        onClick={this.click}
                        onKeyPress={this.keypress}
                        ref={(el) => { this._input = el }}
                    />
                </div>
            </div>
        )
    }
}

Input.propTypes = {
    /**
     * Specifies whether or not the input should auto focus when present on screen.
     */
    autoFocus: PropTypes.bool,

    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

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
     * Specifies an icon
     */
    icon: PropTypes.element,

    /**
     * Defines the text for the input's label.
     */
    label: PropTypes.string,

    /**
     * Defines the maximum length for the input.
     */
    maxLength: PropTypes.number,

    /**
     * Defines the maximum number for a `number` input type .
     */
    maxNum: PropTypes.number,

    /**
     * Defines the minimum number for a `number` input type.
     */
    minNum: PropTypes.number,

    /**
     * Defines the name of the input.
     */
    name: PropTypes.string,

    /**
     * Defines a placeholder for the input.
     */
    placeholder: PropTypes.string,

    /**
     * Specifies whether the input is read-only
     */
    readOnly: PropTypes.bool,

    /**
     * Defines the step value for a `number` input type.
     */
    stepValue: PropTypes.number,

    /**
     * Specifies the tab index of the input
     */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    /**
     * Specifies the role of the text input.
     */
    type: PropTypes.oneOf([
        'text',
        'email',
        'number',
        'password',
        'telephone'
    ]),

    /**
     * Specifies the value of the input
     */
    value: PropTypes.string,

    /**
     * User-defined function which triggers when the input loses focus.
     */
    onBlur: PropTypes.func,

    /**
     * User-defined function which triggers upon every input change.
     */
    onChange: PropTypes.func,

    /**
     * User-defined function which triggers when the input is clicked.
     */
    onClick: PropTypes.func,

    /**
     * User-defined function which triggers when the input focuses.
     */
    onFocus: PropTypes.func,

    /**
     * User-defined function which triggers when a key is pressed while focused.
     */
    onKeyPress: PropTypes.func,

    /**
     * User-defined function which triggers when the input value has been set.
     */
    onUpdate: PropTypes.func
}

Input.defaultProps = {
    autoFocus: false,
    disabled: false,
    readOnly: false,
    tabIndex: 0,
    type: 'text',
    onBlur: noop,
    onChange: noop,
    onClick: noop,
    onFocus: noop,
    onKeyPress: noop,
    onUpdate: noop
}

export default Input
