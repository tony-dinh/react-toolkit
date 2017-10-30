import React from 'react'
import PropTypes from 'prop-types'
import Button from '../../../button'

const FormButton = (props) => {
    const {
        button: Button,
        ...rest
    } = props

    return <Button {...rest} />
}

FormButton.propTypes = {
    button: PropTypes.func
}

FormButton.defaultProps = {
    button: Button
}

export default FormButton
