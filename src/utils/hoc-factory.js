import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'

export const contextWrapFactory = (contextName, wrapperName = 'Wrapped') => (Component) => {
    const Wrapper = ({innerRef, ...props}, context) => {
        const contextProps = context[contextName]
        return <Component ref={innerRef} {...contextProps} {...props} />
    }
    Wrapper.contextTypes = {[contextName]: PropTypes.object.isRequired}
    Wrapper.displayName = `${wrapperName}(${Component.displayName || Component.name})`
    Wrapper.propTypes = {innerRef: PropTypes.func}
    Wrapper.WrappedComponent = Component

    return hoistNonReactStatics(Wrapper, Component)
}
