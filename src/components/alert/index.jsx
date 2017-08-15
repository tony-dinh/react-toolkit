import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import Transition from 'react-transition-group/Transition'

import Icon from '../icon'
import Button from '../button'

import './_base.scss'

class Alert extends React.PureComponent {
    constructor(props) {
        super(props)

        this.alertDidMount = this.alertDidMount.bind(this)
        this.state = {
            innerStyle: null
        }
    }

    alertDidMount() {
        const iconHeight = this._icon ? parseInt(getComputedStyle(this._icon).height) : 0
        const innerPadding = parseInt(getComputedStyle(this._innerContainer).paddingLeft)
        const innerStyle = {
            paddingTop: `${(iconHeight / 2) + innerPadding}px`
        }

        this.setState({
            innerStyle
        })
    }

    render() {
        const {
            animationDuration,
            children,
            className,
            iconName,
            innerClassName,
            showing,
            tapOutsideToDismiss,
            type,
            onDismiss
        } = this.props

        const classes = classNames('td-alert', className, {
            'td-alert--fade-in': showing,
            'td-alert--fade-out': !showing
        })
        const innerClasses = classNames('td-alert__inner', innerClassName)
        const iconClasses = 'td-alert__icon'

        let themeColor = this.props.themeColor
        let alertIconName = iconName

        if (type === 'fail') {
            alertIconName = alertIconName || 'close'
            themeColor = themeColor || '#e67773'
        } else if (type === 'success') {
            alertIconName = alertIconName || 'check'
            themeColor = themeColor || '#5dc2a0'
        }

        const style = {
            animationDuration: `${animationDuration}ms`,
            cursor: onDismiss && tapOutsideToDismiss ? 'pointer' : 'initial'
        }

        const themeStyle = {
            backgroundColor: themeColor || 'hsl(0, 0%, 30%)'
        }

        return (
            <Transition
                in={showing}
                timeout={animationDuration}
                onEntering={this.alertDidMount}
                mountOnEnter={true}
                unmountOnExit={true}
            >
                <div className={classes} style={style} onClick={tapOutsideToDismiss ? onDismiss : null}>
                    <div className={innerClasses}
                        style={this.state.innerStyle}
                        ref={(el) => { this._innerContainer = el }}
                    >
                        {alertIconName &&
                            <Icon className={iconClasses}
                                style={themeStyle}
                                name={alertIconName}
                                reference={(el) => { this._icon = el }}
                            />
                        }

                        {children}

                    </div>
                </div>
            </Transition>
        )
    }
}

Alert.propTypes = {
    /**
     * The body of the alert modal.
     */
    children: PropTypes.element,

    /**
     * Specifies the duration (milliseconds) of the fade-in/out animation.
     */
    animationDuration: PropTypes.number,

    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     *  Adds a user-defined class to the inner card element.
     */
    innerClassName: PropTypes.string,

    /**
     *  Defines the color of the icon.
     */
    iconColor: PropTypes.string,

    /**
     *  Defines an icon for the alert.
     */
    iconName: PropTypes.string,

    /**
     *  Specifies whether the alert is showing or not.
     */
    showing: PropTypes.bool,

    /**
     * Specifies whether to bind the dismiss handler to the overlay.
     */
    tapOutsideToDismiss: PropTypes.bool,

    /**
     *  Applies predefined alert styles.
     */
    type: PropTypes.oneOf([
        'success',
        'fail'
    ]),

    /**
     *  User-defined function for dismissing the alert
     */
    onDismiss: PropTypes.func
}

Alert.defaultProps = {
    animationDuration: 250,
    tapOutsideToDismiss: true
}

export default Alert


