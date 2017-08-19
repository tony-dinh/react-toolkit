import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Transition from 'react-transition-group/Transition'

import Icon from '../icon'
import List from '../list'

import './_base.scss'

const noop = () => {}

class Dropdown extends React.PureComponent {
    constructor(props) {
        super(props)

        this.blur = this.blur.bind(this)
        this.click = this.click.bind(this)
        this.onItemSelected = this.onItemSelected.bind(this)

        this.state = {
            collapsed: true
        }
    }

    click(e) {
        if (e && e.currentTarget !== e.target) {
            return
        }

        this.setState({
            collapsed: !this.state.collapsed
        })
    }

    blur(e) {
        this.setState({
            collapsed: true
        })
        this.props.onBlur(e)
    }

    onItemSelected(index, value) {
        this.blur()
        this.props.onItemSelected({index, value})
    }

    render() {
        const {
            collapsed
        } = this.state

        const {
            animationDuration,
            className,
            listClassName,
            source,
            tabIndex
        } = this.props

        const classes = classNames('td-dropdown', className, {
            'td-dropdown--collapsed': collapsed,
            'td-dropdown--expanded': !collapsed,
        })
        const iconClasses = 'td-dropdown__icon'
        const iconWrapperClasses = 'td-dropdown__icon-wrapper'
        const listClasses = classNames('td-dropdown__list', listClassName, {
            'td-dropdown--fade-in': !collapsed,
            'td-dropdown--fade-out': collapsed,
        })

        const listStyle = {
            animationDuration
        }

        return (
            <div className={classes}
                aria-expanded={!collapsed}
                tabIndex={tabIndex}
                onBlur={this.blur}
                onClick={this.click}
            >
                <div className={iconWrapperClasses}>
                    <Icon className={iconClasses} name="arrow-dropdown" />
                </div>

                <Transition
                    in={!collapsed}
                    timeout={animationDuration}
                    unmountOnExit={true}
                >
                    <List className={listClasses}
                        style={listStyle}
                        items={source}
                        onItemClicked={this.onItemSelected}
                    />
                </Transition>
            </div>
        )
    }
}

Dropdown.propTypes = {
    animationDuration: PropTypes.number,
    source: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        label: PropTypes.string
    })),

    /**
     * Specifies the tab index of the button
     */
    tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    onBlur: PropTypes.func,
    onItemSelected: PropTypes.func
}

Dropdown.defaultProps = {
    animationDuration: 250,
    source: [],
    tabIndex: 0,
    onBlur: noop,
    onFocus: noop,
    onItemSelected: noop
}


export default Dropdown