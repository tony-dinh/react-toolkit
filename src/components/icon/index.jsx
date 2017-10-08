import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import './_base.scss'

const ArrowDropdownIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M7 10l5 5 5-5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const ArrowDropupIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M7 14l5-5 5 5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const ArrowDownIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet">
            <path d="M10 19.25l-5.5-5.25h3.5v-13h4v13h3.5l-5.5 5.25z"></path>
        </svg>
    )
}

const ArrowUpIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 20 20" preserveAspectRatio="xMidYMid meet">
            <path d="M10 0.75l5.5 5.25h-3.5v13h-4v-13h-3.5l5.5-5.25z"></path>
        </svg>
    )
}

const CalendarIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const ChartIcon = ({className}) => {
    return (
        <svg className={className} viewBox="2 2 20 20" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M10 20h4V4h-4v16zm-6 0h4v-8H4v8zM16 9v11h4V9h-4z"/>
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

const EditIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const EmailIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const EqualizerIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 32 32" preserveAspectRatio="xMidYMid meet">
            <path d="M14 4v-0.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18zM8 8v-4h4v4h-4zM26 13.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-18v4h18v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h6v-4h-6v-0.5zM20 18v-4h4v4h-4zM14 23.5c0-0.825-0.675-1.5-1.5-1.5h-5c-0.825 0-1.5 0.675-1.5 1.5v0.5h-6v4h6v0.5c0 0.825 0.675 1.5 1.5 1.5h5c0.825 0 1.5-0.675 1.5-1.5v-0.5h18v-4h-18v-0.5zM8 28v-4h4v4h-4z"></path>
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

const FacebookIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 16 28" preserveAspectRatio="xMidYMid meet">
            <path d="M14.984 0.187v4.125h-2.453c-1.922 0-2.281 0.922-2.281 2.25v2.953h4.578l-0.609 4.625h-3.969v11.859h-4.781v-11.859h-3.984v-4.625h3.984v-3.406c0-3.953 2.422-6.109 5.953-6.109 1.687 0 3.141 0.125 3.563 0.187z"/>
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

const FilterListIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M10 18h4v-2h-4v2zM3 6v2h18V6H3zm3 7h12v-2H6v2z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const LanguageIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm6.93 6h-2.95c-.32-1.25-.78-2.45-1.38-3.56 1.84.63 3.37 1.91 4.33 3.56zM12 4.04c.83 1.2 1.48 2.53 1.91 3.96h-3.82c.43-1.43 1.08-2.76 1.91-3.96zM4.26 14C4.1 13.36 4 12.69 4 12s.1-1.36.26-2h3.38c-.08.66-.14 1.32-.14 2 0 .68.06 1.34.14 2H4.26zm.82 2h2.95c.32 1.25.78 2.45 1.38 3.56-1.84-.63-3.37-1.9-4.33-3.56zm2.95-8H5.08c.96-1.66 2.49-2.93 4.33-3.56C8.81 5.55 8.35 6.75 8.03 8zM12 19.96c-.83-1.2-1.48-2.53-1.91-3.96h3.82c-.43 1.43-1.08 2.76-1.91 3.96zM14.34 14H9.66c-.09-.66-.16-1.32-.16-2 0-.68.07-1.35.16-2h4.68c.09.65.16 1.32.16 2 0 .68-.07 1.34-.16 2zm.25 5.56c.6-1.11 1.06-2.31 1.38-3.56h2.95c-.96 1.65-2.49 2.93-4.33 3.56zM16.36 14c.08-.66.14-1.32.14-2 0-.68-.06-1.34-.14-2h3.38c.16.64.26 1.31.26 2s-.1 1.36-.26 2h-3.38z"/>
        </svg>
    )
}

const LinkedInIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 28" preserveAspectRatio="xMidYMid meet">
            <path d="M5.453 9.766v15.484h-5.156v-15.484h5.156zM5.781 4.984c0.016 1.484-1.109 2.672-2.906 2.672v0h-0.031c-1.734 0-2.844-1.188-2.844-2.672 0-1.516 1.156-2.672 2.906-2.672 1.766 0 2.859 1.156 2.875 2.672zM24 16.375v8.875h-5.141v-8.281c0-2.078-0.75-3.5-2.609-3.5-1.422 0-2.266 0.953-2.641 1.875-0.125 0.344-0.172 0.797-0.172 1.266v8.641h-5.141c0.063-14.031 0-15.484 0-15.484h5.141v2.25h-0.031c0.672-1.062 1.891-2.609 4.672-2.609 3.391 0 5.922 2.219 5.922 6.969z" />
        </svg>
    )
}

const LocationIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const MenuIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
        </svg>
    )
}

const MoreHorizontalIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
    )
}

const MoreVerticalIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
        </svg>
    )
}

const PdfIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/>
        </svg>
    )
}

const PersonIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const PieChartIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0V0z" fill="none"/>
            <path d="M11 2v20c-5.07-.5-9-4.79-9-10s3.93-9.5 9-10zm2.03 0v8.99H22c-.47-4.74-4.24-8.52-8.97-8.99zm0 11.01V22c4.74-.47 8.5-4.25 8.97-8.99h-8.97z"/>
        </svg>
    )
}

const PlayIcon = ({className}) => {
    return (
        <svg className={className} viewBox="3 3 18 18" preserveAspectRatio="xMidYMid meet">
            <path d="M8 5v14l11-7z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const SearchIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
    )
}

const TelephoneIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
    )
}

const ThumbDownIcon = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M15 3H6c-.83 0-1.54.5-1.84 1.22l-3.02 7.05c-.09.23-.14.47-.14.73v1.91l.01.01L1 14c0 1.1.9 2 2 2h6.31l-.95 4.57-.03.32c0 .41.17.79.44 1.06L9.83 23l6.59-6.59c.36-.36.58-.86.58-1.41V5c0-1.1-.9-2-2-2zm4 0v12h4V3h-4z"/>
    </svg>
)

const ThumbUpIcon = ({className}) => (
    <svg className={className} viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet">
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"/>
    </svg>
)

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

const TwitterIcon = ({className}) => {
    return (
        <svg className={className} viewBox="0 0 26 28" preserveAspectRatio="xMidYMid meet">
            <path d="M25.312 6.375c-0.688 1-1.547 1.891-2.531 2.609 0.016 0.219 0.016 0.438 0.016 0.656 0 6.672-5.078 14.359-14.359 14.359-2.859 0-5.516-0.828-7.75-2.266 0.406 0.047 0.797 0.063 1.219 0.063 2.359 0 4.531-0.797 6.266-2.156-2.219-0.047-4.078-1.5-4.719-3.5 0.313 0.047 0.625 0.078 0.953 0.078 0.453 0 0.906-0.063 1.328-0.172-2.312-0.469-4.047-2.5-4.047-4.953v-0.063c0.672 0.375 1.453 0.609 2.281 0.641-1.359-0.906-2.25-2.453-2.25-4.203 0-0.938 0.25-1.797 0.688-2.547 2.484 3.062 6.219 5.063 10.406 5.281-0.078-0.375-0.125-0.766-0.125-1.156 0-2.781 2.25-5.047 5.047-5.047 1.453 0 2.766 0.609 3.687 1.594 1.141-0.219 2.234-0.641 3.203-1.219-0.375 1.172-1.172 2.156-2.219 2.781 1.016-0.109 2-0.391 2.906-0.781z"/>
        </svg>
    )
}

const ICONS = {
    'arrow-dropdown': ArrowDropdownIcon,
    'arrow-dropup': ArrowDropupIcon,
    'arrow-down': ArrowDownIcon,
    'arrow-up': ArrowUpIcon,
    'calendar': CalendarIcon,
    'chart': ChartIcon,
    'check': CheckIcon,
    'check-circle': CheckCircleIcon,
    'chevron-left': ChevronRightIcon,
    'chevron-right': ChevronRightIcon,
    'close': CloseIcon,
    'edit': EditIcon,
    'equalizer': EqualizerIcon,
    'email': EmailIcon,
    'error-circle': ErrorCircleIcon,
    'file': FileIcon,
    'filter-list': FilterListIcon,
    'language': LanguageIcon,
    'location': LocationIcon,
    'menu': MenuIcon,
    'more-horizontal': MoreHorizontalIcon,
    'more-vertical': MoreVerticalIcon,
    'pdf': PdfIcon,
    'person': PersonIcon,
    'pie-chart': PieChartIcon,
    'play': PlayIcon,
    'search': SearchIcon,
    'social-facebook': FacebookIcon,
    'social-linkedin': LinkedInIcon,
    'social-twitter': TwitterIcon,
    'telephone': TelephoneIcon,
    'thumb-up': ThumbUpIcon,
    'thumb-down': ThumbDownIcon,
    'time': TimeIcon,
    'timer': TimerIcon
}

class Icon extends React.PureComponent {
    constructor(props) {
        super(props)
    }

    render() {
        const {
            className,
            name,
            reference,
            style,
            svgClassName
        } = this.props

        const classes = classNames('td-icon', className)
        const svgClasses = classNames('td-icon__svg', svgClassName)

        const Svg = ICONS[name]
        return (
            <div ref={reference} style={style} className={classes}>
                <Svg className={svgClasses} />
            </div>
        )
    }
}

Icon.propTypes = {
    className: PropTypes.string,
    name: PropTypes.oneOf(Object.keys(ICONS)).isRequired,
    reference: PropTypes.func
}

export default Icon
