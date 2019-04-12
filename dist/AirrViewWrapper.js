"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _AirrView = _interopRequireDefault(require("./AirrView"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var AirrViewWrapper =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AirrViewWrapper, _PureComponent);

  function AirrViewWrapper() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AirrViewWrapper);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AirrViewWrapper)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "refDOM", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "getViewProps", function () {
      return {
        refDOM: _this.refDOM,
        name: _this.props.name,
        active: _this.props.active,
        title: _this.props.title,
        className: _this.props.className,
        style: _this.props.style
      };
    });

    return _this;
  }

  _createClass(AirrViewWrapper, [{
    key: "content",

    /**
     * Primary render method.
     * Should be overwritten in descendant class.
     * @returns {ReactNode}
     */
    value: function content() {
      console.warn("[Airr] This method should be overwritten in descendant class");
    }
    /**
     * Wrapper method to render content. Generate special props upon AirrView component.
     * Use ::content() in descenadant class instead of overwritting this one.
     * @returns {ReactNode}
     */

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement(_AirrView.default, this.getViewProps(), function () {
        return _this2.content();
      });
    }
  }, {
    key: "viewAfterActivation",
    value: function viewAfterActivation() {}
  }, {
    key: "viewAfterDeactivation",
    value: function viewAfterDeactivation() {}
  }, {
    key: "viewBeforeActivation",
    value: function viewBeforeActivation() {}
  }, {
    key: "viewBeforeDeactivation",
    value: function viewBeforeDeactivation() {}
  }]);

  return AirrViewWrapper;
}(React.PureComponent);

exports.default = AirrViewWrapper;

_defineProperty(AirrViewWrapper, "defaultProps", {
  name: "",
  title: "",
  active: false,
  className: "",
  style: null
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyVmlld1dyYXBwZXIudHN4Il0sIm5hbWVzIjpbIkFpcnJWaWV3V3JhcHBlciIsIlJlYWN0IiwiY3JlYXRlUmVmIiwicmVmRE9NIiwibmFtZSIsInByb3BzIiwiYWN0aXZlIiwidGl0bGUiLCJjbGFzc05hbWUiLCJzdHlsZSIsImNvbnNvbGUiLCJ3YXJuIiwiZ2V0Vmlld1Byb3BzIiwiY29udGVudCIsIlB1cmVDb21wb25lbnQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFcUJBLGU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2REFXUkMsS0FBSyxDQUFDQyxTQUFOLEU7O21FQU1NO0FBQUEsYUFBTztBQUNsQkMsUUFBQUEsTUFBTSxFQUFFLE1BQUtBLE1BREs7QUFFbEJDLFFBQUFBLElBQUksRUFBRSxNQUFLQyxLQUFMLENBQVdELElBRkM7QUFHbEJFLFFBQUFBLE1BQU0sRUFBRSxNQUFLRCxLQUFMLENBQVdDLE1BSEQ7QUFJbEJDLFFBQUFBLEtBQUssRUFBRSxNQUFLRixLQUFMLENBQVdFLEtBSkE7QUFLbEJDLFFBQUFBLFNBQVMsRUFBRSxNQUFLSCxLQUFMLENBQVdHLFNBTEo7QUFNbEJDLFFBQUFBLEtBQUssRUFBRSxNQUFLSixLQUFMLENBQVdJO0FBTkEsT0FBUDtBQUFBLEs7Ozs7Ozs7O0FBU2Y7Ozs7OzhCQUtnQjtBQUNaQyxNQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSw4REFBYjtBQUNIO0FBRUQ7Ozs7Ozs7OzZCQUtvQjtBQUFBOztBQUNoQixhQUFPLG9CQUFDLGlCQUFELEVBQWMsS0FBS0MsWUFBTCxFQUFkLEVBQW9DO0FBQUEsZUFBTSxNQUFJLENBQUNDLE9BQUwsRUFBTjtBQUFBLE9BQXBDLENBQVA7QUFDSDs7OzBDQUUyQixDQUFFOzs7NENBQ0EsQ0FBRTs7OzJDQUNILENBQUU7Ozs2Q0FDQSxDQUFFOzs7O0VBL0NRQyxtQjs7OztnQkFBeEJkLGUsa0JBQ29CO0FBQ2pDSSxFQUFBQSxJQUFJLEVBQUUsRUFEMkI7QUFFakNHLEVBQUFBLEtBQUssRUFBRSxFQUYwQjtBQUdqQ0QsRUFBQUEsTUFBTSxFQUFFLEtBSHlCO0FBSWpDRSxFQUFBQSxTQUFTLEVBQUUsRUFKc0I7QUFLakNDLEVBQUFBLEtBQUssRUFBRTtBQUwwQixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBQdXJlQ29tcG9uZW50LCBSZWFjdE5vZGUgfSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBaXJyVmlldywgeyBDb3JlVmlld1Byb3BzIH0gZnJvbSBcIi4vQWlyclZpZXdcIjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWlyclZpZXdXcmFwcGVyIGV4dGVuZHMgUHVyZUNvbXBvbmVudDxDb3JlVmlld1Byb3BzPiB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wczogQ29yZVZpZXdQcm9wcyA9IHtcbiAgICAgICAgbmFtZTogXCJcIixcbiAgICAgICAgdGl0bGU6IFwiXCIsXG4gICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgIGNsYXNzTmFtZTogXCJcIixcbiAgICAgICAgc3R5bGU6IG51bGxcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIFJlZmZlcmVuY3kgdG8gdmlldydzIERPTSBlbGVtZW50LlxuICAgICAqL1xuICAgIHJlZkRPTSA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcblxuICAgIC8qKlxuICAgICAqIFNwZWNpYWwgbWV0aG9kIGZvciBkZWxpdmVyaW5nIHByb3BzIHRvIEFpcnJWaWV3IGNvbXBvbmVudCdzLlxuICAgICAqIFVzZWQgaW4gcmVuZGVyIG1ldGhvZC5cbiAgICAgKi9cbiAgICBnZXRWaWV3UHJvcHMgPSAoKSA9PiAoe1xuICAgICAgICByZWZET006IHRoaXMucmVmRE9NLFxuICAgICAgICBuYW1lOiB0aGlzLnByb3BzLm5hbWUsXG4gICAgICAgIGFjdGl2ZTogdGhpcy5wcm9wcy5hY3RpdmUsXG4gICAgICAgIHRpdGxlOiB0aGlzLnByb3BzLnRpdGxlLFxuICAgICAgICBjbGFzc05hbWU6IHRoaXMucHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICBzdHlsZTogdGhpcy5wcm9wcy5zdHlsZVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUHJpbWFyeSByZW5kZXIgbWV0aG9kLlxuICAgICAqIFNob3VsZCBiZSBvdmVyd3JpdHRlbiBpbiBkZXNjZW5kYW50IGNsYXNzLlxuICAgICAqIEByZXR1cm5zIHtSZWFjdE5vZGV9XG4gICAgICovXG4gICAgY29udGVudCgpOiB2b2lkIHtcbiAgICAgICAgY29uc29sZS53YXJuKFwiW0FpcnJdIFRoaXMgbWV0aG9kIHNob3VsZCBiZSBvdmVyd3JpdHRlbiBpbiBkZXNjZW5kYW50IGNsYXNzXCIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFdyYXBwZXIgbWV0aG9kIHRvIHJlbmRlciBjb250ZW50LiBHZW5lcmF0ZSBzcGVjaWFsIHByb3BzIHVwb24gQWlyclZpZXcgY29tcG9uZW50LlxuICAgICAqIFVzZSA6OmNvbnRlbnQoKSBpbiBkZXNjZW5hZGFudCBjbGFzcyBpbnN0ZWFkIG9mIG92ZXJ3cml0dGluZyB0aGlzIG9uZS5cbiAgICAgKiBAcmV0dXJucyB7UmVhY3ROb2RlfVxuICAgICAqL1xuICAgIHJlbmRlcigpOiBSZWFjdE5vZGUge1xuICAgICAgICByZXR1cm4gPEFpcnJWaWV3IHsuLi50aGlzLmdldFZpZXdQcm9wcygpfT57KCkgPT4gdGhpcy5jb250ZW50KCl9PC9BaXJyVmlldz47XG4gICAgfVxuXG4gICAgdmlld0FmdGVyQWN0aXZhdGlvbigpOiB2b2lkIHt9XG4gICAgdmlld0FmdGVyRGVhY3RpdmF0aW9uKCk6IHZvaWQge31cbiAgICB2aWV3QmVmb3JlQWN0aXZhdGlvbigpOiB2b2lkIHt9XG4gICAgdmlld0JlZm9yZURlYWN0aXZhdGlvbigpOiB2b2lkIHt9XG59XG4iXX0=