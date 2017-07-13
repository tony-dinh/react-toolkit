import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'

import Icon from '../icon'
import './_base.scss'

/**
 * ```jsx
 * import Button from '@tonydinh/react-toolkit/dist/components/button
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
            iconName,
            role,
            title,
            type,
            text,
            onClick
        } = this.props

        const classes = classNames(`td-button td--${role}`, className, {
            'td--button-disabled': disabled
        })
        const innerClasses = 'td-button__inner'
        const iconClasses = 'td-button__icon'
        const textClasses = classNames('td-button__text', {
            'td--icon-text': !!iconName
        })

        const ButtonWrapper = ({children}) => {
            return href
            ? <a className={classes} href={href} onClick={onClick}>{children}</a>
            : <button className={classes} title={title} onClick={onClick} type={type}>{children}</button>
        }

        return (
            <ButtonWrapper>
                <div className={innerClasses}>
                    {!!iconName &&
                        <div className={iconClasses}>
                            <Icon name={iconName} />
                        </div>
                    }
                    {(text || title) &&
                        <span className={textClasses}>
                            {text || title}
                        </span>
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
    iconName: React.PropTypes.string,
    role: PropTypes.oneOf([
        'primary',
        'secondary',
        'tertiary'
    ]).isRequired,
    type: PropTypes.oneOf([
        'button',
        'submit'
    ]),
    text: PropTypes.string,
    onClick: PropTypes.func
}

Button.defaultProps = {
    type: 'button',
    role: 'primary',
    disabled: false
}

export default Button