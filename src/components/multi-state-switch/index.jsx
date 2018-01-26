import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const noop = () => {}

class MultiStateSwitch extends React.PureComponent {
    constructor(props) {
        super(props)

        this.getSelectedIndex = this.getSelectedIndex.bind(this)
        this.onStateSelected = this.onStateSelected.bind(this)

        this.state = {
            selectedIndex: props.selectedIndex || 0
        }
    }

    getSelectedIndex() {
        return this.props.selectedIndex || this.state.selectedIndex
    }

    setSelectedIndex(index) {
        if (this.getSelectedIndex() === index) {
            return
        }

        if (this.props.selectedIndex) {
            this.props.onStateChange(index)
            return
        }

        this.setState({
            selectedIndex: index
        })
    }

    onStateSelected(e) {
        e.stopPropagation()
        this.setSelectedIndex(parseInt(e.target.dataset.index))
    }

    render() {
        const {
            className,
            states,
            switchClassName
        } = this.props

        const classes = classNames('td-multi-state-switch', className)
        const switchClasses = classNames('td-multi-state-switch__switch', switchClassName)

        const selectedIndex = this.getSelectedIndex()
        const buttonSwitches = states.map((name, index) => {
            let classes = switchClasses
            if (selectedIndex === index) {
                classes = classNames(classes, 'td-multi-state-switch--on')
            }

            return (
                <button className={classes}
                    aria-selected={true}
                    data-index={index}
                    key={index}
                    tabIndex="0"
                    onClick={this.onStateSelected}
                >
                    {name}
                </button>
            )
        })
        return (
            <div className={classes}>
                {buttonSwitches}
            </div>
        )
    }
}

MultiStateSwitch.propTypes = {
    states: PropTypes.arrayOf(PropTypes.string).isRequired,
    className: PropTypes.string,
    selectedIndex: PropTypes.number,
    switchClassName: PropTypes.string,
    onStateChange: PropTypes.func
}

MultiStateSwitch.defaultProps = {
    onStateChange: noop
}

export default MultiStateSwitch
