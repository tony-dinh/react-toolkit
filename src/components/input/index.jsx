import React from 'react'
import PropTypes from 'proptypes'
import prefixAll from 'inline-style-prefixer/static'
import classNames from 'classnames'

import './_base.scss'

const noop = () => {}

class Input extends React.Component {
    constructor(props) {
        super(props)

        this.adjustLabelTopPosition = this.adjustLabelTopPosition.bind(this)
        this.animateLabel = this.animateLabel.bind(this)
        this.onBlur = this.onBlur.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onFocus = this.onFocus.bind(this)

        this.state = {
            isFocused: false,
            value: '',
            initialTop: 'initial',
            labelStyle: {
                top: 'initial'
            }
        }
    }

    componentDidMount() {
        this.adjustLabelTopPosition()
    }

    adjustLabelTopPosition() {
        if (!this._label) {
            return
        }

        const initialTop = getComputedStyle(this._label).top
        this.setState({
            initialTop: initialTop
        })
    }

    onChange(e) {
        const value = e.currentTarget.value
        this.props.onValueChanged(value)
        this.setState({value})
    }

    onFocus(e) {
        e.currentTarget.scrollIntoViewIfNeeded(true)
        this.animateLabel('up')
        this.setState({
            isFocused: true
        })
    }

    onBlur(e) {
        this.animateLabel('down')
        this.setState({
            isFocused: false
        })
    }

    animateLabel(direction) {
        const {
            initialTop,
            value
        } = this.state

        // Don't animate if there is already text
        if (value) {
            return
        }

        const isUp = direction === 'up'
        const startTop = isUp
            ? initialTop
            : '0px'

        const endTop = isUp
            ? '0px'
            : initialTop


        const animationFrame = () => new Promise((resolve) => {
            window.requestAnimationFrame(resolve)
        })

        const setStartState = () => new Promise((resolve) => {
            this.setState({
                labelStyle: {
                    top: startTop
                }
            }, resolve)
        })

        const setEndState = () => new Promise((resolve) => {
            this.setState({
                labelStyle: {
                    top: endTop
                }
            }, resolve)
        })

        animationFrame()
            .then(setStartState)
            .then(animationFrame)
            .then(setEndState)
    }

    render() {
        const {
            className,
            autoFocus,
            label,
            name,
            maxLength,
            type,
        } = this.props

        const {
            isFocused,
            value,
            labelStyle
        } = this.state

        const classes = classNames('td-input', className, {
            'td-input--active': isFocused || value
        })
        const innerClasses = 'td-input__inner'
        const prefixedLabelStyle = prefixAll(labelStyle)

        return (
            <div className={classes} ref={(el) => { this._component = el }}>
                <div className={innerClasses}>
                    {label &&
                        <span style={prefixedLabelStyle} className='td-input__label'
                            ref={(el) => { this._label = el }}
                        >
                            {label}
                        </span>
                    }
                    <input className='td-input__field'
                        type={type}
                        value={value}
                        name={name}
                        autoFocus={autoFocus}
                        maxLength={maxLength}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onChange={this.onChange}
                    />
                </div>
                <span className={`td-input__highlight-bar ${isFocused ? 'td--focus' : ''}`}></span>

                {maxLength &&
                    <span className='td-input__input-count'>
                        {`${value.length}/${maxLength}`}
                    </span>
                }
            </div>
        )
    }
}

Input.propTypes = {
    autoFocus: PropTypes.bool,
    name: PropTypes.string,
    maxLength: PropTypes.number,
    type: PropTypes.oneOf([
        'text',
        'email',
        'number',
        'telephone'
    ]),
    onValueChanged: PropTypes.func
}

Input.defaultProps = {
    autoFocus: false,
    type: 'text',
    onValueChanged: noop
}

export default Input