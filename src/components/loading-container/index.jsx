import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Transition from 'react-transition-group/Transition'

import Loader from '../loader'

import './_base.scss'

const LoadingContainer = ({
    children,
    className,
    loader: LoaderElement,
    loading,
    showContentWhileLoading,
    style
}) => {
    const classes = classNames('td-loading-container', className)
    const innerClasses = classNames('td-loading-container__inner', {
        'td--fade-in': loading,
        'td--fade-out': !loading
    })

    return (
        <div className={classes} style={style}>
            <Transition
                in={loading}
                timeout={250}
                unmountOnExit={true}
            >
                {LoaderElement ?
                    LoaderElement
                    :
                    <div className={innerClasses}>
                        <Loader color="white" duration={1200} />
                    </div>
                }
            </Transition>

            {((showContentWhileLoading && loading) || !loading) &&
                children
            }
        </div>
    )
}

LoadingContainer.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    loader: PropTypes.element,
    loading: PropTypes.bool,
    showContentWhileLoading: PropTypes.bool,
    /**
     * Defines styles to be applied to root element.
     */
    style: PropTypes.object
}

LoadingContainer.defaultProps = {
    loading: true,
    showContentWhileLoading: true
}

export default LoadingContainer
