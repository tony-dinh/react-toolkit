import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import Transition from 'react-transition-group/Transition'

import Icon from '../icon'

import './_base.scss'

const noop = () => {}

class SlidingSheet extends React.PureComponent {
    constructor(props) {
        super(props)

        this.animate = this.animate.bind(this)
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
        this.onDismiss = this.onDismiss.bind(this)
        this.state = {
            sheetStyle: null
        }
    }

    hide() {
        const {
            direction
        } = this.props

        const end = (direction === 'right' || direction === 'down')
            ? -100
            : 100

        this.animate(0, `${end}%`)
    }

    show() {
        const {
            direction
        } = this.props

        const completionHandler = () => {
            this.setState({
                sheetStyle: {
                    transform: `translate3d(0, 0, 0)`,
                    transition: 'none'
                }
            })
        }

        const start = (direction === 'right' || direction === 'down')
            ? -100
            : 100

        this.animate(`${start}%`, 0, completionHandler)
    }

    animate(start, end, completionHandler = noop) {
        const {
            direction,
            duration,
            easing
        } = this.props

        const vertical = direction === 'up' || direction === 'down'

        const animationFrame = () => new Promise((resolve) => {
            window.requestAnimationFrame(resolve)
        })

        const setStartState = () => new Promise((resolve) => {
            this.setState({
                sheetStyle: {
                    transform: `translate3d(${vertical ? 0 : start}, ${vertical ? start : 0}, 0)`,
                    transition: 'none'
                }
            }, resolve)
        })

        const setEndState = () => new Promise((resolve) => {
            this.setState({
                sheetStyle: {
                    transform: `translate3d(${vertical ? 0 : end}, ${vertical ? end : 0}, 0)`,
                    transition: `transform ${duration}ms ${easing}`
                }
            }, resolve)
        })

        const waitForAnimation = () => {
            setTimeout(completionHandler, duration)
        }

        animationFrame()
            .then(setStartState)
            .then(animationFrame)
            .then(setEndState)
            .then(waitForAnimation)
    }

    onDismiss(e) {
        if (e.currentTarget !== e.target) {
            return
        }

        e.stopPropagation()
        this.props.onDismiss()
    }

    render() {
        const {
            sheetStyle
        } = this.state

        const {
            duration,
            className,
            children,
            direction,
            sheetClassName,
            showing,
            tapOutsideToDismiss
        } = this.props

        const classes = classNames(`td-sliding-sheet td-sliding-sheet--${direction}`, className, {
            'td-sliding-sheet--fade-in': showing,
            'td-sliding-sheet--fade-out': !showing
        })

        const innerClasses = classNames('td-sliding-sheet__sheet', sheetClassName, {
            [`td-sliding-sheet--slide-${direction}`]: showing
        })

        const overlayStyle = {
            animationDuration: duration,
            cursor: tapOutsideToDismiss ? 'pointer' : 'default'
        }

        return (
            <Transition
                in={showing}
                timeout={duration}
                onEntering={this.show}
                onExiting={this.hide}
                unmountOnExit={true}
            >
                <div className={classes} style={overlayStyle} onClick={tapOutsideToDismiss ? this.onDismiss : null}>
                    <div className={innerClasses} style={sheetStyle}>
                        {children}
                    </div>
                </div>
            </Transition>
        )
    }
}

SlidingSheet.propTypes = {
    children: PropTypes.element,
    className: PropTypes.string,
    direction: PropTypes.oneOf([
        'up',
        'down',
        'left',
        'right'
    ]),
    duration: PropTypes.number,
    easing: PropTypes.string,
    showing: PropTypes.bool,
    tapOutsideToDismiss: PropTypes.bool,
    onDismiss: PropTypes.func
}

SlidingSheet.defaultProps = {
    duration: 250,
    direction: 'up',
    easing: 'ease',
    showing: false,
    tapOutsideToDismiss: true,
    onDismiss: noop
}

export default SlidingSheet