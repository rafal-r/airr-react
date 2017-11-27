'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrComponent = function (_Component) {
    _inherits(AirrComponent, _Component);

    function AirrComponent() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AirrComponent);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AirrComponent.__proto__ || Object.getPrototypeOf(AirrComponent)).call.apply(_ref, [this].concat(args))), _this), _this.customEvents = [], _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AirrComponent, [{
        key: 'onCustom',
        value: function onCustom(eventName, handler) {
            if (!Array.isArray(this.customEvents[eventName])) {
                this.customEvents[eventName] = [];
            }
            if (typeof handler === 'function') {
                this.customEvents[eventName].push(handler);
            }
        }
    }, {
        key: 'offCustom',
        value: function offCustom(eventName, handler) {
            if (Array.isArray(this.customEvents[eventName])) {
                for (var i = 0; i < this.customEvents[eventName]; i++) {
                    if (this.customEvents[eventName][i] === handler) {
                        this.customEvents[eventName].splice(i, 1);
                    }
                }
            }
        }
    }, {
        key: 'triggerCustom',
        value: function triggerCustom(eventName) {
            if (Array.isArray(this.customEvents[eventName])) {
                for (var i = 0; i < this.customEvents[eventName].length; i++) {
                    this.customEvents[eventName][i].call(this);
                }
            }
        }
    }]);

    return AirrComponent;
}(_react.Component);

;

module.exports = AirrComponent;