import React from 'react'
import PropTypes  from 'prop-types'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

import './_base.scss'

const noop = () => {}

class TextArea extends React.PureComponent {
    constructor(props) {
        super(props)

        this.resizeHeight = debounce(this.resizeHeight.bind(this), 60)
        this.getValue = this.getValue.bind(this)
        this.setValue = this.setValue.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onFocus = this.onFocus.bind(this)

        this.state = {
            value: '',
            style: null
        }
    }

    componentDidMount() {
        if (!this.props.resize) {
            return
        }
        this.resizeHeight()
        window.addEventListener('resize', this.resizeHeight)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.resizeHeight)
    }

    getValue() {
        return typeof this.props.value === 'undefined'
            ? this.state.value
            : this.props.value
    }

    setValue(value) {
        const {
            value: propValue,
            onChange
        } = this.props

        if (propValue !== null && typeof propValue !== 'undefined') {
            onChange(value)
            return
        }

        this.setState({
            value: value
        })
    }


    resizeHeight() {
        if (!this._textarea) {
            return null
        }

        // Avoid extra rendering if the scroll height hasn't changed
        const animationFrame = () => new Promise((resolve) => {
            window.requestAnimationFrame(resolve)
        })

        const setStartState = () => new Promise((resolve) => {
            this.setState({
                style: {
                    height: `auto`
                }
            }, () => {
                const newScrollHeight = this._textarea.scrollHeight

                this.setState({
                    scrollHeight: newScrollHeight,
                    style: {
                        height: `${this.state.scrollHeight}px`
                    }
                }, resolve)
            })
        })

        const setEndState = () => new Promise((resolve) => {
            this.setState({
                style: {
                    height: `${this.state.scrollHeight}px`
                }
            }, resolve)
        })

        return setStartState()
            .then(animationFrame)
            .then(setEndState)
            .then(() => {
                this.props.onResize(this.state.scrollHeight)
            })
    }

    onChange(e) {
        const value = e.currentTarget.value
        this.setValue(value)
        this.props.resize && this.resizeHeight()
    }

    onFocus() {
        this.props.onFocus()
    }

    onBlur() {
        this.props.onBlur()
    }

    render() {
        const {
            style
        } = this.state

        const {
            autoFocus,
            className,
            disabled,
            formId,
            maxLength,
            name,
            placeholder,
            readOnly,
            tabIndex
        } = this.props

        const value = this.getValue()
        const classes = classNames('td-textarea', className, {
            'td-textarea--disabled': disabled
        })

        return (
            <textarea className={classes}
                autoFocus={autoFocus}
                form={formId}
                maxLength={maxLength}
                name={name}
                placeholder={placeholder}
                readOnly={readOnly}
                style={style}
                tabIndex={tabIndex}
                value={value}
                onBlur={this.onBlur}
                onChange={this.onChange}
                onFocus={this.onFocus}
                ref={el => this._textarea = el}
            />
        )
    }
}

TextArea.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    disabled: PropTypes.bool,
    formId: PropTypes.string,
    maxLength: PropTypes.number,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    resize: PropTypes.bool,
    tabIndex: PropTypes.number,
    value: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func,
    onFocus: PropTypes.func,
    onResize: PropTypes.func
}

TextArea.defaultProps = {
    autoFocus: false,
    disabled: false,
    readOnly: false,
    resize: false,
    tabIndex: 0,
    onBlur: noop,
    onChange: noop,
    onFocus: noop,
    onResize: noop
}

export default TextArea