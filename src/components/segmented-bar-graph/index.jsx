import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import GraphLegend from '../graph-legend'
import SegmentedBar from './partials/segmented-bar'
import "./_base.scss"

const uuid = (() => {
    let i = 0
    return () => {
        return i++
    }
})()

const SegmentedBarGraph = ({barHeight, className, data, legend, textClassName}) => {
    const id = uuid()
    const classes = classNames('td-segmented-bar-graph', className)
    const graphClasses = classNames('td-segmented-bar-graph__graph', className)
    const barGroupClasses = 'td-segmented-bar-graph__bars'
    const labelGroupClasses = 'td-segmented-bar-graph__labels'
    const labelClasses = classNames('td-segmented-bar-graph__label', textClassName)
    const verticalRuleClasses = 'td-segmented-bar-graph__vertical-rule'
    const labelStyle = {
        height: `${barHeight}px`
    }

    const barStyle = {
        ...labelStyle,
    }

    const Labels = []
    const Bars = []

    data.forEach(({dataset, label}, index) => {
        Bars.push(<SegmentedBar dataset={dataset} key={`bar-graph-${id}__bar-${index}`} style={barStyle} />)
        Labels.push(
            <li className={labelClasses} key={`bar-graph-${id}__label-${index}`} style={labelStyle}>
                {label}
            </li>
        )
    })

    return (
        <div className={classes}>
            {legend && data && data.length > 0 &&
                <GraphLegend dataset={data[0].dataset} />
            }

            <div className={graphClasses}>
                <ul className={labelGroupClasses}>
                    {Labels}
                </ul>

                <hr className={verticalRuleClasses} />

                <ul className={barGroupClasses}>
                    {Bars}
                </ul>
            </div>
        </div>
    )
}

SegmentedBarGraph.propTypes = {
    barHeight: PropTypes.number,
    className: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
        dataset: PropTypes.array,
        label: PropTypes.string
    })),
    legend: PropTypes.bool,
    textClassName: PropTypes.string
}

SegmentedBarGraph.defaultProps = {
    barHeight: 25,
    legend: false
}

export default SegmentedBarGraph
