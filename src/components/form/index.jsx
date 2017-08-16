import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import FormField from './partials/form-field'

const noop = () => {}

const uuid = (() => {
    let i = 0
    return () => {
        return i++
    }
})()

class Form extends React.PureComponent {
    constructor(props) {
        super(props)

        this.id = uuid()
        this.submit = this.submit.bind(this)
        this.update = this.update.bind(this)
        this.validate = this.validate.bind(this)
        this.onValidateField = this.onValidateField.bind(this)

        this.state = {
            data: {},
            error: {}
        }
    }

    submit() {
        if (!this.validate()) {
            return
        }

        if (!Object.keys(this.state.data).length) {
            console.warn('[ Form ] Submitting a form without data.')
        }

        this.props.onSubmit(this.state.data)
    }

    update({name, value}) {
        const data = {...this.state.data}

        if (!value) {
            delete data[name]
        } else {
            data[name] = value
        }

        this.setState({data})
    }

    validate() {
        const {
            data
        } = this.state

        // Check that data required form fields have values
        let error = {...this.state.error}
        let newError = false
        this.FormFields.forEach((field) => {
            const fieldName = field.props.name
            if (field.props.isRequired && !data[fieldName]) {
                error[fieldName] = 'Required'
                newError = true
            }
        })

        if (Object.keys(error).length) {
            newError && this.setState({error})
            return false
        }

        return true
    }

    onValidateField({name, error}) {
        const newError = {...this.state.error}

        if (!error) {
            delete newError[name]
        } else {
            newError[name] = error
        }

        this.setState({
            error: newError
        })
    }

    render() {
        const {
            error
        } = this.state

        const {
            children,
            className,
            name,
            validate
        } = this.props

        const classes = classNames('td-form', className)

        this.FormFields = React.Children.map(children, (field, index) => {
            const fieldName = field.props.name
            const fieldProps = {
                ...field.props,
                key: `${name}-${this.id}__${fieldName}`,
                error: error && error[fieldName] || null,
                validate,
                onValidate: this.onValidateField,
                onUpdate: this.update,
            }

            return React.cloneElement(field, fieldProps)
        })

        return (
            <form className={classes} onSubmit={this.submit}>
                {this.FormFields}
            </form>
        )
    }
}

const FormFieldType = (props, propName, componentName) => {
    const allowedTypes = [
        FormField
    ]

    const isValid = React.Children
        .toArray(props[propName])
        .every((child) => allowedTypes.includes(child.type))

    if (isValid) {
        return null
    }

    return new Error(`Invalid prop ${propName} supplied to ${componentName}.`);
}

Form.propTypes = {
    children: FormFieldType,
    name: PropTypes.string.isRequired,
    validate: PropTypes.func,
    onSubmit: PropTypes.func
}

Form.defaultProps = {
    onSubmit: noop
}

export {FormField}
export default Form