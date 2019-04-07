"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.sceneDefaultProps = void 0;

var React = _interopRequireWildcard(require("react"));

var _AirrMayer = _interopRequireDefault(require("./AirrMayer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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

exports["default"] = AirrScene;

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

    return React.createElement(_AirrMayer["default"], _extends({
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyU2NlbmUudHN4Il0sIm5hbWVzIjpbInNjZW5lRGVmYXVsdFByb3BzIiwibmFtZSIsImFjdGl2ZVZpZXdOYW1lIiwiR1VJRGlzYWJsZWQiLCJHVUlEaXNhYmxlQ292ZXIiLCJhbmltYXRpb24iLCJhbmltYXRpb25UaW1lIiwibmF2YmFyIiwibmF2YmFySGVpZ2h0IiwibmF2YmFyTWVudSIsIm5hdmJhckNsYXNzIiwiYmFja0J1dHRvbiIsImJhY2tCdXR0b25PbkZpcnN0VmlldyIsImhhbmRsZUJhY2tCdXR0b24iLCJoYW5kbGVCYWNrQmVoYXZpb3VyT25GaXJzdFZpZXciLCJhY3RpdmUiLCJzaWRlcGFuZWwiLCJ2aWV3cyIsIm1heWVycyIsInRpdGxlIiwiY2xhc3NOYW1lIiwic2lkZXBhbmVsVmlzaWJpbGl0eUNhbGxiYWNrIiwiY2hpbGRyZW4iLCJBaXJyU2NlbmUiLCJlIiwiYmFja0J0biIsImN1cnJlbnRUYXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiZ2V0Vmlld0luZGV4IiwicHJvcHMiLCJjb25zb2xlIiwid2FybiIsInJlZkNPTVBTaWRlcGFuZWwiLCJjdXJyZW50IiwiaXNTaG93biIsImhpZGUiLCJzaG93IiwiaXNBbnlWaWV3QWN0aXZlIiwic29tZSIsInZpZXciLCJCb29sZWFuIiwidmlld05hbWUiLCJmaW5kSW5kZXgiLCJjb25maWciLCJjaGVja1ZhbGlkQWN0aXZlVmlldyIsImFjdGl2ZVZpZXdJbmRleCIsIm1vY2tWaWV3VGl0bGUiLCJtb2NrVGl0bGVOYW1lIiwibW9ja1ZpZXdJbmRleCIsIm1vY2tWaWV3IiwicmVmRE9NIiwiaGFuZGxlTWVudUJ1dHRvblRvZ2dsZVNpZGVwYW5lbCIsInJlZkRPTU5hdmJhciIsInJlZnNDT01QVmlld3MiLCJyZWZET01Db250YWluZXIiLCJjb250YWluZXJzSGVpZ2h0IiwidHlwZSIsIlB1cmVDb21wb25lbnQiLCJDaGlsZHJlblJlbmRlcmVyIiwiUmVhY3QiLCJtZW1vIiwicmVzdCIsIk1heWVyc1JlbmRlcmVyIiwibWFwIiwiU2lkZXBhbmVsUmVuZGVyZXIiLCJ2aXNpYmlsaXR5Q2FsbGJhY2siLCJyZWYiLCJlbmFibGVkIiwiY3JlYXRlRWxlbWVudCIsIkJsYW5rbWFza1JlbmRlcmVyIiwiTmF2YmFyUmVuZGVyZXIiLCJoYXNTaWRlcGFuZWwiLCJhY3RpdmVWaWV3VGl0bGUiLCJtb2NrVGl0bGUiLCJiYWNrIiwiYmFja0NsYXNzTmFtZSIsIm1lbnUiLCJBcnJheSIsImlzQXJyYXkiLCJuYXZiYXJTdHlsZSIsImluZGV4T2YiLCJ2aXNpYmlsaXR5IiwiaGVpZ2h0Iiwib3BhY2l0eSIsIlZpZXdzTWFwcGVyIiwiaXRlbSIsImtleSIsImNyZWF0ZVJlZiIsIlZpZXdzUmVuZGVyZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFXQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdJTyxJQUFNQSxpQkFBaUMsR0FBRztBQUM3Q0MsRUFBQUEsSUFBSSxFQUFFLEVBRHVDO0FBRzdDQyxFQUFBQSxjQUFjLEVBQUUsSUFINkI7QUFJN0NDLEVBQUFBLFdBQVcsRUFBRSxLQUpnQztBQUs3Q0MsRUFBQUEsZUFBZSxFQUFFLElBTDRCO0FBTTdDQyxFQUFBQSxTQUFTLEVBQUUsT0FOa0M7QUFPN0NDLEVBQUFBLGFBQWEsRUFBRSxHQVA4QjtBQVE3Q0MsRUFBQUEsTUFBTSxFQUFFLEtBUnFDO0FBUzdDQyxFQUFBQSxZQUFZLEVBQUUsRUFUK0I7QUFVN0NDLEVBQUFBLFVBQVUsRUFBRSxJQVZpQztBQVc3Q0MsRUFBQUEsV0FBVyxFQUFFLEVBWGdDO0FBWTdDQyxFQUFBQSxVQUFVLEVBQUUsS0FaaUM7QUFhN0NDLEVBQUFBLHFCQUFxQixFQUFFLEtBYnNCO0FBYzdDQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQWQyQjtBQWU3Q0MsRUFBQUEsOEJBQThCLEVBQUUsSUFmYTtBQWdCN0NDLEVBQUFBLE1BQU0sRUFBRSxLQWhCcUM7QUFpQjdDQyxFQUFBQSxTQUFTLEVBQUUsSUFqQmtDO0FBa0I3Q0MsRUFBQUEsS0FBSyxFQUFFLEVBbEJzQztBQW1CN0NDLEVBQUFBLE1BQU0sRUFBRSxFQW5CcUM7QUFvQjdDQyxFQUFBQSxLQUFLLEVBQUUsRUFwQnNDO0FBcUI3Q0MsRUFBQUEsU0FBUyxFQUFFLEVBckJrQztBQXNCN0NDLEVBQUFBLDJCQUEyQixFQUFFLElBdEJnQjtBQXVCN0NDLEVBQUFBLFFBQVEsRUFBRTtBQXZCbUMsQ0FBMUM7OztJQXlCY0MsUzs7Ozs7Ozs7Ozs7Ozs7Ozs7O3NFQWNDLEU7O3VFQWtCQyxVQUFDQyxDQUFELEVBQTBDO0FBQ3pELFVBQU1DLE9BQU8sR0FBR0QsQ0FBQyxDQUFDRSxhQUFsQjtBQUNBRCxNQUFBQSxPQUFPLENBQUNFLFNBQVIsQ0FBa0JDLEdBQWxCLENBQXNCLFNBQXRCO0FBRUFDLE1BQUFBLFVBQVUsQ0FBQyxZQUFZO0FBQ25CSixRQUFBQSxPQUFPLENBQUNFLFNBQVIsQ0FBa0JHLE1BQWxCLENBQXlCLFNBQXpCO0FBQ0gsT0FGUyxFQUVQLEdBRk8sQ0FBVjs7QUFJQSxVQUNJLE1BQUtDLFlBQUwsQ0FBa0IsTUFBS0MsS0FBTCxDQUFXOUIsY0FBN0IsTUFBaUQsQ0FBakQsSUFDQSxNQUFLOEIsS0FBTCxDQUFXbEIsOEJBRmYsRUFHRTtBQUNFLGVBQU8sTUFBS2tCLEtBQUwsQ0FBV2xCLDhCQUFYLEVBQVA7QUFDSDs7QUFFRCxVQUFJLE1BQUtrQixLQUFMLENBQVduQixnQkFBZixFQUFpQztBQUM3QixjQUFLbUIsS0FBTCxDQUFXbkIsZ0JBQVgsQ0FBNEJXLENBQTVCO0FBQ0gsT0FGRCxNQUVPO0FBQ0hTLFFBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLCtDQUFiO0FBQ0g7QUFDSixLOztzRkFRaUMsVUFBQ1YsQ0FBRCxFQUEwQztBQUN4RSxVQUFJLE1BQUtRLEtBQUwsQ0FBV0csZ0JBQVgsSUFBK0IsTUFBS0gsS0FBTCxDQUFXRyxnQkFBWCxDQUE0QkMsT0FBL0QsRUFBd0U7QUFDcEUsY0FBS0osS0FBTCxDQUFXRyxnQkFBWCxDQUE0QkMsT0FBNUIsQ0FBb0NDLE9BQXBDLEtBQ00sTUFBS0wsS0FBTCxDQUFXRyxnQkFBWCxDQUE0QkMsT0FBNUIsQ0FBb0NFLElBQXBDLEVBRE4sR0FFTSxNQUFLTixLQUFMLENBQVdHLGdCQUFYLENBQTRCQyxPQUE1QixDQUFvQ0csSUFBcEMsRUFGTjtBQUdIO0FBQ0osSzs7MkVBRXNCLFlBQWU7QUFDbEMsVUFBTUMsZUFBZSxHQUFHLE1BQUtSLEtBQUwsQ0FBV2YsS0FBWCxDQUFpQndCLElBQWpCLENBQ3BCLFVBQUNDLElBQUQ7QUFBQSxlQUFtQkEsSUFBSSxDQUFDVixLQUFMLENBQVcvQixJQUFYLEtBQW9CLE1BQUsrQixLQUFMLENBQVc5QixjQUFsRDtBQUFBLE9BRG9CLENBQXhCOztBQUlBLFVBQUksQ0FBQ3NDLGVBQUwsRUFBc0I7QUFDbEJQLFFBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUNJLHNDQUNLLE1BQUtGLEtBQUwsQ0FBVy9CLElBQVgsSUFBbUIsc0JBQXNCLE1BQUsrQixLQUFMLENBQVcvQixJQUFqQyxHQUF3QyxHQURoRSxJQUVJLEdBSFI7QUFLSDs7QUFFRCxhQUFPMEMsT0FBTyxDQUFDSCxlQUFELENBQWQ7QUFDSCxLOzs7Ozs7OztBQWxFRDs7Ozs7O2lDQU1hSSxRLEVBQTBCO0FBQ25DLGFBQU8sS0FBS1osS0FBTCxDQUFXZixLQUFYLENBQWlCNEIsU0FBakIsQ0FBMkIsVUFBQ0MsTUFBRDtBQUFBLGVBQXFCQSxNQUFNLENBQUNkLEtBQVAsQ0FBYS9CLElBQWIsS0FBc0IyQyxRQUEzQztBQUFBLE9BQTNCLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7NkJBMERvQjtBQUNoQixVQUFJeEIsU0FBUyxHQUFHLHNCQUFoQjtBQUNBLFdBQUtZLEtBQUwsQ0FBV2pCLE1BQVgsS0FBc0JLLFNBQVMsSUFBSSxTQUFuQztBQUNBLFdBQUtZLEtBQUwsQ0FBV1osU0FBWCxLQUF5QkEsU0FBUyxJQUFJLE1BQU0sS0FBS1ksS0FBTCxDQUFXWixTQUF2RDtBQUVBLFdBQUsyQixvQkFBTDtBQUVBLFVBQU1DLGVBQWUsR0FBRyxLQUFLakIsWUFBTCxDQUFrQixLQUFLQyxLQUFMLENBQVc5QixjQUE3QixDQUF4QjtBQUNBLFVBQUkrQyxhQUFKOztBQUNBLFVBQUksS0FBS2pCLEtBQUwsQ0FBV2tCLGFBQWYsRUFBOEI7QUFDMUIsWUFBTUMsYUFBYSxHQUFHLEtBQUtwQixZQUFMLENBQWtCLEtBQUtDLEtBQUwsQ0FBV2tCLGFBQTdCLENBQXRCOztBQUNBLFlBQUlDLGFBQWEsSUFBSSxDQUFyQixFQUF3QjtBQUNwQixjQUFNQyxRQUFRLEdBQUcsS0FBS3BCLEtBQUwsQ0FBV2YsS0FBWCxDQUFpQmtDLGFBQWpCLENBQWpCOztBQUNBLGNBQUlDLFFBQVEsQ0FBQ3BCLEtBQVQsQ0FBZWIsS0FBbkIsRUFBMEI7QUFDdEI4QixZQUFBQSxhQUFhLEdBQUdHLFFBQVEsQ0FBQ3BCLEtBQVQsQ0FBZWIsS0FBL0I7QUFDSDtBQUNKO0FBQ0o7O0FBQ0QsYUFDSTtBQUFLLFFBQUEsU0FBUyxFQUFFQyxTQUFoQjtBQUEyQixRQUFBLEdBQUcsRUFBRSxLQUFLWSxLQUFMLENBQVdxQjtBQUEzQyxTQUNJO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUNJLG9CQUFDLGNBQUQ7QUFDSSxRQUFBLE1BQU0sRUFBRSxLQUFLckIsS0FBTCxDQUFXekIsTUFEdkI7QUFFSSxRQUFBLGVBQWUsRUFBRXlDLGVBRnJCO0FBR0ksUUFBQSxxQkFBcUIsRUFBRSxLQUFLaEIsS0FBTCxDQUFXcEIscUJBSHRDO0FBSUksUUFBQSxVQUFVLEVBQUUsS0FBS29CLEtBQUwsQ0FBV3JCLFVBSjNCO0FBS0ksUUFBQSxnQkFBZ0IsRUFBRSxLQUFLRSxnQkFMM0I7QUFNSSxRQUFBLFVBQVUsRUFBRSxLQUFLbUIsS0FBTCxDQUFXdkIsVUFOM0I7QUFPSSxRQUFBLFlBQVksRUFBRWtDLE9BQU8sQ0FBQyxLQUFLWCxLQUFMLENBQVdoQixTQUFaLENBUHpCO0FBUUksUUFBQSwrQkFBK0IsRUFBRSxLQUFLc0MsK0JBUjFDO0FBU0ksUUFBQSxXQUFXLEVBQUUsS0FBS3RCLEtBQUwsQ0FBV3RCLFdBVDVCO0FBVUksUUFBQSxhQUFhLEVBQUV1QyxhQVZuQjtBQVdJLFFBQUEsZUFBZSxFQUNYLEtBQUtqQixLQUFMLENBQVdmLEtBQVgsQ0FBaUIrQixlQUFqQixLQUNBLEtBQUtoQixLQUFMLENBQVdmLEtBQVgsQ0FBaUIrQixlQUFqQixFQUFrQ2hCLEtBQWxDLENBQXdDYixLQWJoRDtBQWVJLFFBQUEsWUFBWSxFQUFFLEtBQUthLEtBQUwsQ0FBV3VCLFlBZjdCO0FBZ0JJLFFBQUEsWUFBWSxFQUFFLEtBQUt2QixLQUFMLENBQVd4QjtBQWhCN0IsUUFESixFQW1CSSxvQkFBQyxhQUFEO0FBQ0ksUUFBQSxTQUFTLEVBQUUsS0FBS3dCLEtBQUwsQ0FBVzNCLFNBQVgsR0FBdUIsS0FBSzJCLEtBQUwsQ0FBVzNCLFNBQVgsR0FBdUIsWUFBOUMsR0FBNkQsRUFENUU7QUFFSSxRQUFBLGFBQWEsRUFBRSxLQUFLMkIsS0FBTCxDQUFXd0IsYUFGOUI7QUFHSSxRQUFBLGNBQWMsRUFBRSxLQUFLeEIsS0FBTCxDQUFXOUIsY0FIL0I7QUFJSSxRQUFBLEtBQUssRUFBRSxLQUFLOEIsS0FBTCxDQUFXZixLQUp0QjtBQUtJLFFBQUEsZUFBZSxFQUFFLEtBQUtlLEtBQUwsQ0FBV3lCLGVBTGhDO0FBTUksUUFBQSxnQkFBZ0IsRUFBRSxLQUFLekIsS0FBTCxDQUFXMEI7QUFOakMsUUFuQkosQ0FESixFQTZCSSxvQkFBQyxnQkFBRCxFQUFzQixLQUFLMUIsS0FBM0IsRUFBbUMsS0FBS0EsS0FBTCxDQUFXVixRQUE5QyxDQTdCSixFQThCSyxLQUFLVSxLQUFMLENBQVdoQixTQUFYLElBQ0csb0JBQUMsaUJBQUQ7QUFDSSxRQUFBLElBQUksRUFBRSxLQUFLZ0IsS0FBTCxDQUFXaEIsU0FBWCxDQUFxQjJDLElBRC9CO0FBRUksUUFBQSxnQkFBZ0IsRUFBRSxLQUFLM0IsS0FBTCxDQUFXRyxnQkFGakM7QUFHSSxRQUFBLGtCQUFrQixFQUFFLEtBQUtILEtBQUwsQ0FBV1gsMkJBSG5DO0FBSUksUUFBQSxLQUFLLEVBQUUsS0FBS1csS0FBTCxDQUFXaEIsU0FBWCxDQUFxQmdCO0FBSmhDLFFBL0JSLEVBc0NJLG9CQUFDLGNBQUQ7QUFBZ0IsUUFBQSxNQUFNLEVBQUUsS0FBS0EsS0FBTCxDQUFXZDtBQUFuQyxRQXRDSixFQXVDSSxvQkFBQyxpQkFBRDtBQUNJLFFBQUEsV0FBVyxFQUFFLEtBQUtjLEtBQUwsQ0FBVzdCLFdBRDVCO0FBRUksUUFBQSxlQUFlLEVBQUUsS0FBSzZCLEtBQUwsQ0FBVzVCO0FBRmhDLFFBdkNKLENBREo7QUE4Q0g7Ozs7RUFwSmtDd0QsbUI7Ozs7Z0JBQWxCckMsUyxvQ0FFVnZCLGlCO0FBQ0htQyxFQUFBQSxnQkFBZ0IsRUFBRSxJO0FBQ2xCa0IsRUFBQUEsTUFBTSxFQUFFLEk7QUFDUkUsRUFBQUEsWUFBWSxFQUFFLEk7QUFDZEMsRUFBQUEsYUFBYSxFQUFFLEk7QUFDZkMsRUFBQUEsZUFBZSxFQUFFLEk7QUFDakJQLEVBQUFBLGFBQWEsRUFBRSxFO0FBQ2ZRLEVBQUFBLGdCQUFnQixFQUFFOzs7QUFnSjFCLElBQU1HLGdCQUFnQixHQUFHQyxLQUFLLENBQUNDLElBQU4sQ0FBa0MsU0FBU0YsZ0JBQVQsT0FHNUI7QUFBQSxNQUYzQnZDLFFBRTJCLFFBRjNCQSxRQUUyQjtBQUFBLE1BRHhCMEMsSUFDd0I7O0FBQzNCLFNBQU8sT0FBTzFDLFFBQVAsS0FBb0IsVUFBcEIsR0FBaUNBLFFBQVEsQ0FBQzBDLElBQUQsQ0FBekMsR0FBa0QxQyxRQUF6RDtBQUNILENBTHdCLENBQXpCO0FBU0EsSUFBTTJDLGNBQWMsR0FBR0gsS0FBSyxDQUFDQyxJQUFOLENBQWdDLFNBQVNFLGNBQVQsUUFFMUI7QUFBQSxNQUR6Qi9DLE1BQ3lCLFNBRHpCQSxNQUN5QjtBQUN6QixTQUFPQSxNQUFNLENBQUNnRCxHQUFQLENBQ0gsaUJBQW1DO0FBQUEsUUFBaENqRSxJQUFnQyxTQUFoQ0EsSUFBZ0M7QUFBQSxRQUF2QitCLEtBQXVCOztBQUMvQixXQUFPLG9CQUFDLHFCQUFEO0FBQVcsTUFBQSxHQUFHLEVBQUUvQixJQUFoQjtBQUFzQixNQUFBLElBQUksRUFBRUE7QUFBNUIsT0FBc0MrQixLQUF0QyxFQUFQO0FBQ0gsR0FIRSxDQUFQO0FBS0gsQ0FSc0IsQ0FBdkI7QUFlQSxJQUFNbUMsaUJBQWlCLEdBQUdMLEtBQUssQ0FBQ0MsSUFBTixDQUFtQyxTQUFTSSxpQkFBVCxRQUs3QjtBQUFBLE1BSjVCUixJQUk0QixTQUo1QkEsSUFJNEI7QUFBQSxNQUg1QnhCLGdCQUc0QixTQUg1QkEsZ0JBRzRCO0FBQUEsTUFGNUJpQyxrQkFFNEIsU0FGNUJBLGtCQUU0QjtBQUFBLE1BRDVCcEMsS0FDNEIsU0FENUJBLEtBQzRCOztBQUM1QixNQUFJLENBQUNBLEtBQUssQ0FBQ3FDLEdBQVgsRUFBZ0I7QUFDWnJDLElBQUFBLEtBQUssQ0FBQ3FDLEdBQU4sR0FBWWxDLGdCQUFaO0FBQ0g7O0FBQ0QsTUFBSSxDQUFDSCxLQUFLLENBQUNvQyxrQkFBWCxFQUErQjtBQUMzQnBDLElBQUFBLEtBQUssQ0FBQ29DLGtCQUFOLEdBQTJCQSxrQkFBM0I7QUFDSDs7QUFDRCxNQUFJLE9BQU9wQyxLQUFLLENBQUNzQyxPQUFiLEtBQXlCLFdBQTdCLEVBQTBDO0FBQ3RDdEMsSUFBQUEsS0FBSyxDQUFDc0MsT0FBTixHQUFnQixJQUFoQixDQURzQyxDQUNoQjtBQUN6Qjs7QUFFRCxTQUFPUixLQUFLLENBQUNTLGFBQU4sQ0FBb0JaLElBQXBCLEVBQTBCM0IsS0FBMUIsQ0FBUDtBQUNILENBakJ5QixDQUExQjtBQXNCQSxJQUFNd0MsaUJBQWlCLEdBQUdWLEtBQUssQ0FBQ0MsSUFBTixDQUFtQyxTQUFTUyxpQkFBVCxRQUdmO0FBQUEsTUFGMUNyRSxXQUUwQyxTQUYxQ0EsV0FFMEM7QUFBQSxNQUQxQ0MsZUFDMEMsU0FEMUNBLGVBQzBDO0FBQzFDLFNBQU9ELFdBQVcsSUFBSTtBQUFLLElBQUEsU0FBUyxFQUFDO0FBQWYsS0FBa0NDLGVBQWxDLENBQXRCO0FBQ0gsQ0FMeUIsQ0FBMUI7QUFxQkEsSUFBTXFFLGNBQWMsR0FBR1gsS0FBSyxDQUFDQyxJQUFOLENBQWdDLFNBQVNVLGNBQVQsUUFjMUI7QUFBQSxNQWJ6QmxFLE1BYXlCLFNBYnpCQSxNQWF5QjtBQUFBLE1BWnpCeUMsZUFZeUIsU0FaekJBLGVBWXlCO0FBQUEsTUFYekJwQyxxQkFXeUIsU0FYekJBLHFCQVd5QjtBQUFBLE1BVnpCQyxnQkFVeUIsU0FWekJBLGdCQVV5QjtBQUFBLE1BVHpCRixVQVN5QixTQVR6QkEsVUFTeUI7QUFBQSxNQVJ6QkYsVUFReUIsU0FSekJBLFVBUXlCO0FBQUEsTUFQekJpRSxZQU95QixTQVB6QkEsWUFPeUI7QUFBQSxNQU56QnBCLCtCQU15QixTQU56QkEsK0JBTXlCO0FBQUEsTUFMekJMLGFBS3lCLFNBTHpCQSxhQUt5QjtBQUFBLE1BSnpCMEIsZUFJeUIsU0FKekJBLGVBSXlCO0FBQUEsTUFIekJqRSxXQUd5QixTQUh6QkEsV0FHeUI7QUFBQSxNQUZ6QjZDLFlBRXlCLFNBRnpCQSxZQUV5QjtBQUFBLE1BRHpCL0MsWUFDeUIsU0FEekJBLFlBQ3lCOztBQUN6QixNQUFJRCxNQUFKLEVBQVk7QUFDUixRQUFJcUUsU0FBUyxHQUFHLElBQWhCO0FBQ0EsUUFBSXpELEtBQUo7QUFDQSxRQUFJMEQsSUFBSSxHQUFHLElBQVg7O0FBRUEsUUFBSWxFLFVBQUosRUFBZ0I7QUFDWixVQUFNbUUsYUFBYSxHQUNmLFdBQVc5QixlQUFlLEdBQUcsQ0FBbEIsSUFBdUIsQ0FBQ3BDLHFCQUF4QixHQUFnRCxRQUFoRCxHQUEyRCxFQUF0RSxDQURKO0FBRUFpRSxNQUFBQSxJQUFJLEdBQ0E7QUFBSyxRQUFBLFNBQVMsRUFBRUMsYUFBaEI7QUFBK0IsUUFBQSxPQUFPLEVBQUVqRTtBQUF4QyxTQUNJLGdDQURKLENBREo7QUFLSDs7QUFFRCxRQUFJa0UsSUFBSjs7QUFDQSxRQUFJdEUsVUFBSixFQUFnQjtBQUNaLFVBQUlBLFVBQVUsS0FBSyxpQkFBbkIsRUFBc0M7QUFDbENzRSxRQUFBQSxJQUFJLEdBQUdMLFlBQVksR0FDZjtBQUFLLFVBQUEsU0FBUyxFQUFDLE1BQWY7QUFBc0IsVUFBQSxPQUFPLEVBQUVwQjtBQUEvQixXQUNJLGdDQURKLENBRGUsR0FJZixJQUpKO0FBS0gsT0FORCxNQU1PLElBQUkwQixLQUFLLENBQUNDLE9BQU4sQ0FBY3hFLFVBQWQsQ0FBSixFQUErQjtBQUNsQ3NFLFFBQUFBLElBQUksR0FBRztBQUFLLFVBQUEsU0FBUyxFQUFDO0FBQWYsV0FBdUJ0RSxVQUF2QixDQUFQO0FBQ0g7QUFDSjs7QUFFRCxRQUFNeUUsV0FBMEIsR0FBRyxFQUFuQzs7QUFDQSxRQUFJLENBQUMsQ0FBRCxFQUFJLElBQUosRUFBVUMsT0FBVixDQUFrQjVFLE1BQWxCLE1BQThCLENBQUMsQ0FBbkMsRUFBc0M7QUFDbEMyRSxNQUFBQSxXQUFXLENBQUNFLFVBQVosR0FBeUIsUUFBekI7QUFDSDs7QUFFRCxRQUFJbkMsYUFBSixFQUFtQjtBQUNmMkIsTUFBQUEsU0FBUyxHQUNMO0FBQUssUUFBQSxTQUFTLEVBQUM7QUFBZixTQUNJLGtDQUFPRCxlQUFQLENBREosQ0FESjtBQUtBeEQsTUFBQUEsS0FBSyxHQUFHOEIsYUFBUjtBQUNILEtBUEQsTUFPTztBQUNIOUIsTUFBQUEsS0FBSyxHQUFHd0QsZUFBUjtBQUNIOztBQUVELFdBQ0k7QUFDSSxNQUFBLFNBQVMsRUFBRSxrQkFBa0IsT0FBT2pFLFdBQVAsS0FBdUIsUUFBdkIsR0FBa0NBLFdBQWxDLEdBQWdELEVBQWxFLENBRGY7QUFFSSxNQUFBLEdBQUcsRUFBRTZDLFlBRlQ7QUFHSSxNQUFBLEtBQUssRUFBRTJCO0FBSFgsT0FLSTtBQUFLLE1BQUEsS0FBSyxFQUFFO0FBQUVHLFFBQUFBLE1BQU0sRUFBRTdFLFlBQVksR0FBRztBQUF6QjtBQUFaLE9BQ0tvRSxTQURMLEVBRUtDLElBRkwsRUFHSTtBQUFLLE1BQUEsU0FBUyxFQUFDLE9BQWY7QUFBdUIsTUFBQSxLQUFLLEVBQUU7QUFBRVMsUUFBQUEsT0FBTyxFQUFFckMsYUFBYSxHQUFHLENBQUgsR0FBTztBQUEvQjtBQUE5QixPQUNJLGtDQUFPOUIsS0FBUCxDQURKLENBSEosRUFNSzRELElBTkwsQ0FMSixDQURKO0FBZ0JIO0FBQ0osQ0E1RXNCLENBQXZCO0FBa0ZBLElBQU1RLFdBQVcsR0FBR3pCLEtBQUssQ0FBQ0MsSUFBTixDQUE2QixTQUFTd0IsV0FBVCxRQUl2QjtBQUFBLE1BSHRCdEUsS0FHc0IsU0FIdEJBLEtBR3NCO0FBQUEsTUFGdEJmLGNBRXNCLFNBRnRCQSxjQUVzQjtBQUFBLE1BRHRCc0QsYUFDc0IsU0FEdEJBLGFBQ3NCO0FBQ3RCLFNBQU92QyxLQUFLLENBQUNpRCxHQUFOLENBQ0gsVUFBQ3NCLElBQUQsRUFBcUI7QUFDakIsUUFBSUEsSUFBSSxDQUFDeEQsS0FBTCxDQUFXL0IsSUFBWCxLQUFvQkMsY0FBeEIsRUFBd0M7QUFDcENzRixNQUFBQSxJQUFJLENBQUN4RCxLQUFMLENBQVdqQixNQUFYLEdBQW9CLElBQXBCO0FBQ0gsS0FGRCxNQUVPO0FBQ0h5RSxNQUFBQSxJQUFJLENBQUN4RCxLQUFMLENBQVdqQixNQUFYLEdBQW9CLEtBQXBCO0FBQ0g7O0FBRUR5RSxJQUFBQSxJQUFJLENBQUN4RCxLQUFMLENBQVd5RCxHQUFYLEdBQWlCRCxJQUFJLENBQUN4RCxLQUFMLENBQVcvQixJQUE1Qjs7QUFDQSxRQUFJLENBQUN1RixJQUFJLENBQUN4RCxLQUFMLENBQVdxQyxHQUFoQixFQUFxQjtBQUNqQm1CLE1BQUFBLElBQUksQ0FBQ3hELEtBQUwsQ0FBV3FDLEdBQVgsR0FBaUJQLEtBQUssQ0FBQzRCLFNBQU4sRUFBakI7QUFDQWxDLE1BQUFBLGFBQWEsQ0FBQ2dDLElBQUksQ0FBQ3hELEtBQUwsQ0FBVy9CLElBQVosQ0FBYixHQUFpQ3VGLElBQUksQ0FBQ3hELEtBQUwsQ0FBV3FDLEdBQTVDO0FBQ0g7O0FBRUQsV0FBT1AsS0FBSyxDQUFDUyxhQUFOLENBQW9CaUIsSUFBSSxDQUFDN0IsSUFBekIsRUFBK0I2QixJQUFJLENBQUN4RCxLQUFwQyxDQUFQO0FBQ0gsR0FmRSxDQUFQO0FBaUJILENBdEJtQixDQUFwQjtBQTZCQSxJQUFNMkQsYUFBYSxHQUFHN0IsS0FBSyxDQUFDQyxJQUFOLENBQStCLFNBQVM0QixhQUFULFFBT1g7QUFBQSxNQU50QzFFLEtBTXNDLFNBTnRDQSxLQU1zQztBQUFBLDhCQUx0Q0csU0FLc0M7QUFBQSxNQUx0Q0EsU0FLc0MsZ0NBTDFCLEVBSzBCO0FBQUEsTUFKdENxQyxlQUlzQyxTQUp0Q0EsZUFJc0M7QUFBQSxNQUh0Q3ZELGNBR3NDLFNBSHRDQSxjQUdzQztBQUFBLE1BRnRDd0QsZ0JBRXNDLFNBRnRDQSxnQkFFc0M7QUFBQSxNQUR0Q0YsYUFDc0MsU0FEdENBLGFBQ3NDO0FBQ3RDLFNBQ0k7QUFDSSxJQUFBLFNBQVMsRUFBRSxvQkFBb0JwQyxTQURuQztBQUVJLElBQUEsR0FBRyxFQUFFcUMsZUFGVDtBQUdJLElBQUEsS0FBSyxFQUFFQyxnQkFBZ0IsR0FBRztBQUFFMkIsTUFBQUEsTUFBTSxFQUFFM0I7QUFBVixLQUFILEdBQWtDO0FBSDdELEtBS0ksb0JBQUMsV0FBRDtBQUNJLElBQUEsS0FBSyxFQUFFekMsS0FEWDtBQUVJLElBQUEsY0FBYyxFQUFFZixjQUZwQjtBQUdJLElBQUEsYUFBYSxFQUFFc0Q7QUFIbkIsSUFMSixDQURKO0FBYUgsQ0FyQnFCLENBQXRCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQge1xuICAgIFB1cmVDb21wb25lbnQsXG4gICAgU3ludGhldGljRXZlbnQsXG4gICAgUmVhY3RIVE1MLFxuICAgIFJlYWN0Tm9kZSxcbiAgICBSZWFjdEVsZW1lbnQsXG4gICAgUmVmT2JqZWN0LFxuICAgIENTU1Byb3BlcnRpZXNcbn0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWlyclZpZXcgZnJvbSBcIi4vQWlyclZpZXdcIjtcbmltcG9ydCBBaXJyTWF5ZXIsIHsgUHJvcHMgYXMgTWF5ZXJQcm9wcyB9IGZyb20gXCIuL0FpcnJNYXllclwiO1xuaW1wb3J0IEFpcnJTaWRlcGFuZWwsIHsgUHJvcHMgYXMgU2lkZXBhbmVsUHJvcHMgfSBmcm9tIFwiLi9BaXJyU2lkZXBhbmVsXCI7XG5pbXBvcnQgeyBBbmltYXRpb25UeXBlLCBWaWV3Q29uZmlnLCBOYXZiYXJNZW51IH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb3JlU2NlbmVQcm9wcyB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHNjZW5lLiBNdXN0IGJlIHVuaXF1ZSBhbW9uZyBvdGhlcnMgdmlld3MgaW4gcGFyZW50IHNjZW5lLiBXaWxsIGJlIHVzZWQgYXMgaWRlbnRpZmljYXRpb24gc3RyaW5nXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGFjdGl2ZSB2aWV3LlxuICAgICAqL1xuICAgIGFjdGl2ZVZpZXdOYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQm9vbGVhbiB0ZWxsaW5nIGlmIEdVSSBzaG91bGQgYmUgZGlzYWJsZWQgbWVhbmluZyBubyB1c2VyIGFjdGlvbnMsIGV2ZW50cyBhcmUgYWxsb3dlZC5cbiAgICAgKiBHVUkgaXMgZGlzYWJsZWQgdmlhIGFic29sdXRlIHBvc2l0aW9uZWQsIG5vdCB2aXNpYmxlIGRpdiB0aGF0IGhhcyB0aGUgYmlnZ2VzdCB6LUluZGV4XG4gICAgICovXG4gICAgR1VJRGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogUmVhY3QgZWxlbWVudCB0byBiZSBwbGFjZWQgaW4gR1VJIGRpc2FibGluZyBkaXZcbiAgICAgKi9cbiAgICBHVUlEaXNhYmxlQ292ZXI/OiBSZWFjdE5vZGU7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBhbmltYXRpb24gdG8gcGVyZm9ybSB3aGVuIHN3aXRjaGluZyB2aWV3c1xuICAgICAqL1xuICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uVHlwZTtcbiAgICAvKipcbiAgICAgKiBUaW1lIG9mIHZpZXdzIGNoYW5naW5nIGFuaW1hdGlvbiBpbiBtaWxpc2Vjb25kc1xuICAgICAqL1xuICAgIGFuaW1hdGlvblRpbWU6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGlmIG5hdmJhciBpcyBwcmVzZW50ICgxLHRydWUpIG9yIG5vdCAoMCxmYWxzZSkuIE9yIG1heWJlIGhpZGRlbiAoLTEpXG4gICAgICovXG4gICAgbmF2YmFyOiAxIHwgdHJ1ZSB8IC0xIHwgMCB8IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiB0aGUgbmF2YmFyIGluIHBpeGVsc1xuICAgICAqL1xuICAgIG5hdmJhckhlaWdodDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE5hdmJhciBtZW51IGlzIHBsYWNlZCBvbiB0aGUgcmlnaHQgbW9zdCBzaWRlLiBNaWdodCBjb250YWluIFwidG9nZ2xlU2lkZXBhbmVsXCIgYnV0dG9uIG9yIGFueSBjdXN0b20gYnV0dG9ucyBsaXN0LlxuICAgICAqL1xuICAgIG5hdmJhck1lbnU/OiBOYXZiYXJNZW51O1xuICAgIC8qKlxuICAgICAqIEV4dHJhLCBzcGFjZSBzZXBhcmF0ZWQsIG5hdmJhcidzIGNsYXNzIG5hbWVzIGxpc3RcbiAgICAgKi9cbiAgICBuYXZiYXJDbGFzczogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEJvb2xlYW4gc3BlY2lmaW5nIGlmIG5hdmJhciByZW5kZXJzIEJhY2tCdXR0b24uIFBsYWNlZCBieSBkZWZhdWx0IG9uIHRoZSBsZWZ0IHNpZGUgb2YgbmF2YmFyLlxuICAgICAqL1xuICAgIGJhY2tCdXR0b246IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRG8geW91IG5lZWQgdG8gc3RpbGwgc2hvdyBiYWNrQnV0dG9uIGV2ZW4gaWYgc2NlbmUgaXMgcmVuZGVyaW5nIGZpcnN0IHZpZXcgZnJvbSBzdGFjaz9cbiAgICAgKi9cbiAgICBiYWNrQnV0dG9uT25GaXJzdFZpZXc6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCB3aWxsIGhhbmRsZSBiYWNrIGJ1dHRvbiBjbGljayBldmVudHNcbiAgICAgKi9cbiAgICBoYW5kbGVCYWNrQnV0dG9uPyhlOiBTeW50aGV0aWNFdmVudDxIVE1MRWxlbWVudD4pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBoYW5kbGUgYmFjayBidXR0b24gY2xpY2tzIGV2ZW50cyBvbiB3aGVuIGZpcnN0IHZpZXcgaW4gc3RhY2sgaXMgYWN0aXZlXG4gICAgICovXG4gICAgaGFuZGxlQmFja0JlaGF2aW91ck9uRmlyc3RWaWV3PygpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIElzIHRoaXMgdmlldyBhY3RpdmUgaW4gcGFyZW50IHNjZW5lXG4gICAgICovXG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNpZGVwYW5lbHMgZGVjbGFyYXRpb24uIE11c3QgY29udGFpbiB0d28gcHJvcGVydGllczogYHR5cGVgIGFuZCBgcHJvcHNgXG4gICAgICoqL1xuICAgIHNpZGVwYW5lbDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogZmVyZW5jZSB0byBjbGFzcyBvciBmdW5jdGlvbiB0aGF0IHdpbGwgcmVuZGVyIEFpcnJTaWRlcGFuZWwuIE1pZ2h0IGJlIEFpcnJTaWRlcGFuZWwgaXRzZWxmLlxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZToga2V5b2YgUmVhY3RIVE1MO1xuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lhbCBwcm9wZXJ0aWVzIG9mIEFpcnJTaWRlcGFuZWwgY2xhc3MuIEdvIHRvIGNsYXNzIGRlY2xhcmF0aW9uIGZvciBmdXJ0aGVyIHByb3BlcnRpZXMgZG9jdW1lbmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvcHM6IFNpZGVwYW5lbFByb3BzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIHNpZGVwYW5lbCBjaGFuZ2VzIGl0J3MgdmlzaWJpbGl0eS5cbiAgICAgKiBJdCdzIGFyZ3VtZW50IHdpbGwgYmUgaXNTaG93biBib29sLlxuICAgICAqL1xuICAgIHNpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjayhpc1Nob3duOiBib29sZWFuKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBgdmlld3NgLiBFdmVyeSB2aWV3IG9iamVjdCBkZWNsYXJhdGlvbiBtdXN0IGNvbnRhaW4gdHdvIHByb3BlcnRpZXM6IGB0eXBlYCBhbmQgYHByb3BzYC5cbiAgICAgKi9cbiAgICB2aWV3czogVmlld0NvbmZpZ1tdO1xuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGBtYXllcnNgIG9iamVjdHMgdGhhdCB3aWxsIGJlIHJlbmRlciBpbnRvIHRoaXMgU2NlbmUuIE11c3QgY29udGFpbiBzcGVjaWFsIEFpcnJNYXllciBjbGFzcyBwcm9wZXJ0aWVzLlxuICAgICAqIFRvIGNoZWNrIHRoZSBwb3NzaWJsZSB2YWx1ZXMgb2YgcHJvcGVydGllcyBnbyB0byBBaXJyTWF5ZXIgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgbWF5ZXJzOiBNYXllclByb3BzW107XG4gICAgLyoqXG4gICAgICogVGl0bGUgdGhhdCB3aWxsIGJlIHVzZSBpbiBwYXJlbnQgU2NlbmUgbmF2YmFyIHRpdGxlIHNlY3Rpb25cbiAgICAgKi9cbiAgICB0aXRsZTogUmVhY3ROb2RlO1xuICAgIC8qKlxuICAgICAqIEV4dHJhLCBzcGFjZSBzZXBhcmF0ZWQgY2xhc3NlcyBuYW1lcyB0byB1c2UgdXBvbiBmaXJzdCBkaXYgZWxlbWVudC5cbiAgICAgKi9cbiAgICBjbGFzc05hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBDaGlsZHJlbiBwcm9wXG4gICAgICovXG4gICAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcHMgZXh0ZW5kcyBDb3JlU2NlbmVQcm9wcyB7XG4gICAgLyoqXG4gICAgICogUmVhY3QgY29tcG9uZW50J3MgcmVmIG9iamVjdFxuICAgICAqL1xuICAgIHJlZkNPTVBTaWRlcGFuZWw6IFJlZk9iamVjdDxBaXJyU2lkZXBhbmVsPjtcbiAgICAvKipcbiAgICAgKiBSZWFjdCByZWYgdG8gZG9tIG9iamVjdFxuICAgICAqL1xuICAgIHJlZkRPTTogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcbiAgICAvKipcbiAgICAgKiBSZWFjdCByZWYgdG8gZG9tIG9iamVjdFxuICAgICAqL1xuICAgIHJlZkRPTU5hdmJhcjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcbiAgICAvKipcbiAgICAgKiBPYmplY3Qgb2YgUmVhY3QgcmVmcyBjb21wb25lbnRzIHNwZWNpZmllZCB1bmRlciBzdHJpbmcga2V5c1xuICAgICAqL1xuICAgIHJlZnNDT01QVmlld3M6IHsgW25hbWU6IHN0cmluZ106IFJlZk9iamVjdDxQdXJlQ29tcG9uZW50PiB9O1xuICAgIC8qKlxuICAgICAqIFJlYWN0IGNvbXBvbmVudCdzIHJlZiBvYmplY3RcbiAgICAgKi9cbiAgICByZWZET01Db250YWluZXI6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD47XG4gICAgLyoqXG4gICAgICogSW5uZXIsIHByaXZhdGUgcHJvcCBmb3IgbWFuaXB1bGF0aW5nIG5hdmJhciB0aXRsZVxuICAgICAqL1xuICAgIG1vY2tUaXRsZU5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJbm5lciwgcHJpdmF0ZSBwcm9wIHdpdGggY29udGFpbmVycyBoZWlnaHQgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICBjb250YWluZXJzSGVpZ2h0OiBudW1iZXI7XG59XG5leHBvcnQgY29uc3Qgc2NlbmVEZWZhdWx0UHJvcHM6IENvcmVTY2VuZVByb3BzID0ge1xuICAgIG5hbWU6IFwiXCIsXG5cbiAgICBhY3RpdmVWaWV3TmFtZTogbnVsbCxcbiAgICBHVUlEaXNhYmxlZDogZmFsc2UsXG4gICAgR1VJRGlzYWJsZUNvdmVyOiBudWxsLFxuICAgIGFuaW1hdGlvbjogXCJzbGlkZVwiLFxuICAgIGFuaW1hdGlvblRpbWU6IDMwMCxcbiAgICBuYXZiYXI6IGZhbHNlLFxuICAgIG5hdmJhckhlaWdodDogNDgsXG4gICAgbmF2YmFyTWVudTogbnVsbCxcbiAgICBuYXZiYXJDbGFzczogXCJcIixcbiAgICBiYWNrQnV0dG9uOiBmYWxzZSxcbiAgICBiYWNrQnV0dG9uT25GaXJzdFZpZXc6IGZhbHNlLFxuICAgIGhhbmRsZUJhY2tCdXR0b246IG51bGwsXG4gICAgaGFuZGxlQmFja0JlaGF2aW91ck9uRmlyc3RWaWV3OiBudWxsLFxuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgc2lkZXBhbmVsOiBudWxsLFxuICAgIHZpZXdzOiBbXSxcbiAgICBtYXllcnM6IFtdLFxuICAgIHRpdGxlOiBcIlwiLFxuICAgIGNsYXNzTmFtZTogXCJcIixcbiAgICBzaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2s6IG51bGwsXG4gICAgY2hpbGRyZW46IG51bGxcbn07XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBaXJyU2NlbmUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzPiB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wczogUHJvcHMgPSB7XG4gICAgICAgIC4uLnNjZW5lRGVmYXVsdFByb3BzLFxuICAgICAgICByZWZDT01QU2lkZXBhbmVsOiBudWxsLFxuICAgICAgICByZWZET006IG51bGwsXG4gICAgICAgIHJlZkRPTU5hdmJhcjogbnVsbCxcbiAgICAgICAgcmVmc0NPTVBWaWV3czogbnVsbCxcbiAgICAgICAgcmVmRE9NQ29udGFpbmVyOiBudWxsLFxuICAgICAgICBtb2NrVGl0bGVOYW1lOiBcIlwiLFxuICAgICAgICBjb250YWluZXJzSGVpZ2h0OiBudWxsXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBNYXllcnMgQ29tcG9uZW50cyByZWZmZXJlbmNpZXNcbiAgICAgKi9cbiAgICBtYXllcnNDb21wc1JlZnMgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdmlldyBpbmRleCBmcm9tIHRoaXMucHJvcHMudmlld3MgYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3TmFtZVxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0Vmlld0luZGV4KHZpZXdOYW1lOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy52aWV3cy5maW5kSW5kZXgoKGNvbmZpZyk6IGJvb2xlYW4gPT4gY29uZmlnLnByb3BzLm5hbWUgPT09IHZpZXdOYW1lKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIG5hdmJhciBiYWNrYnV0dG9uIHRhcCBldmVudHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIEV2ZW50IG9iamVjdFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIGhhbmRsZUJhY2tCdXR0b24gPSAoZTogU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KTogdm9pZCA9PiB7XG4gICAgICAgIGNvbnN0IGJhY2tCdG4gPSBlLmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGJhY2tCdG4uY2xhc3NMaXN0LmFkZChcImNsaWNrZWRcIik7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKTogdm9pZCA9PiB7XG4gICAgICAgICAgICBiYWNrQnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJjbGlja2VkXCIpO1xuICAgICAgICB9LCAzMDApO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIHRoaXMuZ2V0Vmlld0luZGV4KHRoaXMucHJvcHMuYWN0aXZlVmlld05hbWUpID09PSAwICYmXG4gICAgICAgICAgICB0aGlzLnByb3BzLmhhbmRsZUJhY2tCZWhhdmlvdXJPbkZpcnN0Vmlld1xuICAgICAgICApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb3BzLmhhbmRsZUJhY2tCZWhhdmlvdXJPbkZpcnN0VmlldygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaGFuZGxlQmFja0J1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVCYWNrQnV0dG9uKGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW0FpcnJdIEJhY2sgYnV0dG9uIGhhbmRsZXIgd2FzIG5vdCBzcGVjaWZpZWQuXCIpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEhhbmRsZXMgbmF2YmFyIG1lbnUgYnV0dG9uIHRhcCBldmVudHNcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBlIEV2ZW50IG9iamVjdFxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuICAgIGhhbmRsZU1lbnVCdXR0b25Ub2dnbGVTaWRlcGFuZWwgPSAoZTogU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KTogdm9pZCA9PiB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLnJlZkNPTVBTaWRlcGFuZWwgJiYgdGhpcy5wcm9wcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMucmVmQ09NUFNpZGVwYW5lbC5jdXJyZW50LmlzU2hvd24oKVxuICAgICAgICAgICAgICAgID8gdGhpcy5wcm9wcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQuaGlkZSgpXG4gICAgICAgICAgICAgICAgOiB0aGlzLnByb3BzLnJlZkNPTVBTaWRlcGFuZWwuY3VycmVudC5zaG93KCk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgY2hlY2tWYWxpZEFjdGl2ZVZpZXcgPSAoKTogYm9vbGVhbiA9PiB7XG4gICAgICAgIGNvbnN0IGlzQW55Vmlld0FjdGl2ZSA9IHRoaXMucHJvcHMudmlld3Muc29tZShcbiAgICAgICAgICAgICh2aWV3KTogYm9vbGVhbiA9PiB2aWV3LnByb3BzLm5hbWUgPT09IHRoaXMucHJvcHMuYWN0aXZlVmlld05hbWVcbiAgICAgICAgKTtcblxuICAgICAgICBpZiAoIWlzQW55Vmlld0FjdGl2ZSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgIFwiW0FpcnJdIE5vIHZpZXcgd2FzIHNldCBhcyBhY3RpdmVcIiArXG4gICAgICAgICAgICAgICAgICAgICh0aGlzLnByb3BzLm5hbWUgJiYgXCIgaW4gU2NlbmUgbmFtZWQgYFwiICsgdGhpcy5wcm9wcy5uYW1lICsgXCJgXCIpICtcbiAgICAgICAgICAgICAgICAgICAgXCIuXCJcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQm9vbGVhbihpc0FueVZpZXdBY3RpdmUpO1xuICAgIH07XG5cbiAgICByZW5kZXIoKTogUmVhY3ROb2RlIHtcbiAgICAgICAgbGV0IGNsYXNzTmFtZSA9IFwiYWlyci12aWV3IGFpcnItc2NlbmVcIjtcbiAgICAgICAgdGhpcy5wcm9wcy5hY3RpdmUgJiYgKGNsYXNzTmFtZSArPSBcIiBhY3RpdmVcIik7XG4gICAgICAgIHRoaXMucHJvcHMuY2xhc3NOYW1lICYmIChjbGFzc05hbWUgKz0gXCIgXCIgKyB0aGlzLnByb3BzLmNsYXNzTmFtZSk7XG5cbiAgICAgICAgdGhpcy5jaGVja1ZhbGlkQWN0aXZlVmlldygpO1xuXG4gICAgICAgIGNvbnN0IGFjdGl2ZVZpZXdJbmRleCA9IHRoaXMuZ2V0Vmlld0luZGV4KHRoaXMucHJvcHMuYWN0aXZlVmlld05hbWUpO1xuICAgICAgICBsZXQgbW9ja1ZpZXdUaXRsZTtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMubW9ja1RpdGxlTmFtZSkge1xuICAgICAgICAgICAgY29uc3QgbW9ja1ZpZXdJbmRleCA9IHRoaXMuZ2V0Vmlld0luZGV4KHRoaXMucHJvcHMubW9ja1RpdGxlTmFtZSk7XG4gICAgICAgICAgICBpZiAobW9ja1ZpZXdJbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9ja1ZpZXcgPSB0aGlzLnByb3BzLnZpZXdzW21vY2tWaWV3SW5kZXhdO1xuICAgICAgICAgICAgICAgIGlmIChtb2NrVmlldy5wcm9wcy50aXRsZSkge1xuICAgICAgICAgICAgICAgICAgICBtb2NrVmlld1RpdGxlID0gbW9ja1ZpZXcucHJvcHMudGl0bGU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSByZWY9e3RoaXMucHJvcHMucmVmRE9NfT5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImNvbnRlbnQtd3JhcFwiPlxuICAgICAgICAgICAgICAgICAgICA8TmF2YmFyUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmJhcj17dGhpcy5wcm9wcy5uYXZiYXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVWaWV3SW5kZXg9e2FjdGl2ZVZpZXdJbmRleH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tCdXR0b25PbkZpcnN0Vmlldz17dGhpcy5wcm9wcy5iYWNrQnV0dG9uT25GaXJzdFZpZXd9XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrQnV0dG9uPXt0aGlzLnByb3BzLmJhY2tCdXR0b259XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVCYWNrQnV0dG9uPXt0aGlzLmhhbmRsZUJhY2tCdXR0b259XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZiYXJNZW51PXt0aGlzLnByb3BzLm5hdmJhck1lbnV9XG4gICAgICAgICAgICAgICAgICAgICAgICBoYXNTaWRlcGFuZWw9e0Jvb2xlYW4odGhpcy5wcm9wcy5zaWRlcGFuZWwpfVxuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlTWVudUJ1dHRvblRvZ2dsZVNpZGVwYW5lbD17dGhpcy5oYW5kbGVNZW51QnV0dG9uVG9nZ2xlU2lkZXBhbmVsfVxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2YmFyQ2xhc3M9e3RoaXMucHJvcHMubmF2YmFyQ2xhc3N9XG4gICAgICAgICAgICAgICAgICAgICAgICBtb2NrVmlld1RpdGxlPXttb2NrVmlld1RpdGxlfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVmlld1RpdGxlPXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnZpZXdzW2FjdGl2ZVZpZXdJbmRleF0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb3BzLnZpZXdzW2FjdGl2ZVZpZXdJbmRleF0ucHJvcHMudGl0bGVcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZkRPTU5hdmJhcj17dGhpcy5wcm9wcy5yZWZET01OYXZiYXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZiYXJIZWlnaHQ9e3RoaXMucHJvcHMubmF2YmFySGVpZ2h0fVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgICA8Vmlld3NSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLnByb3BzLmFuaW1hdGlvbiA/IHRoaXMucHJvcHMuYW5pbWF0aW9uICsgXCItYW5pbWF0aW9uXCIgOiBcIlwifVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmc0NPTVBWaWV3cz17dGhpcy5wcm9wcy5yZWZzQ09NUFZpZXdzfVxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVmlld05hbWU9e3RoaXMucHJvcHMuYWN0aXZlVmlld05hbWV9XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3cz17dGhpcy5wcm9wcy52aWV3c31cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZkRPTUNvbnRhaW5lcj17dGhpcy5wcm9wcy5yZWZET01Db250YWluZXJ9XG4gICAgICAgICAgICAgICAgICAgICAgICBjb250YWluZXJzSGVpZ2h0PXt0aGlzLnByb3BzLmNvbnRhaW5lcnNIZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgPENoaWxkcmVuUmVuZGVyZXIgey4uLnRoaXMucHJvcHN9Pnt0aGlzLnByb3BzLmNoaWxkcmVufTwvQ2hpbGRyZW5SZW5kZXJlcj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5zaWRlcGFuZWwgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8U2lkZXBhbmVsUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9e3RoaXMucHJvcHMuc2lkZXBhbmVsLnR5cGV9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZDT01QU2lkZXBhbmVsPXt0aGlzLnByb3BzLnJlZkNPTVBTaWRlcGFuZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5Q2FsbGJhY2s9e3RoaXMucHJvcHMuc2lkZXBhbmVsVmlzaWJpbGl0eUNhbGxiYWNrfVxuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM9e3RoaXMucHJvcHMuc2lkZXBhbmVsLnByb3BzfVxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgPE1heWVyc1JlbmRlcmVyIG1heWVycz17dGhpcy5wcm9wcy5tYXllcnN9IC8+XG4gICAgICAgICAgICAgICAgPEJsYW5rbWFza1JlbmRlcmVyXG4gICAgICAgICAgICAgICAgICAgIEdVSURpc2FibGVkPXt0aGlzLnByb3BzLkdVSURpc2FibGVkfVxuICAgICAgICAgICAgICAgICAgICBHVUlEaXNhYmxlQ292ZXI9e3RoaXMucHJvcHMuR1VJRGlzYWJsZUNvdmVyfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICB9XG59XG5pbnRlcmZhY2UgQ2hpbGRyZW5SZW5kZXJlclByb3BzIHtcbiAgICBjaGlsZHJlbjogUHJvcHNbXCJjaGlsZHJlblwiXTtcbn1cbmNvbnN0IENoaWxkcmVuUmVuZGVyZXIgPSBSZWFjdC5tZW1vPENoaWxkcmVuUmVuZGVyZXJQcm9wcz4oZnVuY3Rpb24gQ2hpbGRyZW5SZW5kZXJlcih7XG4gICAgY2hpbGRyZW4sXG4gICAgLi4ucmVzdFxufTogQ2hpbGRyZW5SZW5kZXJlclByb3BzKTogYW55IHtcbiAgICByZXR1cm4gdHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCIgPyBjaGlsZHJlbihyZXN0KSA6IGNoaWxkcmVuO1xufSk7XG5pbnRlcmZhY2UgTWF5ZXJzUmVuZGVyZXJQcm9wcyB7XG4gICAgbWF5ZXJzOiBQcm9wc1tcIm1heWVyc1wiXTtcbn1cbmNvbnN0IE1heWVyc1JlbmRlcmVyID0gUmVhY3QubWVtbzxNYXllcnNSZW5kZXJlclByb3BzPihmdW5jdGlvbiBNYXllcnNSZW5kZXJlcih7XG4gICAgbWF5ZXJzXG59OiBNYXllcnNSZW5kZXJlclByb3BzKTogYW55IHtcbiAgICByZXR1cm4gbWF5ZXJzLm1hcChcbiAgICAgICAgKHsgbmFtZSwgLi4ucHJvcHMgfSk6IFJlYWN0Tm9kZSA9PiB7XG4gICAgICAgICAgICByZXR1cm4gPEFpcnJNYXllciBrZXk9e25hbWV9IG5hbWU9e25hbWV9IHsuLi5wcm9wc30gLz47XG4gICAgICAgIH1cbiAgICApO1xufSk7XG5pbnRlcmZhY2UgU2lkZXBhbmVsUmVuZGVyZXJQcm9wcyB7XG4gICAgdHlwZToga2V5b2YgUmVhY3RIVE1MO1xuICAgIHByb3BzOiBTaWRlcGFuZWxQcm9wcztcbiAgICByZWZDT01QU2lkZXBhbmVsOiBQcm9wc1tcInJlZkNPTVBTaWRlcGFuZWxcIl07XG4gICAgdmlzaWJpbGl0eUNhbGxiYWNrOiBQcm9wc1tcInNpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFja1wiXTtcbn1cbmNvbnN0IFNpZGVwYW5lbFJlbmRlcmVyID0gUmVhY3QubWVtbzxTaWRlcGFuZWxSZW5kZXJlclByb3BzPihmdW5jdGlvbiBTaWRlcGFuZWxSZW5kZXJlcih7XG4gICAgdHlwZSxcbiAgICByZWZDT01QU2lkZXBhbmVsLFxuICAgIHZpc2liaWxpdHlDYWxsYmFjayxcbiAgICBwcm9wc1xufTogU2lkZXBhbmVsUmVuZGVyZXJQcm9wcyk6IGFueSB7XG4gICAgaWYgKCFwcm9wcy5yZWYpIHtcbiAgICAgICAgcHJvcHMucmVmID0gcmVmQ09NUFNpZGVwYW5lbDtcbiAgICB9XG4gICAgaWYgKCFwcm9wcy52aXNpYmlsaXR5Q2FsbGJhY2spIHtcbiAgICAgICAgcHJvcHMudmlzaWJpbGl0eUNhbGxiYWNrID0gdmlzaWJpbGl0eUNhbGxiYWNrO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHByb3BzLmVuYWJsZWQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgcHJvcHMuZW5hYmxlZCA9IHRydWU7IC8vZm9yY2UgZXhwbGljaXQgdmFsdWUsIGUuZyBuZWVkZWQgd2hlbiBjaGVja2luZyBpZiBwYW5lbCBpcyBlbmFibGVkIGluIGBvcGVuTWF5ZXJgIG1ldGhvZFxuICAgIH1cblxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KHR5cGUsIHByb3BzKTtcbn0pO1xuaW50ZXJmYWNlIEJsYW5rbWFza1JlbmRlcmVyUHJvcHMge1xuICAgIEdVSURpc2FibGVkOiBQcm9wc1tcIkdVSURpc2FibGVkXCJdO1xuICAgIEdVSURpc2FibGVDb3ZlcjogUHJvcHNbXCJHVUlEaXNhYmxlQ292ZXJcIl07XG59XG5jb25zdCBCbGFua21hc2tSZW5kZXJlciA9IFJlYWN0Lm1lbW88QmxhbmttYXNrUmVuZGVyZXJQcm9wcz4oZnVuY3Rpb24gQmxhbmttYXNrUmVuZGVyZXIoe1xuICAgIEdVSURpc2FibGVkLFxuICAgIEdVSURpc2FibGVDb3ZlclxufTogQmxhbmttYXNrUmVuZGVyZXJQcm9wcyk6IFJlYWN0RWxlbWVudDxhbnk+IHtcbiAgICByZXR1cm4gR1VJRGlzYWJsZWQgJiYgPGRpdiBjbGFzc05hbWU9XCJhaXJyLWJsYW5rLW1hc2tcIj57R1VJRGlzYWJsZUNvdmVyfTwvZGl2Pjtcbn0pO1xuaW50ZXJmYWNlIE5hdmJhclJlbmRlcmVyUHJvcHMge1xuICAgIG5hdmJhcjogUHJvcHNbXCJuYXZiYXJcIl07XG4gICAgYWN0aXZlVmlld0luZGV4OiBudW1iZXI7XG4gICAgYmFja0J1dHRvbk9uRmlyc3RWaWV3OiBQcm9wc1tcImJhY2tCdXR0b25PbkZpcnN0Vmlld1wiXTtcbiAgICBoYW5kbGVCYWNrQnV0dG9uOiBQcm9wc1tcImhhbmRsZUJhY2tCdXR0b25cIl07XG4gICAgYmFja0J1dHRvbjogUHJvcHNbXCJiYWNrQnV0dG9uXCJdO1xuICAgIG5hdmJhck1lbnU6IFByb3BzW1wibmF2YmFyTWVudVwiXTtcbiAgICBoYXNTaWRlcGFuZWw6IGJvb2xlYW47XG4gICAgaGFuZGxlTWVudUJ1dHRvblRvZ2dsZVNpZGVwYW5lbChlOiBTeW50aGV0aWNFdmVudDxIVE1MRWxlbWVudD4pOiB2b2lkO1xuICAgIG1vY2tWaWV3VGl0bGU6IFJlYWN0Tm9kZTtcbiAgICBhY3RpdmVWaWV3VGl0bGU6IFJlYWN0Tm9kZTtcbiAgICBuYXZiYXJDbGFzczogc3RyaW5nO1xuICAgIHJlZkRPTU5hdmJhcjogUHJvcHNbXCJyZWZET01OYXZiYXJcIl07XG4gICAgbmF2YmFySGVpZ2h0OiBQcm9wc1tcIm5hdmJhckhlaWdodFwiXTtcbn1cbmNvbnN0IE5hdmJhclJlbmRlcmVyID0gUmVhY3QubWVtbzxOYXZiYXJSZW5kZXJlclByb3BzPihmdW5jdGlvbiBOYXZiYXJSZW5kZXJlcih7XG4gICAgbmF2YmFyLFxuICAgIGFjdGl2ZVZpZXdJbmRleCxcbiAgICBiYWNrQnV0dG9uT25GaXJzdFZpZXcsXG4gICAgaGFuZGxlQmFja0J1dHRvbixcbiAgICBiYWNrQnV0dG9uLFxuICAgIG5hdmJhck1lbnUsXG4gICAgaGFzU2lkZXBhbmVsLFxuICAgIGhhbmRsZU1lbnVCdXR0b25Ub2dnbGVTaWRlcGFuZWwsXG4gICAgbW9ja1ZpZXdUaXRsZSxcbiAgICBhY3RpdmVWaWV3VGl0bGUsXG4gICAgbmF2YmFyQ2xhc3MsXG4gICAgcmVmRE9NTmF2YmFyLFxuICAgIG5hdmJhckhlaWdodFxufTogTmF2YmFyUmVuZGVyZXJQcm9wcyk6IGFueSB7XG4gICAgaWYgKG5hdmJhcikge1xuICAgICAgICBsZXQgbW9ja1RpdGxlID0gbnVsbDtcbiAgICAgICAgbGV0IHRpdGxlOiBSZWFjdE5vZGU7XG4gICAgICAgIGxldCBiYWNrID0gbnVsbDtcblxuICAgICAgICBpZiAoYmFja0J1dHRvbikge1xuICAgICAgICAgICAgY29uc3QgYmFja0NsYXNzTmFtZSA9XG4gICAgICAgICAgICAgICAgXCJiYWNrIFwiICsgKGFjdGl2ZVZpZXdJbmRleCA8IDEgJiYgIWJhY2tCdXR0b25PbkZpcnN0VmlldyA/IFwiaGlkZGVuXCIgOiBcIlwiKTtcbiAgICAgICAgICAgIGJhY2sgPSAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e2JhY2tDbGFzc05hbWV9IG9uQ2xpY2s9e2hhbmRsZUJhY2tCdXR0b259PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG1lbnU7XG4gICAgICAgIGlmIChuYXZiYXJNZW51KSB7XG4gICAgICAgICAgICBpZiAobmF2YmFyTWVudSA9PT0gXCJ0b2dnbGVTaWRlcGFuZWxcIikge1xuICAgICAgICAgICAgICAgIG1lbnUgPSBoYXNTaWRlcGFuZWwgPyAoXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibWVudVwiIG9uQ2xpY2s9e2hhbmRsZU1lbnVCdXR0b25Ub2dnbGVTaWRlcGFuZWx9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiAvPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApIDogbnVsbDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShuYXZiYXJNZW51KSkge1xuICAgICAgICAgICAgICAgIG1lbnUgPSA8ZGl2IGNsYXNzTmFtZT1cIm1lbnVcIj57bmF2YmFyTWVudX08L2Rpdj47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBuYXZiYXJTdHlsZTogQ1NTUHJvcGVydGllcyA9IHt9O1xuICAgICAgICBpZiAoWzEsIHRydWVdLmluZGV4T2YobmF2YmFyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIG5hdmJhclN0eWxlLnZpc2liaWxpdHkgPSBcImhpZGRlblwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKG1vY2tWaWV3VGl0bGUpIHtcbiAgICAgICAgICAgIG1vY2tUaXRsZSA9IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vY2stdGl0bGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+e2FjdGl2ZVZpZXdUaXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGl0bGUgPSBtb2NrVmlld1RpdGxlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGl0bGUgPSBhY3RpdmVWaWV3VGl0bGU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17XCJhaXJyLW5hdmJhciBcIiArICh0eXBlb2YgbmF2YmFyQ2xhc3MgPT09IFwic3RyaW5nXCIgPyBuYXZiYXJDbGFzcyA6IFwiXCIpfVxuICAgICAgICAgICAgICAgIHJlZj17cmVmRE9NTmF2YmFyfVxuICAgICAgICAgICAgICAgIHN0eWxlPXtuYXZiYXJTdHlsZX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPXt7IGhlaWdodDogbmF2YmFySGVpZ2h0ICsgXCJweFwiIH19PlxuICAgICAgICAgICAgICAgICAgICB7bW9ja1RpdGxlfVxuICAgICAgICAgICAgICAgICAgICB7YmFja31cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJ0aXRsZVwiIHN0eWxlPXt7IG9wYWNpdHk6IG1vY2tWaWV3VGl0bGUgPyAwIDogMSB9fT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0aXRsZX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB7bWVudX1cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn0pO1xuaW50ZXJmYWNlIFZpZXdzTWFwcGVyUHJvcHMge1xuICAgIHZpZXdzOiBQcm9wc1tcInZpZXdzXCJdO1xuICAgIGFjdGl2ZVZpZXdOYW1lOiBQcm9wc1tcImFjdGl2ZVZpZXdOYW1lXCJdO1xuICAgIHJlZnNDT01QVmlld3M6IFByb3BzW1wicmVmc0NPTVBWaWV3c1wiXTtcbn1cbmNvbnN0IFZpZXdzTWFwcGVyID0gUmVhY3QubWVtbzxWaWV3c01hcHBlclByb3BzPihmdW5jdGlvbiBWaWV3c01hcHBlcih7XG4gICAgdmlld3MsXG4gICAgYWN0aXZlVmlld05hbWUsXG4gICAgcmVmc0NPTVBWaWV3c1xufTogVmlld3NNYXBwZXJQcm9wcyk6IGFueSB7XG4gICAgcmV0dXJuIHZpZXdzLm1hcChcbiAgICAgICAgKGl0ZW0pOiBSZWFjdE5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKGl0ZW0ucHJvcHMubmFtZSA9PT0gYWN0aXZlVmlld05hbWUpIHtcbiAgICAgICAgICAgICAgICBpdGVtLnByb3BzLmFjdGl2ZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHMuYWN0aXZlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ucHJvcHMua2V5ID0gaXRlbS5wcm9wcy5uYW1lO1xuICAgICAgICAgICAgaWYgKCFpdGVtLnByb3BzLnJlZikge1xuICAgICAgICAgICAgICAgIGl0ZW0ucHJvcHMucmVmID0gUmVhY3QuY3JlYXRlUmVmPEFpcnJWaWV3PigpO1xuICAgICAgICAgICAgICAgIHJlZnNDT01QVmlld3NbaXRlbS5wcm9wcy5uYW1lXSA9IGl0ZW0ucHJvcHMucmVmO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChpdGVtLnR5cGUsIGl0ZW0ucHJvcHMpO1xuICAgICAgICB9XG4gICAgKTtcbn0pO1xuaW50ZXJmYWNlIFZpZXdzUmVuZGVyZXJQcm9wcyBleHRlbmRzIFZpZXdzTWFwcGVyUHJvcHMge1xuICAgIGNsYXNzTmFtZTogUHJvcHNbXCJjbGFzc05hbWVcIl07XG4gICAgcmVmRE9NQ29udGFpbmVyOiBQcm9wc1tcInJlZkRPTUNvbnRhaW5lclwiXTtcbiAgICBjb250YWluZXJzSGVpZ2h0OiBQcm9wc1tcImNvbnRhaW5lcnNIZWlnaHRcIl07XG59XG5cbmNvbnN0IFZpZXdzUmVuZGVyZXIgPSBSZWFjdC5tZW1vPFZpZXdzUmVuZGVyZXJQcm9wcz4oZnVuY3Rpb24gVmlld3NSZW5kZXJlcih7XG4gICAgdmlld3MsXG4gICAgY2xhc3NOYW1lID0gXCJcIixcbiAgICByZWZET01Db250YWluZXIsXG4gICAgYWN0aXZlVmlld05hbWUsXG4gICAgY29udGFpbmVyc0hlaWdodCxcbiAgICByZWZzQ09NUFZpZXdzXG59OiBWaWV3c1JlbmRlcmVyUHJvcHMpOiBSZWFjdEVsZW1lbnQ8YW55PiB7XG4gICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtcImFpcnItY29udGFpbmVyIFwiICsgY2xhc3NOYW1lfVxuICAgICAgICAgICAgcmVmPXtyZWZET01Db250YWluZXJ9XG4gICAgICAgICAgICBzdHlsZT17Y29udGFpbmVyc0hlaWdodCA/IHsgaGVpZ2h0OiBjb250YWluZXJzSGVpZ2h0IH0gOiBudWxsfVxuICAgICAgICA+XG4gICAgICAgICAgICA8Vmlld3NNYXBwZXJcbiAgICAgICAgICAgICAgICB2aWV3cz17dmlld3N9XG4gICAgICAgICAgICAgICAgYWN0aXZlVmlld05hbWU9e2FjdGl2ZVZpZXdOYW1lfVxuICAgICAgICAgICAgICAgIHJlZnNDT01QVmlld3M9e3JlZnNDT01QVmlld3N9XG4gICAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICApO1xufSk7XG4iXX0=