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
        this.change = this.change.bind(this)
        this.submit = this.submit.bind(this)
        this.update = this.update.bind(this)
        this.validate = this.validate.bind(this)
        this.onValidateField = this.onValidateField.bind(this)

        this.state = {
            data: props.data === undefined ? {} : props.data,
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

    change({name, value}) {
        const data = {...this.getData()}

        if (!value) {
            delete data[name]
        } else {
            data[name] = value
        }

        this.setData(data, () => this.props.onChange(data))
    }

    getData() {
        return this.props.data === undefined
            ? this.state.data
            : this.props.data
    }

    setData(data, callback = noop) {
        if (this.props.data !== undefined) {
            callback()
            return
        }

        this.setState({data}, callback)
    }

    submit(e) {
        e && e.preventDefault()

        if (!this.validate()) {
            return
        }

        const data = this.getData()

        if (!Object.keys(data).length) {
            console.warn('[ Form ] Submitting a form without data.')
        }
        this.props.onSubmit(data)
    }

    update({name, value}) {
        const data = {...this.getData()}

        if (!value) {
            delete data[name]
            this.setData(data, () => this.props.onUpdate(data))
        } else if (data[name] !== value) {
            data[name] = value
            this.setData(data, () => this.props.onUpdate(data))
        }
    }

    validate() {
        const data = this.getData()

        const {
            validate
        } = this.props

        const error = {...this.state.error}

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
        this.setState({error})

        return Object.keys(error).length === 0
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
        const data = this.getData()

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
    submitOnEnter: PropTypes.bool,
    validate: PropTypes.func,
    validateOnUpdate: PropTypes.bool,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    onUpdate: PropTypes.func,
}

Form.defaultProps = {
    submitOnEnter: true,
    validateOnUpdate: false,
    onChange: noop,
    onSubmit: noop,
    onUpdate: noop
}

export {FormField, FormFieldGroup, FormButton}
export default Form
