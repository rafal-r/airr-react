"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _eventHelpers = require("./eventHelpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AirrSidepanel =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AirrSidepanel, _PureComponent);

  function AirrSidepanel() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AirrSidepanel);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AirrSidepanel)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "size", void 0);

    _defineProperty(_assertThisInitialized(_this), "sceneSize", void 0);

    _defineProperty(_assertThisInitialized(_this), "currentVal", void 0);

    _defineProperty(_assertThisInitialized(_this), "hiddenVal", void 0);

    _defineProperty(_assertThisInitialized(_this), "shownVal", void 0);

    _defineProperty(_assertThisInitialized(_this), "transformScheme", void 0);

    _defineProperty(_assertThisInitialized(_this), "axis", void 0);

    _defineProperty(_assertThisInitialized(_this), "lastSide", void 0);

    _defineProperty(_assertThisInitialized(_this), "lastSizeFactor", void 0);

    _defineProperty(_assertThisInitialized(_this), "refDOMDragCtn", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "refDOMBgLayer", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "refDOM", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "sceneDOM", void 0);

    _defineProperty(_assertThisInitialized(_this), "lastTouch", void 0);

    _defineProperty(_assertThisInitialized(_this), "startEvent", _eventHelpers.isMobileDevice ? "touchstart" : "mousedown");

    _defineProperty(_assertThisInitialized(_this), "moveEvent", _eventHelpers.isMobileDevice ? "touchmove" : "mousemove");

    _defineProperty(_assertThisInitialized(_this), "endEvent", _eventHelpers.isMobileDevice ? "touchend" : "mouseup");

    _defineProperty(_assertThisInitialized(_this), "animating", false);

    _defineProperty(_assertThisInitialized(_this), "lastSceneWidth", void 0);

    _defineProperty(_assertThisInitialized(_this), "lastSceneHeight", void 0);

    _defineProperty(_assertThisInitialized(_this), "getPosition", function (e, axis) {
      var obj = "changedTouches" in e ? e.changedTouches[0] : e;
      return axis === "X" ? obj.clientX : obj.clientY;
    });

    _defineProperty(_assertThisInitialized(_this), "getLastPosition", function (e) {
      var obj = "changedTouches" in e ? e.changedTouches[0] : e;
      return {
        clientX: obj.clientX,
        clientY: obj.clientY
      };
    });

    _defineProperty(_assertThisInitialized(_this), "getEventX", function (e) {
      return "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    });

    _defineProperty(_assertThisInitialized(_this), "getEventY", function (e) {
      return "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchStart", function (e) {
      var pos = _this.getPosition(e, _this.axis);

      var dragCtnOnTouchPath = false; // @ts-ignore

      var path = e.path || e.composedPath && e.composedPath();

      if (path) {
        for (var i = 0; i < path.length; i++) {
          if (path[i] === _this.refDOMDragCtn.current) {
            dragCtnOnTouchPath = true;
          }
        }
      } else {
        if (e.target instanceof Element && (e.target === _this.refDOMDragCtn.current || _this.__bubbleChildTillParent(e.target, _this.refDOMDragCtn.current, [_this.refDOMDragCtn.current.parentElement, document.body]))) {
          dragCtnOnTouchPath = true;
        }
      }

      if (!dragCtnOnTouchPath && (["left", "top"].indexOf(_this.props.side) !== -1 && pos < 20 || ["right", "bottom"].indexOf(_this.props.side) !== -1 && pos > _this.hiddenVal - 20)) {
        //corner touch, show moves
        _this.refDOM.current.style.display = "block";

        _this.sceneDOM.addEventListener(_this.moveEvent, _this.handleShowTouchMove, _eventHelpers.supportPassive);

        _this.sceneDOM.addEventListener(_this.endEvent, _this.handleTouchEnd, false); // this.triggerCustom("showTouchStart");


        var showmoveend = function showmoveend() {
          _this.sceneDOM.removeEventListener(_this.endEvent, showmoveend); //remove self to act like once listener


          _this.sceneDOM.removeEventListener(_this.moveEvent, _this.handleShowTouchMove); // this.triggerCustom("showTouchEnd");

        };

        _this.sceneDOM.addEventListener(_this.endEvent, showmoveend, false);
      } else if (_this.currentVal === _this.shownVal) {
        //fully visible, hide moves
        _this.sceneDOM.addEventListener(_this.moveEvent, _this.handleHideTouchMove, _eventHelpers.supportPassive);

        _this.sceneDOM.addEventListener(_this.endEvent, _this.handleTouchEnd, false); // this.triggerCustom("hideTouchStart");


        var hidemoveend = function hidemoveend() {
          _this.sceneDOM.removeEventListener(_this.endEvent, hidemoveend);

          _this.sceneDOM.removeEventListener(_this.moveEvent, _this.handleHideTouchMove); // this.triggerCustom("hideTouchEnd");

        };

        _this.sceneDOM.addEventListener(_this.endEvent, hidemoveend, false);
      }

      if (e.target === _this.refDOMBgLayer.current) {
        //tap to hide
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
    });

    _defineProperty(_assertThisInitialized(_this), "handleShowTouchMove", function (e) {
      var pos = _this.getPosition(e, _this.axis);

      var newVal,
          progress = 0;

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
        progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;
        _this.refDOMBgLayer.current.style.opacity = String(progress * _this.props.bgLayerOpacity);
        _this.refDOMDragCtn.current.style.webkitTransform = _this.transformScheme.replace("%v", String(_this.currentVal));
        _this.refDOMDragCtn.current.style.transform = _this.transformScheme.replace("%v", String(_this.currentVal));
      }

      _this.lastTouch = _this.getLastPosition(e);

      if (!_eventHelpers.supportPassive) {
        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleHideTouchMove", function (e) {
      var progress = 0,
          newVal,
          change,
          moveAxis;

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
          progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;
          _this.refDOMBgLayer.current.style.opacity = String(progress * _this.props.bgLayerOpacity);
          _this.refDOMDragCtn.current.style.webkitTransform = _this.transformScheme.replace("%v", String(_this.currentVal));
          _this.refDOMDragCtn.current.style.transform = _this.transformScheme.replace("%v", String(_this.currentVal));
        }
      }

      _this.lastTouch = _this.getLastPosition(e);

      if (!_eventHelpers.supportPassive) {
        e.preventDefault();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleTouchEnd", function (e) {
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
    });

    _defineProperty(_assertThisInitialized(_this), "hide", function () {
      return _this.translateTo(_this.hiddenVal);
    });

    _defineProperty(_assertThisInitialized(_this), "show", function () {
      _this.enable();

      return _this.translateTo(_this.shownVal);
    });

    _defineProperty(_assertThisInitialized(_this), "isShown", function () {
      return _this.refDOM.current.offsetParent !== null;
    });

    _defineProperty(_assertThisInitialized(_this), "translateTo", function (finishVal) {
      return new Promise(function (resolve) {
        _this.animating = true;
        _this.refDOMBgLayer.current.style.webkitTransition = "opacity ".concat(_this.props.animationTime, "ms ease-in");
        _this.refDOMBgLayer.current.style.transition = "opacity ".concat(_this.props.animationTime, "ms ease-in");
        _this.refDOMBgLayer.current.offsetHeight;

        if (finishVal === _this.shownVal) {
          if (!_this.isShown()) {
            _this.refDOM.current.style.display = "block";
          }

          _this.refDOMBgLayer.current.style.opacity = String(_this.props.bgLayerOpacity);
        } else if (finishVal === _this.hiddenVal) {
          _this.refDOMBgLayer.current.style.opacity = "0";
        }

        _this.refDOM.current.offsetHeight;
        _this.refDOM.current.style.webkitTransition = "initial";
        _this.refDOM.current.style.transition = "initial";
        _this.refDOMDragCtn.current.style.webkitTransition = "-webkit-transform ".concat(_this.props.animationTime, "ms ease-out");
        _this.refDOMDragCtn.current.style.webkitTransition = "transform ".concat(_this.props.animationTime, "ms ease-out");
        _this.refDOMDragCtn.current.style.transition = "transform ".concat(_this.props.animationTime, "ms ease-out");
        _this.refDOMDragCtn.current.offsetHeight;
        _this.refDOMDragCtn.current.style.webkitTransform = _this.transformScheme.replace("%v", String(finishVal));
        _this.refDOMDragCtn.current.style.transform = _this.transformScheme.replace("%v", String(finishVal));
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
    });

    return _this;
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
      var refSceneDOM = this.refDOM.current && this.refDOM.current.parentNode;

      if (refSceneDOM) {
        this.sceneDOM = refSceneDOM;
      }

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
        if (!child.parentElement || tillElements.indexOf(child.parentElement) !== -1) {
          return false;
        } else {
          return this.__bubbleChildTillParent(child.parentElement, parent, tillElements);
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
        //top,bottom
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
        this[this.props.enabled ? "enable" : "disable"]();
      }
    }
  }, {
    key: "render",
    value: function render() {
      var className = "airr-sidepanel " + this.props.side + " " + (this.props.enabled ? "enabled" : "disabled");
      var dragCtnStyle = {
        width: "",
        height: "",
        transform: "",
        WebkitTransform: ""
      };
      var sidepanelStyle;
      var bgLayerStyle;

      if (this.props.side !== this.lastSide || this.props.sizeFactor !== this.lastSizeFactor || this.props.sceneWidth !== this.lastSceneWidth || this.props.sceneHeight !== this.lastSceneHeight) {
        this.updateSideProps(this.props.side, this.props.sizeFactor);
      }

      if (this.props.side === "left" || this.props.side === "right") {
        dragCtnStyle.width = this.size + "px";
        dragCtnStyle.height = "100%";
      } else {
        //top,bottom
        dragCtnStyle.height = this.size + "px";
        dragCtnStyle.width = "100%";
      }

      if (this.props.isShown) {
        dragCtnStyle.WebkitTransform = this.transformScheme.replace("%v", String(this.shownVal));
        dragCtnStyle.transform = this.transformScheme.replace("%v", String(this.shownVal));
        sidepanelStyle = {
          display: "block"
        };
        bgLayerStyle = {
          opacity: this.props.bgLayerOpacity
        };
      } else {
        dragCtnStyle.WebkitTransform = this.transformScheme.replace("%v", String(this.hiddenVal));
        dragCtnStyle.transform = this.transformScheme.replace("%v", String(this.hiddenVal));
        sidepanelStyle = {
          display: "none"
        };
        bgLayerStyle = {
          opacity: 0
        };
      }

      var children = typeof this.props.children === "function" ? this.props.children() : this.props.children;
      return React.createElement("div", {
        className: className,
        ref: this.refDOM,
        style: sidepanelStyle
      }, React.createElement("div", {
        ref: this.refDOMBgLayer,
        style: bgLayerStyle
      }), React.createElement("div", {
        ref: this.refDOMDragCtn,
        style: dragCtnStyle
      }, children));
    }
  }]);

  return AirrSidepanel;
}(React.PureComponent);

exports.default = AirrSidepanel;

_defineProperty(AirrSidepanel, "defaultProps", {
  side: "left",
  isShown: false,
  enabled: false,
  sizeFactor: 2 / 3,
  sceneWidth: null,
  sceneHeight: null,
  visibilityCallback: function visibilityCallback(isShown) {},
  animationTime: 200,
  bgLayerOpacity: 0.7
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyU2lkZXBhbmVsLnRzeCJdLCJuYW1lcyI6WyJBaXJyU2lkZXBhbmVsIiwiUmVhY3QiLCJjcmVhdGVSZWYiLCJpc01vYmlsZURldmljZSIsImUiLCJheGlzIiwib2JqIiwiY2hhbmdlZFRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsInBvcyIsImdldFBvc2l0aW9uIiwiZHJhZ0N0bk9uVG91Y2hQYXRoIiwicGF0aCIsImNvbXBvc2VkUGF0aCIsImkiLCJsZW5ndGgiLCJyZWZET01EcmFnQ3RuIiwiY3VycmVudCIsInRhcmdldCIsIkVsZW1lbnQiLCJfX2J1YmJsZUNoaWxkVGlsbFBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJkb2N1bWVudCIsImJvZHkiLCJpbmRleE9mIiwicHJvcHMiLCJzaWRlIiwiaGlkZGVuVmFsIiwicmVmRE9NIiwic3R5bGUiLCJkaXNwbGF5Iiwic2NlbmVET00iLCJhZGRFdmVudExpc3RlbmVyIiwibW92ZUV2ZW50IiwiaGFuZGxlU2hvd1RvdWNoTW92ZSIsInN1cHBvcnRQYXNzaXZlIiwiZW5kRXZlbnQiLCJoYW5kbGVUb3VjaEVuZCIsInNob3dtb3ZlZW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImN1cnJlbnRWYWwiLCJzaG93blZhbCIsImhhbmRsZUhpZGVUb3VjaE1vdmUiLCJoaWRlbW92ZWVuZCIsInJlZkRPTUJnTGF5ZXIiLCJoaWRlZHJhZ2N0biIsIk1hdGgiLCJhYnMiLCJoaWRlIiwibGFzdFRvdWNoIiwiZ2V0TGFzdFBvc2l0aW9uIiwibmV3VmFsIiwicHJvZ3Jlc3MiLCJzaXplIiwic2NlbmVTaXplIiwib3BhY2l0eSIsIlN0cmluZyIsImJnTGF5ZXJPcGFjaXR5Iiwid2Via2l0VHJhbnNmb3JtIiwidHJhbnNmb3JtU2NoZW1lIiwicmVwbGFjZSIsInRyYW5zZm9ybSIsInByZXZlbnREZWZhdWx0IiwiY2hhbmdlIiwibW92ZUF4aXMiLCJnZXRFdmVudFgiLCJnZXRFdmVudFkiLCJ2YWwiLCJhbmltYXRpbmciLCJ0cmFuc2xhdGVUbyIsImlzU2hvd24iLCJ2aXNpYmlsaXR5Q2FsbGJhY2siLCJlbmFibGUiLCJvZmZzZXRQYXJlbnQiLCJmaW5pc2hWYWwiLCJQcm9taXNlIiwicmVzb2x2ZSIsIndlYmtpdFRyYW5zaXRpb24iLCJhbmltYXRpb25UaW1lIiwidHJhbnNpdGlvbiIsIm9mZnNldEhlaWdodCIsInNldFRpbWVvdXQiLCJzdGFydEV2ZW50IiwiaGFuZGxlVG91Y2hTdGFydCIsInJlZlNjZW5lRE9NIiwicGFyZW50Tm9kZSIsImVuYWJsZWQiLCJjaGlsZCIsInBhcmVudCIsInRpbGxFbGVtZW50cyIsInNpemVGYWN0b3IiLCJzY2VuZVdpZHRoIiwic2NlbmVIZWlnaHQiLCJsYXN0U2lkZSIsImxhc3RTaXplRmFjdG9yIiwibGFzdFNjZW5lV2lkdGgiLCJsYXN0U2NlbmVIZWlnaHQiLCJwcmV2UHJvcHMiLCJjbGFzc05hbWUiLCJkcmFnQ3RuU3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsIldlYmtpdFRyYW5zZm9ybSIsInNpZGVwYW5lbFN0eWxlIiwiYmdMYXllclN0eWxlIiwidXBkYXRlU2lkZVByb3BzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQThDcUJBLGE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvRUFzQkRDLEtBQUssQ0FBQ0MsU0FBTixFOztvRUFDQUQsS0FBSyxDQUFDQyxTQUFOLEU7OzZEQUNQRCxLQUFLLENBQUNDLFNBQU4sRTs7Ozs7O2lFQUtZQywrQkFBaUIsWUFBakIsR0FBZ0MsVzs7Z0VBQ2pDQSwrQkFBaUIsV0FBakIsR0FBK0IsVzs7K0RBQ2hDQSwrQkFBaUIsVUFBakIsR0FBOEIsUzs7Z0VBRTdCLEs7Ozs7OztrRUEwQ0UsVUFBQ0MsQ0FBRCxFQUE2QkMsSUFBN0IsRUFBb0Q7QUFDdEUsVUFBTUMsR0FBRyxHQUFHLG9CQUFvQkYsQ0FBcEIs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O0FBRUQsVUFBTW1ELFFBQVEsR0FDVixPQUFPLEtBQUtqRixLQUFMLENBQVdpRixRQUFsQixLQUErQixVQUEvQixHQUE0QyxLQUFLakYsS0FBTCxDQUFXaUYsUUFBWCxFQUE1QyxHQUFvRSxLQUFLakYsS0FBTCxDQUFXaUYsUUFEbkY7QUFHQSxhQUNJO0FBQUssUUFBQSxTQUFTLEVBQUVSLFNBQWhCO0FBQTJCLFFBQUEsR0FBRyxFQUFFLEtBQUt0RSxNQUFyQztBQUE2QyxRQUFBLEtBQUssRUFBRTJFO0FBQXBELFNBQ0k7QUFBSyxRQUFBLEdBQUcsRUFBRSxLQUFLM0QsYUFBZjtBQUE4QixRQUFBLEtBQUssRUFBRTREO0FBQXJDLFFBREosRUFFSTtBQUFLLFFBQUEsR0FBRyxFQUFFLEtBQUt4RixhQUFmO0FBQThCLFFBQUEsS0FBSyxFQUFFbUY7QUFBckMsU0FDS08sUUFETCxDQUZKLENBREo7QUFRSDs7OztFQWhoQnNDQyxtQjs7OztnQkFBdEI1RyxhLGtCQUNZO0FBQ3pCMkIsRUFBQUEsSUFBSSxFQUFFLE1BRG1CO0FBRXpCNEMsRUFBQUEsT0FBTyxFQUFFLEtBRmdCO0FBR3pCZ0IsRUFBQUEsT0FBTyxFQUFFLEtBSGdCO0FBSXpCSSxFQUFBQSxVQUFVLEVBQUUsSUFBSSxDQUpTO0FBS3pCQyxFQUFBQSxVQUFVLEVBQUUsSUFMYTtBQU16QkMsRUFBQUEsV0FBVyxFQUFFLElBTlk7QUFPekJyQixFQUFBQSxrQkFBa0IsRUFBRSw0QkFBQ0QsT0FBRCxFQUE0QixDQUFFLENBUHpCO0FBUXpCUSxFQUFBQSxhQUFhLEVBQUUsR0FSVTtBQVN6QnJCLEVBQUFBLGNBQWMsRUFBRTtBQVRTLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaXNNb2JpbGVEZXZpY2UsIHN1cHBvcnRQYXNzaXZlIH0gZnJvbSBcIi4vZXZlbnRIZWxwZXJzXCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBsYWNlbWVudCwgVG91Y2hQb3NpdGlvbiB9IGZyb20gXCIuL2FpcnItcmVhY3RcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9wcyB7XG4gICAgLyoqXG4gICAgICogU2lkZSB0byB3aGljaCBzaWRlcGFuZWwgd2lsbCBiZSBhdHRhY2hlZFxuICAgICAqL1xuICAgIHNpZGU6IFBsYWNlbWVudDtcbiAgICAvKipcbiAgICAgKiBCb29sIGRldGVybWluaW5nIGlmIHNpZGVwYW5lbCBpcyBzaG93biBvciBub3RcbiAgICAgKi9cbiAgICBpc1Nob3duOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEJvb2wgZGV0ZXJtaW5pbmcgaWYgc2lkZXBhbmVsIGlzIGVuYWJsZWQsIGFub3RoZXIgd29yZHMsIGlmIGl0cyBjYW4gYmUgZHJhZyBvdXRcbiAgICAgKi9cbiAgICBlbmFibGVkOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIE51bWJlciBiZXR3ZWVuIDAgYW5kIDEgZGV0ZXJtaW5pbmcgaG93IG11Y2ggc2l6ZSBvZiB3aG9sZSBzY3JlZW4gc2lkZXBhbmVsIHdpbGwgdGFrZVxuICAgICAqL1xuICAgIHNpemVGYWN0b3I6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBQYXJlbnQgc2NlbmUgd2lkdGggZGltZW5zaW9uLiBTZXQgYnkgcGFyZW50IHNjZW5lLiBEbyBub3Qgb3ZlcndyaXRlIS5cbiAgICAgKi9cbiAgICBzY2VuZVdpZHRoOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogUGFyZW50IHNjZW5lIGhlaWdodCBkaW1lbnNpb24uIFNldCBieSBwYXJlbnQgc2NlbmUuIERvIG5vdCBvdmVyd3JpdGUhLlxuICAgICAqL1xuICAgIHNjZW5lSGVpZ2h0OiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgaW52b2tlZCB3aGVuIHNpZGVwYW5lbCBjaGFuZ2VzIGl0cyB2aXNpYmlsaXR5IGR1cmluZyB0b3VjaCBldmVudHMuIFNldCBieSBwYXJlbnQgc2NlbmUuIERvIG5vdCBvdmVyd3JpdGUhLlxuICAgICAqL1xuICAgIHZpc2liaWxpdHlDYWxsYmFjazogKGlzU2hvd246IGJvb2xlYW4pID0+IHZvaWQ7XG4gICAgLyoqXG4gICAgICogQW5pbWF0aW9uIHRpbWUgaW4gbWlsaXNlY29uZHNcbiAgICAgKi9cbiAgICBhbmltYXRpb25UaW1lOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogT3BhY2l0eSBiZXR3ZWVuIDAgYW5kIDFcbiAgICAgKi9cbiAgICBiZ0xheWVyT3BhY2l0eTogbnVtYmVyO1xuICAgIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAgIHJlZj86IFJlZk9iamVjdDxBaXJyU2lkZXBhbmVsPjtcbn1cbnR5cGUgQXhpcyA9IFwiWFwiIHwgXCJZXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFpcnJTaWRlcGFuZWwgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzPiB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wczogUHJvcHMgPSB7XG4gICAgICAgIHNpZGU6IFwibGVmdFwiLFxuICAgICAgICBpc1Nob3duOiBmYWxzZSxcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIHNpemVGYWN0b3I6IDIgLyAzLFxuICAgICAgICBzY2VuZVdpZHRoOiBudWxsLFxuICAgICAgICBzY2VuZUhlaWdodDogbnVsbCxcbiAgICAgICAgdmlzaWJpbGl0eUNhbGxiYWNrOiAoaXNTaG93bjogYm9vbGVhbik6IHZvaWQgPT4ge30sXG4gICAgICAgIGFuaW1hdGlvblRpbWU6IDIwMCxcbiAgICAgICAgYmdMYXllck9wYWNpdHk6IDAuN1xuICAgIH07XG4gICAgcHJpdmF0ZSBzaXplOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzY2VuZVNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIGN1cnJlbnRWYWw6IG51bWJlcjtcbiAgICBwcml2YXRlIGhpZGRlblZhbDogbnVtYmVyO1xuICAgIHByaXZhdGUgc2hvd25WYWw6IG51bWJlcjtcbiAgICBwcml2YXRlIHRyYW5zZm9ybVNjaGVtZTogc3RyaW5nO1xuICAgIHByaXZhdGUgYXhpczogQXhpcztcbiAgICBwcml2YXRlIGxhc3RTaWRlOiBQbGFjZW1lbnQ7XG4gICAgcHJpdmF0ZSBsYXN0U2l6ZUZhY3RvcjogbnVtYmVyO1xuXG4gICAgcmVmRE9NRHJhZ0N0biA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcbiAgICByZWZET01CZ0xheWVyID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xuICAgIHJlZkRPTSA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcbiAgICBzY2VuZURPTTogTm9kZTtcblxuICAgIHByaXZhdGUgbGFzdFRvdWNoOiBUb3VjaFBvc2l0aW9uO1xuXG4gICAgcHJpdmF0ZSBzdGFydEV2ZW50ID0gaXNNb2JpbGVEZXZpY2UgPyBcInRvdWNoc3RhcnRcIiA6IFwibW91c2Vkb3duXCI7XG4gICAgcHJpdmF0ZSBtb3ZlRXZlbnQgPSBpc01vYmlsZURldmljZSA/IFwidG91Y2htb3ZlXCIgOiBcIm1vdXNlbW92ZVwiO1xuICAgIHByaXZhdGUgZW5kRXZlbnQgPSBpc01vYmlsZURldmljZSA/IFwidG91Y2hlbmRcIiA6IFwibW91c2V1cFwiO1xuXG4gICAgcHJpdmF0ZSBhbmltYXRpbmcgPSBmYWxzZTtcblxuICAgIHByaXZhdGUgbGFzdFNjZW5lV2lkdGg6IG51bWJlcjtcbiAgICBwcml2YXRlIGxhc3RTY2VuZUhlaWdodDogbnVtYmVyO1xuXG4gICAgZW5hYmxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjZW5lRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5zdGFydEV2ZW50LCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgICB0aGlzLnNjZW5lRE9NLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5zdGFydEV2ZW50LCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQsIHN1cHBvcnRQYXNzaXZlKTtcbiAgICB9XG5cbiAgICBkaXNhYmxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnNjZW5lRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5zdGFydEV2ZW50LCB0aGlzLmhhbmRsZVRvdWNoU3RhcnQpO1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCByZWZTY2VuZURPTSA9IHRoaXMucmVmRE9NLmN1cnJlbnQgJiYgdGhpcy5yZWZET00uY3VycmVudC5wYXJlbnROb2RlO1xuXG4gICAgICAgIGlmIChyZWZTY2VuZURPTSkge1xuICAgICAgICAgICAgdGhpcy5zY2VuZURPTSA9IHJlZlNjZW5lRE9NO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX19idWJibGVDaGlsZFRpbGxQYXJlbnQoXG4gICAgICAgIGNoaWxkOiBFbGVtZW50LFxuICAgICAgICBwYXJlbnQ6IEVsZW1lbnQsXG4gICAgICAgIHRpbGxFbGVtZW50czogRWxlbWVudFtdXG4gICAgKTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChjaGlsZC5wYXJlbnROb2RlID09PSBwYXJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCFjaGlsZC5wYXJlbnRFbGVtZW50IHx8IHRpbGxFbGVtZW50cy5pbmRleE9mKGNoaWxkLnBhcmVudEVsZW1lbnQpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19idWJibGVDaGlsZFRpbGxQYXJlbnQoY2hpbGQucGFyZW50RWxlbWVudCwgcGFyZW50LCB0aWxsRWxlbWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRQb3NpdGlvbiA9IChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCwgYXhpczogQXhpcyk6IG51bWJlciA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IFwiY2hhbmdlZFRvdWNoZXNcIiBpbiBlID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGU7XG4gICAgICAgIHJldHVybiBheGlzID09PSBcIlhcIiA/IG9iai5jbGllbnRYIDogb2JqLmNsaWVudFk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgZ2V0TGFzdFBvc2l0aW9uID0gKFxuICAgICAgICBlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudFxuICAgICk6IHsgY2xpZW50WDogbnVtYmVyOyBjbGllbnRZOiBudW1iZXIgfSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IFwiY2hhbmdlZFRvdWNoZXNcIiBpbiBlID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGU7XG4gICAgICAgIHJldHVybiB7IGNsaWVudFg6IG9iai5jbGllbnRYLCBjbGllbnRZOiBvYmouY2xpZW50WSB9O1xuICAgIH07XG5cbiAgICBwcml2YXRlIGdldEV2ZW50WCA9IChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCk6IG51bWJlciA9PiB7XG4gICAgICAgIHJldHVybiBcImNoYW5nZWRUb3VjaGVzXCIgaW4gZSA/IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCA6IGUuY2xpZW50WDtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBnZXRFdmVudFkgPSAoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpOiBudW1iZXIgPT4ge1xuICAgICAgICByZXR1cm4gXCJjaGFuZ2VkVG91Y2hlc1wiIGluIGUgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFkgOiBlLmNsaWVudFk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hTdGFydCA9IChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvc2l0aW9uKGUsIHRoaXMuYXhpcyk7XG4gICAgICAgIGxldCBkcmFnQ3RuT25Ub3VjaFBhdGggPSBmYWxzZTtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCBwYXRoID0gZS5wYXRoIHx8IChlLmNvbXBvc2VkUGF0aCAmJiBlLmNvbXBvc2VkUGF0aCgpKTtcblxuICAgICAgICBpZiAocGF0aCkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwYXRoLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHBhdGhbaV0gPT09IHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIGRyYWdDdG5PblRvdWNoUGF0aCA9IHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIGUudGFyZ2V0IGluc3RhbmNlb2YgRWxlbWVudCAmJlxuICAgICAgICAgICAgICAgIChlLnRhcmdldCA9PT0gdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQgfHxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2J1YmJsZUNoaWxkVGlsbFBhcmVudChlLnRhcmdldCwgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQsIFtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LnBhcmVudEVsZW1lbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5XG4gICAgICAgICAgICAgICAgICAgIF0pKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgZHJhZ0N0bk9uVG91Y2hQYXRoID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgICFkcmFnQ3RuT25Ub3VjaFBhdGggJiZcbiAgICAgICAgICAgICgoW1wibGVmdFwiLCBcInRvcFwiXS5pbmRleE9mKHRoaXMucHJvcHMuc2lkZSkgIT09IC0xICYmIHBvcyA8IDIwKSB8fFxuICAgICAgICAgICAgICAgIChbXCJyaWdodFwiLCBcImJvdHRvbVwiXS5pbmRleE9mKHRoaXMucHJvcHMuc2lkZSkgIT09IC0xICYmIHBvcyA+IHRoaXMuaGlkZGVuVmFsIC0gMjApKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIC8vY29ybmVyIHRvdWNoLCBzaG93IG1vdmVzXG5cbiAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgIHRoaXMuc2NlbmVET00uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVFdmVudCxcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVNob3dUb3VjaE1vdmUsXG4gICAgICAgICAgICAgICAgc3VwcG9ydFBhc3NpdmVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNjZW5lRE9NLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5lbmRFdmVudCwgdGhpcy5oYW5kbGVUb3VjaEVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDdXN0b20oXCJzaG93VG91Y2hTdGFydFwiKTtcblxuICAgICAgICAgICAgY29uc3Qgc2hvd21vdmVlbmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZW5kRXZlbnQsIHNob3dtb3ZlZW5kKTsgLy9yZW1vdmUgc2VsZiB0byBhY3QgbGlrZSBvbmNlIGxpc3RlbmVyXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMubW92ZUV2ZW50LCB0aGlzLmhhbmRsZVNob3dUb3VjaE1vdmUpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckN1c3RvbShcInNob3dUb3VjaEVuZFwiKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2NlbmVET00uYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmVuZEV2ZW50LCBzaG93bW92ZWVuZCwgZmFsc2UpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFZhbCA9PT0gdGhpcy5zaG93blZhbCkge1xuICAgICAgICAgICAgLy9mdWxseSB2aXNpYmxlLCBoaWRlIG1vdmVzXG4gICAgICAgICAgICB0aGlzLnNjZW5lRE9NLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRXZlbnQsXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVIaWRlVG91Y2hNb3ZlLFxuICAgICAgICAgICAgICAgIHN1cHBvcnRQYXNzaXZlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5hZGRFdmVudExpc3RlbmVyKHRoaXMuZW5kRXZlbnQsIHRoaXMuaGFuZGxlVG91Y2hFbmQsIGZhbHNlKTtcblxuICAgICAgICAgICAgLy8gdGhpcy50cmlnZ2VyQ3VzdG9tKFwiaGlkZVRvdWNoU3RhcnRcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IGhpZGVtb3ZlZW5kID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVET00ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmVuZEV2ZW50LCBoaWRlbW92ZWVuZCk7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMubW92ZUV2ZW50LCB0aGlzLmhhbmRsZUhpZGVUb3VjaE1vdmUpO1xuICAgICAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckN1c3RvbShcImhpZGVUb3VjaEVuZFwiKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHRoaXMuc2NlbmVET00uYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmVuZEV2ZW50LCBoaWRlbW92ZWVuZCwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGUudGFyZ2V0ID09PSB0aGlzLnJlZkRPTUJnTGF5ZXIuY3VycmVudCkge1xuICAgICAgICAgICAgLy90YXAgdG8gaGlkZVxuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIChbXCJsZWZ0XCIsIFwidG9wXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zaWRlKSAhPT0gLTEgJiYgdGhpcy5jdXJyZW50VmFsID09PSAwKSB8fFxuICAgICAgICAgICAgICAgIChbXCJyaWdodFwiLCBcImJvdHRvbVwiXS5pbmRleE9mKHRoaXMucHJvcHMuc2lkZSkgIT09IC0xICYmIHRoaXMuY3VycmVudFZhbClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGhpZGVkcmFnY3RuID0gKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVET00ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmVuZEV2ZW50LCBoaWRlZHJhZ2N0bik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChNYXRoLmFicyhwb3MgLSB0aGlzLmdldFBvc2l0aW9uKGUsIHRoaXMuYXhpcykpIDw9IDIuNSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5hZGRFdmVudExpc3RlbmVyKHRoaXMuZW5kRXZlbnQsIGhpZGVkcmFnY3RuLCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RUb3VjaCA9IHRoaXMuZ2V0TGFzdFBvc2l0aW9uKGUpO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGhhbmRsZVNob3dUb3VjaE1vdmUgPSAoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3NpdGlvbihlLCB0aGlzLmF4aXMpO1xuICAgICAgICBsZXQgbmV3VmFsLFxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSAwO1xuXG4gICAgICAgIGlmIChbXCJsZWZ0XCIsIFwidG9wXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zaWRlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIGlmIChwb3MgPD0gLTEgKiB0aGlzLmhpZGRlblZhbCkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHRoaXMuaGlkZGVuVmFsICsgcG9zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSB0aGlzLnNob3duVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSBwb3MgLyB0aGlzLnNpemU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oaWRkZW5WYWwgLSBwb3MgPD0gdGhpcy5zaXplKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gcG9zO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSB0aGlzLnNob3duVmFsO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcHJvZ3Jlc3MgPSAodGhpcy5zY2VuZVNpemUgLSBwb3MpIC8gdGhpcy5zaXplO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG5ld1ZhbCAhPT0gdGhpcy5jdXJyZW50VmFsKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWYWwgPSBuZXdWYWw7XG4gICAgICAgICAgICBwcm9ncmVzcyA9IHByb2dyZXNzID4gMSA/IDEgOiBwcm9ncmVzcyA8IDAgPyAwIDogcHJvZ3Jlc3M7XG5cbiAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50LnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcocHJvZ3Jlc3MgKiB0aGlzLnByb3BzLmJnTGF5ZXJPcGFjaXR5KTtcblxuICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgU3RyaW5nKHRoaXMuY3VycmVudFZhbClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIFwiJXZcIixcbiAgICAgICAgICAgICAgICBTdHJpbmcodGhpcy5jdXJyZW50VmFsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdFRvdWNoID0gdGhpcy5nZXRMYXN0UG9zaXRpb24oZSk7XG5cbiAgICAgICAgaWYgKCFzdXBwb3J0UGFzc2l2ZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgaGFuZGxlSGlkZVRvdWNoTW92ZSA9IChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBsZXQgcHJvZ3Jlc3MgPSAwLFxuICAgICAgICAgICAgbmV3VmFsOiBudW1iZXIsXG4gICAgICAgICAgICBjaGFuZ2U6IG51bWJlcixcbiAgICAgICAgICAgIG1vdmVBeGlzOiBzdHJpbmc7XG5cbiAgICAgICAgaWYgKHRoaXMubGFzdFRvdWNoKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgTWF0aC5hYnModGhpcy5sYXN0VG91Y2guY2xpZW50WCAtIHRoaXMuZ2V0RXZlbnRYKGUpKSA+PVxuICAgICAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubGFzdFRvdWNoLmNsaWVudFkgLSB0aGlzLmdldEV2ZW50WShlKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEV2ZW50WChlKSAtIHRoaXMubGFzdFRvdWNoLmNsaWVudFggPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlID0gJ2xlZnQnO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlQXhpcyA9IFwiWFwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgPSAncmlnaHQnO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlQXhpcyA9IFwiWFwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RXZlbnRZKGUpIC0gdGhpcy5sYXN0VG91Y2guY2xpZW50WSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgPSAndG9wJztcbiAgICAgICAgICAgICAgICAgICAgbW92ZUF4aXMgPSBcIllcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlID0gJ2JvdHRvbSc7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVBeGlzID0gXCJZXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbW92ZUF4aXMgPT09IHRoaXMuYXhpcyAmJlxuICAgICAgICAgICAgKChbXCJsZWZ0XCIsIFwidG9wXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zaWRlKSAhPT0gLTEgJiZcbiAgICAgICAgICAgICAgICB0aGlzLmdldFBvc2l0aW9uKGUsIG1vdmVBeGlzKSA8IHRoaXMuc2l6ZSkgfHxcbiAgICAgICAgICAgICAgICAoW1wicmlnaHRcIiwgXCJib3R0b21cIl0uaW5kZXhPZih0aGlzLnByb3BzLnNpZGUpICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdldFBvc2l0aW9uKGUsIG1vdmVBeGlzKSA+IHRoaXMuaGlkZGVuVmFsIC0gdGhpcy5zaXplKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBjaGFuZ2UgPSB0aGlzLmdldFBvc2l0aW9uKGUsIHRoaXMuYXhpcykgLSB0aGlzLmxhc3RUb3VjaFtcImNsaWVudFwiICsgdGhpcy5heGlzXTtcbiAgICAgICAgICAgIG5ld1ZhbCA9IHRoaXMuY3VycmVudFZhbCArIGNoYW5nZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuc2lkZSA9PT0gXCJsZWZ0XCIgfHwgdGhpcy5wcm9wcy5zaWRlID09PSBcInRvcFwiKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA8IHRoaXMuaGlkZGVuVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHRoaXMuaGlkZGVuVmFsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3VmFsID4gdGhpcy5zaG93blZhbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWwgPSB0aGlzLnNob3duVmFsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gMSAtIE1hdGguYWJzKG5ld1ZhbCAvIHRoaXMuc2l6ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPiB0aGlzLmhpZGRlblZhbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWwgPSB0aGlzLmhpZGRlblZhbDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbCA8IHRoaXMuc2hvd25WYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsID0gdGhpcy5zaG93blZhbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9ncmVzcyA9ICh0aGlzLnNjZW5lU2l6ZSAtIG5ld1ZhbCkgLyB0aGlzLnNpemU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChuZXdWYWwgIT09IHRoaXMuY3VycmVudFZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZhbCA9IG5ld1ZhbDtcbiAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IHByb2dyZXNzID4gMSA/IDEgOiBwcm9ncmVzcyA8IDAgPyAwIDogcHJvZ3Jlc3M7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUJnTGF5ZXIuY3VycmVudC5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKFxuICAgICAgICAgICAgICAgICAgICBwcm9ncmVzcyAqIHRoaXMucHJvcHMuYmdMYXllck9wYWNpdHlcbiAgICAgICAgICAgICAgICApO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgXCIldlwiLFxuICAgICAgICAgICAgICAgICAgICBTdHJpbmcodGhpcy5jdXJyZW50VmFsKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgXCIldlwiLFxuICAgICAgICAgICAgICAgICAgICBTdHJpbmcodGhpcy5jdXJyZW50VmFsKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RUb3VjaCA9IHRoaXMuZ2V0TGFzdFBvc2l0aW9uKGUpO1xuICAgICAgICBpZiAoIXN1cHBvcnRQYXNzaXZlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBoYW5kbGVUb3VjaEVuZCA9IChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICBsZXQgdmFsID0gbnVsbDtcblxuICAgICAgICBpZiAoIXRoaXMuYW5pbWF0aW5nKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VmFsICE9PSB0aGlzLnNob3duVmFsICYmIHRoaXMuY3VycmVudFZhbCAhPT0gdGhpcy5oaWRkZW5WYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoW1wibGVmdFwiLCBcInRvcFwiXS5pbmRleE9mKHRoaXMucHJvcHMuc2lkZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRWYWwgPj0gdGhpcy5oaWRkZW5WYWwgLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnNob3duVmFsO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy5oaWRkZW5WYWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VmFsIDwgdGhpcy5oaWRkZW5WYWwgLSB0aGlzLnNpemUgLyAyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLnNob3duVmFsO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy5oaWRkZW5WYWw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudFZhbCA9PT0gdGhpcy5oaWRkZW5WYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbCAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHRoaXMudHJhbnNsYXRlVG8odmFsKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNTaG93biAhPT0gdGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy52aXNpYmlsaXR5Q2FsbGJhY2sodGhpcy5pc1Nob3duKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2NlbmVET00ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmVuZEV2ZW50LCB0aGlzLmhhbmRsZVRvdWNoRW5kKTtcbiAgICB9O1xuXG4gICAgaGlkZSA9ICgpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlVG8odGhpcy5oaWRkZW5WYWwpO1xuICAgIH07XG5cbiAgICBzaG93ID0gKCk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVUbyh0aGlzLnNob3duVmFsKTtcbiAgICB9O1xuXG4gICAgaXNTaG93biA9ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVmRE9NLmN1cnJlbnQub2Zmc2V0UGFyZW50ICE9PSBudWxsO1xuICAgIH07XG5cbiAgICBwcml2YXRlIHRyYW5zbGF0ZVRvID0gKGZpbmlzaFZhbDogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgIChyZXNvbHZlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9IGBvcGFjaXR5ICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZVxuICAgICAgICAgICAgICAgIH1tcyBlYXNlLWluYDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUJnTGF5ZXIuY3VycmVudC5zdHlsZS50cmFuc2l0aW9uID0gYG9wYWNpdHkgJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25UaW1lXG4gICAgICAgICAgICAgICAgfW1zIGVhc2UtaW5gO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgICAgICAgICAgIGlmIChmaW5pc2hWYWwgPT09IHRoaXMuc2hvd25WYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET00uY3VycmVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQuc3R5bGUub3BhY2l0eSA9IFN0cmluZyh0aGlzLnByb3BzLmJnTGF5ZXJPcGFjaXR5KTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGZpbmlzaFZhbCA9PT0gdGhpcy5oaWRkZW5WYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQuc3R5bGUub3BhY2l0eSA9IFwiMFwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9IGAtd2Via2l0LXRyYW5zZm9ybSAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvblRpbWVcbiAgICAgICAgICAgICAgICB9bXMgZWFzZS1vdXRgO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBgdHJhbnNmb3JtICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZVxuICAgICAgICAgICAgICAgIH1tcyBlYXNlLW91dGA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9IGB0cmFuc2Zvcm0gJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25UaW1lXG4gICAgICAgICAgICAgICAgfW1zIGVhc2Utb3V0YDtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgICAgIFN0cmluZyhmaW5pc2hWYWwpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgICAgIFN0cmluZyhmaW5pc2hWYWwpXG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50Lm9mZnNldEhlaWdodDtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9IFwiaW5pdGlhbFwiO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUJnTGF5ZXIuY3VycmVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VmFsID0gZmluaXNoVmFsO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmIChmaW5pc2hWYWwgPT09IHRoaXMuaGlkZGVuVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNTaG93biAhPT0gdGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudmlzaWJpbGl0eUNhbGxiYWNrKHRoaXMuaXNTaG93bigpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5pc1Nob3duKCkpO1xuICAgICAgICAgICAgICAgIH0sIHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZSArIDUpO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICBwcml2YXRlIHVwZGF0ZVNpZGVQcm9wcyhzaWRlOiBQbGFjZW1lbnQsIHNpemVGYWN0b3I6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoc2lkZSA9PT0gXCJsZWZ0XCIgfHwgc2lkZSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNpemUgPSB0aGlzLnByb3BzLnNjZW5lV2lkdGggKiBzaXplRmFjdG9yO1xuICAgICAgICAgICAgdGhpcy5zY2VuZVNpemUgPSB0aGlzLnByb3BzLnNjZW5lV2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhpZGRlblZhbCA9IHNpZGUgPT09IFwibGVmdFwiID8gLTEgKiB0aGlzLnNpemUgOiB0aGlzLnByb3BzLnNjZW5lV2lkdGg7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVNjaGVtZSA9IFwidHJhbnNsYXRlM2QoJXZweCwwLDApXCI7XG4gICAgICAgICAgICB0aGlzLmF4aXMgPSBcIlhcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vdG9wLGJvdHRvbVxuICAgICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5wcm9wcy5zY2VuZUhlaWdodCAqIHNpemVGYWN0b3I7XG4gICAgICAgICAgICB0aGlzLnNjZW5lU2l6ZSA9IHRoaXMucHJvcHMuc2NlbmVIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmhpZGRlblZhbCA9IHNpZGUgPT09IFwidG9wXCIgPyAtMSAqIHRoaXMuc2l6ZSA6IHRoaXMucHJvcHMuc2NlbmVIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVNjaGVtZSA9IFwidHJhbnNsYXRlM2QoMCwldnB4LDApXCI7XG4gICAgICAgICAgICB0aGlzLmF4aXMgPSBcIllcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaWRlID09PSBcInRvcFwiIHx8IHNpZGUgPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNob3duVmFsID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd25WYWwgPSB0aGlzLnNjZW5lU2l6ZSAtIHRoaXMuc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlzU2hvd24pIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZhbCA9IHRoaXMuc2hvd25WYWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWYWwgPSB0aGlzLmhpZGRlblZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdFNpZGUgPSBzaWRlO1xuICAgICAgICB0aGlzLmxhc3RTaXplRmFjdG9yID0gc2l6ZUZhY3RvcjtcbiAgICAgICAgdGhpcy5sYXN0U2NlbmVXaWR0aCA9IHRoaXMucHJvcHMuc2NlbmVXaWR0aDtcbiAgICAgICAgdGhpcy5sYXN0U2NlbmVIZWlnaHQgPSB0aGlzLnByb3BzLnNjZW5lSGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IFByb3BzKTogdm9pZCB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuZW5hYmxlZCAhPT0gdGhpcy5wcm9wcy5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzW3RoaXMucHJvcHMuZW5hYmxlZCA/IFwiZW5hYmxlXCIgOiBcImRpc2FibGVcIl0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpOiBSZWFjdE5vZGUge1xuICAgICAgICBjb25zdCBjbGFzc05hbWUgPVxuICAgICAgICAgICAgXCJhaXJyLXNpZGVwYW5lbCBcIiArXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNpZGUgK1xuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgKHRoaXMucHJvcHMuZW5hYmxlZCA/IFwiZW5hYmxlZFwiIDogXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgY29uc3QgZHJhZ0N0blN0eWxlID0geyB3aWR0aDogXCJcIiwgaGVpZ2h0OiBcIlwiLCB0cmFuc2Zvcm06IFwiXCIsIFdlYmtpdFRyYW5zZm9ybTogXCJcIiB9O1xuICAgICAgICBsZXQgc2lkZXBhbmVsU3R5bGU7XG4gICAgICAgIGxldCBiZ0xheWVyU3R5bGU7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaWRlICE9PSB0aGlzLmxhc3RTaWRlIHx8XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNpemVGYWN0b3IgIT09IHRoaXMubGFzdFNpemVGYWN0b3IgfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2NlbmVXaWR0aCAhPT0gdGhpcy5sYXN0U2NlbmVXaWR0aCB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zY2VuZUhlaWdodCAhPT0gdGhpcy5sYXN0U2NlbmVIZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNpZGVQcm9wcyh0aGlzLnByb3BzLnNpZGUsIHRoaXMucHJvcHMuc2l6ZUZhY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaWRlID09PSBcImxlZnRcIiB8fCB0aGlzLnByb3BzLnNpZGUgPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLndpZHRoID0gdGhpcy5zaXplICsgXCJweFwiO1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy90b3AsYm90dG9tXG4gICAgICAgICAgICBkcmFnQ3RuU3R5bGUuaGVpZ2h0ID0gdGhpcy5zaXplICsgXCJweFwiO1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc1Nob3duKSB7XG4gICAgICAgICAgICBkcmFnQ3RuU3R5bGUuV2Via2l0VHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgU3RyaW5nKHRoaXMuc2hvd25WYWwpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLnRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtU2NoZW1lLnJlcGxhY2UoXCIldlwiLCBTdHJpbmcodGhpcy5zaG93blZhbCkpO1xuICAgICAgICAgICAgc2lkZXBhbmVsU3R5bGUgPSB7IGRpc3BsYXk6IFwiYmxvY2tcIiB9O1xuICAgICAgICAgICAgYmdMYXllclN0eWxlID0geyBvcGFjaXR5OiB0aGlzLnByb3BzLmJnTGF5ZXJPcGFjaXR5IH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmFnQ3RuU3R5bGUuV2Via2l0VHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgU3RyaW5nKHRoaXMuaGlkZGVuVmFsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRyYWdDdG5TdHlsZS50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFwiJXZcIiwgU3RyaW5nKHRoaXMuaGlkZGVuVmFsKSk7XG4gICAgICAgICAgICBzaWRlcGFuZWxTdHlsZSA9IHsgZGlzcGxheTogXCJub25lXCIgfTtcbiAgICAgICAgICAgIGJnTGF5ZXJTdHlsZSA9IHsgb3BhY2l0eTogMCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPVxuICAgICAgICAgICAgdHlwZW9mIHRoaXMucHJvcHMuY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMucHJvcHMuY2hpbGRyZW4oKSA6IHRoaXMucHJvcHMuY2hpbGRyZW47XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHJlZj17dGhpcy5yZWZET019IHN0eWxlPXtzaWRlcGFuZWxTdHlsZX0+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9e3RoaXMucmVmRE9NQmdMYXllcn0gc3R5bGU9e2JnTGF5ZXJTdHlsZX0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17dGhpcy5yZWZET01EcmFnQ3RufSBzdHlsZT17ZHJhZ0N0blN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19