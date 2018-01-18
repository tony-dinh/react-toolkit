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

    id = `form-${uuid()}`
    state = {data: {}, error: {}}

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
                submit: this.submit,
                validate,
                validateOnUpdate,
                onChange: this.change,
                onUpdate: this.update,
                onValidate: this.onValidateField,
            }
        }
    }

    isErrorControlled = () => this.props.error !== undefined
    isDataControlled = () => this.props.data !== undefined

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
            children,
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
            if (element.type === Form.Field) {
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

            }
        }

        const formFields = (arr) => {
            let result = []
            arr.forEach((element) => {
                if (element.type === Form.Field) {
                    result.push(element)
                } else {
                    result = element.props
                        ? result.concat(formFields(React.Children.toArray(element.props.children)))
                        : result
                }
            })
            return result
        }

        formFields(React.Children.toArray(children)).forEach(validateEl)
        this.setError(error, () => { onError(error) })

        return error
    }

    onValidateField = ({name, error}) => {
        const newError = {...this.getError()}
        const {onError} = this.props

        if (!error && newError[name]) {
            delete newError[name]
            this.setError(newError, () => { onError(newError) })
        } else if (newError[name] !== error) {
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
                ref={(el) => { this._form = el }}
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
