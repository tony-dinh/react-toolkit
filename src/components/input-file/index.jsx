import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './_base.scss'

const noop = () => {}

class InputFile extends React.Component {
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
            value: '',
            files: null
        }
    }

    componentDidMount() {
        this.setInitialBounds()
    }

    setInitialBounds() {
        if (!this._input || !this._component) {
            return
        }

        const componentHeight = this._component.getBoundingClientRect().height
        const inputHeight = this._input.getBoundingClientRect().height
        const verticalPadding = this._input.style.paddingTop

        this.setState({
            componentHeight,
            inputHeight,
        })
    }

    getInput() {
        return this._input
    }

    getValue() {
        return this.state.value
    }

    setValue(value, files) {
        this.props.onChange(files)
        this.setState({
            value,
            files
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

        onBlur(e)
        onUpdate(this.state.files)
    }

    change(e) {
        if (e.currentTarget !== e.target) {
            return
        }

        const fileNames = []
        const files = e.currentTarget.files.length > 0
            ? e.currentTarget.files
            : null

        if (files) {
            const length = files.length
            for (let i = 0; i < length; i++) {
                fileNames.push(files[i].name)
            }
        }

        this.setValue(fileNames.join(', '), files)
    }

    click(e) {
        // the component is intended to be in a focus state
        // after being clicked. Some browsers don't trigger focus on a click.
        !this.state.focus && this.focus()
        this._fileInput.click()
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
        if (e.key === 'Enter') {
            this._fileInput.click()
        }

        this.props.onKeyPress(e)
    }

    render() {
        const {
            accept,
            className,
            disabled,
            error,
            formId,
            label,
            multiple,
            name,
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
        const classes = classNames('td-input-file', className, {
            'td-input-file--active': active || !label,
            'td-input-file--disabled': disabled,
            'td-input-file--blur': !focus,
            'td-input-file--focus': focus,
            'td-input-file--error': error
        })
        const innerClasses = 'td-input-file__inner'
        const inputClasses = 'td-input-file__input'
        const accessoryWrapperClasses = 'td-input-file__input-accessories'
        const decorationWrapperClasses = 'td-input-file__decorations'
        const errorClasses = 'td-input-file__error'
        const labelClasses = 'td-input-file__label'
        const phantomInputClasses = 'td-input-file__phantom-input'

        const accessoryWrapperStyles = {
            height: `${componentHeight}px`
        }

        const inputStyles = active
            ? {height: `${inputHeight}px`}
            : null

        return (
            <div className={classes} aria-disabled={disabled} ref={el => this._component = el}>
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
                        <div className={phantomInputClasses} style={inputStyles}></div>

                        <div className={decorationWrapperClasses}>
                            {error && error.length &&
                                <span title={error} className={errorClasses}>
                                    {error}
                                </span>
                            }
                        </div>
                    </div>

                    <input className={inputClasses}
                        placeholder={placeholder}
                        readOnly
                        tabIndex={disabled ? -1 : tabIndex}
                        value={value}
                        onFocus={this.focus}
                        onBlur={this.blur}
                        onClick={this.click}
                        onKeyPress={this.keypress}
                        ref={el => this._input = el}
                    />

                    <input
                        accept={accept}
                        form={formId}
                        hidden
                        multiple={multiple}
                        name={name}
                        tabIndex={-1}
                        type="file"
                        onChange={this.change}
                        ref={el => this._fileInput = el}
                    />
                </div>
            </div>
        )
    }
}

InputFile.propTypes = {
    /**
     * Specifies the accepted file types by comma-separated list of extensions or MIME types (e.g ".png, .jpg, .jpeg").
     */
    accept: PropTypes.string,

    /**
     * Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * Sets the disable state of the input.
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
     * Specifies whether a user is allowed to upload multiple files.
     */
    multiple: PropTypes.bool,

    /**
     * Defines the name of the input.
     */
    name: PropTypes.string,

    /**
     * Defines a placeholder for the input.
     */
    placeholder: PropTypes.string,

    /**
     * Specifies the tab index of the input
     */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

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

InputFile.defaultProps = {
    autoFocus: false,
    disabled: false,
    multiple: false,
    readOnly: false,
    tabIndex: 0,
    onBlur: noop,
    onChange: noop,
    onClick: noop,
    onFocus: noop,
    onUpdate: noop
}

export default InputFile