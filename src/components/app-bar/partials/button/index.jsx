import React from 'react'
import PropTypes from 'prop-types'
import BaseButton from '../../../button'
import classNames from 'classnames'

const AppBarButton = (props) => {
    const {
        className,
        ...rest
    } = props

    const classes = classNames('td-app-bar__button', className)

    return (
        <BaseButton {...rest} className={classes} />
    )
}

AppBarButton.propTypes = {
    className: PropTypes.string
}

export default AppBarButton
