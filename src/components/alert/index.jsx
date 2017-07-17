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
        const innerPadding = parseInt(getComputedStyle(this._innerContainer).paddingBottom)
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
            bodyLine1,
            bodyLine2,
            className,
            header,
            iconColor,
            iconName,
            innerClassName,
            showing,
            showButton,
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
        const headerClasses = 'td-alert__header'
        const bodyClasses = 'td-alert__body'
        const buttonClasses = 'td-alert__button'
        let themeColor
        let alertIconName

        if (type === 'fail') {
            alertIconName = iconName || 'close'
            themeColor = iconColor || '#e67773'
        } else if (type === 'success') {
            alertIconName = iconName || 'check'
            themeColor = iconColor || '#5dc2a0'
        }

        const style = {
            animationDuration: `${animationDuration}ms`,
            cursor: tapOutsideToDismiss ? 'pointer' : 'initial'
        }

        const themeStyle = {
            backgroundColor: themeColor || 'hsl(0, 0%, 30%)'
        }

        return (
            <Transition
                in={showing}
                timeout={animationDuration}
                onEnter={this.alertDidMount}
                unmountOnExit={true}
            >
                <div className={classes} style={style} onClick={tapOutsideToDismiss ? onDismiss : null}>
                    <div className={innerClasses}
                        style={this.state.innerStyle}
                        ref={(el) => { this._innerContainer = el }}
                    >
                        {alertIconName &&
                            <div className={iconClasses}
                                style={themeStyle}
                                ref={(el) => { this._icon = el }}
                            >
                                <Icon name={alertIconName}/>
                            </div>
                        }

                        {header &&
                            <h2 className={headerClasses}>
                                {header}
                            </h2>
                        }

                        {(bodyLine1 || bodyLine2) &&
                            <p className={bodyClasses}>
                                {bodyLine1 ? bodyLine1 : bodyLine2}
                            </p>
                        }

                        {(bodyLine1 && bodyLine2) &&
                            <p className={bodyClasses}>
                                {bodyLine2}
                            </p>
                        }

                        {showButton && onDismiss &&
                            <Button className={buttonClasses} style={themeStyle} onClick={onDismiss} text="Dismiss" />
                        }
                    </div>
                </div>
            </Transition>
        )
    }
}

Alert.propTypes = {
    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * Specifies the duration (milliseconds) of the fade-in/out animation.
     */
    animationDuration: PropTypes.number,

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
     *  Defines the header content text.
     */
    header: PropTypes.string,

    /**
     *  Defines the first line of the body content text.
     */
    bodyLine1: PropTypes.string,

    /**
     *  Defines the second line of the body content text.
     */
    bodyLine2: PropTypes.string,

    /**
     *  Specifies whether the alert is showing or not.
     */
    showing: PropTypes.bool,

    /**
     *  Specifies whether to show a button.
     */
    showButton: PropTypes.bool,

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
    showButton: true,
    tapOutsideToDismiss: true
}

export default Alert


