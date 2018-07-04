"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _eventHelpers = require("./eventHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrSidepanel = function (_Component) {
    _inherits(AirrSidepanel, _Component);

    function AirrSidepanel() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, AirrSidepanel);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AirrSidepanel.__proto__ || Object.getPrototypeOf(AirrSidepanel)).call.apply(_ref, [this].concat(args))), _this), _this.refDOMDragCtn = _react2.default.createRef(), _this.refDOMBgLayer = _react2.default.createRef(), _this.refDOM = _react2.default.createRef(), _this.startEvent = _eventHelpers.isMobileDevice ? "touchstart" : "mousedown", _this.moveEvent = _eventHelpers.isMobileDevice ? "touchmove" : "mousemove", _this.endEvent = _eventHelpers.isMobileDevice ? "touchend" : "mouseup", _this.getPosition = function (e, axis) {
            return "changedTouches" in e ? e.changedTouches[0]["client" + axis] : e["client" + axis];
        }, _this.getLastPosition = function (e) {
            return "changedTouches" in e ? e.changedTouches[0] : { clientX: e.clientX, clientY: e.clientY };
        }, _this.getEventX = function (e) {
            return "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
        }, _this.getEventY = function (e) {
            return "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
        }, _this.handleTouchStart = function (e) {
            var pos = _this.getPosition(e, _this.axis);
            var dragCtnOnTouchPath = false;

            if (e.path) {
                for (var i = 0; i < e.path.length; i++) {
                    if (e.path[i] === _this.refDOMDragCtn.current) {
                        dragCtnOnTouchPath = true;
                    }
                }
            } else {
                if (e.target === _this.refDOMDragCtn.current || _this.__bubbleChildTillParent(e.target, _this.refDOMDragCtn.current, [_this.refDOMDragCtn.current.parentNode, document.body])) {
                    dragCtnOnTouchPath = true;
                }
            }

            if (!dragCtnOnTouchPath && (["left", "top"].indexOf(_this.props.side) !== -1 && pos < 20 || ["right", "bottom"].indexOf(_this.props.side) !== -1 && pos > _this.hiddenVal - 20)) {

                _this.refDOM.current.style.display = "block";
                _this.sceneDOM.addEventListener(_this.moveEvent, _this.handleShowTouchMove, _eventHelpers.supportPassive);
                _this.sceneDOM.addEventListener(_this.endEvent, _this.handleTouchEnd, false);

                var showmoveend = function showmoveend() {
                    _this.sceneDOM.removeEventListener(_this.endEvent, showmoveend);
                    _this.sceneDOM.removeEventListener(_this.moveEvent, _this.handleShowTouchMove);
                };

                _this.sceneDOM.addEventListener(_this.endEvent, showmoveend, false);
            } else if (_this.currentVal === _this.shownVal) {
                _this.sceneDOM.addEventListener(_this.moveEvent, _this.handleHideTouchMove, _eventHelpers.supportPassive);
                _this.sceneDOM.addEventListener(_this.endEvent, _this.handleTouchEnd, false);

                var hidemoveend = function hidemoveend() {
                    _this.sceneDOM.removeEventListener(_this.endEvent, hidemoveend);
                    _this.sceneDOM.removeEventListener(_this.moveEvent, _this.handleHideTouchMove);
                };

                _this.sceneDOM.addEventListener(_this.endEvent, hidemoveend, false);
            }

            if (e.target === _this.refDOMBgLayer.current) {
                if (["left", "top"].indexOf(_this.props.side) !== -1 && _this.currentVal === 0 || ["right", "bottom"].indexOf(_this.props.side) !== -1 && _this.currentVal) {
                    var hidedragctn = function hidedragctn(e) {
                        _this.sceneDOM.removeEventListener(_this.endEvent, hidedragctn);
                        if (Math.abs(pos - _this.getPosition(e, _this.axis)) <= 2.5) {
                            _this.hide();
                        }
                    };

                    _this.sceneDOM.addEventListener(_this.endEvent, hidedragctn, false);
                }
            }

            _this.lastTouch = _this.getLastPosition(e);
        }, _this.handleShowTouchMove = function (e) {
            var pos = _this.getPosition(e, _this.axis);
            var newVal = void 0,
                progress = void 0;

            if (["left", "top"].indexOf(_this.props.side) !== -1) {
                if (pos <= -1 * _this.hiddenVal) {
                    newVal = _this.hiddenVal + pos;
                } else {
                    newVal = _this.shownVal;
                }
                progress = pos / _this.size;
            } else {
                if (_this.hiddenVal - pos <= _this.size) {
                    newVal = pos;
                } else {
                    newVal = _this.shownVal;
                }
                progress = (_this.sceneSize - pos) / _this.size;
            }

            if (newVal !== _this.currentVal) {
                _this.currentVal = newVal;
                progress = parseFloat(progress);
                progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

                _this.refDOMBgLayer.current.style.opacity = progress * _this.props.bgLayerOpacity;

                _this.refDOMDragCtn.current.style.webkitTransform = _this.transformScheme.replace("%v", _this.currentVal);
                _this.refDOMDragCtn.current.style.transform = _this.transformScheme.replace("%v", _this.currentVal);
            }

            _this.lastTouch = _this.getLastPosition(e);

            if (!_eventHelpers.supportPassive) {
                e.preventDefault();
            }
        }, _this.handleHideTouchMove = function (e) {
            var progress = void 0,
                newVal = void 0,
                change = void 0,
                moveAxis = void 0;

            if (_this.lastTouch) {
                if (Math.abs(_this.lastTouch.clientX - _this.getEventX(e)) >= Math.abs(_this.lastTouch.clientY - _this.getEventY(e))) {
                    if (_this.getEventX(e) - _this.lastTouch.clientX <= 0) {
                        moveAxis = "X";
                    } else {
                        moveAxis = "X";
                    }
                } else {
                    if (_this.getEventY(e) - _this.lastTouch.clientY <= 0) {
                        moveAxis = "Y";
                    } else {
                        moveAxis = "Y";
                    }
                }
            }

            if (moveAxis === _this.axis && (["left", "top"].indexOf(_this.props.side) !== -1 && _this.getPosition(e, moveAxis) < _this.size || ["right", "bottom"].indexOf(_this.props.side) !== -1 && _this.getPosition(e, moveAxis) > _this.hiddenVal - _this.size)) {
                change = _this.getPosition(e, _this.axis) - _this.lastTouch["client" + _this.axis];
                newVal = _this.currentVal + change;

                if (_this.props.side === "left" || _this.props.side === "top") {
                    if (newVal < _this.hiddenVal) {
                        newVal = _this.hiddenVal;
                    } else if (newVal > _this.shownVal) {
                        newVal = _this.shownVal;
                    }

                    progress = 1 - Math.abs(newVal / _this.size);
                } else {
                    if (newVal > _this.hiddenVal) {
                        newVal = _this.hiddenVal;
                    } else if (newVal < _this.shownVal) {
                        newVal = _this.shownVal;
                    }

                    progress = (_this.sceneSize - newVal) / _this.size;
                }

                if (newVal !== _this.currentVal) {
                    _this.currentVal = newVal;
                    progress = parseFloat(progress);
                    progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

                    _this.refDOMBgLayer.current.style.opacity = progress * _this.props.bgLayerOpacity;

                    _this.refDOMDragCtn.current.style.webkitTransform = _this.transformScheme.replace("%v", _this.currentVal);
                    _this.refDOMDragCtn.current.style.transform = _this.transformScheme.replace("%v", _this.currentVal);
                }
            }

            _this.lastTouch = _this.getLastPosition(e);
            if (!_eventHelpers.supportPassive) {
                e.preventDefault();
            }
        }, _this.handleTouchEnd = function (e) {
            var val = null;

            if (!_this.animating) {
                if (_this.currentVal !== _this.shownVal && _this.currentVal !== _this.hiddenVal) {
                    if (["left", "top"].indexOf(_this.props.side) !== -1) {
                        if (_this.currentVal >= _this.hiddenVal / 2) {
                            val = _this.shownVal;
                        } else {
                            val = _this.hiddenVal;
                        }
                    } else {
                        if (_this.currentVal < _this.hiddenVal - _this.size / 2) {
                            val = _this.shownVal;
                        } else {
                            val = _this.hiddenVal;
                        }
                    }
                } else if (_this.currentVal === _this.hiddenVal) {
                    _this.refDOM.current.style.display = "none";
                }

                if (val !== null) {
                    _this.translateTo(val);
                } else {
                    if (_this.props.isShown !== _this.isShown()) {
                        _this.props.visibilityCallback(_this.isShown());
                    }
                }
            }

            _this.sceneDOM.removeEventListener(_this.endEvent, _this.handleTouchEnd);
        }, _this.hide = function () {
            return _this.translateTo(_this.hiddenVal);
        }, _this.show = function () {
            _this.enable();
            return _this.translateTo(_this.shownVal);
        }, _this.isShown = function () {
            return _this.refDOM.current.offsetParent !== null;
        }, _this.translateTo = function (finishVal) {
            return new Promise(function (resolve) {
                _this.animating = true;

                _this.refDOMBgLayer.current.style.webkitTransition = "opacity " + _this.props.animationTime + "ms ease-in";
                _this.refDOMBgLayer.current.style.transition = "opacity " + _this.props.animationTime + "ms ease-in";

                _this.refDOMBgLayer.current.offsetHeight;

                if (finishVal === _this.shownVal) {
                    if (!_this.isShown()) {
                        _this.refDOM.current.style.display = "block";
                    }

                    _this.refDOMBgLayer.current.style.opacity = _this.props.bgLayerOpacity;
                } else if (finishVal === _this.hiddenVal) {
                    _this.refDOMBgLayer.current.style.opacity = 0;
                }

                _this.refDOM.current.offsetHeight;
                _this.refDOM.current.style.webkitTransition = "initial";
                _this.refDOM.current.style.transition = "initial";

                _this.refDOMDragCtn.current.style.webkitTransition = "-webkit-transform " + _this.props.animationTime + "ms ease-out";
                _this.refDOMDragCtn.current.style.webkitTransition = "transform " + _this.props.animationTime + "ms ease-out";
                _this.refDOMDragCtn.current.style.transition = "transform " + _this.props.animationTime + "ms ease-out";

                _this.refDOMDragCtn.current.offsetHeight;
                _this.refDOMDragCtn.current.style.webkitTransform = _this.transformScheme.replace("%v", finishVal);
                _this.refDOMDragCtn.current.style.transform = _this.transformScheme.replace("%v", finishVal);

                _this.refDOMDragCtn.current.offsetHeight;

                _this.refDOMDragCtn.current.style.webkitTransition = "initial";
                _this.refDOMDragCtn.current.style.transition = "initial";

                setTimeout(function () {
                    _this.refDOMBgLayer.current.style.webkitTransition = "initial";
                    _this.refDOMBgLayer.current.style.transition = "initial";

                    _this.currentVal = finishVal;

                    if (finishVal === _this.hiddenVal) {
                        _this.refDOM.current.style.display = "none";
                    }

                    _this.animating = false;

                    if (_this.props.isShown !== _this.isShown()) {
                        _this.props.visibilityCallback(_this.isShown());
                    }

                    resolve(_this.isShown());
                }, _this.props.animationTime + 5);
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AirrSidepanel, [{
        key: "enable",
        value: function enable() {
            this.sceneDOM.removeEventListener(this.startEvent, this.handleTouchStart);
            this.sceneDOM.addEventListener(this.startEvent, this.handleTouchStart, _eventHelpers.supportPassive);
        }
    }, {
        key: "disable",
        value: function disable() {
            this.sceneDOM.removeEventListener(this.startEvent, this.handleTouchStart);
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.sceneDOM = this.refDOM.current.parentNode;

            if (this.props.enabled) {
                this.enable();
            }
        }
    }, {
        key: "__bubbleChildTillParent",
        value: function __bubbleChildTillParent(child, parent, tillElements) {
            if (child.parentNode === parent) {
                return true;
            } else {
                if (!child.parentNode || tillElements.indexOf(child.parentNode) !== -1) {
                    return false;
                } else {
                    return this.__bubbleChildTillParent(child.parentNode, parent, tillElements);
                }
            }
        }
    }, {
        key: "updateSideProps",
        value: function updateSideProps(side, sizeFactor) {
            if (side === "left" || side === "right") {
                this.size = this.props.sceneWidth * sizeFactor;
                this.sceneSize = this.props.sceneWidth;
                this.hiddenVal = side === "left" ? -1 * this.size : this.props.sceneWidth;
                this.transformScheme = "translate3d(%vpx,0,0)";
                this.axis = "X";
            } else {
                this.size = this.props.sceneHeight * sizeFactor;
                this.sceneSize = this.props.sceneHeight;
                this.hiddenVal = side === "top" ? -1 * this.size : this.props.sceneHeight;
                this.transformScheme = "translate3d(0,%vpx,0)";
                this.axis = "Y";
            }

            if (side === "top" || side === "left") {
                this.shownVal = 0;
            } else {
                this.shownVal = this.sceneSize - this.size;
            }

            if (this.props.isShown) {
                this.currentVal = this.shownVal;
            } else {
                this.currentVal = this.hiddenVal;
            }

            this.lastSide = side;
            this.lastSizeFactor = sizeFactor;
            this.lastSceneWidth = this.props.sceneWidth;
            this.lastSceneHeight = this.props.sceneHeight;
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
            if (prevProps.enabled !== this.props.enabled) {
                return this[this.props.enabled ? "enable" : "disable"]();
            }
        }
    }, {
        key: "render",
        value: function render() {
            var className = "airr-sidepanel " + this.props.side + " " + (this.props.enabled ? "enabled" : "disabled");
            var dragCtnStyle = {};
            var sidepanelStyle = void 0;
            var bgLayerStyle = void 0;

            if (this.props.side !== this.lastSide || this.props.sizeFactor !== this.lastSizeFactor || this.props.sceneWidth !== this.lastSceneWidth || this.props.sceneHeight !== this.lastSceneHeight) {
                this.updateSideProps(this.props.side, this.props.sizeFactor);
            }

            if (this.props.side === "left" || this.props.side === "right") {
                dragCtnStyle.width = this.size + "px";
                dragCtnStyle.height = "100%";
            } else {
                dragCtnStyle.height = this.size + "px";
                dragCtnStyle.width = "100%";
            }

            if (this.props.isShown) {
                dragCtnStyle.WebkitTransform = this.transformScheme.replace("%v", this.shownVal);
                dragCtnStyle.transform = this.transformScheme.replace("%v", this.shownVal);
                sidepanelStyle = { display: "block" };
                bgLayerStyle = { opacity: this.props.bgLayerOpacity };
            } else {
                dragCtnStyle.WebkitTransform = this.transformScheme.replace("%v", this.hiddenVal);
                dragCtnStyle.transform = this.transformScheme.replace("%v", this.hiddenVal);
                sidepanelStyle = { display: "none" };
                bgLayerStyle = { opacity: 0 };
            }

            var children = typeof this.props.children === "function" ? this.props.children() : this.props.children;

            return _react2.default.createElement(
                "div",
                { className: className, ref: this.refDOM, style: sidepanelStyle },
                _react2.default.createElement("div", { ref: this.refDOMBgLayer, style: bgLayerStyle }),
                _react2.default.createElement(
                    "div",
                    { ref: this.refDOMDragCtn, style: dragCtnStyle },
                    children
                )
            );
        }
    }]);

    return AirrSidepanel;
}(_react.Component);

exports.default = AirrSidepanel;

AirrSidepanel.propTypes = {
    side: _propTypes2.default.oneOf(["left", "right", "top", "bottom"]),

    isShown: _propTypes2.default.bool,

    enabled: _propTypes2.default.bool,

    sizeFactor: _propTypes2.default.number,

    sceneWidth: _propTypes2.default.number,

    sceneHeight: _propTypes2.default.number,

    visibilityCallback: _propTypes2.default.func,

    animationTime: _propTypes2.default.number,

    bgLayerOpacity: _propTypes2.default.number
};
AirrSidepanel.defaultProps = {
    side: "left",
    isShown: false,
    enabled: false,
    sizeFactor: 2 / 3,
    sceneWidth: null,
    sceneHeight: null,
    visibilityCallback: function visibilityCallback(isShown) {},
    animationTime: 200,
    bgLayerOpacity: 0.7
};