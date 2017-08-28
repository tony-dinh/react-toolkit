import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './_base.scss'

/**
 * ```jsx
 * import Card from '@tonydinh/react-toolkit/dist/components/card'
 * ```
 * The Card component resembles a tile. It is a versatile container that subcomponents can be placed within.
 */

const Card = ({children, className, style}) => {
    const classes = classNames('td-card', className)

    return (
        <div className={classes} style={style}>
            {children}
        </div>
    )
}

Card.propTypes = {
    /**
     * User-defined content to be nested within the element.
     */
    children: PropTypes.node,

    /**
     * Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * Defines styles to be applied to root element.
     */
    style: PropTypes.object,
}

export default Card