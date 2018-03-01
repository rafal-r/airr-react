"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AirrComponent2 = require("./AirrComponent");

var _AirrComponent3 = _interopRequireDefault(_AirrComponent2);

var _eventHelpers = require("./eventHelpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrSidepanel = function (_AirrComponent) {
    _inherits(AirrSidepanel, _AirrComponent);

    function AirrSidepanel(props) {
        _classCallCheck(this, AirrSidepanel);

        var _this = _possibleConstructorReturn(this, (AirrSidepanel.__proto__ || Object.getPrototypeOf(AirrSidepanel)).call(this, props));

        _this.state = {
            side: _this.props.side,
            isShown: _this.props.isShown,
            sizeFactor: _this.props.sizeFactor,
            sceneWidth: _this.props.sceneWidth,
            sceneHeight: _this.props.sceneHeight
        };
        _this.enabled = _this.props.enabled;
        _this.startEvent = _eventHelpers.isMobileDevice ? "touchstart" : "mousedown";
        _this.moveEvent = _eventHelpers.isMobileDevice ? "touchmove" : "mousemove";
        _this.endEvent = _eventHelpers.isMobileDevice ? "touchend" : "mouseup";

        _this.getPosition = function (e, axis) {
            return "changedTouches" in e ? e.changedTouches[0]["client" + axis] : e["client" + axis];
        };

        _this.getLastPosition = function (e) {
            return "changedTouches" in e ? e.changedTouches[0] : { clientX: e.clientX, clientY: e.clientY };
        };

        _this.getEventX = function (e) {
            return "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
        };

        _this.getEventY = function (e) {
            return "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
        };

        _this.handleTouchStart = function (e) {
            var pos = _this.getPosition(e, _this.axis);
            var dragCtnOnTouchPath = false;

            if (e.path) {
                for (var i = 0; i < e.path.length; i++) {
                    if (e.path[i] === _this.dragCtnDOM) {
                        dragCtnOnTouchPath = true;
                    }
                }
            } else {
                if (e.target === _this.dragCtnDOM || _this.bubbleChildTillParent(e.target, _this.dragCtnDOM, [_this.dragCtnDOM.parentNode, document.body])) {
                    dragCtnOnTouchPath = true;
                }
            }

            if (!dragCtnOnTouchPath && (["left", "top"].indexOf(_this.state.side) !== -1 && pos < 20 || ["right", "bottom"].indexOf(_this.state.side) !== -1 && pos > _this.hiddenVal - 20)) {
                //corner touch, show moves

                _this.sidepanelDOM.style.display = "block";
                _this.sceneDOM.addEventListener(_this.moveEvent, _this.handleShowTouchMove, _eventHelpers.supportPassive);
                _this.sceneDOM.addEventListener(_this.endEvent, _this.handleTouchEnd, false);

                _this.triggerCustom("showTouchStart");

                var showmoveend = function showmoveend() {
                    _this.sceneDOM.removeEventListener(_this.endEvent, showmoveend); //remove self to act like once listener
                    _this.sceneDOM.removeEventListener(_this.moveEvent, _this.handleShowTouchMove);
                    _this.triggerCustom("showTouchEnd");
                };

                _this.sceneDOM.addEventListener(_this.endEvent, showmoveend, false);
            } else if (_this.currentVal === _this.shownVal) {
                //fully visible, hide moves
                _this.sceneDOM.addEventListener(_this.moveEvent, _this.handleHideTouchMove, _eventHelpers.supportPassive);
                _this.sceneDOM.addEventListener(_this.endEvent, _this.handleTouchEnd, false);

                _this.triggerCustom("hideTouchStart");

                var hidemoveend = function hidemoveend() {
                    _this.sceneDOM.removeEventListener(_this.endEvent, hidemoveend);
                    _this.sceneDOM.removeEventListener(_this.moveEvent, _this.handleHideTouchMove);
                    _this.triggerCustom("hideTouchEnd");
                };

                _this.sceneDOM.addEventListener(_this.endEvent, hidemoveend, false);
            }

            if (e.target === _this.bgLayerDOM) {
                //tap to hide
                if (["left", "top"].indexOf(_this.state.side) !== -1 && _this.currentVal === 0 || ["right", "bottom"].indexOf(_this.state.side) !== -1 && _this.currentVal) {
                    var hidedragctn = function hidedragctn(e) {
                        _this.sceneDOM.removeEventListener(_this.endEvent, hidedragctn);
                        if (Math.abs(pos - _this.getPosition(e, _this.axis)) <= 2.5) {
                            //little diff allowance
                            _this.hide();
                        }
                    };

                    _this.sceneDOM.addEventListener(_this.endEvent, hidedragctn, false);
                }
            }

            _this.lastTouch = _this.getLastPosition(e);
        };

        _this.handleShowTouchMove = function (e) {
            var pos = _this.getPosition(e, _this.axis);
            var newVal = void 0,
                progress = void 0;

            if (["left", "top"].indexOf(_this.state.side) !== -1) {
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

                _this.bgLayerDOM.style.opacity = progress * 0.7;

                _this.dragCtnDOM.style.webkitTransform = _this.transformScheme.replace("%v", _this.currentVal);
                _this.dragCtnDOM.style.transform = _this.transformScheme.replace("%v", _this.currentVal);
            }

            _this.lastTouch = _this.getLastPosition(e);

            if (!_eventHelpers.supportPassive) {
                e.preventDefault();
            }
        };

        _this.handleHideTouchMove = function (e) {
            var progress = void 0,
                newVal = void 0,
                change = void 0,
                moveAxis = void 0;

            if (_this.lastTouch) {
                if (Math.abs(_this.lastTouch.clientX - _this.getEventX(e)) >= Math.abs(_this.lastTouch.clientY - _this.getEventY(e))) {
                    if (_this.getEventX(e) - _this.lastTouch.clientX <= 0) {
                        // move = 'left';
                        moveAxis = "X";
                    } else {
                        // move = 'right';
                        moveAxis = "X";
                    }
                } else {
                    if (_this.getEventY(e) - _this.lastTouch.clientY <= 0) {
                        // move = 'top';
                        moveAxis = "Y";
                    } else {
                        // move = 'bottom';
                        moveAxis = "Y";
                    }
                }
            }

            if (moveAxis === _this.axis && (["left", "top"].indexOf(_this.state.side) !== -1 && _this.getPosition(e, moveAxis) < _this.size || ["right", "bottom"].indexOf(_this.state.side) !== -1 && _this.getPosition(e, moveAxis) > _this.hiddenVal - _this.size)) {
                change = _this.getPosition(e, _this.axis) - _this.lastTouch["client" + _this.axis];
                newVal = _this.currentVal + change;

                if (_this.state.side === "left" || _this.state.side === "top") {
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

                    _this.bgLayerDOM.style.opacity = progress * 0.7;

                    _this.dragCtnDOM.style.webkitTransform = _this.transformScheme.replace("%v", _this.currentVal);
                    _this.dragCtnDOM.style.transform = _this.transformScheme.replace("%v", _this.currentVal);
                }
            }

            _this.lastTouch = _this.getLastPosition(e);
            if (!_eventHelpers.supportPassive) {
                e.preventDefault();
            }
        };

        _this.handleTouchEnd = function (e) {
            var val = null;

            if (_this.currentVal !== _this.shownVal && _this.currentVal !== _this.hiddenVal) {
                if (["left", "top"].indexOf(_this.state.side) !== -1) {
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
                _this.sidepanelDOM.style.display = "none";
            }

            if (val !== null) {
                _this.translateTo(val, function () {
                    _this.setState({
                        isShown: _this.isShown()
                    });
                });
            } else {
                _this.setState({
                    isShown: _this.isShown()
                });
            }

            _this.sceneDOM.removeEventListener(_this.endEvent, _this.handleTouchEnd);
        };

        _this.hide = function () {
            return _this.translateTo(_this.hiddenVal);
        };

        _this.show = function () {
            return _this.translateTo(_this.shownVal);
        };

        _this.isShown = function () {
            return _this.sidepanelDOM.offsetParent !== null;
        };

        _this.translateTo = function (finishVal) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

            _this.bgLayerDOM.style.webkitTransition = "opacity .2s ease-in";
            _this.bgLayerDOM.style.transition = "opacity .2s ease-in";
            // eslint-disable-next-line
            _this.bgLayerDOM.offsetHeight;

            if (finishVal === _this.shownVal) {
                if (!_this.isShown()) {
                    _this.sidepanelDOM.style.display = "block";
                }

                _this.bgLayerDOM.style.opacity = 0.7;
            } else if (finishVal === _this.hiddenVal) {
                _this.bgLayerDOM.style.opacity = 0;
            }
            // eslint-disable-next-line
            _this.sidepanelDOM.offsetHeight;
            _this.sidepanelDOM.style.webkitTransition = "initial";
            _this.sidepanelDOM.style.transition = "initial";

            _this.dragCtnDOM.style.webkitTransition = "-webkit-transform 0.2s ease-out";
            _this.dragCtnDOM.style.webkitTransition = "transform 0.2s ease-out";
            _this.dragCtnDOM.style.transition = "transform 0.2s ease-out";

            // eslint-disable-next-line
            _this.dragCtnDOM.offsetHeight;
            _this.dragCtnDOM.style.webkitTransform = _this.transformScheme.replace("%v", finishVal);
            _this.dragCtnDOM.style.transform = _this.transformScheme.replace("%v", finishVal);

            // eslint-disable-next-line
            _this.dragCtnDOM.offsetHeight;

            _this.dragCtnDOM.style.webkitTransition = "initial";
            _this.dragCtnDOM.style.transition = "initial";

            setTimeout(function () {
                _this.bgLayerDOM.style.webkitTransition = "initial";
                _this.bgLayerDOM.style.transition = "initial";

                _this.currentVal = finishVal;
                if (finishVal === _this.hiddenVal) {
                    _this.sidepanelDOM.style.display = "none";
                }

                callback();
            }, 205);
        };

        _this.updateSideProps(props.side);
        return _this;
    }

    _createClass(AirrSidepanel, [{
        key: "enable",
        value: function enable() {
            this.sceneDOM.removeEventListener(this.startEvent, this.handleTouchStart);
            this.sceneDOM.addEventListener(this.startEvent, this.handleTouchStart, _eventHelpers.supportPassive);
            this.enabled = true;
        }
    }, {
        key: "disable",
        value: function disable() {
            this.sceneDOM.removeEventListener(this.startEvent, this.handleTouchStart);
            this.enabled = false;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            this.sceneDOM = this.sidepanelDOM.parentNode;

            if (this.enabled) {
                this.enable();
            }
        }
    }, {
        key: "componentWillReceiveProps",
        value: function componentWillReceiveProps(nextProps) {
            if (!nextProps.enabled && this.enabled) {
                this.disable();
            }

            if (nextProps.enabled && !this.enabled) {
                this.enable();
            }

            if (nextProps.dragCtnStyle !== this.state.dragCtnStyle) {
                this.setState({ dragCtnStyle: nextProps.dragCtnStyle });
            }
            if (nextProps.side !== this.state.side) {
                this.updateSideProps(nextProps.side);
                this.setState({ side: nextProps.side });
            }
            if (nextProps.isShown !== this.state.isShown) {
                this.setState({ isShown: nextProps.isShown });
            }
            if (nextProps.sizeFactor !== this.state.sizeFactor) {
                this.setState({ sizeFactor: nextProps.sizeFactor });
            }
            if (nextProps.sceneWidth !== this.state.sceneWidth) {
                this.setState({ sceneWidth: nextProps.sceneWidth });
            }
            if (nextProps.sceneHeight !== this.state.sceneHeight) {
                this.setState({ sceneHeight: nextProps.sceneHeight });
            }
        }
    }, {
        key: "bubbleChildTillParent",
        value: function bubbleChildTillParent(child, parent, tillElements) {
            if (child.parentNode === parent) {
                return true;
            } else {
                if (!child.parentNode || tillElements.indexOf(child.parentNode) !== -1) {
                    return false;
                } else {
                    return this.bubbleChildTillParent(child.parentNode, parent, tillElements);
                }
            }
        }
    }, {
        key: "updateSideProps",
        value: function updateSideProps(side) {
            if (side === "left" || side === "right") {
                this.size = this.state.sceneWidth * this.state.sizeFactor;
                this.sceneSize = this.state.sceneWidth;
                this.hiddenVal = side === "left" ? -1 * this.size : this.state.sceneWidth;
                this.transformScheme = "translate3d(%vpx,0,0)";
                this.axis = "X";
            } else {
                //top,bottom
                this.size = this.state.sceneHeight * this.state.sizeFactor;
                this.sceneSize = this.state.sceneHeight;
                this.hiddenVal = side === "top" ? -1 * this.size : this.state.sceneHeight;
                this.transformScheme = "translate3d(0,%vpx,0)";
                this.axis = "Y";
            }

            if (side === "top" || side === "left") {
                this.shownVal = 0;
            } else {
                this.shownVal = this.sceneSize - this.size;
            }

            if (this.state.isShown) {
                this.currentVal = this.shownVal;
            } else {
                this.currentVal = this.hiddenVal;
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var className = "airr-sidepanel " + this.state.side;
            var dragCtnStyle = {};
            var sidepanelStyle = void 0;
            var bgLayerStyle = void 0;

            if (this.state.side === "left" || this.state.side === "right") {
                dragCtnStyle.width = this.size + "px";
                dragCtnStyle.height = "100%";
            } else {
                //top,bottom
                dragCtnStyle.height = this.size + "px";
                dragCtnStyle.width = "100%";
            }

            if (this.state.isShown) {
                dragCtnStyle.WebkitTransform = this.transformScheme.replace("%v", this.shownVal);
                dragCtnStyle.transform = this.transformScheme.replace("%v", this.shownVal);
                sidepanelStyle = { display: "block" };
                bgLayerStyle = { opacity: 0.7 };
            } else {
                dragCtnStyle.WebkitTransform = this.transformScheme.replace("%v", this.hiddenVal);
                dragCtnStyle.transform = this.transformScheme.replace("%v", this.hiddenVal);
                sidepanelStyle = { display: "none" };
                bgLayerStyle = { opacity: 0 };
            }

            return _react2.default.createElement(
                "div",
                {
                    className: className,
                    ref: function ref(dom) {
                        return _this2.sidepanelDOM = dom;
                    },
                    style: sidepanelStyle
                },
                _react2.default.createElement("div", {
                    ref: function ref(dom) {
                        return _this2.bgLayerDOM = dom;
                    },
                    style: bgLayerStyle
                }),
                _react2.default.createElement(
                    "div",
                    { ref: function ref(dom) {
                            return _this2.dragCtnDOM = dom;
                        }, style: dragCtnStyle },
                    this.props.children
                )
            );
        }
    }]);

    return AirrSidepanel;
}(_AirrComponent3.default);

exports.default = AirrSidepanel;

AirrSidepanel.propTypes = {
    side: _propTypes2.default.oneOf(["left", "right", "top", "bottom"]),
    isShown: _propTypes2.default.bool,
    enabled: _propTypes2.default.bool,
    sizeFactor: _propTypes2.default.number,
    sceneWidth: _propTypes2.default.number.isRequired,
    sceneHeight: _propTypes2.default.number.isRequired
};
AirrSidepanel.defaultProps = {
    side: "left", //side to which sidepanel will be attached
    isShown: false, //bool determining if sidepanel is shown or not
    enabled: false, //bool determining if sidepanel is enabled, another words, if its can be drag out
    sizeFactor: 2 / 3, //number between 0 and 1 determining how much size of whole screen sidepanel will take
    sceneWidth: null, //number parent side width dimension
    sceneHeight: null //number parent side height dimension
};