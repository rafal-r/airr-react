"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _propTypes3 = require("./propTypes");

var _AirrMayer = require("./AirrMayer");

var _AirrMayer2 = _interopRequireDefault(_AirrMayer);

var _AirrView = require("./AirrView");

var _AirrView2 = _interopRequireDefault(_AirrView);

var _AirrSceneWrapper = require("./AirrSceneWrapper");

var _AirrSceneWrapper2 = _interopRequireDefault(_AirrSceneWrapper);

var _AirrSidepanel = require("./AirrSidepanel");

var _AirrSidepanel2 = _interopRequireDefault(_AirrSidepanel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrScene = function (_PureComponent) {
	_inherits(AirrScene, _PureComponent);

	function AirrScene() {
		var _ref;

		var _temp, _this, _ret;

		_classCallCheck(this, AirrScene);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AirrScene.__proto__ || Object.getPrototypeOf(AirrScene)).call.apply(_ref, [this].concat(args))), _this), _this.mayersCompsRefs = {}, _this.handleBackButton = function (e) {
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
		}, _this.handleMenuButtonToggleSidepanel = function (e) {
			if (_this.props.refCOMPSidepanel && _this.props.refCOMPSidepanel.current) {
				_this.props.refCOMPSidepanel.current.isShown() ? _this.props.refCOMPSidepanel.current.hide() : _this.props.refCOMPSidepanel.current.show();
			}
		}, _this.checkValidActiveView = function () {
			var isAnyViewActive = _this.props.views.some(function (view) {
				return view.props.name === _this.props.activeViewName;
			});

			if (!isAnyViewActive) {
				console.warn("[Airr] No view was set as active" + (_this.props.name && " in Scene named `" + _this.props.name + "`") + ".");
			}

			return isAnyViewActive;
		}, _temp), _possibleConstructorReturn(_this, _ret);
	}

	_createClass(AirrScene, [{
		key: "getViewIndex",
		value: function getViewIndex(viewName) {
			return this.props.views.findIndex(function (config) {
				return config.props.name === viewName;
			});
		}
	}, {
		key: "render",
		value: function render() {
			var className = "airr-view airr-scene";
			this.props.active && (className += " active");
			this.props.className && (className += " " + this.props.className);

			this.checkValidActiveView();

			var activeViewIndex = this.getViewIndex(this.props.activeViewName);
			var mockViewTitle = void 0;
			if (this.props.mockTitleName) {
				var mockViewIndex = this.getViewIndex(this.props.mockTitleName);
				if (mockViewIndex >= 0) {
					var mockView = this.props.views[mockViewIndex];
					if (mockView.props.title) {
						mockViewTitle = mockView.props.title;
					}
				}
			}
			return _react2.default.createElement(
				"div",
				{ className: className, ref: this.props.refDOM },
				_react2.default.createElement(
					"div",
					{ className: "content-wrap" },
					_react2.default.createElement(NavbarRenderer, {
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
					}),
					_react2.default.createElement(ViewsRenderer, {
						className: this.props.animation ? this.props.animation + "-animation" : "",
						refsCOMPViews: this.props.refsCOMPViews,
						activeViewName: this.props.activeViewName,
						views: this.props.views,
						refDOMContainer: this.props.refDOMContainer,
						containersHeight: this.props.containersHeight
					})
				),
				_react2.default.createElement(
					ChildrenRenderer,
					this.props,
					this.props.children
				),
				this.props.sidepanel && _react2.default.createElement(SidepanelRenderer, _extends({
					type: this.props.sidepanel.type,
					refCOMPSidepanel: this.props.refCOMPSidepanel,
					visibilityCallback: this.props.sidepanelVisibilityCallback
				}, this.props.sidepanel.props)),
				_react2.default.createElement(MayersRenderer, { mayers: this.props.mayers }),
				_react2.default.createElement(BlankmaskRenderer, {
					GUIDisabled: this.props.GUIDisabled,
					GUIDisableCover: this.props.GUIDisableCover
				})
			);
		}
	}]);

	return AirrScene;
}(_react.PureComponent);

exports.default = AirrScene;


AirrScene.defaultProps = {
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
	className: ""
};

AirrScene.propTypes = {
	name: _propTypes2.default.string.isRequired,

	activeViewName: _propTypes2.default.string,

	GUIDisabled: _propTypes2.default.bool,

	GUIDisableCover: _propTypes2.default.object,

	animation: _propTypes2.default.oneOf(["slide", "overlay", "fade", false]),

	animationTime: _propTypes2.default.number,

	navbar: _propTypes2.default.oneOf([-1, 0, false, 1, true]),

	navbarHeight: _propTypes2.default.number,

	navbarMenu: _propTypes3.navbarMenuProp,

	navbarClass: _propTypes2.default.string,

	backButton: _propTypes2.default.bool,

	backButtonOnFirstView: _propTypes2.default.bool,

	handleBackButton: _propTypes2.default.func,

	handleBackBehaviourOnFirstView: _propTypes2.default.func,

	active: _propTypes2.default.bool,

	sidepanel: _propTypes2.default.shape({
		type: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]).isRequired,

		props: _propTypes2.default.shape(_AirrSidepanel2.default.propTypes)
	}),

	views: _propTypes2.default.arrayOf(_propTypes2.default.shape({
		type: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]).isRequired,

		props: _propTypes2.default.shape(_AirrView2.default.propTypes)
	})),

	mayers: _propTypes2.default.arrayOf(_propTypes2.default.shape(_AirrMayer2.default.propTypes)),

	title: _propTypes3.commonChildrenProp,

	className: _propTypes2.default.string,

	refCOMPSidepanel: _propTypes2.default.object,

	refDOM: _propTypes2.default.object,

	refDOMNavbar: _propTypes2.default.object,

	refsCOMPViews: _propTypes2.default.object,

	refDOMContainer: _propTypes2.default.object,

	mockTitleName: _propTypes2.default.string,

	containersHeight: _propTypes2.default.number,

	children: _propTypes3.commonChildrenProp,
	sidepanelVisibilityCallback: _AirrSceneWrapper2.default.propTypes.sidepanelVisibilityCallback
};

var ChildrenRenderer = _react2.default.memo(function ChildrenRenderer(_ref2) {
	var children = _ref2.children,
	    rest = _objectWithoutProperties(_ref2, ["children"]);

	return typeof children === "function" ? children(rest) : children;
});
ChildrenRenderer.propTypes = {
	children: _propTypes3.commonChildrenProp
};
var MayersRenderer = _react2.default.memo(function MayersRenderer(_ref3) {
	var mayers = _ref3.mayers;

	return mayers.map(function (_ref4) {
		var name = _ref4.name,
		    props = _objectWithoutProperties(_ref4, ["name"]);

		return _react2.default.createElement(_AirrMayer2.default, _extends({ key: name, name: name }, props));
	});
});
MayersRenderer.propTypes = {
	mayers: _propTypes2.default.arrayOf(_propTypes2.default.shape(_AirrMayer2.default.propTypes))
};
var SidepanelRenderer = _react2.default.memo(function SidepanelRenderer(_ref5) {
	var type = _ref5.type,
	    refCOMPSidepanel = _ref5.refCOMPSidepanel,
	    visibilityCallback = _ref5.visibilityCallback,
	    props = _objectWithoutProperties(_ref5, ["type", "refCOMPSidepanel", "visibilityCallback"]);

	if (!props.ref) {
		props.ref = refCOMPSidepanel;
	}
	if (!props.visibilityCallback) {
		props.visibilityCallback = visibilityCallback;
	}
	if (typeof props.enabled === "undefined") {
		props.enabled = true;
	}

	return _react2.default.createElement(type, props);
});
SidepanelRenderer.propTypes = {
	type: _propTypes2.default.oneOfType([_propTypes2.default.func, _propTypes2.default.object]).isRequired,
	props: _propTypes2.default.shape(_AirrSidepanel2.default.propTypes),
	ref: _propTypes2.default.object,
	refCOMPSidepanel: _propTypes2.default.object,
	visibilityCallback: _AirrSceneWrapper2.default.propTypes.sidepanelVisibilityCallback,
	enabled: _propTypes2.default.bool
};
var BlankmaskRenderer = _react2.default.memo(function BlankmaskRenderer(_ref6) {
	var GUIDisabled = _ref6.GUIDisabled,
	    GUIDisableCover = _ref6.GUIDisableCover;

	return GUIDisabled && _react2.default.createElement(
		"div",
		{ className: "airr-blank-mask" },
		GUIDisableCover
	);
});
BlankmaskRenderer.propTypes = {
	GUIDisabled: _propTypes2.default.bool,
	GUIDisableCover: _propTypes3.commonChildrenProp
};
var NavbarRenderer = _react2.default.memo(function NavbarRenderer(_ref7) {
	var navbar = _ref7.navbar,
	    activeViewIndex = _ref7.activeViewIndex,
	    backButtonOnFirstView = _ref7.backButtonOnFirstView,
	    handleBackButton = _ref7.handleBackButton,
	    backButton = _ref7.backButton,
	    navbarMenu = _ref7.navbarMenu,
	    hasSidepanel = _ref7.hasSidepanel,
	    handleMenuButtonToggleSidepanel = _ref7.handleMenuButtonToggleSidepanel,
	    mockViewTitle = _ref7.mockViewTitle,
	    activeViewTitle = _ref7.activeViewTitle,
	    navbarClass = _ref7.navbarClass,
	    refDOMNavbar = _ref7.refDOMNavbar,
	    navbarHeight = _ref7.navbarHeight;

	if (navbar) {
		var mockTitle = null;
		var title = "";
		var back = null;

		if (backButton) {
			var backClassName = "back " + (activeViewIndex < 1 && !backButtonOnFirstView ? "hidden" : "");
			back = _react2.default.createElement(
				"div",
				{ className: backClassName, onClick: handleBackButton },
				_react2.default.createElement("div", null)
			);
		}

		var menu = void 0;
		if (navbarMenu) {
			if (navbarMenu === "toggleSidepanel") {
				menu = hasSidepanel ? _react2.default.createElement(
					"div",
					{ className: "menu", onClick: handleMenuButtonToggleSidepanel },
					_react2.default.createElement("div", null)
				) : null;
			} else if (Array.isArray(navbarMenu)) {
				menu = _react2.default.createElement(
					"div",
					{ className: "menu" },
					navbarMenu
				);
			}
		}

		var navbarStyle = {};
		if ([1, true].indexOf(navbar) === -1) {
			navbarStyle.visibility = "hidden";
		}

		if (mockViewTitle) {
			mockTitle = _react2.default.createElement(
				"div",
				{ className: "mock-title" },
				_react2.default.createElement(
					"span",
					null,
					activeViewTitle
				)
			);
			title = mockViewTitle;
		} else {
			title = activeViewTitle;
		}

		return _react2.default.createElement(
			"div",
			{
				className: "airr-navbar " + (typeof navbarClass === "string" ? navbarClass : ""),
				ref: refDOMNavbar,
				style: navbarStyle
			},
			_react2.default.createElement(
				"div",
				{ style: { height: navbarHeight + "px" } },
				mockTitle,
				back,
				_react2.default.createElement(
					"div",
					{ className: "title", style: { opacity: mockViewTitle ? 0 : 1 } },
					_react2.default.createElement(
						"span",
						null,
						title
					)
				),
				menu
			)
		);
	}
});
NavbarRenderer.propTypes = {
	navbar: _propTypes2.default.oneOf([-1, 0, false, 1, true]),
	activeViewIndex: _propTypes2.default.number,
	backButtonOnFirstView: _propTypes2.default.bool,
	backButton: _propTypes2.default.bool,
	handleBackButton: _propTypes2.default.func,
	navbarMenu: _propTypes3.navbarMenuProp,
	hasSidepanel: _propTypes2.default.bool,
	handleMenuButtonToggleSidepanel: _propTypes2.default.func,
	navbarClass: _propTypes2.default.string,
	mockViewTitle: _propTypes3.commonChildrenProp,
	activeViewTitle: _propTypes2.default.string,
	refDOMNavbar: _propTypes2.default.object,
	navbarHeight: _propTypes2.default.number
};
var ViewsMapper = _react2.default.memo(function ViewsMapper(_ref8) {
	var views = _ref8.views,
	    activeViewName = _ref8.activeViewName,
	    refsCOMPViews = _ref8.refsCOMPViews;

	return views.map(function (item) {
		if (item.props.name === activeViewName) {
			item.props.active = true;
		} else {
			item.props.active = false;
		}

		item.props.key = item.props.name;
		if (!item.props.ref) {
			item.props.ref = _react2.default.createRef();
			refsCOMPViews[item.props.name] = item.props.ref;
		}

		return _react2.default.createElement(item.type, item.props);
	});
});
ViewsMapper.propTypes = {
	views: AirrScene.propTypes.views,
	activeViewName: _propTypes2.default.string,
	refsCOMPViews: _propTypes2.default.object
};
var ViewsRenderer = _react2.default.memo(function ViewsRenderer(_ref9) {
	var views = _ref9.views,
	    _ref9$className = _ref9.className,
	    className = _ref9$className === undefined ? "" : _ref9$className,
	    refDOMContainer = _ref9.refDOMContainer,
	    activeViewName = _ref9.activeViewName,
	    containersHeight = _ref9.containersHeight,
	    refsCOMPViews = _ref9.refsCOMPViews;

	return _react2.default.createElement(
		"div",
		{
			className: "airr-container " + className,
			ref: refDOMContainer,
			style: containersHeight ? { height: containersHeight } : null
		},
		_react2.default.createElement(ViewsMapper, {
			views: views,
			activeViewName: activeViewName,
			refsCOMPViews: refsCOMPViews
		})
	);
});
ViewsRenderer.propTypes = _extends({}, ViewsMapper.propTypes, {
	className: _propTypes2.default.string,
	refDOMContainer: _propTypes2.default.object,
	containersHeight: _propTypes2.default.number
});