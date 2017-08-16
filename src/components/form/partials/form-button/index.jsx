import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '../../../button'

class FormButton extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Button {...this.props} />
        )
    }
}

export default FormButton