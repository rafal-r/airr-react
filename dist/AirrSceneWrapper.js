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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrSceneWrapper = function (_AirrViewWrapper) {
    _inherits(AirrSceneWrapper, _AirrViewWrapper);

    /**
     * Refference to DOM element of container's div (first child of most outer element)
     */

    /**
     * Instantiated mayers Components refferences
     */

    /**
     *
     */
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
            var viewProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
            var sceneProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

            if (_this.state.views.length > 1) {
                var viewName = _this.state.views[_this.state.views.length - 2].props.name;

                return _this.changeView(viewName, viewProps, sceneProps).then(function () {
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

        _this.handleBackButton = function (viewProps, sceneProps) {
            if (_this.state.views.length > 1) {
                return _this.popView(viewProps, sceneProps);
            }

            return Promise.reject();
        };

        _this.disableSidepanel = function () {
            if (_this.state.sidepanel && _this.refCOMPSidepanel.current) {
                _this.refCOMPSidepanel.current.disable();
                return new Promise(function (resolve) {
                    return _this.setState({
                        sidepanel: (0, _immutabilityHelper2.default)(_this.state.sidepanel, {
                            props: {
                                enabled: { $set: false }
                            }
                        })
                    }, resolve);
                });
            }

            return Promise.reject();
        };

        _this.enableSidepanel = function () {
            if (_this.state.sidepanel && _this.refCOMPSidepanel.current) {
                _this.refCOMPSidepanel.current.enable();
                return new Promise(function (resolve) {
                    return _this.setState({
                        sidepanel: (0, _immutabilityHelper2.default)(_this.state.sidepanel, {
                            props: {
                                enabled: { $set: true }
                            }
                        })
                    }, resolve);
                });
            }

            return Promise.reject();
        };

        _this.openSidepanel = function () {
            if (_this.state.sidepanel && _this.refCOMPSidepanel.current) {
                return _this.refCOMPSidepanel.current.show();
            }

            return Promise.reject();
        };

        _this.hideSidepanel = function () {
            if (_this.state.sidepanel && _this.refCOMPSidepanel.current) {
                return _this.refCOMPSidepanel.current.hide();
            }

            return Promise.reject();
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
            handleBackButton: props.handleBackButton,
            stackMode: props.stackMode
        };
        return _this;
    }

    /**
     * Creates new view config base on configuration in `viewsConfig` variable.
     * When `viewNameGenerator` in present base configuration it will use to create new view name property.
     * This feature is handy when you want to easly create next views based upon generic view configuration.
     *
     * @param {string} viewName Name of the configuraion key in `this.viewsConfig` object
     * @param {object} props Additional prop to be merged with base config
     */

    /**
     * Refference to DOM element of navbar's div
     */

    /**
     * Instantiated sidepanel Component refference
     */


    /**
     * Instantiated views Components refferences
     */


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

        /**
         * Array of views names to stay in `this.state.views` array when animation of views finishes.
         * Used in `::viewsAnimationEndCallback` default method to filter views when needed.
         * If you populate names in this array the filter feature will be active by default
         * unless you overwrite `::viewsAnimationEndCallback` method in descendant class.
         */

    }, {
        key: "__filterViews",


        /**
         * Removes views that are not contained by name in array
         * @param {array} viewsNameList List of views names that will stay in state
         * @returns {Promise} Will be resolved on succesful state update
         */
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

        /**
         * Disables scene's GUI by provinding extra layer on top of everything else.
         * This layer can be customize by `cover` argument.
         * @param {object} cover React element to be placed in covering layer
         * @returns {Promise}  Will be resolved on succesful state update
         */


        /**
         * Disables layer covering scene and enable user interactions.
         * @returns {Promise} Will be resolved on succesful state update
         */


        /**
         * Get view index in views array
         * @param {string} viewName
         * @returns {integer}
         */

    }, {
        key: "__pushView",


        /**
         * Private method for pushing new view config into this.state.views array
         * @param {object} config
         * @param {object} sceneProps
         * @returns {Promise}  Will be resolved on succesful state update
         */
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

        /**
         * Pops out with animation currently active view from view's array
         * @param {object} viewProps props to modify the view just before popping
         * @param {object} sceneProps props to modify the scene while popping
         * @returns {Promise}  Will be resolved on succesful state update or rejected when no view to pop
         */

    }, {
        key: "isValidViewConfig",


        /**
         * Check wheter object is valid view config and can be added to view's array
         * @param {object} object
         * @returns {bool}
         */
        value: function isValidViewConfig(object) {
            return (typeof object === "undefined" ? "undefined" : _typeof(object)) === "object" && "type" in object && _typeof(object.props) === "object" && "name" in object.props;
        }

        /**
         * Crucial method of the scene component for manipalutaing views and scene properties and performing animations.
         * Can change active view with animation or just update view and scene properties.
         *
         * Change view by:
         * - string name kept in state views array which will lead to view change (with animation) or just update if currently active
         * - string name kept in `this.viewsConfig` which will lead to view push (with animation)
         * - new view config wich will lead to view change
         *
         * @param {string|object} view View name to change or view config to be added
         * @param {object} viewProps Extra props to be added to changing view
         * @param {object} sceneProps Extra props to manipulate this scene while changing view
         * @returns {Promise} Resolved on state succesful change and animation end. Or reject on failure.
         */

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

        /**
         * Removes view from views array
         * @param {string} name
         */

    }, {
        key: "destroyView",
        value: function destroyView(name) {
            var _this5 = this;

            return new Promise(function (resolve, reject) {
                var index = _this5.state.views.findIndex(function (view) {
                    return view.props.name === name;
                });

                if (index !== -1) {
                    _this5.setState({
                        views: (0, _immutabilityHelper2.default)(_this5.state.views, {
                            $splice: [[index, 1]]
                        })
                    }, resolve);
                } else {
                    reject("View with name: " + name + " was not found in this scene.");
                }
            });
        }

        /**
         * Make modification to scene's views by pushing new, updating current or changing between added views
         *
         * @param {string|object} view View name to change or view config to be added
         * @param {object} viewProps Extra props to be added to changing view
         * @param {object} sceneProps Extra props to manipulate this scene while changing view
         * @returns {Promise} Resolved on state succesful change and animation end. Or reject on failure.
         */

    }, {
        key: "__changeView",
        value: function __changeView(view) {
            var _this6 = this;

            var viewProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var sceneProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

            if (typeof view === "string") {
                if (this.hasViewInState(view)) {
                    //if already in state then update its props
                    return new Promise(function (resolve) {
                        var viewIndex = _this6.getViewIndex(view);
                        var currentViewConfig = Object.assign({ sceneProps: {} }, //for a default props which will be latter used
                        _this6.state.views[viewIndex]);
                        var newViewConfig = (0, _immutabilityHelper2.default)(currentViewConfig, {
                            props: {
                                $set: _extends({}, currentViewConfig.props, viewProps)
                            }
                        });

                        var stateChange = _extends({
                            views: (0, _immutabilityHelper2.default)(_this6.state.views, _defineProperty({}, viewIndex, {
                                $set: newViewConfig
                            }))
                        }, currentViewConfig.sceneProps, Object.assign({}, sceneProps));

                        _this6.setState(stateChange, function () {
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

        /**
         * Check if view's name is described by some config in `this.viewsConfig`
         * @param {string} name
         * @returns {bool}
         */


        /**
         * Check if view recognize by name argument is present in state
         * @param {string} name
         * @returns {bool}
         */


        /**
         * Utility function to handle back button clicks.
         * Can be overwritten by class extending this wrapper.
         * By default it pops currently active view.
         * To use it, assign it's value to state like this:
         * this.state.handleBackButton = this.handleBackButton
         * 
         * @returns {Promise} Resolved on state succesful change or reject on failure.
         */


        /**
         * Disables scene's sidepanel by setting it prop enabled = false. 
         * @returns {Promise} Resolved on state succesful change or reject on failure.
         */


        /**
         * Enables scene's sidepanel by setting it prop enabled = true. 
         * @returns {Promise} Resolved on state succesful change or reject on failure.
         */


        /**
         * Shows sidepanel
         * @returns {Promise}
         */


        /**
         * Hides sidepanel
         * @returns {Promise}
         */

    }, {
        key: "openMayer",


        /**
         * Add new mayer to this.state.mayers configurations array.
         * This will immediatelly open new mayer due to `componentDidMount` lifecycle implementation.
         *
         * @param {object} config Mayer config object.
         * @returns {Promise}
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
         * @param {string} name Unique mayer name
         * @returns {Promise}
         */

    }, {
        key: "closeMayer",
        value: function closeMayer(name) {
            var _this7 = this;

            var mayerConfigIndex = this.state.mayers.findIndex(function (item) {
                return item.name === name;
            });

            if (mayerConfigIndex !== -1 && this.refsCOMPMayers[name] && this.refsCOMPMayers[name].current) {
                this.refsCOMPMayers[name].current.animateOut(function () {
                    //renew index because after animation
                    //things might have changed
                    mayerConfigIndex = _this7.state.mayers.findIndex(function (item) {
                        return item.name === name;
                    });

                    //last check if stil present
                    if (mayerConfigIndex !== -1 && _this7.refsCOMPMayers[name] && _this7.refsCOMPMayers[name].current) {
                        return _this7.__removeMayer(name).then(function () {
                            delete _this7.refsCOMPMayers[name];

                            if (_this7.state.sidepanel) {
                                var hasMayerLeft = false;
                                var children = [].concat(_toConsumableArray(_this7.refDOM.current.children));
                                children.forEach(function (item) {
                                    if (item.classList.contains("airr-mayer")) {
                                        hasMayerLeft = true;
                                    }
                                });

                                if (!hasMayerLeft) {
                                    _this7.enableSidepanel();
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
         * @param {object} mayerConfig mayer config object
         * @returns {object}
         */

    }, {
        key: "__prepareMayerConfig",
        value: function __prepareMayerConfig(mayerConfig) {
            var _this8 = this;

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
                                _this8.closeMayer(config.name);
                            };
                        } else {
                            item.handler = function (e) {
                                _this8.closeMayer(config.name);
                            };
                        }
                    }
                });
            }

            return config;
        }

        /**
         * Private utility for adding mayers
         * @param {objec} config
         * @returns {Promise}
         */


        /**
         * Private utility for removing mayers
         * @param {string} name Mayer name
         * @returns {Promise}
         */


        /**
         * Disables back button meaning it will not be visible in navbar anymore.
         * @returns {Promise}
         */


        /**
         * Enables back button meaning it will be visible in navbar.
         * @returns {Promise}
         */


        /**
         * Action dispatcher method. Will return a function ready to fire view change.
         * @param {string} name
         * @param {array} viewsNamesToStayList
         * @returns {function} Function that will resolve view change on invoke.
         */

    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            if (this.state.navbar && this.state.navbarHeight && this.refDOMContainer.current) {
                //subsctract navbar height from scene's container
                this.refDOMContainer.current.style.height = this.refDOMContainer.current.parentNode.clientHeight - this.state.navbarHeight + "px";
            }

            /**
             * Call first active view life cycle method - viewAfterActivation
             */
            if (this.state.activeViewName && this.refsCOMPViews[this.state.activeViewName] && typeof this.refsCOMPViews[this.state.activeViewName].current.viewAfterActivation === "function") {
                this.refsCOMPViews[this.state.activeViewName].current.viewAfterActivation();
            }
        }

        /**
         * Private utility function for preparing sidepanel configuration objects 
         * @param {object} sidepanel 
         * @returns {object}
         */

    }, {
        key: "__prepareSidepanel",
        value: function __prepareSidepanel(sidepanel) {
            var _this9 = this;

            sidepanel.props.ref = this.refCOMPSidepanel;
            sidepanel.props.visibilityCallback = function (isShown) {
                _this9.setState({
                    sidepanel: (0, _immutabilityHelper2.default)(_this9.state.sidepanel, {
                        props: {
                            isShown: {
                                $set: isShown
                            }
                        }
                    })
                });
            };

            if (typeof sidepanel.props.enabled === "undefined") {
                sidepanel.props.enabled = true; //force explicit value, e.g needed when checking if panel is enabled in `openMayer` method
            }

            return Object.assign({}, sidepanel);
        }

        /**
         * Takes array of views and assign react specific properties (key and ref) to each view configuartion
         *
         * @param {array} views
         * @returns {array}
         */

    }, {
        key: "__prepareViews",
        value: function __prepareViews(views) {
            var _this10 = this;

            return views.map(function (item) {
                item.props.key = item.props.name;

                var ref = _react2.default.createRef();
                item.props.ref = ref;
                _this10.refsCOMPViews[item.props.name] = ref;

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

        /**
         * Describes if views animation is taking place
         */

    }, {
        key: "__performViewsAnimation",


        /**
         * Private utility function that changes views with animation
         *
         * @param {string} newViewName
         * @returns {Promise}
         */
        value: function __performViewsAnimation(newViewName) {
            var _this11 = this;

            if (typeof newViewName === "string") {
                this.viewChangeInProgress = true;

                return new Promise(function (resolve, reject) {
                    if (newViewName === _this11.state.activeViewName) {
                        console.warn("[Airr] This View is already active.");
                        _this11.viewChangeInProgress = false;
                        return resolve();
                    }

                    _this11.setState({ GUIDisabled: true, mockTitle: newViewName }, function () {
                        if (_this11.getViewIndex(newViewName) !== -1) {
                            var oldViewName = _this11.state.activeViewName;
                            var newViewComp = _this11.refsCOMPViews[newViewName] && _this11.refsCOMPViews[newViewName].current;
                            var oldViewComp = _this11.refsCOMPViews[oldViewName] && _this11.refsCOMPViews[oldViewName].current;
                            var animEndCallback = function animEndCallback() {
                                _this11.viewChangeInProgress = false;

                                if (newViewComp && typeof newViewComp.viewAfterActivation === "function") {
                                    newViewComp.viewAfterActivation();
                                }

                                if (oldViewComp && typeof oldViewComp.viewAfterDeactivation === "function") {
                                    oldViewComp.viewAfterDeactivation();
                                }

                                if (typeof _this11.props.viewsAnimationEndCallback === "function") {
                                    _this11.props.viewsAnimationEndCallback();
                                }

                                resolve();
                            };

                            if (newViewComp && typeof newViewComp.viewBeforeActivation === "function") {
                                newViewComp.viewBeforeActivation();
                            }

                            if (oldViewComp && typeof oldViewComp.viewBeforeDeactivation === "function") {
                                oldViewComp.viewBeforeDeactivation();
                            }

                            if (_this11.state.animation) {
                                _this11.__doViewsAnimation(newViewName, oldViewName).then(function () {
                                    _this11.setState({
                                        activeViewName: newViewName,
                                        GUIDisabled: false,
                                        mockTitle: false
                                    }, animEndCallback);
                                });
                            } else {
                                _this11.setState({
                                    activeViewName: newViewName,
                                    GUIDisabled: false,
                                    mockTitle: false
                                }, animEndCallback);
                            }
                        } else {
                            _this11.viewChangeInProgress = false;
                            console.warn("[Airr] View with name " + newViewName + " is not presence in this Scene.");
                            reject();
                        }
                    });
                });
            } else {
                console.warn("[Airr] You must specify view name property as string value");
                return Promise.reject();
            }
        }

        /**
         * Private utility function. This one actually makes animations.
         *
         * @param {string} newViewName
         * @param {string} oldViewName
         * @returns {Promise}
         */

    }, {
        key: "__doViewsAnimation",
        value: function __doViewsAnimation(newViewName, oldViewName) {
            var _this12 = this;

            return new Promise(function (resolve, reject) {
                var newViewDOM = _this12.refsCOMPViews[newViewName] && _this12.refsCOMPViews[newViewName].current && _this12.refsCOMPViews[newViewName].current.refDOM && _this12.refsCOMPViews[newViewName].current.refDOM.current;
                var oldViewIndex = _this12.getViewIndex(oldViewName);
                var newViewIndex = _this12.getViewIndex(newViewName);

                var direction = newViewIndex > oldViewIndex ? 1 : -1;

                if (!newViewDOM) {
                    throw new Error("new view DOM refference was not found");
                }

                if (_this12.state.navbar) {
                    //perform navbar animations
                    var titleNode = _this12.refDOMNavbar.current.querySelector(".title");
                    var mockTitle = _this12.refDOMNavbar.current.querySelector(".mock-title");
                    var mockTextSpan = mockTitle && mockTitle.children[0];
                    var mockTextSpanWidth = mockTextSpan ? mockTextSpan.clientWidth : 0;

                    if (titleNode) {
                        _AirrFX2.default.doTransitionAnimation(titleNode, {
                            webkitTransform: "translate3d(" + ((titleNode.clientWidth / 2 + mockTextSpanWidth / 2) * direction + "px") + ",0,0)",
                            transform: "translate3d(" + ((titleNode.clientWidth / 2 + mockTextSpanWidth / 2) * direction + "px") + ",0,0)",
                            opacity: 0
                        }, ["opacity " + _this12.state.animationTime + "ms ease-out", "transform " + _this12.state.animationTime + "ms ease-out"], {
                            webkitTransform: "translate3d(0,0,0)",
                            transform: "translate3d(0,0,0)",
                            opacity: 1
                        }, null, _this12.state.animationTime);
                    }

                    if (mockTitle) {
                        _AirrFX2.default.doTransitionAnimation(mockTitle, {
                            webkitTransform: "translate3d(0,0,0)",
                            transform: "translate3d(0,0,0)",
                            opacity: 1
                        }, ["opacity " + _this12.state.animationTime + "ms ease-out", "transform " + _this12.state.animationTime + "ms ease-out"], {
                            webkitTransform: "translate3d(" + (mockTextSpanWidth * direction * -1 + "px") + ",0,0)",
                            transform: "translate3d(" + (mockTextSpanWidth * direction * -1 + "px") + ",0,0)",
                            opacity: 0
                        }, null, _this12.state.animationTime);
                    }

                    if (_this12.state.backButton && !_this12.state.backButtonOnFirstView) {
                        var backDOM = _this12.refDOMNavbar.current.querySelector(".back");

                        if (oldViewIndex === 0) {
                            //show back button with animation
                            _AirrFX2.default.doTransitionAnimation(backDOM, {
                                webkitTransform: "translate3d(100%,0,0)",
                                transform: "translate3d(100%,0,0)",
                                opacity: 0
                            }, ["opacity " + _this12.state.animationTime + "ms ease-out", "transform " + _this12.state.animationTime + "ms ease-out"], {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            }, function () {
                                return backDOM.classList.remove("hidden");
                            }, _this12.state.animationTime);
                        } else if (newViewIndex === 0) {
                            //hide backbutton with animation
                            _AirrFX2.default.doTransitionAnimation(backDOM, {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            }, ["opacity " + _this12.state.animationTime + "ms ease-out", "transform " + _this12.state.animationTime + "ms ease-out"], {
                                webkitTransform: "translate3d(-100%,0,0)",
                                transform: "translate3d(-100%,0,0)",
                                opacity: 0
                            }, null, _this12.state.animationTime, function () {
                                backDOM.style.webkitTransform = "";
                                backDOM.style.transform = "";
                                backDOM.style.opacity = "";
                            });
                        }
                    }
                }

                if (_this12.state.animation === "slide" && oldViewName) {
                    newViewDOM.style.display = "block";
                    var startProps = {};
                    var endProps = {};

                    if (direction === -1) {
                        startProps.webkitTransform = "translate3d(" + -1 * _this12.refDOM.current.clientWidth + "px,0,0)";
                        startProps.transform = "translate3d(" + -1 * _this12.refDOM.current.clientWidth + "px,0,0)";
                        endProps.webkitTransform = "translate3d(0,0,0)";
                        endProps.transform = "translate3d(0,0,0)";
                    } else {
                        endProps.webkitTransform = "translate3d(" + -1 * _this12.refDOM.current.clientWidth + "px,0,0)";
                        endProps.transform = "translate3d(" + -1 * _this12.refDOM.current.clientWidth + "px,0,0)";
                    }

                    _AirrFX2.default.doTransitionAnimation(_this12.refDOMContainer.current, startProps, ["transform " + _this12.state.animationTime + "ms ease-out"], endProps, null, _this12.state.animationTime, function () {
                        newViewDOM.style.display = "";
                        _this12.refDOMContainer.current.style.webkitTransform = "translate3d(0,0,0)";
                        _this12.refDOMContainer.current.style.transform = "translate3d(0,0,0)";
                        _this12.refDOMContainer.current.style.webkitTransition = "";
                        _this12.refDOMContainer.current.style.transition = "";
                        _this12.refDOMContainer.current.style.transition = "";
                        _this12.refDOMContainer.current.style.webkitBackfaceVisibility = "";
                        _this12.refDOMContainer.current.style.backfaceVisibility = "";

                        resolve();
                    });
                } else if (_this12.state.animation === "overlay" && oldViewName) {
                    if (direction === 1) {
                        _AirrFX2.default.doTransitionAnimation(newViewDOM, {
                            webkitTransform: "translate3d(" + (_this12.refDOMContainer.current.clientWidth + "px") + ",0,0)",
                            transform: "translate3d(" + (_this12.refDOMContainer.current.clientWidth + "px") + ",0,0)",
                            opacity: 0,
                            display: "block"
                        }, ["opacity " + _this12.state.animationTime + "ms ease-out", "transform " + _this12.state.animationTime + "ms ease-out"], {
                            webkitTransform: "translate3d(0,0,0)",
                            transform: "translate3d(0,0,0)",
                            opacity: 1
                        }, function () {
                            return newViewDOM.style.zIndex = 102;
                        }, _this12.state.animationTime, function () {
                            newViewDOM.style.zIndex = "";
                            newViewDOM.style.display = "";
                            newViewDOM.style.transform = "";
                            newViewDOM.style.webkitTransform = "";
                            newViewDOM.style.transition = "";
                            newViewDOM.style.webkitTransition = "";
                            newViewDOM.style.opacity = "";

                            resolve();
                        });
                    } else {
                        if (_this12.state.stackMode) {
                            var oldViewDOM = _this12.refsCOMPViews[oldViewName].current.refDOM.current;
                            newViewDOM.style.display = "block";
                            newViewDOM.style.opacity = 1;

                            _AirrFX2.default.doTransitionAnimation(oldViewDOM, {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            }, ["opacity " + _this12.state.animationTime + "ms ease-out", "transform " + _this12.state.animationTime + "ms ease-out"], {
                                webkitTransform: "translate3d(0," + (_this12.refDOMContainer.current.clientHeight / 4 + "px") + ",0)",
                                transform: "translate3d(0," + (_this12.refDOMContainer.current.clientHeight / 4 + "px") + ",0)",
                                opacity: 0
                            }, null, _this12.state.animationTime, function () {
                                oldViewDOM.style.transition = "";
                                oldViewDOM.style.webkitTransition = "";
                                oldViewDOM.style.transform = "";
                                oldViewDOM.style.webkitTransform = "";
                                oldViewDOM.style.opacity = "";

                                newViewDOM.style.display = "";
                                newViewDOM.style.opacity = "";

                                resolve();
                            });
                        } else {
                            newViewDOM.style.display = "block";

                            _AirrFX2.default.doTransitionAnimation(newViewDOM, {
                                webkitTransform: "translate3d(" + (-1 * _this12.refDOMContainer.current.clientWidth + "px") + ",0,0)",
                                transform: "translate3d(" + (-1 * _this12.refDOMContainer.current.clientWidth + "px") + ",0,0)",
                                opacity: 0
                            }, ["opacity " + _this12.state.animationTime + "ms ease-out", "transform " + _this12.state.animationTime + "ms ease-out"], {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            }, function () {
                                return newViewDOM.style.zIndex = 102;
                            }, _this12.state.animationTime, function () {
                                newViewDOM.style.display = "";
                                newViewDOM.style.zIndex = "";
                                newViewDOM.style.transform = "";
                                newViewDOM.style.webkitTransform = "";
                                newViewDOM.style.transition = "";
                                newViewDOM.style.webkitTransition = "";
                                newViewDOM.style.opacity = "";

                                resolve();
                            });
                        }
                    }
                } else if (_this12.state.animation === "fade" || !oldViewName) {
                    _AirrFX2.default.doTransitionAnimation(newViewDOM, {
                        opacity: 0
                    }, ["opacity " + _this12.state.animationTime + "ms ease-out"], {
                        opacity: 1
                    }, function () {
                        return newViewDOM.style.zIndex = 102;
                    }, _this12.state.animationTime, function () {
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


AirrSceneWrapper.defaultProps = _extends({}, _AirrScene2.default.defaultProps, { stackMode: false });
AirrSceneWrapper.propTypes = _extends({}, _AirrScene2.default.propTypes, {
    /**
     * This propety changes behaviour of views animation when overlay animation is set
     */
    stackMode: _propTypes2.default.bool
});