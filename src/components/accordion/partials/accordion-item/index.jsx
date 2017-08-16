import React  from 'react'
import PropTypes from 'prop-types'
import Transition from 'react-transition-group/Transition'
import classNames from 'classnames'

import AccordionItemContent from '../accordion-item-content'

const noop = () => {}

class AccordionItem extends React.PureComponent {
    constructor(props) {
        super(props)

        this.animate = this.animate.bind(this)
        this.animateOpen = this.animateOpen.bind(this)
        this.animateClose = this.animateClose.bind(this)
        this.getContentHeight = this.getContentHeight.bind(this)
        this.onAnimationComplete = this.onAnimationComplete.bind(this)
        this.onClick = this.onClick.bind(this)

        this.state = {
            style: {
                maxHeight: '0',
                transition: 'none'
            }
        }
    }

    onClick(e) {
        if (e.currentTarget !== e.target) {
            return
        }

        this.props.onClick()
    }

    animateOpen() {
        const {
            onOpen,
            itemId
        } = this.props

        const completionHandler = () => {
            this.setState({
                style: {
                    maxHeight: 'initial',
                    transition: 'none'
                }
            })
            this.onAnimationComplete()
        }

        onOpen(itemId)
        this.animate(0, this.getContentHeight(), completionHandler)
    }

    animateClose() {
        const {
            onClose,
            itemId
        } = this.props

        const completionHandler = () => {
            this.onAnimationComplete()
        }

        onClose(itemId)
        this.animate(this.getContentHeight(), 0, completionHandler)
    }

    animate(startHeight, endHeight, completionHandler) {
        const {
            duration,
            easing
        } = this.props

        const animationFrame = () => new Promise((resolve) => {
            window.requestAnimationFrame(resolve)
        })

        const setStartState = () => new Promise((resolve) => {
            this.setState({
                style: {
                    maxHeight: `${startHeight}px`,
                    transition: 'none'
                }
            }, resolve)
        })

        const setEndState = () => new Promise((resolve) => {
            this.setState({
                style: {
                    maxHeight: `${endHeight}px`,
                    transition: `max-height ${duration}ms ${easing}`
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

    getContentHeight() {
        return this._content.getContentHeight()
    }

    onAnimationComplete() {
        const {
            open,
            onDidOpen,
            onDidClose,
            itemId
        } = this.props

        if (open) {
            onDidOpen(itemId)
        } else {
            onDidClose(itemId)
        }
    }

    render() {
        const {
            className,
            children,
            duration,
            easing,
            headerClassName,
            headerContent: HeaderContent,
            itemId,
            open
        } = this.props

        const classes = classNames('td-accordion__item', className, {
            'td-accordion__item--open': open
        })

        const headerClasses = classNames('td-accordion__header', headerClassName)
        const headerInnerClasses = 'td-accordion__header-inner'

        return (
            <div id={itemId} className={classes}>
                <div className={headerClasses}
                    role="tab"
                    tabIndex="0"
                    aria-selected={open}
                    onClick={this.onClick}
                >
                    <div className={headerInnerClasses}>
                        {HeaderContent}
                    </div>
                </div>

                <Transition
                    in={open}
                    timeout={duration}
                    onEnter={this.animateOpen}
                    onExit={this.animateClose}
                    unmountOnExit={true}
                >
                    <AccordionItemContent
                        style={this.state.style}
                        ref={(el) => {this._content = el}}
                    >
                        {children}
                    </AccordionItemContent>
                </Transition>
            </div>
        )
    }
}

AccordionItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    duration: PropTypes.number,
    easing: PropTypes.string,
    headerClassName: PropTypes.string,
    headerContent: PropTypes.element,
    itemId: PropTypes.string,
    open: PropTypes.bool,
    onClick: PropTypes.func,
    onClose: PropTypes.func,
    onOpen: PropTypes.func,
    onDidClose: PropTypes.func,
    onDidOpen: PropTypes.func
}

AccordionItem.defaultProps = {
    open: false,
    duration: 250,
    easing: 'ease',
    onClose: noop,
    onOpen: noop,
    onDidClose: noop,
    onDidOpen: noop
}

export default AccordionItem