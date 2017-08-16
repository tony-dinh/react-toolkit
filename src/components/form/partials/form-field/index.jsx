import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const noop = () => {}

class FormField extends React.PureComponent {
    constructor(props){
        super(props)
        this.update = this.update.bind(this)
    }

    update(value) {
        const {
            name,
            validate,
            onUpdate,
            onValidate
        } = this.props

        const error = validate({name, value})

        onValidate({name, error})
        onUpdate({name, value})
    }

    render() {
        const {
            component: Component,
            error
        } = this.props

        return (
            <Component
                error={{message: error}}
                onUpdate={this.update}
            />
        )
    }
}

FormField.PropTypes = {
    component: PropTypes.func.isRequired,
    error: PropTypes.string,
    name: PropTypes.string.isRequired,
    required: PropTypes.bool,
    validate: PropTypes.func,
    onUpdate: PropTypes.func
}

FormField.defaultProps = {
    required: false,
    validate: noop,
    onUpdate: noop
}

export default FormField