"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _eventHelpers = require("./eventHelpers");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

exports["default"] = AirrSidepanel;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyU2lkZXBhbmVsLnRzeCJdLCJuYW1lcyI6WyJBaXJyU2lkZXBhbmVsIiwiUmVhY3QiLCJjcmVhdGVSZWYiLCJpc01vYmlsZURldmljZSIsImUiLCJheGlzIiwib2JqIiwiY2hhbmdlZFRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsInBvcyIsImdldFBvc2l0aW9uIiwiZHJhZ0N0bk9uVG91Y2hQYXRoIiwicGF0aCIsImNvbXBvc2VkUGF0aCIsImkiLCJsZW5ndGgiLCJyZWZET01EcmFnQ3RuIiwiY3VycmVudCIsInRhcmdldCIsIkVsZW1lbnQiLCJfX2J1YmJsZUNoaWxkVGlsbFBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJkb2N1bWVudCIsImJvZHkiLCJpbmRleE9mIiwicHJvcHMiLCJzaWRlIiwiaGlkZGVuVmFsIiwicmVmRE9NIiwic3R5bGUiLCJkaXNwbGF5Iiwic2NlbmVET00iLCJhZGRFdmVudExpc3RlbmVyIiwibW92ZUV2ZW50IiwiaGFuZGxlU2hvd1RvdWNoTW92ZSIsInN1cHBvcnRQYXNzaXZlIiwiZW5kRXZlbnQiLCJoYW5kbGVUb3VjaEVuZCIsInNob3dtb3ZlZW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImN1cnJlbnRWYWwiLCJzaG93blZhbCIsImhhbmRsZUhpZGVUb3VjaE1vdmUiLCJoaWRlbW92ZWVuZCIsInJlZkRPTUJnTGF5ZXIiLCJoaWRlZHJhZ2N0biIsIk1hdGgiLCJhYnMiLCJoaWRlIiwibGFzdFRvdWNoIiwiZ2V0TGFzdFBvc2l0aW9uIiwibmV3VmFsIiwicHJvZ3Jlc3MiLCJzaXplIiwic2NlbmVTaXplIiwib3BhY2l0eSIsIlN0cmluZyIsImJnTGF5ZXJPcGFjaXR5Iiwid2Via2l0VHJhbnNmb3JtIiwidHJhbnNmb3JtU2NoZW1lIiwicmVwbGFjZSIsInRyYW5zZm9ybSIsInByZXZlbnREZWZhdWx0IiwiY2hhbmdlIiwibW92ZUF4aXMiLCJnZXRFdmVudFgiLCJnZXRFdmVudFkiLCJ2YWwiLCJhbmltYXRpbmciLCJ0cmFuc2xhdGVUbyIsImlzU2hvd24iLCJ2aXNpYmlsaXR5Q2FsbGJhY2siLCJlbmFibGUiLCJvZmZzZXRQYXJlbnQiLCJmaW5pc2hWYWwiLCJQcm9taXNlIiwicmVzb2x2ZSIsIndlYmtpdFRyYW5zaXRpb24iLCJhbmltYXRpb25UaW1lIiwidHJhbnNpdGlvbiIsIm9mZnNldEhlaWdodCIsInNldFRpbWVvdXQiLCJzdGFydEV2ZW50IiwiaGFuZGxlVG91Y2hTdGFydCIsInJlZlNjZW5lRE9NIiwicGFyZW50Tm9kZSIsImVuYWJsZWQiLCJjaGlsZCIsInBhcmVudCIsInRpbGxFbGVtZW50cyIsInNpemVGYWN0b3IiLCJzY2VuZVdpZHRoIiwic2NlbmVIZWlnaHQiLCJsYXN0U2lkZSIsImxhc3RTaXplRmFjdG9yIiwibGFzdFNjZW5lV2lkdGgiLCJsYXN0U2NlbmVIZWlnaHQiLCJwcmV2UHJvcHMiLCJjbGFzc05hbWUiLCJkcmFnQ3RuU3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsIldlYmtpdFRyYW5zZm9ybSIsInNpZGVwYW5lbFN0eWxlIiwiYmdMYXllclN0eWxlIiwidXBkYXRlU2lkZVByb3BzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTZDcUJBLGE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvRUFzQkRDLEtBQUssQ0FBQ0MsU0FBTixFOztvRUFDQUQsS0FBSyxDQUFDQyxTQUFOLEU7OzZEQUNQRCxLQUFLLENBQUNDLFNBQU4sRTs7Ozs7O2lFQUtZQywrQkFBaUIsWUFBakIsR0FBZ0MsVzs7Z0VBQ2pDQSwrQkFBaUIsV0FBakIsR0FBK0IsVzs7K0RBQ2hDQSwrQkFBaUIsVUFBakIsR0FBOEIsUzs7Z0VBRTdCLEs7Ozs7OztrRUEwQ0UsVUFBQ0MsQ0FBRCxFQUE2QkMsSUFBN0IsRUFBNEM7QUFDOUQsVUFBTUMsR0FBRyxHQUFHLG9CQUFvQkYsQ0FBcEIs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VUFBTW1ELFFBQVEsR0FDVixPQUFPLEtBQUtqRixLQUFMLENBQVdpRixRQUFsQixLQUErQixVQUEvQixHQUE0QyxLQUFLakYsS0FBTCxDQUFXaUYsUUFBWCxFQUE1QyxHQUFvRSxLQUFLakYsS0FBTCxDQUFXaUYsUUFEbkY7QUFHQSxhQUNJO0FBQUssUUFBQSxTQUFTLEVBQUVSLFNBQWhCO0FBQTJCLFFBQUEsR0FBRyxFQUFFLEtBQUt0RSxNQUFyQztBQUE2QyxRQUFBLEtBQUssRUFBRTJFO0FBQXBELFNBQ0k7QUFBSyxRQUFBLEdBQUcsRUFBRSxLQUFLM0QsYUFBZjtBQUE4QixRQUFBLEtBQUssRUFBRTREO0FBQXJDLFFBREosRUFFSTtBQUFLLFFBQUEsR0FBRyxFQUFFLEtBQUt4RixhQUFmO0FBQThCLFFBQUEsS0FBSyxFQUFFbUY7QUFBckMsU0FDS08sUUFETCxDQUZKLENBREo7QUFRSDs7OztFQTVnQnNDQyxtQjs7OztnQkFBdEI1RyxhLGtCQUNZO0FBQ3pCMkIsRUFBQUEsSUFBSSxFQUFFLE1BRG1CO0FBRXpCNEMsRUFBQUEsT0FBTyxFQUFFLEtBRmdCO0FBR3pCZ0IsRUFBQUEsT0FBTyxFQUFFLEtBSGdCO0FBSXpCSSxFQUFBQSxVQUFVLEVBQUUsSUFBSSxDQUpTO0FBS3pCQyxFQUFBQSxVQUFVLEVBQUUsSUFMYTtBQU16QkMsRUFBQUEsV0FBVyxFQUFFLElBTlk7QUFPekJyQixFQUFBQSxrQkFBa0IsRUFBRSw0QkFBQ0QsT0FBRCxFQUFzQixDQUFFLENBUG5CO0FBUXpCUSxFQUFBQSxhQUFhLEVBQUUsR0FSVTtBQVN6QnJCLEVBQUFBLGNBQWMsRUFBRTtBQVRTLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaXNNb2JpbGVEZXZpY2UsIHN1cHBvcnRQYXNzaXZlIH0gZnJvbSBcIi4vZXZlbnRIZWxwZXJzXCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBsYWNlbWVudCwgVG91Y2hQb3NpdGlvbiB9IGZyb20gXCIuL1R5cGVzXCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcHMge1xuICAgIC8qKlxuICAgICAqIFNpZGUgdG8gd2hpY2ggc2lkZXBhbmVsIHdpbGwgYmUgYXR0YWNoZWRcbiAgICAgKi9cbiAgICBzaWRlOiBQbGFjZW1lbnQ7XG4gICAgLyoqXG4gICAgICogQm9vbCBkZXRlcm1pbmluZyBpZiBzaWRlcGFuZWwgaXMgc2hvd24gb3Igbm90XG4gICAgICovXG4gICAgaXNTaG93bjogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBCb29sIGRldGVybWluaW5nIGlmIHNpZGVwYW5lbCBpcyBlbmFibGVkLCBhbm90aGVyIHdvcmRzLCBpZiBpdHMgY2FuIGJlIGRyYWcgb3V0XG4gICAgICovXG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgYmV0d2VlbiAwIGFuZCAxIGRldGVybWluaW5nIGhvdyBtdWNoIHNpemUgb2Ygd2hvbGUgc2NyZWVuIHNpZGVwYW5lbCB3aWxsIHRha2VcbiAgICAgKi9cbiAgICBzaXplRmFjdG9yOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogUGFyZW50IHNjZW5lIHdpZHRoIGRpbWVuc2lvbi4gU2V0IGJ5IHBhcmVudCBzY2VuZS4gRG8gbm90IG92ZXJ3cml0ZSEuXG4gICAgICovXG4gICAgc2NlbmVXaWR0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFBhcmVudCBzY2VuZSBoZWlnaHQgZGltZW5zaW9uLiBTZXQgYnkgcGFyZW50IHNjZW5lLiBEbyBub3Qgb3ZlcndyaXRlIS5cbiAgICAgKi9cbiAgICBzY2VuZUhlaWdodDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGludm9rZWQgd2hlbiBzaWRlcGFuZWwgY2hhbmdlcyBpdHMgdmlzaWJpbGl0eSBkdXJpbmcgdG91Y2ggZXZlbnRzLiBTZXQgYnkgcGFyZW50IHNjZW5lLiBEbyBub3Qgb3ZlcndyaXRlIS5cbiAgICAgKi9cbiAgICB2aXNpYmlsaXR5Q2FsbGJhY2s6IChpc1Nob3duOiBib29sZWFuKSA9PiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEFuaW1hdGlvbiB0aW1lIGluIG1pbGlzZWNvbmRzXG4gICAgICovXG4gICAgYW5pbWF0aW9uVGltZTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE9wYWNpdHkgYmV0d2VlbiAwIGFuZCAxXG4gICAgICovXG4gICAgYmdMYXllck9wYWNpdHk6IG51bWJlcjtcbiAgICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgICByZWY/OiBSZWZPYmplY3Q8QWlyclNpZGVwYW5lbD47XG59XG50eXBlIEF4aXMgPSBcIlhcIiB8IFwiWVwiO1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWlyclNpZGVwYW5lbCBleHRlbmRzIFB1cmVDb21wb25lbnQ8UHJvcHM+IHtcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzOiBQcm9wcyA9IHtcbiAgICAgICAgc2lkZTogXCJsZWZ0XCIsXG4gICAgICAgIGlzU2hvd246IGZhbHNlLFxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcbiAgICAgICAgc2l6ZUZhY3RvcjogMiAvIDMsXG4gICAgICAgIHNjZW5lV2lkdGg6IG51bGwsXG4gICAgICAgIHNjZW5lSGVpZ2h0OiBudWxsLFxuICAgICAgICB2aXNpYmlsaXR5Q2FsbGJhY2s6IChpc1Nob3duOiBib29sZWFuKSA9PiB7fSxcbiAgICAgICAgYW5pbWF0aW9uVGltZTogMjAwLFxuICAgICAgICBiZ0xheWVyT3BhY2l0eTogMC43XG4gICAgfTtcbiAgICBwcml2YXRlIHNpemU6IG51bWJlcjtcbiAgICBwcml2YXRlIHNjZW5lU2l6ZTogbnVtYmVyO1xuICAgIHByaXZhdGUgY3VycmVudFZhbDogbnVtYmVyO1xuICAgIHByaXZhdGUgaGlkZGVuVmFsOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBzaG93blZhbDogbnVtYmVyO1xuICAgIHByaXZhdGUgdHJhbnNmb3JtU2NoZW1lOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBheGlzOiBBeGlzO1xuICAgIHByaXZhdGUgbGFzdFNpZGU6IFBsYWNlbWVudDtcbiAgICBwcml2YXRlIGxhc3RTaXplRmFjdG9yOiBudW1iZXI7XG5cbiAgICByZWZET01EcmFnQ3RuID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xuICAgIHJlZkRPTUJnTGF5ZXIgPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG4gICAgcmVmRE9NID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xuICAgIHNjZW5lRE9NOiBOb2RlO1xuXG4gICAgcHJpdmF0ZSBsYXN0VG91Y2g6IFRvdWNoUG9zaXRpb247XG5cbiAgICBwcml2YXRlIHN0YXJ0RXZlbnQgPSBpc01vYmlsZURldmljZSA/IFwidG91Y2hzdGFydFwiIDogXCJtb3VzZWRvd25cIjtcbiAgICBwcml2YXRlIG1vdmVFdmVudCA9IGlzTW9iaWxlRGV2aWNlID8gXCJ0b3VjaG1vdmVcIiA6IFwibW91c2Vtb3ZlXCI7XG4gICAgcHJpdmF0ZSBlbmRFdmVudCA9IGlzTW9iaWxlRGV2aWNlID8gXCJ0b3VjaGVuZFwiIDogXCJtb3VzZXVwXCI7XG5cbiAgICBwcml2YXRlIGFuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgcHJpdmF0ZSBsYXN0U2NlbmVXaWR0aDogbnVtYmVyO1xuICAgIHByaXZhdGUgbGFzdFNjZW5lSGVpZ2h0OiBudW1iZXI7XG5cbiAgICBlbmFibGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmVET00ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnN0YXJ0RXZlbnQsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgICAgIHRoaXMuc2NlbmVET00uYWRkRXZlbnRMaXN0ZW5lcih0aGlzLnN0YXJ0RXZlbnQsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCwgc3VwcG9ydFBhc3NpdmUpO1xuICAgIH1cblxuICAgIGRpc2FibGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2NlbmVET00ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLnN0YXJ0RXZlbnQsIHRoaXMuaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgfVxuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKTogdm9pZCB7XG4gICAgICAgIGNvbnN0IHJlZlNjZW5lRE9NID0gdGhpcy5yZWZET00uY3VycmVudCAmJiB0aGlzLnJlZkRPTS5jdXJyZW50LnBhcmVudE5vZGU7XG5cbiAgICAgICAgaWYgKHJlZlNjZW5lRE9NKSB7XG4gICAgICAgICAgICB0aGlzLnNjZW5lRE9NID0gcmVmU2NlbmVET007XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzLmVuYWJsZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfX2J1YmJsZUNoaWxkVGlsbFBhcmVudChcbiAgICAgICAgY2hpbGQ6IEVsZW1lbnQsXG4gICAgICAgIHBhcmVudDogRWxlbWVudCxcbiAgICAgICAgdGlsbEVsZW1lbnRzOiBFbGVtZW50W11cbiAgICApOiBib29sZWFuIHtcbiAgICAgICAgaWYgKGNoaWxkLnBhcmVudE5vZGUgPT09IHBhcmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIWNoaWxkLnBhcmVudEVsZW1lbnQgfHwgdGlsbEVsZW1lbnRzLmluZGV4T2YoY2hpbGQucGFyZW50RWxlbWVudCkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX2J1YmJsZUNoaWxkVGlsbFBhcmVudChjaGlsZC5wYXJlbnRFbGVtZW50LCBwYXJlbnQsIHRpbGxFbGVtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFBvc2l0aW9uID0gKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50LCBheGlzOiBBeGlzKSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IFwiY2hhbmdlZFRvdWNoZXNcIiBpbiBlID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGU7XG4gICAgICAgIHJldHVybiBheGlzID09PSBcIlhcIiA/IG9iai5jbGllbnRYIDogb2JqLmNsaWVudFk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgZ2V0TGFzdFBvc2l0aW9uID0gKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IG9iaiA9IFwiY2hhbmdlZFRvdWNoZXNcIiBpbiBlID8gZS5jaGFuZ2VkVG91Y2hlc1swXSA6IGU7XG4gICAgICAgIHJldHVybiB7IGNsaWVudFg6IG9iai5jbGllbnRYLCBjbGllbnRZOiBvYmouY2xpZW50WSB9O1xuICAgIH07XG5cbiAgICBwcml2YXRlIGdldEV2ZW50WCA9IChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCkgPT4ge1xuICAgICAgICByZXR1cm4gXCJjaGFuZ2VkVG91Y2hlc1wiIGluIGUgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFg7XG4gICAgfTtcblxuICAgIHByaXZhdGUgZ2V0RXZlbnRZID0gKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIHJldHVybiBcImNoYW5nZWRUb3VjaGVzXCIgaW4gZSA/IGUuY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WSA6IGUuY2xpZW50WTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBoYW5kbGVUb3VjaFN0YXJ0ID0gKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oZSwgdGhpcy5heGlzKTtcbiAgICAgICAgbGV0IGRyYWdDdG5PblRvdWNoUGF0aCA9IGZhbHNlO1xuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIGNvbnN0IHBhdGggPSBlLnBhdGggfHwgKGUuY29tcG9zZWRQYXRoICYmIGUuY29tcG9zZWRQYXRoKCkpO1xuXG4gICAgICAgIGlmIChwYXRoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBhdGgubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAocGF0aFtpXSA9PT0gdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZHJhZ0N0bk9uVG91Y2hQYXRoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZS50YXJnZXQgaW5zdGFuY2VvZiBFbGVtZW50ICYmXG4gICAgICAgICAgICAgICAgKGUudGFyZ2V0ID09PSB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudCB8fFxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fYnViYmxlQ2hpbGRUaWxsUGFyZW50KGUudGFyZ2V0LCB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudCwgW1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQucGFyZW50RWxlbWVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHlcbiAgICAgICAgICAgICAgICAgICAgXSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBkcmFnQ3RuT25Ub3VjaFBhdGggPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgIWRyYWdDdG5PblRvdWNoUGF0aCAmJlxuICAgICAgICAgICAgKChbXCJsZWZ0XCIsIFwidG9wXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zaWRlKSAhPT0gLTEgJiYgcG9zIDwgMjApIHx8XG4gICAgICAgICAgICAgICAgKFtcInJpZ2h0XCIsIFwiYm90dG9tXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zaWRlKSAhPT0gLTEgJiYgcG9zID4gdGhpcy5oaWRkZW5WYWwgLSAyMCkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgLy9jb3JuZXIgdG91Y2gsIHNob3cgbW92ZXNcblxuICAgICAgICAgICAgdGhpcy5yZWZET00uY3VycmVudC5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUV2ZW50LFxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU2hvd1RvdWNoTW92ZSxcbiAgICAgICAgICAgICAgICBzdXBwb3J0UGFzc2l2ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmVET00uYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmVuZEV2ZW50LCB0aGlzLmhhbmRsZVRvdWNoRW5kLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckN1c3RvbShcInNob3dUb3VjaFN0YXJ0XCIpO1xuXG4gICAgICAgICAgICBjb25zdCBzaG93bW92ZWVuZCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5lbmRFdmVudCwgc2hvd21vdmVlbmQpOyAvL3JlbW92ZSBzZWxmIHRvIGFjdCBsaWtlIG9uY2UgbGlzdGVuZXJcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5tb3ZlRXZlbnQsIHRoaXMuaGFuZGxlU2hvd1RvdWNoTW92ZSk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy50cmlnZ2VyQ3VzdG9tKFwic2hvd1RvdWNoRW5kXCIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5hZGRFdmVudExpc3RlbmVyKHRoaXMuZW5kRXZlbnQsIHNob3dtb3ZlZW5kLCBmYWxzZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VmFsID09PSB0aGlzLnNob3duVmFsKSB7XG4gICAgICAgICAgICAvL2Z1bGx5IHZpc2libGUsIGhpZGUgbW92ZXNcbiAgICAgICAgICAgIHRoaXMuc2NlbmVET00uYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVFdmVudCxcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUhpZGVUb3VjaE1vdmUsXG4gICAgICAgICAgICAgICAgc3VwcG9ydFBhc3NpdmVcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnNjZW5lRE9NLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5lbmRFdmVudCwgdGhpcy5oYW5kbGVUb3VjaEVuZCwgZmFsc2UpO1xuXG4gICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDdXN0b20oXCJoaWRlVG91Y2hTdGFydFwiKTtcblxuICAgICAgICAgICAgY29uc3QgaGlkZW1vdmVlbmQgPSAoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZW5kRXZlbnQsIGhpZGVtb3ZlZW5kKTtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5tb3ZlRXZlbnQsIHRoaXMuaGFuZGxlSGlkZVRvdWNoTW92ZSk7XG4gICAgICAgICAgICAgICAgLy8gdGhpcy50cmlnZ2VyQ3VzdG9tKFwiaGlkZVRvdWNoRW5kXCIpO1xuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5hZGRFdmVudExpc3RlbmVyKHRoaXMuZW5kRXZlbnQsIGhpZGVtb3ZlZW5kLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZS50YXJnZXQgPT09IHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50KSB7XG4gICAgICAgICAgICAvL3RhcCB0byBoaWRlXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgKFtcImxlZnRcIiwgXCJ0b3BcIl0uaW5kZXhPZih0aGlzLnByb3BzLnNpZGUpICE9PSAtMSAmJiB0aGlzLmN1cnJlbnRWYWwgPT09IDApIHx8XG4gICAgICAgICAgICAgICAgKFtcInJpZ2h0XCIsIFwiYm90dG9tXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zaWRlKSAhPT0gLTEgJiYgdGhpcy5jdXJyZW50VmFsKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgaGlkZWRyYWdjdG4gPSAoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZW5kRXZlbnQsIGhpZGVkcmFnY3RuKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKE1hdGguYWJzKHBvcyAtIHRoaXMuZ2V0UG9zaXRpb24oZSwgdGhpcy5heGlzKSkgPD0gMi41KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lRE9NLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5lbmRFdmVudCwgaGlkZWRyYWdjdG4sIGZhbHNlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdFRvdWNoID0gdGhpcy5nZXRMYXN0UG9zaXRpb24oZSk7XG4gICAgfTtcblxuICAgIHByaXZhdGUgaGFuZGxlU2hvd1RvdWNoTW92ZSA9IChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvc2l0aW9uKGUsIHRoaXMuYXhpcyk7XG4gICAgICAgIGxldCBuZXdWYWwsXG4gICAgICAgICAgICBwcm9ncmVzcyA9IDA7XG5cbiAgICAgICAgaWYgKFtcImxlZnRcIiwgXCJ0b3BcIl0uaW5kZXhPZih0aGlzLnByb3BzLnNpZGUpICE9PSAtMSkge1xuICAgICAgICAgICAgaWYgKHBvcyA8PSAtMSAqIHRoaXMuaGlkZGVuVmFsKSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gdGhpcy5oaWRkZW5WYWwgKyBwb3M7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHRoaXMuc2hvd25WYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9ncmVzcyA9IHBvcyAvIHRoaXMuc2l6ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhpZGRlblZhbCAtIHBvcyA8PSB0aGlzLnNpemUpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSBwb3M7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHRoaXMuc2hvd25WYWw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwcm9ncmVzcyA9ICh0aGlzLnNjZW5lU2l6ZSAtIHBvcykgLyB0aGlzLnNpemU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobmV3VmFsICE9PSB0aGlzLmN1cnJlbnRWYWwpIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZhbCA9IG5ld1ZhbDtcbiAgICAgICAgICAgIHByb2dyZXNzID0gcHJvZ3Jlc3MgPiAxID8gMSA6IHByb2dyZXNzIDwgMCA/IDAgOiBwcm9ncmVzcztcblxuICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQuc3R5bGUub3BhY2l0eSA9IFN0cmluZyhwcm9ncmVzcyAqIHRoaXMucHJvcHMuYmdMYXllck9wYWNpdHkpO1xuXG4gICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIFwiJXZcIixcbiAgICAgICAgICAgICAgICBTdHJpbmcodGhpcy5jdXJyZW50VmFsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtU2NoZW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgXCIldlwiLFxuICAgICAgICAgICAgICAgIFN0cmluZyh0aGlzLmN1cnJlbnRWYWwpXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0VG91Y2ggPSB0aGlzLmdldExhc3RQb3NpdGlvbihlKTtcblxuICAgICAgICBpZiAoIXN1cHBvcnRQYXNzaXZlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBoYW5kbGVIaWRlVG91Y2hNb3ZlID0gKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGxldCBwcm9ncmVzcyA9IDAsXG4gICAgICAgICAgICBuZXdWYWwsXG4gICAgICAgICAgICBjaGFuZ2UsXG4gICAgICAgICAgICBtb3ZlQXhpcztcblxuICAgICAgICBpZiAodGhpcy5sYXN0VG91Y2gpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBNYXRoLmFicyh0aGlzLmxhc3RUb3VjaC5jbGllbnRYIC0gdGhpcy5nZXRFdmVudFgoZSkpID49XG4gICAgICAgICAgICAgICAgTWF0aC5hYnModGhpcy5sYXN0VG91Y2guY2xpZW50WSAtIHRoaXMuZ2V0RXZlbnRZKGUpKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0RXZlbnRYKGUpIC0gdGhpcy5sYXN0VG91Y2guY2xpZW50WCA8PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgPSAnbGVmdCc7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVBeGlzID0gXCJYXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSA9ICdyaWdodCc7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVBeGlzID0gXCJYXCI7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRFdmVudFkoZSkgLSB0aGlzLmxhc3RUb3VjaC5jbGllbnRZIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSA9ICd0b3AnO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlQXhpcyA9IFwiWVwiO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1vdmUgPSAnYm90dG9tJztcbiAgICAgICAgICAgICAgICAgICAgbW92ZUF4aXMgPSBcIllcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBtb3ZlQXhpcyA9PT0gdGhpcy5heGlzICYmXG4gICAgICAgICAgICAoKFtcImxlZnRcIiwgXCJ0b3BcIl0uaW5kZXhPZih0aGlzLnByb3BzLnNpZGUpICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oZSwgbW92ZUF4aXMpIDwgdGhpcy5zaXplKSB8fFxuICAgICAgICAgICAgICAgIChbXCJyaWdodFwiLCBcImJvdHRvbVwiXS5pbmRleE9mKHRoaXMucHJvcHMuc2lkZSkgIT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ2V0UG9zaXRpb24oZSwgbW92ZUF4aXMpID4gdGhpcy5oaWRkZW5WYWwgLSB0aGlzLnNpemUpKVxuICAgICAgICApIHtcbiAgICAgICAgICAgIGNoYW5nZSA9IHRoaXMuZ2V0UG9zaXRpb24oZSwgdGhpcy5heGlzKSAtIHRoaXMubGFzdFRvdWNoW1wiY2xpZW50XCIgKyB0aGlzLmF4aXNdO1xuICAgICAgICAgICAgbmV3VmFsID0gdGhpcy5jdXJyZW50VmFsICsgY2hhbmdlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5zaWRlID09PSBcImxlZnRcIiB8fCB0aGlzLnByb3BzLnNpZGUgPT09IFwidG9wXCIpIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsIDwgdGhpcy5oaWRkZW5WYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsID0gdGhpcy5oaWRkZW5WYWw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdWYWwgPiB0aGlzLnNob3duVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHRoaXMuc2hvd25WYWw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSAxIC0gTWF0aC5hYnMobmV3VmFsIC8gdGhpcy5zaXplKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZhbCA+IHRoaXMuaGlkZGVuVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHRoaXMuaGlkZGVuVmFsO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3VmFsIDwgdGhpcy5zaG93blZhbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWwgPSB0aGlzLnNob3duVmFsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gKHRoaXMuc2NlbmVTaXplIC0gbmV3VmFsKSAvIHRoaXMuc2l6ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKG5ld1ZhbCAhPT0gdGhpcy5jdXJyZW50VmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50VmFsID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgIHByb2dyZXNzID0gcHJvZ3Jlc3MgPiAxID8gMSA6IHByb2dyZXNzIDwgMCA/IDAgOiBwcm9ncmVzcztcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50LnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcoXG4gICAgICAgICAgICAgICAgICAgIHByb2dyZXNzICogdGhpcy5wcm9wcy5iZ0xheWVyT3BhY2l0eVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgICAgIFN0cmluZyh0aGlzLmN1cnJlbnRWYWwpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgICAgIFN0cmluZyh0aGlzLmN1cnJlbnRWYWwpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdFRvdWNoID0gdGhpcy5nZXRMYXN0UG9zaXRpb24oZSk7XG4gICAgICAgIGlmICghc3VwcG9ydFBhc3NpdmUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIGhhbmRsZVRvdWNoRW5kID0gKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgIGxldCB2YWwgPSBudWxsO1xuXG4gICAgICAgIGlmICghdGhpcy5hbmltYXRpbmcpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRWYWwgIT09IHRoaXMuc2hvd25WYWwgJiYgdGhpcy5jdXJyZW50VmFsICE9PSB0aGlzLmhpZGRlblZhbCkge1xuICAgICAgICAgICAgICAgIGlmIChbXCJsZWZ0XCIsIFwidG9wXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zaWRlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFZhbCA+PSB0aGlzLmhpZGRlblZhbCAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuc2hvd25WYWw7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmhpZGRlblZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1cnJlbnRWYWwgPCB0aGlzLmhpZGRlblZhbCAtIHRoaXMuc2l6ZSAvIDIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuc2hvd25WYWw7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWwgPSB0aGlzLmhpZGRlblZhbDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50VmFsID09PSB0aGlzLmhpZGRlblZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodmFsICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50cmFuc2xhdGVUbyh2YWwpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5wcm9wcy5pc1Nob3duICE9PSB0aGlzLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnZpc2liaWxpdHlDYWxsYmFjayh0aGlzLmlzU2hvd24oKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zY2VuZURPTS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuZW5kRXZlbnQsIHRoaXMuaGFuZGxlVG91Y2hFbmQpO1xuICAgIH07XG5cbiAgICBoaWRlID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy50cmFuc2xhdGVUbyh0aGlzLmhpZGRlblZhbCk7XG4gICAgfTtcblxuICAgIHNob3cgPSAoKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVRvKHRoaXMuc2hvd25WYWwpO1xuICAgIH07XG5cbiAgICBpc1Nob3duID0gKCkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5yZWZET00uY3VycmVudC5vZmZzZXRQYXJlbnQgIT09IG51bGw7XG4gICAgfTtcblxuICAgIHByaXZhdGUgdHJhbnNsYXRlVG8gPSAoZmluaXNoVmFsOiBudW1iZXIpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpbmcgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLnJlZkRPTUJnTGF5ZXIuY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gYG9wYWNpdHkgJHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvblRpbWVcbiAgICAgICAgICAgIH1tcyBlYXNlLWluYDtcbiAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50LnN0eWxlLnRyYW5zaXRpb24gPSBgb3BhY2l0eSAke1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZVxuICAgICAgICAgICAgfW1zIGVhc2UtaW5gO1xuICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICBpZiAoZmluaXNoVmFsID09PSB0aGlzLnNob3duVmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmlzU2hvd24oKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQuc3R5bGUub3BhY2l0eSA9IFN0cmluZyh0aGlzLnByb3BzLmJnTGF5ZXJPcGFjaXR5KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZmluaXNoVmFsID09PSB0aGlzLmhpZGRlblZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5yZWZET00uY3VycmVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gYC13ZWJraXQtdHJhbnNmb3JtICR7XG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25UaW1lXG4gICAgICAgICAgICB9bXMgZWFzZS1vdXRgO1xuICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9IGB0cmFuc2Zvcm0gJHtcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvblRpbWVcbiAgICAgICAgICAgIH1tcyBlYXNlLW91dGA7XG4gICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS50cmFuc2l0aW9uID0gYHRyYW5zZm9ybSAke1xuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZVxuICAgICAgICAgICAgfW1zIGVhc2Utb3V0YDtcblxuICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQub2Zmc2V0SGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgU3RyaW5nKGZpbmlzaFZhbClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIFwiJXZcIixcbiAgICAgICAgICAgICAgICBTdHJpbmcoZmluaXNoVmFsKVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQub2Zmc2V0SGVpZ2h0O1xuXG4gICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUJnTGF5ZXIuY3VycmVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJpbml0aWFsXCI7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWYWwgPSBmaW5pc2hWYWw7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmluaXNoVmFsID09PSB0aGlzLmhpZGRlblZhbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNTaG93biAhPT0gdGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy52aXNpYmlsaXR5Q2FsbGJhY2sodGhpcy5pc1Nob3duKCkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUodGhpcy5pc1Nob3duKCkpO1xuICAgICAgICAgICAgfSwgdGhpcy5wcm9wcy5hbmltYXRpb25UaW1lICsgNSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICBwcml2YXRlIHVwZGF0ZVNpZGVQcm9wcyhzaWRlOiBQbGFjZW1lbnQsIHNpemVGYWN0b3I6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoc2lkZSA9PT0gXCJsZWZ0XCIgfHwgc2lkZSA9PT0gXCJyaWdodFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNpemUgPSB0aGlzLnByb3BzLnNjZW5lV2lkdGggKiBzaXplRmFjdG9yO1xuICAgICAgICAgICAgdGhpcy5zY2VuZVNpemUgPSB0aGlzLnByb3BzLnNjZW5lV2lkdGg7XG4gICAgICAgICAgICB0aGlzLmhpZGRlblZhbCA9IHNpZGUgPT09IFwibGVmdFwiID8gLTEgKiB0aGlzLnNpemUgOiB0aGlzLnByb3BzLnNjZW5lV2lkdGg7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVNjaGVtZSA9IFwidHJhbnNsYXRlM2QoJXZweCwwLDApXCI7XG4gICAgICAgICAgICB0aGlzLmF4aXMgPSBcIlhcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vdG9wLGJvdHRvbVxuICAgICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5wcm9wcy5zY2VuZUhlaWdodCAqIHNpemVGYWN0b3I7XG4gICAgICAgICAgICB0aGlzLnNjZW5lU2l6ZSA9IHRoaXMucHJvcHMuc2NlbmVIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLmhpZGRlblZhbCA9IHNpZGUgPT09IFwidG9wXCIgPyAtMSAqIHRoaXMuc2l6ZSA6IHRoaXMucHJvcHMuc2NlbmVIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnRyYW5zZm9ybVNjaGVtZSA9IFwidHJhbnNsYXRlM2QoMCwldnB4LDApXCI7XG4gICAgICAgICAgICB0aGlzLmF4aXMgPSBcIllcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaWRlID09PSBcInRvcFwiIHx8IHNpZGUgPT09IFwibGVmdFwiKSB7XG4gICAgICAgICAgICB0aGlzLnNob3duVmFsID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2hvd25WYWwgPSB0aGlzLnNjZW5lU2l6ZSAtIHRoaXMuc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmlzU2hvd24pIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFZhbCA9IHRoaXMuc2hvd25WYWw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWYWwgPSB0aGlzLmhpZGRlblZhbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubGFzdFNpZGUgPSBzaWRlO1xuICAgICAgICB0aGlzLmxhc3RTaXplRmFjdG9yID0gc2l6ZUZhY3RvcjtcbiAgICAgICAgdGhpcy5sYXN0U2NlbmVXaWR0aCA9IHRoaXMucHJvcHMuc2NlbmVXaWR0aDtcbiAgICAgICAgdGhpcy5sYXN0U2NlbmVIZWlnaHQgPSB0aGlzLnByb3BzLnNjZW5lSGVpZ2h0O1xuICAgIH1cblxuICAgIGNvbXBvbmVudERpZFVwZGF0ZShwcmV2UHJvcHM6IFByb3BzKTogdm9pZCB7XG4gICAgICAgIGlmIChwcmV2UHJvcHMuZW5hYmxlZCAhPT0gdGhpcy5wcm9wcy5lbmFibGVkKSB7XG4gICAgICAgICAgICB0aGlzW3RoaXMucHJvcHMuZW5hYmxlZCA/IFwiZW5hYmxlXCIgOiBcImRpc2FibGVcIl0oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpOiBSZWFjdE5vZGUge1xuICAgICAgICBjb25zdCBjbGFzc05hbWUgPVxuICAgICAgICAgICAgXCJhaXJyLXNpZGVwYW5lbCBcIiArXG4gICAgICAgICAgICB0aGlzLnByb3BzLnNpZGUgK1xuICAgICAgICAgICAgXCIgXCIgK1xuICAgICAgICAgICAgKHRoaXMucHJvcHMuZW5hYmxlZCA/IFwiZW5hYmxlZFwiIDogXCJkaXNhYmxlZFwiKTtcbiAgICAgICAgY29uc3QgZHJhZ0N0blN0eWxlID0geyB3aWR0aDogXCJcIiwgaGVpZ2h0OiBcIlwiLCB0cmFuc2Zvcm06IFwiXCIsIFdlYmtpdFRyYW5zZm9ybTogXCJcIiB9O1xuICAgICAgICBsZXQgc2lkZXBhbmVsU3R5bGU7XG4gICAgICAgIGxldCBiZ0xheWVyU3R5bGU7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaWRlICE9PSB0aGlzLmxhc3RTaWRlIHx8XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNpemVGYWN0b3IgIT09IHRoaXMubGFzdFNpemVGYWN0b3IgfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2NlbmVXaWR0aCAhPT0gdGhpcy5sYXN0U2NlbmVXaWR0aCB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zY2VuZUhlaWdodCAhPT0gdGhpcy5sYXN0U2NlbmVIZWlnaHRcbiAgICAgICAgKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNpZGVQcm9wcyh0aGlzLnByb3BzLnNpZGUsIHRoaXMucHJvcHMuc2l6ZUZhY3Rvcik7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5zaWRlID09PSBcImxlZnRcIiB8fCB0aGlzLnByb3BzLnNpZGUgPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLndpZHRoID0gdGhpcy5zaXplICsgXCJweFwiO1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLmhlaWdodCA9IFwiMTAwJVwiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy90b3AsYm90dG9tXG4gICAgICAgICAgICBkcmFnQ3RuU3R5bGUuaGVpZ2h0ID0gdGhpcy5zaXplICsgXCJweFwiO1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLndpZHRoID0gXCIxMDAlXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc1Nob3duKSB7XG4gICAgICAgICAgICBkcmFnQ3RuU3R5bGUuV2Via2l0VHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgU3RyaW5nKHRoaXMuc2hvd25WYWwpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLnRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtU2NoZW1lLnJlcGxhY2UoXCIldlwiLCBTdHJpbmcodGhpcy5zaG93blZhbCkpO1xuICAgICAgICAgICAgc2lkZXBhbmVsU3R5bGUgPSB7IGRpc3BsYXk6IFwiYmxvY2tcIiB9O1xuICAgICAgICAgICAgYmdMYXllclN0eWxlID0geyBvcGFjaXR5OiB0aGlzLnByb3BzLmJnTGF5ZXJPcGFjaXR5IH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkcmFnQ3RuU3R5bGUuV2Via2l0VHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgU3RyaW5nKHRoaXMuaGlkZGVuVmFsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRyYWdDdG5TdHlsZS50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFwiJXZcIiwgU3RyaW5nKHRoaXMuaGlkZGVuVmFsKSk7XG4gICAgICAgICAgICBzaWRlcGFuZWxTdHlsZSA9IHsgZGlzcGxheTogXCJub25lXCIgfTtcbiAgICAgICAgICAgIGJnTGF5ZXJTdHlsZSA9IHsgb3BhY2l0eTogMCB9O1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY2hpbGRyZW4gPVxuICAgICAgICAgICAgdHlwZW9mIHRoaXMucHJvcHMuY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IHRoaXMucHJvcHMuY2hpbGRyZW4oKSA6IHRoaXMucHJvcHMuY2hpbGRyZW47XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHJlZj17dGhpcy5yZWZET019IHN0eWxlPXtzaWRlcGFuZWxTdHlsZX0+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9e3RoaXMucmVmRE9NQmdMYXllcn0gc3R5bGU9e2JnTGF5ZXJTdHlsZX0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2IHJlZj17dGhpcy5yZWZET01EcmFnQ3RufSBzdHlsZT17ZHJhZ0N0blN0eWxlfT5cbiAgICAgICAgICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufVxuIl19