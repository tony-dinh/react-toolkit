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
        
        this.props.onUpdate(selectedItem)
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

        return (
            <div className={classes}>
                <Input 
                    className="td-input-dropdown__selection"
                    error={error}
                    readOnly
                    value={value}
                />
                <Dropdown 
                    className="td-input-dropdown__list" 
                    source={source}
                    onItemSelected={this.onChange}
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
    onUpdate: PropTypes.func
}

export default InputDropdown