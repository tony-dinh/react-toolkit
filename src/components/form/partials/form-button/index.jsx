import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '../../../button'

class FormButton extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            button: Button,
            ...rest
        } = this.props

        return <Button {...rest} />
    }
}

FormButton.propTypes = {
    button: PropTypes.func
}

FormButton.defaultProps = {
    button: Button
}

export default FormButton