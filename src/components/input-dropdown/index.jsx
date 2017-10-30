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
            value: '',
            label: ''
        }
    }

    blur(e) {
        e && e.persist()
        this._dropdownComponent.blur(e)
        this._inputComponent.blur(e)
    }

    change(selectedItem) {
        if (selectedItem) {
            this.setState({
                value: selectedItem.value,
                label: selectedItem.label
            })
        } else {
            this.setState({
                value: '',
                label: ''
            })
        }

        this.props.onUpdate(selectedItem)
    }

    click(e) {
        if (e && e.target !== e.currentTarget) {
            return
        }
        e && e.persist()
        this._dropdownComponent.click(e)
        this._inputComponent.focus()
    }

    focus(e) {
        e && e.persist()
        this._dropdownComponent.click()
        this._inputComponent.focus(e)
    }

    render() {
        const {
            className,
            error,
            label: inputLabel,
            name,
            placeholder,
            source,
            tabIndex
        } = this.props

        const {
            label
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
                    label={inputLabel}
                    placeholder={placeholder}
                    readOnly
                    ref={(el) => { this._inputComponent = el }}
                    tabIndex={-1}
                    value={label}
                />

                <Dropdown className={dropDownClasses}
                    listClassName={listClasses}
                    source={source}
                    tabIndex={-1}
                    onItemSelected={this.change}
                    ref={(el) => { this._dropdownComponent = el }}
                />
            </div>
        )
    }
}

InputDropdown.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    error: PropTypes.string,
    label: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    source: PropTypes.array,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onBlur: PropTypes.func,
    onFocus: PropTypes.func,
    onUpdate: PropTypes.func,
}

InputDropdown.defaultProps = {
    tabIndex: 0,
    onBlur: noop,
    onFocus: noop,
    onUpdate: noop,
}

export default InputDropdown
