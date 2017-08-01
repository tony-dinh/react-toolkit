import React from 'react'
import PropTypes from 'proptypes'
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
            className,
            disabled,
            href,
            iconClassName,
            iconName,
            iconPosition,
            role,
            style,
            title,
            type,
            text,
            onClick
        } = this.props

        const classes = classNames(`td-button td--${role}`, className, {
            'td--button-disabled': disabled
        })
        const innerClasses = 'td-button__inner'
        const iconClasses = classNames('td-button__icon', iconClassName)
        const textClasses = classNames('td-button__text', {
            'td--icon-text': !!iconName
        })

        const ButtonWrapper = ({children, style}) => {
            return href
            ? <a className={classes} style={style} title={title || text} href={href} onClick={onClick}>{children}</a>
            : <button className={classes} style={style} title={title || text} onClick={onClick} type={type}>{children}</button>
        }

        return (
            <ButtonWrapper style={style}>
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
            </ButtonWrapper>
        )
    }
}

Button.propTypes = {
    /**
     *  Adds a user-defined class to the root element.
     */
    className: PropTypes.string,
    /**
     *  Sets the disable state of the button
     */
    disabled: PropTypes.bool,
    href: PropTypes.string,
    iconClassName: PropTypes.string,
    iconName: PropTypes.string,
    iconPosition: PropTypes.oneOf([
        'start',
        'end'
    ]),
    role: PropTypes.oneOf([
        'primary',
        'secondary',
        'tertiary'
    ]).isRequired,
    style: PropTypes.object,
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
    role: 'primary',
    type: 'button',
}

export default Button