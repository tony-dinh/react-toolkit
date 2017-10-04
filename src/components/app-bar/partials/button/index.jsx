import React from 'react'
import ReactDOM from 'react-dom'
import BaseButton from '../../../button'
import classNames from 'classnames'

class AppBarButton extends React.Component {
    render() {
        const {
            className,
            ...rest
        } = this.props

        const classes = classNames('td-app-bar__button', className)

        return (
            <BaseButton {...rest} className={classes} />
        )
    }
}

export default AppBarButton
