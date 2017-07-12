import _toConsumableArray from 'babel-runtime/helpers/toConsumableArray';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import Transition from 'react-transition-group/Transition';
import classNames from 'classnames';
import './_base.scss';

var noop = function noop() {};

var uuid = function () {
    var i = 0;
    return function () {
        return i++;
    };
}();
/*******************************************************************************
                          Accordion Item Content
*******************************************************************************/

var AccordionItemContent = function (_React$PureComponent) {
    _inherits(AccordionItemContent, _React$PureComponent);

    function AccordionItemContent(props) {
        _classCallCheck(this, AccordionItemContent);

        var _this = _possibleConstructorReturn(this, (AccordionItemContent.__proto__ || Object.getPrototypeOf(AccordionItemContent)).call(this, props));

        _this.getContentHeight = _this.getContentHeight.bind(_this);
        return _this;
    }

    _createClass(AccordionItemContent, [{
        key: 'getContentHeight',
        value: function getContentHeight() {
            return this._content.children.length ? this._content.children[0].offsetHeight : 0;
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props = this.props,
                children = _props.children,
                style = _props.style;


            var classes = classNames('td-accordion__item-content');

            return React.createElement(
                'div',
                { className: classes,
                    style: style,
                    ref: function ref(_content) {
                        _this2._content = _content;
                    }
                },
                children
            );
        }
    }]);

    return AccordionItemContent;
}(React.PureComponent);

/*******************************************************************************
                              Accordion Item
*******************************************************************************/

var AccordionItem = function (_React$PureComponent2) {
    _inherits(AccordionItem, _React$PureComponent2);

    function AccordionItem(props) {
        _classCallCheck(this, AccordionItem);

        var _this3 = _possibleConstructorReturn(this, (AccordionItem.__proto__ || Object.getPrototypeOf(AccordionItem)).call(this, props));

        _this3.animate = _this3.animate.bind(_this3);
        _this3.animateOpen = _this3.animateOpen.bind(_this3);
        _this3.animateClose = _this3.animateClose.bind(_this3);
        _this3.getContentHeight = _this3.getContentHeight.bind(_this3);
        _this3.onAnimationComplete = _this3.onAnimationComplete.bind(_this3);

        _this3.state = {
            style: {
                maxHeight: '0',
                transition: 'none'
            }
        };
        return _this3;
    }

    _createClass(AccordionItem, [{
        key: 'animateOpen',
        value: function animateOpen() {
            var _this4 = this;

            var completionHandler = function completionHandler() {
                _this4.setState({
                    style: {
                        maxHeight: 'initial',
                        transition: 'none'
                    }
                });
                _this4.onAnimationComplete();
            };

            this.animate(0, this.getContentHeight(), completionHandler);
        }
    }, {
        key: 'animateClose',
        value: function animateClose() {
            var _this5 = this;

            var completionHandler = function completionHandler() {
                _this5.onAnimationComplete();
            };

            this.animate(this.getContentHeight(), 0, completionHandler);
        }
    }, {
        key: 'animate',
        value: function animate(startHeight, endHeight, completionHandler) {
            var _this6 = this;

            var _props2 = this.props,
                duration = _props2.duration,
                easing = _props2.easing;


            var animationFrame = function animationFrame() {
                return new Promise(function (resolve) {
                    window.requestAnimationFrame(resolve);
                });
            };

            var setStartState = function setStartState() {
                return new Promise(function (resolve) {
                    _this6.setState({
                        style: {
                            maxHeight: startHeight + 'px',
                            transition: 'none'
                        }
                    }, resolve);
                });
            };

            var setEndState = function setEndState() {
                return new Promise(function (resolve) {
                    _this6.setState({
                        style: {
                            maxHeight: endHeight + 'px',
                            transition: 'max-height ' + duration + 'ms ' + easing
                        }
                    }, resolve);
                });
            };

            var waitForAnimation = function waitForAnimation() {
                setTimeout(completionHandler, duration);
            };

            animationFrame().then(setStartState).then(animationFrame).then(setEndState).then(waitForAnimation);
        }
    }, {
        key: 'getContentHeight',
        value: function getContentHeight() {
            return this._content.getContentHeight();
        }
    }, {
        key: 'onAnimationComplete',
        value: function onAnimationComplete() {
            var _props3 = this.props,
                open = _props3.open,
                onDidOpen = _props3.onDidOpen,
                onDidClose = _props3.onDidClose,
                itemId = _props3.itemId;


            if (open) {
                onDidOpen(itemId);
            } else {
                onDidClose(itemId);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this7 = this;

            var _props4 = this.props,
                className = _props4.className,
                children = _props4.children,
                duration = _props4.duration,
                easing = _props4.easing,
                headerClassName = _props4.headerClassName,
                HeaderContent = _props4.headerContent,
                itemId = _props4.itemId,
                open = _props4.open,
                onClick = _props4.onClick;


            var classes = classNames('td-accordion__item', className, {
                'td-accordion__item--open': open
            });

            var headerClasses = classNames('td-accordion__header', headerClassName);

            return React.createElement(
                'div',
                { id: itemId, className: classes },
                React.createElement(
                    'button',
                    { className: headerClasses,
                        onClick: onClick,
                        role: 'tab',
                        tabIndex: '0',
                        type: 'button',
                        'aria-selected': open
                    },
                    React.createElement(HeaderContent, null)
                ),
                React.createElement(
                    Transition,
                    {
                        'in': open,
                        timeout: duration,
                        onEnter: this.animateOpen,
                        onExit: this.animateClose,
                        unmountOnExit: true
                    },
                    React.createElement(
                        AccordionItemContent,
                        {
                            style: this.state.style,
                            ref: function ref(el) {
                                _this7._content = el;
                            }
                        },
                        children
                    )
                )
            );
        }
    }]);

    return AccordionItem;
}(React.PureComponent);

AccordionItem.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    duration: PropTypes.number,
    easing: PropTypes.string,
    headerClassName: PropTypes.string,
    headerContent: PropTypes.func,
    itemId: PropTypes.string,
    open: PropTypes.bool,
    onClick: PropTypes.func,
    onDidClose: PropTypes.func,
    onDidOpen: PropTypes.func
};

AccordionItem.defaultProps = {
    open: false,
    onDidClose: noop,
    onDidOpen: noop

    /*******************************************************************************
                                      Accordion
    *******************************************************************************/

};
var Accordion = function (_React$Component) {
    _inherits(Accordion, _React$Component);

    function Accordion(props) {
        _classCallCheck(this, Accordion);

        var _this8 = _possibleConstructorReturn(this, (Accordion.__proto__ || Object.getPrototypeOf(Accordion)).call(this, props));

        _this8.accordionId = 'accordion-' + uuid();
        _this8.onItemClick = _this8.onItemClick.bind(_this8);
        _this8.updateItem = _this8.updateItem.bind(_this8);

        _this8.state = {
            openItems: [].concat(_toConsumableArray(_this8.props.initialOpenItems))
        };
        return _this8;
    }

    _createClass(Accordion, [{
        key: 'updateItem',
        value: function updateItem(index, opening) {
            if (index < 0 || index >= React.Children.count(this.props.children)) {
                return;
            }

            var multiSelect = this.props.multiSelect;

            var openItems = [].concat(_toConsumableArray(this.state.openItems));

            if (opening) {
                if (multiSelect) {
                    openItems.push(index);
                } else {
                    openItems = [index];
                }
            } else {
                if (multiSelect) {
                    openItems.splice(openItems.indexOf(index), 1);
                } else {
                    openItems = [];
                }
            }

            this.setState({ openItems: openItems });
        }
    }, {
        key: 'onItemClick',
        value: function onItemClick(index) {
            var openItems = this.state.openItems;


            var isOpening = openItems.indexOf(index) === -1;
            this.updateItem(index, isOpening);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this9 = this;

            var _props5 = this.props,
                className = _props5.className,
                children = _props5.children,
                duration = _props5.duration,
                easing = _props5.easing,
                multiSelect = _props5.multiSelect,
                onItemOpen = _props5.onItemOpen,
                onItemDidOpen = _props5.onItemDidOpen,
                onItemClose = _props5.onItemClose,
                onItemDidClose = _props5.onItemDidClose;


            var classes = classNames('td-accordion', className);

            return React.createElement(
                'div',
                { className: classes, id: this.accordionId, 'aria-multiselectable': multiSelect, role: 'tablist' },
                React.Children.map(children, function (child, index) {
                    // Children can be undefined if they are conditionally rendered
                    if (!child) {
                        return null;
                    }

                    var childId = _this9.accordionId + '__item-' + index;
                    var childProps = {
                        accordionId: _this9.accordionId,
                        id: childId,
                        duration: duration,
                        easing: easing,
                        key: childId,
                        open: _this9.state.openItems.indexOf(index) > -1,
                        onClick: _this9.onItemClick.bind(_this9, index)

                        // Allow event hooks to be overridden
                    };childProps.onOpen = childProps.onOpen || onItemOpen;
                    childProps.onDidOpen = childProps.onDidOpen || onItemDidOpen;
                    childProps.onClose = childProps.onClose || onItemClose;
                    childProps.onDidClose = childProps.onDidClose || onItemDidClose;

                    return React.cloneElement(child, childProps);
                })
            );
        }
    }]);

    return Accordion;
}(React.Component);

Accordion.propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.string,
    initialOpenItems: PropTypes.arrayOf(PropTypes.number),
    multiSelect: PropTypes.bool,
    onItemOpen: PropTypes.func,
    onItemDidOpen: PropTypes.func,
    onItemClose: PropTypes.func,
    onItemDidClose: PropTypes.func
};

Accordion.defaultProps = {
    initialOpenItems: [],
    duration: 250,
    easing: 'ease',
    multiSelect: false,
    onItemOpen: noop,
    onItemDidOpen: noop,
    onItemClose: noop,
    onItemDidClose: noop
};

export { Accordion, AccordionItem };
export default Accordion;