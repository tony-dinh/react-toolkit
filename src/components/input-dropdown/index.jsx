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
        this.focus = this.focus.bind(this)

        this.state = {
            value: ''
        }
    }

    blur(e) {
        this._dropdownComponent.blur()
        this._inputComponent.blur()
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
        this._inputComponent.focus()
    }

    focus(e) {
        this._dropdownComponent.click()
        this._inputComponent.focus()
    }

    render() {

        const {
            className,
            error,
            label,
            name,
            source,
            tabIndex
        } = this.props

        const {
            value
        } = this.state

        const classes = classNames('td-input-dropdown', className)
        const dropDownClasses = 'td-input-dropdown__dropdown'
        const listClasses = 'td-input-dropdown__list'
        const selectionClasses = 'td-input-dropdown__selection'

        return (
            <div className={classes}
                name={name}
                tabIndex={tabIndex}
                onClick={this.click}
                onBlur={this.blur}
            >
                <Input className={selectionClasses}
                    error={error}
                    label={label}
                    readOnly
                    ref={el => this._inputComponent = el}
                    tabIndex='-1'
                    value={value}
                />

                <Dropdown className={dropDownClasses}
                    listClassName={listClasses}
                    onItemSelected={this.change}
                    source={source}
                    tabIndex='-1'
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
    label: PropTypes.string,
    name: PropTypes.string,
    source: PropTypes.array,
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onUpdate: PropTypes.func,
    tabIndex: PropTypes.string
}

InputDropdown.defaultProps = {
    onBlur: noop,
    onFocus: noop,
    onUpdate: noop,
    tabIndex: '0'
}

export default InputDropdown