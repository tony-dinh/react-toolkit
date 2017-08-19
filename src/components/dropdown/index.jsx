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

    click() {
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
            source
        } = this.props

        const buttonClasses = 'td-dropdown__button'
        const classes = classNames('td-dropdown', className, {
            'td-dropdown--collapsed': collapsed,
            'td-dropdown--expanded': !collapsed,
        })
        const iconClasses = 'td-dropdown__icon'
        const listClasses = classNames('td-dropdown__list', listClassName, {
            'td-dropdown--fade-in': !collapsed,
            'td-dropdown--fade-out': collapsed,
        })

        const listStyle = {
            animationDuration
        }

        return (
            <div className={classes}
                onBlur={this.blur}
                onClick={this.click} >
                <button className={buttonClasses}
                    aria-expanded={!collapsed}
                    type="button"
                >
                    <Icon className={iconClasses} name="arrow-dropdown" />
                </button>
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
    onBlur: PropTypes.func,
    onItemSelected: PropTypes.func
}

Dropdown.defaultProps = {
    animationDuration: 250,
    source: [],
    onBlur: noop,
    onItemSelected: noop
}


export default Dropdown