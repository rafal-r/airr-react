"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AirrView =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AirrView, _PureComponent);

  function AirrView() {
    _classCallCheck(this, AirrView);

    return _possibleConstructorReturn(this, _getPrototypeOf(AirrView).apply(this, arguments));
  }

  _createClass(AirrView, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          active = _this$props.active,
          refDOM = _this$props.refDOM,
          className = _this$props.className,
          style = _this$props.style,
          children = _this$props.children;
      var viewClass = "airr-view" + (className ? " " + className : "");
      active && (viewClass += " active");
      return React.createElement("div", {
        className: viewClass,
        style: style,
        ref: refDOM
      }, typeof children === "function" ? children() : children);
    }
  }]);

  return AirrView;
}(React.PureComponent);

exports.default = AirrView;

_defineProperty(AirrView, "defaultProps", {
  name: "",
  title: "",
  active: false,
  className: "",
  style: null
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyVmlldy50c3giXSwibmFtZXMiOlsiQWlyclZpZXciLCJwcm9wcyIsImFjdGl2ZSIsInJlZkRPTSIsImNsYXNzTmFtZSIsInN0eWxlIiwiY2hpbGRyZW4iLCJ2aWV3Q2xhc3MiLCJQdXJlQ29tcG9uZW50IiwibmFtZSIsInRpdGxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtDcUJBLFE7Ozs7Ozs7Ozs7Ozs7NkJBU0c7QUFBQSx3QkFDdUMsS0FBS0MsS0FENUM7QUFBQSxVQUNSQyxNQURRLGVBQ1JBLE1BRFE7QUFBQSxVQUNBQyxNQURBLGVBQ0FBLE1BREE7QUFBQSxVQUNRQyxTQURSLGVBQ1FBLFNBRFI7QUFBQSxVQUNtQkMsS0FEbkIsZUFDbUJBLEtBRG5CO0FBQUEsVUFDMEJDLFFBRDFCLGVBQzBCQSxRQUQxQjtBQUVoQixVQUFJQyxTQUFTLEdBQUcsZUFBZUgsU0FBUyxHQUFHLE1BQU1BLFNBQVQsR0FBcUIsRUFBN0MsQ0FBaEI7QUFFQUYsTUFBQUEsTUFBTSxLQUFLSyxTQUFTLElBQUksU0FBbEIsQ0FBTjtBQUVBLGFBQ0k7QUFBSyxRQUFBLFNBQVMsRUFBRUEsU0FBaEI7QUFBMkIsUUFBQSxLQUFLLEVBQUVGLEtBQWxDO0FBQXlDLFFBQUEsR0FBRyxFQUFFRjtBQUE5QyxTQUNLLE9BQU9HLFFBQVAsS0FBb0IsVUFBcEIsR0FBaUNBLFFBQVEsRUFBekMsR0FBOENBLFFBRG5ELENBREo7QUFLSDs7OztFQXBCaUNFLG1COzs7O2dCQUFqQlIsUSxrQkFDWTtBQUN6QlMsRUFBQUEsSUFBSSxFQUFFLEVBRG1CO0FBRXpCQyxFQUFBQSxLQUFLLEVBQUUsRUFGa0I7QUFHekJSLEVBQUFBLE1BQU0sRUFBRSxLQUhpQjtBQUl6QkUsRUFBQUEsU0FBUyxFQUFFLEVBSmM7QUFLekJDLEVBQUFBLEtBQUssRUFBRTtBQUxrQixDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyBDU1NTdHJpbmdQcm9wZXJ0aWVzIH0gZnJvbSBcIi4vYWlyci1yZWFjdFwiO1xuaW1wb3J0IHsgUHVyZUNvbXBvbmVudCwgUmVhY3ROb2RlLCBSZWZPYmplY3QgfSBmcm9tIFwicmVhY3RcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb3JlVmlld1Byb3BzIHtcbiAgICAvKipcbiAgICAgKiBUaGUgbmFtZSBvZiB0aGUgdmlldy4gTXVzdCBiZSB1bmlxdWUgYW1vbmcgb3RoZXJzIHZpZXdzIGluIHNjZW5lLiBXaWxsIGJlIHVzZWQgYXMgaWRlbnRpZmljYXRpb24gc3RyaW5nXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIFRpdGxlYmFyIG5hbWUuIGlmIHBhcmVudCBzY2VuZSBuYXZiYXIgaXMgZW5hYmxlZCwgdGhpcyB0aXRsZSB3aWxsIGJlIHNob3dlZCB0aGVyZS4gTWlnaHQgYmUgc3RyaW5nIG9yIFJlYWN0IGVsZW1lbnQuXG4gICAgICovXG4gICAgdGl0bGU6IFJlYWN0Tm9kZTtcbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhpcyB2aWV3IGlzIGFjdGl2ZS4gU2V0IGJ5IHBhcmVudCBzY2VuZS4gUmVhZG9ubHkuXG4gICAgICovXG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEV4dHJhIGNsYXNzZXMgdG8gdXNlLiBTcGFjZSBzZXBhcmV0YWQgc3RyaW5nIGxpc3QuXG4gICAgICovXG4gICAgY2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogRXh0cmEgc3R5bGVzIHRvIHVzZSB1cG9uIHJvb3QgRE9NIGVsZW1lbnQgb2Ygdmlldy5cbiAgICAgKi9cbiAgICBzdHlsZT86IENTU1N0cmluZ1Byb3BlcnRpZXM7XG59XG5leHBvcnQgaW50ZXJmYWNlIFByb3BzIGV4dGVuZHMgQ29yZVZpZXdQcm9wcyB7XG4gICAgLyoqXG4gICAgICogUmVmZmVyZW5jZSB0byB2aWV3J3Mgcm9vdCBET00gZWxlbWVudC5cbiAgICAgKi9cbiAgICByZWZET00/OiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQ+O1xuICAgIGNoaWxkcmVuPzogUmVhY3ROb2RlO1xuICAgIFtwcm9wbmFtZTogc3RyaW5nXTogYW55O1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWlyclZpZXcgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzPiB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wczogUHJvcHMgPSB7XG4gICAgICAgIG5hbWU6IFwiXCIsXG4gICAgICAgIHRpdGxlOiBcIlwiLFxuICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICBjbGFzc05hbWU6IFwiXCIsXG4gICAgICAgIHN0eWxlOiBudWxsXG4gICAgfTtcblxuICAgIHJlbmRlcigpOiBSZWFjdE5vZGUge1xuICAgICAgICBjb25zdCB7IGFjdGl2ZSwgcmVmRE9NLCBjbGFzc05hbWUsIHN0eWxlLCBjaGlsZHJlbiB9ID0gdGhpcy5wcm9wcztcbiAgICAgICAgbGV0IHZpZXdDbGFzcyA9IFwiYWlyci12aWV3XCIgKyAoY2xhc3NOYW1lID8gXCIgXCIgKyBjbGFzc05hbWUgOiBcIlwiKTtcblxuICAgICAgICBhY3RpdmUgJiYgKHZpZXdDbGFzcyArPSBcIiBhY3RpdmVcIik7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt2aWV3Q2xhc3N9IHN0eWxlPXtzdHlsZX0gcmVmPXtyZWZET019PlxuICAgICAgICAgICAgICAgIHt0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IGNoaWxkcmVuKCkgOiBjaGlsZHJlbn1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==