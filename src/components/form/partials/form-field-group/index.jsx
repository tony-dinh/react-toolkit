import React from 'react'
import PropTypes from 'prop-types'

import FormButton from '../form-button'
import FormField from '../form-field'

const noop = () => {}

class FormFieldGroup extends React.PureComponent {
    render() {
        const {
            className,
            children,
            data,
            error,
            formId,
            style,
            tag: Tag,
            validate,
            validateOnUpdate,
            onUpdate,
            onValidate
        } = this.props

        const FormElements = React.Children.map(children, (element, index) => {
            switch (element.type) {
                case FormField:
                    return React.cloneElement(element, {
                        ...element.props,
                        key: `${formId}__${element.props.name}`,
                        error: error && error[element.props.name] || null,
                        formId,
                        validate,
                        validateOnUpdate: element.props.validateOnUpdate || validateOnUpdate,
                        value: data[element.props.name],
                        onValidate,
                        onUpdate,
                    })

                case FormFieldGroup:
                    return React.cloneElement(element, {
                        ...element.props,
                        key: `${formId}__field-group-${index}`,
                        data,
                        error: error || null,
                        formId,
                        validate,
                        validateOnUpdate: element.props.validateOnUpdate || validateOnUpdate,
                        onValidate,
                        onUpdate,
                    })

                case FormButton:
                    return React.cloneElement(element, {
                        ...element.props,
                        key: `${formId}__button-${index}`
                    })

                default:
                    return element
            }
        })

        return (
            <Tag className={className} style={style}>
                {FormElements}
            </Tag>
        )
    }
}

FormFieldGroup.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    data: PropTypes.object,
    error: PropTypes.object,
    formId: PropTypes.string,
    style: PropTypes.object,
    tag: PropTypes.string,
    validate: PropTypes.func,
    validateOnUpdate: PropTypes.bool,
    onUpdate: PropTypes.func,
    onValidate: PropTypes.func,
}

FormFieldGroup.defaultProps = {
    tag: 'div',
    validate: noop,
    validateOnUpdate: false,
    onUpdate: noop,
    onValidate: noop
}

export default FormFieldGroup
