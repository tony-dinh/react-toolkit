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
    constructor(props) {
        super(props)

        this._mouseEnter = this._mouseEnter.bind(this)
        this._mouseLeave = this._mouseLeave.bind(this)
        this.mouseEnter = debounce(this.mouseEnter.bind(this), 250)
        this.mouseLeave = debounce(this.mouseLeave.bind(this), 250)
    }

    _mouseEnter(e) {
        e.persist()
        this.mouseEnter(e)
    }

    _mouseLeave(e) {
        e.persist()
        this.mouseLeave(e)
    }

    mouseEnter(e) {
        this.props.onMouseEnter(e)
    }

    mouseLeave(e) {
        this.props.onMouseLeave(e)
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
            onClick,
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
                : <button {...rest} onClick={onClick} type={type}>{children}</button>
        }

        return (
            <ButtonWrapper className={classes}
                style={style}
                tabIndex={disabled ? -1 : tabIndex}
                title={title || text}
                onMouseEnter={onMouseEnter && this._mouseEnter}
                onMouseLeave={onMouseLeave && this._mouseLeave}
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

    /**
     * Defines styles to be applied to root element.
     */
    style: PropTypes.object,
    tabIndex: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    textClassName: PropTypes.string,
    title: PropTypes.string,
    type: PropTypes.oneOf([
        'button',
        'submit'
    ]),
    text: PropTypes.string,
    onClick: PropTypes.func,
    onMouseEnter: PropTypes.func,
    onMouseLeave: PropTypes.func
}

Button.defaultProps = {
    disabled: false,
    iconPosition: 'start',
    tabIndex: 0,
    type: 'button'
}

export default Button