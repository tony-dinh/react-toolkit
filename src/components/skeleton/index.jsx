import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import './_base.scss'

/**
 * ```jsx
 * import Skeleton from '@tonydinh/react-toolkit/dist/components/skeleton'
 * ```
 * A skeleton component that can be customized and used as placeholders to mimic elements.
 */

const Skeleton = ({tag: Tag, className, style}) => {
    const classes = classNames('td-skeleton', className)
    return <Tag className={classes} style={style} />
}

Skeleton.propTypes = {
    /**
     * Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * Defines styles to be applied to root element.
     */
    style: PropTypes.object,

    /**
     * Specifies what HTML tag the component renders as.
     */
    tag: PropTypes.string
}

Skeleton.defaultProps = {
    tag: 'div'
}

export default Skeleton
