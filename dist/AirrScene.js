"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AirrMayer = require("./AirrMayer");

var _AirrMayer2 = _interopRequireDefault(_AirrMayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrScene = function (_Component) {
    _inherits(AirrScene, _Component);

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

            if (_this.props.stackMode && _this.props.views.length > 1) {
                if (_this.props.handleBackButton) {
                    _this.props.handleBackButton(e);
                }
            } else if (_this.props.handleBackBehaviourOnFirstView) {
                _this.props.handleBackBehaviourOnFirstView();
            }
        }, _this.handleMenuButtonToggleSidepanel = function (e) {
            if (_this.props.refCOMPSidepanel && _this.props.refCOMPSidepanel.current) {
                _this.props.refCOMPSidepanel.current.isShown() ? _this.props.refCOMPSidepanel.current.hide() : _this.props.refCOMPSidepanel.current.show();
            }
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(AirrScene, [{
        key: "getViewIndex",


        /**
         * Returns view index in this.props.views array
         *
         * @param {string} viewName
         * @returns {Number}
         */
        value: function getViewIndex(viewName) {
            var index = -1;

            this.props.views.forEach(function (config, i) {
                if (config.props.name === viewName) {
                    index = i;
                }
            });

            return index;
        }

        /**
         * Handles navbar backbutton tap events
         *
         * @param {object} e Event object
         * @returns {void}
         */


        /**
         * Handles navbar menu button tap events
         *
         * @param {object} e Event object
         * @returns {void}
         */

    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var containerClassList = ["airr-container"];
            if (this.props.animation) {
                containerClassList.push(this.props.animation + "-animation");
            }

            var className = "airr-view airr-scene";
            this.props.active && (className += " active");

            var views = [];
            var isAnyViewActive = false;
            this.props.views.forEach(function (item) {
                var viewProps = Object.assign({}, item.props);

                if (viewProps.name === _this2.props.activeViewName) {
                    viewProps.active = true;
                    isAnyViewActive = true;
                }

                views.push(_react2.default.createElement(item.type, viewProps));
            });

            if (!isAnyViewActive) {
                console.warn("[Airr] No view was set as active" + (this.props.name && " in Scene named `" + this.props.name) + ".");
            }

            var sidepanel = null;
            if (this.props.sidepanel) {
                sidepanel = _react2.default.createElement(this.props.sidepanel.type, this.props.sidepanel.props);
            }

            var blankmask = null;
            if (this.props.GUIDisabled) {
                blankmask = _react2.default.createElement(
                    "div",
                    { className: "airr-blank-mask" },
                    this.props.GUIDisableCover
                );
            }

            var mayers = [];
            if (this.props.mayers.length) {
                mayers = this.props.mayers.map(function (mayerProps) {
                    mayerProps.key = mayerProps.name;
                    return _react2.default.createElement(_AirrMayer2.default, mayerProps);
                });
            }

            var navbar = null;
            if (this.props.navbar) {
                var mockTitle = null;
                var title = "";
                var back = null;
                var activeViewIndex = this.getViewIndex(this.props.activeViewName);

                if (this.props.backButton) {
                    var backClassName = "back " + (activeViewIndex < 1 && !this.props.backButtonOnFirstView ? "hidden" : "");
                    back = _react2.default.createElement(
                        "div",
                        {
                            className: backClassName,
                            onClick: this.handleBackButton
                        },
                        _react2.default.createElement("div", null)
                    );
                }

                var menu = void 0;
                if (this.props.navbarMenu) {
                    if (this.props.navbarMenu === "toggleSidepanel") {
                        menu = this.props.sidepanel ? _react2.default.createElement(
                            "div",
                            {
                                className: "menu",
                                onClick: this.handleMenuButtonToggleSidepanel
                            },
                            _react2.default.createElement("div", null)
                        ) : null;
                    } else if (Array.isArray(this.props.navbarMenu)) {
                        menu = _react2.default.createElement(
                            "div",
                            { className: "menu" },
                            this.props.navbarMenu
                        );
                    }
                }

                var navbarStyle = {};
                if ([1, true].indexOf(this.props.navbar) === -1) {
                    navbarStyle.visibility = "hidden";
                }

                if (this.props.mockTitle) {
                    var mockTitleContent = this.props.views[activeViewIndex] && this.props.views[activeViewIndex].props.title;
                    var mockTitleViewIndex = this.getViewIndex(this.props.mockTitle);
                    mockTitle = this.props.mockTitle ? _react2.default.createElement(
                        "div",
                        { className: "mock-title" },
                        _react2.default.createElement(
                            "span",
                            null,
                            mockTitleContent
                        )
                    ) : null;
                    title = this.props.views[mockTitleViewIndex] ? this.props.views[mockTitleViewIndex].props.title : "";
                } else {
                    title = this.props.views[activeViewIndex] ? this.props.views[activeViewIndex].props.title : "";
                }

                navbar = _react2.default.createElement(
                    "div",
                    {
                        className: "airr-navbar",
                        ref: this.props.refDOMNavbar,
                        style: navbarStyle
                    },
                    _react2.default.createElement(
                        "div",
                        {
                            className: this.props.navbarClass,
                            style: { height: this.props.navbarHeight + "px" }
                        },
                        mockTitle,
                        back,
                        _react2.default.createElement(
                            "div",
                            {
                                className: "title",
                                style: { opacity: this.props.mockTitle ? 0 : 1 }
                            },
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

            var children = typeof this.props.children === "function" ? this.props.children(this.props) : this.props.children;

            return _react2.default.createElement(
                "div",
                { className: className, ref: this.props.refDOM },
                navbar,
                _react2.default.createElement(
                    "div",
                    {
                        className: containerClassList.join(" "),
                        ref: this.props.refDOMContainer
                    },
                    views
                ),
                children,
                sidepanel,
                mayers,
                blankmask
            );
        }
    }]);

    return AirrScene;
}(_react.Component);

AirrScene.defaultProps = {
    name: "", //the name of the scene. Must be unique among others views in parent scene. Will be used as identification string

    activeViewName: null, //string
    GUIDisabled: false, //bool
    GUIDisableCover: null, //react element
    animation: "slide", //slide,overlay,fade or false if no animation
    animationTime: 300, //number time in miliseconds of views change animation, used also in navbar animations
    navbar: false, // possible values: boolean or one of integers -1 (hidden), 0 (no navbar), 1 (visible)
    navbarHeight: 48, //navbar height in px
    navbarMenu: null, //string `toggleSidepanel` or array of React elements
    navbarClass: "", //string
    backButton: false, //bool
    backButtonOnFirstView: false, //bool To show backButton in navbar if currently showing first view in stack.
    handleBackButton: null, //parent function to handle back button tap
    handleBackBehaviourOnFirstView: null, //null or function e.g. if this scene is view in some parent scene, and you want to pop out of it - this function will come from parent scene and will handle this behaviour
    viewsAnimationEndCallback: null, //called after views animation ends
    stackMode: true, //bool - if false Scene views will be assumed as tabs rather then stack order views. (view change vs. view pop/push)
    active: false, //bool is currently active in parent scene
    sidepanel: null, //{type: AirrSidepanel, props: {}}
    views: [], //array,
    mayers: [], //mayers conf list
    title: "" //titlebar name
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
    navbarMenu: function navbarMenu(props, propName, componentName) {
        if (props[propName]) {
            if (typeof props[propName] === "string") {
                if (!/toggleSidepanel/.test(props[propName])) {
                    return new Error("Invalid prop `" + propName + "` supplied to" + " `" + componentName + "`. Value must be `toggleSidepanel` string or array of React elements.");
                } else {
                    return null;
                }
            }

            if (!Array.isArray(props[propName])) {
                return new Error("Invalid prop `" + propName + "` supplied to" + " `" + componentName + "`. Value must be `toggleSidepanel` string or array of React elements.");
            }
        }
    },
    navbarClass: _propTypes2.default.string,
    backButton: _propTypes2.default.bool,
    backButtonOnFirstView: _propTypes2.default.bool,
    handleBackButton: _propTypes2.default.func,
    handleBackBehaviourOnFirstView: _propTypes2.default.func,
    viewsAnimationEndCallback: _propTypes2.default.func,
    stackMode: _propTypes2.default.bool,
    active: _propTypes2.default.bool,
    /**
     * Sidepanels object must contain two properties.
     * 1. Type - being refference to class of which item will be instantiated
     * 2. Props - special properties of AirrSidepanel class. Go to class declaration for further properties documenation
     *
     * Example:
     * {
     *    type: AirrSidepanel,
     *    props: {
     *        children: <div>sidepanel html content</div>,
     *        sceneWidth: window.innerWidth,
     *        sceneHeight: window.innerHeight,
     *        side: 'left',
     *        sizeFactor: 0.66
     *    }
     * }
     **/
    sidepanel: _propTypes2.default.object,

    /**
     * Objects of `views` array MUST contains two properties.
     * 1. Type - being reffrence to class of which item will be instantiated.
     * 2. Props - object that acts like components properties.
     *    For special AirrView class properties go to its declaration to check out.
     *
     * Example:
     * this.props.views = [
     *      {
     *          type: AirrView,
     *          props: {
     *              name: 'Foobar',
     *              title: 'Foo is in the house',
     *              children: <div>This is Dave. Dave is div.</div>
     *              extraParam: bazHandler
     *          }
     *      }
     * ]
     */
    views: _propTypes2.default.arrayOf(_propTypes2.default.object),

    /**
     * Objects of `mayers` array MUST contain special Mayer class properties.
     * For checkout of possible properties go to Mayer declaration.
     *
     * Example:
     * this.props.mayers. = [
     *   {
     *       name: 'demo-mayer',
     *       content: <div>Hello cruel world!</div>,
     *       appearFrom: 'left',
     *       leaveTo: 'right',
     *       avaibleHeight: this.props.height, //read from scenes properties
     *       buttons: [
     *           {
     *               content: 'Ok',
     *               handler: (e) => {
     *                   this.setState({mayers: []});
     *               }
     *           }
     *       ]
     *   }
     * ]
     */
    mayers: _propTypes2.default.arrayOf(_propTypes2.default.object),
    title: _propTypes2.default.string
};
exports.default = AirrScene;