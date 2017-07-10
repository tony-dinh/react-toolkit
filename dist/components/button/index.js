import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

import Icon from '../icon';
import './theme.scss';

var Button = function (_React$PureComponent) {
    _inherits(Button, _React$PureComponent);

    function Button(props) {
        _classCallCheck(this, Button);

        return _possibleConstructorReturn(this, (Button.__proto__ || Object.getPrototypeOf(Button)).call(this, props));
    }

    _createClass(Button, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                disabled = _props.disabled,
                href = _props.href,
                iconName = _props.iconName,
                role = _props.role,
                title = _props.title,
                type = _props.type,
                text = _props.text,
                onClick = _props.onClick;


            var classes = classNames('td-button td--' + role, className, {
                'td--button-disabled': disabled
            });
            var innerClasses = 'td-button__inner';
            var iconClasses = 'td-button__icon';
            var textClasses = classNames('td-button__text', {
                'td--icon-text': !!iconName
            });

            var ButtonWrapper = function ButtonWrapper(_ref) {
                var children = _ref.children;

                return href ? React.createElement(
                    'a',
                    { className: classes, href: href, onClick: onClick },
                    children
                ) : React.createElement(
                    'button',
                    { className: classes, title: title, onClick: onClick, type: type },
                    children
                );
            };

            return React.createElement(
                ButtonWrapper,
                null,
                React.createElement(
                    'div',
                    { className: innerClasses },
                    !!iconName && React.createElement(
                        'div',
                        { className: iconClasses },
                        React.createElement(Icon, { name: iconName })
                    ),
                    (text || title) && React.createElement(
                        'span',
                        { className: textClasses },
                        text || title
                    )
                )
            );
        }
    }]);

    return Button;
}(React.PureComponent);

Button.propTypes = {
    className: PropTypes.string,
    disabled: PropTypes.bool,
    href: PropTypes.string,
    iconName: React.PropTypes.string,
    role: PropTypes.oneOf(['primary', 'secondary', 'tertiary']).isRequired,
    type: PropTypes.oneOf(['button', 'submit']),
    text: PropTypes.string,
    onClick: PropTypes.func
};

Button.defaultProps = {
    type: 'button',
    role: 'primary',
    disabled: false
};

export default Button;