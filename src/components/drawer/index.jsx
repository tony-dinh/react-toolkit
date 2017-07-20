import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'

import Transition from 'react-transition-group/Transition'

import './_base.scss'
const noop = () => {}

class Drawer extends React.PureComponent {
    constructor(props) {
        super(props)

        this.close = this.close.bind(this)
        this.adjustDrawerWidth = this.adjustDrawerWidth.bind(this)
        this.animate = this.animate.bind(this)
        this.animateOpen = this.animateOpen.bind(this)
        this.animateClose = this.animateClose.bind(this)
        this.onAnimationComplete = this.onAnimationComplete.bind(this)

        const open = this.props.open != null
            ? undefined
            : false

        this.state = {
            open,
            outerStyle: {
                animationDuration: `${this.props.duration}ms`
            },
            style: null
        }
    }

    componentDidMount() {
        this.adjustDrawerWidth()
        window.addEventListener('resize', this.adjustDrawerWidth)
    }

    adjustDrawerWidth() {
        if (!this._drawer) {
            return
        }

        const width = getComputedStyle(this._drawer).width
        this.width = parseInt(width)
        this.setState({
            style: null
        })
    }

    animateOpen() {
        // Adjust the drawer width when it mounts
        this.adjustDrawerWidth()

        const completionHandler = () => {
            this.setState({
                style: {
                    width: `${this.width}px`,
                    transform: 'translateX(0)',
                    transition: 'none'
                }
            })
            this.onAnimationComplete()
        }

        this.animate(-this.width, 0, completionHandler)
    }

    animateClose() {
        const completionHandler = () => {
            this.onAnimationComplete()
        }

        this.animate(0, -this.width, completionHandler)
    }

    animate(startOffset, endOffset, completionHandler) {
        const {
            duration,
            easing
        } = this.props

        const {
            widthStyle
        } = this.state

        const animationFrame = () => new Promise((resolve) => {
            window.requestAnimationFrame(resolve)
        })

        const setStartState = () => new Promise((resolve) => {
            this.setState({
                style: {
                    width: widthStyle,
                    transform: `translateX(${startOffset}px)`,
                    transition: 'none'
                }
            }, resolve)
        })

        const setEndState = () => new Promise((resolve) => {
            this.setState({
                style: {
                    width: widthStyle,
                    transform: `translateX(${endOffset}px)`,
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

    onAnimationComplete() {
        const {
            onDidClose,
            onDidOpen
        } = this.props

        const open = this.props.open != null
            ? this.props.open
            : this.state.open

        if (open) {
            onDidOpen()
        } else {
            onDidClose()
        }
    }

    close(e) {
        if (e.currentTarget !== e.target) {
            return
        }

        if (this.props.open != null) {
            this.props.onClose()
            return
        }

        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const {
            duration,
            className,
            drawerContent,
            innerClassName,
            outerClassName,
            onDismiss
        } = this.props

        const {
            outerStyle,
            style
        } = this.state

        // Allow props to drive the state otherwise let it manage its own
        const open = this.props.open != null
            ? this.props.open
            : this.state.open

        const classes = classNames('td-drawer', className, {
            'td--drawer-open': open,
            'td--drawer-closed': !open
        })
        const innerClasses = classNames('td-drawer__inner', innerClassName)
        const outerClasses = classNames('td-drawer__outer', outerClassName, {
            'td--drawer__outer-fade-in': open,
            'td--drawer__outer-fade-out': !open
        })

        return (
            <Transition
                in={open}
                timeout={duration}
                onEnter={this.animateOpen}
                onExit={this.animateClose}
                unmountOnExit={true}
            >
                {/* Overlay */}
                <div className={outerClasses}
                    style={outerStyle}
                    onClick={this.close}
                >
                    {/* Drawer */}
                    <div className={classes}
                        style={style}
                        ref={(el) => { this._drawer = el }}
                    >
                        {/* Drawer Content Container*/}
                        <div className={innerClasses}>
                            {drawerContent}
                        </div>
                    </div>
                </div>
            </Transition>
        )
    }
}

Drawer.propTypes = {
    /**
     *  Adds a user-defined class to the drawer element.
     */
    className: PropTypes.string,

    /**
     *  An element containing the contents of the drawer.
     */
    drawerContent: PropTypes.element,

    /**
     * Specifies the animation duration in milliseconds for opening/closing the drawer.
     */
    duration: PropTypes.number,

    /**
     * Specifies the animation timing function for expanding/collapsing accordion cells.
     */
    easing: PropTypes.string,

    /**
     *  Adds a user-defined class to the drawer content container element.
     */
    innerClassName: PropTypes.string,

    /**
     * Specifies whether the drawer is opened or not.
     */
    open: PropTypes.bool,

    /**
     *  Adds a user-defined class to the overlay element.
     */
    outerClassName: PropTypes.string,

    /**
     * User-defined function which triggers when the drawer is attempting to close
     */
    onClose: PropTypes.func,

    /**
     * User-defined function which triggers when the drawer has closed
     */
    onDidClose: PropTypes.func,

    /**
     * User-defined function which triggers when the drawer has opened
     */
    onDidOpen: PropTypes.func

}

Drawer.defaultProps = {
    duration: 250,
    easing: 'ease-in-out',
    open: false,
    onClose: noop,
    onDidClose: noop,
    onDidOpen: noop
}

export default Drawer