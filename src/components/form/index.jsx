import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import connector from './connector'
import FormSubmit from './partials/form-submit'
import FormField from './partials/form-field'

const noop = () => {}

const uuid = (() => {
    let i = 0
    return () => {
        return i++
    }
})()

const CONTEXT = '__rt-form__'
const withForm = connector(CONTEXT)

class Form extends React.PureComponent {
    static Field = withForm(FormField)
    static SubmitTrigger = withForm(FormSubmit)

    fields = {}
    id = `form-${uuid()}`
    state = {data: {}, error: {}}

    getChildContext() {
        const {
            validate,
            validateOnUpdate
        } = this.props

        const data = this.getData()
        const error = this.getError()

        return {
            [CONTEXT]: {
                formData: data,
                formError: error,
                formId: this.id,
                register: this.registerField,
                submit: this.submit,
                unregister: this.unregisterField,
                validate,
                validateOnUpdate,
                onChange: this.change,
                onUpdate: this.update,
                onValidate: this.onValidateField,
            }
        }
    }

    isErrorControlled = () => this.props.hasOwnProperty('error')
    isDataControlled = () => this.props.hasOwnProperty('data')

    change = ({name, value}) => {
        const data = {...this.getData()}

        if (!value && data[name] !== '') {
            data[name] = ''
            this.setData(data, () => this.props.onChange(data))
        } else if (data[name] !== value) {
            data[name] = value
            this.setData(data, () => this.props.onChange(data))
        }
    }

    getData = () => {
        return this.isDataControlled()
            ? this.props.data
            : this.state.data
    }

    setData = (data, callback = noop) => {
        if (this.isDataControlled()) {
            callback()
            return
        }

        this.setState({data}, callback)
    }

    getError = () => {
        return this.isErrorControlled()
            ? this.props.error
            : this.state.error
    }

    setError = (error, callback = noop) => {
        if (this.isErrorControlled()) {
            callback()
            return
        }

        this.setState({error}, callback)
    }

    keyup = (e) => {
        const key = e.key || e.keyCode
        const isEnterKey = key === 'Enter' || key === 13

        if (isEnterKey && this.props.submitOnEnter) {
            this.submit()
        }
    }

    registerField = (component, name) => {
        this.fields[name] = component
    }

    unregisterField = (name) => {
        delete this.fields[name]
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
        if (!value && data[name] !== '') {
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
            if (!element || !element.props) {
                return
            }
            // Do requirement validation on form fields (ignore buttons)
            // by checking if we have the data for that field name in our state.
            const fieldName = element.props.name

            if (element.props.required && !data[fieldName]) {
                error[fieldName] = 'This field is required'

            } else {
                const fieldError = validate({name: fieldName, value: data[fieldName]})
                if (fieldError) {
                    error[fieldName] = fieldError
                } else {
                    delete error[fieldName]
                }
            }
        }

        for (const fieldName in this.fields) {
            if (this.fields.hasOwnProperty(fieldName)) {
                validateEl(this.fields[fieldName])
            }
        }

        this.setError(error, () => { onError(error) })

        return error
    }

    onValidateField = ({name, error}) => {
        const newError = {...this.getError()}
        const {onError} = this.props

        if (!error && newError.hasOwnProperty(name)) {
            delete newError[name]
            this.setError(newError, () => { onError(newError) })
        } else if (error && newError[name] !== error) {
            newError[name] = error
            this.setError(newError, () => { onError(newError) })
        }
    }

    render() {
        const {
            children,
            className,
            name,
        } = this.props

        const classes = classNames('td-form', className)
        return (
            <form id={this.id} className={classes}
                name={name}
                onKeyUp={this.keyup}
                onSubmit={this.submit}
            >
                {children}
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
    validate: noop,
    validateOnUpdate: false,
    onChange: noop,
    onError: noop,
    onSubmit: noop,
    onUpdate: noop,
    onValidationFail: noop,
}

Form.childContextTypes = {
    [CONTEXT]: PropTypes.object.isRequired
}

export {withForm}
export default Form
