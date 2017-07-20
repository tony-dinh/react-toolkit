import React from 'react'
import PropTypes from 'proptypes'
import classNames from 'classnames'
import './theme.scss'

const CalendarIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const CheckCircleIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
        </svg>
    )
}

const CheckIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
        </svg>
    )
}

const ChevronLeftIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const ChevronRightIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}


const CloseIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}


const ErrorCircleIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
        </svg>
    )
}

const FileIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M6 2c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6H6zm7 7V3.5L18.5 9H13z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const TimeIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
        </svg>
    )
}

const TimerIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M15 1H9v2h6V1zm-4 13h2V8h-2v6zm8.03-6.61l1.42-1.42c-.43-.51-.9-.99-1.41-1.41l-1.42 1.42C16.07 4.74 14.12 4 12 4c-4.97 0-9 4.03-9 9s4.02 9 9 9 9-4.03 9-9c0-2.12-.74-4.07-1.97-5.61zM12 20c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
        </svg>
    )
}

const ICONS = {
    'calendar': CalendarIcon,
    'check': CheckIcon,
    'check-circle': CheckCircleIcon,
    'close': CloseIcon,
    'error-circle': ErrorCircleIcon,
    'file': FileIcon,
    'time': TimeIcon,
    'timer': TimerIcon,
    'chevron-left': ChevronRightIcon,
    'chevron-right': ChevronRightIcon
}

class Icon extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            className,
            name,
            ref,
            style
        } = this.props

        const classes = classNames('td-icon', className)
        const svgClasses = 'td-icon__svg'

        const Icon = ICONS[name]
        return (
            <div ref={ref} style={style} className={classes}>
                <Icon className={svgClasses} />
            </div>
        )
    }
}

Icon.propTypes = {
    className: PropTypes.string,
    name: PropTypes.oneOf(Object.keys(ICONS)).isRequired
}

export default Icon