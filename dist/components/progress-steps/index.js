import React, { PropTypes } from 'react';
import classNames from 'classnames';

var ProgressStepsItem = function ProgressStepsItem(_ref) {
    var className = _ref.className,
        completed = _ref.completed,
        current = _ref.current,
        number = _ref.number,
        Icon = _ref.icon,
        title = _ref.title;

    var classes = classNames('c-progress-steps__item', className, {
        'c--current': current,
        'c--completed': completed
    });

    var stepClasses = 'c-progress-steps__step';

    return React.createElement(
        'li',
        { className: classes },
        React.createElement(
            'div',
            { className: stepClasses },
            React.createElement(
                'div',
                { className: 'c-progress-steps__badge' },
                React.createElement(
                    'div',
                    { className: 'c-progress-steps__icon' },
                    Icon ? React.createElement(Icon, null) : number
                )
            ),
            title.length > 0 && React.createElement(
                'div',
                { className: 'c-progress-steps__title' },
                title
            )
        )
    );
};

ProgressStepsItem.propTypes = {
    className: PropTypes.string,
    completed: PropTypes.bool,
    current: PropTypes.bool,
    icon: PropTypes.func,
    number: PropTypes.number,
    title: PropTypes.string
};

ProgressStepsItem.defaultProps = {
    current: false
};

var ProgressSteps = function ProgressSteps(_ref2) {
    var className = _ref2.className,
        children = _ref2.children;

    var classes = classNames('c-progress-steps', className);
    var completed = true;

    return React.createElement(
        'ol',
        { className: classes },
        React.Children.map(children, function (child, index) {
            if (child.props.current) {
                completed = false;
            }

            var progressNumber = index + 1;
            var props = {
                number: progressNumber,
                icon: child.props.icon,
                key: 'progress-step-' + progressNumber,
                completed: completed
            };

            return React.cloneElement(child, props);
        })
    );
};

export { ProgressStepsItem, ProgressSteps };
export default ProgressSteps;