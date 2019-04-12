"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.sceneDefaultProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _AirrMayer = _interopRequireDefault(require("./AirrMayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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

var sceneDefaultProps = {
  name: "",
  activeViewName: null,
  GUIDisabled: false,
  GUIDisableCover: null,
  animation: "slide",
  animationTime: 300,
  navbar: false,
  navbarHeight: 48,
  navbarMenu: null,
  navbarClass: "",
  backButton: false,
  backButtonOnFirstView: false,
  handleBackButton: null,
  handleBackBehaviourOnFirstView: null,
  active: false,
  sidepanel: null,
  views: [],
  mayers: [],
  title: "",
  className: "",
  sidepanelVisibilityCallback: null,
  children: null
};
exports.sceneDefaultProps = sceneDefaultProps;

var AirrScene =
/*#__PURE__*/
function (_PureComponent) {
  _inherits(AirrScene, _PureComponent);

  function AirrScene() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, AirrScene);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(AirrScene)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "mayersCompsRefs", {});

    _defineProperty(_assertThisInitialized(_this), "handleBackButton", function (e) {
      var backBtn = e.currentTarget;
      backBtn.classList.add("clicked");
      setTimeout(function () {
        backBtn.classList.remove("clicked");
      }, 300);

      if (_this.getViewIndex(_this.props.activeViewName) === 0 && _this.props.handleBackBehaviourOnFirstView) {
        return _this.props.handleBackBehaviourOnFirstView();
      }

      if (_this.props.handleBackButton) {
        _this.props.handleBackButton(e);
      } else {
        console.warn("[Airr] Back button handler was not specified.");
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleMenuButtonToggleSidepanel", function (e) {
      if (_this.props.refCOMPSidepanel && _this.props.refCOMPSidepanel.current) {
        _this.props.refCOMPSidepanel.current.isShown() ? _this.props.refCOMPSidepanel.current.hide() : _this.props.refCOMPSidepanel.current.show();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "checkValidActiveView", function () {
      var isAnyViewActive = _this.props.views.some(function (view) {
        return view.props.name === _this.props.activeViewName;
      });

      if (!isAnyViewActive) {
        console.warn("[Airr] No view was set as active" + (_this.props.name && " in Scene named `" + _this.props.name + "`") + ".");
      }

      return Boolean(isAnyViewActive);
    });

    return _this;
  }

  _createClass(AirrScene, [{
    key: "getViewIndex",

    /**
     * Returns view index from this.props.views array
     *
     * @param {string} viewName
     * @returns {Number}
     */
    value: function getViewIndex(viewName) {
      return this.props.views.findIndex(function (config) {
        return config.props.name === viewName;
      });
    }
    /**
     * Handles navbar backbutton tap events
     *
     * @param {object} e Event object
     * @returns {void}
     */

  }, {
    key: "render",
    value: function render() {
      var className = "airr-view airr-scene";
      this.props.active && (className += " active");
      this.props.className && (className += " " + this.props.className);
      this.checkValidActiveView();
      var activeViewIndex = this.getViewIndex(this.props.activeViewName);
      var mockViewTitle;

      if (this.props.mockTitleName) {
        var mockViewIndex = this.getViewIndex(this.props.mockTitleName);

        if (mockViewIndex >= 0) {
          var mockView = this.props.views[mockViewIndex];

          if (mockView.props.title) {
            mockViewTitle = mockView.props.title;
          }
        }
      }

      return React.createElement("div", {
        className: className,
        ref: this.props.refDOM
      }, React.createElement("div", {
        className: "content-wrap"
      }, React.createElement(NavbarRenderer, {
        navbar: this.props.navbar,
        activeViewIndex: activeViewIndex,
        backButtonOnFirstView: this.props.backButtonOnFirstView,
        backButton: this.props.backButton,
        handleBackButton: this.handleBackButton,
        navbarMenu: this.props.navbarMenu,
        hasSidepanel: Boolean(this.props.sidepanel),
        handleMenuButtonToggleSidepanel: this.handleMenuButtonToggleSidepanel,
        navbarClass: this.props.navbarClass,
        mockViewTitle: mockViewTitle,
        activeViewTitle: this.props.views[activeViewIndex] && this.props.views[activeViewIndex].props.title,
        refDOMNavbar: this.props.refDOMNavbar,
        navbarHeight: this.props.navbarHeight
      }), React.createElement(ViewsRenderer, {
        className: this.props.animation ? this.props.animation + "-animation" : "",
        refsCOMPViews: this.props.refsCOMPViews,
        activeViewName: this.props.activeViewName,
        views: this.props.views,
        refDOMContainer: this.props.refDOMContainer,
        containersHeight: this.props.containersHeight
      })), React.createElement(ChildrenRenderer, this.props, this.props.children), this.props.sidepanel && React.createElement(SidepanelRenderer, {
        type: this.props.sidepanel.type,
        refCOMPSidepanel: this.props.refCOMPSidepanel,
        visibilityCallback: this.props.sidepanelVisibilityCallback,
        props: this.props.sidepanel.props
      }), React.createElement(MayersRenderer, {
        mayers: this.props.mayers
      }), React.createElement(BlankmaskRenderer, {
        GUIDisabled: this.props.GUIDisabled,
        GUIDisableCover: this.props.GUIDisableCover
      }));
    }
  }]);

  return AirrScene;
}(React.PureComponent);

exports.default = AirrScene;

_defineProperty(AirrScene, "defaultProps", _objectSpread({}, sceneDefaultProps, {
  refCOMPSidepanel: null,
  refDOM: null,
  refDOMNavbar: null,
  refsCOMPViews: null,
  refDOMContainer: null,
  mockTitleName: "",
  containersHeight: null
}));

var ChildrenRenderer = React.memo(function ChildrenRenderer(_ref) {
  var children = _ref.children,
      rest = _objectWithoutProperties(_ref, ["children"]);

  return typeof children === "function" ? children(rest) : children;
});
var MayersRenderer = React.memo(function MayersRenderer(_ref2) {
  var mayers = _ref2.mayers;
  return mayers.map(function (_ref3) {
    var name = _ref3.name,
        props = _objectWithoutProperties(_ref3, ["name"]);

    return React.createElement(_AirrMayer.default, _extends({
      key: name,
      name: name
    }, props));
  });
});
var SidepanelRenderer = React.memo(function SidepanelRenderer(_ref4) {
  var type = _ref4.type,
      refCOMPSidepanel = _ref4.refCOMPSidepanel,
      visibilityCallback = _ref4.visibilityCallback,
      props = _ref4.props;

  if (!props.ref) {
    props.ref = refCOMPSidepanel;
  }

  if (!props.visibilityCallback) {
    props.visibilityCallback = visibilityCallback;
  }

  if (typeof props.enabled === "undefined") {
    props.enabled = true; //force explicit value, e.g needed when checking if panel is enabled in `openMayer` method
  }

  return React.createElement(type, props);
});
var BlankmaskRenderer = React.memo(function BlankmaskRenderer(_ref5) {
  var GUIDisabled = _ref5.GUIDisabled,
      GUIDisableCover = _ref5.GUIDisableCover;
  return GUIDisabled && React.createElement("div", {
    className: "airr-blank-mask"
  }, GUIDisableCover);
});
var NavbarRenderer = React.memo(function NavbarRenderer(_ref6) {
  var navbar = _ref6.navbar,
      activeViewIndex = _ref6.activeViewIndex,
      backButtonOnFirstView = _ref6.backButtonOnFirstView,
      handleBackButton = _ref6.handleBackButton,
      backButton = _ref6.backButton,
      navbarMenu = _ref6.navbarMenu,
      hasSidepanel = _ref6.hasSidepanel,
      handleMenuButtonToggleSidepanel = _ref6.handleMenuButtonToggleSidepanel,
      mockViewTitle = _ref6.mockViewTitle,
      activeViewTitle = _ref6.activeViewTitle,
      navbarClass = _ref6.navbarClass,
      refDOMNavbar = _ref6.refDOMNavbar,
      navbarHeight = _ref6.navbarHeight;

  if (navbar) {
    var mockTitle = null;
    var title;
    var back = null;

    if (backButton) {
      var backClassName = "back " + (activeViewIndex < 1 && !backButtonOnFirstView ? "hidden" : "");
      back = React.createElement("div", {
        className: backClassName,
        onClick: handleBackButton
      }, React.createElement("div", null));
    }

    var menu;

    if (navbarMenu) {
      if (navbarMenu === "toggleSidepanel") {
        menu = hasSidepanel ? React.createElement("div", {
          className: "menu",
          onClick: handleMenuButtonToggleSidepanel
        }, React.createElement("div", null)) : null;
      } else if (Array.isArray(navbarMenu)) {
        menu = React.createElement("div", {
          className: "menu"
        }, navbarMenu);
      }
    }

    var navbarStyle = {};

    if ([1, true].indexOf(navbar) === -1) {
      navbarStyle.visibility = "hidden";
    }

    if (mockViewTitle) {
      mockTitle = React.createElement("div", {
        className: "mock-title"
      }, React.createElement("span", null, activeViewTitle));
      title = mockViewTitle;
    } else {
      title = activeViewTitle;
    }

    return React.createElement("div", {
      className: "airr-navbar " + (typeof navbarClass === "string" ? navbarClass : ""),
      ref: refDOMNavbar,
      style: navbarStyle
    }, React.createElement("div", {
      style: {
        height: navbarHeight + "px"
      }
    }, mockTitle, back, React.createElement("div", {
      className: "title",
      style: {
        opacity: mockViewTitle ? 0 : 1
      }
    }, React.createElement("span", null, title)), menu));
  }
});
var ViewsMapper = React.memo(function ViewsMapper(_ref7) {
  var views = _ref7.views,
      activeViewName = _ref7.activeViewName,
      refsCOMPViews = _ref7.refsCOMPViews;
  return views.map(function (item) {
    if (item.props.name === activeViewName) {
      item.props.active = true;
    } else {
      item.props.active = false;
    }

    item.props.key = item.props.name;

    if (!item.props.ref) {
      item.props.ref = React.createRef();
      refsCOMPViews[item.props.name] = item.props.ref;
    }

    return React.createElement(item.type, item.props);
  });
});
var ViewsRenderer = React.memo(function ViewsRenderer(_ref8) {
  var views = _ref8.views,
      _ref8$className = _ref8.className,
      className = _ref8$className === void 0 ? "" : _ref8$className,
      refDOMContainer = _ref8.refDOMContainer,
      activeViewName = _ref8.activeViewName,
      containersHeight = _ref8.containersHeight,
      refsCOMPViews = _ref8.refsCOMPViews;
  return React.createElement("div", {
    className: "airr-container " + className,
    ref: refDOMContainer,
    style: containersHeight ? {
      height: containersHeight
    } : null
  }, React.createElement(ViewsMapper, {
    views: views,
    activeViewName: activeViewName,
    refsCOMPViews: refsCOMPViews
  }));
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyU2NlbmUudHN4Il0sIm5hbWVzIjpbInNjZW5lRGVmYXVsdFByb3BzIiwibmFtZSIsImFjdGl2ZVZpZXdOYW1lIiwiR1VJRGlzYWJsZWQiLCJHVUlEaXNhYmxlQ292ZXIiLCJhbmltYXRpb24iLCJhbmltYXRpb25UaW1lIiwibmF2YmFyIiwibmF2YmFySGVpZ2h0IiwibmF2YmFyTWVudSIsIm5hdmJhckNsYXNzIiwiYmFja0J1dHRvbiIsImJhY2tCdXR0b25PbkZpcnN0VmlldyIsImhhbmRsZUJhY2tCdXR0b24iLCJoYW5kbGVCYWNrQmVoYXZpb3VyT25GaXJzdFZpZXciLCJhY3RpdmUiLCJzaWRlcGFuZWwiLCJ2aWV3cyIsIm1heWVycyIsInRpdGxlIiwiY2xhc3NOYW1lIiwic2lkZXBhbmVsVmlzaWJpbGl0eUNhbGxiYWNrIiwiY2hpbGRyZW4iLCJBaXJyU2NlbmUiLCJlIiwiYmFja0J0biIsImN1cnJlbnRUYXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiZ2V0Vmlld0luZGV4IiwicHJvcHMiLCJjb25zb2xlIiwid2FybiIsInJlZkNPTVBTaWRlcGFuZWwiLCJjdXJyZW50IiwiaXNTaG93biIsImhpZGUiLCJzaG93IiwiaXNBbnlWaWV3QWN0aXZlIiwic29tZSIsInZpZXciLCJCb29sZWFuIiwidmlld05hbWUiLCJmaW5kSW5kZXgiLCJjb25maWciLCJjaGVja1ZhbGlkQWN0aXZlVmlldyIsImFjdGl2ZVZpZXdJbmRleCIsIm1vY2tWaWV3VGl0bGUiLCJtb2NrVGl0bGVOYW1lIiwibW9ja1ZpZXdJbmRleCIsIm1vY2tWaWV3IiwicmVmRE9NIiwiaGFuZGxlTWVudUJ1dHRvblRvZ2dsZVNpZGVwYW5lbCIsInJlZkRPTU5hdmJhciIsInJlZnNDT01QVmlld3MiLCJyZWZET01Db250YWluZXIiLCJjb250YWluZXJzSGVpZ2h0IiwidHlwZSIsIlB1cmVDb21wb25lbnQiLCJDaGlsZHJlblJlbmRlcmVyIiwiUmVhY3QiLCJtZW1vIiwicmVzdCIsIk1heWVyc1JlbmRlcmVyIiwibWFwIiwiU2lkZXBhbmVsUmVuZGVyZXIiLCJ2aXNpYmlsaXR5Q2FsbGJhY2siLCJyZWYiLCJlbmFibGVkIiwiY3JlYXRlRWxlbWVudCIsIkJsYW5rbWFza1JlbmRlcmVyIiwiTmF2YmFyUmVuZGVyZXIiLCJoYXNTaWRlcGFuZWwiLCJhY3RpdmVWaWV3VGl0bGUiLCJtb2NrVGl0bGUiLCJiYWNrIiwiYmFja0NsYXNzTmFtZSIsIm1lbnUiLCJBcnJheSIsImlzQXJyYXkiLCJuYXZiYXJTdHlsZSIsImluZGV4T2YiLCJ2aXNpYmlsaXR5IiwiaGVpZ2h0Iiwib3BhY2l0eSIsIlZpZXdzTWFwcGVyIiwiaXRlbSIsImtleSIsImNyZWF0ZVJlZiIsIlZpZXdzUmVuZGVyZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFXQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdJTyxJQUFNQSxpQkFBaUMsR0FBRztBQUM3Q0MsRUFBQUEsSUFBSSxFQUFFLEVBRHVDO0FBRzdDQyxFQUFBQSxjQUFjLEVBQUUsSUFINkI7QUFJN0NDLEVBQUFBLFdBQVcsRUFBRSxLQUpnQztBQUs3Q0MsRUFBQUEsZUFBZSxFQUFFLElBTDRCO0FBTTdDQyxFQUFBQSxTQUFTLEVBQUUsT0FOa0M7QUFPN0NDLEVBQUFBLGFBQWEsRUFBRSxHQVA4QjtBQVE3Q0MsRUFBQUEsTUFBTSxFQUFFLEtBUnFDO0FBUzdDQyxFQUFBQSxZQUFZLEVBQUUsRUFUK0I7QUFVN0NDLEVBQUFBLFVBQVUsRUFBRSxJQVZpQztBQVc3Q0MsRUFBQUEsV0FBVyxFQUFFLEVBWGdDO0FBWTdDQyxFQUFBQSxVQUFVLEVBQUUsS0FaaUM7QUFhN0NDLEVBQUFBLHFCQUFxQixFQUFFLEtBYnNCO0FBYzdDQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQWQyQjtBQWU3Q0MsRUFBQUEsOEJBQThCLEVBQUUsSUFmYTtBQWdCN0NDLEVBQUFBLE1BQU0sRUFBRSxLQWhCcUM7QUFpQjdDQyxF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MkQsYUFBYSxHQUFHN0IsS0FBSyxDQUFDQyxJQUFOLENBQStCLFNBQVM0QixhQUFULFFBT1g7QUFBQSxNQU50QzFFLEtBTXNDLFNBTnRDQSxLQU1zQztBQUFBLDhCQUx0Q0csU0FLc0M7QUFBQSxNQUx0Q0EsU0FLc0MsZ0NBTDFCLEVBSzBCO0FBQUEsTUFKdENxQyxlQUlzQyxTQUp0Q0EsZUFJc0M7QUFBQSxNQUh0Q3ZELGNBR3NDLFNBSHRDQSxjQUdzQztBQUFBLE1BRnRDd0QsZ0JBRXNDLFNBRnRDQSxnQkFFc0M7QUFBQSxNQUR0Q0YsYUFDc0MsU0FEdENBLGFBQ3NDO0FBQ3RDLFNBQ0k7QUFDSSxJQUFBLFNBQVMsRUFBRSxvQkFBb0JwQyxTQURuQztBQUVJLElBQUEsR0FBRyxFQUFFcUMsZUFGVDtBQUdJLElBQUEsS0FBSyxFQUFFQyxnQkFBZ0IsR0FBRztBQUFFMkIsTUFBQUEsTUFBTSxFQUFFM0I7QUFBVixLQUFILEdBQWtDO0FBSDdELEtBS0ksb0JBQUMsV0FBRDtBQUNJLElBQUEsS0FBSyxFQUFFekMsS0FEWDtBQUVJLElBQUEsY0FBYyxFQUFFZixjQUZwQjtBQUdJLElBQUEsYUFBYSxFQUFFc0Q7QUFIbkIsSUFMSixDQURKO0FBYUgsQ0FyQnFCLENBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICAgIFB1cmVDb21wb25lbnQsXG4gICAgU3ludGhldGljRXZlbnQsXG4gICAgUmVhY3ROb2RlLFxuICAgIFJlYWN0RWxlbWVudCxcbiAgICBSZWZPYmplY3QsXG4gICAgQ1NTUHJvcGVydGllcyxcbiAgICBDb21wb25lbnRDbGFzc1xufSBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCBBaXJyVmlldyBmcm9tIFwiLi9BaXJyVmlld1wiO1xuaW1wb3J0IEFpcnJNYXllciwgeyBQcm9wcyBhcyBNYXllclByb3BzIH0gZnJvbSBcIi4vQWlyck1heWVyXCI7XG5pbXBvcnQgQWlyclNpZGVwYW5lbCwgeyBQcm9wcyBhcyBTaWRlcGFuZWxQcm9wcyB9IGZyb20gXCIuL0FpcnJTaWRlcGFuZWxcIjtcbmltcG9ydCB7IEFuaW1hdGlvblR5cGUsIFZpZXdDb25maWcsIE5hdmJhck1lbnUgfSBmcm9tIFwiLi9haXJyLXJlYWN0XCI7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29yZVNjZW5lUHJvcHMge1xuICAgIC8qKlxuICAgICAqIFRoZSBuYW1lIG9mIHRoZSBzY2VuZS4gTXVzdCBiZSB1bmlxdWUgYW1vbmcgb3RoZXJzIHZpZXdzIGluIHBhcmVudCBzY2VuZS4gV2lsbCBiZSB1c2VkIGFzIGlkZW50aWZpY2F0aW9uIHN0cmluZ1xuICAgICAqL1xuICAgIG5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBOYW1lIG9mIHRoZSBhY3RpdmUgdmlldy5cbiAgICAgKi9cbiAgICBhY3RpdmVWaWV3TmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEJvb2xlYW4gdGVsbGluZyBpZiBHVUkgc2hvdWxkIGJlIGRpc2FibGVkIG1lYW5pbmcgbm8gdXNlciBhY3Rpb25zLCBldmVudHMgYXJlIGFsbG93ZWQuXG4gICAgICogR1VJIGlzIGRpc2FibGVkIHZpYSBhYnNvbHV0ZSBwb3NpdGlvbmVkLCBub3QgdmlzaWJsZSBkaXYgdGhhdCBoYXMgdGhlIGJpZ2dlc3Qgei1JbmRleFxuICAgICAqL1xuICAgIEdVSURpc2FibGVkOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFJlYWN0IGVsZW1lbnQgdG8gYmUgcGxhY2VkIGluIEdVSSBkaXNhYmxpbmcgZGl2XG4gICAgICovXG4gICAgR1VJRGlzYWJsZUNvdmVyPzogUmVhY3ROb2RlO1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgYW5pbWF0aW9uIHRvIHBlcmZvcm0gd2hlbiBzd2l0Y2hpbmcgdmlld3NcbiAgICAgKi9cbiAgICBhbmltYXRpb246IEFuaW1hdGlvblR5cGU7XG4gICAgLyoqXG4gICAgICogVGltZSBvZiB2aWV3cyBjaGFuZ2luZyBhbmltYXRpb24gaW4gbWlsaXNlY29uZHNcbiAgICAgKi9cbiAgICBhbmltYXRpb25UaW1lOiBudW1iZXI7XG4gICAgLyoqXG4gICAgICogU3BlY2lmeSBpZiBuYXZiYXIgaXMgcHJlc2VudCAoMSx0cnVlKSBvciBub3QgKDAsZmFsc2UpLiBPciBtYXliZSBoaWRkZW4gKC0xKVxuICAgICAqL1xuICAgIG5hdmJhcjogMSB8IHRydWUgfCAtMSB8IDAgfCBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBIZWlnaHQgb2YgdGhlIG5hdmJhciBpbiBwaXhlbHNcbiAgICAgKi9cbiAgICBuYXZiYXJIZWlnaHQ6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBOYXZiYXIgbWVudSBpcyBwbGFjZWQgb24gdGhlIHJpZ2h0IG1vc3Qgc2lkZS4gTWlnaHQgY29udGFpbiBcInRvZ2dsZVNpZGVwYW5lbFwiIGJ1dHRvbiBvciBhbnkgY3VzdG9tIGJ1dHRvbnMgbGlzdC5cbiAgICAgKi9cbiAgICBuYXZiYXJNZW51PzogTmF2YmFyTWVudTtcbiAgICAvKipcbiAgICAgKiBFeHRyYSwgc3BhY2Ugc2VwYXJhdGVkLCBuYXZiYXIncyBjbGFzcyBuYW1lcyBsaXN0XG4gICAgICovXG4gICAgbmF2YmFyQ2xhc3M6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBCb29sZWFuIHNwZWNpZmluZyBpZiBuYXZiYXIgcmVuZGVycyBCYWNrQnV0dG9uLiBQbGFjZWQgYnkgZGVmYXVsdCBvbiB0aGUgbGVmdCBzaWRlIG9mIG5hdmJhci5cbiAgICAgKi9cbiAgICBiYWNrQnV0dG9uOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIERvIHlvdSBuZWVkIHRvIHN0aWxsIHNob3cgYmFja0J1dHRvbiBldmVuIGlmIHNjZW5lIGlzIHJlbmRlcmluZyBmaXJzdCB2aWV3IGZyb20gc3RhY2s/XG4gICAgICovXG4gICAgYmFja0J1dHRvbk9uRmlyc3RWaWV3OiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBoYW5kbGUgYmFjayBidXR0b24gY2xpY2sgZXZlbnRzXG4gICAgICovXG4gICAgaGFuZGxlQmFja0J1dHRvbj8oZTogU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBGdW5jdGlvbiB0aGF0IHdpbGwgaGFuZGxlIGJhY2sgYnV0dG9uIGNsaWNrcyBldmVudHMgb24gd2hlbiBmaXJzdCB2aWV3IGluIHN0YWNrIGlzIGFjdGl2ZVxuICAgICAqL1xuICAgIGhhbmRsZUJhY2tCZWhhdmlvdXJPbkZpcnN0Vmlldz8oKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBJcyB0aGlzIHZpZXcgYWN0aXZlIGluIHBhcmVudCBzY2VuZVxuICAgICAqL1xuICAgIGFjdGl2ZTogYm9vbGVhbjtcbiAgICAvKipcbiAgICAgKiBTaWRlcGFuZWxzIGRlY2xhcmF0aW9uLiBNdXN0IGNvbnRhaW4gdHdvIHByb3BlcnRpZXM6IGB0eXBlYCBhbmQgYHByb3BzYFxuICAgICAqKi9cbiAgICBzaWRlcGFuZWw6IHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIHJlZmVyZW5jZSB0byBjbGFzcyBvciBmdW5jdGlvbiB0aGF0IHdpbGwgcmVuZGVyIEFpcnJTaWRlcGFuZWwuIE1pZ2h0IGJlIEFpcnJTaWRlcGFuZWwgaXRzZWxmLlxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZTogQ29tcG9uZW50Q2xhc3M8U2lkZXBhbmVsUHJvcHMsIGFueT47XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTcGVjaWFsIHByb3BlcnRpZXMgb2YgQWlyclNpZGVwYW5lbCBjbGFzcy4gR28gdG8gY2xhc3MgZGVjbGFyYXRpb24gZm9yIGZ1cnRoZXIgcHJvcGVydGllcyBkb2N1bWVuYXRpb24uXG4gICAgICAgICAqL1xuICAgICAgICBwcm9wczogU2lkZXBhbmVsUHJvcHM7XG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgYmUgY2FsbGVkIHdoZW4gc2lkZXBhbmVsIGNoYW5nZXMgaXQncyB2aXNpYmlsaXR5LlxuICAgICAqIEl0J3MgYXJndW1lbnQgd2lsbCBiZSBpc1Nob3duIGJvb2wuXG4gICAgICovXG4gICAgc2lkZXBhbmVsVmlzaWJpbGl0eUNhbGxiYWNrKGlzU2hvd246IGJvb2xlYW4pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGB2aWV3c2AuIEV2ZXJ5IHZpZXcgb2JqZWN0IGRlY2xhcmF0aW9uIG11c3QgY29udGFpbiB0d28gcHJvcGVydGllczogYHR5cGVgIGFuZCBgcHJvcHNgLlxuICAgICAqL1xuICAgIHZpZXdzOiBWaWV3Q29uZmlnW107XG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgYG1heWVyc2Agb2JqZWN0cyB0aGF0IHdpbGwgYmUgcmVuZGVyIGludG8gdGhpcyBTY2VuZS4gTXVzdCBjb250YWluIHNwZWNpYWwgQWlyck1heWVyIGNsYXNzIHByb3BlcnRpZXMuXG4gICAgICogVG8gY2hlY2sgdGhlIHBvc3NpYmxlIHZhbHVlcyBvZiBwcm9wZXJ0aWVzIGdvIHRvIEFpcnJNYXllciBkZWNsYXJhdGlvbi5cbiAgICAgKi9cbiAgICBtYXllcnM6IE1heWVyUHJvcHNbXTtcbiAgICAvKipcbiAgICAgKiBUaXRsZSB0aGF0IHdpbGwgYmUgdXNlIGluIHBhcmVudCBTY2VuZSBuYXZiYXIgdGl0bGUgc2VjdGlvblxuICAgICAqL1xuICAgIHRpdGxlOiBSZWFjdE5vZGU7XG4gICAgLyoqXG4gICAgICogRXh0cmEsIHNwYWNlIHNlcGFyYXRlZCBjbGFzc2VzIG5hbWVzIHRvIHVzZSB1cG9uIGZpcnN0IGRpdiBlbGVtZW50LlxuICAgICAqL1xuICAgIGNsYXNzTmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIENoaWxkcmVuIHByb3BcbiAgICAgKi9cbiAgICBjaGlsZHJlbjogUmVhY3ROb2RlO1xufVxuZXhwb3J0IGludGVyZmFjZSBQcm9wcyBleHRlbmRzIENvcmVTY2VuZVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBSZWFjdCBjb21wb25lbnQncyByZWYgb2JqZWN0XG4gICAgICovXG4gICAgcmVmQ09NUFNpZGVwYW5lbDogUmVmT2JqZWN0PEFpcnJTaWRlcGFuZWw+O1xuICAgIC8qKlxuICAgICAqIFJlYWN0IHJlZiB0byBkb20gb2JqZWN0XG4gICAgICovXG4gICAgcmVmRE9NOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQ+O1xuICAgIC8qKlxuICAgICAqIFJlYWN0IHJlZiB0byBkb20gb2JqZWN0XG4gICAgICovXG4gICAgcmVmRE9NTmF2YmFyOiBSZWZPYmplY3Q8SFRNTERpdkVsZW1lbnQ+O1xuICAgIC8qKlxuICAgICAqIE9iamVjdCBvZiBSZWFjdCByZWZzIGNvbXBvbmVudHMgc3BlY2lmaWVkIHVuZGVyIHN0cmluZyBrZXlzXG4gICAgICovXG4gICAgcmVmc0NPTVBWaWV3czogeyBbbmFtZTogc3RyaW5nXTogUmVmT2JqZWN0PFB1cmVDb21wb25lbnQ+IH07XG4gICAgLyoqXG4gICAgICogUmVhY3QgY29tcG9uZW50J3MgcmVmIG9iamVjdFxuICAgICAqL1xuICAgIHJlZkRPTUNvbnRhaW5lcjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcbiAgICAvKipcbiAgICAgKiBJbm5lciwgcHJpdmF0ZSBwcm9wIGZvciBtYW5pcHVsYXRpbmcgbmF2YmFyIHRpdGxlXG4gICAgICovXG4gICAgbW9ja1RpdGxlTmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIElubmVyLCBwcml2YXRlIHByb3Agd2l0aCBjb250YWluZXJzIGhlaWdodCBpbmZvcm1hdGlvblxuICAgICAqL1xuICAgIGNvbnRhaW5lcnNIZWlnaHQ6IG51bWJlcjtcbn1cbmV4cG9ydCBjb25zdCBzY2VuZURlZmF1bHRQcm9wczogQ29yZVNjZW5lUHJvcHMgPSB7XG4gICAgbmFtZTogXCJcIixcblxuICAgIGFjdGl2ZVZpZXdOYW1lOiBudWxsLFxuICAgIEdVSURpc2FibGVkOiBmYWxzZSxcbiAgICBHVUlEaXNhYmxlQ292ZXI6IG51bGwsXG4gICAgYW5pbWF0aW9uOiBcInNsaWRlXCIsXG4gICAgYW5pbWF0aW9uVGltZTogMzAwLFxuICAgIG5hdmJhcjogZmFsc2UsXG4gICAgbmF2YmFySGVpZ2h0OiA0OCxcbiAgICBuYXZiYXJNZW51OiBudWxsLFxuICAgIG5hdmJhckNsYXNzOiBcIlwiLFxuICAgIGJhY2tCdXR0b246IGZhbHNlLFxuICAgIGJhY2tCdXR0b25PbkZpcnN0VmlldzogZmFsc2UsXG4gICAgaGFuZGxlQmFja0J1dHRvbjogbnVsbCxcbiAgICBoYW5kbGVCYWNrQmVoYXZpb3VyT25GaXJzdFZpZXc6IG51bGwsXG4gICAgYWN0aXZlOiBmYWxzZSxcbiAgICBzaWRlcGFuZWw6IG51bGwsXG4gICAgdmlld3M6IFtdLFxuICAgIG1heWVyczogW10sXG4gICAgdGl0bGU6IFwiXCIsXG4gICAgY2xhc3NOYW1lOiBcIlwiLFxuICAgIHNpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjazogbnVsbCxcbiAgICBjaGlsZHJlbjogbnVsbFxufTtcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFpcnJTY2VuZSBleHRlbmRzIFB1cmVDb21wb25lbnQ8UHJvcHM+IHtcbiAgICBzdGF0aWMgZGVmYXVsdFByb3BzOiBQcm9wcyA9IHtcbiAgICAgICAgLi4uc2NlbmVEZWZhdWx0UHJvcHMsXG4gICAgICAgIHJlZkNPTVBTaWRlcGFuZWw6IG51bGwsXG4gICAgICAgIHJlZkRPTTogbnVsbCxcbiAgICAgICAgcmVmRE9NTmF2YmFyOiBudWxsLFxuICAgICAgICByZWZzQ09NUFZpZXdzOiBudWxsLFxuICAgICAgICByZWZET01Db250YWluZXI6IG51bGwsXG4gICAgICAgIG1vY2tUaXRsZU5hbWU6IFwiXCIsXG4gICAgICAgIGNvbnRhaW5lcnNIZWlnaHQ6IG51bGxcbiAgICB9O1xuICAgIC8qKlxuICAgICAqIE1heWVycyBDb21wb25lbnRzIHJlZmZlcmVuY2llc1xuICAgICAqL1xuICAgIG1heWVyc0NvbXBzUmVmcyA9IHt9O1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB2aWV3IGluZGV4IGZyb20gdGhpcy5wcm9wcy52aWV3cyBhcnJheVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZpZXdOYW1lXG4gICAgICogQHJldHVybnMge051bWJlcn1cbiAgICAgKi9cbiAgICBnZXRWaWV3SW5kZXgodmlld05hbWU6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnByb3BzLnZpZXdzLmZpbmRJbmRleCgoY29uZmlnKTogYm9vbGVhbiA9PiBjb25maWcucHJvcHMubmFtZSA9PT0gdmlld05hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgbmF2YmFyIGJhY2tidXR0b24gdGFwIGV2ZW50c1xuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGUgRXZlbnQgb2JqZWN0XG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgaGFuZGxlQmFja0J1dHRvbiA9IChlOiBTeW50aGV0aWNFdmVudDxIVE1MRWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgY29uc3QgYmFja0J0biA9IGUuY3VycmVudFRhcmdldDtcbiAgICAgICAgYmFja0J0bi5jbGFzc0xpc3QuYWRkKFwiY2xpY2tlZFwiKTtcblxuICAgICAgICBzZXRUaW1lb3V0KCgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgIGJhY2tCdG4uY2xhc3NMaXN0LnJlbW92ZShcImNsaWNrZWRcIik7XG4gICAgICAgIH0sIDMwMCk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpcy5nZXRWaWV3SW5kZXgodGhpcy5wcm9wcy5hY3RpdmVWaWV3TmFtZSkgPT09IDAgJiZcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlQmFja0JlaGF2aW91ck9uRmlyc3RWaWV3XG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaGFuZGxlQmFja0JlaGF2aW91ck9uRmlyc3RWaWV3KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5oYW5kbGVCYWNrQnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUJhY2tCdXR0b24oZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbQWlycl0gQmFjayBidXR0b24gaGFuZGxlciB3YXMgbm90IHNwZWNpZmllZC5cIik7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBuYXZiYXIgbWVudSBidXR0b24gdGFwIGV2ZW50c1xuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGUgRXZlbnQgb2JqZWN0XG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG4gICAgaGFuZGxlTWVudUJ1dHRvblRvZ2dsZVNpZGVwYW5lbCA9IChlOiBTeW50aGV0aWNFdmVudDxIVE1MRWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucmVmQ09NUFNpZGVwYW5lbCAmJiB0aGlzLnByb3BzLnJlZkNPTVBTaWRlcGFuZWwuY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQuaXNTaG93bigpXG4gICAgICAgICAgICAgICAgPyB0aGlzLnByb3BzLnJlZkNPTVBTaWRlcGFuZWwuY3VycmVudC5oaWRlKClcbiAgICAgICAgICAgICAgICA6IHRoaXMucHJvcHMucmVmQ09NUFNpZGVwYW5lbC5jdXJyZW50LnNob3coKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBjaGVja1ZhbGlkQWN0aXZlVmlldyA9ICgpOiBib29sZWFuID0+IHtcbiAgICAgICAgY29uc3QgaXNBbnlWaWV3QWN0aXZlID0gdGhpcy5wcm9wcy52aWV3cy5zb21lKFxuICAgICAgICAgICAgKHZpZXcpOiBib29sZWFuID0+IHZpZXcucHJvcHMubmFtZSA9PT0gdGhpcy5wcm9wcy5hY3RpdmVWaWV3TmFtZVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghaXNBbnlWaWV3QWN0aXZlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgXCJbQWlycl0gTm8gdmlldyB3YXMgc2V0IGFzIGFjdGl2ZVwiICtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucHJvcHMubmFtZSAmJiBcIiBpbiBTY2VuZSBuYW1lZCBgXCIgKyB0aGlzLnByb3BzLm5hbWUgKyBcImBcIikgK1xuICAgICAgICAgICAgICAgICAgICBcIi5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBCb29sZWFuKGlzQW55Vmlld0FjdGl2ZSk7XG4gICAgfTtcblxuICAgIHJlbmRlcigpOiBSZWFjdE5vZGUge1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJhaXJyLXZpZXcgYWlyci1zY2VuZVwiO1xuICAgICAgICB0aGlzLnByb3BzLmFjdGl2ZSAmJiAoY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiKTtcbiAgICAgICAgdGhpcy5wcm9wcy5jbGFzc05hbWUgJiYgKGNsYXNzTmFtZSArPSBcIiBcIiArIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcblxuICAgICAgICB0aGlzLmNoZWNrVmFsaWRBY3RpdmVWaWV3KCk7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlVmlld0luZGV4ID0gdGhpcy5nZXRWaWV3SW5kZXgodGhpcy5wcm9wcy5hY3RpdmVWaWV3TmFtZSk7XG4gICAgICAgIGxldCBtb2NrVmlld1RpdGxlO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5tb2NrVGl0bGVOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBtb2NrVmlld0luZGV4ID0gdGhpcy5nZXRWaWV3SW5kZXgodGhpcy5wcm9wcy5tb2NrVGl0bGVOYW1lKTtcbiAgICAgICAgICAgIGlmIChtb2NrVmlld0luZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2NrVmlldyA9IHRoaXMucHJvcHMudmlld3NbbW9ja1ZpZXdJbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKG1vY2tWaWV3LnByb3BzLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vY2tWaWV3VGl0bGUgPSBtb2NrVmlldy5wcm9wcy50aXRsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHJlZj17dGhpcy5wcm9wcy5yZWZET019PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXJSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2YmFyPXt0aGlzLnByb3BzLm5hdmJhcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVZpZXdJbmRleD17YWN0aXZlVmlld0luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja0J1dHRvbk9uRmlyc3RWaWV3PXt0aGlzLnByb3BzLmJhY2tCdXR0b25PbkZpcnN0Vmlld31cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tCdXR0b249e3RoaXMucHJvcHMuYmFja0J1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUJhY2tCdXR0b249e3RoaXMuaGFuZGxlQmFja0J1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmJhck1lbnU9e3RoaXMucHJvcHMubmF2YmFyTWVudX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1NpZGVwYW5lbD17Qm9vbGVhbih0aGlzLnByb3BzLnNpZGVwYW5lbCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZW51QnV0dG9uVG9nZ2xlU2lkZXBhbmVsPXt0aGlzLmhhbmRsZU1lbnVCdXR0b25Ub2dnbGVTaWRlcGFuZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZiYXJDbGFzcz17dGhpcy5wcm9wcy5uYXZiYXJDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tWaWV3VGl0bGU9e21vY2tWaWV3VGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVWaWV3VGl0bGU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudmlld3NbYWN0aXZlVmlld0luZGV4XSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudmlld3NbYWN0aXZlVmlld0luZGV4XS5wcm9wcy50aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmRE9NTmF2YmFyPXt0aGlzLnByb3BzLnJlZkRPTU5hdmJhcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmJhckhlaWdodD17dGhpcy5wcm9wcy5uYXZiYXJIZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxWaWV3c1JlbmRlcmVyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuYW5pbWF0aW9uID8gdGhpcy5wcm9wcy5hbmltYXRpb24gKyBcIi1hbmltYXRpb25cIiA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZzQ09NUFZpZXdzPXt0aGlzLnByb3BzLnJlZnNDT01QVmlld3N9XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVWaWV3TmFtZT17dGhpcy5wcm9wcy5hY3RpdmVWaWV3TmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdzPXt0aGlzLnByb3BzLnZpZXdzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmRE9NQ29udGFpbmVyPXt0aGlzLnByb3BzLnJlZkRPTUNvbnRhaW5lcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcnNIZWlnaHQ9e3RoaXMucHJvcHMuY29udGFpbmVyc0hlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Q2hpbGRyZW5SZW5kZXJlciB7Li4udGhpcy5wcm9wc30+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9DaGlsZHJlblJlbmRlcmVyPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNpZGVwYW5lbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxTaWRlcGFuZWxSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy5zaWRlcGFuZWwudHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZkNPTVBTaWRlcGFuZWw9e3RoaXMucHJvcHMucmVmQ09NUFNpZGVwYW5lbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHlDYWxsYmFjaz17dGhpcy5wcm9wcy5zaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcz17dGhpcy5wcm9wcy5zaWRlcGFuZWwucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8TWF5ZXJzUmVuZGVyZXIgbWF5ZXJzPXt0aGlzLnByb3BzLm1heWVyc30gLz5cbiAgICAgICAgICAgICAgICA8QmxhbmttYXNrUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgR1VJRGlzYWJsZWQ9e3RoaXMucHJvcHMuR1VJRGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIEdVSURpc2FibGVDb3Zlcj17dGhpcy5wcm9wcy5HVUlEaXNhYmxlQ292ZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbmludGVyZmFjZSBDaGlsZHJlblJlbmRlcmVyUHJvcHMge1xuICAgIGNoaWxkcmVuOiBQcm9wc1tcImNoaWxkcmVuXCJdO1xufVxuY29uc3QgQ2hpbGRyZW5SZW5kZXJlciA9IFJlYWN0Lm1lbW88Q2hpbGRyZW5SZW5kZXJlclByb3BzPihmdW5jdGlvbiBDaGlsZHJlblJlbmRlcmVyKHtcbiAgICBjaGlsZHJlbixcbiAgICAuLi5yZXN0XG59OiBDaGlsZHJlblJlbmRlcmVyUHJvcHMpOiBhbnkge1xuICAgIHJldHVybiB0eXBlb2YgY2hpbGRyZW4gPT09IFwiZnVuY3Rpb25cIiA/IGNoaWxkcmVuKHJlc3QpIDogY2hpbGRyZW47XG59KTtcbmludGVyZmFjZSBNYXllcnNSZW5kZXJlclByb3BzIHtcbiAgICBtYXllcnM6IFByb3BzW1wibWF5ZXJzXCJdO1xufVxuY29uc3QgTWF5ZXJzUmVuZGVyZXIgPSBSZWFjdC5tZW1vPE1heWVyc1JlbmRlcmVyUHJvcHM+KGZ1bmN0aW9uIE1heWVyc1JlbmRlcmVyKHtcbiAgICBtYXllcnNcbn06IE1heWVyc1JlbmRlcmVyUHJvcHMpOiBhbnkge1xuICAgIHJldHVybiBtYXllcnMubWFwKFxuICAgICAgICAoeyBuYW1lLCAuLi5wcm9wcyB9KTogUmVhY3ROb2RlID0+IHtcbiAgICAgICAgICAgIHJldHVybiA8QWlyck1heWVyIGtleT17bmFtZX0gbmFtZT17bmFtZX0gey4uLnByb3BzfSAvPjtcbiAgICAgICAgfVxuICAgICk7XG59KTtcbmludGVyZmFjZSBTaWRlcGFuZWxSZW5kZXJlclByb3BzIHtcbiAgICB0eXBlOiBDb21wb25lbnRDbGFzczxTaWRlcGFuZWxQcm9wcywgYW55PjtcbiAgICBwcm9wczogU2lkZXBhbmVsUHJvcHM7XG4gICAgcmVmQ09NUFNpZGVwYW5lbDogUHJvcHNbXCJyZWZDT01QU2lkZXBhbmVsXCJdO1xuICAgIHZpc2liaWxpdHlDYWxsYmFjazogUHJvcHNbXCJzaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2tcIl07XG59XG5jb25zdCBTaWRlcGFuZWxSZW5kZXJlciA9IFJlYWN0Lm1lbW88U2lkZXBhbmVsUmVuZGVyZXJQcm9wcz4oZnVuY3Rpb24gU2lkZXBhbmVsUmVuZGVyZXIoe1xuICAgIHR5cGUsXG4gICAgcmVmQ09NUFNpZGVwYW5lbCxcbiAgICB2aXNpYmlsaXR5Q2FsbGJhY2ssXG4gICAgcHJvcHNcbn06IFNpZGVwYW5lbFJlbmRlcmVyUHJvcHMpOiBhbnkge1xuICAgIGlmICghcHJvcHMucmVmKSB7XG4gICAgICAgIHByb3BzLnJlZiA9IHJlZkNPTVBTaWRlcGFuZWw7XG4gICAgfVxuICAgIGlmICghcHJvcHMudmlzaWJpbGl0eUNhbGxiYWNrKSB7XG4gICAgICAgIHByb3BzLnZpc2liaWxpdHlDYWxsYmFjayA9IHZpc2liaWxpdHlDYWxsYmFjaztcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBwcm9wcy5lbmFibGVkID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIHByb3BzLmVuYWJsZWQgPSB0cnVlOyAvL2ZvcmNlIGV4cGxpY2l0IHZhbHVlLCBlLmcgbmVlZGVkIHdoZW4gY2hlY2tpbmcgaWYgcGFuZWwgaXMgZW5hYmxlZCBpbiBgb3Blbk1heWVyYCBtZXRob2RcbiAgICB9XG5cbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudCh0eXBlLCBwcm9wcyk7XG59KTtcbmludGVyZmFjZSBCbGFua21hc2tSZW5kZXJlclByb3BzIHtcbiAgICBHVUlEaXNhYmxlZDogUHJvcHNbXCJHVUlEaXNhYmxlZFwiXTtcbiAgICBHVUlEaXNhYmxlQ292ZXI6IFByb3BzW1wiR1VJRGlzYWJsZUNvdmVyXCJdO1xufVxuY29uc3QgQmxhbmttYXNrUmVuZGVyZXIgPSBSZWFjdC5tZW1vPEJsYW5rbWFza1JlbmRlcmVyUHJvcHM+KGZ1bmN0aW9uIEJsYW5rbWFza1JlbmRlcmVyKHtcbiAgICBHVUlEaXNhYmxlZCxcbiAgICBHVUlEaXNhYmxlQ292ZXJcbn06IEJsYW5rbWFza1JlbmRlcmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgcmV0dXJuIEdVSURpc2FibGVkICYmIDxkaXYgY2xhc3NOYW1lPVwiYWlyci1ibGFuay1tYXNrXCI+e0dVSURpc2FibGVDb3Zlcn08L2Rpdj47XG59KTtcbmludGVyZmFjZSBOYXZiYXJSZW5kZXJlclByb3BzIHtcbiAgICBuYXZiYXI6IFByb3BzW1wibmF2YmFyXCJdO1xuICAgIGFjdGl2ZVZpZXdJbmRleDogbnVtYmVyO1xuICAgIGJhY2tCdXR0b25PbkZpcnN0VmlldzogUHJvcHNbXCJiYWNrQnV0dG9uT25GaXJzdFZpZXdcIl07XG4gICAgaGFuZGxlQmFja0J1dHRvbjogUHJvcHNbXCJoYW5kbGVCYWNrQnV0dG9uXCJdO1xuICAgIGJhY2tCdXR0b246IFByb3BzW1wiYmFja0J1dHRvblwiXTtcbiAgICBuYXZiYXJNZW51OiBQcm9wc1tcIm5hdmJhck1lbnVcIl07XG4gICAgaGFzU2lkZXBhbmVsOiBib29sZWFuO1xuICAgIGhhbmRsZU1lbnVCdXR0b25Ub2dnbGVTaWRlcGFuZWwoZTogU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KTogdm9pZDtcbiAgICBtb2NrVmlld1RpdGxlOiBSZWFjdE5vZGU7XG4gICAgYWN0aXZlVmlld1RpdGxlOiBSZWFjdE5vZGU7XG4gICAgbmF2YmFyQ2xhc3M6IHN0cmluZztcbiAgICByZWZET01OYXZiYXI6IFByb3BzW1wicmVmRE9NTmF2YmFyXCJdO1xuICAgIG5hdmJhckhlaWdodDogUHJvcHNbXCJuYXZiYXJIZWlnaHRcIl07XG59XG5jb25zdCBOYXZiYXJSZW5kZXJlciA9IFJlYWN0Lm1lbW88TmF2YmFyUmVuZGVyZXJQcm9wcz4oZnVuY3Rpb24gTmF2YmFyUmVuZGVyZXIoe1xuICAgIG5hdmJhcixcbiAgICBhY3RpdmVWaWV3SW5kZXgsXG4gICAgYmFja0J1dHRvbk9uRmlyc3RWaWV3LFxuICAgIGhhbmRsZUJhY2tCdXR0b24sXG4gICAgYmFja0J1dHRvbixcbiAgICBuYXZiYXJNZW51LFxuICAgIGhhc1NpZGVwYW5lbCxcbiAgICBoYW5kbGVNZW51QnV0dG9uVG9nZ2xlU2lkZXBhbmVsLFxuICAgIG1vY2tWaWV3VGl0bGUsXG4gICAgYWN0aXZlVmlld1RpdGxlLFxuICAgIG5hdmJhckNsYXNzLFxuICAgIHJlZkRPTU5hdmJhcixcbiAgICBuYXZiYXJIZWlnaHRcbn06IE5hdmJhclJlbmRlcmVyUHJvcHMpOiBhbnkge1xuICAgIGlmIChuYXZiYXIpIHtcbiAgICAgICAgbGV0IG1vY2tUaXRsZSA9IG51bGw7XG4gICAgICAgIGxldCB0aXRsZTogUmVhY3ROb2RlO1xuICAgICAgICBsZXQgYmFjayA9IG51bGw7XG5cbiAgICAgICAgaWYgKGJhY2tCdXR0b24pIHtcbiAgICAgICAgICAgIGNvbnN0IGJhY2tDbGFzc05hbWUgPVxuICAgICAgICAgICAgICAgIFwiYmFjayBcIiArIChhY3RpdmVWaWV3SW5kZXggPCAxICYmICFiYWNrQnV0dG9uT25GaXJzdFZpZXcgPyBcImhpZGRlblwiIDogXCJcIik7XG4gICAgICAgICAgICBiYWNrID0gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtiYWNrQ2xhc3NOYW1lfSBvbkNsaWNrPXtoYW5kbGVCYWNrQnV0dG9ufT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBtZW51O1xuICAgICAgICBpZiAobmF2YmFyTWVudSkge1xuICAgICAgICAgICAgaWYgKG5hdmJhck1lbnUgPT09IFwidG9nZ2xlU2lkZXBhbmVsXCIpIHtcbiAgICAgICAgICAgICAgICBtZW51ID0gaGFzU2lkZXBhbmVsID8gKFxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1lbnVcIiBvbkNsaWNrPXtoYW5kbGVNZW51QnV0dG9uVG9nZ2xlU2lkZXBhbmVsfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgKSA6IG51bGw7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkobmF2YmFyTWVudSkpIHtcbiAgICAgICAgICAgICAgICBtZW51ID0gPGRpdiBjbGFzc05hbWU9XCJtZW51XCI+e25hdmJhck1lbnV9PC9kaXY+O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbmF2YmFyU3R5bGU6IENTU1Byb3BlcnRpZXMgPSB7fTtcbiAgICAgICAgaWYgKFsxLCB0cnVlXS5pbmRleE9mKG5hdmJhcikgPT09IC0xKSB7XG4gICAgICAgICAgICBuYXZiYXJTdHlsZS52aXNpYmlsaXR5ID0gXCJoaWRkZW5cIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChtb2NrVmlld1RpdGxlKSB7XG4gICAgICAgICAgICBtb2NrVGl0bGUgPSAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2NrLXRpdGxlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnthY3RpdmVWaWV3VGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHRpdGxlID0gbW9ja1ZpZXdUaXRsZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRpdGxlID0gYWN0aXZlVmlld1RpdGxlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e1wiYWlyci1uYXZiYXIgXCIgKyAodHlwZW9mIG5hdmJhckNsYXNzID09PSBcInN0cmluZ1wiID8gbmF2YmFyQ2xhc3MgOiBcIlwiKX1cbiAgICAgICAgICAgICAgICByZWY9e3JlZkRPTU5hdmJhcn1cbiAgICAgICAgICAgICAgICBzdHlsZT17bmF2YmFyU3R5bGV9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdiBzdHlsZT17eyBoZWlnaHQ6IG5hdmJhckhlaWdodCArIFwicHhcIiB9fT5cbiAgICAgICAgICAgICAgICAgICAge21vY2tUaXRsZX1cbiAgICAgICAgICAgICAgICAgICAge2JhY2t9XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwidGl0bGVcIiBzdHlsZT17eyBvcGFjaXR5OiBtb2NrVmlld1RpdGxlID8gMCA6IDEgfX0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj57dGl0bGV9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAge21lbnV9XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59KTtcbmludGVyZmFjZSBWaWV3c01hcHBlclByb3BzIHtcbiAgICB2aWV3czogUHJvcHNbXCJ2aWV3c1wiXTtcbiAgICBhY3RpdmVWaWV3TmFtZTogUHJvcHNbXCJhY3RpdmVWaWV3TmFtZVwiXTtcbiAgICByZWZzQ09NUFZpZXdzOiBQcm9wc1tcInJlZnNDT01QVmlld3NcIl07XG59XG5jb25zdCBWaWV3c01hcHBlciA9IFJlYWN0Lm1lbW88Vmlld3NNYXBwZXJQcm9wcz4oZnVuY3Rpb24gVmlld3NNYXBwZXIoe1xuICAgIHZpZXdzLFxuICAgIGFjdGl2ZVZpZXdOYW1lLFxuICAgIHJlZnNDT01QVmlld3Ncbn06IFZpZXdzTWFwcGVyUHJvcHMpOiBhbnkge1xuICAgIHJldHVybiB2aWV3cy5tYXAoXG4gICAgICAgIChpdGVtKTogUmVhY3ROb2RlID0+IHtcbiAgICAgICAgICAgIGlmIChpdGVtLnByb3BzLm5hbWUgPT09IGFjdGl2ZVZpZXdOYW1lKSB7XG4gICAgICAgICAgICAgICAgaXRlbS5wcm9wcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpdGVtLnByb3BzLmFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpdGVtLnByb3BzLmtleSA9IGl0ZW0ucHJvcHMubmFtZTtcbiAgICAgICAgICAgIGlmICghaXRlbS5wcm9wcy5yZWYpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnByb3BzLnJlZiA9IFJlYWN0LmNyZWF0ZVJlZjxBaXJyVmlldz4oKTtcbiAgICAgICAgICAgICAgICByZWZzQ09NUFZpZXdzW2l0ZW0ucHJvcHMubmFtZV0gPSBpdGVtLnByb3BzLnJlZjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoaXRlbS50eXBlLCBpdGVtLnByb3BzKTtcbiAgICAgICAgfVxuICAgICk7XG59KTtcbmludGVyZmFjZSBWaWV3c1JlbmRlcmVyUHJvcHMgZXh0ZW5kcyBWaWV3c01hcHBlclByb3BzIHtcbiAgICBjbGFzc05hbWU6IFByb3BzW1wiY2xhc3NOYW1lXCJdO1xuICAgIHJlZkRPTUNvbnRhaW5lcjogUHJvcHNbXCJyZWZET01Db250YWluZXJcIl07XG4gICAgY29udGFpbmVyc0hlaWdodDogUHJvcHNbXCJjb250YWluZXJzSGVpZ2h0XCJdO1xufVxuXG5jb25zdCBWaWV3c1JlbmRlcmVyID0gUmVhY3QubWVtbzxWaWV3c1JlbmRlcmVyUHJvcHM+KGZ1bmN0aW9uIFZpZXdzUmVuZGVyZXIoe1xuICAgIHZpZXdzLFxuICAgIGNsYXNzTmFtZSA9IFwiXCIsXG4gICAgcmVmRE9NQ29udGFpbmVyLFxuICAgIGFjdGl2ZVZpZXdOYW1lLFxuICAgIGNvbnRhaW5lcnNIZWlnaHQsXG4gICAgcmVmc0NPTVBWaWV3c1xufTogVmlld3NSZW5kZXJlclByb3BzKTogUmVhY3RFbGVtZW50PGFueT4ge1xuICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17XCJhaXJyLWNvbnRhaW5lciBcIiArIGNsYXNzTmFtZX1cbiAgICAgICAgICAgIHJlZj17cmVmRE9NQ29udGFpbmVyfVxuICAgICAgICAgICAgc3R5bGU9e2NvbnRhaW5lcnNIZWlnaHQgPyB7IGhlaWdodDogY29udGFpbmVyc0hlaWdodCB9IDogbnVsbH1cbiAgICAgICAgPlxuICAgICAgICAgICAgPFZpZXdzTWFwcGVyXG4gICAgICAgICAgICAgICAgdmlld3M9e3ZpZXdzfVxuICAgICAgICAgICAgICAgIGFjdGl2ZVZpZXdOYW1lPXthY3RpdmVWaWV3TmFtZX1cbiAgICAgICAgICAgICAgICByZWZzQ09NUFZpZXdzPXtyZWZzQ09NUFZpZXdzfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgKTtcbn0pO1xuIl19