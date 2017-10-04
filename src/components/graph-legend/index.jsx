import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import "./_base.scss"

const GraphLegend = ({className, dataset, textClassName}) => {
    const classes = classNames('td-graph-legend', className)
    const itemClasses = 'td-graph-legend__entry'
    const colorSwatchClasses = 'td-graph-legend__color-swatch'

    const LegendItems = dataset.map(({background, label}, index) => {
        const style = {
            background: background
        }

        return (
            <li className={itemClasses} key={`legend-entry-${index}`}>
                <div className={colorSwatchClasses} style={style} />
                <span>{label}</span>
            </li>
        )
    })

    return (
        <ul className={classes}>
            {LegendItems}
        </ul>
    )
}

GraphLegend.propTypes = {
    className: PropTypes.string,
    dataset: PropTypes.array,
    textClassName: PropTypes.string
}

export default GraphLegend
