import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const SegmentedBar = ({className, dataset, style}) => {
    const classes = classNames('td-segmented-bar', className)
    const segmentClasses = 'td-segmented-bar__segment'
    const Segments = dataset.map(({background, value}, index) => {
        if (value > 100) {
            throw new Error(`SegmentedBar expects a value in the range [0, 100] but received ${value}`)
        }

        const style = {
            background,
            width: `calc(${50 * value / 100}% - ${(dataset.length - 1) * 4 / dataset.length}px)`
        }

        return (
            <div className={segmentClasses} key={`segment-${index}`} style={style} title={value} />
        )
    })

    return (
        <li className={classes} style={style}>
            {Segments}
        </li>
    )
}

SegmentedBar.propTypes = {
    className: PropTypes.string,
    dataset: PropTypes.arrayOf(PropTypes.shape({
        background: PropTypes.string,
        value: PropTypes.number
    })),
    style: PropTypes.object
}

export default SegmentedBar
