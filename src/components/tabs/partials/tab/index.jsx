import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const noop = () => {}

const Tab = ({active, className, href, style, label, value, onNavigate, onSelect}) => {
    const disabled = !href
    const classes = classNames('td-tab', className, {
        'td-tab--active': active,
        'td-tab--disabled': disabled
    })

    const onClick = (e) => {
        onSelect()

        if (typeof onNavigate === 'function' && href) {
            e.preventDefault()
            onNavigate(href)
        }
    }

    return (
        <a className={classes}
            aria-selected={active}
            aria-disabled={disabled}
            aria-label={label || value}
            data-value={value}
            href={href}
            role="tab"
            style={style}
            onClick={onClick}
        >
            {label}
        </a>
    )
}

Tab.propTypes = {
    value: PropTypes.string.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    href: PropTypes.string,
    label: PropTypes.string,
    style: PropTypes.object,
    onNavigate: PropTypes.func,
    onSelect: PropTypes.func
}

Tab.defaultProps = {
    onSelect: noop
}

export default Tab
