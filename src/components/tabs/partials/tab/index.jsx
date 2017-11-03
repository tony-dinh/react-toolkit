import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const noop = () => {}

const Tab = ({active, className, href, title, value, onSelect}) => {
    const disabled = !href
    const classes = classNames('td-tab', className, {
        'td-tab--active': active,
        'td-tab--disabled': disabled
    })

    return (
        <a className={classes}
            aria-selected={active}
            aria-disabled={disabled}
            aria-label={title || value}
            data-value={value}
            href={href}
            role="tab"
            onClick={onSelect}
        >
            {title}
        </a>
    )
}

Tab.propTypes = {
    value: PropTypes.string.isRequired,
    active: PropTypes.bool,
    className: PropTypes.string,
    href: PropTypes.string,
    title: PropTypes.string,
    onSelect: PropTypes.func
}

Tab.defaultProps = {
    onSelect: noop
}

export default Tab
