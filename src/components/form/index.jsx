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
        this.state = {
            data: {},
            error: {}
        }
    }

    componentDidMount() {
        if (!this.props.submitOnEnter) {
            return
        }

        this._form.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                this.submit()
            }
        })
    }

    change = ({name, value}) => {
        const data = {...this.getData()}

        if (!value) {
            data[name] = ''
        } else {
            data[name] = value
        }

        this.setData(data, () => this.props.onChange(data))
    }

    getData = () => {
        return this.props.data === undefined
            ? this.state.data
            : this.props.data
    }

    setData = (data, callback = noop) => {
        if (this.props.data !== undefined) {
            callback()
            return
        }

        this.setState({data}, callback)
    }

    getError = () => {
        return this.props.error === undefined
            ? this.state.error
            : this.props.error
    }

    setError = (error, callback = noop) => {
        if (this.props.error !== undefined) {
            callback()
            return
        }

        this.setState({error}, callback)
    }

    submit = (e) => {
        const {
            onSubmit,
            onValidationFail
        } = this.props

        e && e.preventDefault()

        const errors = this.validate()
        if (Object.keys(errors).length !== 0) {
            onValidationFail(errors)
            return
        }

        const data = this.getData()

        if (!Object.keys(data).length) {
            console.warn('[ Form ] Submitting a form without data.')
        }
        onSubmit(data)
    }

    update = ({name, value}) => {
        const data = {...this.getData()}

        if (!value) {
            data[name] = ''
            this.setData(data, () => this.props.onUpdate(data))
        } else if (data[name] !== value) {
            data[name] = value
            this.setData(data, () => this.props.onUpdate(data))
        }
    }

    validate = () => {
        const data = this.getData()

        const {
            validate,
            onError
        } = this.props

        const error = {...this.getError()}

        const validateEl = (element) => {
            if (!element) {
                return
            }
            // Do requirement validation on form fields (ignore buttons)
            // by checking if we have the data for that field name in our state.
            if (element.type === FormField) {
                const fieldName = element.props.name

                if (element.props.required && !data[fieldName]) {
                    error[fieldName] = 'Required'
                } else {
                    const fieldError = validate({name: fieldName, value: data[fieldName]})
                    if (fieldError) {
                        error[fieldName] = fieldError
                    } else {
                        delete error[fieldName]
                    }
                }

            } else if (element.type === FormFieldGroup) {
                React.Children.forEach(element.props.children, validateEl)
            }
        }

        this.FormElements.forEach(validateEl)
        this.setError(error, () => { onError(error) })

        return error
    }

    onValidateField = ({name, error}) => {
        const newError = {...this.getError()}
        const {onError} = this.props

        if (!error) {
            delete newError[name]
        } else {
            newError[name] = error
        }

        this.setError(newError, () => { onError(newError) })
    }

    render() {
        const {
            children,
            className,
            name,
            validate,
            validateOnUpdate
        } = this.props

        const classes = classNames('td-form', className)
        const data = this.getData()
        const error = this.getError()

        this.FormElements = React.Children.map(children, (element, index) => {
            switch (element.type) {
                case FormField:
                    return React.cloneElement(element, {
                        ...element.props,
                        key: `${name}-${this.id}__${element.props.name}`,
                        error: error && error[element.props.name] || null,
                        formId: this.id,
                        validate,
                        validateOnUpdate: element.props.validateOnUpdate || validateOnUpdate,
                        value: data[element.props.name],
                        onChange: this.change,
                        onUpdate: this.update,
                        onValidate: this.onValidateField,
                    })

                case FormFieldGroup:
                    return React.cloneElement(element, {
                        ...element.props,
                        key: `${name}-${this.id}__field-group-${index}`,
                        data,
                        error: error || null,
                        formId: this.id,
                        validate,
                        validateOnUpdate: element.props.validateOnUpdate || validateOnUpdate,
                        onChange: this.change,
                        onUpdate: this.update,
                        onValidate: this.onValidateField,
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
                ref={(el) => { this._form = el }}
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
    data: PropTypes.object,
    error: PropTypes.object,
    submitOnEnter: PropTypes.bool,
    validate: PropTypes.func,
    validateOnUpdate: PropTypes.bool,
    onChange: PropTypes.func,
    onError: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdate: PropTypes.func,
    onValidationFail: PropTypes.func,
}

Form.defaultProps = {
    submitOnEnter: true,
    validateOnUpdate: false,
    onChange: noop,
    onError: noop,
    onSubmit: noop,
    onUpdate: noop,
    onValidationFail: noop,
}

export {FormField, FormFieldGroup, FormButton}
export default Form
