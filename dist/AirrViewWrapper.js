"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AirrView = require("./AirrView");

var _AirrView2 = _interopRequireDefault(_AirrView);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrViewWrapper = function (_Component) {
    _inherits(AirrViewWrapper, _Component);

    function AirrViewWrapper() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AirrViewWrapper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AirrViewWrapper.__proto__ || Object.getPrototypeOf(AirrViewWrapper)).call.apply(_ref, [this].concat(args))), _this), _this.refDOM = _react2.default.createRef(), _this.getViewProps = function () {
            return {
                refDOM: _this.refDOM,
                name: _this.props.name,
                active: _this.props.active,
                title: _this.props.title,
                className: _this.props.className,
                style: _this.props.style
            };
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AirrViewWrapper, [{
        key: "content",


        /*
        *render method to be overwritten in desendent class
        */
        value: function content() {}
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            return _react2.default.createElement(
                _AirrView2.default,
                this.getViewProps(),
                function () {
                    return _this2.content();
                }
            );
        }
    }]);

    return AirrViewWrapper;
}(_react.Component);

exports.default = AirrViewWrapper;


AirrViewWrapper.propTypes = _AirrView2.default.propTypes;
AirrViewWrapper.defaultProps = _AirrView2.default.defaultProps;