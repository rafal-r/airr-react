"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _AirrFX = require("./AirrFX");

var _AirrFX2 = _interopRequireDefault(_AirrFX);

var _AirrScene = require("./AirrScene");

var _AirrScene2 = _interopRequireDefault(_AirrScene);

var _AirrViewWrapper2 = require("./AirrViewWrapper");

var _AirrViewWrapper3 = _interopRequireDefault(_AirrViewWrapper2);

var _immutabilityHelper = require("immutability-helper");

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrSceneWrapper = function (_AirrViewWrapper) {
    _inherits(AirrSceneWrapper, _AirrViewWrapper);

    function AirrSceneWrapper(props) {
        _classCallCheck(this, AirrSceneWrapper);

        var _this = _possibleConstructorReturn(this, (AirrSceneWrapper.__proto__ || Object.getPrototypeOf(AirrSceneWrapper)).call(this, props));

        _this.viewsConfig = {};
        _this.refsCOMPViews = {};
        _this.refsCOMPMayers = {};
        _this.refCOMPSidepanel = _react2.default.createRef();
        _this.refDOMContainer = _react2.default.createRef();
        _this.refDOMNavbar = _react2.default.createRef();
        _this.viewsNamesToStayList = [];

        _this.viewsAnimationEndCallback = function () {
            /**
             * If instance variable `viewsNamesToStayList` is set
             * then we filter views array to leave only those with names
             * present in `viewsNamesToStayList` list.
             */
            if (Array.isArray(_this.viewsNamesToStayList) && _this.viewsNamesToStayList.length) {
                _this.viewsNamesToStayList.push(_this.state.activeViewName);
                _this.__filterViews(_this.viewsNamesToStayList).then(function () {
                    _this.viewsNamesToStayList = [];
                });
            }
        };

        _this.disableGUI = function () {
            var cover = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

            return new Promise(function (resolve) {
                return _this.setState({ GUIDisabled: true, GUIDisableCover: cover }, resolve);
            });
        };

        _this.enableGUI = function () {
            return new Promise(function (resolve) {
                return _this.setState({ GUIDisabled: false, GUIDisableCover: null }, resolve);
            });
        };

        _this.getViewIndex = function (viewName) {
            return _this.state.views.findIndex(function (view) {
                return view.props.name === viewName;
            });
        };

        _this.popView = function () {
            var sceneProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (_this.state.views.length > 1) {
                var viewName = _this.state.views[_this.state.views.length - 2].props.name;

                return _this.changeView(viewName, {}, sceneProps).then(function () {
                    var newviewdefinition = (0, _immutabilityHelper2.default)(_this.state.views, {
                        $splice: [[_this.state.views.length - 1, 1]]
                    });

                    delete _this.refsCOMPViews[_this.state.views[_this.state.views.length - 1].props.name];

                    return new Promise(function (resolve) {
                        return _this.setState({ views: newviewdefinition }, resolve);
                    });
                });
            } else {
                return Promise.reject();
            }
        };

        _this.hasViewInConfig = function (name) {
            return name in _this.viewsConfig;
        };

        _this.hasViewInState = function (name) {
            return _this.state.views.findIndex(function (view) {
                return view.props.name === name;
            }) !== -1 ? true : false;
        };

        _this.handleBackButton = function () {
            if (_this.state.views.length > 1) {
                var viewName = _this.state.views[_this.state.views.length - 2].props.name;

                return _this.changeView(viewName);
            }

            return Promise.reject();
        };

        _this.disableSidepanel = function () {
            if (_this.state.sidepanel.props.enabled) {
                return new Promise(function (resolve) {
                    return _this.setState({
                        sidepanel: (0, _immutabilityHelper2.default)(_this.state.sidepanel, {
                            props: { enabled: { $set: false } }
                        })
                    }, resolve);
                });
            }

            return Promise.resolve();
        };

        _this.enableSidepanel = function () {
            return new Promise(function (resolve) {
                return _this.setState({
                    sidepanel: (0, _immutabilityHelper2.default)(_this.state.sidepanel, {
                        props: {
                            enabled: { $set: true }
                        }
                    })
                }, resolve);
            });
        };

        _this.openSidepanel = function () {
            return new Promise(function (resolve) {
                return _this.setState({
                    sidepanel: (0, _immutabilityHelper2.default)(_this.state.sidepanel, {
                        props: {
                            isShown: { $set: true },
                            animateShown: { $set: true }
                        }
                    })
                }, resolve);
            });
        };

        _this.__addMayer = function (config) {
            var newMayersDef = (0, _immutabilityHelper2.default)(_this.state.mayers, { $push: [config] });

            return new Promise(function (resolve) {
                return _this.setState({
                    mayers: newMayersDef
                }, resolve);
            });
        };

        _this.__removeMayer = function (name) {
            var newMayersDef = _this.state.mayers.filter(function (item) {
                return item.name !== name;
            });

            return new Promise(function (resolve) {
                return _this.setState({
                    mayers: newMayersDef
                }, resolve);
            });
        };

        _this.disableBackButton = function () {
            return new Promise(function (resolve) {
                return _this.setState({ backButton: false }, resolve);
            });
        };

        _this.enableBackButton = function () {
            return new Promise(function (resolve) {
                return _this.setState({ backButton: true }, resolve);
            });
        };

        _this.goToView = function (name) {
            var viewsNamesToStayList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            return function () {
                var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
                var sceneProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

                _this.viewsNamesToStayList = viewsNamesToStayList;
                return _this.changeView(name, params, sceneProps);
            };
        };

        _this.viewChangeInProgress = false;


        _this.state = {
            name: props.name,
            active: props.active,
            navbar: props.navbar,
            navbarHeight: props.navbarHeight,
            navbarMenu: props.navbarMenu,
            navbarClass: props.navbarClass,
            backButton: props.backButton,
            backButtonOnFirstView: props.backButtonOnFirstView,
            activeViewName: props.activeViewName,
            animation: props.animation,
            views: props.views,
            sidepanel: props.sidepanel,
            GUIDisabled: props.GUIDisabled,
            GUIDisableCover: props.GUIDisableCover,
            mayers: props.mayers,
            children: props.children,
            animationTime: props.animationTime,
            handleBackBehaviourOnFirstView: props.handleBackBehaviourOnFirstView,
            viewsAnimationEndCallback: props.viewsAnimationEndCallback,
            stackMode: props.stackMode,
            handleBackButton: props.handleBackButton
        };
        return _this;
    }

    _createClass(AirrSceneWrapper, [{
        key: "getFreshViewConfig",
        value: function getFreshViewConfig(viewName) {
            var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (viewName in this.viewsConfig) {
                var config = Object.assign({}, this.viewsConfig[viewName]);
                var viewNameGenerator = this.viewsConfig[viewName].nameGenerator;

                return (0, _immutabilityHelper2.default)(this.viewsConfig[viewName], {
                    props: {
                        $set: _extends({}, Object.assign({}, config.props), Object.assign({}, props), {
                            name: viewNameGenerator && typeof viewNameGenerator === "function" ? viewNameGenerator(this.state.views) : viewName
                        })
                    }
                });
            } else {
                throw new Error("Passed view name '" + viewName + "' is not present in viewsConfig.");
            }
        }
    }, {
        key: "__filterViews",
        value: function __filterViews() {
            var _this2 = this;

            var viewsNameList = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            return new Promise(function (resolve) {
                _this2.setState({
                    views: _this2.state.views.filter(function (view) {
                        return viewsNameList.indexOf(view.props.name) !== -1;
                    })
                }, resolve);
            });
        }
    }, {
        key: "__pushView",
        value: function __pushView(config) {
            var _this3 = this;

            var sceneProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            var newviewdefinition = (0, _immutabilityHelper2.default)(this.state.views, { $push: [config] });
            var stateChange = Object.assign({
                views: newviewdefinition
            }, Object.assign({}, config.sceneProps || {}), Object.assign({}, sceneProps));

            return new Promise(function (resolve) {
                return _this3.setState(stateChange, function () {
                    return resolve(config.props.name);
                });
            });
        }
    }, {
        key: "isValidViewConfig",
        value: function isValidViewConfig(object) {
            return (typeof object === "undefined" ? "undefined" : _typeof(object)) === "object" && "type" in object && _typeof(object.props) === "object" && "name" in object.props;
        }
    }, {
        key: "changeView",
        value: function changeView(view) {
            var _this4 = this;

            var viewProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var sceneProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            return this.__changeView(view, viewProps, sceneProps).then(function (viewName) {
                return _this4.__performViewsAnimation(viewName);
            });
        }
    }, {
        key: "__changeView",
        value: function __changeView(view) {
            var _this5 = this;

            var viewProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var sceneProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (typeof view === "string") {
                if (this.hasViewInState(view)) {
                    //if already in state then update its props
                    return new Promise(function (resolve) {
                        var viewIndex = _this5.getViewIndex(view);
                        var currentViewConfig = Object.assign({ sceneProps: {} }, //for a default props which will be latter used
                        _this5.state.views[viewIndex]);
                        var newViewConfig = (0, _immutabilityHelper2.default)(currentViewConfig, {
                            props: {
                                $set: _extends({}, currentViewConfig.props, viewProps)
                            }
                        });

                        var stateChange = _extends({
                            views: (0, _immutabilityHelper2.default)(_this5.state.views, _defineProperty({}, viewIndex, {
                                $set: newViewConfig
                            }))
                        }, currentViewConfig.sceneProps, Object.assign({}, sceneProps));

                        _this5.setState(stateChange, function () {
                            return resolve(view);
                        });
                    });
                } else if (this.hasViewInConfig(view)) {
                    //push fresh config
                    return this.__pushView(this.getFreshViewConfig(view, viewProps), sceneProps);
                } else return Promise.reject();
            } else if (this.isValidViewConfig(view)) {
                //push allready prepared config
                return this.__pushView(Object.assign({}, view, {
                    props: _extends({}, view.props, viewProps)
                }), sceneProps);
            } else {
                return Promise.reject();
            }
        }
    }, {
        key: "openMayer",


        /**
         * Add new mayer to this.state.mayers configurations array which will immediatelly open new mayer due to its nature
         *
         * @param {object} config
         * @returns {void}
         */
        value: function openMayer(config) {
            if (this.state.mayers.findIndex(function (item) {
                return item.name === config.name;
            }) !== -1) {
                console.warn("[Airr] Scene allready has Mayer with this name: " + config.name);
                return;
            }

            //if scene has sidepanel - disable it
            if (this.state.sidepanel && this.state.sidepanel.props.enabled) {
                this.disableSidepanel();
            }

            //add special functionality
            var preparedConfig = this.__prepareMayerConfig(config);

            return this.__addMayer(preparedConfig);
        }

        /**
         * Close mayer by name
         *
         * @param {string} name
         * @returns {void}
         */

    }, {
        key: "closeMayer",
        value: function closeMayer(name) {
            var _this6 = this;

            var mayerConfigIndex = this.state.mayers.findIndex(function (item) {
                return item.name === name;
            });

            if (mayerConfigIndex !== -1 && this.refsCOMPMayers[name] && this.refsCOMPMayers[name].current) {
                this.refsCOMPMayers[name].current.animateOut(function () {
                    //renew index because after animation
                    //things might have changed
                    mayerConfigIndex = _this6.state.mayers.findIndex(function (item) {
                        return item.name === name;
                    });

                    //last check if stil present
                    if (mayerConfigIndex !== -1 && _this6.refsCOMPMayers[name] && _this6.refsCOMPMayers[name].current) {
                        return _this6.__removeMayer(name).then(function () {
                            delete _this6.refsCOMPMayers[name];

                            if (_this6.state.sidepanel) {
                                var hasMayerLeft = false;
                                var children = [].concat(_toConsumableArray(_this6.refDOM.current.children));
                                children.forEach(function (item) {
                                    if (item.classList.contains("airr-mayer")) {
                                        hasMayerLeft = true;
                                    }
                                });

                                if (!hasMayerLeft) {
                                    _this6.enableSidepanel();
                                }
                            }
                        });
                    }
                });
            }
        }

        /**
         * If config has buttons that contains logical true `close` property,
         * this method will attach close mayer functionality to tap event on this button.
         *
         * @param {object} config mayer config object
         * @returns {void}
         */

    }, {
        key: "__prepareMayerConfig",
        value: function __prepareMayerConfig(mayerConfig) {
            var _this7 = this;

            var config = Object.assign({}, mayerConfig);

            var ref = _react2.default.createRef();
            config.ref = ref;
            this.refsCOMPMayers[config.name] = ref;

            if (config.buttons && config.buttons.length) {
                config.buttons.forEach(function (item) {
                    if (item.close) {
                        if (item.handler) {
                            var oldHandler = item.handler;
                            item.handler = function (e) {
                                oldHandler(e);
                                _this7.closeMayer(config.name);
                            };
                        } else {
                            item.handler = function (e) {
                                _this7.closeMayer(config.name);
                            };
                        }
                    }
                });
            }

            return config;
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.state.navbar && this.state.navbarHeight && this.refDOMContainer.current) {
                this.refDOMContainer.current.style.height = this.refDOMContainer.current.parentNode.clientHeight - this.state.navbarHeight + "px";
            }

            /**
             * Call first active view life cycle method - viewAfterActivation
             */
            if (this.state.activeViewName && this.refsCOMPViews[this.state.activeViewName] && typeof this.refsCOMPViews[this.state.activeViewName].current.viewAfterActivation === "function") {
                this.refsCOMPViews[this.state.activeViewName].current.viewAfterActivation();
            }
        }
    }, {
        key: "__prepareSidepanel",
        value: function __prepareSidepanel(sidepanel) {
            sidepanel.props.ref = this.refCOMPSidepanel;
            if (typeof sidepanel.props.enabled === "undefined") {
                sidepanel.props.enabled = true; //force explicit value, e.g needed when checking if panel is enabled in `openMayer` method
            }
            return Object.assign({}, sidepanel);
        }

        /**
         * Takes array of views and assign react specific properties (key and ref) to each view configuartion
         *
         * @param {array} views
         * @returns {void}
         */

    }, {
        key: "__prepareViews",
        value: function __prepareViews(views) {
            var _this8 = this;

            return views.map(function (item) {
                item.props.key = item.props.name;

                var ref = _react2.default.createRef();
                item.props.ref = ref;
                _this8.refsCOMPViews[item.props.name] = ref;

                return item;
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _state = this.state,
                views = _state.views,
                sidepanel = _state.sidepanel,
                stateRest = _objectWithoutProperties(_state, ["views", "sidepanel"]);

            return _react2.default.createElement(_AirrScene2.default, _extends({}, _extends({}, stateRest, {
                views: this.__prepareViews(views),
                sidepanel: sidepanel && this.__prepareSidepanel(sidepanel),
                refDOM: this.refDOM,
                refDOMContainer: this.refDOMContainer,
                refDOMNavbar: this.refDOMNavbar,
                refCOMPSidepanel: this.refCOMPSidepanel
            }), this.getViewProps()));
        }
    }, {
        key: "__performViewsAnimation",

        /**
         * Changes scenes active view
         *
         * @param {string} newViewName
         * @returns {Promise}
         */
        value: function __performViewsAnimation(newViewName) {
            var _this9 = this;

            if (typeof newViewName === "string") {
                /**
                 * viewChangeInProgress
                 * set here before any next setState call which might be executed after some batched state changes
                 * (that will repeat activeViewName and viewChangeInProgress will not be set in componentWillReceiveProps)
                 */
                this.viewChangeInProgress = true;
                return new Promise(function (resolve, reject) {
                    _this9.setState({ GUIDisabled: true, mockTitle: newViewName }, function () {
                        if (newViewName === _this9.state.activeViewName) {
                            console.warn("[Airr] This View is already active.");
                            _this9.viewChangeInProgress = false;
                            _this9.setState({ GUIDisabled: false });
                            return;
                        }

                        if (_this9.getViewIndex(newViewName) !== -1) {
                            var oldViewName = _this9.state.activeViewName;
                            var newViewComp = _this9.refsCOMPViews[newViewName] && _this9.refsCOMPViews[newViewName].current;
                            var oldViewComp = _this9.refsCOMPViews[oldViewName] && _this9.refsCOMPViews[oldViewName].current;
                            var animEndCallback = function animEndCallback() {
                                _this9.viewChangeInProgress = false;

                                if (newViewComp && typeof newViewComp.viewAfterActivation === "function") {
                                    newViewComp.viewAfterActivation();
                                }

                                if (oldViewComp && typeof oldViewComp.viewAfterDeactivation === "function") {
                                    oldViewComp.viewAfterDeactivation();
                                }

                                if (typeof _this9.props.viewsAnimationEndCallback === "function") {
                                    _this9.props.viewsAnimationEndCallback();
                                }

                                resolve();
                            };

                            if (newViewComp && typeof newViewComp.viewBeforeActivation === "function") {
                                newViewComp.viewBeforeActivation();
                            }

                            if (oldViewComp && typeof oldViewComp.viewBeforeDeactivation === "function") {
                                oldViewComp.viewBeforeDeactivation();
                            }

                            if (_this9.state.animation) {
                                _this9.__doViewsAnimation(newViewName, oldViewName).then(function () {
                                    _this9.setState({
                                        activeViewName: newViewName,
                                        GUIDisabled: false,
                                        mockTitle: false
                                    }, animEndCallback);
                                });
                            } else {
                                _this9.setState({
                                    activeViewName: newViewName,
                                    GUIDisabled: false,
                                    mockTitle: false
                                }, animEndCallback);
                            }
                        } else {
                            _this9.viewChangeInProgress = false;
                            console.warn("[Airr] View with name " + newViewName + " is not presence in this Scene.");
                        }
                    });
                });
            } else {
                console.warn("[Airr] You must specify view name property as string value");
                return Promise.reject();
            }
        }

        /**
         * Perform animation between old and new active view
         *
         * @param {string} newViewName
         * @param {string} oldViewName
         * @returns {Promise}
         */

    }, {
        key: "__doViewsAnimation",
        value: function __doViewsAnimation(newViewName, oldViewName) {
            var _this10 = this;

            return new Promise(function (resolve, reject) {
                var newViewDOM = _this10.refsCOMPViews[newViewName] && _this10.refsCOMPViews[newViewName].current && _this10.refsCOMPViews[newViewName].current.refDOM && _this10.refsCOMPViews[newViewName].current.refDOM.current;
                var oldViewIndex = _this10.getViewIndex(oldViewName);
                var newViewIndex = _this10.getViewIndex(newViewName);

                var direction = newViewIndex > oldViewIndex ? 1 : -1;

                if (!newViewDOM) {
                    throw new Error("new view DOM refference was not found");
                }

                if (_this10.state.navbar) {
                    //perform navbar animations
                    var titleNode = _this10.refDOMNavbar.current.querySelector(".title");
                    var mockTitle = _this10.refDOMNavbar.current.querySelector(".mock-title");
                    var mockTextSpan = mockTitle && mockTitle.children[0];
                    var mockTextSpanWidth = mockTextSpan ? mockTextSpan.clientWidth : 0;

                    if (titleNode) {
                        _AirrFX2.default.doTransitionAnimation(titleNode, {
                            webkitTransform: "translate3d(" + ((titleNode.clientWidth / 2 + mockTextSpanWidth / 2) * direction + "px") + ",0,0)",
                            transform: "translate3d(" + ((titleNode.clientWidth / 2 + mockTextSpanWidth / 2) * direction + "px") + ",0,0)",
                            opacity: 0
                        }, ["opacity " + _this10.props.animationTime + "ms ease-out", "transform " + _this10.props.animationTime + "ms ease-out"], {
                            webkitTransform: "translate3d(0,0,0)",
                            transform: "translate3d(0,0,0)",
                            opacity: 1
                        }, null, _this10.props.animationTime);
                    }

                    if (mockTitle) {
                        _AirrFX2.default.doTransitionAnimation(mockTitle, {
                            webkitTransform: "translate3d(0,0,0)",
                            transform: "translate3d(0,0,0)",
                            opacity: 1
                        }, ["opacity " + _this10.props.animationTime + "ms ease-out", "transform " + _this10.props.animationTime + "ms ease-out"], {
                            webkitTransform: "translate3d(" + (mockTextSpanWidth * direction * -1 + "px") + ",0,0)",
                            transform: "translate3d(" + (mockTextSpanWidth * direction * -1 + "px") + ",0,0)",
                            opacity: 0
                        }, null, _this10.props.animationTime);
                    }

                    if (_this10.state.backButton && _this10.state.stackMode) {
                        var backDOM = _this10.refDOMNavbar.current.querySelector(".back");

                        if (oldViewIndex === 0) {
                            _AirrFX2.default.doTransitionAnimation(backDOM, {
                                webkitTransform: "translate3d(100%,0,0)",
                                transform: "translate3d(100%,0,0)",
                                opacity: 0
                            }, ["opacity " + _this10.props.animationTime + "ms ease-out", "transform " + _this10.props.animationTime + "ms ease-out"], {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            }, function () {
                                return backDOM.classList.remove("hidden");
                            }, _this10.props.animationTime);
                        } else if (newViewIndex === 0) {
                            _AirrFX2.default.doTransitionAnimation(backDOM, {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            }, ["opacity " + _this10.props.animationTime + "ms ease-out", "transform " + _this10.props.animationTime + "ms ease-out"], {
                                webkitTransform: "translate3d(-100%,0,0)",
                                transform: "translate3d(-100%,0,0)",
                                opacity: 0
                            }, null, _this10.props.animationTime);
                        }
                    }
                }

                if (_this10.state.animation === "slide" && oldViewName) {
                    newViewDOM.style.display = "block";
                    var startProps = {};
                    var endProps = {};

                    if (direction === -1) {
                        startProps.webkitTransform = "translate3d(" + -1 * _this10.refDOM.current.clientWidth + "px,0,0)";
                        startProps.transform = "translate3d(" + -1 * _this10.refDOM.current.clientWidth + "px,0,0)";
                        endProps.webkitTransform = "translate3d(0,0,0)";
                        endProps.transform = "translate3d(0,0,0)";
                    } else {
                        endProps.webkitTransform = "translate3d(" + -1 * _this10.refDOM.current.clientWidth + "px,0,0)";
                        endProps.transform = "translate3d(" + -1 * _this10.refDOM.current.clientWidth + "px,0,0)";
                    }

                    _AirrFX2.default.doTransitionAnimation(_this10.refDOMContainer.current, startProps, ["transform " + _this10.props.animationTime + "ms ease-out"], endProps, null, _this10.props.animationTime, function () {
                        newViewDOM.style.display = "";
                        _this10.refDOMContainer.current.style.webkitTransform = "translate3d(0,0,0)";
                        _this10.refDOMContainer.current.style.transform = "translate3d(0,0,0)";
                        _this10.refDOMContainer.current.style.webkitTransition = "";
                        _this10.refDOMContainer.current.style.transition = "";
                        _this10.refDOMContainer.current.style.transition = "";
                        _this10.refDOMContainer.current.style.webkitBackfaceVisibility = "";
                        _this10.refDOMContainer.current.style.backfaceVisibility = "";

                        resolve();
                    });
                } else if (_this10.state.animation === "overlay" && oldViewName) {
                    if (direction === 1) {
                        _AirrFX2.default.doTransitionAnimation(newViewDOM, {
                            webkitTransform: "translate3d(" + (_this10.refDOMContainer.current.clientWidth + "px") + ",0,0)",
                            transform: "translate3d(" + (_this10.refDOMContainer.current.clientWidth + "px") + ",0,0)",
                            opacity: 0
                        }, ["opacity " + _this10.props.animationTime + "ms ease-out", "transform " + _this10.props.animationTime + "ms ease-out"], {
                            webkitTransform: "translate3d(0,0,0)",
                            transform: "translate3d(0,0,0)",
                            opacity: 1
                        }, function () {
                            return newViewDOM.style.zIndex = 102;
                        }, _this10.props.animationTime, function () {
                            newViewDOM.style.zIndex = "";
                            resolve();
                        });
                    } else {
                        if (_this10.state.stackMode) {
                            _AirrFX2.default.doTransitionAnimation(_this10.refsCOMPViews[oldViewName].current.refDOM.current, {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            }, ["opacity " + _this10.props.animationTime + "ms ease-out", "transform " + _this10.props.animationTime + "ms ease-out"], {
                                webkitTransform: "translate3d(0," + (_this10.refDOMContainer.current.clientHeight / 4 + "px") + ",0)",
                                transform: "translate3d(0," + (_this10.refDOMContainer.current.clientHeight / 4 + "px") + ",0)",
                                opacity: 0
                            }, null, _this10.props.animationTime, resolve);
                        } else {
                            _AirrFX2.default.doTransitionAnimation(newViewDOM, {
                                webkitTransform: "translate3d(" + (-1 * _this10.refDOMContainer.current.clientWidth + "px") + ",0,0)",
                                transform: "translate3d(" + (-1 * _this10.refDOMContainer.current.clientWidth + "px") + ",0,0)",
                                opacity: 0
                            }, ["opacity " + _this10.props.animationTime + "ms ease-out", "transform " + _this10.props.animationTime + "ms ease-out"], {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            }, function () {
                                return newViewDOM.style.zIndex = 102;
                            }, _this10.props.animationTime, function () {
                                newViewDOM.style.zIndex = "";
                                resolve();
                            });
                        }
                    }
                } else if (_this10.state.animation === "fade" || !oldViewName) {
                    _AirrFX2.default.doTransitionAnimation(newViewDOM, {
                        opacity: 0
                    }, ["opacity " + _this10.props.animationTime + "ms ease-out"], {
                        opacity: 1
                    }, function () {
                        return newViewDOM.style.zIndex = 102;
                    }, _this10.props.animationTime, function () {
                        newViewDOM.style.zIndex = "";
                        resolve();
                    });
                }
            });
        }
    }]);

    return AirrSceneWrapper;
}(_AirrViewWrapper3.default);

exports.default = AirrSceneWrapper;

AirrSceneWrapper.propTypes = _AirrScene2.default.propTypes;
AirrSceneWrapper.defaultProps = _AirrScene2.default.defaultProps;