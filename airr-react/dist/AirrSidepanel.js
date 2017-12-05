'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AirrComponent2 = require('./AirrComponent');

var _AirrComponent3 = _interopRequireDefault(_AirrComponent2);

var _eventHelpers = require('./eventHelpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrSidepanel = function (_AirrComponent) {
    _inherits(AirrSidepanel, _AirrComponent);

    function AirrSidepanel(props) {
        _classCallCheck(this, AirrSidepanel);

        var _this = _possibleConstructorReturn(this, (AirrSidepanel.__proto__ || Object.getPrototypeOf(AirrSidepanel)).call(this, props));

        _this.enabled = false;


        _this.handleShowTouchMove = _this.handleShowTouchMove.bind(_this);
        _this.handleTouchStart = _this.handleTouchStart.bind(_this);
        _this.handleTouchEnd = _this.handleTouchEnd.bind(_this);
        _this.handleHideTouchMove = _this.handleHideTouchMove.bind(_this);

        _this.startEvent = _eventHelpers.isMobileDevice ? 'touchstart' : 'mousedown';
        _this.moveEvent = _eventHelpers.isMobileDevice ? 'touchmove' : 'mousemove';
        _this.endEvent = _eventHelpers.isMobileDevice ? 'touchend' : 'mouseup';
        return _this;
    }

    _createClass(AirrSidepanel, [{
        key: 'updateSide',
        value: function updateSide() {
            this.side = this.props.side;
            this.sceneWidth = this.props.sceneWidth;
            this.sceneHeight = this.props.sceneHeight;

            this.dragCtnStyle = Object.assign({}, this.props.dragCtnStyle);

            if (this.side === 'left' || this.side === 'right') {
                this.size = this.sceneWidth * this.props.sizeFactor;
                this.sceneSize = this.sceneWidth;
                this.hiddenVal = this.side === 'left' ? -1 * this.size : this.sceneWidth;
                this.transformScheme = 'translate3d(%vpx,0,0)';
                this.axis = 'X';

                this.dragCtnStyle.width = this.size + 'px';
                this.dragCtnStyle.height = '100%';
            } else {
                //top,bottom
                this.size = this.sceneHeight * this.props.sizeFactor;
                this.sceneSize = this.sceneHeight;
                this.hiddenVal = this.side === 'top' ? -1 * this.size : this.sceneHeight;
                this.transformScheme = 'translate3d(0,%vpx,0)';
                this.axis = 'Y';

                this.dragCtnStyle.height = this.size + 'px';
                this.dragCtnStyle.width = '100%';
            }

            if (this.side === 'top' || this.side === 'left') {
                this.shownVal = 0;
            } else {
                this.shownVal = this.sceneSize - this.size;
            }

            if (this.props.isShown) {
                this.dragCtnStyle.WebkitTransform = this.transformScheme.replace('%v', this.shownVal);
                this.dragCtnStyle.transform = this.transformScheme.replace('%v', this.shownVal);
                this.sidepanelStyle = { display: 'block' };
                this.bgLayerStyle = { opacity: .7 };
            } else {
                this.dragCtnStyle.WebkitTransform = this.transformScheme.replace('%v', this.hiddenVal);
                this.dragCtnStyle.transform = this.transformScheme.replace('%v', this.hiddenVal);
                this.sidepanelStyle = { display: 'none' };
                this.bgLayerStyle = { opacity: 0 };
            }
        }
    }, {
        key: 'isEnabled',
        value: function isEnabled() {
            return this.enabled;
        }
    }, {
        key: 'enable',
        value: function enable() {
            if (!this.isEnabled()) {
                this.sceneDOM.addEventListener(this.startEvent, this.handleTouchStart, _eventHelpers.supportPassive);
                this.enabled = true;
            }
        }
    }, {
        key: 'disable',
        value: function disable() {
            if (this.isEnabled()) {
                this.sceneDOM.removeEventListener(this.startEvent, this.handleTouchStart);
                this.enabled = false;
            }
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.sceneDOM = this.sidepanelDOM.parentNode;
            if (this.props.enabled) {
                this.enable();
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!nextProps.enabled && this.enabled) {
                this.disable();
            }

            if (nextProps.enabled && !this.enabled) {
                this.enable();
            }
        }
    }, {
        key: 'bubbleChildTillParent',
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
        key: 'getPosition',
        value: function getPosition(e, axis) {
            return 'changedTouches' in e ? e.changedTouches[0]['client' + axis] : e['client' + axis];
        }
    }, {
        key: 'getLastPosition',
        value: function getLastPosition(e) {
            return 'changedTouches' in e ? e.changedTouches[0] : { clientX: e.clientX, clientY: e.clientY };
        }
    }, {
        key: 'getEventX',
        value: function getEventX(e) {
            return 'changedTouches' in e ? e.changedTouches[0].clientX : e.clientX;
        }
    }, {
        key: 'getEventY',
        value: function getEventY(e) {
            return 'changedTouches' in e ? e.changedTouches[0].clientY : e.clientY;
        }
    }, {
        key: 'handleTouchStart',
        value: function handleTouchStart(e) {
            var _this2 = this;

            var pos = this.getPosition(e, this.axis);
            var dragCtnOnTouchPath = false;

            if (e.path) {
                for (var i = 0; i < e.path.length; i++) {
                    if (e.path[i] === this.dragCtnDOM) {
                        dragCtnOnTouchPath = true;
                    }
                }
            } else {
                if (e.target === this.dragCtnDOM || this.bubbleChildTillParent(e.target, this.dragCtnDOM, [this.dragCtnDOM.parentNode, document.body])) {
                    dragCtnOnTouchPath = true;
                }
            }

            if (!dragCtnOnTouchPath && (['left', 'top'].indexOf(this.side) !== -1 && pos < 20 || ['right', 'bottom'].indexOf(this.side) !== -1 && pos > this.hiddenVal - 20)) {
                //corner touch, show moves

                this.sidepanelDOM.style.display = 'block';
                this.sceneDOM.addEventListener(this.moveEvent, this.handleShowTouchMove, _eventHelpers.supportPassive);
                this.sceneDOM.addEventListener(this.endEvent, this.handleTouchEnd, false);

                this.triggerCustom('showTouchStart');

                var showmoveend = function showmoveend() {
                    _this2.sceneDOM.removeEventListener(_this2.endEvent, showmoveend); //remove self to act like once listener
                    _this2.sceneDOM.removeEventListener(_this2.moveEvent, _this2.handleShowTouchMove);
                    _this2.triggerCustom('showTouchEnd');
                };

                this.sceneDOM.addEventListener(this.endEvent, showmoveend, false);
            } else if (this.currentVal === this.shownVal) {
                //fully visible, hide moves
                this.sceneDOM.addEventListener(this.moveEvent, this.handleHideTouchMove, _eventHelpers.supportPassive);
                this.sceneDOM.addEventListener(this.endEvent, this.handleTouchEnd, false);

                this.triggerCustom('hideTouchStart');

                var hidemoveend = function hidemoveend() {
                    _this2.sceneDOM.removeEventListener(_this2.endEvent, hidemoveend);
                    _this2.sceneDOM.removeEventListener(_this2.moveEvent, _this2.handleHideTouchMove);
                    _this2.triggerCustom('hideTouchEnd');
                };

                this.sceneDOM.addEventListener(this.endEvent, hidemoveend, false);
            }

            if (e.target === this.bgLayerDOM) {
                //tap to hide
                if (['left', 'top'].indexOf(this.side) !== -1 && this.currentVal === 0 || ['right', 'bottom'].indexOf(this.side) !== -1 && this.currentVal) {

                    var hidedragctn = function hidedragctn(e) {
                        _this2.sceneDOM.removeEventListener(_this2.endEvent, hidedragctn);
                        if (Math.abs(pos - _this2.getPosition(e, _this2.axis)) <= 2.5) {
                            //little diff allowance
                            _this2.hide();
                        }
                    };

                    this.sceneDOM.addEventListener(this.endEvent, hidedragctn, false);
                }
            }

            this.lastTouch = this.getLastPosition(e);
        }
    }, {
        key: 'handleShowTouchMove',
        value: function handleShowTouchMove(e) {
            var pos = this.getPosition(e, this.axis);
            var newVal = void 0,
                progress = void 0;

            if (['left', 'top'].indexOf(this.side) !== -1) {
                if (pos <= -1 * this.hiddenVal) {
                    newVal = this.hiddenVal + pos;
                } else {
                    newVal = this.shownVal;
                }
                progress = pos / this.size;
            } else {
                if (this.hiddenVal - pos <= this.size) {
                    newVal = pos;
                } else {
                    newVal = this.shownVal;
                }
                progress = (this.sceneSize - pos) / this.size;
            }

            if (newVal !== this.currentVal) {
                this.currentVal = newVal;
                progress = parseFloat(progress);
                progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

                this.bgLayerDOM.style.opacity = progress * 0.7;

                this.dragCtnDOM.style.webkitTransform = this.transformScheme.replace('%v', this.currentVal);
                this.dragCtnDOM.style.transform = this.transformScheme.replace('%v', this.currentVal);
            }

            this.lastTouch = this.getLastPosition(e);

            if (!_eventHelpers.supportPassive) {
                e.preventDefault();
            }
        }
    }, {
        key: 'handleHideTouchMove',
        value: function handleHideTouchMove(e) {
            var progress = void 0,
                newVal = void 0,
                change = void 0,
                moveAxis = void 0;

            if (this.lastTouch) {
                if (Math.abs(this.lastTouch.clientX - this.getEventX(e)) >= Math.abs(this.lastTouch.clientY - this.getEventY(e))) {
                    if (this.getEventX(e) - this.lastTouch.clientX <= 0) {
                        // move = 'left';
                        moveAxis = 'X';
                    } else {
                        // move = 'right';
                        moveAxis = 'X';
                    }
                } else {
                    if (this.getEventY(e) - this.lastTouch.clientY <= 0) {
                        // move = 'top';
                        moveAxis = 'Y';
                    } else {
                        // move = 'bottom';
                        moveAxis = 'Y';
                    }
                }
            }

            if (moveAxis === this.axis && (['left', 'top'].indexOf(this.side) !== -1 && this.getPosition(e, moveAxis) < this.size || ['right', 'bottom'].indexOf(this.side) !== -1 && this.getPosition(e, moveAxis) > this.hiddenVal - this.size)) {
                change = this.getPosition(e, this.axis) - this.lastTouch['client' + this.axis];
                newVal = this.currentVal + change;

                if (this.side === 'left' || this.side === 'top') {

                    if (newVal < this.hiddenVal) {
                        newVal = this.hiddenVal;
                    } else if (newVal > this.shownVal) {
                        newVal = this.shownVal;
                    }

                    progress = 1 - Math.abs(newVal / this.size);
                } else {

                    if (newVal > this.hiddenVal) {
                        newVal = this.hiddenVal;
                    } else if (newVal < this.shownVal) {
                        newVal = this.shownVal;
                    }

                    progress = (this.sceneSize - newVal) / this.size;
                }

                if (newVal !== this.currentVal) {
                    this.currentVal = newVal;
                    progress = parseFloat(progress);
                    progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

                    this.bgLayerDOM.style.opacity = progress * 0.7;

                    this.dragCtnDOM.style.webkitTransform = this.transformScheme.replace('%v', this.currentVal);
                    this.dragCtnDOM.style.transform = this.transformScheme.replace('%v', this.currentVal);
                }
            }

            this.lastTouch = this.getLastPosition(e);
            if (!_eventHelpers.supportPassive) {
                e.preventDefault();
            }
        }
    }, {
        key: 'handleTouchEnd',
        value: function handleTouchEnd(e) {
            var val = null;

            if (this.currentVal !== this.shownVal && this.currentVal !== this.hiddenVal) {
                if (['left', 'top'].indexOf(this.side) !== -1) {
                    if (this.currentVal >= this.hiddenVal / 2) {
                        val = this.shownVal;
                    } else {
                        val = this.hiddenVal;
                    }
                } else {
                    if (this.currentVal < this.hiddenVal - this.size / 2) {
                        val = this.shownVal;
                    } else {
                        val = this.hiddenVal;
                    }
                }
            } else if (this.currentVal === this.hiddenVal) {
                this.sidepanelDOM.style.display = 'none';
            }

            if (val !== null) {
                this.translateTo(val);
            }

            this.sceneDOM.removeEventListener(this.endEvent, this.handleTouchEnd);
        }
    }, {
        key: 'hide',
        value: function hide() {
            return this.translateTo(this.hiddenVal);
        }
    }, {
        key: 'show',
        value: function show() {
            return this.translateTo(this.shownVal);
        }
    }, {
        key: 'isShown',
        value: function isShown() {
            return this.sidepanelDOM.offsetParent !== null;
        }
    }, {
        key: 'translateTo',
        value: function translateTo(finishVal) {
            var _this3 = this;

            this.bgLayerDOM.style.webkitTransition = 'opacity .2s ease-in';
            this.bgLayerDOM.style.transition = 'opacity .2s ease-in';
            // eslint-disable-next-line
            this.bgLayerDOM.offsetHeight;

            if (finishVal === this.shownVal) {
                if (!this.isShown()) {
                    this.sidepanelDOM.style.display = 'block';
                }

                this.bgLayerDOM.style.opacity = 0.7;
            } else if (finishVal === this.hiddenVal) {
                this.bgLayerDOM.style.opacity = 0;
            }
            // eslint-disable-next-line
            this.sidepanelDOM.offsetHeight;
            this.sidepanelDOM.style.webkitTransition = 'initial';
            this.sidepanelDOM.style.transition = 'initial';

            this.dragCtnDOM.style.webkitTransition = '-webkit-transform 0.2s ease-out';
            this.dragCtnDOM.style.webkitTransition = 'transform 0.2s ease-out';
            this.dragCtnDOM.style.transition = 'transform 0.2s ease-out';

            // eslint-disable-next-line
            this.dragCtnDOM.offsetHeight;
            this.dragCtnDOM.style.webkitTransform = this.transformScheme.replace('%v', finishVal);
            this.dragCtnDOM.style.transform = this.transformScheme.replace('%v', finishVal);

            // eslint-disable-next-line
            this.dragCtnDOM.offsetHeight;

            this.dragCtnDOM.style.webkitTransition = 'initial';
            this.dragCtnDOM.style.transition = 'initial';

            setTimeout(function () {
                _this3.bgLayerDOM.style.webkitTransition = 'initial';
                _this3.bgLayerDOM.style.transition = 'initial';

                _this3.currentVal = finishVal;
                if (finishVal === _this3.hiddenVal) {
                    _this3.sidepanelDOM.style.display = 'none';
                }
            }, 200);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this4 = this;

            this.updateSide();
            var className = "airr-sidepanel " + this.props.side;
            return _react2.default.createElement(
                'div',
                { className: className, ref: function ref(dom) {
                        return _this4.sidepanelDOM = dom;
                    }, style: this.sidepanelStyle },
                _react2.default.createElement('div', { ref: function ref(dom) {
                        return _this4.bgLayerDOM = dom;
                    }, style: this.bgLayerStyle }),
                _react2.default.createElement(
                    'div',
                    { ref: function ref(dom) {
                            return _this4.dragCtnDOM = dom;
                        }, style: this.dragCtnStyle },
                    this.props.children
                )
            );
        }
    }]);

    return AirrSidepanel;
}(_AirrComponent3.default);

exports.default = AirrSidepanel;

AirrSidepanel.propTypes = {
    side: _propTypes2.default.oneOf(['left', 'right', 'top', 'bottom']),
    dragCtnStyle: _propTypes2.default.object,
    isShown: _propTypes2.default.bool,
    enabled: _propTypes2.default.bool,
    sizeFactor: _propTypes2.default.number,
    sceneWidth: _propTypes2.default.number.isRequired,
    sceneHeight: _propTypes2.default.number.isRequired
};
AirrSidepanel.defaultProps = {
    side: 'left', //side to which sidepanel will be attached
    dragCtnStyle: {}, //optional style properties for sidepanel
    isShown: false, //bool determining if sidepanel is shown or not
    enabled: true, //bool determining if sidepanel is enabled, another words, if its can be drag out
    sizeFactor: 2 / 3, //number between 0 and 1 determining how much size of whole screen sidepanel will take
    sceneWidth: null, //number parent side width dimension
    sceneHeight: null //number parent side height dimension
};