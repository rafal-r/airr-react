"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AirrFX = require("./AirrFX");

var _AirrFX2 = _interopRequireDefault(_AirrFX);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrMayer = function (_PureComponent) {
    _inherits(AirrMayer, _PureComponent);

    function AirrMayer(props) {
        _classCallCheck(this, AirrMayer);

        var _this = _possibleConstructorReturn(this, (AirrMayer.__proto__ || Object.getPrototypeOf(AirrMayer)).call(this, props));

        _this.refDOMMayer = _react2.default.createRef();
        _this.refDOMCtn = _react2.default.createRef();

        if (!props.name) {
            throw new Error("Every Mayer must has its `name` property set");
        }
        return _this;
    }

    _createClass(AirrMayer, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.refDOMCtn.current.clientHeight >= this.props.avaibleHeight) {
                this.refDOMCtn.current.style.height = this.props.avaibleHeight + "px";
                this.refDOMMayer.current.classList.add("full");
            }

            this.animateIn();
        }
    }, {
        key: "animateIn",
        value: function animateIn() {
            _AirrFX2.default.doTransitionAnimation(this.refDOMMayer.current.querySelector(".bg"), { opacity: 0 }, ["opacity " + this.props.animationTime + "ms ease-out"], { opacity: 1 });
            _AirrFX2.default.doOverlayInAnimation(this.refDOMCtn.current, this.refDOMMayer.current.clientWidth, this.refDOMMayer.current.clientHeight, this.props.animationTime, this.props.appearFrom);
        }
    }, {
        key: "animateOut",
        value: function animateOut(callback) {
            _AirrFX2.default.doTransitionAnimation(this.refDOMMayer.current.querySelector(".bg"), { opacity: 1 }, ["opacity " + this.props.animationTime + "ms ease-out"], { opacity: 0 });
            _AirrFX2.default.doOverlayOutAnimation(this.refDOMCtn.current, this.refDOMMayer.current.clientHeight, this.refDOMMayer.current.clientWidth, this.props.animationTime, this.props.leaveTo, callback);
        }
    }, {
        key: "render",
        value: function render() {
            return _react2.default.createElement(
                "div",
                {
                    className: "airr-mayer",
                    ref: this.refDOMMayer,
                    style: this.props.style
                },
                _react2.default.createElement(BgRenderer, null),
                _react2.default.createElement(
                    "div",
                    { className: "ctn", ref: this.refDOMCtn },
                    _react2.default.createElement(BodyRenderer, {
                        children: this.props.children,
                        content: this.props.content
                    }),
                    _react2.default.createElement(ButtonRenderer, { buttons: this.props.buttons })
                )
            );
        }
    }]);

    return AirrMayer;
}(_react.PureComponent);

exports.default = AirrMayer;


var BgRenderer = _react2.default.memo(function BgRenderer() {
    return _react2.default.createElement("div", { className: "bg" });
});
var ChildrenRenderer = _react2.default.memo(function ChildrenRenderer(_ref) {
    var children = _ref.children;

    return children;
});
var ContentRenderer = _react2.default.memo(function ContentRenderer(_ref2) {
    var content = _ref2.content;

    return content;
});
var BodyRenderer = _react2.default.memo(function BodyRenderer(_ref3) {
    var children = _ref3.children,
        content = _ref3.content;

    return _react2.default.createElement(
        "div",
        { className: "text" },
        _react2.default.createElement(ChildrenRenderer, { children: children }),
        _react2.default.createElement(ContentRenderer, { content: content })
    );
});
var MayerButton = _react2.default.memo(function MayerButton(_ref4) {
    var className = _ref4.className,
        style = _ref4.style,
        onClick = _ref4.onClick,
        children = _ref4.children,
        spareAttribs = _objectWithoutProperties(_ref4, ["className", "style", "onClick", "children"]);

    return _react2.default.createElement(
        "button",
        _extends({
            className: className,
            style: style,
            onClick: onClick
        }, spareAttribs),
        children
    );
});
var ButtonRenderer = _react2.default.memo(function ButtonRenderer(_ref5) {
    var buttons = _ref5.buttons;

    return _react2.default.createElement(
        "div",
        { className: "btns" },
        buttons.map(function (config, index) {
            var className = "btn text";

            if (config.className) {
                className += " " + config.className;
            }

            var spareAttribs = {};
            if (config.attrs) {
                spareAttribs = config.attrs;
            }

            return _react2.default.createElement(
                MayerButton,
                _extends({
                    key: "btn" + index,
                    className: className,
                    style: config.style || null,
                    onClick: config.handler || null
                }, spareAttribs),
                config.content
            );
        })
    );
});

AirrMayer.propTypes = {
    name: _propTypes2.default.string.isRequired,

    style: _propTypes2.default.object,

    avaibleHeight: _propTypes2.default.number.isRequired,

    appearFrom: _propTypes2.default.oneOf(["top", "bottom", "left", "right"]),

    leaveTo: _propTypes2.default.oneOf(["top", "bottom", "left", "right"]),

    content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),

    buttons: _propTypes2.default.arrayOf(_propTypes2.default.shape({
        className: _propTypes2.default.string,

        attrs: _propTypes2.default.object,

        style: _propTypes2.default.object,

        handler: _propTypes2.default.func,

        content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object])
    })),

    animationTime: _propTypes2.default.number
};
AirrMayer.defaultProps = {
    name: "",
    style: null,
    avaibleHeight: null,
    appearFrom: "bottom",
    leaveTo: "bottom",
    content: null,
    buttons: [],
    animationTime: 300
};