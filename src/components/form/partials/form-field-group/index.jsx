import React from 'react'
import PropTypes from 'prop-types'

import isEqual from 'lodash/isEqual'
import FormButton from '../form-button'
import FormField from '../form-field'

const noop = () => {}

class FormFieldGroup extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            className,
            children,
            error,
            formId,
            style,
            validate,
            onUpdate,
            onValidate
        } = this.props

        const FormFields = React.Children.map(children, (element, index) => {
            switch(element.type) {
                case FormField:
                    const fieldName = element.props.name
                    const fieldProps = {
                        ...element.props,
                        key: `${name}-${formId}__${fieldName}`,
                        error: error && error[fieldName] || null,
                        formId: formId,
                        validate,
                        onValidate: onValidate,
                        onUpdate: onUpdate,
                    }

                    return React.cloneElement(element, fieldProps)

                default:
                    return element
            }
        })

        return (
            <div className={className} style={style}>
                {FormFields}
            </div>
        )
    }
}

FormFieldGroup.PropTypes = {
    children: PropTypes.node,
    error: PropTypes.object,
    formId: PropTypes.string.isRequired,
    validate: PropTypes.func,
    onUpdate: PropTypes.func,
    onValidate: PropTypes.func
}

FormFieldGroup.defaultProps = {
    validate: noop,
    onUpdate: noop,
    onValidate: noop
}

export default FormFieldGroup