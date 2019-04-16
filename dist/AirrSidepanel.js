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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyU2lkZXBhbmVsLnRzeCJdLCJuYW1lcyI6WyJBaXJyU2lkZXBhbmVsIiwiUmVhY3QiLCJjcmVhdGVSZWYiLCJpc01vYmlsZURldmljZSIsImUiLCJheGlzIiwib2JqIiwiY2hhbmdlZFRvdWNoZXMiLCJjbGllbnRYIiwiY2xpZW50WSIsInBvcyIsImdldFBvc2l0aW9uIiwiZHJhZ0N0bk9uVG91Y2hQYXRoIiwicGF0aCIsImNvbXBvc2VkUGF0aCIsImkiLCJsZW5ndGgiLCJyZWZET01EcmFnQ3RuIiwiY3VycmVudCIsInRhcmdldCIsIkVsZW1lbnQiLCJfX2J1YmJsZUNoaWxkVGlsbFBhcmVudCIsInBhcmVudEVsZW1lbnQiLCJkb2N1bWVudCIsImJvZHkiLCJpbmRleE9mIiwicHJvcHMiLCJzaWRlIiwiaGlkZGVuVmFsIiwicmVmRE9NIiwic3R5bGUiLCJkaXNwbGF5Iiwic2NlbmVET00iLCJhZGRFdmVudExpc3RlbmVyIiwibW92ZUV2ZW50IiwiaGFuZGxlU2hvd1RvdWNoTW92ZSIsInN1cHBvcnRQYXNzaXZlIiwiZW5kRXZlbnQiLCJoYW5kbGVUb3VjaEVuZCIsInNob3dtb3ZlZW5kIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsImN1cnJlbnRWYWwiLCJzaG93blZhbCIsImhhbmRsZUhpZGVUb3VjaE1vdmUiLCJoaWRlbW92ZWVuZCIsInJlZkRPTUJnTGF5ZXIiLCJoaWRlZHJhZ2N0biIsIk1hdGgiLCJhYnMiLCJoaWRlIiwibGFzdFRvdWNoIiwiZ2V0TGFzdFBvc2l0aW9uIiwibmV3VmFsIiwicHJvZ3Jlc3MiLCJzaXplIiwic2NlbmVTaXplIiwib3BhY2l0eSIsIlN0cmluZyIsImJnTGF5ZXJPcGFjaXR5Iiwid2Via2l0VHJhbnNmb3JtIiwidHJhbnNmb3JtU2NoZW1lIiwicmVwbGFjZSIsInRyYW5zZm9ybSIsInByZXZlbnREZWZhdWx0IiwiY2hhbmdlIiwibW92ZUF4aXMiLCJnZXRFdmVudFgiLCJnZXRFdmVudFkiLCJ2YWwiLCJhbmltYXRpbmciLCJ0cmFuc2xhdGVUbyIsImlzU2hvd24iLCJ2aXNpYmlsaXR5Q2FsbGJhY2siLCJlbmFibGUiLCJvZmZzZXRQYXJlbnQiLCJmaW5pc2hWYWwiLCJQcm9taXNlIiwicmVzb2x2ZSIsIndlYmtpdFRyYW5zaXRpb24iLCJhbmltYXRpb25UaW1lIiwidHJhbnNpdGlvbiIsIm9mZnNldEhlaWdodCIsInNldFRpbWVvdXQiLCJzdGFydEV2ZW50IiwiaGFuZGxlVG91Y2hTdGFydCIsInJlZlNjZW5lRE9NIiwicGFyZW50Tm9kZSIsImVuYWJsZWQiLCJjaGlsZCIsInBhcmVudCIsInRpbGxFbGVtZW50cyIsInNpemVGYWN0b3IiLCJzY2VuZVdpZHRoIiwic2NlbmVIZWlnaHQiLCJsYXN0U2lkZSIsImxhc3RTaXplRmFjdG9yIiwibGFzdFNjZW5lV2lkdGgiLCJsYXN0U2NlbmVIZWlnaHQiLCJwcmV2UHJvcHMiLCJjbGFzc05hbWUiLCJkcmFnQ3RuU3R5bGUiLCJ3aWR0aCIsImhlaWdodCIsIldlYmtpdFRyYW5zZm9ybSIsInNpZGVwYW5lbFN0eWxlIiwiYmdMYXllclN0eWxlIiwidXBkYXRlU2lkZVByb3BzIiwiY2hpbGRyZW4iLCJQdXJlQ29tcG9uZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQThDcUJBLGE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztvRUFzQkRDLEtBQUssQ0FBQ0MsU0FBTixFOztvRUFDQUQsS0FBSyxDQUFDQyxTQUFOLEU7OzZEQUNQRCxLQUFLLENBQUNDLFNBQU4sRTs7Ozs7O2lFQUtZQywrQkFBaUIsWUFBakIsR0FBZ0MsVzs7Z0VBQ2pDQSwrQkFBaUIsV0FBakIsR0FBK0IsVzs7K0RBQ2hDQSwrQkFBaUIsVUFBakIsR0FBOEIsUzs7Z0VBRTdCLEs7Ozs7OztrRUEwQ0UsVUFBQ0MsQ0FBRCxFQUE2QkMsSUFBN0IsRUFBb0Q7QUFDdEUsVUFBTUMsR0FBRyxHQUFHLG9CQUFvQkYsQ0FBcEIs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O0FBRUQsVUFBTW1ELFFBQVEsR0FDVixPQUFPLEtBQUtqRixLQUFMLENBQVdpRixRQUFsQixLQUErQixVQUEvQixHQUE0QyxLQUFLakYsS0FBTCxDQUFXaUYsUUFBWCxFQUE1QyxHQUFvRSxLQUFLakYsS0FBTCxDQUFXaUYsUUFEbkY7QUFHQSxhQUNJO0FBQUssUUFBQSxTQUFTLEVBQUVSLFNBQWhCO0FBQTJCLFFBQUEsR0FBRyxFQUFFLEtBQUt0RSxNQUFyQztBQUE2QyxRQUFBLEtBQUssRUFBRTJFO0FBQXBELFNBQ0k7QUFBSyxRQUFBLEdBQUcsRUFBRSxLQUFLM0QsYUFBZjtBQUE4QixRQUFBLEtBQUssRUFBRTREO0FBQXJDLFFBREosRUFFSTtBQUFLLFFBQUEsR0FBRyxFQUFFLEtBQUt4RixhQUFmO0FBQThCLFFBQUEsS0FBSyxFQUFFbUY7QUFBckMsU0FDS08sUUFETCxDQUZKLENBREo7QUFRSDs7OztFQWhoQnNDQyxtQjs7OztnQkFBdEI1RyxhLGtCQUNZO0FBQ3pCMkIsRUFBQUEsSUFBSSxFQUFFLE1BRG1CO0FBRXpCNEMsRUFBQUEsT0FBTyxFQUFFLEtBRmdCO0FBR3pCZ0IsRUFBQUEsT0FBTyxFQUFFLEtBSGdCO0FBSXpCSSxFQUFBQSxVQUFVLEVBQUUsSUFBSSxDQUpTO0FBS3pCQyxFQUFBQSxVQUFVLEVBQUUsSUFMYTtBQU16QkMsRUFBQUEsV0FBVyxFQUFFLElBTlk7QUFPekJyQixFQUFBQSxrQkFBa0IsRUFBRSw0QkFBQ0QsT0FBRCxFQUE0QixDQUFFLENBUHpCO0FBUXpCUSxFQUFBQSxhQUFhLEVBQUUsR0FSVTtBQVN6QnJCLEVBQUFBLGNBQWMsRUFBRTtBQVRTLEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFB1cmVDb21wb25lbnQsIFJlZk9iamVjdCB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgaXNNb2JpbGVEZXZpY2UsIHN1cHBvcnRQYXNzaXZlIH0gZnJvbSBcIi4vZXZlbnRIZWxwZXJzXCI7XG5pbXBvcnQgeyBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFBsYWNlbWVudCwgVG91Y2hQb3NpdGlvbiB9IGZyb20gXCIuL2FpcnItcmVhY3RcIjtcblxuZXhwb3J0IGludGVyZmFjZSBQcm9wcyB7XG4gICAgLyoqXG4gICAgICogU2lkZSB0byB3aGljaCBzaWRlcGFuZWwgd2lsbCBiZSBhdHRhY2hlZFxuICAgICAqL1xuICAgIHNpZGU6IFBsYWNlbWVudDtcbiAgICAvKipcbiAgICAgKiBCb29sIGRldGVybWluaW5nIGlmIHNpZGVwYW5lbCBpcyBzaG93biBvciBub3RcbiAgICAgKi9cbiAgICBpc1Nob3duOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEJvb2wgZGV0ZXJtaW5pbmcgaWYgc2lkZXBhbmVsIGlzIGVuYWJsZWQuXG4gICAgICovXG4gICAgZW5hYmxlZDogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgYmV0d2VlbiAwIGFuZCAxIGRldGVybWluaW5nIGhvdyBtdWNoIHNpemUgb2Ygd2hvbGUgc2NyZWVuIHNpZGVwYW5lbCB3aWxsIHRha2VcbiAgICAgKi9cbiAgICBzaXplRmFjdG9yOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogUGFyZW50IHNjZW5lIHdpZHRoIGRpbWVuc2lvbi4gU2V0IGJ5IHBhcmVudCBzY2VuZS4gRG8gbm90IG92ZXJ3cml0ZSEuXG4gICAgICovXG4gICAgc2NlbmVXaWR0aDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIFBhcmVudCBzY2VuZSBoZWlnaHQgZGltZW5zaW9uLiBTZXQgYnkgcGFyZW50IHNjZW5lLiBEbyBub3Qgb3ZlcndyaXRlIS5cbiAgICAgKi9cbiAgICBzY2VuZUhlaWdodDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIGludm9rZWQgd2hlbiBzaWRlcGFuZWwgY2hhbmdlcyBpdHMgdmlzaWJpbGl0eSBkdXJpbmcgdG91Y2ggZXZlbnRzLiBTZXQgYnkgcGFyZW50IHNjZW5lLiBEbyBub3Qgb3ZlcndyaXRlIS5cbiAgICAgKi9cbiAgICB2aXNpYmlsaXR5Q2FsbGJhY2s6IChpc1Nob3duOiBib29sZWFuKSA9PiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEFuaW1hdGlvbiB0aW1lIGluIG1pbGlzZWNvbmRzXG4gICAgICovXG4gICAgYW5pbWF0aW9uVGltZTogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE9wYWNpdHkgYmV0d2VlbiAwIGFuZCAxXG4gICAgICovXG4gICAgYmdMYXllck9wYWNpdHk6IG51bWJlcjtcbiAgICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgICByZWY/OiBSZWZPYmplY3Q8QWlyclNpZGVwYW5lbD47XG59XG50eXBlIEF4aXMgPSBcIlhcIiB8IFwiWVwiO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBaXJyU2lkZXBhbmVsIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxQcm9wcz4ge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM6IFByb3BzID0ge1xuICAgICAgICBzaWRlOiBcImxlZnRcIixcbiAgICAgICAgaXNTaG93bjogZmFsc2UsXG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzaXplRmFjdG9yOiAyIC8gMyxcbiAgICAgICAgc2NlbmVXaWR0aDogbnVsbCxcbiAgICAgICAgc2NlbmVIZWlnaHQ6IG51bGwsXG4gICAgICAgIHZpc2liaWxpdHlDYWxsYmFjazogKGlzU2hvd246IGJvb2xlYW4pOiB2b2lkID0+IHt9LFxuICAgICAgICBhbmltYXRpb25UaW1lOiAyMDAsXG4gICAgICAgIGJnTGF5ZXJPcGFjaXR5OiAwLjdcbiAgICB9O1xuICAgIHByaXZhdGUgc2l6ZTogbnVtYmVyO1xuICAgIHByaXZhdGUgc2NlbmVTaXplOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBjdXJyZW50VmFsOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBoaWRkZW5WYWw6IG51bWJlcjtcbiAgICBwcml2YXRlIHNob3duVmFsOiBudW1iZXI7XG4gICAgcHJpdmF0ZSB0cmFuc2Zvcm1TY2hlbWU6IHN0cmluZztcbiAgICBwcml2YXRlIGF4aXM6IEF4aXM7XG4gICAgcHJpdmF0ZSBsYXN0U2lkZTogUGxhY2VtZW50O1xuICAgIHByaXZhdGUgbGFzdFNpemVGYWN0b3I6IG51bWJlcjtcblxuICAgIHJlZkRPTURyYWdDdG4gPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG4gICAgcmVmRE9NQmdMYXllciA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcbiAgICByZWZET00gPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG4gICAgc2NlbmVET006IE5vZGU7XG5cbiAgICBwcml2YXRlIGxhc3RUb3VjaDogVG91Y2hQb3NpdGlvbjtcblxuICAgIHByaXZhdGUgc3RhcnRFdmVudCA9IGlzTW9iaWxlRGV2aWNlID8gXCJ0b3VjaHN0YXJ0XCIgOiBcIm1vdXNlZG93blwiO1xuICAgIHByaXZhdGUgbW92ZUV2ZW50ID0gaXNNb2JpbGVEZXZpY2UgPyBcInRvdWNobW92ZVwiIDogXCJtb3VzZW1vdmVcIjtcbiAgICBwcml2YXRlIGVuZEV2ZW50ID0gaXNNb2JpbGVEZXZpY2UgPyBcInRvdWNoZW5kXCIgOiBcIm1vdXNldXBcIjtcblxuICAgIHByaXZhdGUgYW5pbWF0aW5nID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIGxhc3RTY2VuZVdpZHRoOiBudW1iZXI7XG4gICAgcHJpdmF0ZSBsYXN0U2NlbmVIZWlnaHQ6IG51bWJlcjtcblxuICAgIGVuYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZURPTS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuc3RhcnRFdmVudCwgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICAgICAgdGhpcy5zY2VuZURPTS5hZGRFdmVudExpc3RlbmVyKHRoaXMuc3RhcnRFdmVudCwgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0LCBzdXBwb3J0UGFzc2l2ZSk7XG4gICAgfVxuXG4gICAgZGlzYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zY2VuZURPTS5yZW1vdmVFdmVudExpc3RlbmVyKHRoaXMuc3RhcnRFdmVudCwgdGhpcy5oYW5kbGVUb3VjaFN0YXJ0KTtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmVmU2NlbmVET00gPSB0aGlzLnJlZkRPTS5jdXJyZW50ICYmIHRoaXMucmVmRE9NLmN1cnJlbnQucGFyZW50Tm9kZTtcblxuICAgICAgICBpZiAocmVmU2NlbmVET00pIHtcbiAgICAgICAgICAgIHRoaXMuc2NlbmVET00gPSByZWZTY2VuZURPTTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZW5hYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9fYnViYmxlQ2hpbGRUaWxsUGFyZW50KFxuICAgICAgICBjaGlsZDogRWxlbWVudCxcbiAgICAgICAgcGFyZW50OiBFbGVtZW50LFxuICAgICAgICB0aWxsRWxlbWVudHM6IEVsZW1lbnRbXVxuICAgICk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAoY2hpbGQucGFyZW50Tm9kZSA9PT0gcGFyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICghY2hpbGQucGFyZW50RWxlbWVudCB8fCB0aWxsRWxlbWVudHMuaW5kZXhPZihjaGlsZC5wYXJlbnRFbGVtZW50KSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fYnViYmxlQ2hpbGRUaWxsUGFyZW50KGNoaWxkLnBhcmVudEVsZW1lbnQsIHBhcmVudCwgdGlsbEVsZW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0UG9zaXRpb24gPSAoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQsIGF4aXM6IEF4aXMpOiBudW1iZXIgPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBcImNoYW5nZWRUb3VjaGVzXCIgaW4gZSA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlO1xuICAgICAgICByZXR1cm4gYXhpcyA9PT0gXCJYXCIgPyBvYmouY2xpZW50WCA6IG9iai5jbGllbnRZO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGdldExhc3RQb3NpdGlvbiA9IChcbiAgICAgICAgZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnRcbiAgICApOiB7IGNsaWVudFg6IG51bWJlcjsgY2xpZW50WTogbnVtYmVyIH0gPT4ge1xuICAgICAgICBjb25zdCBvYmogPSBcImNoYW5nZWRUb3VjaGVzXCIgaW4gZSA/IGUuY2hhbmdlZFRvdWNoZXNbMF0gOiBlO1xuICAgICAgICByZXR1cm4geyBjbGllbnRYOiBvYmouY2xpZW50WCwgY2xpZW50WTogb2JqLmNsaWVudFkgfTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBnZXRFdmVudFggPSAoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpOiBudW1iZXIgPT4ge1xuICAgICAgICByZXR1cm4gXCJjaGFuZ2VkVG91Y2hlc1wiIGluIGUgPyBlLmNoYW5nZWRUb3VjaGVzWzBdLmNsaWVudFggOiBlLmNsaWVudFg7XG4gICAgfTtcblxuICAgIHByaXZhdGUgZ2V0RXZlbnRZID0gKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KTogbnVtYmVyID0+IHtcbiAgICAgICAgcmV0dXJuIFwiY2hhbmdlZFRvdWNoZXNcIiBpbiBlID8gZS5jaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZIDogZS5jbGllbnRZO1xuICAgIH07XG5cbiAgICBwcml2YXRlIGhhbmRsZVRvdWNoU3RhcnQgPSAoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3NpdGlvbihlLCB0aGlzLmF4aXMpO1xuICAgICAgICBsZXQgZHJhZ0N0bk9uVG91Y2hQYXRoID0gZmFsc2U7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgcGF0aCA9IGUucGF0aCB8fCAoZS5jb21wb3NlZFBhdGggJiYgZS5jb21wb3NlZFBhdGgoKSk7XG5cbiAgICAgICAgaWYgKHBhdGgpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcGF0aC5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChwYXRoW2ldID09PSB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudCkge1xuICAgICAgICAgICAgICAgICAgICBkcmFnQ3RuT25Ub3VjaFBhdGggPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBlLnRhcmdldCBpbnN0YW5jZW9mIEVsZW1lbnQgJiZcbiAgICAgICAgICAgICAgICAoZS50YXJnZXQgPT09IHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50IHx8XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX19idWJibGVDaGlsZFRpbGxQYXJlbnQoZS50YXJnZXQsIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LCBbXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5wYXJlbnRFbGVtZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuYm9keVxuICAgICAgICAgICAgICAgICAgICBdKSlcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIGRyYWdDdG5PblRvdWNoUGF0aCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICAhZHJhZ0N0bk9uVG91Y2hQYXRoICYmXG4gICAgICAgICAgICAoKFtcImxlZnRcIiwgXCJ0b3BcIl0uaW5kZXhPZih0aGlzLnByb3BzLnNpZGUpICE9PSAtMSAmJiBwb3MgPCAyMCkgfHxcbiAgICAgICAgICAgICAgICAoW1wicmlnaHRcIiwgXCJib3R0b21cIl0uaW5kZXhPZih0aGlzLnByb3BzLnNpZGUpICE9PSAtMSAmJiBwb3MgPiB0aGlzLmhpZGRlblZhbCAtIDIwKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgICAvL2Nvcm5lciB0b3VjaCwgc2hvdyBtb3Zlc1xuXG4gICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICB0aGlzLnNjZW5lRE9NLmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5tb3ZlRXZlbnQsXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTaG93VG91Y2hNb3ZlLFxuICAgICAgICAgICAgICAgIHN1cHBvcnRQYXNzaXZlXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5hZGRFdmVudExpc3RlbmVyKHRoaXMuZW5kRXZlbnQsIHRoaXMuaGFuZGxlVG91Y2hFbmQsIGZhbHNlKTtcblxuICAgICAgICAgICAgLy8gdGhpcy50cmlnZ2VyQ3VzdG9tKFwic2hvd1RvdWNoU3RhcnRcIik7XG5cbiAgICAgICAgICAgIGNvbnN0IHNob3dtb3ZlZW5kID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVET00ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLmVuZEV2ZW50LCBzaG93bW92ZWVuZCk7IC8vcmVtb3ZlIHNlbGYgdG8gYWN0IGxpa2Ugb25jZSBsaXN0ZW5lclxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVET00ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLm1vdmVFdmVudCwgdGhpcy5oYW5kbGVTaG93VG91Y2hNb3ZlKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDdXN0b20oXCJzaG93VG91Y2hFbmRcIik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNjZW5lRE9NLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5lbmRFdmVudCwgc2hvd21vdmVlbmQsIGZhbHNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWYWwgPT09IHRoaXMuc2hvd25WYWwpIHtcbiAgICAgICAgICAgIC8vZnVsbHkgdmlzaWJsZSwgaGlkZSBtb3Zlc1xuICAgICAgICAgICAgdGhpcy5zY2VuZURPTS5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgIHRoaXMubW92ZUV2ZW50LFxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlSGlkZVRvdWNoTW92ZSxcbiAgICAgICAgICAgICAgICBzdXBwb3J0UGFzc2l2ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRoaXMuc2NlbmVET00uYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmVuZEV2ZW50LCB0aGlzLmhhbmRsZVRvdWNoRW5kLCBmYWxzZSk7XG5cbiAgICAgICAgICAgIC8vIHRoaXMudHJpZ2dlckN1c3RvbShcImhpZGVUb3VjaFN0YXJ0XCIpO1xuXG4gICAgICAgICAgICBjb25zdCBoaWRlbW92ZWVuZCA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNjZW5lRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5lbmRFdmVudCwgaGlkZW1vdmVlbmQpO1xuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVET00ucmVtb3ZlRXZlbnRMaXN0ZW5lcih0aGlzLm1vdmVFdmVudCwgdGhpcy5oYW5kbGVIaWRlVG91Y2hNb3ZlKTtcbiAgICAgICAgICAgICAgICAvLyB0aGlzLnRyaWdnZXJDdXN0b20oXCJoaWRlVG91Y2hFbmRcIik7XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLnNjZW5lRE9NLmFkZEV2ZW50TGlzdGVuZXIodGhpcy5lbmRFdmVudCwgaGlkZW1vdmVlbmQsIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlLnRhcmdldCA9PT0gdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIC8vdGFwIHRvIGhpZGVcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAoW1wibGVmdFwiLCBcInRvcFwiXS5pbmRleE9mKHRoaXMucHJvcHMuc2lkZSkgIT09IC0xICYmIHRoaXMuY3VycmVudFZhbCA9PT0gMCkgfHxcbiAgICAgICAgICAgICAgICAoW1wicmlnaHRcIiwgXCJib3R0b21cIl0uaW5kZXhPZih0aGlzLnByb3BzLnNpZGUpICE9PSAtMSAmJiB0aGlzLmN1cnJlbnRWYWwpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBoaWRlZHJhZ2N0biA9IChlOiBUb3VjaEV2ZW50IHwgTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNjZW5lRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5lbmRFdmVudCwgaGlkZWRyYWdjdG4pO1xuICAgICAgICAgICAgICAgICAgICBpZiAoTWF0aC5hYnMocG9zIC0gdGhpcy5nZXRQb3NpdGlvbihlLCB0aGlzLmF4aXMpKSA8PSAyLjUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2NlbmVET00uYWRkRXZlbnRMaXN0ZW5lcih0aGlzLmVuZEV2ZW50LCBoaWRlZHJhZ2N0biwgZmFsc2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0VG91Y2ggPSB0aGlzLmdldExhc3RQb3NpdGlvbihlKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSBoYW5kbGVTaG93VG91Y2hNb3ZlID0gKGU6IFRvdWNoRXZlbnQgfCBNb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IHBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oZSwgdGhpcy5heGlzKTtcbiAgICAgICAgbGV0IG5ld1ZhbCxcbiAgICAgICAgICAgIHByb2dyZXNzID0gMDtcblxuICAgICAgICBpZiAoW1wibGVmdFwiLCBcInRvcFwiXS5pbmRleE9mKHRoaXMucHJvcHMuc2lkZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBpZiAocG9zIDw9IC0xICogdGhpcy5oaWRkZW5WYWwpIHtcbiAgICAgICAgICAgICAgICBuZXdWYWwgPSB0aGlzLmhpZGRlblZhbCArIHBvcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gdGhpcy5zaG93blZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2dyZXNzID0gcG9zIC8gdGhpcy5zaXplO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGlkZGVuVmFsIC0gcG9zIDw9IHRoaXMuc2l6ZSkge1xuICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHBvcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbmV3VmFsID0gdGhpcy5zaG93blZhbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByb2dyZXNzID0gKHRoaXMuc2NlbmVTaXplIC0gcG9zKSAvIHRoaXMuc2l6ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXdWYWwgIT09IHRoaXMuY3VycmVudFZhbCkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmFsID0gbmV3VmFsO1xuICAgICAgICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzcyA+IDEgPyAxIDogcHJvZ3Jlc3MgPCAwID8gMCA6IHByb2dyZXNzO1xuXG4gICAgICAgICAgICB0aGlzLnJlZkRPTUJnTGF5ZXIuY3VycmVudC5zdHlsZS5vcGFjaXR5ID0gU3RyaW5nKHByb2dyZXNzICogdGhpcy5wcm9wcy5iZ0xheWVyT3BhY2l0eSk7XG5cbiAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtU2NoZW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgXCIldlwiLFxuICAgICAgICAgICAgICAgIFN0cmluZyh0aGlzLmN1cnJlbnRWYWwpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICBcIiV2XCIsXG4gICAgICAgICAgICAgICAgU3RyaW5nKHRoaXMuY3VycmVudFZhbClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RUb3VjaCA9IHRoaXMuZ2V0TGFzdFBvc2l0aW9uKGUpO1xuXG4gICAgICAgIGlmICghc3VwcG9ydFBhc3NpdmUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBwcml2YXRlIGhhbmRsZUhpZGVUb3VjaE1vdmUgPSAoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgbGV0IHByb2dyZXNzID0gMCxcbiAgICAgICAgICAgIG5ld1ZhbDogbnVtYmVyLFxuICAgICAgICAgICAgY2hhbmdlOiBudW1iZXIsXG4gICAgICAgICAgICBtb3ZlQXhpczogc3RyaW5nO1xuXG4gICAgICAgIGlmICh0aGlzLmxhc3RUb3VjaCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIE1hdGguYWJzKHRoaXMubGFzdFRvdWNoLmNsaWVudFggLSB0aGlzLmdldEV2ZW50WChlKSkgPj1cbiAgICAgICAgICAgICAgICBNYXRoLmFicyh0aGlzLmxhc3RUb3VjaC5jbGllbnRZIC0gdGhpcy5nZXRFdmVudFkoZSkpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRFdmVudFgoZSkgLSB0aGlzLmxhc3RUb3VjaC5jbGllbnRYIDw9IDApIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSA9ICdsZWZ0JztcbiAgICAgICAgICAgICAgICAgICAgbW92ZUF4aXMgPSBcIlhcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlID0gJ3JpZ2h0JztcbiAgICAgICAgICAgICAgICAgICAgbW92ZUF4aXMgPSBcIlhcIjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEV2ZW50WShlKSAtIHRoaXMubGFzdFRvdWNoLmNsaWVudFkgPD0gMCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBtb3ZlID0gJ3RvcCc7XG4gICAgICAgICAgICAgICAgICAgIG1vdmVBeGlzID0gXCJZXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gbW92ZSA9ICdib3R0b20nO1xuICAgICAgICAgICAgICAgICAgICBtb3ZlQXhpcyA9IFwiWVwiO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG1vdmVBeGlzID09PSB0aGlzLmF4aXMgJiZcbiAgICAgICAgICAgICgoW1wibGVmdFwiLCBcInRvcFwiXS5pbmRleE9mKHRoaXMucHJvcHMuc2lkZSkgIT09IC0xICYmXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRQb3NpdGlvbihlLCBtb3ZlQXhpcykgPCB0aGlzLnNpemUpIHx8XG4gICAgICAgICAgICAgICAgKFtcInJpZ2h0XCIsIFwiYm90dG9tXCJdLmluZGV4T2YodGhpcy5wcm9wcy5zaWRlKSAhPT0gLTEgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRQb3NpdGlvbihlLCBtb3ZlQXhpcykgPiB0aGlzLmhpZGRlblZhbCAtIHRoaXMuc2l6ZSkpXG4gICAgICAgICkge1xuICAgICAgICAgICAgY2hhbmdlID0gdGhpcy5nZXRQb3NpdGlvbihlLCB0aGlzLmF4aXMpIC0gdGhpcy5sYXN0VG91Y2hbXCJjbGllbnRcIiArIHRoaXMuYXhpc107XG4gICAgICAgICAgICBuZXdWYWwgPSB0aGlzLmN1cnJlbnRWYWwgKyBjaGFuZ2U7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLnNpZGUgPT09IFwibGVmdFwiIHx8IHRoaXMucHJvcHMuc2lkZSA9PT0gXCJ0b3BcIikge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWYWwgPCB0aGlzLmhpZGRlblZhbCkge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWwgPSB0aGlzLmhpZGRlblZhbDtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5ld1ZhbCA+IHRoaXMuc2hvd25WYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsID0gdGhpcy5zaG93blZhbDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBwcm9ncmVzcyA9IDEgLSBNYXRoLmFicyhuZXdWYWwgLyB0aGlzLnNpemUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAobmV3VmFsID4gdGhpcy5oaWRkZW5WYWwpIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsID0gdGhpcy5oaWRkZW5WYWw7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChuZXdWYWwgPCB0aGlzLnNob3duVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbCA9IHRoaXMuc2hvd25WYWw7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSAodGhpcy5zY2VuZVNpemUgLSBuZXdWYWwpIC8gdGhpcy5zaXplO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAobmV3VmFsICE9PSB0aGlzLmN1cnJlbnRWYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmN1cnJlbnRWYWwgPSBuZXdWYWw7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBwcm9ncmVzcyA+IDEgPyAxIDogcHJvZ3Jlc3MgPCAwID8gMCA6IHByb2dyZXNzO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQuc3R5bGUub3BhY2l0eSA9IFN0cmluZyhcbiAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3MgKiB0aGlzLnByb3BzLmJnTGF5ZXJPcGFjaXR5XG4gICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtU2NoZW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIFwiJXZcIixcbiAgICAgICAgICAgICAgICAgICAgU3RyaW5nKHRoaXMuY3VycmVudFZhbClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtU2NoZW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAgIFwiJXZcIixcbiAgICAgICAgICAgICAgICAgICAgU3RyaW5nKHRoaXMuY3VycmVudFZhbClcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5sYXN0VG91Y2ggPSB0aGlzLmdldExhc3RQb3NpdGlvbihlKTtcbiAgICAgICAgaWYgKCFzdXBwb3J0UGFzc2l2ZSkge1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHByaXZhdGUgaGFuZGxlVG91Y2hFbmQgPSAoZTogVG91Y2hFdmVudCB8IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICAgICAgbGV0IHZhbCA9IG51bGw7XG5cbiAgICAgICAgaWYgKCF0aGlzLmFuaW1hdGluZykge1xuICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFZhbCAhPT0gdGhpcy5zaG93blZhbCAmJiB0aGlzLmN1cnJlbnRWYWwgIT09IHRoaXMuaGlkZGVuVmFsKSB7XG4gICAgICAgICAgICAgICAgaWYgKFtcImxlZnRcIiwgXCJ0b3BcIl0uaW5kZXhPZih0aGlzLnByb3BzLnNpZGUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXJyZW50VmFsID49IHRoaXMuaGlkZGVuVmFsIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy5zaG93blZhbDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuaGlkZGVuVmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY3VycmVudFZhbCA8IHRoaXMuaGlkZGVuVmFsIC0gdGhpcy5zaXplIC8gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsID0gdGhpcy5zaG93blZhbDtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbCA9IHRoaXMuaGlkZGVuVmFsO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRWYWwgPT09IHRoaXMuaGlkZGVuVmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET00uY3VycmVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh2YWwgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnRyYW5zbGF0ZVRvKHZhbCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlzU2hvd24gIT09IHRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudmlzaWJpbGl0eUNhbGxiYWNrKHRoaXMuaXNTaG93bigpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNjZW5lRE9NLnJlbW92ZUV2ZW50TGlzdGVuZXIodGhpcy5lbmRFdmVudCwgdGhpcy5oYW5kbGVUb3VjaEVuZCk7XG4gICAgfTtcblxuICAgIGhpZGUgPSAoKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnRyYW5zbGF0ZVRvKHRoaXMuaGlkZGVuVmFsKTtcbiAgICB9O1xuXG4gICAgc2hvdyA9ICgpOiBQcm9taXNlPGJvb2xlYW4+ID0+IHtcbiAgICAgICAgdGhpcy5lbmFibGUoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNsYXRlVG8odGhpcy5zaG93blZhbCk7XG4gICAgfTtcblxuICAgIGlzU2hvd24gPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlZkRPTS5jdXJyZW50Lm9mZnNldFBhcmVudCAhPT0gbnVsbDtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSB0cmFuc2xhdGVUbyA9IChmaW5pc2hWYWw6IG51bWJlcik6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAgICAgICAocmVzb2x2ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0aW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBgb3BhY2l0eSAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvblRpbWVcbiAgICAgICAgICAgICAgICB9bXMgZWFzZS1pbmA7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9IGBvcGFjaXR5ICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZVxuICAgICAgICAgICAgICAgIH1tcyBlYXNlLWluYDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUJnTGF5ZXIuY3VycmVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICBpZiAoZmluaXNoVmFsID09PSB0aGlzLnNob3duVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5pc1Nob3duKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50LnN0eWxlLm9wYWNpdHkgPSBTdHJpbmcodGhpcy5wcm9wcy5iZ0xheWVyT3BhY2l0eSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChmaW5pc2hWYWwgPT09IHRoaXMuaGlkZGVuVmFsKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50LnN0eWxlLm9wYWNpdHkgPSBcIjBcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50Lm9mZnNldEhlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcImluaXRpYWxcIjtcblxuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBgLXdlYmtpdC10cmFuc2Zvcm0gJHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25UaW1lXG4gICAgICAgICAgICAgICAgfW1zIGVhc2Utb3V0YDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gYHRyYW5zZm9ybSAke1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvblRpbWVcbiAgICAgICAgICAgICAgICB9bXMgZWFzZS1vdXRgO1xuICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NRHJhZ0N0bi5jdXJyZW50LnN0eWxlLnRyYW5zaXRpb24gPSBgdHJhbnNmb3JtICR7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMuYW5pbWF0aW9uVGltZVxuICAgICAgICAgICAgICAgIH1tcyBlYXNlLW91dGA7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5vZmZzZXRIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgXCIldlwiLFxuICAgICAgICAgICAgICAgICAgICBTdHJpbmcoZmluaXNoVmFsKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUudHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgICAgXCIldlwiLFxuICAgICAgICAgICAgICAgICAgICBTdHJpbmcoZmluaXNoVmFsKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5vZmZzZXRIZWlnaHQ7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTURyYWdDdG4uY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gXCJpbml0aWFsXCI7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZET01EcmFnQ3RuLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQmdMYXllci5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBcImluaXRpYWxcIjtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01CZ0xheWVyLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiaW5pdGlhbFwiO1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFZhbCA9IGZpbmlzaFZhbDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoZmluaXNoVmFsID09PSB0aGlzLmhpZGRlblZhbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET00uY3VycmVudC5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGluZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnByb3BzLmlzU2hvd24gIT09IHRoaXMuaXNTaG93bigpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnZpc2liaWxpdHlDYWxsYmFjayh0aGlzLmlzU2hvd24oKSk7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuaXNTaG93bigpKTtcbiAgICAgICAgICAgICAgICB9LCB0aGlzLnByb3BzLmFuaW1hdGlvblRpbWUgKyA1KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgcHJpdmF0ZSB1cGRhdGVTaWRlUHJvcHMoc2lkZTogUGxhY2VtZW50LCBzaXplRmFjdG9yOiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKHNpZGUgPT09IFwibGVmdFwiIHx8IHNpZGUgPT09IFwicmlnaHRcIikge1xuICAgICAgICAgICAgdGhpcy5zaXplID0gdGhpcy5wcm9wcy5zY2VuZVdpZHRoICogc2l6ZUZhY3RvcjtcbiAgICAgICAgICAgIHRoaXMuc2NlbmVTaXplID0gdGhpcy5wcm9wcy5zY2VuZVdpZHRoO1xuICAgICAgICAgICAgdGhpcy5oaWRkZW5WYWwgPSBzaWRlID09PSBcImxlZnRcIiA/IC0xICogdGhpcy5zaXplIDogdGhpcy5wcm9wcy5zY2VuZVdpZHRoO1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1TY2hlbWUgPSBcInRyYW5zbGF0ZTNkKCV2cHgsMCwwKVwiO1xuICAgICAgICAgICAgdGhpcy5heGlzID0gXCJYXCI7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvL3RvcCxib3R0b21cbiAgICAgICAgICAgIHRoaXMuc2l6ZSA9IHRoaXMucHJvcHMuc2NlbmVIZWlnaHQgKiBzaXplRmFjdG9yO1xuICAgICAgICAgICAgdGhpcy5zY2VuZVNpemUgPSB0aGlzLnByb3BzLnNjZW5lSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5oaWRkZW5WYWwgPSBzaWRlID09PSBcInRvcFwiID8gLTEgKiB0aGlzLnNpemUgOiB0aGlzLnByb3BzLnNjZW5lSGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy50cmFuc2Zvcm1TY2hlbWUgPSBcInRyYW5zbGF0ZTNkKDAsJXZweCwwKVwiO1xuICAgICAgICAgICAgdGhpcy5heGlzID0gXCJZXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2lkZSA9PT0gXCJ0b3BcIiB8fCBzaWRlID09PSBcImxlZnRcIikge1xuICAgICAgICAgICAgdGhpcy5zaG93blZhbCA9IDA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNob3duVmFsID0gdGhpcy5zY2VuZVNpemUgLSB0aGlzLnNpemU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5pc1Nob3duKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRWYWwgPSB0aGlzLnNob3duVmFsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50VmFsID0gdGhpcy5oaWRkZW5WYWw7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmxhc3RTaWRlID0gc2lkZTtcbiAgICAgICAgdGhpcy5sYXN0U2l6ZUZhY3RvciA9IHNpemVGYWN0b3I7XG4gICAgICAgIHRoaXMubGFzdFNjZW5lV2lkdGggPSB0aGlzLnByb3BzLnNjZW5lV2lkdGg7XG4gICAgICAgIHRoaXMubGFzdFNjZW5lSGVpZ2h0ID0gdGhpcy5wcm9wcy5zY2VuZUhlaWdodDtcbiAgICB9XG5cbiAgICBjb21wb25lbnREaWRVcGRhdGUocHJldlByb3BzOiBQcm9wcyk6IHZvaWQge1xuICAgICAgICBpZiAocHJldlByb3BzLmVuYWJsZWQgIT09IHRoaXMucHJvcHMuZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpc1t0aGlzLnByb3BzLmVuYWJsZWQgPyBcImVuYWJsZVwiIDogXCJkaXNhYmxlXCJdKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZW5kZXIoKTogUmVhY3ROb2RlIHtcbiAgICAgICAgY29uc3QgY2xhc3NOYW1lID1cbiAgICAgICAgICAgIFwiYWlyci1zaWRlcGFuZWwgXCIgK1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaWRlICtcbiAgICAgICAgICAgIFwiIFwiICtcbiAgICAgICAgICAgICh0aGlzLnByb3BzLmVuYWJsZWQgPyBcImVuYWJsZWRcIiA6IFwiZGlzYWJsZWRcIik7XG4gICAgICAgIGNvbnN0IGRyYWdDdG5TdHlsZSA9IHsgd2lkdGg6IFwiXCIsIGhlaWdodDogXCJcIiwgdHJhbnNmb3JtOiBcIlwiLCBXZWJraXRUcmFuc2Zvcm06IFwiXCIgfTtcbiAgICAgICAgbGV0IHNpZGVwYW5lbFN0eWxlO1xuICAgICAgICBsZXQgYmdMYXllclN0eWxlO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2lkZSAhPT0gdGhpcy5sYXN0U2lkZSB8fFxuICAgICAgICAgICAgdGhpcy5wcm9wcy5zaXplRmFjdG9yICE9PSB0aGlzLmxhc3RTaXplRmFjdG9yIHx8XG4gICAgICAgICAgICB0aGlzLnByb3BzLnNjZW5lV2lkdGggIT09IHRoaXMubGFzdFNjZW5lV2lkdGggfHxcbiAgICAgICAgICAgIHRoaXMucHJvcHMuc2NlbmVIZWlnaHQgIT09IHRoaXMubGFzdFNjZW5lSGVpZ2h0XG4gICAgICAgICkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTaWRlUHJvcHModGhpcy5wcm9wcy5zaWRlLCB0aGlzLnByb3BzLnNpemVGYWN0b3IpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuc2lkZSA9PT0gXCJsZWZ0XCIgfHwgdGhpcy5wcm9wcy5zaWRlID09PSBcInJpZ2h0XCIpIHtcbiAgICAgICAgICAgIGRyYWdDdG5TdHlsZS53aWR0aCA9IHRoaXMuc2l6ZSArIFwicHhcIjtcbiAgICAgICAgICAgIGRyYWdDdG5TdHlsZS5oZWlnaHQgPSBcIjEwMCVcIjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vdG9wLGJvdHRvbVxuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLmhlaWdodCA9IHRoaXMuc2l6ZSArIFwicHhcIjtcbiAgICAgICAgICAgIGRyYWdDdG5TdHlsZS53aWR0aCA9IFwiMTAwJVwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaXNTaG93bikge1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtU2NoZW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgXCIldlwiLFxuICAgICAgICAgICAgICAgIFN0cmluZyh0aGlzLnNob3duVmFsKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGRyYWdDdG5TdHlsZS50cmFuc2Zvcm0gPSB0aGlzLnRyYW5zZm9ybVNjaGVtZS5yZXBsYWNlKFwiJXZcIiwgU3RyaW5nKHRoaXMuc2hvd25WYWwpKTtcbiAgICAgICAgICAgIHNpZGVwYW5lbFN0eWxlID0geyBkaXNwbGF5OiBcImJsb2NrXCIgfTtcbiAgICAgICAgICAgIGJnTGF5ZXJTdHlsZSA9IHsgb3BhY2l0eTogdGhpcy5wcm9wcy5iZ0xheWVyT3BhY2l0eSB9O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZHJhZ0N0blN0eWxlLldlYmtpdFRyYW5zZm9ybSA9IHRoaXMudHJhbnNmb3JtU2NoZW1lLnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgXCIldlwiLFxuICAgICAgICAgICAgICAgIFN0cmluZyh0aGlzLmhpZGRlblZhbClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBkcmFnQ3RuU3R5bGUudHJhbnNmb3JtID0gdGhpcy50cmFuc2Zvcm1TY2hlbWUucmVwbGFjZShcIiV2XCIsIFN0cmluZyh0aGlzLmhpZGRlblZhbCkpO1xuICAgICAgICAgICAgc2lkZXBhbmVsU3R5bGUgPSB7IGRpc3BsYXk6IFwibm9uZVwiIH07XG4gICAgICAgICAgICBiZ0xheWVyU3R5bGUgPSB7IG9wYWNpdHk6IDAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNoaWxkcmVuID1cbiAgICAgICAgICAgIHR5cGVvZiB0aGlzLnByb3BzLmNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzLnByb3BzLmNoaWxkcmVuKCkgOiB0aGlzLnByb3BzLmNoaWxkcmVuO1xuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSByZWY9e3RoaXMucmVmRE9NfSBzdHlsZT17c2lkZXBhbmVsU3R5bGV9PlxuICAgICAgICAgICAgICAgIDxkaXYgcmVmPXt0aGlzLnJlZkRPTUJnTGF5ZXJ9IHN0eWxlPXtiZ0xheWVyU3R5bGV9IC8+XG4gICAgICAgICAgICAgICAgPGRpdiByZWY9e3RoaXMucmVmRE9NRHJhZ0N0bn0gc3R5bGU9e2RyYWdDdG5TdHlsZX0+XG4gICAgICAgICAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==