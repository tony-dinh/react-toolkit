import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Input from '../input'
import Dropdown from '../dropdown'

import './_base.scss'


class InputDropdown extends React.PureComponent {
    constructor(props) {
        super(props)

        this.onChange = this.onChange.bind(this)

        this.state = {
            value: ''
        }
    }

    onChange(selectedItem) {
        if(selectedItem) {
            this.setState({
                value: selectedItem.value
            })
        } else {
            this.setState({
                value: ''
            })
        }
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
                    readOnly
                    value={value}
                />

                <Dropdown className={dropDownClasses}
                    listClassName={listClasses}
                    source={source}
                    onItemSelected={this.onChange}
                />
            </div>
        )
    }
}

InputDropdown.PropTypes = {
    className: PropTypes.string,
    error: PropTypes.string,
    source: PropTypes.array
}

export default InputDropdown