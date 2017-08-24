import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import Icon from '../icon'
import './_base.scss'

/**
 * ```jsx
 * import Button from '@tonydinh/react-toolkit/dist/components/button'
 * ```
 * A versatile button component that can be styled.
*/

class Button extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            children,
            className,
            disabled,
            href,
            iconClassName,
            iconName,
            iconPosition,
            role,
            style,
            tabIndex,
            title,
            type,
            text,
            onClick
        } = this.props

        const classes = classNames('td-button', className, {
            'td--button-disabled': disabled,
            [`td--${role}`]: role
        })
        const innerClasses = 'td-button__inner'
        const iconClasses = classNames('td-button__icon', iconClassName)
        const textClasses = classNames('td-button__text', {
            'td--icon-text': !!iconName
        })

        const ButtonWrapper = ({children, ...rest}) => {
            return href
                ? <a {...rest} href={href}>{children}</a>
                : <button {...rest} onClick={onClick} type={type}>{children}</button>
        }

        return (
            <ButtonWrapper className={classes}
                style={style}
                tabIndex={disabled ? -1 : tabIndex}
                title={title || text}
            >
                {children ?
                    children
                :
                    <div className={innerClasses}>
                        {!!iconName && iconPosition === 'start' &&
                            <Icon className={iconClasses} name={iconName} />
                        }

                        {text &&
                            <span className={textClasses}>
                                {text}
                            </span>
                        }

                        {!!iconName && iconPosition === 'end' &&
                            <Icon className={iconClasses} name={iconName} />
                        }
                    </div>
                }
            </ButtonWrapper>
        )
    }
}

Button.propTypes = {
    /**
     * User-defined custom button content to be nested within the button.
     */
    children: PropTypes.element,

    /**
     * Adds a user-defined class to the root element.
     */
    className: PropTypes.string,

    /**
     * Sets the disable state of the button.
     */
    disabled: PropTypes.bool,

    /**
     * Specifies the component to be rendered as a link, with this value set as the href.
     */
    href: PropTypes.string,

    /**
     * Adds a user-defined class to the icon element if it exists.
     */
    iconClassName: PropTypes.string,

    /**
     * Specifies the icon to be rendered within the button.
     */
    iconName: PropTypes.string,

    /**
     * Specifies where the icon should be rendered.
     */
    iconPosition: PropTypes.oneOf([
        'start',
        'end'
    ]),

    /**
     * Defines the button role, and applies its pre-defined styles.
     */
    role: PropTypes.oneOf([
        'primary',
        'secondary',
        'tertiary'
    ]),

    style: PropTypes.object,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    type: PropTypes.oneOf([
        'button',
        'submit'
    ]),
    text: PropTypes.string,
    onClick: PropTypes.func
}

Button.defaultProps = {
    disabled: false,
    iconPosition: 'start',
    tabIndex: 0,
    type: 'button',
}

export default Button