import React from 'react'
import PropTypes from 'prop-types'

/**
 * Custom proptype for component types
 *
 * @param {Array} allowedTypes
 */
export const componentTypes = (allowedTypes = []) => {
    const validator = (isRequired, props, propName, componentName) => {
        if (isRequired && (props[propName] === undefined || props[propName] === null)) {
            return new Error(`${propName} is marked as required (in ${componentName})`)
        }

        if (propName === 'children') {
            const children = React.Children.toArray(props[propName])
            return children.every((child) => allowedTypes.includes(child.type))
                ? null
                : new Error(`Invalid prop ${propName} supplied to ${componentName}.`)
        }

        return PropTypes.shape({type: PropTypes.oneOf(allowedTypes)})
    }

    const chainedValidator = validator.bind(null, false)
    chainedValidator.isRequired = validator.bind(null, true)

    return chainedValidator
}
