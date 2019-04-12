"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _AirrFX = _interopRequireDefault(require("./AirrFX"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

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

var AirrMayer =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AirrMayer, _PureComponent);

  /**
   * Mayer's HTML DOM Element refferency
   */

  /**
   * Mayer's container's HTML DOM Element refferency
   */
  function AirrMayer(props) {
    var _this;

    _classCallCheck(this, AirrMayer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AirrMayer).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "refDOMMayer", (0, React.createRef)());

    _defineProperty(_assertThisInitialized(_this), "refDOMCtn", (0, React.createRef)());

    if (!props.name) {
      throw new Error("Every Mayer must has its `name` property set");
    }

    return _this;
  }

  _createClass(AirrMayer, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var refDOMCtn = this.refDOMCtn.current;

      if (refDOMCtn && refDOMCtn.clientHeight >= this.props.avaibleHeight) {
        refDOMCtn.style.height = this.props.avaibleHeight + "px";
        refDOMCtn.classList && refDOMCtn.classList.add("full");
      }

      this.animateIn();
    }
    /**
     * Animates Mayers html dom element into the screen
     */

  }, {
    key: "animateIn",
    value: function animateIn() {
      var refDOMMayer = this.refDOMMayer.current;
      var bgDOM = refDOMMayer && refDOMMayer.querySelector(".bg");
      var startProps = {
        opacity: "0"
      };
      var endProps = {
        opacity: "1"
      };

      if (bgDOM) {
        _AirrFX.default.doTransitionAnimation(bgDOM, startProps, ["opacity " + this.props.animationTime + "ms ease-out"], endProps);
      }

      var refDOMCtn = this.refDOMCtn.current;

      if (refDOMCtn && refDOMMayer) {
        _AirrFX.default.doOverlayInAnimation(refDOMCtn, refDOMMayer.clientWidth, refDOMMayer.clientHeight, this.props.animationTime, this.props.appearFrom);
      }
    }
    /**
     * Animates Mayers html dom element out of the screen
     * @param {function} callback Called after animation end
     */

  }, {
    key: "animateOut",
    value: function animateOut(callback) {
      var refDOMMayer = this.refDOMMayer.current;
      var bgDOM = refDOMMayer && refDOMMayer.querySelector(".bg");
      var startProps = {
        opacity: "1"
      };
      var endProps = {
        opacity: "0"
      };

      if (bgDOM) {
        _AirrFX.default.doTransitionAnimation(bgDOM, startProps, ["opacity " + this.props.animationTime + "ms ease-out"], endProps);
      }

      var refDOMCtn = this.refDOMCtn.current;

      if (refDOMCtn && refDOMMayer) {
        _AirrFX.default.doOverlayOutAnimation(refDOMCtn, refDOMMayer.clientHeight, refDOMMayer.clientWidth, this.props.animationTime, this.props.leaveTo, callback);
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "airr-mayer",
        ref: this.refDOMMayer,
        style: this.props.style
      }, React.createElement(BgRenderer, null), React.createElement("div", {
        className: "ctn",
        ref: this.refDOMCtn
      }, React.createElement(BodyRenderer, {
        content: this.props.content
      }, this.props.children), React.createElement(ButtonRenderer, {
        buttons: this.props.buttons
      })));
    }
  }]);

  return AirrMayer;
}(React.PureComponent);

exports.default = AirrMayer;

_defineProperty(AirrMayer, "defaultProps", {
  name: "",
  appearFrom: "bottom",
  leaveTo: "bottom",
  buttons: [],
  animationTime: 300,
  style: null,
  content: null,
  children: null
});

var BgRenderer = React.memo(function BgRenderer() {
  return React.createElement("div", {
    className: "bg"
  });
});
var BodyRenderer = React.memo(function BodyRenderer(_ref) {
  var children = _ref.children,
      content = _ref.content;
  return React.createElement("div", {
    className: "text"
  }, children, content);
});
var MayerButton = React.memo(function MayerButton(_ref2) {
  var className = _ref2.className,
      style = _ref2.style,
      handler = _ref2.handler,
      children = _ref2.children,
      spareAttribs = _objectWithoutProperties(_ref2, ["className", "style", "handler", "children"]);

  return React.createElement("button", _extends({
    className: className,
    style: style,
    onClick: handler
  }, spareAttribs), children);
});
var ButtonRenderer = React.memo(function ButtonRenderer(_ref3) {
  var buttons = _ref3.buttons;
  return React.createElement("div", {
    className: "btns"
  }, buttons && buttons.map(function (config, index) {
    var className = "btn text";

    if (config.className) {
      className += " " + config.className;
    }

    var spareAttribs = {};

    if (config.attrs) {
      spareAttribs = config.attrs;
    }

    return React.createElement(MayerButton, _extends({
      key: "btn" + index,
      className: className,
      style: config.style || null,
      handler: config.handler || null
    }, spareAttribs), config.content);
  }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyTWF5ZXIudHN4Il0sIm5hbWVzIjpbIkFpcnJNYXllciIsInByb3BzIiwibmFtZSIsIkVycm9yIiwicmVmRE9NQ3RuIiwiY3VycmVudCIsImNsaWVudEhlaWdodCIsImF2YWlibGVIZWlnaHQiLCJzdHlsZSIsImhlaWdodCIsImNsYXNzTGlzdCIsImFkZCIsImFuaW1hdGVJbiIsInJlZkRPTU1heWVyIiwiYmdET00iLCJxdWVyeVNlbGVjdG9yIiwic3RhcnRQcm9wcyIsIm9wYWNpdHkiLCJlbmRQcm9wcyIsIkFpcnJGWCIsImRvVHJhbnNpdGlvbkFuaW1hdGlvbiIsImFuaW1hdGlvblRpbWUiLCJkb092ZXJsYXlJbkFuaW1hdGlvbiIsImNsaWVudFdpZHRoIiwiYXBwZWFyRnJvbSIsImNhbGxiYWNrIiwiZG9PdmVybGF5T3V0QW5pbWF0aW9uIiwibGVhdmVUbyIsImNvbnRlbnQiLCJjaGlsZHJlbiIsImJ1dHRvbnMiLCJQdXJlQ29tcG9uZW50IiwiQmdSZW5kZXJlciIsIlJlYWN0IiwibWVtbyIsIkJvZHlSZW5kZXJlciIsIk1heWVyQnV0dG9uIiwiY2xhc3NOYW1lIiwiaGFuZGxlciIsInNwYXJlQXR0cmlicyIsIkJ1dHRvblJlbmRlcmVyIiwibWFwIiwiY29uZmlnIiwiaW5kZXgiLCJhdHRycyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBOztBQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNFcUJBLFM7Ozs7O0FBV2pCOzs7O0FBSUE7OztBQUtBLHFCQUFZQyxLQUFaLEVBQTBCO0FBQUE7O0FBQUE7O0FBQ3RCLG1GQUFNQSxLQUFOOztBQURzQixrRUFOWixzQkFNWTs7QUFBQSxnRUFGZCxzQkFFYzs7QUFFdEIsUUFBSSxDQUFDQSxLQUFLLENBQUNDLElBQVgsRUFBaUI7QUFDYixZQUFNLElBQUlDLEtBQUosQ0FBVSw4Q0FBVixDQUFOO0FBQ0g7O0FBSnFCO0FBS3pCOzs7O3dDQUV5QjtBQUN0QixVQUFNQyxTQUFT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QUNJO0FBQVEsSUFBQSxTQUFTLEVBQUVGLFNBQW5CO0FBQThCLElBQUEsS0FBSyxFQUFFN0IsS0FBckM7QUFBNEMsSUFBQSxPQUFPLEVBQUU4QjtBQUFyRCxLQUFrRUMsWUFBbEUsR0FDS1YsUUFETCxDQURKO0FBS0gsQ0FabUIsQ0FBcEI7QUFhQSxJQUFNVyxjQUFjLEdBQUdQLEtBQUssQ0FBQ0MsSUFBTixDQUFnQyxTQUFTTSxjQUFULFFBRS9CO0FBQUEsTUFEcEJWLE9BQ29CLFNBRHBCQSxPQUNvQjtBQUNwQixTQUNJO0FBQUssSUFBQSxTQUFTLEVBQUM7QUFBZixLQUNLQSxPQUFPLElBQ0pBLE9BQU8sQ0FBQ1csR0FBUixDQUFZLFVBQUNDLE1BQUQsRUFBU0MsS0FBVCxFQUFtQjtBQUMzQixRQUFJTixTQUFTLEdBQUcsVUFBaEI7O0FBRUEsUUFBSUssTUFBTSxDQUFDTCxTQUFYLEVBQXNCO0FBQ2xCQSxNQUFBQSxTQUFTLElBQUksTUFBTUssTUFBTSxDQUFDTCxTQUExQjtBQUNIOztBQUVELFFBQUlFLFlBQVksR0FBRyxFQUFuQjs7QUFDQSxRQUFJRyxNQUFNLENBQUNFLEtBQVgsRUFBa0I7QUFDZEwsTUFBQUEsWUFBWSxHQUFHRyxNQUFNLENBQUNFLEtBQXRCO0FBQ0g7O0FBRUQsV0FDSSxvQkFBQyxXQUFEO0FBQ0ksTUFBQSxHQUFHLEVBQUUsUUFBUUQsS0FEakI7QUFFSSxNQUFBLFNBQVMsRUFBRU4sU0FGZjtBQUdJLE1BQUEsS0FBSyxFQUFFSyxNQUFNLENBQUNsQyxLQUFQLElBQWdCLElBSDNCO0FBSUksTUFBQSxPQUFPLEVBQUVrQyxNQUFNLENBQUNKLE9BQVAsSUFBa0I7QUFKL0IsT0FLUUMsWUFMUixHQU9LRyxNQUFNLENBQUNkLE9BUFosQ0FESjtBQVdILEdBdkJELENBRlIsQ0FESjtBQTZCSCxDQWhDc0IsQ0FBdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFN5bnRoZXRpY0V2ZW50IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBSZWFjdE5vZGUsIGNyZWF0ZVJlZiB9IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IEFpcnJGWCBmcm9tIFwiLi9BaXJyRlhcIjtcbmltcG9ydCB7IENTU1N0cmluZ1Byb3BlcnRpZXMsIFBsYWNlbWVudCB9IGZyb20gXCIuL2FpcnItcmVhY3RcIjtcblxuaW50ZXJmYWNlIE1heWVyQnV0dG9uUHJvcHMge1xuICAgIC8qKlxuICAgICAqIEV4dHJhIGNsYXNzIG5hbWVzIHRvIHVzZSB1cG9uIGJ1dHRvblxuICAgICAqL1xuICAgIGNsYXNzTmFtZT86IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBFeHRyYSBhdHRyaWJ1dGVzIHRvIGFwcGx5IG9uIEhUTUwgZWxlbWVudFxuICAgICAqL1xuICAgIGF0dHJzPzogQ1NTU3RyaW5nUHJvcGVydGllcztcbiAgICAvKipcbiAgICAgKiBBZGRpdGlvbmFsIGlubGluZSBzdHlsZXNcbiAgICAgKi9cbiAgICBzdHlsZT86IENTU1N0cmluZ1Byb3BlcnRpZXM7XG4gICAgLyoqXG4gICAgICogT3B0aW9uIGJvb2wgdGhhdCB3aWxsIGF1dG9tYXRpY2FsbHkgYWRkIGNsb3NlIGZ1bmN0aW9uYWxpdHkgdG8gdGhlIGJ1dHRvblxuICAgICAqL1xuICAgIGNsb3NlPzogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBPbkNsaWNrIGZ1bmN0aW9uIGhhbmRsZXJcbiAgICAgKi9cbiAgICBoYW5kbGVyPzogKGU6IFN5bnRoZXRpY0V2ZW50PEhUTUxCdXR0b25FbGVtZW50PikgPT4gdm9pZDtcbiAgICAvKipcbiAgICAgKiBDb250ZW50IHRvIHJlbmRlciBpbnNpZGUgTWF5ZXIuIE1pZ2h0IGJlIHN0cmluZyBvciBSZWFjdE5vZGUuXG4gICAgICovXG4gICAgY29udGVudD86IFJlYWN0Tm9kZTtcbiAgICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbn1cbmludGVyZmFjZSBCdXR0b25SZW5kZXJlclByb3BzIHtcbiAgICBidXR0b25zPzogTWF5ZXJCdXR0b25Qcm9wc1tdO1xufVxuZXhwb3J0IGludGVyZmFjZSBQcm9wcyB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIG1heWVyLiBNdXN0IGJlIHVuaXF1ZSBhbW9uZyBvdGhlcnMgbWF5ZXJzIGluIHNjZW5lLiBXaWxsIGJlIHVzZWQgYXMgaWRlbnRpZmljYXRpb24uXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEV4dHJhIHN0eWxlcyB0byBhcHBseSBvbiBNYXllcidzIERPTSBlbGVtZW50XG4gICAgICovXG4gICAgc3R5bGU/OiBDU1NTdHJpbmdQcm9wZXJ0aWVzO1xuICAgIC8qKlxuICAgICAqIFNpZGUgZnJvbSB3aGljaCBtYXllciBjb250ZW50IGJveCB3aWxsIGVudGVyXG4gICAgICovXG4gICAgYXBwZWFyRnJvbTogUGxhY2VtZW50O1xuICAgIC8qKlxuICAgICAqIFNpZGUgdG8gd2hpY2ggbWF5ZXIgY29udGVudCBib3ggd2lsbCBsZWF2ZVxuICAgICAqL1xuICAgIGxlYXZlVG86IFBsYWNlbWVudDtcbiAgICAvKipcbiAgICAgKiBDb250ZW50IG9mIG1heWVyXG4gICAgICovXG4gICAgY29udGVudD86IFJlYWN0Tm9kZTtcbiAgICAvKipcbiAgICAgKiBBcnJheSB3aXRoIGJ1dHRvbnMgY29uZmlndXJhdGlvblxuICAgICAqL1xuICAgIGJ1dHRvbnM/OiBNYXllckJ1dHRvblByb3BzW107XG4gICAgLyoqXG4gICAgICogVGltZSBpbiBtaWxpc2Vjb25kcyBvZiBtYXllcidzIGFwcGVhci9kaXNhcHBlYXIgYW5pbWF0aW9uXG4gICAgICovXG4gICAgYW5pbWF0aW9uVGltZTogbnVtYmVyO1xuICAgIGNoaWxkcmVuOiBSZWFjdE5vZGU7XG59XG5leHBvcnQgaW50ZXJmYWNlIFByZXBhcmVkUHJvcHMgZXh0ZW5kcyBQcm9wcyB7XG4gICAgLyoqXG4gICAgICogUGFyZW50IHNjZW5lIGhlaWdodC4gU2V0IGJ5IHBhcmVudCBTY2VuZS4gRG8gbm90IG92ZXJ3cml0ZSFcbiAgICAgKi9cbiAgICBhdmFpYmxlSGVpZ2h0PzogbnVtYmVyO1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWlyck1heWVyIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxQcmVwYXJlZFByb3BzPiB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wczogUHJlcGFyZWRQcm9wcyA9IHtcbiAgICAgICAgbmFtZTogXCJcIixcbiAgICAgICAgYXBwZWFyRnJvbTogXCJib3R0b21cIixcbiAgICAgICAgbGVhdmVUbzogXCJib3R0b21cIixcbiAgICAgICAgYnV0dG9uczogW10sXG4gICAgICAgIGFuaW1hdGlvblRpbWU6IDMwMCxcbiAgICAgICAgc3R5bGU6IG51bGwsXG4gICAgICAgIGNvbnRlbnQ6IG51bGwsXG4gICAgICAgIGNoaWxkcmVuOiBudWxsXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBNYXllcidzIEhUTUwgRE9NIEVsZW1lbnQgcmVmZmVyZW5jeVxuICAgICAqL1xuICAgIHJlZkRPTU1heWVyID0gY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xuICAgIC8qKlxuICAgICAqIE1heWVyJ3MgY29udGFpbmVyJ3MgSFRNTCBET00gRWxlbWVudCByZWZmZXJlbmN5XG4gICAgICovXG4gICAgcmVmRE9NQ3RuID0gY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcbiAgICAgICAgaWYgKCFwcm9wcy5uYW1lKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJFdmVyeSBNYXllciBtdXN0IGhhcyBpdHMgYG5hbWVgIHByb3BlcnR5IHNldFwiKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbXBvbmVudERpZE1vdW50KCk6IHZvaWQge1xuICAgICAgICBjb25zdCByZWZET01DdG4gPSB0aGlzLnJlZkRPTUN0bi5jdXJyZW50O1xuICAgICAgICBpZiAocmVmRE9NQ3RuICYmIHJlZkRPTUN0bi5jbGllbnRIZWlnaHQgPj0gdGhpcy5wcm9wcy5hdmFpYmxlSGVpZ2h0KSB7XG4gICAgICAgICAgICByZWZET01DdG4uc3R5bGUuaGVpZ2h0ID0gdGhpcy5wcm9wcy5hdmFpYmxlSGVpZ2h0ICsgXCJweFwiO1xuICAgICAgICAgICAgcmVmRE9NQ3RuLmNsYXNzTGlzdCAmJiByZWZET01DdG4uY2xhc3NMaXN0LmFkZChcImZ1bGxcIik7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuaW1hdGVJbigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuaW1hdGVzIE1heWVycyBodG1sIGRvbSBlbGVtZW50IGludG8gdGhlIHNjcmVlblxuICAgICAqL1xuICAgIGFuaW1hdGVJbigpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmVmRE9NTWF5ZXIgPSB0aGlzLnJlZkRPTU1heWVyLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGJnRE9NID0gcmVmRE9NTWF5ZXIgJiYgcmVmRE9NTWF5ZXIucXVlcnlTZWxlY3RvcihcIi5iZ1wiKTtcbiAgICAgICAgY29uc3Qgc3RhcnRQcm9wcyA9IHsgb3BhY2l0eTogXCIwXCIgfTtcbiAgICAgICAgY29uc3QgZW5kUHJvcHMgPSB7IG9wYWNpdHk6IFwiMVwiIH07XG5cbiAgICAgICAgaWYgKGJnRE9NKSB7XG4gICAgICAgICAgICBBaXJyRlguZG9UcmFuc2l0aW9uQW5pbWF0aW9uKFxuICAgICAgICAgICAgICAgIGJnRE9NIGFzIEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICAgIHN0YXJ0UHJvcHMgYXMgQ1NTU3RyaW5nUHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICBbXCJvcGFjaXR5IFwiICsgdGhpcy5wcm9wcy5hbmltYXRpb25UaW1lICsgXCJtcyBlYXNlLW91dFwiXSxcbiAgICAgICAgICAgICAgICBlbmRQcm9wcyBhcyBDU1NTdHJpbmdQcm9wZXJ0aWVzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVmRE9NQ3RuID0gdGhpcy5yZWZET01DdG4uY3VycmVudDtcblxuICAgICAgICBpZiAocmVmRE9NQ3RuICYmIHJlZkRPTU1heWVyKSB7XG4gICAgICAgICAgICBBaXJyRlguZG9PdmVybGF5SW5BbmltYXRpb24oXG4gICAgICAgICAgICAgICAgcmVmRE9NQ3RuLFxuICAgICAgICAgICAgICAgIHJlZkRPTU1heWVyLmNsaWVudFdpZHRoLFxuICAgICAgICAgICAgICAgIHJlZkRPTU1heWVyLmNsaWVudEhlaWdodCxcbiAgICAgICAgICAgICAgICB0aGlzLnByb3BzLmFuaW1hdGlvblRpbWUsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hcHBlYXJGcm9tXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQW5pbWF0ZXMgTWF5ZXJzIGh0bWwgZG9tIGVsZW1lbnQgb3V0IG9mIHRoZSBzY3JlZW5cbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBjYWxsYmFjayBDYWxsZWQgYWZ0ZXIgYW5pbWF0aW9uIGVuZFxuICAgICAqL1xuICAgIGFuaW1hdGVPdXQoY2FsbGJhY2s6ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgcmVmRE9NTWF5ZXIgPSB0aGlzLnJlZkRPTU1heWVyLmN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGJnRE9NID0gcmVmRE9NTWF5ZXIgJiYgcmVmRE9NTWF5ZXIucXVlcnlTZWxlY3RvcihcIi5iZ1wiKTtcbiAgICAgICAgY29uc3Qgc3RhcnRQcm9wcyA9IHsgb3BhY2l0eTogXCIxXCIgfTtcbiAgICAgICAgY29uc3QgZW5kUHJvcHMgPSB7IG9wYWNpdHk6IFwiMFwiIH07XG5cbiAgICAgICAgaWYgKGJnRE9NKSB7XG4gICAgICAgICAgICBBaXJyRlguZG9UcmFuc2l0aW9uQW5pbWF0aW9uKFxuICAgICAgICAgICAgICAgIGJnRE9NIGFzIEhUTUxFbGVtZW50LFxuICAgICAgICAgICAgICAgIHN0YXJ0UHJvcHMgYXMgQ1NTU3RyaW5nUHJvcGVydGllcyxcbiAgICAgICAgICAgICAgICBbXCJvcGFjaXR5IFwiICsgdGhpcy5wcm9wcy5hbmltYXRpb25UaW1lICsgXCJtcyBlYXNlLW91dFwiXSxcbiAgICAgICAgICAgICAgICBlbmRQcm9wcyBhcyBDU1NTdHJpbmdQcm9wZXJ0aWVzXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVmRE9NQ3RuID0gdGhpcy5yZWZET01DdG4uY3VycmVudDtcblxuICAgICAgICBpZiAocmVmRE9NQ3RuICYmIHJlZkRPTU1heWVyKSB7XG4gICAgICAgICAgICBBaXJyRlguZG9PdmVybGF5T3V0QW5pbWF0aW9uKFxuICAgICAgICAgICAgICAgIHJlZkRPTUN0bixcbiAgICAgICAgICAgICAgICByZWZET01NYXllci5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgICAgICAgcmVmRE9NTWF5ZXIuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5hbmltYXRpb25UaW1lLFxuICAgICAgICAgICAgICAgIHRoaXMucHJvcHMubGVhdmVUbyxcbiAgICAgICAgICAgICAgICBjYWxsYmFja1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlbmRlcigpOiBSZWFjdE5vZGUge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJhaXJyLW1heWVyXCIgcmVmPXt0aGlzLnJlZkRPTU1heWVyfSBzdHlsZT17dGhpcy5wcm9wcy5zdHlsZX0+XG4gICAgICAgICAgICAgICAgPEJnUmVuZGVyZXIgLz5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImN0blwiIHJlZj17dGhpcy5yZWZET01DdG59PlxuICAgICAgICAgICAgICAgICAgICA8Qm9keVJlbmRlcmVyIGNvbnRlbnQ9e3RoaXMucHJvcHMuY29udGVudH0+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9Cb2R5UmVuZGVyZXI+XG4gICAgICAgICAgICAgICAgICAgIDxCdXR0b25SZW5kZXJlciBidXR0b25zPXt0aGlzLnByb3BzLmJ1dHRvbnN9IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5cbmNvbnN0IEJnUmVuZGVyZXIgPSBSZWFjdC5tZW1vKGZ1bmN0aW9uIEJnUmVuZGVyZXIoKSB7XG4gICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPVwiYmdcIiAvPjtcbn0pO1xuaW50ZXJmYWNlIEJvZHlSZW5kZXJlclByb3BzIHtcbiAgICBjaGlsZHJlbj86IFJlYWN0Tm9kZTtcbiAgICBjb250ZW50PzogUmVhY3ROb2RlO1xufVxuY29uc3QgQm9keVJlbmRlcmVyID0gUmVhY3QubWVtbzxCb2R5UmVuZGVyZXJQcm9wcz4oZnVuY3Rpb24gQm9keVJlbmRlcmVyKHtcbiAgICBjaGlsZHJlbixcbiAgICBjb250ZW50XG59OiBCb2R5UmVuZGVyZXJQcm9wcykge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGV4dFwiPlxuICAgICAgICAgICAge2NoaWxkcmVufVxuICAgICAgICAgICAge2NvbnRlbnR9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59KTtcbmNvbnN0IE1heWVyQnV0dG9uID0gUmVhY3QubWVtbzxNYXllckJ1dHRvblByb3BzPihmdW5jdGlvbiBNYXllckJ1dHRvbih7XG4gICAgY2xhc3NOYW1lLFxuICAgIHN0eWxlLFxuICAgIGhhbmRsZXIsXG4gICAgY2hpbGRyZW4sXG4gICAgLi4uc3BhcmVBdHRyaWJzXG59OiBNYXllckJ1dHRvblByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGJ1dHRvbiBjbGFzc05hbWU9e2NsYXNzTmFtZX0gc3R5bGU9e3N0eWxlfSBvbkNsaWNrPXtoYW5kbGVyfSB7Li4uc3BhcmVBdHRyaWJzfT5cbiAgICAgICAgICAgIHtjaGlsZHJlbn1cbiAgICAgICAgPC9idXR0b24+XG4gICAgKTtcbn0pO1xuY29uc3QgQnV0dG9uUmVuZGVyZXIgPSBSZWFjdC5tZW1vPEJ1dHRvblJlbmRlcmVyUHJvcHM+KGZ1bmN0aW9uIEJ1dHRvblJlbmRlcmVyKHtcbiAgICBidXR0b25zXG59OiBCdXR0b25SZW5kZXJlclByb3BzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJidG5zXCI+XG4gICAgICAgICAgICB7YnV0dG9ucyAmJlxuICAgICAgICAgICAgICAgIGJ1dHRvbnMubWFwKChjb25maWcsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBjbGFzc05hbWUgPSBcImJ0biB0ZXh0XCI7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbmZpZy5jbGFzc05hbWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZSArPSBcIiBcIiArIGNvbmZpZy5jbGFzc05hbWU7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBsZXQgc3BhcmVBdHRyaWJzID0ge307XG4gICAgICAgICAgICAgICAgICAgIGlmIChjb25maWcuYXR0cnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNwYXJlQXR0cmlicyA9IGNvbmZpZy5hdHRycztcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgICAgICA8TWF5ZXJCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBrZXk9e1wiYnRuXCIgKyBpbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT17Y29uZmlnLnN0eWxlIHx8IG51bGx9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlcj17Y29uZmlnLmhhbmRsZXIgfHwgbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Li4uc3BhcmVBdHRyaWJzfVxuICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtjb25maWcuY29udGVudH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvTWF5ZXJCdXR0b24+XG4gICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59KTtcbiJdfQ==