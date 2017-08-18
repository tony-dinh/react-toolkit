import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Input from '../input'
import Dropdown from '../dropdown'

import './_base.scss'

const noop = () => {}

class InputDropdown extends React.PureComponent {
    constructor(props) {
        super(props)

        this.blur = this.blur.bind(this)
        this.change = this.change.bind(this)
        this.click = this.click.bind(this)

        this.state = {
            value: ''
        }
    }

    blur(e) {
        this._dropdownComponent.click()
    }

    change(selectedItem) {
        if(selectedItem) {
            this.setState({
                value: selectedItem.value
            })
        } else {
            this.setState({
                value: ''
            })
        }
        
            this.props.onUpdate(selectedItem)
    }

    click(e) {
        this._dropdownComponent.click()
    }

    render() {

        const {
            className,
            error,
            source
        } = this.props

        const {
            value
        } = this.state

        const classes = classNames('td-input-dropdown', className)
        const dropDownClasses = 'td-input-dropdown__dropdown'
        const listClasses = 'td-input-dropdown__list'

        return (
            <div className={classes}>
                <Input className="td-input-dropdown__selection"
                    error={error}
                    onClick={this.click}
                    onBlur={this.blur}
                    readOnly
                    value={value}
                />

                <Dropdown className={dropDownClasses}
                    listClassName={listClasses}
                    onItemSelected={this.change}
                    source={source}
                    ref={el => this._dropdownComponent = el}
                />
            </div>
        )
    }
}

InputDropdown.PropTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.string,
    source: PropTypes.array,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onUpdate: PropTypes.func
}

InputDropdown.defaultProps = {
    onBlur: noop,
    onFocus: noop,
    onUpdate: noop
}

export default InputDropdown