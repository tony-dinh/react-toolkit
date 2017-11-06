import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Tab from './partials/tab'
import prefixAll from 'inline-style-prefixer/static'

import './_base.scss'

const noop = () => {}

class Tabs extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            activeIndex: 0
        }

        this.onTabSelected = this.onTabSelected.bind(this)
    }

    onTabSelected(index, value) {
        this.props.onTabSelected(index, value)

        if (this.state.activeIndex !== index) {
            this.setState({activeIndex: index}, () => { this.props.onTabChange(index, value) })
        }
    }

    render() {
        const {
            activeIndex
        } = this.state

        const {
            children,
            className,
            sliderClassName
        } = this.props

        const classes = classNames('td-tabs', className)
        const sliderClasses = classNames('td-tabs__slider', sliderClassName)

        const length = children.length
        const tabStyle = prefixAll({
            width: `${100 / length}%`
        })

        const sliderStyle = prefixAll({
            width: `${100 / length}%`,
            left: `calc(${100 / length}% * ${activeIndex})`
        })

        const TabElements = React.Children.map(children, (element, index) => (
            React.cloneElement(element, {
                active: index === activeIndex,
                style: tabStyle,
                onSelect: () => {
                    this.onTabSelected(index, element.props.value)
                    element.props.onSelect(index, element.props.value)
                }
            })
        ))

        return (
            <nav className={classes} role="tablist">
                {TabElements}
                <span className={sliderClasses} style={sliderStyle} />
            </nav>
        )
    }
}

const TabType = (props, propName, componentName) => {
    const allowedTypes = [Tab]

    const children = React.Children.toArray(props[propName])

    if (children.length === 0) {
        return new Error(`The ${componentName} component requires at least one child element.`)
    }

    const isValid = children.every((child) => allowedTypes.includes(child.type))

    if (isValid) {
        return null
    }

    return new Error(`Invalid prop ${propName} supplied to ${componentName}.`)
}

Tabs.propTypes = {
    children: TabType,
    className: PropTypes.string,
    sliderClassName: PropTypes.string,
    onTabChange: PropTypes.func,
    onTabSelected: PropTypes.func
}

Tabs.defaultProps = {
    onTabChange: noop,
    onTabSelected: noop
}

export {Tab}
export default Tabs
