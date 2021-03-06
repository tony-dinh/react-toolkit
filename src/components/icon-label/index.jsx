import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from '../icon'

import './_base.scss'

class IconLabel extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            iconSize: 0,
            labelStyle: null
        }
    }

    componentDidMount() {
        this.adjustFont()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.iconSize === this.state.iconSize) {
            return
        }
        this.adjustFont()
    }

    adjustFont() {
        if (!this._icon) {
            return
        }

        const iconSize = this._icon.getBoundingClientRect().height

        if (iconSize === this.state.iconSize) {
            return
        }

        this.setState({
            iconSize,
            labelStyle: {
                height: `${iconSize / 2}px`,
                width: `${iconSize}px`,
                lineHeight: `${iconSize / 2}px`,
                fontSize: `${iconSize / 3}px`
            }
        })
    }

    render() {
        const {
            labelStyle
        } = this.state

        const {
            className,
            icon,
            iconSize,
            label
        } = this.props

        const classes = classNames('td-icon-label', className)
        const labelClasses = 'td-icon-label__label'
        const iconClasses = 'td-icon-label__icon'
        const iconStyle = {
            height: iconSize,
            width: iconSize
        }

        return (
            <div className={classes}>
                <Icon className={iconClasses}
                    style={iconStyle}
                    name={icon}
                    iconRef={(el) => { this._icon = el }}
                />
                <span className={labelClasses} style={labelStyle}>
                    {label}
                </span>
            </div>
        )
    }
}

IconLabel.propTypes = {
    label: PropTypes.string.isRequired,
    className: PropTypes.string,
    icon: PropTypes.string,
    iconSize: PropTypes.number,
}

IconLabel.defaultProps = {
    iconSize: 44
}

export default IconLabel
