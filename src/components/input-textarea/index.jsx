import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TextArea from '../textarea'

import './_base.scss'

const noop = () => {}

class InputTextArea extends React.Component {
    constructor(props) {
        super(props)

        this.setInitialBounds = this.setInitialBounds.bind(this)
        this.blur = this.blur.bind(this)
        this.change = this.change.bind(this)
        this.focus = this.focus.bind(this)
        this.resize = this.resize.bind(this)

        this.getValue = this.getValue.bind(this)
        this.setValue = this.setValue.bind(this)

        this.state = {
            focus: false,
            height: 0,
            value: typeof props.value === 'undefined' ? '' : props.value
        }
    }

    componentDidMount() {
        this.setInitialBounds()
    }

    setInitialBounds() {
        if (!this._textAreaComponent || !this._component) {
            return
        }

        const textArea = ReactDOM.findDOMNode(this._textAreaComponent)
        const textareaHeight = textArea.getBoundingClientRect().height

        this.resize(textareaHeight)
    }

    getValue() {
        return typeof this.props.value === 'undefined'
            ? this.state.value
            : this.props.value
    }

    setValue(value) {
        if (this.state.focus) {
            this.props.onChange(value)
        } else {
            this.props.onUpdate(value)
        }

        if (typeof this.props.value !== 'undefined') {
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
        })

        onBlur()
        onUpdate(this.getValue())
    }

    change(value) {
        this.setValue(value)
    }

    focus(e) {
        e && e.currentTarget.scrollIntoViewIfNeeded(true)
        this.setState({
            focus: true
        })
    }

    resize(textareaHeight) {
        this.setState({
            textareaHeight
        })
    }

    render() {
        const {
            autoFocus,
            className,
            disabled,
            error,
            formId,
            label,
            maxLength,
            name,
            placeholder,
            readOnly,
            tabIndex,
            type,
        } = this.props

        const {
            componentHeight,
            focus,
            textareaHeight
        } = this.state

        const value = this.getValue()
        const active = focus || value || error || disabled
        const classes = classNames('td-input-textarea', className, {
            'td-input-textarea--active': active,
            'td-input-textarea--disabled': disabled,
            'td-input-textarea--blur': !focus,
            'td-input-textarea--focus': focus,
            'td-input-textarea--error': error
        })
        const innerClasses = 'td-input-textarea__inner'
        const inputClasses = 'td-input-textarea__input'
        const countClasses = classNames('td-input-textarea__count', {
            'td-input-textarea--invisible': maxLength == null
        })
        const accessoryWrapperClasses = 'td-input-textarea__input-accessories'
        const decorationWrapperClasses = 'td-input-textarea__decorations'
        const errorClasses = 'td-input-textarea__error'
        const labelClasses = 'td-input-textarea__label'
        const phantomInputClasses = 'td-input-textarea__phantom-input'

        const inputStyles = active
            ? {height: `${textareaHeight}px`}
            : null

        return (
            <div className={classes} aria-disabled={disabled} ref={el => this._component = el}>
                <div className={innerClasses}>

                    {/* Input, Error, MaxLength Labels */}
                    <div className={accessoryWrapperClasses}>
                        {label &&
                            <label className={labelClasses} htmlFor={name}>
                                {label}
                            </label>
                        }
                        <div className={phantomInputClasses}></div>

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

                    <TextArea className={inputClasses}
                        autoFocus={autoFocus}
                        form={formId}
                        maxLength={maxLength}
                        name={name}
                        placeholder={placeholder}
                        readOnly={readOnly}
                        resize
                        tabIndex={disabled ? -1 : tabIndex}
                        value={value}
                        onBlur={this.blur}
                        onChange={this.change}
                        onFocus={this.focus}
                        onResize={this.resize}
                        ref={el => this._textAreaComponent = el}
                    />
                </div>
            </div>
        )
    }
}

InputTextArea.propTypes = {
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
     * Defines the text for the input's label.
     */
    label: PropTypes.string,

    /**
     * Defines a maximum length for the input.
     */
    maxLength: PropTypes.number,

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
     * Specifies the tab index of the input
     */
    tabIndex: PropTypes.number,

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
     * User-defined function which triggers when the input focuses.
     */
    onFocus: PropTypes.func,

    /**
     * User-defined function which triggers when the input value has been set.
     */
    onUpdate: PropTypes.func
}

InputTextArea.defaultProps = {
    autoFocus: false,
    disabled: false,
    readOnly: false,
    tabIndex: 0,
    type: 'text',
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onUpdate: noop
}

export default InputTextArea
