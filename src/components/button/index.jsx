import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import debounce from 'lodash/debounce'

import Icon from '../icon'
import './_base.scss'

const noop = () => {}

/**
 * ```jsx
 * import Button from '@tonydinh/react-toolkit/dist/components/button'
 * ```
 * A versatile button component that can be styled.
*/

class Button extends React.PureComponent {
    _mouseEnter = (e) => {
        e.persist()
        this.props.onMouseEnter(e)
    }

    _mouseLeave = (e) => {
        e.persist()
        this.props.onMouseLeave(e)
    }

    mouseEnter = debounce(this._mouseEnter, 250)
    mouseLeave = debounce(this._mouseLeave, 250)

    click = (e) => {
        e.persist()
        this.props.onClick(e)
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
            textClassName,
            onMouseEnter,
            onMouseLeave
        } = this.props

        const classes = classNames('td-button', className, {
            'td--button-disabled': disabled,
            [`td--${role}`]: role
        })
        const innerClasses = 'td-button__inner'
        const iconClasses = classNames('td-button__icon', iconClassName)
        const textClasses = classNames('td-button__text', textClassName, {
            'td--icon-text': !!iconName
        })

        const ButtonWrapper = ({children, ...rest}) => {
            return href
                ? <a {...rest} href={href}>{children}</a>
                : <button {...rest} type={type}>{children}</button>
        }

        return (
            <ButtonWrapper className={classes}
                style={style}
                tabIndex={disabled ? -1 : tabIndex}
                title={title || text}
                onClick={this.click}
                onMouseEnter={onMouseEnter && this.mouseEnter}
                onMouseLeave={onMouseLeave && this.mouseLeave}
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
    children: PropTypes.node,

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

    /**
     * Defines styles to be applied to root element.
     */
    style: PropTypes.object,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    text: PropTypes.string,
    textClassName: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf([
        'button',
        'submit'
    ]),
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
}

Button.defaultProps = {
    disabled: false,
    iconPosition: 'start',
    tabIndex: 0,
    type: 'button',
    onClick: noop,
    onMouseEnter: noop,
    onMouseLeave: noop
}

export default Button
