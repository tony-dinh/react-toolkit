import React, {PropTypes} from 'react'
import Transition from 'react-transition-group/Transition'
import classNames from 'classnames'
import './_base.scss'

const noop = () => {}

const uuid = (() => {
    let i = 0
    return () => {
        return i++
    }
})()

/*******************************************************************************
                          Accordion Item Content
*******************************************************************************/

class AccordionItemContent extends React.PureComponent {
    constructor(props) {
        super(props)
        this.getContentHeight = this.getContentHeight.bind(this)
    }

    getContentHeight() {
        return this._content.children.length ? this._content.children[0].offsetHeight : 0
    }

    render() {
        const {
            children,
            style
        } = this.props

        const classes = classNames('td-accordion__item-content')

        return (
            <div className={classes}
                style={style}
                ref={(_content) => { this._content = _content }}
            >
                {children}
            </div>
        )
    }
}

/*******************************************************************************
                              Accordion Item
*******************************************************************************/

class AccordionItem extends React.PureComponent {
    constructor(props) {
        super(props)

        this.animate = this.animate.bind(this)
        this.animateOpen = this.animateOpen.bind(this)
        this.animateClose = this.animateClose.bind(this)
        this.getContentHeight = this.getContentHeight.bind(this)
        this.onAnimationComplete = this.onAnimationComplete.bind(this)

        this.state = {
            style: {
                maxHeight: '0',
                transition: 'none'
            }
        }
    }

    animateOpen() {
        const completionHandler = () => {
            this.setState({
                style: {
                    maxHeight: 'initial',
                    transition: 'none'
                }
            })
            this.onAnimationComplete()
        }

        this.animate(0, this.getContentHeight(), completionHandler)
    }

    animateClose() {
        const completionHandler = () => {
            this.onAnimationComplete()
        }

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
            open,
            onClick
        } = this.props

        const classes = classNames('td-accordion__item', className, {
            'td-accordion__item--open': open
        })

        const headerClasses = classNames('td-accordion__header', headerClassName)

        return (
            <div id={itemId} className={classes}>
                <button className={headerClasses}
                    onClick={onClick}
                    role="tab"
                    tabIndex="0"
                    type="button"
                    aria-selected={open}
                >
                    <HeaderContent />
                </button>

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
    headerContent: PropTypes.func,
    itemId: PropTypes.string,
    open: PropTypes.bool,
    onClick: PropTypes.func,
    onDidClose: PropTypes.func,
    onDidOpen: PropTypes.func
}

AccordionItem.defaultProps = {
    open: false,
    onDidClose: noop,
    onDidOpen: noop
}

/*******************************************************************************
                                  Accordion
*******************************************************************************/

class Accordion extends React.Component {
    constructor(props) {
        super(props)

        this.accordionId = `accordion-${uuid()}`
        this.onItemClick = this.onItemClick.bind(this)
        this.updateItem = this.updateItem.bind(this)

        this.state = {
            openItems: [...this.props.initialOpenItems]
        }
    }

    updateItem(index, opening) {
        if (index < 0 || index >= React.Children.count(this.props.children)) {
            return
        }

        const {multiSelect} = this.props
        let openItems = [...this.state.openItems]

        if (opening) {
            if (multiSelect) {
                openItems.push(index)
            } else {
                openItems = [index]
            }
        } else {
            if (multiSelect) {
                openItems.splice(openItems.indexOf(index), 1)
            } else {
                openItems = []
            }
        }

        this.setState({openItems})
    }

    onItemClick(index) {
        const {
            openItems
        } = this.state

        const isOpening = openItems.indexOf(index) === -1
        this.updateItem(index, isOpening)
    }

    render() {
        const {
            className,
            children,
            duration,
            easing,
            multiSelect,
            onItemOpen,
            onItemDidOpen,
            onItemClose,
            onItemDidClose,
        } = this.props

        const classes = classNames('td-accordion', className)

        return (
            <div className={classes} id={this.accordionId} aria-multiselectable={multiSelect} role="tablist">
                {React.Children.map(children, (child, index) => {
                    // Children can be undefined if they are conditionally rendered
                    if (!child) {
                        return null
                    }

                    const childId = `${this.accordionId}__item-${index}`
                    const childProps = {
                        accordionId: this.accordionId,
                        id: childId,
                        duration,
                        easing,
                        key: childId,
                        open: this.state.openItems.indexOf(index) > -1,
                        onClick: this.onItemClick.bind(this, index)
                    }

                    // Allow event hooks to be overridden
                    childProps.onOpen = childProps.onOpen || onItemOpen
                    childProps.onDidOpen = childProps.onDidOpen || onItemDidOpen
                    childProps.onClose = childProps.onClose || onItemClose
                    childProps.onDidClose = childProps.onDidClose || onItemDidClose

                    return React.cloneElement(child, childProps)
                })}
            </div>
        )
    }
}

Accordion.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.string,
    initialOpenItems: PropTypes.arrayOf(PropTypes.number),
    multiSelect: PropTypes.bool,
    onItemOpen: PropTypes.func,
    onItemDidOpen: PropTypes.func,
    onItemClose: PropTypes.func,
    onItemDidClose: PropTypes.func
}

Accordion.defaultProps = {
    initialOpenItems: [],
    duration: 250,
    easing: 'ease',
    multiSelect: false,
    onItemOpen: noop,
    onItemDidOpen: noop,
    onItemClose: noop,
    onItemDidClose: noop
}

export {Accordion, AccordionItem}
export default Accordion
