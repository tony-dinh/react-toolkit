import React  from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'

import AccordionItem from './partials/accordion-item'

import './_base.scss'

const noop = () => {}

const uuid = (() => {
    let i = 0
    return () => {
        return i++
    }
})()

/**
 * ```jsx
 * import Accordion, {AccordionItem} from '@tonydinh/react-toolkit/dist/components/accordion
 * ```
 * Accordion is the container for expandable content. It is used to expand and collapse the content by clicking its header.
 */

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
    /**
     * AccordionItem Components to display in the accordion
     */
    children: PropTypes.node,

    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * Specifies the animation duration in milliseconds for expanding/collapsing accordion cells.
     */
    duration: PropTypes.number,

    /**
     * Specifies the animation timing function for expanding/collapsing accordion cells.
     */
    easing: PropTypes.string,

    /**
     * Specifies which accordion cells are open by default
     */
    initialOpenItems: PropTypes.arrayOf(PropTypes.number),

    /**
     * Enables multiple accordion cells to be expanded at a time
     */
    multiSelect: PropTypes.bool,

    /**
     * User-defined function which triggers when an accordion cell is opening.
     * ```jsx
     * function(itemId) {...}
     * ```
     */
    onItemOpen: PropTypes.func,

    /**
     * User-defined function which triggers after an accordion cell has opened.
     * ```jsx
     * function(itemId) {...}
     * ```
     */
    onItemDidOpen: PropTypes.func,

    /**
     * User-defined function which triggers when an accordion cell is closing.
     * ```jsx
     * function(itemId) {...}
     * ```
     */
    onItemClose: PropTypes.func,

    /**
     * User-defined function which triggers after an accordion cell has closed.
     * ```jsx
     * function(itemId) {...}
     * ```
     */
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

export {AccordionItem}
export default Accordion
