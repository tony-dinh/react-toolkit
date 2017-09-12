import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Button from '../button'
import AppBarButton from './partials/button'

import './_base.scss'

// Margin based on material design spec
const TITLE_LEFT_MARGIN = 72

class AppBar extends React.Component {
    setTitleStyle(style) {
        this.setState({

        })
    }

    render() {
        const {
            className,
            fixed,
            leftButton: LeftButton,
            rightButtonGroup,
            title,
        } = this.props

        const classes = classNames('td-app-bar', classNames)
        const innerClasses = 'td-app-bar__inner'
        const titleClasses = 'td-app-bar__title'
        const buttonGroupClasses = 'td-app-bar__button-group'
        const titleActionContainer = 'td-app-bar__title-container'

        const style = {position: fixed ? 'fixed' : 'relative'}
        const titleStyle = {textAlign: this.props.titleAlign}

        return (
            <header className={classes} style={style}>
                <div className={innerClasses}>
                    {LeftButton}

                    <div className={titleActionContainer}>
                        <h1 className={titleClasses}
                            style={titleStyle}
                            ref={(el) => this._title = el}
                        >
                            {title}
                        </h1>

                        {rightButtonGroup.length > 0 &&
                            <div className={buttonGroupClasses}>
                                {rightButtonGroup}
                            </div>
                        }
                    </div>
                </div>
            </header>
        )
    }
}

const AppBarButtonType = (props, propName, componentName) => {
    const allowedTypes = [
        AppBarButton
    ]

    const isValid = React.Children
        .toArray(props[propName])
        .every((child) => allowedTypes.includes(child.type))

    if (isValid) {
        return null
    }

    return new Error(`Invalid prop ${propName} supplied to ${componentName}.`);
}

AppBar.propTypes = {
    className: PropTypes.string,
    fixed: PropTypes.bool,
    leftButton: AppBarButtonType,
    rightButtonGroup: PropTypes.array,
    title: PropTypes.string,
    titleAlign: PropTypes.oneOf([
        'center',
        'left',
        'right'
    ]),
}

AppBar.defaultProps = {
    fixed: false,
    rightButtonGroup: [],
    titleAlign: 'left'
}

export {AppBar, AppBarButton}
export default AppBar
