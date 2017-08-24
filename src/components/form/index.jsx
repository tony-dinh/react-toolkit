import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import FormButton from './partials/form-button'
import FormField from './partials/form-field'
import FormFieldGroup from './partials/form-field-group'

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

        this.id = `form-${uuid()}`
        this.submit = this.submit.bind(this)
        this.update = this.update.bind(this)
        this.validate = this.validate.bind(this)
        this.onValidateField = this.onValidateField.bind(this)

        this.state = {
            data: {},
            error: {}
        }
    }

    submit(e) {
        e.preventDefault()

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

        let error = {...this.state.error}
        let newError = false

        const validateEl = (element) => {
            if (!element) {
                return
            }
            // Do requirement validation on form fields (ignore buttons)
            // by checking if we have the data for that field name in our state.
            // TODO: support default values
            if (element.type === FormField) {
                const fieldName = element.props.name
                if (element.props.required && !data[fieldName]) {
                    error[fieldName] = 'Required'
                    newError = true
                }
            } else if (element.type === FormFieldGroup) {
                React.Children.forEach(element.props.children, validateEl)
            }
        }

        this.FormElements.forEach(validateEl)

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

        this.FormElements = React.Children.map(children, (element, index) => {
            switch(element.type) {
                case FormField:
                    const fieldName = element.props.name
                    const fieldProps = {
                        ...element.props,
                        key: `${name}-${this.id}__${fieldName}`,
                        error: error && error[fieldName] || null,
                        formId: this.id,
                        validate,
                        onValidate: this.onValidateField,
                        onUpdate: this.update,
                    }
                    return React.cloneElement(element, fieldProps)

                case FormFieldGroup:
                    const fieldGroupProps = {
                        ...element.props,
                        key: `${name}-${this.id}__field-group-${index}`,
                        error: error || null,
                        formId: this.id,
                        validate,
                        onValidate: this.onValidateField,
                        onUpdate: this.update,
                    }

                    return React.cloneElement(element, fieldGroupProps)

                case FormButton:
                    const buttonProps = {
                        ...element.props,
                        key: `${name}-${this.id}__button-${index}`
                    }
                    return React.cloneElement(element, buttonProps)

                default:
                    return element
            }
        })

        return (
            <form id={this.id} className={classes}
                name={name}
                onSubmit={this.submit}
            >
                {this.FormElements}
            </form>
        )
    }
}

const FormFieldType = (props, propName, componentName) => {
    const allowedTypes = [
        FormField,
        FormButton
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
    children: PropTypes.node,
    name: PropTypes.string.isRequired,
    validate: PropTypes.func,
    onSubmit: PropTypes.func
}

Form.defaultProps = {
    onSubmit: noop
}

export {FormField, FormFieldGroup, FormButton}
export default Form