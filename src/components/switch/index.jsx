import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'

import './_base.scss'

const noop = () => {}

class Switch extends React.PureComponent {
    constructor(props) {
        super(props)

        this.adjustKnobSize = this.adjustKnobSize.bind(this)
        this.toggle = this.toggle.bind(this)
        this.onChange = this.onChange.bind(this)

        this.state = {
            on: !!(this.props.on),
            knobStyle: {
                height: '0px',
                width: '0px',
                borderRadius: '0px',
            },
            switchStyle: {
                height: `${this.props.height}px`,
                width: `${this.props.height * 2}px`,
                borderRadius: `${this.props.height / 2}px`,
            }
        }
    }

    componentDidMount() {
        this.adjustKnobSize()
    }

    adjustKnobSize() {
        const switchStyles = getComputedStyle(this._inner)
        const switchHeight = parseInt(switchStyles.height)
        const knobHeight = switchHeight - (parseInt(switchStyles.paddingTop) + parseInt(switchStyles.paddingBottom))

        this.setState({
            knobStyle: {
                height: `${knobHeight}px`,
                width: `${knobHeight}px`,
                borderRadius: `${knobHeight/2}px`,
            }
        })
    }

    toggle() {
        if (this.props.on != null) {
            this.onChange(!this.props.on)
            return
        }

        this.setState({
            on: !this.state.on
        }, () => { this.onChange(this.state.on) })
    }

    onChange(on) {
        this.props.onChange(on)
    }

    render() {
        const {
            knobStyle,
            switchStyle
        } = this.state

        const {
            disabled,
            showText
        } = this.props

        // Use props to drive the state, otherwise let it manage its own state.
        const on  = this.props.on != null
            ? this.props.on
            : this.state.on

        const classes = classNames('td-switch', {
            'td--switch-on': on,
            'td--switch-off': !on,
            'td--switch-disabled': disabled
        })
        const innerClasses = 'td-switch__inner'
        const knobClasses = classNames('td-switch__knob')

        let knobText
        if (showText) {
            knobText = on ? 'on' : 'off'
        }

        return (
            <div className={classes} style={switchStyle} onClick={this.toggle}>
                <div className={innerClasses} ref={(el) => { this._inner = el }}>
                    <div className={knobClasses} style={knobStyle}>
                        {showText && knobText}
                    </div>
                </div>
            </div>
        )
    }
}

Switch.propTypes = {
    disabled: PropTypes.bool,
    height: PropTypes.number,
    on: PropTypes.bool,
    showText: PropTypes.bool,
    onChange: PropTypes.func
}

Switch.defaultProps = {
    disabled: false,
    height: 44,
    showText: false,
    onChange: noop
}

export default Switch