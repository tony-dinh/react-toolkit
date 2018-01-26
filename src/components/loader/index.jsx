import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import prefixAll from 'inline-style-prefixer/static'

import './_base.scss'

const RectLoader = ({className, color, count, duration}) => {
    const classes = classNames('td-rect-loader', className)
    const rectClass = 'td-rect-loader__rect'

    const rectangles = Array(count).fill()
        .map((_, index) => {
            const rectClasses = classNames(rectClass, `td--rect-${index}`)
            const delay = index !== 0
                ? -(duration) + (index * 100)
                : 0

            const rectStyle = prefixAll({
                animationDuration: `${duration}ms`,
                animationDelay: `${delay}ms`,
                backgroundColor: color
            })
            return <div key={`rect-loader__rect-${index}`} className={rectClasses} style={rectStyle} />
        })

    return (
        <div className={classes}>
            {rectangles}
        </div>
    )
}

RectLoader.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    count: PropTypes.number,
    duration: PropTypes.number
}

const LOADERS = {
    rect: RectLoader
}

const Loader = ({className, color, count, duration, name}) => {
    const Loader = LOADERS[name]
    return (
        <Loader className={className} color={color} count={count} duration={duration} />
    )
}

Loader.propTypes = {
    className: PropTypes.string,
    color: PropTypes.string,
    count: PropTypes.number,
    duration: PropTypes.number,
    name: PropTypes.oneOf(Object.keys(LOADERS))
}

Loader.defaultProps = {
    count: 3,
    color: 'black',
    name: 'rect',
    duration: 1200
}

export default Loader
