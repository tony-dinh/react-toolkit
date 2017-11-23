import React from 'react'
import PropTypes from 'prop-types'

const noop = () => {}

class FormField extends React.PureComponent {
    constructor(props) {
        super(props)
        this.change = this.change.bind(this)
        this.update = this.update.bind(this)
        this.validate = this.validate.bind(this)
    }

    change(value) {
        const {
            name,
            onChange
        } = this.props

        onChange({name, value})
    }

    update(value) {
        const {
            name,
            validateOnUpdate,
            onUpdate,
            onValidate
        } = this.props

        const error = this.validate({name, value})

        if (validateOnUpdate) {
            onValidate({name, error})
        }

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
            onChange,
            onUpdate,
            onValidate,
            ...rest
        } = this.props
        return (
            <Component
                {...rest}
                error={error}
                onChange={this.change}
                onUpdate={this.update}
            />
        )
    }
}

FormField.propTypes = {
    component: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    error: PropTypes.string,
    formId: PropTypes.string,
    required: PropTypes.bool,
    validate: PropTypes.func,
    validateOnUpdate: PropTypes.bool,
    onChange: PropTypes.func,
    onUpdate: PropTypes.func,
    onValidate: PropTypes.func
}

FormField.defaultProps = {
    required: false,
    validate: noop,
    validateOnUpdate: false,
    onChange: noop,
    onUpdate: noop,
    onValidate: noop
}

export default FormField
