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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrMayer = function (_Component) {
    _inherits(AirrMayer, _Component);

    // <button class="btn text alert">YES</button>
    // <button class="btn text success">CANCEL</button>

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
    /**
     * Creates button upon passed config 
     * @param {object} config 
     * @param {int} index 
     * @returns {ReactElement}
     */


    _createClass(AirrMayer, [{
        key: "renderButton",
        value: function renderButton(config, index) {
            var className = "btn text";
            if (config.className) {
                className += " " + config.className;
            }

            var spareAttribs = {};
            if (config.attrs) {
                spareAttribs = config.attrs;
            }

            return _react2.default.createElement(
                "button",
                _extends({
                    key: "btn" + index,
                    className: className,
                    style: config.style || null,
                    onClick: config.handler || null
                }, spareAttribs),
                config.content
            );
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.refDOMCtn.current.clientHeight >= this.props.avaibleHeight) {
                this.refDOMCtn.current.style.height = this.props.avaibleHeight + "px";
                this.refDOMMayer.current.classList.add("full");
            }

            this.animateIn();
        }
        /**
         * Animates Mayers html dom element into the screen
         */

    }, {
        key: "animateIn",
        value: function animateIn() {
            //        (element, startProps, transitionProps, endProps, preAnimationCallback, endAfter, endCallback) {
            _AirrFX2.default.doTransitionAnimation(this.refDOMMayer.current.querySelector(".bg"), { opacity: 0 }, ["opacity " + this.props.animationTime + "ms ease-out"], { opacity: 1 });
            _AirrFX2.default.doOverlayInAnimation(this.refDOMCtn.current, this.refDOMMayer.current.clientWidth, this.refDOMMayer.current.clientHeight, this.props.animationTime, this.props.appearFrom);
        }

        /**
         * Animates Mayers html dom element out of the screen 
         * @param {function} callback Called after animation end
         */

    }, {
        key: "animateOut",
        value: function animateOut(callback) {
            _AirrFX2.default.doTransitionAnimation(this.refDOMMayer.current.querySelector(".bg"), { opacity: 1 }, ["opacity " + this.props.animationTime + "ms ease-out"], { opacity: 0 });
            _AirrFX2.default.doOverlayOutAnimation(this.refDOMCtn.current, this.refDOMMayer.current.clientHeight, this.refDOMMayer.current.clientWidth, this.props.animationTime, this.props.leaveTo, callback);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var buttons = [];
            if (this.props.buttons) {
                this.props.buttons.forEach(function (config, index) {
                    buttons.push(_this2.renderButton(config, index));
                });
            }

            return _react2.default.createElement(
                "div",
                { className: "airr-mayer", ref: this.refDOMMayer },
                _react2.default.createElement("div", { className: "bg" }),
                _react2.default.createElement(
                    "div",
                    { className: "ctn", ref: this.refDOMCtn },
                    _react2.default.createElement(
                        "div",
                        { className: "text" },
                        this.props.children,
                        this.props.content
                    ),
                    _react2.default.createElement(
                        "div",
                        { className: "btns" },
                        buttons
                    )
                )
            );
        }
    }]);

    return AirrMayer;
}(_react.Component);

exports.default = AirrMayer;


AirrMayer.propTypes = {
    name: _propTypes2.default.string.isRequired,
    avaibleHeight: _propTypes2.default.number.isRequired,
    appearFrom: _propTypes2.default.oneOf(["top", "bottom", "left", "right"]),
    leaveTo: _propTypes2.default.oneOf(["top", "bottom", "left", "right"]),
    content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    buttons: _propTypes2.default.arrayOf(_propTypes2.default.object),
    animationTime: _propTypes2.default.number
};
AirrMayer.defaultProps = {
    /**
     * The name of the mayer. Must be unique among others mayers in scene. Will be used as identification.
     */
    name: "",
    /**
     * Parent scene height
     */
    avaibleHeight: null,
    /**
     * Side from which mayer content box will enter
     */
    appearFrom: "bottom",
    /**
     * Side to which mayer content box will leave
     */
    leaveTo: "bottom",
    /**
     * Content of mayer
     */
    content: null,
    /**
     * Array with buttons configuration
     */
    buttons: [],
    /**
     * Time in miliseconds of mayer's appear/disappear animation
     */
    animationTime: 300
};