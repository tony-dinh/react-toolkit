import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

import Icon from '../icon'

import './_base.scss'

const noop = () => {}

class Checkbox extends React.PureComponent {
    constructor(props) {
        super(props)

        this.adjustSize = debounce(this.adjustSize.bind(this), 100)
        this.onKeyPress = this.onKeyPress.bind(this)

        this.state = {
            style: null,
            minRect: null
        }
    }

    componentDidMount() {
        this.adjustSize()
        window.addEventListener('resize', this.adjustSize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.adjustSize)
    }

    adjustSize() {
        if (!this._checkboxContainer) {
            return
        }

        const boundingRect = this._checkboxContainer.getBoundingClientRect()

        const height = boundingRect.height
        const width = boundingRect.width
        const minRect = height < width
            ? height
            : width

        // Prevent unecessary re-renders
        if (minRect === this.state.minRect) {
            return
        }

        const computedStyle = getComputedStyle(this._checkboxContainer)
        const paddingTop = parseInt(computedStyle.paddingTop)
        const paddingBottom = parseInt(computedStyle.paddingBottom)
        const paddingLeft = parseInt(computedStyle.paddingLeft)
        const paddingRight = parseInt(computedStyle.paddingRight)

        // Determine the largest padding to avoid checkbox's size
        // conflicting with available space
        const maxVPadding = paddingTop > paddingBottom ? paddingTop : paddingBottom
        const maxHPadding = paddingLeft > paddingRight ? paddingLeft : paddingRight
        const maxPadding = maxVPadding > maxHPadding ? maxVPadding : maxHPadding

        this.setState({
            style: {
                opacity: '1',
                height: `${minRect - maxPadding * 2}px`,
                width: `${minRect - maxPadding * 2}px`
            },
            minRect
        })
    }

    onKeyPress(e) {
        if (e.key === 'Enter') {
            this.props.onToggle(e)
        }
    }

    render() {
        const {
            style
        } = this.state

        const {
            className,
            checkedClassName,
            checked,
            inputClassName,
            name,
            onToggle
        } = this.props

        const classes = classNames('td-checkbox', className)
        const inputClasses = classNames('td-checkbox__input', inputClassName, {
            [classNames('td--checkbox-checked', checkedClassName)] : checked
        })
        const iconClasses = 'td-checkbox__icon'

        return (
            <div className={classes}
                onClick={onToggle}
                ref={el => this._checkboxContainer = el}
            >
                <span className={inputClasses}
                    style={style}
                    aria-checked={checked}
                    role="checkbox"
                    tabIndex="0"
                    onKeyPress={this.onKeyPress}
                >
                    {checked &&
                        <Icon className={iconClasses} name="check" />
                    }
                    <input
                        checked={checked}
                        name={name}
                        style={{display: 'none'}}
                        type="checkbox"
                        onChange={onToggle}
                    />
                </span>
            </div>
        )
    }
}

Checkbox.propTypes = {
    className: PropTypes.string,
    checkedClassName: PropTypes.string,
    inputClassName: PropTypes.string,
    checked: PropTypes.bool,
    name: PropTypes.string,
    onToggle: PropTypes.func
}

Checkbox.defaultProps = {
    checked: false,
    onToggle: noop
}


export default Checkbox