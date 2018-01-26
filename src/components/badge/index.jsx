import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './_base.scss'

class Badge extends React.PureComponent {
    constructor(props) {
        super(props)

        this.state = {
            style: null
        }
    }

    componentDidMount() {
        if (!this._badge) {
            return
        }

        const badgeHeight = this._badge.getBoundingClientRect().height
        this.setState({
            style: {
                borderRadius: `${badgeHeight / 2}px`,
                minWidth: `${badgeHeight}px`
            }
        })
    }

    render() {
        const {
            style
        } = this.state

        const {
            className,
            text,
            title
        } = this.props

        const classes = classNames('td-badge', className)
        return (
            <span className={classes}
                style={style}
                title={title}
                ref={(el) => { this._badge = el }}
            >
                {text}
            </span>
        )
    }
}

Badge.propTypes = {
    className: PropTypes.string,
    text: PropTypes.string,
    title: PropTypes.string
}

export default Badge
