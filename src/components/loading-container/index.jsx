import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import Transition from 'react-transition-group/Transition'

import Loader from '../loader'

import './_base.scss'

class LoadingContainer extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            animationDuration,
            className,
            children,
            loaderColor,
            loading,
            showContentWhileLoading,
            style
        } = this.props

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
                    <div className={innerClasses}>
                        <Loader color={loaderColor} duration={animationDuration} />
                    </div>
                </Transition>

                {showContentWhileLoading &&
                    children
                }
            </div>
        )
    }
}

LoadingContainer.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    animationDuration: PropTypes.number,
    loaderColor: PropTypes.string,
    loading: PropTypes.bool,
    showContentWhileLoading: PropTypes.bool,
    style: PropTypes.object
}

LoadingContainer.defaultProps = {
    animationDuration: 1200,
    loaderColor: "white",
    loading: true,
    showContentWhileLoading: true
}

export default LoadingContainer
