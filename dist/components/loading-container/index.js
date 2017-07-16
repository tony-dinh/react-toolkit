import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React from 'react';
import PropTypes from 'proptypes';
import classNames from 'classnames';
import Transition from 'react-transition-group/Transition';

import Loader from '../loader';

import './_base.scss';

var LoadingContainer = function (_React$PureComponent) {
    _inherits(LoadingContainer, _React$PureComponent);

    function LoadingContainer(props) {
        _classCallCheck(this, LoadingContainer);

        return _possibleConstructorReturn(this, (LoadingContainer.__proto__ || Object.getPrototypeOf(LoadingContainer)).call(this, props));
    }

    _createClass(LoadingContainer, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                animationDuration = _props.animationDuration,
                className = _props.className,
                children = _props.children,
                loaderColor = _props.loaderColor,
                loading = _props.loading,
                showContentWhileLoading = _props.showContentWhileLoading,
                style = _props.style;


            var classes = classNames('td-loading-container', className);
            var innerClasses = classNames('td-loading-container__inner', {
                'td--fade-in': loading,
                'td--fade-out': !loading
            });

            return React.createElement(
                'div',
                { className: classes, style: style },
                React.createElement(
                    Transition,
                    {
                        'in': loading,
                        timeout: 250,
                        unmountOnExit: true
                    },
                    React.createElement(
                        'div',
                        { className: innerClasses },
                        React.createElement(Loader, { color: loaderColor, duration: animationDuration })
                    )
                ),
                showContentWhileLoading && children
            );
        }
    }]);

    return LoadingContainer;
}(React.PureComponent);

LoadingContainer.propTypes = {
    className: PropTypes.string,
    children: PropTypes.element,
    animationDuration: PropTypes.number,
    loaderColor: PropTypes.string,
    loading: PropTypes.bool,
    showContentWhileLoading: PropTypes.bool,
    style: PropTypes.object
};

LoadingContainer.defaultProps = {
    animationDuration: 1200,
    loaderColor: "white",
    loading: true,
    showContentWhileLoading: true
};

export default LoadingContainer;