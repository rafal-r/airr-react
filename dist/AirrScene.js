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

      return isAnyViewActive;
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
      key: name
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyU2NlbmUudHN4Il0sIm5hbWVzIjpbInNjZW5lRGVmYXVsdFByb3BzIiwibmFtZSIsImFjdGl2ZVZpZXdOYW1lIiwiR1VJRGlzYWJsZWQiLCJHVUlEaXNhYmxlQ292ZXIiLCJhbmltYXRpb24iLCJhbmltYXRpb25UaW1lIiwibmF2YmFyIiwibmF2YmFySGVpZ2h0IiwibmF2YmFyTWVudSIsIm5hdmJhckNsYXNzIiwiYmFja0J1dHRvbiIsImJhY2tCdXR0b25PbkZpcnN0VmlldyIsImhhbmRsZUJhY2tCdXR0b24iLCJoYW5kbGVCYWNrQmVoYXZpb3VyT25GaXJzdFZpZXciLCJhY3RpdmUiLCJzaWRlcGFuZWwiLCJ2aWV3cyIsIm1heWVycyIsInRpdGxlIiwiY2xhc3NOYW1lIiwic2lkZXBhbmVsVmlzaWJpbGl0eUNhbGxiYWNrIiwiY2hpbGRyZW4iLCJBaXJyU2NlbmUiLCJlIiwiYmFja0J0biIsImN1cnJlbnRUYXJnZXQiLCJjbGFzc0xpc3QiLCJhZGQiLCJzZXRUaW1lb3V0IiwicmVtb3ZlIiwiZ2V0Vmlld0luZGV4IiwicHJvcHMiLCJjb25zb2xlIiwid2FybiIsInJlZkNPTVBTaWRlcGFuZWwiLCJjdXJyZW50IiwiaXNTaG93biIsImhpZGUiLCJzaG93IiwiaXNBbnlWaWV3QWN0aXZlIiwic29tZSIsInZpZXciLCJ2aWV3TmFtZSIsImZpbmRJbmRleCIsImNvbmZpZyIsImNoZWNrVmFsaWRBY3RpdmVWaWV3IiwiYWN0aXZlVmlld0luZGV4IiwibW9ja1ZpZXdUaXRsZSIsIm1vY2tUaXRsZU5hbWUiLCJtb2NrVmlld0luZGV4IiwibW9ja1ZpZXciLCJyZWZET00iLCJCb29sZWFuIiwiaGFuZGxlTWVudUJ1dHRvblRvZ2dsZVNpZGVwYW5lbCIsInJlZkRPTU5hdmJhciIsInJlZnNDT01QVmlld3MiLCJyZWZET01Db250YWluZXIiLCJjb250YWluZXJzSGVpZ2h0IiwidHlwZSIsIlB1cmVDb21wb25lbnQiLCJDaGlsZHJlblJlbmRlcmVyIiwiUmVhY3QiLCJtZW1vIiwicmVzdCIsIk1heWVyc1JlbmRlcmVyIiwibWFwIiwiU2lkZXBhbmVsUmVuZGVyZXIiLCJ2aXNpYmlsaXR5Q2FsbGJhY2siLCJyZWYiLCJlbmFibGVkIiwiY3JlYXRlRWxlbWVudCIsIkJsYW5rbWFza1JlbmRlcmVyIiwiTmF2YmFyUmVuZGVyZXIiLCJoYXNTaWRlcGFuZWwiLCJhY3RpdmVWaWV3VGl0bGUiLCJtb2NrVGl0bGUiLCJiYWNrIiwiYmFja0NsYXNzTmFtZSIsIm1lbnUiLCJBcnJheSIsImlzQXJyYXkiLCJuYXZiYXJTdHlsZSIsImluZGV4T2YiLCJ2aXNpYmlsaXR5IiwiaGVpZ2h0Iiwib3BhY2l0eSIsIlZpZXdzTWFwcGVyIiwiaXRlbSIsImtleSIsImNyZWF0ZVJlZiIsIlZpZXdzUmVuZGVyZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTs7QUFVQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdJTyxJQUFNQSxpQkFBaUMsR0FBRztBQUM3Q0MsRUFBQUEsSUFBSSxFQUFFLEVBRHVDO0FBRzdDQyxFQUFBQSxjQUFjLEVBQUUsSUFINkI7QUFJN0NDLEVBQUFBLFdBQVcsRUFBRSxLQUpnQztBQUs3Q0MsRUFBQUEsZUFBZSxFQUFFLElBTDRCO0FBTTdDQyxFQUFBQSxTQUFTLEVBQUUsT0FOa0M7QUFPN0NDLEVBQUFBLGFBQWEsRUFBRSxHQVA4QjtBQVE3Q0MsRUFBQUEsTUFBTSxFQUFFLEtBUnFDO0FBUzdDQyxFQUFBQSxZQUFZLEVBQUUsRUFUK0I7QUFVN0NDLEVBQUFBLFVBQVUsRUFBRSxJQVZpQztBQVc3Q0MsRUFBQUEsV0FBVyxFQUFFLEVBWGdDO0FBWTdDQyxFQUFBQSxVQUFVLEVBQUUsS0FaaUM7QUFhN0NDLEVBQUFBLHFCQUFxQixFQUFFLEtBYnNCO0FBYzdDQyxFQUFBQSxnQkFBZ0IsRUFBRSxJQWQyQjtBQWU3Q0MsRUFBQUEsOEJBQThCLEVBQUUsSUFmYTtBQWdCN0NDLEVBQUFBLE1BQU0sRUFBRSxLQWhCcUM7QUFpQjdDQyxF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OUI7QUFBQSxNQU5uQjFFLEtBTW1CLFNBTm5CQSxLQU1tQjtBQUFBLDhCQUxuQkcsU0FLbUI7QUFBQSxNQUxuQkEsU0FLbUIsZ0NBTFAsRUFLTztBQUFBLE1BSm5CcUMsZUFJbUIsU0FKbkJBLGVBSW1CO0FBQUEsTUFIbkJ2RCxjQUdtQixTQUhuQkEsY0FHbUI7QUFBQSxNQUZuQndELGdCQUVtQixTQUZuQkEsZ0JBRW1CO0FBQUEsTUFEbkJGLGFBQ21CLFNBRG5CQSxhQUNtQjtBQUNuQixTQUNJO0FBQ0ksSUFBQSxTQUFTLEVBQUUsb0JBQW9CcEMsU0FEbkM7QUFFSSxJQUFBLEdBQUcsRUFBRXFDLGVBRlQ7QUFHSSxJQUFBLEtBQUssRUFBRUMsZ0JBQWdCLEdBQUc7QUFBRTJCLE1BQUFBLE1BQU0sRUFBRTNCO0FBQVYsS0FBSCxHQUFrQztBQUg3RCxLQUtJLG9CQUFDLFdBQUQ7QUFDSSxJQUFBLEtBQUssRUFBRXpDLEtBRFg7QUFFSSxJQUFBLGNBQWMsRUFBRWYsY0FGcEI7QUFHSSxJQUFBLGFBQWEsRUFBRXNEO0FBSG5CLElBTEosQ0FESjtBQWFILENBckJxQixDQUF0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHtcbiAgICBQdXJlQ29tcG9uZW50LFxuICAgIFN5bnRoZXRpY0V2ZW50LFxuICAgIFJlYWN0SFRNTCxcbiAgICBSZWFjdE5vZGUsXG4gICAgUmVmT2JqZWN0LFxuICAgIENTU1Byb3BlcnRpZXNcbn0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWlyclZpZXcgZnJvbSBcIi4vQWlyclZpZXdcIjtcbmltcG9ydCBBaXJyTWF5ZXIsIHsgUHJvcHMgYXMgTWF5ZXJQcm9wcyB9IGZyb20gXCIuL0FpcnJNYXllclwiO1xuaW1wb3J0IEFpcnJTaWRlcGFuZWwsIHsgUHJvcHMgYXMgU2lkZXBhbmVsUHJvcHMgfSBmcm9tIFwiLi9BaXJyU2lkZXBhbmVsXCI7XG5pbXBvcnQgeyBBbmltYXRpb25UeXBlLCBWaWV3Q29uZmlnLCBOYXZiYXJNZW51IH0gZnJvbSBcIi4vVHlwZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBDb3JlU2NlbmVQcm9wcyB7XG4gICAgLyoqXG4gICAgICogVGhlIG5hbWUgb2YgdGhlIHNjZW5lLiBNdXN0IGJlIHVuaXF1ZSBhbW9uZyBvdGhlcnMgdmlld3MgaW4gcGFyZW50IHNjZW5lLiBXaWxsIGJlIHVzZWQgYXMgaWRlbnRpZmljYXRpb24gc3RyaW5nXG4gICAgICovXG4gICAgbmFtZTogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGFjdGl2ZSB2aWV3LlxuICAgICAqL1xuICAgIGFjdGl2ZVZpZXdOYW1lOiBzdHJpbmc7XG4gICAgLyoqXG4gICAgICogQm9vbGVhbiB0ZWxsaW5nIGlmIEdVSSBzaG91bGQgYmUgZGlzYWJsZWQgbWVhbmluZyBubyB1c2VyIGFjdGlvbnMsIGV2ZW50cyBhcmUgYWxsb3dlZC5cbiAgICAgKiBHVUkgaXMgZGlzYWJsZWQgdmlhIGFic29sdXRlIHBvc2l0aW9uZWQsIG5vdCB2aXNpYmxlIGRpdiB0aGF0IGhhcyB0aGUgYmlnZ2VzdCB6LUluZGV4XG4gICAgICovXG4gICAgR1VJRGlzYWJsZWQ6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogUmVhY3QgZWxlbWVudCB0byBiZSBwbGFjZWQgaW4gR1VJIGRpc2FibGluZyBkaXZcbiAgICAgKi9cbiAgICBHVUlEaXNhYmxlQ292ZXI/OiBSZWFjdE5vZGU7XG4gICAgLyoqXG4gICAgICogVHlwZSBvZiBhbmltYXRpb24gdG8gcGVyZm9ybSB3aGVuIHN3aXRjaGluZyB2aWV3c1xuICAgICAqL1xuICAgIGFuaW1hdGlvbjogQW5pbWF0aW9uVHlwZTtcbiAgICAvKipcbiAgICAgKiBUaW1lIG9mIHZpZXdzIGNoYW5naW5nIGFuaW1hdGlvbiBpbiBtaWxpc2Vjb25kc1xuICAgICAqL1xuICAgIGFuaW1hdGlvblRpbWU6IG51bWJlcjtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZ5IGlmIG5hdmJhciBpcyBwcmVzZW50ICgxLHRydWUpIG9yIG5vdCAoMCxmYWxzZSkuIE9yIG1heWJlIGhpZGRlbiAoLTEpXG4gICAgICovXG4gICAgbmF2YmFyOiAxIHwgdHJ1ZSB8IC0xIHwgMCB8IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiB0aGUgbmF2YmFyIGluIHBpeGVsc1xuICAgICAqL1xuICAgIG5hdmJhckhlaWdodDogbnVtYmVyO1xuICAgIC8qKlxuICAgICAqIE5hdmJhciBtZW51IGlzIHBsYWNlZCBvbiB0aGUgcmlnaHQgbW9zdCBzaWRlLiBNaWdodCBjb250YWluIFwidG9nZ2xlU2lkZXBhbmVsXCIgYnV0dG9uIG9yIGFueSBjdXN0b20gYnV0dG9ucyBsaXN0LlxuICAgICAqL1xuICAgIG5hdmJhck1lbnU/OiBOYXZiYXJNZW51O1xuICAgIC8qKlxuICAgICAqIEV4dHJhLCBzcGFjZSBzZXBhcmF0ZWQsIG5hdmJhcidzIGNsYXNzIG5hbWVzIGxpc3RcbiAgICAgKi9cbiAgICBuYXZiYXJDbGFzczogc3RyaW5nO1xuICAgIC8qKlxuICAgICAqIEJvb2xlYW4gc3BlY2lmaW5nIGlmIG5hdmJhciByZW5kZXJzIEJhY2tCdXR0b24uIFBsYWNlZCBieSBkZWZhdWx0IG9uIHRoZSBsZWZ0IHNpZGUgb2YgbmF2YmFyLlxuICAgICAqL1xuICAgIGJhY2tCdXR0b246IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRG8geW91IG5lZWQgdG8gc3RpbGwgc2hvdyBiYWNrQnV0dG9uIGV2ZW4gaWYgc2NlbmUgaXMgcmVuZGVyaW5nIGZpcnN0IHZpZXcgZnJvbSBzdGFjaz9cbiAgICAgKi9cbiAgICBiYWNrQnV0dG9uT25GaXJzdFZpZXc6IGJvb2xlYW47XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdGhhdCB3aWxsIGhhbmRsZSBiYWNrIGJ1dHRvbiBjbGljayBldmVudHNcbiAgICAgKi9cbiAgICBoYW5kbGVCYWNrQnV0dG9uPyhlOiBTeW50aGV0aWNFdmVudDxIVE1MRWxlbWVudD4pOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIEZ1bmN0aW9uIHRoYXQgd2lsbCBoYW5kbGUgYmFjayBidXR0b24gY2xpY2tzIGV2ZW50cyBvbiB3aGVuIGZpcnN0IHZpZXcgaW4gc3RhY2sgaXMgYWN0aXZlXG4gICAgICovXG4gICAgaGFuZGxlQmFja0JlaGF2aW91ck9uRmlyc3RWaWV3PygpOiB2b2lkO1xuICAgIC8qKlxuICAgICAqIElzIHRoaXMgdmlldyBhY3RpdmUgaW4gcGFyZW50IHNjZW5lXG4gICAgICovXG4gICAgYWN0aXZlOiBib29sZWFuO1xuICAgIC8qKlxuICAgICAqIFNpZGVwYW5lbHMgZGVjbGFyYXRpb24uIE11c3QgY29udGFpbiB0d28gcHJvcGVydGllczogYHR5cGVgIGFuZCBgcHJvcHNgXG4gICAgICoqL1xuICAgIHNpZGVwYW5lbDoge1xuICAgICAgICAvKipcbiAgICAgICAgICogZmVyZW5jZSB0byBjbGFzcyBvciBmdW5jdGlvbiB0aGF0IHdpbGwgcmVuZGVyIEFpcnJTaWRlcGFuZWwuIE1pZ2h0IGJlIEFpcnJTaWRlcGFuZWwgaXRzZWxmLlxuICAgICAgICAgKi9cbiAgICAgICAgdHlwZToga2V5b2YgUmVhY3RIVE1MO1xuICAgICAgICAvKipcbiAgICAgICAgICogU3BlY2lhbCBwcm9wZXJ0aWVzIG9mIEFpcnJTaWRlcGFuZWwgY2xhc3MuIEdvIHRvIGNsYXNzIGRlY2xhcmF0aW9uIGZvciBmdXJ0aGVyIHByb3BlcnRpZXMgZG9jdW1lbmF0aW9uLlxuICAgICAgICAgKi9cbiAgICAgICAgcHJvcHM6IFNpZGVwYW5lbFByb3BzO1xuICAgIH07XG4gICAgLyoqXG4gICAgICogVGhpcyBmdW5jdGlvbiB3aWxsIGJlIGNhbGxlZCB3aGVuIHNpZGVwYW5lbCBjaGFuZ2VzIGl0J3MgdmlzaWJpbGl0eS5cbiAgICAgKiBJdCdzIGFyZ3VtZW50IHdpbGwgYmUgaXNTaG93biBib29sLlxuICAgICAqL1xuICAgIHNpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjayhpc1Nob3duOiBib29sZWFuKTogdm9pZDtcbiAgICAvKipcbiAgICAgKiBBcnJheSBvZiBgdmlld3NgLiBFdmVyeSB2aWV3IG9iamVjdCBkZWNsYXJhdGlvbiBtdXN0IGNvbnRhaW4gdHdvIHByb3BlcnRpZXM6IGB0eXBlYCBhbmQgYHByb3BzYC5cbiAgICAgKi9cbiAgICB2aWV3czogVmlld0NvbmZpZ1tdO1xuICAgIC8qKlxuICAgICAqIEFycmF5IG9mIGBtYXllcnNgIG9iamVjdHMgdGhhdCB3aWxsIGJlIHJlbmRlciBpbnRvIHRoaXMgU2NlbmUuIE11c3QgY29udGFpbiBzcGVjaWFsIEFpcnJNYXllciBjbGFzcyBwcm9wZXJ0aWVzLlxuICAgICAqIFRvIGNoZWNrIHRoZSBwb3NzaWJsZSB2YWx1ZXMgb2YgcHJvcGVydGllcyBnbyB0byBBaXJyTWF5ZXIgZGVjbGFyYXRpb24uXG4gICAgICovXG4gICAgbWF5ZXJzOiBNYXllclByb3BzW107XG4gICAgLyoqXG4gICAgICogVGl0bGUgdGhhdCB3aWxsIGJlIHVzZSBpbiBwYXJlbnQgU2NlbmUgbmF2YmFyIHRpdGxlIHNlY3Rpb25cbiAgICAgKi9cbiAgICB0aXRsZTogUmVhY3ROb2RlO1xuICAgIC8qKlxuICAgICAqIEV4dHJhLCBzcGFjZSBzZXBhcmF0ZWQgY2xhc3NlcyBuYW1lcyB0byB1c2UgdXBvbiBmaXJzdCBkaXYgZWxlbWVudC5cbiAgICAgKi9cbiAgICBjbGFzc05hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBDaGlsZHJlbiBwcm9wXG4gICAgICovXG4gICAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgUHJvcHMgZXh0ZW5kcyBDb3JlU2NlbmVQcm9wcyB7XG4gICAgLyoqXG4gICAgICogUmVhY3QgY29tcG9uZW50J3MgcmVmIG9iamVjdFxuICAgICAqL1xuICAgIHJlZkNPTVBTaWRlcGFuZWw6IFJlZk9iamVjdDxBaXJyU2lkZXBhbmVsPjtcbiAgICAvKipcbiAgICAgKiBSZWFjdCByZWYgdG8gZG9tIG9iamVjdFxuICAgICAqL1xuICAgIHJlZkRPTTogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcbiAgICAvKipcbiAgICAgKiBSZWFjdCByZWYgdG8gZG9tIG9iamVjdFxuICAgICAqL1xuICAgIHJlZkRPTU5hdmJhcjogUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PjtcbiAgICAvKipcbiAgICAgKiBPYmplY3Qgb2YgUmVhY3QgcmVmcyBjb21wb25lbnRzIHNwZWNpZmllZCB1bmRlciBzdHJpbmcga2V5c1xuICAgICAqL1xuICAgIHJlZnNDT01QVmlld3M6IHsgW25hbWU6IHN0cmluZ106IFJlZk9iamVjdDxQdXJlQ29tcG9uZW50PiB9O1xuICAgIC8qKlxuICAgICAqIFJlYWN0IGNvbXBvbmVudCdzIHJlZiBvYmplY3RcbiAgICAgKi9cbiAgICByZWZET01Db250YWluZXI6IFJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD47XG4gICAgLyoqXG4gICAgICogSW5uZXIsIHByaXZhdGUgcHJvcCBmb3IgbWFuaXB1bGF0aW5nIG5hdmJhciB0aXRsZVxuICAgICAqL1xuICAgIG1vY2tUaXRsZU5hbWU6IHN0cmluZztcbiAgICAvKipcbiAgICAgKiBJbm5lciwgcHJpdmF0ZSBwcm9wIHdpdGggY29udGFpbmVycyBoZWlnaHQgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICBjb250YWluZXJzSGVpZ2h0OiBudW1iZXI7XG59XG5leHBvcnQgY29uc3Qgc2NlbmVEZWZhdWx0UHJvcHM6IENvcmVTY2VuZVByb3BzID0ge1xuICAgIG5hbWU6IFwiXCIsXG5cbiAgICBhY3RpdmVWaWV3TmFtZTogbnVsbCxcbiAgICBHVUlEaXNhYmxlZDogZmFsc2UsXG4gICAgR1VJRGlzYWJsZUNvdmVyOiBudWxsLFxuICAgIGFuaW1hdGlvbjogXCJzbGlkZVwiLFxuICAgIGFuaW1hdGlvblRpbWU6IDMwMCxcbiAgICBuYXZiYXI6IGZhbHNlLFxuICAgIG5hdmJhckhlaWdodDogNDgsXG4gICAgbmF2YmFyTWVudTogbnVsbCxcbiAgICBuYXZiYXJDbGFzczogXCJcIixcbiAgICBiYWNrQnV0dG9uOiBmYWxzZSxcbiAgICBiYWNrQnV0dG9uT25GaXJzdFZpZXc6IGZhbHNlLFxuICAgIGhhbmRsZUJhY2tCdXR0b246IG51bGwsXG4gICAgaGFuZGxlQmFja0JlaGF2aW91ck9uRmlyc3RWaWV3OiBudWxsLFxuICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgc2lkZXBhbmVsOiBudWxsLFxuICAgIHZpZXdzOiBbXSxcbiAgICBtYXllcnM6IFtdLFxuICAgIHRpdGxlOiBcIlwiLFxuICAgIGNsYXNzTmFtZTogXCJcIixcbiAgICBzaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2s6IG51bGwsXG4gICAgY2hpbGRyZW46IG51bGxcbn07XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBBaXJyU2NlbmUgZXh0ZW5kcyBQdXJlQ29tcG9uZW50PFByb3BzPiB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wczogUHJvcHMgPSB7XG4gICAgICAgIC4uLnNjZW5lRGVmYXVsdFByb3BzLFxuICAgICAgICByZWZDT01QU2lkZXBhbmVsOiBudWxsLFxuICAgICAgICByZWZET006IG51bGwsXG4gICAgICAgIHJlZkRPTU5hdmJhcjogbnVsbCxcbiAgICAgICAgcmVmc0NPTVBWaWV3czogbnVsbCxcbiAgICAgICAgcmVmRE9NQ29udGFpbmVyOiBudWxsLFxuICAgICAgICBtb2NrVGl0bGVOYW1lOiBcIlwiLFxuICAgICAgICBjb250YWluZXJzSGVpZ2h0OiBudWxsXG4gICAgfTtcbiAgICAvKipcbiAgICAgKiBNYXllcnMgQ29tcG9uZW50cyByZWZmZXJlbmNpZXNcbiAgICAgKi9cbiAgICBtYXllcnNDb21wc1JlZnMgPSB7fTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdmlldyBpbmRleCBmcm9tIHRoaXMucHJvcHMudmlld3MgYXJyYXlcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3TmFtZVxuICAgICAqIEByZXR1cm5zIHtOdW1iZXJ9XG4gICAgICovXG4gICAgZ2V0Vmlld0luZGV4KHZpZXdOYW1lOiBzdHJpbmcpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy52aWV3cy5maW5kSW5kZXgoY29uZmlnID0+IGNvbmZpZy5wcm9wcy5uYW1lID09PSB2aWV3TmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSGFuZGxlcyBuYXZiYXIgYmFja2J1dHRvbiB0YXAgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudCBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBoYW5kbGVCYWNrQnV0dG9uID0gKGU6IFN5bnRoZXRpY0V2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBjb25zdCBiYWNrQnRuID0gZS5jdXJyZW50VGFyZ2V0O1xuICAgICAgICBiYWNrQnRuLmNsYXNzTGlzdC5hZGQoXCJjbGlja2VkXCIpO1xuXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgYmFja0J0bi5jbGFzc0xpc3QucmVtb3ZlKFwiY2xpY2tlZFwiKTtcbiAgICAgICAgfSwgMzAwKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICB0aGlzLmdldFZpZXdJbmRleCh0aGlzLnByb3BzLmFjdGl2ZVZpZXdOYW1lKSA9PT0gMCAmJlxuICAgICAgICAgICAgdGhpcy5wcm9wcy5oYW5kbGVCYWNrQmVoYXZpb3VyT25GaXJzdFZpZXdcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy5oYW5kbGVCYWNrQmVoYXZpb3VyT25GaXJzdFZpZXcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhhbmRsZUJhY2tCdXR0b24pIHtcbiAgICAgICAgICAgIHRoaXMucHJvcHMuaGFuZGxlQmFja0J1dHRvbihlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltBaXJyXSBCYWNrIGJ1dHRvbiBoYW5kbGVyIHdhcyBub3Qgc3BlY2lmaWVkLlwiKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIYW5kbGVzIG5hdmJhciBtZW51IGJ1dHRvbiB0YXAgZXZlbnRzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gZSBFdmVudCBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7dm9pZH1cbiAgICAgKi9cbiAgICBoYW5kbGVNZW51QnV0dG9uVG9nZ2xlU2lkZXBhbmVsID0gKGU6IFN5bnRoZXRpY0V2ZW50PEhUTUxFbGVtZW50PikgPT4ge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5yZWZDT01QU2lkZXBhbmVsICYmIHRoaXMucHJvcHMucmVmQ09NUFNpZGVwYW5lbC5jdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnByb3BzLnJlZkNPTVBTaWRlcGFuZWwuY3VycmVudC5pc1Nob3duKClcbiAgICAgICAgICAgICAgICA/IHRoaXMucHJvcHMucmVmQ09NUFNpZGVwYW5lbC5jdXJyZW50LmhpZGUoKVxuICAgICAgICAgICAgICAgIDogdGhpcy5wcm9wcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQuc2hvdygpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIGNoZWNrVmFsaWRBY3RpdmVWaWV3ID0gKCkgPT4ge1xuICAgICAgICBjb25zdCBpc0FueVZpZXdBY3RpdmUgPSB0aGlzLnByb3BzLnZpZXdzLnNvbWUoXG4gICAgICAgICAgICB2aWV3ID0+IHZpZXcucHJvcHMubmFtZSA9PT0gdGhpcy5wcm9wcy5hY3RpdmVWaWV3TmFtZVxuICAgICAgICApO1xuXG4gICAgICAgIGlmICghaXNBbnlWaWV3QWN0aXZlKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXG4gICAgICAgICAgICAgICAgXCJbQWlycl0gTm8gdmlldyB3YXMgc2V0IGFzIGFjdGl2ZVwiICtcbiAgICAgICAgICAgICAgICAgICAgKHRoaXMucHJvcHMubmFtZSAmJiBcIiBpbiBTY2VuZSBuYW1lZCBgXCIgKyB0aGlzLnByb3BzLm5hbWUgKyBcImBcIikgK1xuICAgICAgICAgICAgICAgICAgICBcIi5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpc0FueVZpZXdBY3RpdmU7XG4gICAgfTtcblxuICAgIHJlbmRlcigpOiBSZWFjdE5vZGUge1xuICAgICAgICBsZXQgY2xhc3NOYW1lID0gXCJhaXJyLXZpZXcgYWlyci1zY2VuZVwiO1xuICAgICAgICB0aGlzLnByb3BzLmFjdGl2ZSAmJiAoY2xhc3NOYW1lICs9IFwiIGFjdGl2ZVwiKTtcbiAgICAgICAgdGhpcy5wcm9wcy5jbGFzc05hbWUgJiYgKGNsYXNzTmFtZSArPSBcIiBcIiArIHRoaXMucHJvcHMuY2xhc3NOYW1lKTtcblxuICAgICAgICB0aGlzLmNoZWNrVmFsaWRBY3RpdmVWaWV3KCk7XG5cbiAgICAgICAgY29uc3QgYWN0aXZlVmlld0luZGV4ID0gdGhpcy5nZXRWaWV3SW5kZXgodGhpcy5wcm9wcy5hY3RpdmVWaWV3TmFtZSk7XG4gICAgICAgIGxldCBtb2NrVmlld1RpdGxlO1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5tb2NrVGl0bGVOYW1lKSB7XG4gICAgICAgICAgICBjb25zdCBtb2NrVmlld0luZGV4ID0gdGhpcy5nZXRWaWV3SW5kZXgodGhpcy5wcm9wcy5tb2NrVGl0bGVOYW1lKTtcbiAgICAgICAgICAgIGlmIChtb2NrVmlld0luZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2NrVmlldyA9IHRoaXMucHJvcHMudmlld3NbbW9ja1ZpZXdJbmRleF07XG4gICAgICAgICAgICAgICAgaWYgKG1vY2tWaWV3LnByb3BzLnRpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIG1vY2tWaWV3VGl0bGUgPSBtb2NrVmlldy5wcm9wcy50aXRsZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc05hbWV9IHJlZj17dGhpcy5wcm9wcy5yZWZET019PlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiY29udGVudC13cmFwXCI+XG4gICAgICAgICAgICAgICAgICAgIDxOYXZiYXJSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgICAgbmF2YmFyPXt0aGlzLnByb3BzLm5hdmJhcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVZpZXdJbmRleD17YWN0aXZlVmlld0luZGV4fVxuICAgICAgICAgICAgICAgICAgICAgICAgYmFja0J1dHRvbk9uRmlyc3RWaWV3PXt0aGlzLnByb3BzLmJhY2tCdXR0b25PbkZpcnN0Vmlld31cbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tCdXR0b249e3RoaXMucHJvcHMuYmFja0J1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhbmRsZUJhY2tCdXR0b249e3RoaXMuaGFuZGxlQmFja0J1dHRvbn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmJhck1lbnU9e3RoaXMucHJvcHMubmF2YmFyTWVudX1cbiAgICAgICAgICAgICAgICAgICAgICAgIGhhc1NpZGVwYW5lbD17Qm9vbGVhbih0aGlzLnByb3BzLnNpZGVwYW5lbCl9XG4gICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGVNZW51QnV0dG9uVG9nZ2xlU2lkZXBhbmVsPXt0aGlzLmhhbmRsZU1lbnVCdXR0b25Ub2dnbGVTaWRlcGFuZWx9XG4gICAgICAgICAgICAgICAgICAgICAgICBuYXZiYXJDbGFzcz17dGhpcy5wcm9wcy5uYXZiYXJDbGFzc31cbiAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tWaWV3VGl0bGU9e21vY2tWaWV3VGl0bGV9XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVWaWV3VGl0bGU9e1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudmlld3NbYWN0aXZlVmlld0luZGV4XSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucHJvcHMudmlld3NbYWN0aXZlVmlld0luZGV4XS5wcm9wcy50aXRsZVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmRE9NTmF2YmFyPXt0aGlzLnByb3BzLnJlZkRPTU5hdmJhcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIG5hdmJhckhlaWdodD17dGhpcy5wcm9wcy5uYXZiYXJIZWlnaHR9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgICAgIDxWaWV3c1JlbmRlcmVyXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e3RoaXMucHJvcHMuYW5pbWF0aW9uID8gdGhpcy5wcm9wcy5hbmltYXRpb24gKyBcIi1hbmltYXRpb25cIiA6IFwiXCJ9XG4gICAgICAgICAgICAgICAgICAgICAgICByZWZzQ09NUFZpZXdzPXt0aGlzLnByb3BzLnJlZnNDT01QVmlld3N9XG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVWaWV3TmFtZT17dGhpcy5wcm9wcy5hY3RpdmVWaWV3TmFtZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdzPXt0aGlzLnByb3BzLnZpZXdzfVxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmRE9NQ29udGFpbmVyPXt0aGlzLnByb3BzLnJlZkRPTUNvbnRhaW5lcn1cbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRhaW5lcnNIZWlnaHQ9e3RoaXMucHJvcHMuY29udGFpbmVyc0hlaWdodH1cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8Q2hpbGRyZW5SZW5kZXJlciB7Li4udGhpcy5wcm9wc30+e3RoaXMucHJvcHMuY2hpbGRyZW59PC9DaGlsZHJlblJlbmRlcmVyPlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLnNpZGVwYW5lbCAmJiAoXG4gICAgICAgICAgICAgICAgICAgIDxTaWRlcGFuZWxSZW5kZXJlclxuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZT17dGhpcy5wcm9wcy5zaWRlcGFuZWwudHlwZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlZkNPTVBTaWRlcGFuZWw9e3RoaXMucHJvcHMucmVmQ09NUFNpZGVwYW5lbH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHlDYWxsYmFjaz17dGhpcy5wcm9wcy5zaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2t9XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wcz17dGhpcy5wcm9wcy5zaWRlcGFuZWwucHJvcHN9XG4gICAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8TWF5ZXJzUmVuZGVyZXIgbWF5ZXJzPXt0aGlzLnByb3BzLm1heWVyc30gLz5cbiAgICAgICAgICAgICAgICA8QmxhbmttYXNrUmVuZGVyZXJcbiAgICAgICAgICAgICAgICAgICAgR1VJRGlzYWJsZWQ9e3RoaXMucHJvcHMuR1VJRGlzYWJsZWR9XG4gICAgICAgICAgICAgICAgICAgIEdVSURpc2FibGVDb3Zlcj17dGhpcy5wcm9wcy5HVUlEaXNhYmxlQ292ZXJ9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgIH1cbn1cbmludGVyZmFjZSBDaGlsZHJlblJlbmRlcmVyUHJvcHMge1xuICAgIGNoaWxkcmVuOiBQcm9wc1tcImNoaWxkcmVuXCJdO1xufVxuY29uc3QgQ2hpbGRyZW5SZW5kZXJlciA9IFJlYWN0Lm1lbW88Q2hpbGRyZW5SZW5kZXJlclByb3BzPihmdW5jdGlvbiBDaGlsZHJlblJlbmRlcmVyKHtcbiAgICBjaGlsZHJlbixcbiAgICAuLi5yZXN0XG59OiBDaGlsZHJlblJlbmRlcmVyUHJvcHMpIHtcbiAgICByZXR1cm4gdHlwZW9mIGNoaWxkcmVuID09PSBcImZ1bmN0aW9uXCIgPyBjaGlsZHJlbihyZXN0KSA6IGNoaWxkcmVuO1xufSk7XG5pbnRlcmZhY2UgTWF5ZXJzUmVuZGVyZXJQcm9wcyB7XG4gICAgbWF5ZXJzOiBQcm9wc1tcIm1heWVyc1wiXTtcbn1cbmNvbnN0IE1heWVyc1JlbmRlcmVyID0gUmVhY3QubWVtbzxNYXllcnNSZW5kZXJlclByb3BzPihmdW5jdGlvbiBNYXllcnNSZW5kZXJlcih7XG4gICAgbWF5ZXJzXG59OiBNYXllcnNSZW5kZXJlclByb3BzKTogYW55IHtcbiAgICByZXR1cm4gbWF5ZXJzLm1hcCgoeyBuYW1lLCAuLi5wcm9wcyB9KSA9PiB7XG4gICAgICAgIHJldHVybiA8QWlyck1heWVyIGtleT17bmFtZX0gey4uLnByb3BzfSAvPjtcbiAgICB9KTtcbn0pO1xuaW50ZXJmYWNlIFNpZGVwYW5lbFJlbmRlcmVyUHJvcHMge1xuICAgIHR5cGU6IGtleW9mIFJlYWN0SFRNTDtcbiAgICBwcm9wczogU2lkZXBhbmVsUHJvcHM7XG4gICAgcmVmQ09NUFNpZGVwYW5lbDogUHJvcHNbXCJyZWZDT01QU2lkZXBhbmVsXCJdO1xuICAgIHZpc2liaWxpdHlDYWxsYmFjazogUHJvcHNbXCJzaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2tcIl07XG59XG5jb25zdCBTaWRlcGFuZWxSZW5kZXJlciA9IFJlYWN0Lm1lbW88U2lkZXBhbmVsUmVuZGVyZXJQcm9wcz4oZnVuY3Rpb24gU2lkZXBhbmVsUmVuZGVyZXIoe1xuICAgIHR5cGUsXG4gICAgcmVmQ09NUFNpZGVwYW5lbCxcbiAgICB2aXNpYmlsaXR5Q2FsbGJhY2ssXG4gICAgcHJvcHNcbn06IFNpZGVwYW5lbFJlbmRlcmVyUHJvcHMpIHtcbiAgICBpZiAoIXByb3BzLnJlZikge1xuICAgICAgICBwcm9wcy5yZWYgPSByZWZDT01QU2lkZXBhbmVsO1xuICAgIH1cbiAgICBpZiAoIXByb3BzLnZpc2liaWxpdHlDYWxsYmFjaykge1xuICAgICAgICBwcm9wcy52aXNpYmlsaXR5Q2FsbGJhY2sgPSB2aXNpYmlsaXR5Q2FsbGJhY2s7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgcHJvcHMuZW5hYmxlZCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICBwcm9wcy5lbmFibGVkID0gdHJ1ZTsgLy9mb3JjZSBleHBsaWNpdCB2YWx1ZSwgZS5nIG5lZWRlZCB3aGVuIGNoZWNraW5nIGlmIHBhbmVsIGlzIGVuYWJsZWQgaW4gYG9wZW5NYXllcmAgbWV0aG9kXG4gICAgfVxuXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQodHlwZSwgcHJvcHMpO1xufSk7XG5pbnRlcmZhY2UgQmxhbmttYXNrUmVuZGVyZXJQcm9wcyB7XG4gICAgR1VJRGlzYWJsZWQ6IFByb3BzW1wiR1VJRGlzYWJsZWRcIl07XG4gICAgR1VJRGlzYWJsZUNvdmVyOiBQcm9wc1tcIkdVSURpc2FibGVDb3ZlclwiXTtcbn1cbmNvbnN0IEJsYW5rbWFza1JlbmRlcmVyID0gUmVhY3QubWVtbzxCbGFua21hc2tSZW5kZXJlclByb3BzPihmdW5jdGlvbiBCbGFua21hc2tSZW5kZXJlcih7XG4gICAgR1VJRGlzYWJsZWQsXG4gICAgR1VJRGlzYWJsZUNvdmVyXG59OiBCbGFua21hc2tSZW5kZXJlclByb3BzKSB7XG4gICAgcmV0dXJuIEdVSURpc2FibGVkICYmIDxkaXYgY2xhc3NOYW1lPVwiYWlyci1ibGFuay1tYXNrXCI+e0dVSURpc2FibGVDb3Zlcn08L2Rpdj47XG59KTtcbmludGVyZmFjZSBOYXZiYXJSZW5kZXJlclByb3BzIHtcbiAgICBuYXZiYXI6IFByb3BzW1wibmF2YmFyXCJdO1xuICAgIGFjdGl2ZVZpZXdJbmRleDogbnVtYmVyO1xuICAgIGJhY2tCdXR0b25PbkZpcnN0VmlldzogUHJvcHNbXCJiYWNrQnV0dG9uT25GaXJzdFZpZXdcIl07XG4gICAgaGFuZGxlQmFja0J1dHRvbjogUHJvcHNbXCJoYW5kbGVCYWNrQnV0dG9uXCJdO1xuICAgIGJhY2tCdXR0b246IFByb3BzW1wiYmFja0J1dHRvblwiXTtcbiAgICBuYXZiYXJNZW51OiBQcm9wc1tcIm5hdmJhck1lbnVcIl07XG4gICAgaGFzU2lkZXBhbmVsOiBib29sZWFuO1xuICAgIGhhbmRsZU1lbnVCdXR0b25Ub2dnbGVTaWRlcGFuZWwoZTogU3ludGhldGljRXZlbnQ8SFRNTEVsZW1lbnQ+KTogdm9pZDtcbiAgICBtb2NrVmlld1RpdGxlOiBSZWFjdE5vZGU7XG4gICAgYWN0aXZlVmlld1RpdGxlOiBSZWFjdE5vZGU7XG4gICAgbmF2YmFyQ2xhc3M6IHN0cmluZztcbiAgICByZWZET01OYXZiYXI6IFByb3BzW1wicmVmRE9NTmF2YmFyXCJdO1xuICAgIG5hdmJhckhlaWdodDogUHJvcHNbXCJuYXZiYXJIZWlnaHRcIl07XG59XG5jb25zdCBOYXZiYXJSZW5kZXJlciA9IFJlYWN0Lm1lbW88TmF2YmFyUmVuZGVyZXJQcm9wcz4oZnVuY3Rpb24gTmF2YmFyUmVuZGVyZXIoe1xuICAgIG5hdmJhcixcbiAgICBhY3RpdmVWaWV3SW5kZXgsXG4gICAgYmFja0J1dHRvbk9uRmlyc3RWaWV3LFxuICAgIGhhbmRsZUJhY2tCdXR0b24sXG4gICAgYmFja0J1dHRvbixcbiAgICBuYXZiYXJNZW51LFxuICAgIGhhc1NpZGVwYW5lbCxcbiAgICBoYW5kbGVNZW51QnV0dG9uVG9nZ2xlU2lkZXBhbmVsLFxuICAgIG1vY2tWaWV3VGl0bGUsXG4gICAgYWN0aXZlVmlld1RpdGxlLFxuICAgIG5hdmJhckNsYXNzLFxuICAgIHJlZkRPTU5hdmJhcixcbiAgICBuYXZiYXJIZWlnaHRcbn06IE5hdmJhclJlbmRlcmVyUHJvcHMpIHtcbiAgICBpZiAobmF2YmFyKSB7XG4gICAgICAgIGxldCBtb2NrVGl0bGUgPSBudWxsO1xuICAgICAgICBsZXQgdGl0bGU6IFJlYWN0Tm9kZTtcbiAgICAgICAgbGV0IGJhY2sgPSBudWxsO1xuXG4gICAgICAgIGlmIChiYWNrQnV0dG9uKSB7XG4gICAgICAgICAgICBjb25zdCBiYWNrQ2xhc3NOYW1lID1cbiAgICAgICAgICAgICAgICBcImJhY2sgXCIgKyAoYWN0aXZlVmlld0luZGV4IDwgMSAmJiAhYmFja0J1dHRvbk9uRmlyc3RWaWV3ID8gXCJoaWRkZW5cIiA6IFwiXCIpO1xuICAgICAgICAgICAgYmFjayA9IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17YmFja0NsYXNzTmFtZX0gb25DbGljaz17aGFuZGxlQmFja0J1dHRvbn0+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWVudTtcbiAgICAgICAgaWYgKG5hdmJhck1lbnUpIHtcbiAgICAgICAgICAgIGlmIChuYXZiYXJNZW51ID09PSBcInRvZ2dsZVNpZGVwYW5lbFwiKSB7XG4gICAgICAgICAgICAgICAgbWVudSA9IGhhc1NpZGVwYW5lbCA/IChcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtZW51XCIgb25DbGljaz17aGFuZGxlTWVudUJ1dHRvblRvZ2dsZVNpZGVwYW5lbH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICkgOiBudWxsO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KG5hdmJhck1lbnUpKSB7XG4gICAgICAgICAgICAgICAgbWVudSA9IDxkaXYgY2xhc3NOYW1lPVwibWVudVwiPntuYXZiYXJNZW51fTwvZGl2PjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IG5hdmJhclN0eWxlOiBDU1NQcm9wZXJ0aWVzID0ge307XG4gICAgICAgIGlmIChbMSwgdHJ1ZV0uaW5kZXhPZihuYXZiYXIpID09PSAtMSkge1xuICAgICAgICAgICAgbmF2YmFyU3R5bGUudmlzaWJpbGl0eSA9IFwiaGlkZGVuXCI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobW9ja1ZpZXdUaXRsZSkge1xuICAgICAgICAgICAgbW9ja1RpdGxlID0gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9jay10aXRsZVwiPlxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj57YWN0aXZlVmlld1RpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB0aXRsZSA9IG1vY2tWaWV3VGl0bGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aXRsZSA9IGFjdGl2ZVZpZXdUaXRsZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcImFpcnItbmF2YmFyIFwiICsgKHR5cGVvZiBuYXZiYXJDbGFzcyA9PT0gXCJzdHJpbmdcIiA/IG5hdmJhckNsYXNzIDogXCJcIil9XG4gICAgICAgICAgICAgICAgcmVmPXtyZWZET01OYXZiYXJ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e25hdmJhclN0eWxlfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiBuYXZiYXJIZWlnaHQgKyBcInB4XCIgfX0+XG4gICAgICAgICAgICAgICAgICAgIHttb2NrVGl0bGV9XG4gICAgICAgICAgICAgICAgICAgIHtiYWNrfVxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInRpdGxlXCIgc3R5bGU9e3sgb3BhY2l0eTogbW9ja1ZpZXdUaXRsZSA/IDAgOiAxIH19PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+e3RpdGxlfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIHttZW51fVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICk7XG4gICAgfVxufSk7XG5pbnRlcmZhY2UgVmlld3NNYXBwZXJQcm9wcyB7XG4gICAgdmlld3M6IFByb3BzW1widmlld3NcIl07XG4gICAgYWN0aXZlVmlld05hbWU6IFByb3BzW1wiYWN0aXZlVmlld05hbWVcIl07XG4gICAgcmVmc0NPTVBWaWV3czogUHJvcHNbXCJyZWZzQ09NUFZpZXdzXCJdO1xufVxuY29uc3QgVmlld3NNYXBwZXIgPSBSZWFjdC5tZW1vPFZpZXdzTWFwcGVyUHJvcHM+KGZ1bmN0aW9uIFZpZXdzTWFwcGVyKHtcbiAgICB2aWV3cyxcbiAgICBhY3RpdmVWaWV3TmFtZSxcbiAgICByZWZzQ09NUFZpZXdzXG59OiBWaWV3c01hcHBlclByb3BzKTogYW55IHtcbiAgICByZXR1cm4gdmlld3MubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoaXRlbS5wcm9wcy5uYW1lID09PSBhY3RpdmVWaWV3TmFtZSkge1xuICAgICAgICAgICAgaXRlbS5wcm9wcy5hY3RpdmUgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaXRlbS5wcm9wcy5hY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0ZW0ucHJvcHMua2V5ID0gaXRlbS5wcm9wcy5uYW1lO1xuICAgICAgICBpZiAoIWl0ZW0ucHJvcHMucmVmKSB7XG4gICAgICAgICAgICBpdGVtLnByb3BzLnJlZiA9IFJlYWN0LmNyZWF0ZVJlZjxBaXJyVmlldz4oKTtcbiAgICAgICAgICAgIHJlZnNDT01QVmlld3NbaXRlbS5wcm9wcy5uYW1lXSA9IGl0ZW0ucHJvcHMucmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoaXRlbS50eXBlLCBpdGVtLnByb3BzKTtcbiAgICB9KTtcbn0pO1xuaW50ZXJmYWNlIFZpZXdzUmVuZGVyZXJQcm9wcyBleHRlbmRzIFZpZXdzTWFwcGVyUHJvcHMge1xuICAgIGNsYXNzTmFtZTogUHJvcHNbXCJjbGFzc05hbWVcIl07XG4gICAgcmVmRE9NQ29udGFpbmVyOiBQcm9wc1tcInJlZkRPTUNvbnRhaW5lclwiXTtcbiAgICBjb250YWluZXJzSGVpZ2h0OiBQcm9wc1tcImNvbnRhaW5lcnNIZWlnaHRcIl07XG59XG5cbmNvbnN0IFZpZXdzUmVuZGVyZXIgPSBSZWFjdC5tZW1vPFZpZXdzUmVuZGVyZXJQcm9wcz4oZnVuY3Rpb24gVmlld3NSZW5kZXJlcih7XG4gICAgdmlld3MsXG4gICAgY2xhc3NOYW1lID0gXCJcIixcbiAgICByZWZET01Db250YWluZXIsXG4gICAgYWN0aXZlVmlld05hbWUsXG4gICAgY29udGFpbmVyc0hlaWdodCxcbiAgICByZWZzQ09NUFZpZXdzXG59OiBWaWV3c1JlbmRlcmVyUHJvcHMpIHtcbiAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e1wiYWlyci1jb250YWluZXIgXCIgKyBjbGFzc05hbWV9XG4gICAgICAgICAgICByZWY9e3JlZkRPTUNvbnRhaW5lcn1cbiAgICAgICAgICAgIHN0eWxlPXtjb250YWluZXJzSGVpZ2h0ID8geyBoZWlnaHQ6IGNvbnRhaW5lcnNIZWlnaHQgfSA6IG51bGx9XG4gICAgICAgID5cbiAgICAgICAgICAgIDxWaWV3c01hcHBlclxuICAgICAgICAgICAgICAgIHZpZXdzPXt2aWV3c31cbiAgICAgICAgICAgICAgICBhY3RpdmVWaWV3TmFtZT17YWN0aXZlVmlld05hbWV9XG4gICAgICAgICAgICAgICAgcmVmc0NPTVBWaWV3cz17cmVmc0NPTVBWaWV3c31cbiAgICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICk7XG59KTtcbiJdfQ==