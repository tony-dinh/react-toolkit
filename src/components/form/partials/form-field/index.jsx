import React from 'react'
import PropTypes from 'prop-types'

const noop = () => {}

class FormField extends React.PureComponent {
    constructor(props){
        super(props)

        this.update = this.update.bind(this)
        this.validate = this.validate.bind(this)
    }

    update(value) {
        const {
            name,
            validate,
            onUpdate,
            onValidate
        } = this.props

        const error = this.validate({name, value})

        onValidate({name, error})
        onUpdate({name, value})
    }

    validate({name, value}) {
        const {
            validate,
            required
        } = this.props

        if (required && !value) {
            return 'Required'
        }

        return validate({name, value})
    }

    render() {
        const {
            component: Component,
            error,
            validate,
            onUpdate,
            onValidate,
            ...rest
        } = this.props

        return (
            <Component
                {...rest}
                error={error}
                onUpdate={this.update}
            />
        )
    }
}

FormField.PropTypes = {
    component: PropTypes.func.isRequired,
    error: PropTypes.string,
    formId: PropTypes.string.isRequired,
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