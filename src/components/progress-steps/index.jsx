import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const ProgressStepsItem = ({
    className,
    completed,
    current,
    number,
    icon: Icon,
    title
}) => {
    const classes = classNames('td-progress-steps__item', className, {
        'td--current': current,
        'td--completed': completed
    })

    const stepClasses = `td-progress-steps__step`

    return (
        <li className={classes}>
            <div className={stepClasses}>
                <div className="td-progress-steps__badge">
                    <div className="td-progress-steps__icon">
                        {Icon
                            ? <Icon />
                            : number
                        }
                    </div>
                </div>
                {title.length > 0 &&
                    <div className="td-progress-steps__title">
                        {title}
                    </div>
                }
            </div>
        </li>
    )
}

ProgressStepsItem.propTypes = {
    className: PropTypes.string,
    completed: PropTypes.bool,
    current: PropTypes.bool,
    icon: PropTypes.func,
    number: PropTypes.number,
    title: PropTypes.string
}

ProgressStepsItem.defaultProps = {
    current: false
}

const ProgressSteps = ({className, children}) => {
    const classes = classNames('td-progress-steps', className)
    let completed = true

    return (
        <ol className={classes}>
            {React.Children.map(children, (child, index) => {
                if (child.props.current) {
                    completed = false
                }

                const progressNumber = index + 1
                const props = {
                    number: progressNumber,
                    icon: child.props.icon,
                    key: `progress-step-${progressNumber}`,
                    completed
                }

                return React.cloneElement(child, props)
            })}
        </ol>
    )
}

ProgressSteps.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string
}

export {ProgressStepsItem, ProgressSteps}
export default ProgressSteps
