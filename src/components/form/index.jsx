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

        const error = {...this.state.error}
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
            validate,
            validateOnUpdate
        } = this.props

        const classes = classNames('td-form', className)

        this.FormElements = React.Children.map(children, (element, index) => {
            switch (element.type) {
                case FormField:
                    return React.cloneElement(element, {
                        ...element.props,
                        key: `${name}-${this.id}__${element.props.name}`,
                        error: error && error[element.props.name] || null,
                        formId: this.id,
                        validate,
                        validateOnUpdate,
                        onValidate: this.onValidateField,
                        onUpdate: this.update,
                    })

                case FormFieldGroup:
                    return React.cloneElement(element, {
                        ...element.props,
                        key: `${name}-${this.id}__field-group-${index}`,
                        error: error || null,
                        formId: this.id,
                        validate,
                        validateOnUpdate,
                        onValidate: this.onValidateField,
                        onUpdate: this.update,
                    })

                case FormButton:
                    return React.cloneElement(element, {
                        ...element.props,
                        key: `${name}-${this.id}__button-${index}`,
                        formId: this.id,
                    })

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

Form.propTypes = {
    name: PropTypes.string.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
    validate: PropTypes.func,
    validateOnUpdate: PropTypes.bool,
    onSubmit: PropTypes.func
}

Form.defaultProps = {
    validateOnUpdate: false,
    onSubmit: noop
}

export {FormField, FormFieldGroup, FormButton}
export default Form
