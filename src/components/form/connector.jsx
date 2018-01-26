import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'

const connector = (namespace) => (Component) => {
    const Wrapper = ({innerRef, ...props}, context) => {
        const contextProps = context[namespace]
        return <Component ref={innerRef} {...contextProps} {...props} />
    }
    Wrapper.contextTypes = {[namespace]: PropTypes.object.isRequired}
    Wrapper.displayName = `withForm(${Component.displayName || Component.name})`
    Wrapper.propTypes = {innerRef: PropTypes.func}
    Wrapper.WrappedComponent = Component

    return hoistNonReactStatics(Wrapper, Component)
}

export default connector
