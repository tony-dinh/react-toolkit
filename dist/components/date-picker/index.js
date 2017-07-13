import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { PropTypes } from 'react';
import classNames from 'classnames';
import flatpickr from 'flatpickr';
import '../../vendor/styles/flatpickr.min.css';

var DatePicker = function (_React$PureComponent) {
    _inherits(DatePicker, _React$PureComponent);

    function DatePicker(props) {
        _classCallCheck(this, DatePicker);

        return _possibleConstructorReturn(this, (DatePicker.__proto__ || Object.getPrototypeOf(DatePicker)).call(this, props));
    }

    _createClass(DatePicker, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            debugger;
            console.log(flatpickr);
            window.flatpickr = flatpickr;
            flatpickr(this._container, {});
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            return React.createElement('input', { ref: function ref(el) {
                    return _this2._container = el;
                } });
        }
    }]);

    return DatePicker;
}(React.PureComponent);

export default DatePicker;