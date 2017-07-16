import React, {PropTypes} from 'react'
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
            name
        } = this.props

        const classes = classNames('td-icon', className)
        const Icon = ICONS[name]
        return <Icon className={classes} />
    }
}

Icon.propTypes = {
    className: PropTypes.string,
    name: PropTypes.oneOf(Object.keys(ICONS)).isRequired
}

export default Icon