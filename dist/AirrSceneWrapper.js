"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var React = _interopRequireWildcard(require("react"));

var _AirrFX = _interopRequireDefault(require("./AirrFX"));

var _AirrScene = _interopRequireWildcard(require("./AirrScene"));

var _AirrViewWrapper2 = _interopRequireDefault(require("./AirrViewWrapper"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AirrSceneWrapper =
/*#__PURE__*/
function (_AirrViewWrapper) {
  _inherits(AirrSceneWrapper, _AirrViewWrapper);

  /**
   * Object that keep information about views configuraion objects.
   * Every key in this object describes another view.
   * That configuration later will be used to create new view and add it to state views array.
   * Used by ::getFreshViewConfig to deliver new view config.
   * This approach is mainly used in crucial components's ::changeView method.
   */

  /**
   * Instantiated views Component's refferences
   */

  /**
   * Instantiated mayers Components refferences
   */

  /**
   * Instantiated sidepanel Component refference
   */

  /**
   * Refference to DOM element of container's div (first child of most outer element)
   */

  /**
   * Refference to DOM element of navbar's div
   */

  /**
   * Helper variable for storing views names that will be filtered
   */
  function AirrSceneWrapper(props) {
    var _this;

    _classCallCheck(this, AirrSceneWrapper);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AirrSceneWrapper).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "state", void 0);

    _defineProperty(_assertThisInitialized(_this), "viewsConfig", void 0);

    _defineProperty(_assertThisInitialized(_this), "refsCOMPViews", {});

    _defineProperty(_assertThisInitialized(_this), "refsCOMPMayers", {});

    _defineProperty(_assertThisInitialized(_this), "refCOMPSidepanel", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "refDOMContainer", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "refDOMNavbar", React.createRef());

    _defineProperty(_assertThisInitialized(_this), "viewsNamesToStayList", []);

    _defineProperty(_assertThisInitialized(_this), "disableGUI", function () {
      var cover = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      return new Promise(function (resolve) {
        return _this.setState({
          GUIDisabled: true,
          GUIDisableCover: cover
        }, resolve);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "enableGUI", function () {
      return new Promise(function (resolve) {
        return _this.setState({
          GUIDisabled: false,
          GUIDisableCover: null
        }, resolve);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getViewIndex", function (viewName) {
      return _this.state.views.findIndex(function (view) {
        return view.props.name === viewName;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "popView",
    /*#__PURE__*/
    _asyncToGenerator(
    /*#__PURE__*/
    regeneratorRuntime.mark(function _callee() {
      var viewProps,
          sceneProps,
          viewName,
          newviewdefinition,
          _args = arguments;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              viewProps = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
              sceneProps = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

              if (!(_this.state.views.length > 1)) {
                _context.next = 11;
                break;
              }

              viewName = _this.state.views[_this.state.views.length - 2].props.name;
              _context.next = 6;
              return _this.changeView(viewName, viewProps, sceneProps);

            case 6:
              newviewdefinition = (0, _immutabilityHelper["default"])(_this.state.views, {
                $splice: [[_this.state.views.length - 1, 1]]
              });
              delete _this.refsCOMPViews[_this.state.views[_this.state.views.length - 1].props.name];
              return _context.abrupt("return", new Promise(function (resolve) {
                return _this.setState({
                  views: newviewdefinition
                }, function () {
                  return resolve(viewName);
                });
              }));

            case 11:
              console.warn("[Airr] No view to pop.");
              return _context.abrupt("return", Promise.resolve());

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    })));

    _defineProperty(_assertThisInitialized(_this), "hasViewInConfig", function (name) {
      return name in _this.viewsConfig;
    });

    _defineProperty(_assertThisInitialized(_this), "hasViewInState", function (name) {
      return _this.state.views.findIndex(function (view) {
        return view.props.name === name;
      }) !== -1 ? true : false;
    });

    _defineProperty(_assertThisInitialized(_this), "handleBackButton", function () {
      var viewProps = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var sceneProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (_this.state.views.length > 1) {
        return _this.popView(viewProps, sceneProps);
      }

      return Promise.resolve();
    });

    _defineProperty(_assertThisInitialized(_this), "disableSidepanel", function () {
      if (_this.state.sidepanel && _this.refCOMPSidepanel.current) {
        _this.refCOMPSidepanel.current.disable();

        return new Promise(function (resolve) {
          return _this.setState({
            sidepanel: (0, _immutabilityHelper["default"])(_this.state.sidepanel, {
              props: {
                enabled: {
                  $set: false
                }
              }
            })
          }, resolve);
        });
      }

      console.warn("[Airr] No sidepanel to disable");
      return Promise.resolve();
    });

    _defineProperty(_assertThisInitialized(_this), "enableSidepanel", function () {
      if (_this.state.sidepanel && _this.refCOMPSidepanel.current) {
        _this.refCOMPSidepanel.current.enable();

        return new Promise(function (resolve) {
          return _this.setState({
            sidepanel: (0, _immutabilityHelper["default"])(_this.state.sidepanel, {
              props: {
                enabled: {
                  $set: true
                }
              }
            })
          }, resolve);
        });
      }

      console.warn("[Airr] No sidepanel to enable");
      return Promise.resolve();
    });

    _defineProperty(_assertThisInitialized(_this), "openSidepanel", function () {
      if (_this.state.sidepanel && _this.refCOMPSidepanel.current) {
        _this.setState({
          sidepanel: (0, _immutabilityHelper["default"])(_this.state.sidepanel, {
            props: {
              enabled: {
                $set: true
              }
            }
          })
        });

        return _this.refCOMPSidepanel.current.show();
      }

      return Promise.resolve();
    });

    _defineProperty(_assertThisInitialized(_this), "hideSidepanel", function () {
      if (_this.state.sidepanel && _this.refCOMPSidepanel.current) {
        return _this.refCOMPSidepanel.current.hide();
      }

      return Promise.resolve();
    });

    _defineProperty(_assertThisInitialized(_this), "__addMayer", function (config) {
      var newMayersDef = (0, _immutabilityHelper["default"])(_this.state.mayers, {
        $push: [config]
      });
      return new Promise(function (resolve) {
        return _this.setState({
          mayers: newMayersDef
        }, resolve);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "__removeMayer", function (name) {
      var newMayersDef = _this.state.mayers.filter(function (item) {
        return item.name !== name;
      });

      return new Promise(function (resolve) {
        return _this.setState({
          mayers: newMayersDef
        }, resolve);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "disableBackButton", function () {
      return new Promise(function (resolve) {
        return _this.setState({
          backButton: false
        }, resolve);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "enableBackButton", function () {
      return new Promise(function (resolve) {
        return _this.setState({
          backButton: true
        }, resolve);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "goToView", function (name) {
      var viewsNamesToStayList = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      return function () {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var sceneProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        _this.viewsNamesToStayList = viewsNamesToStayList;
        return _this.changeView(name, params, sceneProps);
      };
    });

    _defineProperty(_assertThisInitialized(_this), "__sidepanelVisibilityCallback", function (isShown) {
      _this.setState({
        sidepanel: (0, _immutabilityHelper["default"])(_this.state.sidepanel, {
          props: {
            isShown: {
              $set: isShown
            }
          }
        })
      }, function () {
        return _this.state.sidepanelVisibilityCallback && _this.state.sidepanelVisibilityCallback(isShown);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "viewChangeInProgress", false);

    _this.state = {
      name: props.name,
      active: props.active,
      className: props.className,
      title: props.title,
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
      sidepanelVisibilityCallback: props.sidepanelVisibilityCallback,
      GUIDisabled: props.GUIDisabled,
      GUIDisableCover: props.GUIDisableCover,
      mayers: props.mayers,
      children: props.children,
      animationTime: props.animationTime,
      handleBackBehaviourOnFirstView: props.handleBackBehaviourOnFirstView,
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


  _createClass(AirrSceneWrapper, [{
    key: "getFreshViewConfig",
    value: function getFreshViewConfig(viewName) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (viewName in this.viewsConfig) {
        var config = Object.assign({}, this.viewsConfig[viewName]);
        var viewNameGenerator = this.viewsConfig[viewName].nameGenerator;
        return (0, _immutabilityHelper["default"])(this.viewsConfig[viewName], {
          props: {
            $set: _objectSpread({}, Object.assign({}, config.props), Object.assign({}, props), {
              name: viewNameGenerator && typeof viewNameGenerator === "function" ? viewNameGenerator(this.state.views) : viewName
            })
          }
        });
      } else {
        throw new Error("Passed view name '".concat(viewName, "' is not present in viewsConfig."));
      }
    }
    /**
     * Removes views that are not contained by name in array
     * @param {array} viewsNameList List of views names that will stay in state
     * @returns {Promise} Will be resolved on succesful state update
     */

  }, {
    key: "filterViews",
    value: function filterViews() {
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
     * @param {ReactNode} cover React element to be placed in covering layer
     * @returns {Promise}  Will be resolved on succesful state update
     */

  }, {
    key: "__pushView",

    /**
     * Private method for pushing new view config into this.state.views array
     * @param {ViewsConfigItem} config
     * @param {Props} sceneProps
     * @returns {Promise}  Will be resolved on succesful state update
     */
    value: function __pushView(config) {
      var _this3 = this;

      var sceneProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var newviewdefinition = (0, _immutabilityHelper["default"])(this.state.views, {
        $push: [config]
      });
      var stateChange = Object.assign({
        views: newviewdefinition
      }, Object.assign({}, config.sceneProps || {}), Object.assign({}, sceneProps || {}));
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
     * @returns {boolean}
     */
    value: function isValidViewConfig(object) {
      return _typeof(object) === "object" && "type" in object && _typeof(object.props) === "object" && "name" in object.props;
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
    value: function () {
      var _changeView = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(view) {
        var viewProps,
            sceneProps,
            viewName,
            _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                viewProps = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
                sceneProps = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : {};
                _context2.next = 4;
                return this.__changeView(view, viewProps, sceneProps);

              case 4:
                viewName = _context2.sent;
                return _context2.abrupt("return", this.__performViewsAnimation(viewName));

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function changeView(_x) {
        return _changeView.apply(this, arguments);
      }

      return changeView;
    }()
    /**
     * Removes view from views array
     * @param {string} name
     */

  }, {
    key: "destroyView",
    value: function destroyView(name) {
      var _this4 = this;

      return new Promise(function (resolve, reject) {
        var index = _this4.state.views.findIndex(function (view) {
          return view.props.name === name;
        });

        if (index !== -1) {
          _this4.setState({
            views: (0, _immutabilityHelper["default"])(_this4.state.views, {
              $splice: [[index, 1]]
            })
          }, resolve);
        } else {
          reject("View with name: ".concat(name, " was not found in this scene."));
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
      var _this5 = this;

      var viewProps = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var sceneProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (typeof view === "string") {
        if (this.hasViewInState(view)) {
          //if already in state then update its props
          return new Promise(function (resolve) {
            var viewIndex = _this5.getViewIndex(view);

            var currentViewConfig = Object.assign({
              sceneProps: {}
            }, //for a default props which will be latter used
            _this5.state.views[viewIndex]);
            var newViewConfig = (0, _immutabilityHelper["default"])(currentViewConfig, {
              props: {
                $set: _objectSpread({}, currentViewConfig.props, viewProps)
              }
            });

            var stateChange = _objectSpread({
              views: (0, _immutabilityHelper["default"])(_this5.state.views, _defineProperty({}, viewIndex, {
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
          props: _objectSpread({}, view.props, viewProps)
        }), sceneProps);
      } else {
        return Promise.reject("Invalid `view` argument specify");
      }
    }
    /**
     * Check if view's name is described by some config in `this.viewsConfig` object
     * @param {string} name
     * @returns {boolean}
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
        return Promise.reject();
      } //if scene has sidepanel - disable it


      if (this.state.sidepanel && this.state.sidepanel.props.enabled) {
        this.disableSidepanel();
      } //add special functionality,props


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
      var _this6 = this;

      var mayerConfigIndex = this.state.mayers.findIndex(function (item) {
        return item.name === name;
      });

      if (mayerConfigIndex !== -1 && this.refsCOMPMayers[name] && this.refsCOMPMayers[name].current) {
        return new Promise(function (resolve) {
          _this6.refsCOMPMayers[name].current.animateOut(function () {
            //renew index because after animation
            //things might have changed
            mayerConfigIndex = _this6.state.mayers.findIndex(function (item) {
              return item.name === name;
            }); //last check if stil present

            if (mayerConfigIndex !== -1 && _this6.refsCOMPMayers[name] && _this6.refsCOMPMayers[name].current) {
              _this6.__removeMayer(name).then(function () {
                delete _this6.refsCOMPMayers[name];

                if (_this6.state.sidepanel) {
                  var hasMayerLeft = false;

                  var children = _toConsumableArray(Array.from(_this6.refDOM.current.children));

                  children.forEach(function (item) {
                    if (item.classList.contains("airr-mayer")) {
                      hasMayerLeft = true;
                    }
                  });

                  if (!hasMayerLeft) {
                    _this6.enableSidepanel();
                  }
                }

                resolve();
              });
            }
          });
        });
      }

      return Promise.resolve();
    }
    /**
     * Special method to be overwritten in descendant classes.
     * Called, as name sugest, when views animation finish.
     */

  }, {
    key: "viewsAnimationEnd",
    value: function viewsAnimationEnd(oldViewName, newViewName) {}
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
      var _this7 = this;

      var config = Object.assign({
        ref: undefined
      }, mayerConfig);
      var ref = React.createRef();
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

      config.avaibleHeight = this.refDOM.current.clientHeight || window.innerHeight;
      return config;
    }
    /**
     * Private utility for adding mayers
     * @param {objec} config
     * @returns {Promise}
     */

  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this8 = this;

      return new Promise(function (resolve) {
        if (window.addEventListener) {
          window.addEventListener("resize", function () {
            if (_this8.state.sidepanel) {
              _this8.__updateSidepanelSizeProps(_this8.refDOM.current.clientWidth, _this8.refDOM.current.clientHeight);
            }
          });
        }

        if (_this8.state.sidepanel) {
          _this8.__updateSidepanelSizeProps(_this8.refDOM.current.clientWidth, _this8.refDOM.current.clientHeight).then(resolve);
        } else {
          resolve();
        }
        /**
         * Call first active view life cycle method - viewAfterActivation
         */


        if (_this8.state.activeViewName && _this8.refsCOMPViews[_this8.state.activeViewName] && typeof _this8.refsCOMPViews[_this8.state.activeViewName].current.viewAfterActivation === "function") {
          _this8.refsCOMPViews[_this8.state.activeViewName].current.viewAfterActivation();
        }
      });
    }
    /**
     * Private utility function for updating sidepanel's sceneWidth,sceneHeight properties
     * @param {number} width
     * @param {number} height
     * @returns {Promise}
     */

  }, {
    key: "__updateSidepanelSizeProps",
    value: function __updateSidepanelSizeProps(width, height) {
      var _this9 = this;

      return new Promise(function (resolve) {
        _this9.setState({
          sidepanel: (0, _immutabilityHelper["default"])(_this9.state.sidepanel, {
            props: {
              sceneWidth: {
                $set: width
              },
              sceneHeight: {
                $set: height
              }
            }
          })
        }, resolve);
      });
    }
    /**
     * Private utility function for updating sidepanel isShown prop
     * @param {boolean} isShown
     * @returns {void}
     */

  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          views = _this$state.views,
          sidepanel = _this$state.sidepanel,
          className = _this$state.className,
          stateRest = _objectWithoutProperties(_this$state, ["views", "sidepanel", "className"]);

      return React.createElement(_AirrScene["default"], _extends({}, _objectSpread({}, stateRest, {
        views: views,
        sidepanel: sidepanel,
        refDOMContainer: this.refDOMContainer,
        refDOMNavbar: this.refDOMNavbar,
        refsCOMPViews: this.refsCOMPViews,
        refCOMPSidepanel: this.refCOMPSidepanel,
        sidepanelVisibilityCallback: this.__sidepanelVisibilityCallback
      }), this.getViewProps(), {
        className: className
      }));
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
      var _this10 = this;

      if (typeof newViewName === "string") {
        this.viewChangeInProgress = true;
        return new Promise(function (resolve, reject) {
          if (newViewName === _this10.state.activeViewName) {
            console.warn("[Airr] This View is already active.");
            _this10.viewChangeInProgress = false;
            return resolve();
          }

          _this10.setState({
            GUIDisabled: true,
            mockTitleName: newViewName
          }, function () {
            if (_this10.getViewIndex(newViewName) !== -1) {
              var oldViewName = _this10.state.activeViewName;
              var newViewComp = _this10.refsCOMPViews[newViewName] && _this10.refsCOMPViews[newViewName].current;
              var oldViewComp = _this10.refsCOMPViews[oldViewName] && _this10.refsCOMPViews[oldViewName].current;

              var animEndCallback = function animEndCallback() {
                _this10.viewChangeInProgress = false;

                if (newViewComp && typeof newViewComp.viewAfterActivation === "function") {
                  newViewComp.viewAfterActivation();
                }

                if (oldViewComp && typeof oldViewComp.viewAfterDeactivation === "function") {
                  oldViewComp.viewAfterDeactivation();
                }

                if (typeof _this10.viewsAnimationEnd === "function") {
                  _this10.viewsAnimationEnd(oldViewName, newViewName);
                }

                resolve();
              };

              if (newViewComp && typeof newViewComp.viewBeforeActivation === "function") {
                newViewComp.viewBeforeActivation();
              }

              if (oldViewComp && typeof oldViewComp.viewBeforeDeactivation === "function") {
                oldViewComp.viewBeforeDeactivation();
              }

              if (_this10.state.animation) {
                _this10.__doViewsAnimation(newViewName, oldViewName).then(function () {
                  _this10.setState({
                    activeViewName: newViewName,
                    GUIDisabled: false,
                    mockTitleName: null
                  }, animEndCallback);
                });
              } else {
                _this10.setState({
                  activeViewName: newViewName,
                  GUIDisabled: false,
                  mockTitleName: null
                }, animEndCallback);
              }
            } else {
              _this10.viewChangeInProgress = false;
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
     * Private utility function. This one actually makes css animations.
     *
     * @param {string} newViewName
     * @param {string} oldViewName
     * @returns {Promise}
     */

  }, {
    key: "__doViewsAnimation",
    value: function __doViewsAnimation(newViewName, oldViewName) {
      var _this11 = this;

      return new Promise(function (resolve, reject) {
        var newViewDOM = _this11.refsCOMPViews[newViewName] && _this11.refsCOMPViews[newViewName].current && _this11.refsCOMPViews[newViewName].current.refDOM && _this11.refsCOMPViews[newViewName].current.refDOM.current;

        var oldViewIndex = _this11.getViewIndex(oldViewName);

        var newViewIndex = _this11.getViewIndex(newViewName);

        var direction = newViewIndex > oldViewIndex ? 1 : -1;

        if (!newViewDOM) {
          throw new Error("new view DOM refference was not found");
        }

        if (_this11.state.navbar) {
          //perform navbar animations
          var titleNode = _this11.refDOMNavbar.current.querySelector(".title");

          var mockTitle = _this11.refDOMNavbar.current.querySelector(".mock-title");

          var mockTextSpan = mockTitle && mockTitle.children[0];
          var mockTextSpanWidth = mockTextSpan ? mockTextSpan.clientWidth : 0;

          if (titleNode) {
            _AirrFX["default"].doTransitionAnimation(titleNode, {
              webkitTransform: "translate3d(".concat((titleNode.clientWidth / 2 + mockTextSpanWidth / 2) * direction + "px", ",0,0)"),
              transform: "translate3d(".concat((titleNode.clientWidth / 2 + mockTextSpanWidth / 2) * direction + "px", ",0,0)"),
              opacity: 0
            }, ["opacity ".concat(_this11.state.animationTime, "ms ease-out"), "transform ".concat(_this11.state.animationTime, "ms ease-out")], {
              webkitTransform: "translate3d(0,0,0)",
              transform: "translate3d(0,0,0)",
              opacity: 1
            }, null, _this11.state.animationTime);
          }

          if (mockTitle) {
            _AirrFX["default"].doTransitionAnimation(mockTitle, {
              webkitTransform: "translate3d(0,0,0)",
              transform: "translate3d(0,0,0)",
              opacity: 1
            }, ["opacity ".concat(_this11.state.animationTime, "ms ease-out"), "transform ".concat(_this11.state.animationTime, "ms ease-out")], {
              webkitTransform: "translate3d(".concat(mockTextSpanWidth * direction * -1 + "px", ",0,0)"),
              transform: "translate3d(".concat(mockTextSpanWidth * direction * -1 + "px", ",0,0)"),
              opacity: 0
            }, null, _this11.state.animationTime);
          }

          if (_this11.state.backButton && !_this11.state.backButtonOnFirstView) {
            var backDOM = _this11.refDOMNavbar.current.querySelector(".back");

            if (oldViewIndex === 0) {
              //show back button with animation
              _AirrFX["default"].doTransitionAnimation(backDOM, {
                webkitTransform: "translate3d(100%,0,0)",
                transform: "translate3d(100%,0,0)",
                opacity: 0
              }, ["opacity ".concat(_this11.state.animationTime, "ms ease-out"), "transform ".concat(_this11.state.animationTime, "ms ease-out")], {
                webkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                opacity: 1
              }, function () {
                return backDOM.classList.remove("hidden");
              }, _this11.state.animationTime);
            } else if (newViewIndex === 0) {
              //hide backbutton with animation
              _AirrFX["default"].doTransitionAnimation(backDOM, {
                webkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                opacity: 1
              }, ["opacity ".concat(_this11.state.animationTime, "ms ease-out"), "transform ".concat(_this11.state.animationTime, "ms ease-out")], {
                webkitTransform: "translate3d(-100%,0,0)",
                transform: "translate3d(-100%,0,0)",
                opacity: 0
              }, null, _this11.state.animationTime, function () {
                backDOM.style.webkitTransform = "";
                backDOM.style.transform = "";
                backDOM.style.opacity = "";
              });
            }
          }
        }

        if (_this11.state.animation === "slide" && oldViewName) {
          newViewDOM.style.display = "block";
          var startProps = {};
          var endProps = {};

          if (direction === -1) {
            startProps.webkitTransform = "translate3d(" + -1 * _this11.refDOM.current.clientWidth + "px,0,0)";
            startProps.transform = "translate3d(" + -1 * _this11.refDOM.current.clientWidth + "px,0,0)";
            endProps.webkitTransform = "translate3d(0,0,0)";
            endProps.transform = "translate3d(0,0,0)";
          } else {
            endProps.webkitTransform = "translate3d(" + -1 * _this11.refDOM.current.clientWidth + "px,0,0)";
            endProps.transform = "translate3d(" + -1 * _this11.refDOM.current.clientWidth + "px,0,0)";
          }

          _AirrFX["default"].doTransitionAnimation(_this11.refDOMContainer.current, startProps, ["transform ".concat(_this11.state.animationTime, "ms ease-out")], endProps, null, _this11.state.animationTime, function () {
            newViewDOM.style.display = "";
            _this11.refDOMContainer.current.style.webkitTransform = "";
            _this11.refDOMContainer.current.style.transform = "";
            _this11.refDOMContainer.current.style.webkitTransition = "";
            _this11.refDOMContainer.current.style.transition = "";
            _this11.refDOMContainer.current.style.transition = "";
            _this11.refDOMContainer.current.style.webkitBackfaceVisibility = "";
            _this11.refDOMContainer.current.style.backfaceVisibility = "";
            resolve();
          });
        } else if (_this11.state.animation === "overlay" && oldViewName) {
          if (direction === 1) {
            _AirrFX["default"].doTransitionAnimation(newViewDOM, {
              webkitTransform: "translate3d(".concat(_this11.refDOMContainer.current.clientWidth + "px", ",0,0)"),
              transform: "translate3d(".concat(_this11.refDOMContainer.current.clientWidth + "px", ",0,0)"),
              opacity: 0,
              display: "block"
            }, ["opacity ".concat(_this11.state.animationTime, "ms ease-out"), "transform ".concat(_this11.state.animationTime, "ms ease-out")], {
              webkitTransform: "translate3d(0,0,0)",
              transform: "translate3d(0,0,0)",
              opacity: 1
            }, function () {
              return newViewDOM.style.zIndex = "102";
            }, _this11.state.animationTime, function () {
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
            if (_this11.state.stackMode) {
              var oldViewDOM = _this11.refsCOMPViews[oldViewName].current.refDOM.current;
              newViewDOM.style.display = "block";
              newViewDOM.style.opacity = "1";

              _AirrFX["default"].doTransitionAnimation(oldViewDOM, {
                webkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                opacity: 1
              }, ["opacity ".concat(_this11.state.animationTime, "ms ease-out"), "transform ".concat(_this11.state.animationTime, "ms ease-out")], {
                webkitTransform: "translate3d(0,".concat(_this11.refDOMContainer.current.clientHeight / 4 + "px", ",0)"),
                transform: "translate3d(0,".concat(_this11.refDOMContainer.current.clientHeight / 4 + "px", ",0)"),
                opacity: 0
              }, null, _this11.state.animationTime, function () {
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

              _AirrFX["default"].doTransitionAnimation(newViewDOM, {
                webkitTransform: "translate3d(".concat(-1 * _this11.refDOMContainer.current.clientWidth + "px", ",0,0)"),
                transform: "translate3d(".concat(-1 * _this11.refDOMContainer.current.clientWidth + "px", ",0,0)"),
                opacity: 0
              }, ["opacity ".concat(_this11.state.animationTime, "ms ease-out"), "transform ".concat(_this11.state.animationTime, "ms ease-out")], {
                webkitTransform: "translate3d(0,0,0)",
                transform: "translate3d(0,0,0)",
                opacity: 1
              }, function () {
                return newViewDOM.style.zIndex = "102";
              }, _this11.state.animationTime, function () {
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
        } else if (_this11.state.animation === "fade" || !oldViewName) {
          _AirrFX["default"].doTransitionAnimation(newViewDOM, {
            display: "block",
            opacity: 0
          }, ["opacity ".concat(_this11.state.animationTime, "ms ease-out")], {
            opacity: 1
          }, function () {
            return newViewDOM.style.zIndex = "102";
          }, _this11.state.animationTime, function () {
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
      });
    }
  }]);

  return AirrSceneWrapper;
}(_AirrViewWrapper2["default"]);

exports["default"] = AirrSceneWrapper;

_defineProperty(AirrSceneWrapper, "defaultProps", _objectSpread({}, _AirrScene.sceneDefaultProps, {
  stackMode: false
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyU2NlbmVXcmFwcGVyLnRzeCJdLCJuYW1lcyI6WyJBaXJyU2NlbmVXcmFwcGVyIiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZVJlZiIsImNvdmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRTdGF0ZSIsIkdVSURpc2FibGVkIiwiR1VJRGlzYWJsZUNvdmVyIiwidmlld05hbWUiLCJzdGF0ZSIsInZpZXdzIiwiZmluZEluZGV4IiwidmlldyIsIm5hbWUiLCJ2aWV3UHJvcHMiLCJzY2VuZVByb3BzIiwibGVuZ3RoIiwiY2hhbmdlVmlldyIsIm5ld3ZpZXdkZWZpbml0aW9uIiwiJHNwbGljZSIsInJlZnNDT01QVmlld3MiLCJjb25zb2xlIiwid2FybiIsInZpZXdzQ29uZmlnIiwicG9wVmlldyIsInNpZGVwYW5lbCIsInJlZkNPTVBTaWRlcGFuZWwiLCJjdXJyZW50IiwiZGlzYWJsZSIsImVuYWJsZWQiLCIkc2V0IiwiZW5hYmxlIiwic2hvdyIsImhpZGUiLCJjb25maWciLCJuZXdNYXllcnNEZWYiLCJtYXllcnMiLCIkcHVzaCIsImZpbHRlciIsIml0ZW0iLCJiYWNrQnV0dG9uIiwidmlld3NOYW1lc1RvU3RheUxpc3QiLCJwYXJhbXMiLCJpc1Nob3duIiwic2lkZXBhbmVsVmlzaWJpbGl0eUNhbGxiYWNrIiwiYWN0aXZlIiwiY2xhc3NOYW1lIiwidGl0bGUiLCJuYXZiYXIiLCJuYXZiYXJIZWlnaHQiLCJuYXZiYXJNZW51IiwibmF2YmFyQ2xhc3MiLCJiYWNrQnV0dG9uT25GaXJzdFZpZXciLCJhY3RpdmVWaWV3TmFtZSIsImFuaW1hdGlvbiIsImNoaWxkcmVuIiwiYW5pbWF0aW9uVGltZSIsImhhbmRsZUJhY2tCZWhhdmlvdXJPbkZpcnN0VmlldyIsImhhbmRsZUJhY2tCdXR0b24iLCJzdGFja01vZGUiLCJPYmplY3QiLCJhc3NpZ24iLCJ2aWV3TmFtZUdlbmVyYXRvciIsIm5hbWVHZW5lcmF0b3IiLCJFcnJvciIsInZpZXdzTmFtZUxpc3QiLCJpbmRleE9mIiwic3RhdGVDaGFuZ2UiLCJvYmplY3QiLCJfX2NoYW5nZVZpZXciLCJfX3BlcmZvcm1WaWV3c0FuaW1hdGlvbiIsInJlamVjdCIsImluZGV4IiwiaGFzVmlld0luU3RhdGUiLCJ2aWV3SW5kZXgiLCJnZXRWaWV3SW5kZXgiLCJjdXJyZW50Vmlld0NvbmZpZyIsIm5ld1ZpZXdDb25maWciLCJoYXNWaWV3SW5Db25maWciLCJfX3B1c2hWaWV3IiwiZ2V0RnJlc2hWaWV3Q29uZmlnIiwiaXNWYWxpZFZpZXdDb25maWciLCJkaXNhYmxlU2lkZXBhbmVsIiwicHJlcGFyZWRDb25maWciLCJfX3ByZXBhcmVNYXllckNvbmZpZyIsIl9fYWRkTWF5ZXIiLCJtYXllckNvbmZpZ0luZGV4IiwicmVmc0NPTVBNYXllcnMiLCJhbmltYXRlT3V0IiwiX19yZW1vdmVNYXllciIsInRoZW4iLCJoYXNNYXllckxlZnQiLCJBcnJheSIsImZyb20iLCJyZWZET00iLCJmb3JFYWNoIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJlbmFibGVTaWRlcGFuZWwiLCJvbGRWaWV3TmFtZSIsIm5ld1ZpZXdOYW1lIiwibWF5ZXJDb25maWciLCJyZWYiLCJ1bmRlZmluZWQiLCJidXR0b25zIiwiY2xvc2UiLCJoYW5kbGVyIiwib2xkSGFuZGxlciIsImUiLCJjbG9zZU1heWVyIiwiYXZhaWJsZUhlaWdodCIsImNsaWVudEhlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9fdXBkYXRlU2lkZXBhbmVsU2l6ZVByb3BzIiwiY2xpZW50V2lkdGgiLCJ2aWV3QWZ0ZXJBY3RpdmF0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJzY2VuZVdpZHRoIiwic2NlbmVIZWlnaHQiLCJzdGF0ZVJlc3QiLCJyZWZET01Db250YWluZXIiLCJyZWZET01OYXZiYXIiLCJfX3NpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjayIsImdldFZpZXdQcm9wcyIsInZpZXdDaGFuZ2VJblByb2dyZXNzIiwibW9ja1RpdGxlTmFtZSIsIm5ld1ZpZXdDb21wIiwib2xkVmlld0NvbXAiLCJhbmltRW5kQ2FsbGJhY2siLCJ2aWV3QWZ0ZXJEZWFjdGl2YXRpb24iLCJ2aWV3c0FuaW1hdGlvbkVuZCIsInZpZXdCZWZvcmVBY3RpdmF0aW9uIiwidmlld0JlZm9yZURlYWN0aXZhdGlvbiIsIl9fZG9WaWV3c0FuaW1hdGlvbiIsIm5ld1ZpZXdET00iLCJvbGRWaWV3SW5kZXgiLCJuZXdWaWV3SW5kZXgiLCJkaXJlY3Rpb24iLCJ0aXRsZU5vZGUiLCJxdWVyeVNlbGVjdG9yIiwibW9ja1RpdGxlIiwibW9ja1RleHRTcGFuIiwibW9ja1RleHRTcGFuV2lkdGgiLCJBaXJyRlgiLCJkb1RyYW5zaXRpb25BbmltYXRpb24iLCJ3ZWJraXRUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5IiwiYmFja0RPTSIsInJlbW92ZSIsInN0eWxlIiwiZGlzcGxheSIsInN0YXJ0UHJvcHMiLCJlbmRQcm9wcyIsIndlYmtpdFRyYW5zaXRpb24iLCJ0cmFuc2l0aW9uIiwid2Via2l0QmFja2ZhY2VWaXNpYmlsaXR5IiwiYmFja2ZhY2VWaXNpYmlsaXR5IiwiekluZGV4Iiwib2xkVmlld0RPTSIsIkFpcnJWaWV3V3JhcHBlciIsInNjZW5lRGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQ3FCQSxnQjs7Ozs7QUFPakI7Ozs7Ozs7O0FBU0E7Ozs7QUFJQTs7OztBQUlBOzs7O0FBSUE7Ozs7QUFJQTs7OztBQUlBOzs7QUFLQSw0QkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBOztBQUN0QiwwRkFBTUEsS0FBTjs7QUFEc0I7O0FBQUE7O0FBQUEsb0VBdEJLLEVBc0JMOztBQUFBLHFFQWxCdUMsRUFrQnZDOztBQUFBLHVFQWRQQyxLQUFLLENBQUNDLFNBQU4sRUFjTzs7QUFBQSxzRUFWUkQsS0FBSyxDQUFDQyxTQUFOLEVBVVE7O0FBQUEsbUVBTlhELEtBQUssQ0FBQ0MsU0FBTixFQU1XOztBQUFBLDJFQUZPLEVBRVA7O0FBQUEsaUVBb0ZiLFlBQTRDO0FBQUEsVUFBM0NDLEtBQTJDLHVFQUF4QixJQUF3QjtBQUNyRCxhQUFPLElBQUlDLE9BQUosQ0FBWSxVQUFBQyxPQUFPO0FBQUEsZUFDdEIsTUFBS0MsUUFBTCxDQUFjO0FBQUVDLFVBQUFBLFdBQVcsRUFBRSxJQUFmO0FBQXFCQyxVQUFBQSxlQUFlLEVBQUVMO0FBQXRDLFNBQWQsRUFBNkRFLE9BQTdELENBRHNCO0FBQUEsT0FBbkIsQ0FBUDtBQUdILEtBeEZ5Qjs7QUFBQSxnRUE4RmQsWUFBcUI7QUFDN0IsYUFBTyxJQUFJRCxPQUFKLENBQVksVUFBQUMsT0FBTztBQUFBLGVBQ3RCLE1BQUtDLFFBQUwsQ0FBYztBQUFFQyxVQUFBQSxXQUFXLEVBQUUsS0FBZjtBQUFzQkMsVUFBQUEsZUFBZSxFQUFFO0FBQXZDLFNBQWQsRUFBNkRILE9BQTdELENBRHNCO0FBQUEsT0FBbkIsQ0FBUDtBQUdILEtBbEd5Qjs7QUFBQSxtRUF5R1gsVUFBQ0ksUUFBRDtBQUFBLGFBQ1gsTUFBS0MsS0FBTCxDQUFXQyxLQUFYLENBQWlCQyxTQUFqQixDQUEyQixVQUFBQyxJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDYixLQUFMLENBQVdjLElBQVgsS0FBb0JMLFFBQXhCO0FBQUEsT0FBL0IsQ0FEVztBQUFBLEtBekdXOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsNEJBcUloQjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNOTSxjQUFBQSxTQURNLDJEQUNzQixFQUR0QjtBQUVOQyxjQUFBQSxVQUZNLDJEQUVtQixFQUZuQjs7QUFBQSxvQkFJRixNQUFLTixLQUFMLENBQVdDLEtBQVgsQ0FBaUJNLE1BQWpCLEdBQTBCLENBSnhCO0FBQUE7QUFBQTtBQUFBOztBQUtJUixjQUFBQSxRQUxKLEdBS2UsTUFBS0MsS0FBTCxDQUFXQyxLQUFYLENBQWlCLE1BQUtELEtBQUwsQ0FBV0MsS0FBWCxDQUFpQk0sTUFBakIsR0FBMEIsQ0FBM0MsRUFBOENqQixLQUE5QyxDQUFvRGMsSUFMbkU7QUFBQTtBQUFBLHFCQU9JLE1BQUtJLFVBQUwsQ0FBZ0JULFFBQWhCLEVBQTBCTSxTQUExQixFQUFxQ0MsVUFBckMsQ0FQSjs7QUFBQTtBQVFJRyxjQUFBQSxpQkFSSixHQVF3QixvQ0FBTyxNQUFLVCxLQUFMLENBQVdDLEtBQWxCLEVBQXlCO0FBQy9DUyxnQkFBQUEsT0FBTyxFQUFFLENBQUMsQ0FBQyxNQUFLVixLQUFMLENBQVdDLEtBQVgsQ0FBaUJNLE1BQWpCLEdBQTBCLENBQTNCLEVBQThCLENBQTlCLENBQUQ7QUFEc0MsZUFBekIsQ0FSeEI7QUFXRixxQkFBTyxNQUFLSSxhQUFMLENBQW1CLE1BQUtYLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQixNQUFLRCxLQUFMLENBQVdDLEtBQVgsQ0FBaUJNLE1BQWpCLEdBQTBCLENBQTNDLEVBQThDakIsS0FBOUMsQ0FBb0RjLElBQXZFLENBQVA7QUFYRSwrQ0FZSyxJQUFJVixPQUFKLENBQVksVUFBQUMsT0FBTztBQUFBLHVCQUN0QixNQUFLQyxRQUFMLENBQWM7QUFBRUssa0JBQUFBLEtBQUssRUFBRVE7QUFBVCxpQkFBZCxFQUE0QztBQUFBLHlCQUFNZCxPQUFPLENBQUNJLFFBQUQsQ0FBYjtBQUFBLGlCQUE1QyxDQURzQjtBQUFBLGVBQW5CLENBWkw7O0FBQUE7QUFnQkZhLGNBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLHdCQUFiO0FBaEJFLCtDQWlCS25CLE9BQU8sQ0FBQ0MsT0FBUixFQWpCTDs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQXJJZ0I7O0FBQUEsc0VBdVJSLFVBQUNTLElBQUQ7QUFBQSxhQUEyQkEsSUFBSSxJQUFJLE1BQUtVLFdBQXhDO0FBQUEsS0F2UlE7O0FBQUEscUVBOFJULFVBQUNWLElBQUQ7QUFBQSxhQUNiLE1BQUtKLEtBQUwsQ0FBV0MsS0FBWCxDQUFpQkMsU0FBakIsQ0FBMkIsVUFBQUMsSUFBSTtBQUFBLGVBQUlBLElBQUksQ0FBQ2IsS0FBTCxDQUFXYyxJQUFYLEtBQW9CQSxJQUF4QjtBQUFBLE9BQS9CLE1BQWlFLENBQUMsQ0FBbEUsR0FBc0UsSUFBdEUsR0FBNkUsS0FEaEU7QUFBQSxLQTlSUzs7QUFBQSx1RUEwU1AsWUFHVTtBQUFBLFVBRnpCQyxTQUV5Qix1RUFGRyxFQUVIO0FBQUEsVUFEekJDLFVBQ3lCLHVFQURBLEVBQ0E7O0FBQ3pCLFVBQUksTUFBS04sS0FBTCxDQUFXQyxLQUFYLENBQWlCTSxNQUFqQixHQUEwQixDQUE5QixFQUFpQztBQUM3QixlQUFPLE1BQUtRLE9BQUwsQ0FBYVYsU0FBYixFQUF3QkMsVUFBeEIsQ0FBUDtBQUNIOztBQUVELGFBQU9aLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBQ0gsS0FuVHlCOztBQUFBLHVFQXlUUCxZQUFxQjtBQUNwQyxVQUFJLE1BQUtLLEtBQUwsQ0FBV2dCLFNBQVgsSUFBd0IsTUFBS0MsZ0JBQUwsQ0FBc0JDLE9BQWxELEVBQTJEO0FBQ3ZELGNBQUtELGdCQUFMLENBQXNCQyxPQUF0QixDQUE4QkMsT0FBOUI7O0FBQ0EsZUFBTyxJQUFJekIsT0FBSixDQUFZLFVBQUFDLE9BQU87QUFBQSxpQkFDdEIsTUFBS0MsUUFBTCxDQUNJO0FBQ0lvQixZQUFBQSxTQUFTLEVBQUUsb0NBQU8sTUFBS2hCLEtBQUwsQ0FBV2dCLFNBQWxCLEVBQTZCO0FBQ3BDMUIsY0FBQUEsS0FBSyxFQUFFO0FBQ0g4QixnQkFBQUEsT0FBTyxFQUFFO0FBQUVDLGtCQUFBQSxJQUFJLEVBQUU7QUFBUjtBQUROO0FBRDZCLGFBQTdCO0FBRGYsV0FESixFQVFJMUIsT0FSSixDQURzQjtBQUFBLFNBQW5CLENBQVA7QUFZSDs7QUFDRGlCLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLGdDQUFiO0FBQ0EsYUFBT25CLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBQ0gsS0EzVXlCOztBQUFBLHNFQWlWUixZQUFxQjtBQUNuQyxVQUFJLE1BQUtLLEtBQUwsQ0FBV2dCLFNBQVgsSUFBd0IsTUFBS0MsZ0JBQUwsQ0FBc0JDLE9BQWxELEVBQTJEO0FBQ3ZELGNBQUtELGdCQUFMLENBQXNCQyxPQUF0QixDQUE4QkksTUFBOUI7O0FBQ0EsZUFBTyxJQUFJNUIsT0FBSixDQUFZLFVBQUFDLE9BQU87QUFBQSxpQkFDdEIsTUFBS0MsUUFBTCxDQUNJO0FBQ0lvQixZQUFBQSxTQUFTLEVBQUUsb0NBQU8sTUFBS2hCLEtBQUwsQ0FBV2dCLFNBQWxCLEVBQTZCO0FBQ3BDMUIsY0FBQUEsS0FBSyxFQUFFO0FBQ0g4QixnQkFBQUEsT0FBTyxFQUFFO0FBQUVDLGtCQUFBQSxJQUFJLEVBQUU7QUFBUjtBQUROO0FBRDZCLGFBQTdCO0FBRGYsV0FESixFQVFJMUIsT0FSSixDQURzQjtBQUFBLFNBQW5CLENBQVA7QUFZSDs7QUFDRGlCLE1BQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhLCtCQUFiO0FBQ0EsYUFBT25CLE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBQ0gsS0FuV3lCOztBQUFBLG9FQXlXVixZQUErQjtBQUMzQyxVQUFJLE1BQUtLLEtBQUwsQ0FBV2dCLFNBQVgsSUFBd0IsTUFBS0MsZ0JBQUwsQ0FBc0JDLE9BQWxELEVBQTJEO0FBQ3ZELGNBQUt0QixRQUFMLENBQWM7QUFDVm9CLFVBQUFBLFNBQVMsRUFBRSxvQ0FBTyxNQUFLaEIsS0FBTCxDQUFXZ0IsU0FBbEIsRUFBNkI7QUFDcEMxQixZQUFBQSxLQUFLLEVBQUU7QUFBRThCLGNBQUFBLE9BQU8sRUFBRTtBQUFFQyxnQkFBQUEsSUFBSSxFQUFFO0FBQVI7QUFBWDtBQUQ2QixXQUE3QjtBQURELFNBQWQ7O0FBS0EsZUFBTyxNQUFLSixnQkFBTCxDQUFzQkMsT0FBdEIsQ0FBOEJLLElBQTlCLEVBQVA7QUFDSDs7QUFFRCxhQUFPN0IsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDSCxLQXBYeUI7O0FBQUEsb0VBMFhWLFlBQStCO0FBQzNDLFVBQUksTUFBS0ssS0FBTCxDQUFXZ0IsU0FBWCxJQUF3QixNQUFLQyxnQkFBTCxDQUFzQkMsT0FBbEQsRUFBMkQ7QUFDdkQsZUFBTyxNQUFLRCxnQkFBTCxDQUFzQkMsT0FBdEIsQ0FBOEJNLElBQTlCLEVBQVA7QUFDSDs7QUFFRCxhQUFPOUIsT0FBTyxDQUFDQyxPQUFSLEVBQVA7QUFDSCxLQWhZeUI7O0FBQUEsaUVBK2ZiLFVBQUM4QixNQUFELEVBQXVDO0FBQ2hELFVBQU1DLFlBQVksR0FBRyxvQ0FBTyxNQUFLMUIsS0FBTCxDQUFXMkIsTUFBbEIsRUFBMEI7QUFBRUMsUUFBQUEsS0FBSyxFQUFFLENBQUNILE1BQUQ7QUFBVCxPQUExQixDQUFyQjtBQUVBLGFBQU8sSUFBSS9CLE9BQUosQ0FDSCxVQUFDQyxPQUFEO0FBQUEsZUFDSSxNQUFLQyxRQUFMLENBQ0k7QUFDSStCLFVBQUFBLE1BQU0sRUFBRUQ7QUFEWixTQURKLEVBSUkvQixPQUpKLENBREo7QUFBQSxPQURHLENBQVA7QUFTSCxLQTNnQnlCOztBQUFBLG9FQWtoQlYsVUFBQ1MsSUFBRCxFQUFpQztBQUM3QyxVQUFNc0IsWUFBWSxHQUFHLE1BQUsxQixLQUFMLENBQVcyQixNQUFYLENBQWtCRSxNQUFsQixDQUF5QixVQUFBQyxJQUFJLEVBQUk7QUFDbEQsZUFBT0EsSUFBSSxDQUFDMUIsSUFBTCxLQUFjQSxJQUFyQjtBQUNILE9BRm9CLENBQXJCOztBQUlBLGFBQU8sSUFBSVYsT0FBSixDQUNILFVBQUNDLE9BQUQ7QUFBQSxlQUNJLE1BQUtDLFFBQUwsQ0FDSTtBQUNJK0IsVUFBQUEsTUFBTSxFQUFFRDtBQURaLFNBREosRUFJSS9CLE9BSkosQ0FESjtBQUFBLE9BREcsQ0FBUDtBQVNILEtBaGlCeUI7O0FBQUEsd0VBc2lCTixZQUFxQjtBQUNyQyxhQUFPLElBQUlELE9BQUosQ0FBWSxVQUFBQyxPQUFPO0FBQUEsZUFBSSxNQUFLQyxRQUFMLENBQWM7QUFBRW1DLFVBQUFBLFVBQVUsRUFBRTtBQUFkLFNBQWQsRUFBcUNwQyxPQUFyQyxDQUFKO0FBQUEsT0FBbkIsQ0FBUDtBQUNILEtBeGlCeUI7O0FBQUEsdUVBOGlCUCxZQUFxQjtBQUNwQyxhQUFPLElBQUlELE9BQUosQ0FBWSxVQUFBQyxPQUFPO0FBQUEsZUFBSSxNQUFLQyxRQUFMLENBQWM7QUFBRW1DLFVBQUFBLFVBQVUsRUFBRTtBQUFkLFNBQWQsRUFBb0NwQyxPQUFwQyxDQUFKO0FBQUEsT0FBbkIsQ0FBUDtBQUNILEtBaGpCeUI7O0FBQUEsK0RBd2pCZixVQUFDUyxJQUFELEVBQWlFO0FBQUEsVUFBbEQ0QixvQkFBa0QsdUVBQWpCLEVBQWlCO0FBQ3hFLGFBQU8sWUFHc0I7QUFBQSxZQUZ6QkMsTUFFeUIsdUVBRkEsRUFFQTtBQUFBLFlBRHpCM0IsVUFDeUIsdUVBREEsRUFDQTtBQUN6QixjQUFLMEIsb0JBQUwsR0FBNEJBLG9CQUE1QjtBQUNBLGVBQU8sTUFBS3hCLFVBQUwsQ0FBZ0JKLElBQWhCLEVBQXNCNkIsTUFBdEIsRUFBOEIzQixVQUE5QixDQUFQO0FBQ0gsT0FORDtBQU9ILEtBaGtCeUI7O0FBQUEsb0ZBeW9CTSxVQUFDNEIsT0FBRCxFQUE0QjtBQUN4RCxZQUFLdEMsUUFBTCxDQUNJO0FBQ0lvQixRQUFBQSxTQUFTLEVBQUUsb0NBQU8sTUFBS2hCLEtBQUwsQ0FBV2dCLFNBQWxCLEVBQTZCO0FBQ3BDMUIsVUFBQUEsS0FBSyxFQUFFO0FBQ0g0QyxZQUFBQSxPQUFPLEVBQUU7QUFDTGIsY0FBQUEsSUFBSSxFQUFFYTtBQUREO0FBRE47QUFENkIsU0FBN0I7QUFEZixPQURKLEVBVUk7QUFBQSxlQUNJLE1BQUtsQyxLQUFMLENBQVdtQywyQkFBWCxJQUNBLE1BQUtuQyxLQUFMLENBQVdtQywyQkFBWCxDQUF1Q0QsT0FBdkMsQ0FGSjtBQUFBLE9BVko7QUFjSCxLQXhwQnlCOztBQUFBLDJFQWtyQkgsS0FsckJHOztBQUd0QixVQUFLbEMsS0FBTCxHQUFhO0FBQ1RJLE1BQUFBLElBQUksRUFBRWQsS0FBSyxDQUFDYyxJQURIO0FBRVRnQyxNQUFBQSxNQUFNLEVBQUU5QyxLQUFLLENBQUM4QyxNQUZMO0FBR1RDLE1BQUFBLFNBQVMsRUFBRS9DLEtBQUssQ0FBQytDLFNBSFI7QUFJVEMsTUFBQUEsS0FBSyxFQUFFaEQsS0FBSyxDQUFDZ0QsS0FKSjtBQUtUQyxNQUFBQSxNQUFNLEVBQUVqRCxLQUFLLENBQUNpRCxNQUxMO0FBTVRDLE1BQUFBLFlBQVksRUFBRWxELEtBQUssQ0FBQ2tELFlBTlg7QUFPVEMsTUFBQUEsVUFBVSxFQUFFbkQsS0FBSyxDQUFDbUQsVUFQVDtBQVFUQyxNQUFBQSxXQUFXLEVBQUVwRCxLQUFLLENBQUNvRCxXQVJWO0FBU1RYLE1BQUFBLFVBQVUsRUFBRXpDLEtBQUssQ0FBQ3lDLFVBVFQ7QUFVVFksTUFBQUEscUJBQXFCLEVBQUVyRCxLQUFLLENBQUNxRCxxQkFWcEI7QUFXVEMsTUFBQUEsY0FBYyxFQUFFdEQsS0FBSyxDQUFDc0QsY0FYYjtBQVlUQyxNQUFBQSxTQUFTLEVBQUV2RCxLQUFLLENBQUN1RCxTQVpSO0FBYVQ1QyxNQUFBQSxLQUFLLEVBQUVYLEtBQUssQ0FBQ1csS0FiSjtBQWNUZSxNQUFBQSxTQUFTLEVBQUUxQixLQUFLLENBQUMwQixTQWRSO0FBZVRtQixNQUFBQSwyQkFBMkIsRUFBRTdDLEtBQUssQ0FBQzZDLDJCQWYxQjtBQWdCVHRDLE1BQUFBLFdBQVcsRUFBRVAsS0FBSyxDQUFDTyxXQWhCVjtBQWlCVEMsTUFBQUEsZUFBZSxFQUFFUixLQUFLLENBQUNRLGVBakJkO0FBa0JUNkIsTUFBQUEsTUFBTSxFQUFFckMsS0FBSyxDQUFDcUMsTUFsQkw7QUFtQlRtQixNQUFBQSxRQUFRLEVBQUV4RCxLQUFLLENBQUN3RCxRQW5CUDtBQW9CVEMsTUFBQUEsYUFBYSxFQUFFekQsS0FBSyxDQUFDeUQsYUFwQlo7QUFxQlRDLE1BQUFBLDhCQUE4QixFQUFFMUQsS0FBSyxDQUFDMEQsOEJBckI3QjtBQXNCVEMsTUFBQUEsZ0JBQWdCLEVBQUUzRCxLQUFLLENBQUMyRCxnQkF0QmY7QUF1QlRDLE1BQUFBLFNBQVMsRUFBRTVELEtBQUssQ0FBQzREO0FBdkJSLEtBQWI7QUFIc0I7QUE0QnpCO0FBRUQ7Ozs7Ozs7Ozs7Ozt1Q0FRbUJuRCxRLEVBQStEO0FBQUEsVUFBN0NULEtBQTZDLHVFQUFyQixFQUFxQjs7QUFDOUUsVUFBSVMsUUFBUSxJQUFJLEtBQUtlLFdBQXJCLEVBQWtDO0FBQzlCLFlBQU1XLE1BQU0sR0FBRzBCLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0IsS0FBS3RDLFdBQUwsQ0FBaUJmLFFBQWpCLENBQWxCLENBQWY7QUFDQSxZQUFNc0QsaUJBQWlCLEdBQUcsS0FBS3ZDLFdBQUwsQ0FBaUJmLFFBQWpCLEVBQTJCdUQsYUFBckQ7QUFFQSxlQUFPLG9DQUFPLEtBQUt4QyxXQUFMLENBQWlCZixRQUFqQixDQUFQLEVBQW1DO0FBQ3RDVCxVQUFBQSxLQUFLLEVBQUU7QUFDSCtCLFlBQUFBLElBQUksb0JBQ0c4QixNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCM0IsTUFBTSxDQUFDbkMsS0FBekIsQ0FESCxFQUVHNkQsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQjlELEtBQWxCLENBRkg7QUFHQWMsY0FBQUEsSUFBSSxFQUNBaUQsaUJBQWlCLElBQUksT0FBT0EsaUJBQVAsS0FBNkIsVUFBbEQsR0FDTUEsaUJBQWlCLENBQUMsS0FBS3JELEtBQUwsQ0FBV0MsS0FBWixDQUR2QixHQUVNRjtBQU5WO0FBREQ7QUFEK0IsU0FBbkMsQ0FBUDtBQVlILE9BaEJELE1BZ0JPO0FBQ0gsY0FBTSxJQUFJd0QsS0FBSiw2QkFBK0J4RCxRQUEvQixzQ0FBTjtBQUNIO0FBQ0o7QUFFRDs7Ozs7Ozs7a0NBS3lEO0FBQUE7O0FBQUEsVUFBN0N5RCxhQUE2Qyx1RUFBbkIsRUFBbUI7QUFDckQsYUFBTyxJQUFJOUQsT0FBSixDQUFZLFVBQUFDLE9BQU8sRUFBSTtBQUMxQixRQUFBLE1BQUksQ0FBQ0MsUUFBTCxDQUNJO0FBQ0lLLFVBQUFBLEtBQUssRUFBRSxNQUFJLENBQUNELEtBQUwsQ0FBV0MsS0FBWCxDQUFpQjRCLE1BQWpCLENBQ0gsVUFBQTFCLElBQUk7QUFBQSxtQkFBSXFELGFBQWEsQ0FBQ0MsT0FBZCxDQUFzQnRELElBQUksQ0FBQ2IsS0FBTCxDQUFXYyxJQUFqQyxNQUEyQyxDQUFDLENBQWhEO0FBQUEsV0FERDtBQURYLFNBREosRUFNSVQsT0FOSjtBQVFILE9BVE0sQ0FBUDtBQVVIO0FBRUQ7Ozs7Ozs7Ozs7QUE4QkE7Ozs7OzsrQkFNVzhCLE0sRUFBdUU7QUFBQTs7QUFBQSxVQUE5Q25CLFVBQThDLHVFQUFyQixFQUFxQjtBQUM5RSxVQUFNRyxpQkFBaUIsR0FBRyxvQ0FBTyxLQUFLVCxLQUFMLENBQVdDLEtBQWxCLEVBQXlCO0FBQUUyQixRQUFBQSxLQUFLLEVBQUUsQ0FBQ0gsTUFBRDtBQUFULE9BQXpCLENBQTFCO0FBQ0EsVUFBTWlDLFdBQVcsR0FBR1AsTUFBTSxDQUFDQyxNQUFQLENBQ2hCO0FBQ0luRCxRQUFBQSxLQUFLLEVBQUVRO0FBRFgsT0FEZ0IsRUFJaEIwQyxNQUFNLENBQUNDLE1BQVAsQ0FBYyxFQUFkLEVBQWtCM0IsTUFBTSxDQUFDbkIsVUFBUCxJQUFxQixFQUF2QyxDQUpnQixFQUtoQjZDLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0I5QyxVQUFVLElBQUksRUFBaEMsQ0FMZ0IsQ0FBcEI7QUFRQSxhQUFPLElBQUlaLE9BQUosQ0FBWSxVQUFBQyxPQUFPO0FBQUEsZUFBSSxNQUFJLENBQUNDLFFBQUwsQ0FBYzhELFdBQWQsRUFBMkI7QUFBQSxpQkFBTS9ELE9BQU8sQ0FBQzhCLE1BQU0sQ0FBQ25DLEtBQVAsQ0FBYWMsSUFBZCxDQUFiO0FBQUEsU0FBM0IsQ0FBSjtBQUFBLE9BQW5CLENBQVA7QUFDSDtBQUVEOzs7Ozs7Ozs7O0FBMkJBOzs7OztzQ0FLa0J1RCxNLEVBQTZCO0FBQzNDLGFBQ0ksUUFBT0EsTUFBUCxNQUFrQixRQUFsQixJQUNBLFVBQVVBLE1BRFYsSUFFQSxRQUFPQSxNQUFNLENBQUNyRSxLQUFkLE1BQXdCLFFBRnhCLElBR0EsVUFBVXFFLE1BQU0sQ0FBQ3JFLEtBSnJCO0FBTUg7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Z0RBZUlhLEk7Ozs7Ozs7OztBQUNBRSxnQkFBQUEsUyw4REFBNEIsRTtBQUM1QkMsZ0JBQUFBLFUsOERBQXlCLEU7O3VCQUVGLEtBQUtzRCxZQUFMLENBQWtCekQsSUFBbEIsRUFBd0JFLFNBQXhCLEVBQW1DQyxVQUFuQyxDOzs7QUFBakJQLGdCQUFBQSxRO2tEQUNDLEtBQUs4RCx1QkFBTCxDQUE2QjlELFFBQTdCLEM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHWDs7Ozs7OztnQ0FJWUssSSxFQUE2QjtBQUFBOztBQUNyQyxhQUFPLElBQUlWLE9BQUosQ0FBWSxVQUFDQyxPQUFELEVBQVVtRSxNQUFWLEVBQXFCO0FBQ3BDLFlBQU1DLEtBQUssR0FBRyxNQUFJLENBQUMvRCxLQUFMLENBQVdDLEtBQVgsQ0FBaUJDLFNBQWpCLENBQTJCLFVBQUFDLElBQUk7QUFBQSxpQkFBSUEsSUFBSSxDQUFDYixLQUFMLENBQVdjLElBQVgsS0FBb0JBLElBQXhCO0FBQUEsU0FBL0IsQ0FBZDs7QUFFQSxZQUFJMkQsS0FBSyxLQUFLLENBQUMsQ0FBZixFQUFrQjtBQUNkLFVBQUEsTUFBSSxDQUFDbkUsUUFBTCxDQUNJO0FBQ0lLLFlBQUFBLEtBQUssRUFBRSxvQ0FBTyxNQUFJLENBQUNELEtBQUwsQ0FBV0MsS0FBbEIsRUFBeUI7QUFDNUJTLGNBQUFBLE9BQU8sRUFBRSxDQUFDLENBQUNxRCxLQUFELEVBQVEsQ0FBUixDQUFEO0FBRG1CLGFBQXpCO0FBRFgsV0FESixFQU1JcEUsT0FOSjtBQVFILFNBVEQsTUFTTztBQUNIbUUsVUFBQUEsTUFBTSwyQkFBb0IxRCxJQUFwQixtQ0FBTjtBQUNIO0FBQ0osT0FmTSxDQUFQO0FBZ0JIO0FBRUQ7Ozs7Ozs7Ozs7O2lDQVNJRCxJLEVBR2U7QUFBQTs7QUFBQSxVQUZmRSxTQUVlLHVFQUZhLEVBRWI7QUFBQSxVQURmQyxVQUNlLHVFQURVLEVBQ1Y7O0FBQ2YsVUFBSSxPQUFPSCxJQUFQLEtBQWdCLFFBQXBCLEVBQThCO0FBQzFCLFlBQUksS0FBSzZELGNBQUwsQ0FBb0I3RCxJQUFwQixDQUFKLEVBQStCO0FBQzNCO0FBQ0EsaUJBQU8sSUFBSVQsT0FBSixDQUFZLFVBQUFDLE9BQU8sRUFBSTtBQUMxQixnQkFBTXNFLFNBQVMsR0FBRyxNQUFJLENBQUNDLFlBQUwsQ0FBa0IvRCxJQUFsQixDQUFsQjs7QUFDQSxnQkFBTWdFLGlCQUFpQixHQUFHaEIsTUFBTSxDQUFDQyxNQUFQLENBQ3RCO0FBQUU5QyxjQUFBQSxVQUFVLEVBQUU7QUFBZCxhQURzQixFQUNGO0FBQ3BCLFlBQUEsTUFBSSxDQUFDTixLQUFMLENBQVdDLEtBQVgsQ0FBaUJnRSxTQUFqQixDQUZzQixDQUExQjtBQUlBLGdCQUFNRyxhQUFhLEdBQUcsb0NBQU9ELGlCQUFQLEVBQTBCO0FBQzVDN0UsY0FBQUEsS0FBSyxFQUFFO0FBQ0grQixnQkFBQUEsSUFBSSxvQkFDRzhDLGlCQUFpQixDQUFDN0UsS0FEckIsRUFFR2UsU0FGSDtBQUREO0FBRHFDLGFBQTFCLENBQXRCOztBQVNBLGdCQUFJcUQsV0FBVztBQUNYekQsY0FBQUEsS0FBSyxFQUFFLG9DQUFPLE1BQUksQ0FBQ0QsS0FBTCxDQUFXQyxLQUFsQixzQkFDRmdFLFNBREUsRUFDVTtBQUNUNUMsZ0JBQUFBLElBQUksRUFBRStDO0FBREcsZUFEVjtBQURJLGVBTVJELGlCQUFpQixDQUFDN0QsVUFOVixFQU9SNkMsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQjlDLFVBQWxCLENBUFEsQ0FBZjs7QUFVQSxZQUFBLE1BQUksQ0FBQ1YsUUFBTCxDQUFjOEQsV0FBZCxFQUEyQjtBQUFBLHFCQUFNL0QsT0FBTyxDQUFDUSxJQUFELENBQWI7QUFBQSxhQUEzQjtBQUNILFdBMUJNLENBQVA7QUEyQkgsU0E3QkQsTUE2Qk8sSUFBSSxLQUFLa0UsZUFBTCxDQUFxQmxFLElBQXJCLENBQUosRUFBZ0M7QUFDbkM7QUFDQSxpQkFBTyxLQUFLbUUsVUFBTCxDQUFnQixLQUFLQyxrQkFBTCxDQUF3QnBFLElBQXhCLEVBQThCRSxTQUE5QixDQUFoQixFQUEwREMsVUFBMUQsQ0FBUDtBQUNILFNBSE0sTUFHQSxPQUFPWixPQUFPLENBQUNvRSxNQUFSLEVBQVA7QUFDVixPQWxDRCxNQWtDTyxJQUFJLEtBQUtVLGlCQUFMLENBQXVCckUsSUFBdkIsQ0FBSixFQUFrQztBQUNyQztBQUNBLGVBQU8sS0FBS21FLFVBQUwsQ0FDSG5CLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JqRCxJQUFsQixFQUF3QjtBQUNwQmIsVUFBQUEsS0FBSyxvQkFBT2EsSUFBSSxDQUFDYixLQUFaLEVBQXNCZSxTQUF0QjtBQURlLFNBQXhCLENBREcsRUFJSEMsVUFKRyxDQUFQO0FBTUgsT0FSTSxNQVFBO0FBQ0gsZUFBT1osT0FBTyxDQUFDb0UsTUFBUixDQUFlLGlDQUFmLENBQVA7QUFDSDtBQUNKO0FBRUQ7Ozs7Ozs7OztBQWdIQTs7Ozs7Ozs4QkFPVXJDLE0sRUFBbUM7QUFDekMsVUFBSSxLQUFLekIsS0FBTCxDQUFXMkIsTUFBWCxDQUFrQnpCLFNBQWxCLENBQTRCLFVBQUE0QixJQUFJO0FBQUEsZUFBSUEsSUFBSSxDQUFDMUIsSUFBTCxLQUFjcUIsTUFBTSxDQUFDckIsSUFBekI7QUFBQSxPQUFoQyxNQUFtRSxDQUFDLENBQXhFLEVBQTJFO0FBQ3ZFUSxRQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSxxREFBcURZLE1BQU0sQ0FBQ3JCLElBQXpFO0FBQ0EsZUFBT1YsT0FBTyxDQUFDb0UsTUFBUixFQUFQO0FBQ0gsT0FKd0MsQ0FNekM7OztBQUNBLFVBQUksS0FBSzlELEtBQUwsQ0FBV2dCLFNBQVgsSUFBd0IsS0FBS2hCLEtBQUwsQ0FBV2dCLFNBQVgsQ0FBcUIxQixLQUFyQixDQUEyQjhCLE9BQXZELEVBQWdFO0FBQzVELGFBQUtxRCxnQkFBTDtBQUNILE9BVHdDLENBV3pDOzs7QUFDQSxVQUFNQyxjQUFjLEdBQUcsS0FBS0Msb0JBQUwsQ0FBMEJsRCxNQUExQixDQUF2Qjs7QUFFQSxhQUFPLEtBQUttRCxVQUFMLENBQWdCRixjQUFoQixDQUFQO0FBQ0g7QUFFRDs7Ozs7Ozs7OytCQU1XdEUsSSxFQUE2QjtBQUFBOztBQUNwQyxVQUFJeUUsZ0JBQWdCLEdBQUcsS0FBSzdFLEtBQUwsQ0FBVzJCLE1BQVgsQ0FBa0J6QixTQUFsQixDQUE0QixVQUFBNEIsSUFBSTtBQUFBLGVBQUlBLElBQUksQ0FBQzFCLElBQUwsS0FBY0EsSUFBbEI7QUFBQSxPQUFoQyxDQUF2Qjs7QUFFQSxVQUNJeUUsZ0JBQWdCLEtBQUssQ0FBQyxDQUF0QixJQUNDLEtBQUtDLGNBQUwsQ0FBb0IxRSxJQUFwQixLQUE2QixLQUFLMEUsY0FBTCxDQUFvQjFFLElBQXBCLEVBQTBCYyxPQUY1RCxFQUdFO0FBQ0UsZUFBTyxJQUFJeEIsT0FBSixDQUFZLFVBQUFDLE9BQU8sRUFBSTtBQUMxQixVQUFBLE1BQUksQ0FBQ21GLGNBQUwsQ0FBb0IxRSxJQUFwQixFQUEwQmMsT0FBMUIsQ0FBa0M2RCxVQUFsQyxDQUE2QyxZQUFNO0FBQy9DO0FBQ0E7QUFDQUYsWUFBQUEsZ0JBQWdCLEdBQUcsTUFBSSxDQUFDN0UsS0FBTCxDQUFXMkIsTUFBWCxDQUFrQnpCLFNBQWxCLENBQTRCLFVBQUE0QixJQUFJO0FBQUEscUJBQUlBLElBQUksQ0FBQzFCLElBQUwsS0FBY0EsSUFBbEI7QUFBQSxhQUFoQyxDQUFuQixDQUgrQyxDQUsvQzs7QUFDQSxnQkFDSXlFLGdCQUFnQixLQUFLLENBQUMsQ0FBdEIsSUFDQyxNQUFJLENBQUNDLGNBQUwsQ0FBb0IxRSxJQUFwQixLQUE2QixNQUFJLENBQUMwRSxjQUFMLENBQW9CMUUsSUFBcEIsRUFBMEJjLE9BRjVELEVBR0U7QUFDRSxjQUFBLE1BQUksQ0FBQzhELGFBQUwsQ0FBbUI1RSxJQUFuQixFQUF5QjZFLElBQXpCLENBQThCLFlBQU07QUFDaEMsdUJBQU8sTUFBSSxDQUFDSCxjQUFMLENBQW9CMUUsSUFBcEIsQ0FBUDs7QUFFQSxvQkFBSSxNQUFJLENBQUNKLEtBQUwsQ0FBV2dCLFNBQWYsRUFBMEI7QUFDdEIsc0JBQUlrRSxZQUFZLEdBQUcsS0FBbkI7O0FBQ0Esc0JBQU1wQyxRQUFRLHNCQUFPcUMsS0FBSyxDQUFDQyxJQUFOLENBQVcsTUFBSSxDQUFDQyxNQUFMLENBQVluRSxPQUFaLENBQW9CNEIsUUFBL0IsQ0FBUCxDQUFkOztBQUNBQSxrQkFBQUEsUUFBUSxDQUFDd0MsT0FBVCxDQUFpQixVQUFBeEQsSUFBSSxFQUFJO0FBQ3JCLHdCQUFJQSxJQUFJLENBQUN5RCxTQUFMLENBQWVDLFFBQWYsQ0FBd0IsWUFBeEIsQ0FBSixFQUEyQztBQUN2Q04sc0JBQUFBLFlBQVksR0FBRyxJQUFmO0FBQ0g7QUFDSixtQkFKRDs7QUFNQSxzQkFBSSxDQUFDQSxZQUFMLEVBQW1CO0FBQ2Ysb0JBQUEsTUFBSSxDQUFDTyxlQUFMO0FBQ0g7QUFDSjs7QUFFRDlGLGdCQUFBQSxPQUFPO0FBQ1YsZUFsQkQ7QUFtQkg7QUFDSixXQTlCRDtBQStCSCxTQWhDTSxDQUFQO0FBaUNIOztBQUVELGFBQU9ELE9BQU8sQ0FBQ0MsT0FBUixFQUFQO0FBQ0g7QUFFRDs7Ozs7OztzQ0FJa0IrRixXLEVBQXFCQyxXLEVBQTJCLENBQUU7QUFFcEU7Ozs7Ozs7Ozs7eUNBT3FCQyxXLEVBQXFDO0FBQUE7O0FBQ3RELFVBQU1uRSxNQUFNLEdBQUcwQixNQUFNLENBQUNDLE1BQVAsQ0FBYztBQUFFeUMsUUFBQUEsR0FBRyxFQUFFQztBQUFQLE9BQWQsRUFBa0NGLFdBQWxDLENBQWY7QUFFQSxVQUFNQyxHQUFHLEdBQUd0RyxLQUFLLENBQUNDLFNBQU4sRUFBWjtBQUNBaUMsTUFBQUEsTUFBTSxDQUFDb0UsR0FBUCxHQUFhQSxHQUFiO0FBQ0EsV0FBS2YsY0FBTCxDQUFvQnJELE1BQU0sQ0FBQ3JCLElBQTNCLElBQW1DeUYsR0FBbkM7O0FBRUEsVUFBSXBFLE1BQU0sQ0FBQ3NFLE9BQVAsSUFBa0J0RSxNQUFNLENBQUNzRSxPQUFQLENBQWV4RixNQUFyQyxFQUE2QztBQUN6Q2tCLFFBQUFBLE1BQU0sQ0FBQ3NFLE9BQVAsQ0FBZVQsT0FBZixDQUNJLFVBQUN4RCxJQUFELEVBQWdCO0FBQ1osY0FBSUEsSUFBSSxDQUFDa0UsS0FBVCxFQUFnQjtBQUNaLGdCQUFJbEUsSUFBSSxDQUFDbUUsT0FBVCxFQUFrQjtBQUNkLGtCQUFNQyxVQUFVLEdBQUdwRSxJQUFJLENBQUNtRSxPQUF4Qjs7QUFDQW5FLGNBQUFBLElBQUksQ0FBQ21FLE9BQUwsR0FBZSxVQUFDRSxDQUFELEVBQWE7QUFDeEJELGdCQUFBQSxVQUFVLENBQUNDLENBQUQsQ0FBVjs7QUFDQSxnQkFBQSxNQUFJLENBQUNDLFVBQUwsQ0FBZ0IzRSxNQUFNLENBQUNyQixJQUF2QjtBQUNILGVBSEQ7QUFJSCxhQU5ELE1BTU87QUFDSDBCLGNBQUFBLElBQUksQ0FBQ21FLE9BQUwsR0FBZSxVQUFDRSxDQUFELEVBQWE7QUFDeEIsZ0JBQUEsTUFBSSxDQUFDQyxVQUFMLENBQWdCM0UsTUFBTSxDQUFDckIsSUFBdkI7QUFDSCxlQUZEO0FBR0g7QUFDSjtBQUNKLFNBZkw7QUFpQkg7O0FBRURxQixNQUFBQSxNQUFNLENBQUM0RSxhQUFQLEdBQXVCLEtBQUtoQixNQUFMLENBQVluRSxPQUFaLENBQW9Cb0YsWUFBcEIsSUFBb0NDLE1BQU0sQ0FBQ0MsV0FBbEU7QUFFQSxhQUFPL0UsTUFBUDtBQUNIO0FBRUQ7Ozs7Ozs7O3dDQXdFbUM7QUFBQTs7QUFDL0IsYUFBTyxJQUFJL0IsT0FBSixDQUNILFVBQUNDLE9BQUQsRUFBbUI7QUFDZixZQUFJNEcsTUFBTSxDQUFDRSxnQkFBWCxFQUE2QjtBQUN6QkYsVUFBQUEsTUFBTSxDQUFDRSxnQkFBUCxDQUNJLFFBREosRUFFSSxZQUFZO0FBQ1IsZ0JBQUksTUFBSSxDQUFDekcsS0FBTCxDQUFXZ0IsU0FBZixFQUEwQjtBQUN0QixjQUFBLE1BQUksQ0FBQzBGLDBCQUFMLENBQ0ksTUFBSSxDQUFDckIsTUFBTCxDQUFZbkUsT0FBWixDQUFvQnlGLFdBRHhCLEVBRUksTUFBSSxDQUFDdEIsTUFBTCxDQUFZbkUsT0FBWixDQUFvQm9GLFlBRnhCO0FBSUg7QUFDSixXQVRMO0FBV0g7O0FBRUQsWUFBSSxNQUFJLENBQUN0RyxLQUFMLENBQVdnQixTQUFmLEVBQTBCO0FBQ3RCLFVBQUEsTUFBSSxDQUFDMEYsMEJBQUwsQ0FDSSxNQUFJLENBQUNyQixNQUFMLENBQVluRSxPQUFaLENBQW9CeUYsV0FEeEIsRUFFSSxNQUFJLENBQUN0QixNQUFMLENBQVluRSxPQUFaLENBQW9Cb0YsWUFGeEIsRUFHRXJCLElBSEYsQ0FHT3RGLE9BSFA7QUFJSCxTQUxELE1BS087QUFDSEEsVUFBQUEsT0FBTztBQUNWO0FBRUQ7Ozs7O0FBR0EsWUFDSSxNQUFJLENBQUNLLEtBQUwsQ0FBVzRDLGNBQVgsSUFDQSxNQUFJLENBQUNqQyxhQUFMLENBQW1CLE1BQUksQ0FBQ1gsS0FBTCxDQUFXNEMsY0FBOUIsQ0FEQSxJQUVBLE9BQU8sTUFBSSxDQUFDakMsYUFBTCxDQUFtQixNQUFJLENBQUNYLEtBQUwsQ0FBVzRDLGNBQTlCLEVBQThDMUIsT0FBOUMsQ0FDRjBGLG1CQURMLEtBQzZCLFVBSmpDLEVBS0U7QUFDRSxVQUFBLE1BQUksQ0FBQ2pHLGFBQUwsQ0FBbUIsTUFBSSxDQUFDWCxLQUFMLENBQVc0QyxjQUE5QixFQUE4QzFCLE9BQTlDLENBQXNEMEYsbUJBQXREO0FBQ0g7QUFDSixPQXBDRSxDQUFQO0FBc0NIO0FBRUQ7Ozs7Ozs7OzsrQ0FNMkJDLEssRUFBZUMsTSxFQUErQjtBQUFBOztBQUNyRSxhQUFPLElBQUlwSCxPQUFKLENBQ0gsVUFBQ0MsT0FBRCxFQUFtQjtBQUNmLFFBQUEsTUFBSSxDQUFDQyxRQUFMLENBQ0k7QUFDSW9CLFVBQUFBLFNBQVMsRUFBRSxvQ0FBTyxNQUFJLENBQUNoQixLQUFMLENBQVdnQixTQUFsQixFQUE2QjtBQUNwQzFCLFlBQUFBLEtBQUssRUFBRTtBQUNIeUgsY0FBQUEsVUFBVSxFQUFFO0FBQUUxRixnQkFBQUEsSUFBSSxFQUFFd0Y7QUFBUixlQURUO0FBRUhHLGNBQUFBLFdBQVcsRUFBRTtBQUFFM0YsZ0JBQUFBLElBQUksRUFBRXlGO0FBQVI7QUFGVjtBQUQ2QixXQUE3QjtBQURmLFNBREosRUFTSW5ILE9BVEo7QUFXSCxPQWJFLENBQVA7QUFlSDtBQUVEOzs7Ozs7Ozs2QkF1Qm9CO0FBQUEsd0JBQ3NDLEtBQUtLLEtBRDNDO0FBQUEsVUFDUkMsS0FEUSxlQUNSQSxLQURRO0FBQUEsVUFDRGUsU0FEQyxlQUNEQSxTQURDO0FBQUEsVUFDVXFCLFNBRFYsZUFDVUEsU0FEVjtBQUFBLFVBQ3dCNEUsU0FEeEI7O0FBR2hCLGFBQ0ksb0JBQUMscUJBQUQsaUNBRVdBLFNBRlg7QUFHUWhILFFBQUFBLEtBQUssRUFBRUEsS0FIZjtBQUlRZSxRQUFBQSxTQUFTLEVBQUVBLFNBSm5CO0FBS1FrRyxRQUFBQSxlQUFlLEVBQUUsS0FBS0EsZUFMOUI7QUFNUUMsUUFBQUEsWUFBWSxFQUFFLEtBQUtBLFlBTjNCO0FBT1F4RyxRQUFBQSxhQUFhLEVBQUUsS0FBS0EsYUFQNUI7QUFRUU0sUUFBQUEsZ0JBQWdCLEVBQUUsS0FBS0EsZ0JBUi9CO0FBU1FrQixRQUFBQSwyQkFBMkIsRUFBRSxLQUFLaUY7QUFUMUMsVUFXUSxLQUFLQyxZQUFMLEVBWFIsRUFZUTtBQUFFaEYsUUFBQUEsU0FBUyxFQUFUQTtBQUFGLE9BWlIsRUFESjtBQWdCSDtBQUVEOzs7Ozs7O0FBS0E7Ozs7Ozs0Q0FNd0JzRCxXLEVBQW9DO0FBQUE7O0FBQ3hELFVBQUksT0FBT0EsV0FBUCxLQUF1QixRQUEzQixFQUFxQztBQUNqQyxhQUFLMkIsb0JBQUwsR0FBNEIsSUFBNUI7QUFFQSxlQUFPLElBQUk1SCxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVbUUsTUFBVixFQUFxQjtBQUNwQyxjQUFJNkIsV0FBVyxLQUFLLE9BQUksQ0FBQzNGLEtBQUwsQ0FBVzRDLGNBQS9CLEVBQStDO0FBQzNDaEMsWUFBQUEsT0FBTyxDQUFDQyxJQUFSLENBQWEscUNBQWI7QUFDQSxZQUFBLE9BQUksQ0FBQ3lHLG9CQUFMLEdBQTRCLEtBQTVCO0FBQ0EsbUJBQU8zSCxPQUFPLEVBQWQ7QUFDSDs7QUFFRCxVQUFBLE9BQUksQ0FBQ0MsUUFBTCxDQUFjO0FBQUVDLFlBQUFBLFdBQVcsRUFBRSxJQUFmO0FBQXFCMEgsWUFBQUEsYUFBYSxFQUFFNUI7QUFBcEMsV0FBZCxFQUFpRSxZQUFNO0FBQ25FLGdCQUFJLE9BQUksQ0FBQ3pCLFlBQUwsQ0FBa0J5QixXQUFsQixNQUFtQyxDQUFDLENBQXhDLEVBQTJDO0FBQ3ZDLGtCQUFNRCxXQUFXLEdBQUcsT0FBSSxDQUFDMUYsS0FBTCxDQUFXNEMsY0FBL0I7QUFDQSxrQkFBTTRFLFdBQVcsR0FDYixPQUFJLENBQUM3RyxhQUFMLENBQW1CZ0YsV0FBbkIsS0FDQSxPQUFJLENBQUNoRixhQUFMLENBQW1CZ0YsV0FBbkIsRUFBZ0N6RSxPQUZwQztBQUdBLGtCQUFNdUcsV0FBVyxHQUNiLE9BQUksQ0FBQzlHLGFBQUwsQ0FBbUIrRSxXQUFuQixLQUNBLE9BQUksQ0FBQy9FLGFBQUwsQ0FBbUIrRSxXQUFuQixFQUFnQ3hFLE9BRnBDOztBQUdBLGtCQUFNd0csZUFBZSxHQUFHLFNBQWxCQSxlQUFrQixHQUFZO0FBQ2hDLGdCQUFBLE9BQUksQ0FBQ0osb0JBQUwsR0FBNEIsS0FBNUI7O0FBRUEsb0JBQ0lFLFdBQVcsSUFDWCxPQUFPQSxXQUFXLENBQUNaLG1CQUFuQixLQUEyQyxVQUYvQyxFQUdFO0FBQ0VZLGtCQUFBQSxXQUFXLENBQUNaLG1CQUFaO0FBQ0g7O0FBRUQsb0JBQ0lhLFdBQVcsSUFDWCxPQUFPQSxXQUFXLENBQUNFLHFCQUFuQixLQUE2QyxVQUZqRCxFQUdFO0FBQ0VGLGtCQUFBQSxXQUFXLENBQUNFLHFCQUFaO0FBQ0g7O0FBRUQsb0JBQUksT0FBTyxPQUFJLENBQUNDLGlCQUFaLEtBQWtDLFVBQXRDLEVBQWtEO0FBQzlDLGtCQUFBLE9BQUksQ0FBQ0EsaUJBQUwsQ0FBdUJsQyxXQUF2QixFQUFvQ0MsV0FBcEM7QUFDSDs7QUFFRGhHLGdCQUFBQSxPQUFPO0FBQ1YsZUF0QkQ7O0FBd0JBLGtCQUFJNkgsV0FBVyxJQUFJLE9BQU9BLFdBQVcsQ0FBQ0ssb0JBQW5CLEtBQTRDLFVBQS9ELEVBQTJFO0FBQ3ZFTCxnQkFBQUEsV0FBVyxDQUFDSyxvQkFBWjtBQUNIOztBQUVELGtCQUNJSixXQUFXLElBQ1gsT0FBT0EsV0FBVyxDQUFDSyxzQkFBbkIsS0FBOEMsVUFGbEQsRUFHRTtBQUNFTCxnQkFBQUEsV0FBVyxDQUFDSyxzQkFBWjtBQUNIOztBQUVELGtCQUFJLE9BQUksQ0FBQzlILEtBQUwsQ0FBVzZDLFNBQWYsRUFBMEI7QUFDdEIsZ0JBQUEsT0FBSSxDQUFDa0Ysa0JBQUwsQ0FBd0JwQyxXQUF4QixFQUFxQ0QsV0FBckMsRUFBa0RULElBQWxELENBQXVELFlBQU07QUFDekQsa0JBQUEsT0FBSSxDQUFDckYsUUFBTCxDQUNJO0FBQ0lnRCxvQkFBQUEsY0FBYyxFQUFFK0MsV0FEcEI7QUFFSTlGLG9CQUFBQSxXQUFXLEVBQUUsS0FGakI7QUFHSTBILG9CQUFBQSxhQUFhLEVBQUU7QUFIbkIsbUJBREosRUFNSUcsZUFOSjtBQVFILGlCQVREO0FBVUgsZUFYRCxNQVdPO0FBQ0gsZ0JBQUEsT0FBSSxDQUFDOUgsUUFBTCxDQUNJO0FBQ0lnRCxrQkFBQUEsY0FBYyxFQUFFK0MsV0FEcEI7QUFFSTlGLGtCQUFBQSxXQUFXLEVBQUUsS0FGakI7QUFHSTBILGtCQUFBQSxhQUFhLEVBQUU7QUFIbkIsaUJBREosRUFNSUcsZUFOSjtBQVFIO0FBQ0osYUFoRUQsTUFnRU87QUFDSCxjQUFBLE9BQUksQ0FBQ0osb0JBQUwsR0FBNEIsS0FBNUI7QUFDQTFHLGNBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUNJLDJCQUNJOEUsV0FESixHQUVJLGlDQUhSO0FBS0E3QixjQUFBQSxNQUFNO0FBQ1Q7QUFDSixXQTFFRDtBQTJFSCxTQWxGTSxDQUFQO0FBbUZILE9BdEZELE1Bc0ZPO0FBQ0hsRCxRQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYSw0REFBYjtBQUNBLGVBQU9uQixPQUFPLENBQUNvRSxNQUFSLEVBQVA7QUFDSDtBQUNKO0FBRUQ7Ozs7Ozs7Ozs7dUNBT21CNkIsVyxFQUFxQkQsVyxFQUFvQztBQUFBOztBQUN4RSxhQUFPLElBQUloRyxPQUFKLENBQVksVUFBQ0MsT0FBRCxFQUFVbUUsTUFBVixFQUFxQjtBQUNwQyxZQUFNa0UsVUFBVSxHQUNaLE9BQUksQ0FBQ3JILGFBQUwsQ0FBbUJnRixXQUFuQixLQUNBLE9BQUksQ0FBQ2hGLGFBQUwsQ0FBbUJnRixXQUFuQixFQUFnQ3pFLE9BRGhDLElBRUEsT0FBSSxDQUFDUCxhQUFMLENBQW1CZ0YsV0FBbkIsRUFBZ0N6RSxPQUFoQyxDQUF3Q21FLE1BRnhDLElBR0EsT0FBSSxDQUFDMUUsYUFBTCxDQUFtQmdGLFdBQW5CLEVBQWdDekUsT0FBaEMsQ0FBd0NtRSxNQUF4QyxDQUErQ25FLE9BSm5EOztBQUtBLFlBQU0rRyxZQUFZLEdBQUcsT0FBSSxDQUFDL0QsWUFBTCxDQUFrQndCLFdBQWxCLENBQXJCOztBQUNBLFlBQU13QyxZQUFZLEdBQUcsT0FBSSxDQUFDaEUsWUFBTCxDQUFrQnlCLFdBQWxCLENBQXJCOztBQUVBLFlBQU13QyxTQUFTLEdBQUdELFlBQVksR0FBR0QsWUFBZixHQUE4QixDQUE5QixHQUFrQyxDQUFDLENBQXJEOztBQUVBLFlBQUksQ0FBQ0QsVUFBTCxFQUFpQjtBQUNiLGdCQUFNLElBQUl6RSxLQUFKLENBQVUsdUNBQVYsQ0FBTjtBQUNIOztBQUVELFlBQUksT0FBSSxDQUFDdkQsS0FBTCxDQUFXdUMsTUFBZixFQUF1QjtBQUNuQjtBQUNBLGNBQU02RixTQUFTLEdBQUcsT0FBSSxDQUFDakIsWUFBTCxDQUFrQmpHLE9BQWxCLENBQTBCbUgsYUFBMUIsQ0FBd0MsUUFBeEMsQ0FBbEI7O0FBQ0EsY0FBTUMsU0FBUyxHQUFHLE9BQUksQ0FBQ25CLFlBQUwsQ0FBa0JqRyxPQUFsQixDQUEwQm1ILGFBQTFCLENBQ2QsYUFEYyxDQUFsQjs7QUFHQSxjQUFNRSxZQUFZLEdBQUdELFNBQVMsSUFBSUEsU0FBUyxDQUFDeEYsUUFBVixDQUFtQixDQUFuQixDQUFsQztBQUNBLGNBQU0wRixpQkFBaUIsR0FBR0QsWUFBWSxHQUFHQSxZQUFZLENBQUM1QixXQUFoQixHQUE4QixDQUFwRTs7QUFFQSxjQUFJeUIsU0FBSixFQUFlO0FBQ1hLLCtCQUFPQyxxQkFBUCxDQUNJTixTQURKLEVBRUk7QUFDSU8sY0FBQUEsZUFBZSx3QkFBaUIsQ0FBQ1AsU0FBUyxDQUFDekIsV0FBVixHQUF3QixDQUF4QixHQUM3QjZCLGlCQUFpQixHQUFHLENBRFEsSUFFNUJMLFNBRjRCLEdBRzVCLElBSFcsVUFEbkI7QUFLSVMsY0FBQUEsU0FBUyx3QkFBaUIsQ0FBQ1IsU0FBUyxDQUFDekIsV0FBVixHQUF3QixDQUF4QixHQUN2QjZCLGlCQUFpQixHQUFHLENBREUsSUFFdEJMLFNBRnNCLEdBR3RCLElBSEssVUFMYjtBQVNJVSxjQUFBQSxPQUFPLEVBQUU7QUFUYixhQUZKLEVBYUksbUJBQ2UsT0FBSSxDQUFDN0ksS0FBTCxDQUFXK0MsYUFEMUIsc0NBRWlCLE9BQUksQ0FBQy9DLEtBQUwsQ0FBVytDLGFBRjVCLGlCQWJKLEVBaUJJO0FBQ0k0RixjQUFBQSxlQUFlLHNCQURuQjtBQUVJQyxjQUFBQSxTQUFTLHNCQUZiO0FBR0lDLGNBQUFBLE9BQU8sRUFBRTtBQUhiLGFBakJKLEVBc0JJLElBdEJKLEVBdUJJLE9BQUksQ0FBQzdJLEtBQUwsQ0FBVytDLGFBdkJmO0FBeUJIOztBQUVELGNBQUl1RixTQUFKLEVBQWU7QUFDWEcsK0JBQU9DLHFCQUFQLENBQ0lKLFNBREosRUFFSTtBQUNJSyxjQUFBQSxlQUFlLEVBQUUsb0JBRHJCO0FBRUlDLGNBQUFBLFNBQVMsRUFBRSxvQkFGZjtBQUdJQyxjQUFBQSxPQUFPLEVBQUU7QUFIYixhQUZKLEVBT0ksbUJBQ2UsT0FBSSxDQUFDN0ksS0FBTCxDQUFXK0MsYUFEMUIsc0NBRWlCLE9BQUksQ0FBQy9DLEtBQUwsQ0FBVytDLGFBRjVCLGlCQVBKLEVBV0k7QUFDSTRGLGNBQUFBLGVBQWUsd0JBQWlCSCxpQkFBaUIsR0FBR0wsU0FBcEIsR0FBZ0MsQ0FBQyxDQUFqQyxHQUM1QixJQURXLFVBRG5CO0FBR0lTLGNBQUFBLFNBQVMsd0JBQWlCSixpQkFBaUIsR0FBR0wsU0FBcEIsR0FBZ0MsQ0FBQyxDQUFqQyxHQUN0QixJQURLLFVBSGI7QUFLSVUsY0FBQUEsT0FBTyxFQUFFO0FBTGIsYUFYSixFQWtCSSxJQWxCSixFQW1CSSxPQUFJLENBQUM3SSxLQUFMLENBQVcrQyxhQW5CZjtBQXFCSDs7QUFFRCxjQUFJLE9BQUksQ0FBQy9DLEtBQUwsQ0FBVytCLFVBQVgsSUFBeUIsQ0FBQyxPQUFJLENBQUMvQixLQUFMLENBQVcyQyxxQkFBekMsRUFBZ0U7QUFDNUQsZ0JBQU1tRyxPQUFPLEdBQUcsT0FBSSxDQUFDM0IsWUFBTCxDQUFrQmpHLE9BQWxCLENBQTBCbUgsYUFBMUIsQ0FBd0MsT0FBeEMsQ0FBaEI7O0FBRUEsZ0JBQUlKLFlBQVksS0FBSyxDQUFyQixFQUF3QjtBQUNwQjtBQUNBUSxpQ0FBT0MscUJBQVAsQ0FDSUksT0FESixFQUVJO0FBQ0lILGdCQUFBQSxlQUFlLEVBQUUsdUJBRHJCO0FBRUlDLGdCQUFBQSxTQUFTLEVBQUUsdUJBRmY7QUFHSUMsZ0JBQUFBLE9BQU8sRUFBRTtBQUhiLGVBRkosRUFPSSxtQkFDZSxPQUFJLENBQUM3SSxLQUFMLENBQVcrQyxhQUQxQixzQ0FFaUIsT0FBSSxDQUFDL0MsS0FBTCxDQUFXK0MsYUFGNUIsaUJBUEosRUFXSTtBQUNJNEYsZ0JBQUFBLGVBQWUsRUFBRSxvQkFEckI7QUFFSUMsZ0JBQUFBLFNBQVMsRUFBRSxvQkFGZjtBQUdJQyxnQkFBQUEsT0FBTyxFQUFFO0FBSGIsZUFYSixFQWdCSTtBQUFBLHVCQUFNQyxPQUFPLENBQUN2RCxTQUFSLENBQWtCd0QsTUFBbEIsQ0FBeUIsUUFBekIsQ0FBTjtBQUFBLGVBaEJKLEVBaUJJLE9BQUksQ0FBQy9JLEtBQUwsQ0FBVytDLGFBakJmO0FBbUJILGFBckJELE1BcUJPLElBQUltRixZQUFZLEtBQUssQ0FBckIsRUFBd0I7QUFDM0I7QUFDQU8saUNBQU9DLHFCQUFQLENBQ0lJLE9BREosRUFFSTtBQUNJSCxnQkFBQUEsZUFBZSxFQUFFLG9CQURyQjtBQUVJQyxnQkFBQUEsU0FBUyxFQUFFLG9CQUZmO0FBR0lDLGdCQUFBQSxPQUFPLEVBQUU7QUFIYixlQUZKLEVBT0ksbUJBQ2UsT0FBSSxDQUFDN0ksS0FBTCxDQUFXK0MsYUFEMUIsc0NBRWlCLE9BQUksQ0FBQy9DLEtBQUwsQ0FBVytDLGFBRjVCLGlCQVBKLEVBV0k7QUFDSTRGLGdCQUFBQSxlQUFlLEVBQUUsd0JBRHJCO0FBRUlDLGdCQUFBQSxTQUFTLEVBQUUsd0JBRmY7QUFHSUMsZ0JBQUFBLE9BQU8sRUFBRTtBQUhiLGVBWEosRUFnQkksSUFoQkosRUFpQkksT0FBSSxDQUFDN0ksS0FBTCxDQUFXK0MsYUFqQmYsRUFrQkksWUFBTTtBQUNGK0YsZ0JBQUFBLE9BQU8sQ0FBQ0UsS0FBUixDQUFjTCxlQUFkLEdBQWdDLEVBQWhDO0FBQ0FHLGdCQUFBQSxPQUFPLENBQUNFLEtBQVIsQ0FBY0osU0FBZCxHQUEwQixFQUExQjtBQUNBRSxnQkFBQUEsT0FBTyxDQUFDRSxLQUFSLENBQWNILE9BQWQsR0FBd0IsRUFBeEI7QUFDSCxlQXRCTDtBQXdCSDtBQUNKO0FBQ0o7O0FBRUQsWUFBSSxPQUFJLENBQUM3SSxLQUFMLENBQVc2QyxTQUFYLEtBQXlCLE9BQXpCLElBQW9DNkMsV0FBeEMsRUFBcUQ7QUFDakRzQyxVQUFBQSxVQUFVLENBQUNnQixLQUFYLENBQWlCQyxPQUFqQixHQUEyQixPQUEzQjtBQUNBLGNBQUlDLFVBQStCLEdBQUcsRUFBdEM7QUFDQSxjQUFJQyxRQUE2QixHQUFHLEVBQXBDOztBQUVBLGNBQUloQixTQUFTLEtBQUssQ0FBQyxDQUFuQixFQUFzQjtBQUNsQmUsWUFBQUEsVUFBVSxDQUFDUCxlQUFYLEdBQ0ksaUJBQWlCLENBQUMsQ0FBRCxHQUFLLE9BQUksQ0FBQ3RELE1BQUwsQ0FBWW5FLE9BQVosQ0FBb0J5RixXQUExQyxHQUF3RCxTQUQ1RDtBQUVBdUMsWUFBQUEsVUFBVSxDQUFDTixTQUFYLEdBQ0ksaUJBQWlCLENBQUMsQ0FBRCxHQUFLLE9BQUksQ0FBQ3ZELE1BQUwsQ0FBWW5FLE9BQVosQ0FBb0J5RixXQUExQyxHQUF3RCxTQUQ1RDtBQUVBd0MsWUFBQUEsUUFBUSxDQUFDUixlQUFULEdBQTJCLG9CQUEzQjtBQUNBUSxZQUFBQSxRQUFRLENBQUNQLFNBQVQsR0FBcUIsb0JBQXJCO0FBQ0gsV0FQRCxNQU9PO0FBQ0hPLFlBQUFBLFFBQVEsQ0FBQ1IsZUFBVCxHQUNJLGlCQUFpQixDQUFDLENBQUQsR0FBSyxPQUFJLENBQUN0RCxNQUFMLENBQVluRSxPQUFaLENBQW9CeUYsV0FBMUMsR0FBd0QsU0FENUQ7QUFFQXdDLFlBQUFBLFFBQVEsQ0FBQ1AsU0FBVCxHQUNJLGlCQUFpQixDQUFDLENBQUQsR0FBSyxPQUFJLENBQUN2RCxNQUFMLENBQVluRSxPQUFaLENBQW9CeUYsV0FBMUMsR0FBd0QsU0FENUQ7QUFFSDs7QUFFRDhCLDZCQUFPQyxxQkFBUCxDQUNJLE9BQUksQ0FBQ3hCLGVBQUwsQ0FBcUJoRyxPQUR6QixFQUVJZ0ksVUFGSixFQUdJLHFCQUFjLE9BQUksQ0FBQ2xKLEtBQUwsQ0FBVytDLGFBQXpCLGlCQUhKLEVBSUlvRyxRQUpKLEVBS0ksSUFMSixFQU1JLE9BQUksQ0FBQ25KLEtBQUwsQ0FBVytDLGFBTmYsRUFPSSxZQUFNO0FBQ0ZpRixZQUFBQSxVQUFVLENBQUNnQixLQUFYLENBQWlCQyxPQUFqQixHQUEyQixFQUEzQjtBQUNBLFlBQUEsT0FBSSxDQUFDL0IsZUFBTCxDQUFxQmhHLE9BQXJCLENBQTZCOEgsS0FBN0IsQ0FBbUNMLGVBQW5DLEdBQXFELEVBQXJEO0FBQ0EsWUFBQSxPQUFJLENBQUN6QixlQUFMLENBQXFCaEcsT0FBckIsQ0FBNkI4SCxLQUE3QixDQUFtQ0osU0FBbkMsR0FBK0MsRUFBL0M7QUFDQSxZQUFBLE9BQUksQ0FBQzFCLGVBQUwsQ0FBcUJoRyxPQUFyQixDQUE2QjhILEtBQTdCLENBQW1DSSxnQkFBbkMsR0FBc0QsRUFBdEQ7QUFDQSxZQUFBLE9BQUksQ0FBQ2xDLGVBQUwsQ0FBcUJoRyxPQUFyQixDQUE2QjhILEtBQTdCLENBQW1DSyxVQUFuQyxHQUFnRCxFQUFoRDtBQUNBLFlBQUEsT0FBSSxDQUFDbkMsZUFBTCxDQUFxQmhHLE9BQXJCLENBQTZCOEgsS0FBN0IsQ0FBbUNLLFVBQW5DLEdBQWdELEVBQWhEO0FBQ0EsWUFBQSxPQUFJLENBQUNuQyxlQUFMLENBQXFCaEcsT0FBckIsQ0FBNkI4SCxLQUE3QixDQUFtQ00sd0JBQW5DLEdBQThELEVBQTlEO0FBQ0EsWUFBQSxPQUFJLENBQUNwQyxlQUFMLENBQXFCaEcsT0FBckIsQ0FBNkI4SCxLQUE3QixDQUFtQ08sa0JBQW5DLEdBQXdELEVBQXhEO0FBRUE1SixZQUFBQSxPQUFPO0FBQ1YsV0FsQkw7QUFvQkgsU0F2Q0QsTUF1Q08sSUFBSSxPQUFJLENBQUNLLEtBQUwsQ0FBVzZDLFNBQVgsS0FBeUIsU0FBekIsSUFBc0M2QyxXQUExQyxFQUF1RDtBQUMxRCxjQUFJeUMsU0FBUyxLQUFLLENBQWxCLEVBQXFCO0FBQ2pCTSwrQkFBT0MscUJBQVAsQ0FDSVYsVUFESixFQUVJO0FBQ0lXLGNBQUFBLGVBQWUsd0JBQWlCLE9BQUksQ0FBQ3pCLGVBQUwsQ0FBcUJoRyxPQUFyQixDQUMzQnlGLFdBRDJCLEdBQ2IsSUFESixVQURuQjtBQUdJaUMsY0FBQUEsU0FBUyx3QkFBaUIsT0FBSSxDQUFDMUIsZUFBTCxDQUFxQmhHLE9BQXJCLENBQTZCeUYsV0FBN0IsR0FDdEIsSUFESyxVQUhiO0FBS0lrQyxjQUFBQSxPQUFPLEVBQUUsQ0FMYjtBQU1JSSxjQUFBQSxPQUFPLEVBQUU7QUFOYixhQUZKLEVBVUksbUJBQ2UsT0FBSSxDQUFDakosS0FBTCxDQUFXK0MsYUFEMUIsc0NBRWlCLE9BQUksQ0FBQy9DLEtBQUwsQ0FBVytDLGFBRjVCLGlCQVZKLEVBY0k7QUFDSTRGLGNBQUFBLGVBQWUsc0JBRG5CO0FBRUlDLGNBQUFBLFNBQVMsc0JBRmI7QUFHSUMsY0FBQUEsT0FBTyxFQUFFO0FBSGIsYUFkSixFQW1CSTtBQUFBLHFCQUFPYixVQUFVLENBQUNnQixLQUFYLENBQWlCUSxNQUFqQixHQUEwQixLQUFqQztBQUFBLGFBbkJKLEVBb0JJLE9BQUksQ0FBQ3hKLEtBQUwsQ0FBVytDLGFBcEJmLEVBcUJJLFlBQU07QUFDRmlGLGNBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJRLE1BQWpCLEdBQTBCLEVBQTFCO0FBQ0F4QixjQUFBQSxVQUFVLENBQUNnQixLQUFYLENBQWlCQyxPQUFqQixHQUEyQixFQUEzQjtBQUNBakIsY0FBQUEsVUFBVSxDQUFDZ0IsS0FBWCxDQUFpQkosU0FBakIsR0FBNkIsRUFBN0I7QUFDQVosY0FBQUEsVUFBVSxDQUFDZ0IsS0FBWCxDQUFpQkwsZUFBakIsR0FBbUMsRUFBbkM7QUFDQVgsY0FBQUEsVUFBVSxDQUFDZ0IsS0FBWCxDQUFpQkssVUFBakIsR0FBOEIsRUFBOUI7QUFDQXJCLGNBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJJLGdCQUFqQixHQUFvQyxFQUFwQztBQUNBcEIsY0FBQUEsVUFBVSxDQUFDZ0IsS0FBWCxDQUFpQkgsT0FBakIsR0FBMkIsRUFBM0I7QUFFQWxKLGNBQUFBLE9BQU87QUFDVixhQS9CTDtBQWlDSCxXQWxDRCxNQWtDTztBQUNILGdCQUFJLE9BQUksQ0FBQ0ssS0FBTCxDQUFXa0QsU0FBZixFQUEwQjtBQUN0QixrQkFBTXVHLFVBQVUsR0FBRyxPQUFJLENBQUM5SSxhQUFMLENBQW1CK0UsV0FBbkIsRUFBZ0N4RSxPQUFoQyxDQUF3Q21FLE1BQXhDLENBQStDbkUsT0FBbEU7QUFDQThHLGNBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJDLE9BQWpCLEdBQTJCLE9BQTNCO0FBQ0FqQixjQUFBQSxVQUFVLENBQUNnQixLQUFYLENBQWlCSCxPQUFqQixHQUEyQixHQUEzQjs7QUFFQUosaUNBQU9DLHFCQUFQLENBQ0llLFVBREosRUFFSTtBQUNJZCxnQkFBQUEsZUFBZSxzQkFEbkI7QUFFSUMsZ0JBQUFBLFNBQVMsc0JBRmI7QUFHSUMsZ0JBQUFBLE9BQU8sRUFBRTtBQUhiLGVBRkosRUFPSSxtQkFDZSxPQUFJLENBQUM3SSxLQUFMLENBQVcrQyxhQUQxQixzQ0FFaUIsT0FBSSxDQUFDL0MsS0FBTCxDQUFXK0MsYUFGNUIsaUJBUEosRUFXSTtBQUNJNEYsZ0JBQUFBLGVBQWUsMEJBQW1CLE9BQUksQ0FBQ3pCLGVBQUwsQ0FBcUJoRyxPQUFyQixDQUM3Qm9GLFlBRDZCLEdBRTlCLENBRjhCLEdBRzlCLElBSFcsUUFEbkI7QUFLSXNDLGdCQUFBQSxTQUFTLDBCQUFtQixPQUFJLENBQUMxQixlQUFMLENBQXFCaEcsT0FBckIsQ0FDdkJvRixZQUR1QixHQUV4QixDQUZ3QixHQUd4QixJQUhLLFFBTGI7QUFTSXVDLGdCQUFBQSxPQUFPLEVBQUU7QUFUYixlQVhKLEVBc0JJLElBdEJKLEVBdUJJLE9BQUksQ0FBQzdJLEtBQUwsQ0FBVytDLGFBdkJmLEVBd0JJLFlBQU07QUFDRjBHLGdCQUFBQSxVQUFVLENBQUNULEtBQVgsQ0FBaUJLLFVBQWpCLEdBQThCLEVBQTlCO0FBQ0FJLGdCQUFBQSxVQUFVLENBQUNULEtBQVgsQ0FBaUJJLGdCQUFqQixHQUFvQyxFQUFwQztBQUNBSyxnQkFBQUEsVUFBVSxDQUFDVCxLQUFYLENBQWlCSixTQUFqQixHQUE2QixFQUE3QjtBQUNBYSxnQkFBQUEsVUFBVSxDQUFDVCxLQUFYLENBQWlCTCxlQUFqQixHQUFtQyxFQUFuQztBQUNBYyxnQkFBQUEsVUFBVSxDQUFDVCxLQUFYLENBQWlCSCxPQUFqQixHQUEyQixFQUEzQjtBQUVBYixnQkFBQUEsVUFBVSxDQUFDZ0IsS0FBWCxDQUFpQkMsT0FBakIsR0FBMkIsRUFBM0I7QUFDQWpCLGdCQUFBQSxVQUFVLENBQUNnQixLQUFYLENBQWlCSCxPQUFqQixHQUEyQixFQUEzQjtBQUVBbEosZ0JBQUFBLE9BQU87QUFDVixlQW5DTDtBQXFDSCxhQTFDRCxNQTBDTztBQUNIcUksY0FBQUEsVUFBVSxDQUFDZ0IsS0FBWCxDQUFpQkMsT0FBakIsR0FBMkIsT0FBM0I7O0FBRUFSLGlDQUFPQyxxQkFBUCxDQUNJVixVQURKLEVBRUk7QUFDSVcsZ0JBQUFBLGVBQWUsd0JBQWlCLENBQUMsQ0FBRCxHQUM1QixPQUFJLENBQUN6QixlQUFMLENBQXFCaEcsT0FBckIsQ0FBNkJ5RixXQURELEdBRTVCLElBRlcsVUFEbkI7QUFJSWlDLGdCQUFBQSxTQUFTLHdCQUFpQixDQUFDLENBQUQsR0FDdEIsT0FBSSxDQUFDMUIsZUFBTCxDQUFxQmhHLE9BQXJCLENBQTZCeUYsV0FEUCxHQUV0QixJQUZLLFVBSmI7QUFPSWtDLGdCQUFBQSxPQUFPLEVBQUU7QUFQYixlQUZKLEVBV0ksbUJBQ2UsT0FBSSxDQUFDN0ksS0FBTCxDQUFXK0MsYUFEMUIsc0NBRWlCLE9BQUksQ0FBQy9DLEtBQUwsQ0FBVytDLGFBRjVCLGlCQVhKLEVBZUk7QUFDSTRGLGdCQUFBQSxlQUFlLHNCQURuQjtBQUVJQyxnQkFBQUEsU0FBUyxzQkFGYjtBQUdJQyxnQkFBQUEsT0FBTyxFQUFFO0FBSGIsZUFmSixFQW9CSTtBQUFBLHVCQUFPYixVQUFVLENBQUNnQixLQUFYLENBQWlCUSxNQUFqQixHQUEwQixLQUFqQztBQUFBLGVBcEJKLEVBcUJJLE9BQUksQ0FBQ3hKLEtBQUwsQ0FBVytDLGFBckJmLEVBc0JJLFlBQU07QUFDRmlGLGdCQUFBQSxVQUFVLENBQUNnQixLQUFYLENBQWlCQyxPQUFqQixHQUEyQixFQUEzQjtBQUNBakIsZ0JBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJRLE1BQWpCLEdBQTBCLEVBQTFCO0FBQ0F4QixnQkFBQUEsVUFBVSxDQUFDZ0IsS0FBWCxDQUFpQkosU0FBakIsR0FBNkIsRUFBN0I7QUFDQVosZ0JBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJMLGVBQWpCLEdBQW1DLEVBQW5DO0FBQ0FYLGdCQUFBQSxVQUFVLENBQUNnQixLQUFYLENBQWlCSyxVQUFqQixHQUE4QixFQUE5QjtBQUNBckIsZ0JBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJJLGdCQUFqQixHQUFvQyxFQUFwQztBQUNBcEIsZ0JBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJILE9BQWpCLEdBQTJCLEVBQTNCO0FBRUFsSixnQkFBQUEsT0FBTztBQUNWLGVBaENMO0FBa0NIO0FBQ0o7QUFDSixTQXJITSxNQXFIQSxJQUFJLE9BQUksQ0FBQ0ssS0FBTCxDQUFXNkMsU0FBWCxLQUF5QixNQUF6QixJQUFtQyxDQUFDNkMsV0FBeEMsRUFBcUQ7QUFDeEQrQyw2QkFBT0MscUJBQVAsQ0FDSVYsVUFESixFQUVJO0FBQ0lpQixZQUFBQSxPQUFPLEVBQUUsT0FEYjtBQUVJSixZQUFBQSxPQUFPLEVBQUU7QUFGYixXQUZKLEVBTUksbUJBQVksT0FBSSxDQUFDN0ksS0FBTCxDQUFXK0MsYUFBdkIsaUJBTkosRUFPSTtBQUNJOEYsWUFBQUEsT0FBTyxFQUFFO0FBRGIsV0FQSixFQVVJO0FBQUEsbUJBQU9iLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJRLE1BQWpCLEdBQTBCLEtBQWpDO0FBQUEsV0FWSixFQVdJLE9BQUksQ0FBQ3hKLEtBQUwsQ0FBVytDLGFBWGYsRUFZSSxZQUFNO0FBQ0ZpRixZQUFBQSxVQUFVLENBQUNnQixLQUFYLENBQWlCQyxPQUFqQixHQUEyQixFQUEzQjtBQUNBakIsWUFBQUEsVUFBVSxDQUFDZ0IsS0FBWCxDQUFpQlEsTUFBakIsR0FBMEIsRUFBMUI7QUFDQXhCLFlBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJKLFNBQWpCLEdBQTZCLEVBQTdCO0FBQ0FaLFlBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJMLGVBQWpCLEdBQW1DLEVBQW5DO0FBQ0FYLFlBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJLLFVBQWpCLEdBQThCLEVBQTlCO0FBQ0FyQixZQUFBQSxVQUFVLENBQUNnQixLQUFYLENBQWlCSSxnQkFBakIsR0FBb0MsRUFBcEM7QUFDQXBCLFlBQUFBLFVBQVUsQ0FBQ2dCLEtBQVgsQ0FBaUJILE9BQWpCLEdBQTJCLEVBQTNCO0FBRUFsSixZQUFBQSxPQUFPO0FBQ1YsV0F0Qkw7QUF3Qkg7QUFDSixPQXhUTSxDQUFQO0FBeVRIOzs7O0VBam9DeUMrSiw0Qjs7OztnQkFBekJySyxnQixvQ0FFVnNLLDRCO0FBQ0h6RyxFQUFBQSxTQUFTLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tIFwicmVhY3RcIjtcbmltcG9ydCB7IFJlYWN0Tm9kZSwgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWlyckZYIGZyb20gXCIuL0FpcnJGWFwiO1xuaW1wb3J0IEFpcnJTY2VuZSwgeyBDb3JlU2NlbmVQcm9wcywgc2NlbmVEZWZhdWx0UHJvcHMgfSBmcm9tIFwiLi9BaXJyU2NlbmVcIjtcbmltcG9ydCBBaXJyU2lkZXBhbmVsIGZyb20gXCIuL0FpcnJTaWRlcGFuZWxcIjtcbmltcG9ydCBBaXJyVmlld1dyYXBwZXIgZnJvbSBcIi4vQWlyclZpZXdXcmFwcGVyXCI7XG5pbXBvcnQgeyBQcm9wcyBhcyBWaWV3UHJvcHMgfSBmcm9tIFwiLi9BaXJyVmlld1wiO1xuaW1wb3J0IEFpcnJNYXllciwgeyBQcmVwYXJlZFByb3BzIGFzIE1heWVyUHJvcHMgfSBmcm9tIFwiLi9BaXJyTWF5ZXJcIjtcbmltcG9ydCB1cGRhdGUgZnJvbSBcImltbXV0YWJpbGl0eS1oZWxwZXJcIjtcbmltcG9ydCB7IFZpZXdDb25maWcsIENTU1N0cmluZ1Byb3BlcnRpZXMgfSBmcm9tIFwiLi9UeXBlc1wiO1xuXG5pbnRlcmZhY2UgUHJvcHMgZXh0ZW5kcyBDb3JlU2NlbmVQcm9wcyB7XG4gICAgLyoqXG4gICAgICogVGhpcyBwcm9wZXR5IGNoYW5nZXMgYmVoYXZpb3VyIG9mIHZpZXdzIGFuaW1hdGlvbiB3aGVuIG92ZXJsYXkgYW5pbWF0aW9uIGlzIHNldFxuICAgICAqL1xuICAgIHN0YWNrTW9kZTogYm9vbGVhbjtcbn1cbmludGVyZmFjZSBWaWV3c0NvbmZpZ0l0ZW0gZXh0ZW5kcyBWaWV3Q29uZmlnIHtcbiAgICAvKipcbiAgICAgKiBQcm9wcyB0byBtb2RpZnkgU2NlbmVcbiAgICAgKi9cbiAgICBzY2VuZVByb3BzPzogUHJvcHM7XG4gICAgLyoqXG4gICAgICpcbiAgICAgKiBDb21tb24gdmlldyBjb25maWd1dGFpb24gY2FuIGhhdmUgbmFtZUdlbmVyYXRvciBmdW5jdGlvbiB1c2VkIHRvIGNyZWF0ZSBhbm90aGVyIHZpZXcgbmFtZSBwcm9wcGVydHkuXG4gICAgICogR2V0cyBjdXJyZW50IHN0YXRlIHZpZXdzIGxpc3QgYXMgYXJndW1lbnQuXG4gICAgICogRXhhbXBsZTpcbiAgICAgKiBuYW1lR2VuZXJhdG9yOiB2aWV3cyA9PiB7IHJldHVybiBcImNvbW1vbi12aWV3LSpcIi5yZXBsYWNlKFwiKlwiLCB2aWV3cy5sZW5ndGggKyAxKTt9XG4gICAgICovXG4gICAgbmFtZUdlbmVyYXRvcj8odmlld3M6IFByb3BzW1widmlld3NcIl0pOiBzdHJpbmc7XG59XG5pbnRlcmZhY2UgVmlld3NDb25maWcge1xuICAgIC8qKlxuICAgICAqIFNpbXBsZSB2aWV3IGNvbmZpZ3VyYWlvbiB3aGljaCBjYW4gYmUgZm91bmQgYnkga2V5IHdoaWNoIGlzIGFsc28gaXQncyBuYW1lLlxuICAgICAqL1xuICAgIFtuYW1lOiBzdHJpbmddOiBWaWV3c0NvbmZpZ0l0ZW07XG59XG5pbnRlcmZhY2UgUmVmc0NPTVBWaWV3cyB7XG4gICAgW3ZpZXduYW1lOiBzdHJpbmddOiBSZWZPYmplY3Q8QWlyclZpZXdXcmFwcGVyPjtcbn1cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFpcnJTY2VuZVdyYXBwZXIgZXh0ZW5kcyBBaXJyVmlld1dyYXBwZXIge1xuICAgIHN0YXRpYyBkZWZhdWx0UHJvcHM6IFByb3BzID0ge1xuICAgICAgICAuLi5zY2VuZURlZmF1bHRQcm9wcyxcbiAgICAgICAgc3RhY2tNb2RlOiBmYWxzZVxuICAgIH07XG5cbiAgICBzdGF0ZTogUHJvcHM7XG4gICAgLyoqXG4gICAgICogT2JqZWN0IHRoYXQga2VlcCBpbmZvcm1hdGlvbiBhYm91dCB2aWV3cyBjb25maWd1cmFpb24gb2JqZWN0cy5cbiAgICAgKiBFdmVyeSBrZXkgaW4gdGhpcyBvYmplY3QgZGVzY3JpYmVzIGFub3RoZXIgdmlldy5cbiAgICAgKiBUaGF0IGNvbmZpZ3VyYXRpb24gbGF0ZXIgd2lsbCBiZSB1c2VkIHRvIGNyZWF0ZSBuZXcgdmlldyBhbmQgYWRkIGl0IHRvIHN0YXRlIHZpZXdzIGFycmF5LlxuICAgICAqIFVzZWQgYnkgOjpnZXRGcmVzaFZpZXdDb25maWcgdG8gZGVsaXZlciBuZXcgdmlldyBjb25maWcuXG4gICAgICogVGhpcyBhcHByb2FjaCBpcyBtYWlubHkgdXNlZCBpbiBjcnVjaWFsIGNvbXBvbmVudHMncyA6OmNoYW5nZVZpZXcgbWV0aG9kLlxuICAgICAqL1xuICAgIHZpZXdzQ29uZmlnOiBWaWV3c0NvbmZpZztcblxuICAgIC8qKlxuICAgICAqIEluc3RhbnRpYXRlZCB2aWV3cyBDb21wb25lbnQncyByZWZmZXJlbmNlc1xuICAgICAqL1xuICAgIHJlZnNDT01QVmlld3M6IFJlZnNDT01QVmlld3MgPSB7fTtcbiAgICAvKipcbiAgICAgKiBJbnN0YW50aWF0ZWQgbWF5ZXJzIENvbXBvbmVudHMgcmVmZmVyZW5jZXNcbiAgICAgKi9cbiAgICByZWZzQ09NUE1heWVyczogeyBbY29uZmlnTmFtZTogc3RyaW5nXTogUmVmT2JqZWN0PEFpcnJNYXllcj4gfSA9IHt9O1xuICAgIC8qKlxuICAgICAqIEluc3RhbnRpYXRlZCBzaWRlcGFuZWwgQ29tcG9uZW50IHJlZmZlcmVuY2VcbiAgICAgKi9cbiAgICByZWZDT01QU2lkZXBhbmVsID0gUmVhY3QuY3JlYXRlUmVmPEFpcnJTaWRlcGFuZWw+KCk7XG4gICAgLyoqXG4gICAgICogUmVmZmVyZW5jZSB0byBET00gZWxlbWVudCBvZiBjb250YWluZXIncyBkaXYgKGZpcnN0IGNoaWxkIG9mIG1vc3Qgb3V0ZXIgZWxlbWVudClcbiAgICAgKi9cbiAgICByZWZET01Db250YWluZXIgPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG4gICAgLyoqXG4gICAgICogUmVmZmVyZW5jZSB0byBET00gZWxlbWVudCBvZiBuYXZiYXIncyBkaXZcbiAgICAgKi9cbiAgICByZWZET01OYXZiYXIgPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG4gICAgLyoqXG4gICAgICogSGVscGVyIHZhcmlhYmxlIGZvciBzdG9yaW5nIHZpZXdzIG5hbWVzIHRoYXQgd2lsbCBiZSBmaWx0ZXJlZFxuICAgICAqL1xuICAgIHZpZXdzTmFtZXNUb1N0YXlMaXN0OiBzdHJpbmdbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgICAgIHN1cGVyKHByb3BzKTtcblxuICAgICAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgICAgICAgbmFtZTogcHJvcHMubmFtZSxcbiAgICAgICAgICAgIGFjdGl2ZTogcHJvcHMuYWN0aXZlLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiBwcm9wcy5jbGFzc05hbWUsXG4gICAgICAgICAgICB0aXRsZTogcHJvcHMudGl0bGUsXG4gICAgICAgICAgICBuYXZiYXI6IHByb3BzLm5hdmJhcixcbiAgICAgICAgICAgIG5hdmJhckhlaWdodDogcHJvcHMubmF2YmFySGVpZ2h0LFxuICAgICAgICAgICAgbmF2YmFyTWVudTogcHJvcHMubmF2YmFyTWVudSxcbiAgICAgICAgICAgIG5hdmJhckNsYXNzOiBwcm9wcy5uYXZiYXJDbGFzcyxcbiAgICAgICAgICAgIGJhY2tCdXR0b246IHByb3BzLmJhY2tCdXR0b24sXG4gICAgICAgICAgICBiYWNrQnV0dG9uT25GaXJzdFZpZXc6IHByb3BzLmJhY2tCdXR0b25PbkZpcnN0VmlldyxcbiAgICAgICAgICAgIGFjdGl2ZVZpZXdOYW1lOiBwcm9wcy5hY3RpdmVWaWV3TmFtZSxcbiAgICAgICAgICAgIGFuaW1hdGlvbjogcHJvcHMuYW5pbWF0aW9uLFxuICAgICAgICAgICAgdmlld3M6IHByb3BzLnZpZXdzLFxuICAgICAgICAgICAgc2lkZXBhbmVsOiBwcm9wcy5zaWRlcGFuZWwsXG4gICAgICAgICAgICBzaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2s6IHByb3BzLnNpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjayxcbiAgICAgICAgICAgIEdVSURpc2FibGVkOiBwcm9wcy5HVUlEaXNhYmxlZCxcbiAgICAgICAgICAgIEdVSURpc2FibGVDb3ZlcjogcHJvcHMuR1VJRGlzYWJsZUNvdmVyLFxuICAgICAgICAgICAgbWF5ZXJzOiBwcm9wcy5tYXllcnMsXG4gICAgICAgICAgICBjaGlsZHJlbjogcHJvcHMuY2hpbGRyZW4sXG4gICAgICAgICAgICBhbmltYXRpb25UaW1lOiBwcm9wcy5hbmltYXRpb25UaW1lLFxuICAgICAgICAgICAgaGFuZGxlQmFja0JlaGF2aW91ck9uRmlyc3RWaWV3OiBwcm9wcy5oYW5kbGVCYWNrQmVoYXZpb3VyT25GaXJzdFZpZXcsXG4gICAgICAgICAgICBoYW5kbGVCYWNrQnV0dG9uOiBwcm9wcy5oYW5kbGVCYWNrQnV0dG9uLFxuICAgICAgICAgICAgc3RhY2tNb2RlOiBwcm9wcy5zdGFja01vZGVcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIG5ldyB2aWV3IGNvbmZpZyBiYXNlIG9uIGNvbmZpZ3VyYXRpb24gaW4gYHZpZXdzQ29uZmlnYCB2YXJpYWJsZS5cbiAgICAgKiBXaGVuIGB2aWV3TmFtZUdlbmVyYXRvcmAgaW4gcHJlc2VudCBiYXNlIGNvbmZpZ3VyYXRpb24gaXQgd2lsbCB1c2UgdG8gY3JlYXRlIG5ldyB2aWV3IG5hbWUgcHJvcGVydHkuXG4gICAgICogVGhpcyBmZWF0dXJlIGlzIGhhbmR5IHdoZW4geW91IHdhbnQgdG8gZWFzbHkgY3JlYXRlIG5leHQgdmlld3MgYmFzZWQgdXBvbiBnZW5lcmljIHZpZXcgY29uZmlndXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3TmFtZSBOYW1lIG9mIHRoZSBjb25maWd1cmFpb24ga2V5IGluIGB0aGlzLnZpZXdzQ29uZmlnYCBvYmplY3RcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gcHJvcHMgQWRkaXRpb25hbCBwcm9wIHRvIGJlIG1lcmdlZCB3aXRoIGJhc2UgY29uZmlnXG4gICAgICovXG4gICAgZ2V0RnJlc2hWaWV3Q29uZmlnKHZpZXdOYW1lOiBzdHJpbmcsIHByb3BzOiBWaWV3UHJvcHMgfCB7fSA9IHt9KTogVmlld3NDb25maWdJdGVtIHtcbiAgICAgICAgaWYgKHZpZXdOYW1lIGluIHRoaXMudmlld3NDb25maWcpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oe30sIHRoaXMudmlld3NDb25maWdbdmlld05hbWVdKTtcbiAgICAgICAgICAgIGNvbnN0IHZpZXdOYW1lR2VuZXJhdG9yID0gdGhpcy52aWV3c0NvbmZpZ1t2aWV3TmFtZV0ubmFtZUdlbmVyYXRvcjtcblxuICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZSh0aGlzLnZpZXdzQ29uZmlnW3ZpZXdOYW1lXSwge1xuICAgICAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLk9iamVjdC5hc3NpZ24oe30sIGNvbmZpZy5wcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5PYmplY3QuYXNzaWduKHt9LCBwcm9wcyksXG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdOYW1lR2VuZXJhdG9yICYmIHR5cGVvZiB2aWV3TmFtZUdlbmVyYXRvciA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gdmlld05hbWVHZW5lcmF0b3IodGhpcy5zdGF0ZS52aWV3cylcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiB2aWV3TmFtZVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBhc3NlZCB2aWV3IG5hbWUgJyR7dmlld05hbWV9JyBpcyBub3QgcHJlc2VudCBpbiB2aWV3c0NvbmZpZy5gKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdmlld3MgdGhhdCBhcmUgbm90IGNvbnRhaW5lZCBieSBuYW1lIGluIGFycmF5XG4gICAgICogQHBhcmFtIHthcnJheX0gdmlld3NOYW1lTGlzdCBMaXN0IG9mIHZpZXdzIG5hbWVzIHRoYXQgd2lsbCBzdGF5IGluIHN0YXRlXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IFdpbGwgYmUgcmVzb2x2ZWQgb24gc3VjY2VzZnVsIHN0YXRlIHVwZGF0ZVxuICAgICAqL1xuICAgIGZpbHRlclZpZXdzKHZpZXdzTmFtZUxpc3Q6IHN0cmluZ1tdID0gW10pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIHZpZXdzOiB0aGlzLnN0YXRlLnZpZXdzLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXcgPT4gdmlld3NOYW1lTGlzdC5pbmRleE9mKHZpZXcucHJvcHMubmFtZSkgIT09IC0xXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHJlc29sdmVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHNjZW5lJ3MgR1VJIGJ5IHByb3ZpbmRpbmcgZXh0cmEgbGF5ZXIgb24gdG9wIG9mIGV2ZXJ5dGhpbmcgZWxzZS5cbiAgICAgKiBUaGlzIGxheWVyIGNhbiBiZSBjdXN0b21pemUgYnkgYGNvdmVyYCBhcmd1bWVudC5cbiAgICAgKiBAcGFyYW0ge1JlYWN0Tm9kZX0gY292ZXIgUmVhY3QgZWxlbWVudCB0byBiZSBwbGFjZWQgaW4gY292ZXJpbmcgbGF5ZXJcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gIFdpbGwgYmUgcmVzb2x2ZWQgb24gc3VjY2VzZnVsIHN0YXRlIHVwZGF0ZVxuICAgICAqL1xuICAgIGRpc2FibGVHVUkgPSAoY292ZXI6IFJlYWN0Tm9kZSA9IG51bGwpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBHVUlEaXNhYmxlZDogdHJ1ZSwgR1VJRGlzYWJsZUNvdmVyOiBjb3ZlciB9LCByZXNvbHZlKVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlcyBsYXllciBjb3ZlcmluZyBzY2VuZSBhbmQgZW5hYmxlIHVzZXIgaW50ZXJhY3Rpb25zLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBXaWxsIGJlIHJlc29sdmVkIG9uIHN1Y2Nlc2Z1bCBzdGF0ZSB1cGRhdGVcbiAgICAgKi9cbiAgICBlbmFibGVHVUkgPSAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKHsgR1VJRGlzYWJsZWQ6IGZhbHNlLCBHVUlEaXNhYmxlQ292ZXI6IG51bGwgfSwgcmVzb2x2ZSlcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogR2V0IHZpZXcgaW5kZXggaW4gdmlld3MgYXJyYXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdmlld05hbWVcbiAgICAgKiBAcmV0dXJucyB7bnVtYmVyfVxuICAgICAqL1xuICAgIGdldFZpZXdJbmRleCA9ICh2aWV3TmFtZTogc3RyaW5nKTogbnVtYmVyID0+XG4gICAgICAgIHRoaXMuc3RhdGUudmlld3MuZmluZEluZGV4KHZpZXcgPT4gdmlldy5wcm9wcy5uYW1lID09PSB2aWV3TmFtZSk7XG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIG1ldGhvZCBmb3IgcHVzaGluZyBuZXcgdmlldyBjb25maWcgaW50byB0aGlzLnN0YXRlLnZpZXdzIGFycmF5XG4gICAgICogQHBhcmFtIHtWaWV3c0NvbmZpZ0l0ZW19IGNvbmZpZ1xuICAgICAqIEBwYXJhbSB7UHJvcHN9IHNjZW5lUHJvcHNcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gIFdpbGwgYmUgcmVzb2x2ZWQgb24gc3VjY2VzZnVsIHN0YXRlIHVwZGF0ZVxuICAgICAqL1xuICAgIF9fcHVzaFZpZXcoY29uZmlnOiBWaWV3c0NvbmZpZ0l0ZW0sIHNjZW5lUHJvcHM6IFByb3BzIHwge30gPSB7fSk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICAgIGNvbnN0IG5ld3ZpZXdkZWZpbml0aW9uID0gdXBkYXRlKHRoaXMuc3RhdGUudmlld3MsIHsgJHB1c2g6IFtjb25maWddIH0pO1xuICAgICAgICBjb25zdCBzdGF0ZUNoYW5nZSA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdmlld3M6IG5ld3ZpZXdkZWZpbml0aW9uXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLnNjZW5lUHJvcHMgfHwge30pLFxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgc2NlbmVQcm9wcyB8fCB7fSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0aGlzLnNldFN0YXRlKHN0YXRlQ2hhbmdlLCAoKSA9PiByZXNvbHZlKGNvbmZpZy5wcm9wcy5uYW1lKSkpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBvcHMgb3V0IHdpdGggYW5pbWF0aW9uIGN1cnJlbnRseSBhY3RpdmUgdmlldyBmcm9tIHZpZXcncyBhcnJheVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB2aWV3UHJvcHMgcHJvcHMgdG8gbW9kaWZ5IHRoZSB2aWV3IGp1c3QgYmVmb3JlIHBvcHBpbmdcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc2NlbmVQcm9wcyBwcm9wcyB0byBtb2RpZnkgdGhlIHNjZW5lIHdoaWxlIHBvcHBpbmdcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gIFdpbGwgYmUgcmVzb2x2ZWQgb24gc3VjY2VzZnVsIHN0YXRlIHVwZGF0ZSBvciByZWplY3RlZCB3aGVuIG5vIHZpZXcgdG8gcG9wXG4gICAgICovXG4gICAgcG9wVmlldyA9IGFzeW5jIChcbiAgICAgICAgdmlld1Byb3BzOiBWaWV3UHJvcHMgfCB7fSA9IHt9LFxuICAgICAgICBzY2VuZVByb3BzOiBQcm9wcyB8IHt9ID0ge31cbiAgICApOiBQcm9taXNlPHN0cmluZyB8IHZvaWQ+ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUudmlld3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3Qgdmlld05hbWUgPSB0aGlzLnN0YXRlLnZpZXdzW3RoaXMuc3RhdGUudmlld3MubGVuZ3RoIC0gMl0ucHJvcHMubmFtZTtcblxuICAgICAgICAgICAgYXdhaXQgdGhpcy5jaGFuZ2VWaWV3KHZpZXdOYW1lLCB2aWV3UHJvcHMsIHNjZW5lUHJvcHMpO1xuICAgICAgICAgICAgY29uc3QgbmV3dmlld2RlZmluaXRpb24gPSB1cGRhdGUodGhpcy5zdGF0ZS52aWV3cywge1xuICAgICAgICAgICAgICAgICRzcGxpY2U6IFtbdGhpcy5zdGF0ZS52aWV3cy5sZW5ndGggLSAxLCAxXV1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMucmVmc0NPTVBWaWV3c1t0aGlzLnN0YXRlLnZpZXdzW3RoaXMuc3RhdGUudmlld3MubGVuZ3RoIC0gMV0ucHJvcHMubmFtZV07XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2aWV3czogbmV3dmlld2RlZmluaXRpb24gfSwgKCkgPT4gcmVzb2x2ZSh2aWV3TmFtZSkpXG4gICAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW0FpcnJdIE5vIHZpZXcgdG8gcG9wLlwiKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayB3aGV0ZXIgb2JqZWN0IGlzIHZhbGlkIHZpZXcgY29uZmlnIGFuZCBjYW4gYmUgYWRkZWQgdG8gdmlldydzIGFycmF5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGlzVmFsaWRWaWV3Q29uZmlnKG9iamVjdDogVmlld0NvbmZpZyk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgdHlwZW9mIG9iamVjdCA9PT0gXCJvYmplY3RcIiAmJlxuICAgICAgICAgICAgXCJ0eXBlXCIgaW4gb2JqZWN0ICYmXG4gICAgICAgICAgICB0eXBlb2Ygb2JqZWN0LnByb3BzID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBcIm5hbWVcIiBpbiBvYmplY3QucHJvcHNcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDcnVjaWFsIG1ldGhvZCBvZiB0aGUgc2NlbmUgY29tcG9uZW50IGZvciBtYW5pcGFsdXRhaW5nIHZpZXdzIGFuZCBzY2VuZSBwcm9wZXJ0aWVzIGFuZCBwZXJmb3JtaW5nIGFuaW1hdGlvbnMuXG4gICAgICogQ2FuIGNoYW5nZSBhY3RpdmUgdmlldyB3aXRoIGFuaW1hdGlvbiBvciBqdXN0IHVwZGF0ZSB2aWV3IGFuZCBzY2VuZSBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQ2hhbmdlIHZpZXcgYnk6XG4gICAgICogLSBzdHJpbmcgbmFtZSBrZXB0IGluIHN0YXRlIHZpZXdzIGFycmF5IHdoaWNoIHdpbGwgbGVhZCB0byB2aWV3IGNoYW5nZSAod2l0aCBhbmltYXRpb24pIG9yIGp1c3QgdXBkYXRlIGlmIGN1cnJlbnRseSBhY3RpdmVcbiAgICAgKiAtIHN0cmluZyBuYW1lIGtlcHQgaW4gYHRoaXMudmlld3NDb25maWdgIHdoaWNoIHdpbGwgbGVhZCB0byB2aWV3IHB1c2ggKHdpdGggYW5pbWF0aW9uKVxuICAgICAqIC0gbmV3IHZpZXcgY29uZmlnIHdpY2ggd2lsbCBsZWFkIHRvIHZpZXcgY2hhbmdlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHZpZXcgVmlldyBuYW1lIHRvIGNoYW5nZSBvciB2aWV3IGNvbmZpZyB0byBiZSBhZGRlZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB2aWV3UHJvcHMgRXh0cmEgcHJvcHMgdG8gYmUgYWRkZWQgdG8gY2hhbmdpbmcgdmlld1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzY2VuZVByb3BzIEV4dHJhIHByb3BzIHRvIG1hbmlwdWxhdGUgdGhpcyBzY2VuZSB3aGlsZSBjaGFuZ2luZyB2aWV3XG4gICAgICogQHJldHVybnMge1Byb21pc2V9IFJlc29sdmVkIG9uIHN0YXRlIHN1Y2Nlc2Z1bCBjaGFuZ2UgYW5kIGFuaW1hdGlvbiBlbmQuIE9yIHJlamVjdCBvbiBmYWlsdXJlLlxuICAgICAqL1xuICAgIGFzeW5jIGNoYW5nZVZpZXcoXG4gICAgICAgIHZpZXc6IHN0cmluZyB8IFZpZXdDb25maWcsXG4gICAgICAgIHZpZXdQcm9wczogVmlld1Byb3BzIHwge30gPSB7fSxcbiAgICAgICAgc2NlbmVQcm9wczogUHJvcHMgfCB7fSA9IHt9XG4gICAgKTogUHJvbWlzZTxzdHJpbmcgfCB2b2lkPiB7XG4gICAgICAgIGNvbnN0IHZpZXdOYW1lID0gYXdhaXQgdGhpcy5fX2NoYW5nZVZpZXcodmlldywgdmlld1Byb3BzLCBzY2VuZVByb3BzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX19wZXJmb3JtVmlld3NBbmltYXRpb24odmlld05hbWUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdmlldyBmcm9tIHZpZXdzIGFycmF5XG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKi9cbiAgICBkZXN0cm95VmlldyhuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zdGF0ZS52aWV3cy5maW5kSW5kZXgodmlldyA9PiB2aWV3LnByb3BzLm5hbWUgPT09IG5hbWUpO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld3M6IHVwZGF0ZSh0aGlzLnN0YXRlLnZpZXdzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNwbGljZTogW1tpbmRleCwgMV1dXG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmVqZWN0KGBWaWV3IHdpdGggbmFtZTogJHtuYW1lfSB3YXMgbm90IGZvdW5kIGluIHRoaXMgc2NlbmUuYCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE1ha2UgbW9kaWZpY2F0aW9uIHRvIHNjZW5lJ3Mgdmlld3MgYnkgcHVzaGluZyBuZXcsIHVwZGF0aW5nIGN1cnJlbnQgb3IgY2hhbmdpbmcgYmV0d2VlbiBhZGRlZCB2aWV3c1xuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8b2JqZWN0fSB2aWV3IFZpZXcgbmFtZSB0byBjaGFuZ2Ugb3IgdmlldyBjb25maWcgdG8gYmUgYWRkZWRcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gdmlld1Byb3BzIEV4dHJhIHByb3BzIHRvIGJlIGFkZGVkIHRvIGNoYW5naW5nIHZpZXdcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gc2NlbmVQcm9wcyBFeHRyYSBwcm9wcyB0byBtYW5pcHVsYXRlIHRoaXMgc2NlbmUgd2hpbGUgY2hhbmdpbmcgdmlld1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBSZXNvbHZlZCBvbiBzdGF0ZSBzdWNjZXNmdWwgY2hhbmdlIGFuZCBhbmltYXRpb24gZW5kLiBPciByZWplY3Qgb24gZmFpbHVyZS5cbiAgICAgKi9cbiAgICBfX2NoYW5nZVZpZXcoXG4gICAgICAgIHZpZXc6IHN0cmluZyB8IFZpZXdDb25maWcsXG4gICAgICAgIHZpZXdQcm9wczogVmlld1Byb3BzIHwge30gPSB7fSxcbiAgICAgICAgc2NlbmVQcm9wczogUHJvcHMgfCB7fSA9IHt9XG4gICAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgaWYgKHR5cGVvZiB2aWV3ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNWaWV3SW5TdGF0ZSh2aWV3KSkge1xuICAgICAgICAgICAgICAgIC8vaWYgYWxyZWFkeSBpbiBzdGF0ZSB0aGVuIHVwZGF0ZSBpdHMgcHJvcHNcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpZXdJbmRleCA9IHRoaXMuZ2V0Vmlld0luZGV4KHZpZXcpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50Vmlld0NvbmZpZyA9IE9iamVjdC5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgICAgICB7IHNjZW5lUHJvcHM6IHt9IH0sIC8vZm9yIGEgZGVmYXVsdCBwcm9wcyB3aGljaCB3aWxsIGJlIGxhdHRlciB1c2VkXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnZpZXdzW3ZpZXdJbmRleF1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Vmlld0NvbmZpZyA9IHVwZGF0ZShjdXJyZW50Vmlld0NvbmZpZywge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2V0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLmN1cnJlbnRWaWV3Q29uZmlnLnByb3BzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi52aWV3UHJvcHNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzdGF0ZUNoYW5nZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZXdzOiB1cGRhdGUodGhpcy5zdGF0ZS52aWV3cywge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt2aWV3SW5kZXhdOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZXQ6IG5ld1ZpZXdDb25maWdcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmN1cnJlbnRWaWV3Q29uZmlnLnNjZW5lUHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAuLi5PYmplY3QuYXNzaWduKHt9LCBzY2VuZVByb3BzKVxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoc3RhdGVDaGFuZ2UsICgpID0+IHJlc29sdmUodmlldykpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmhhc1ZpZXdJbkNvbmZpZyh2aWV3KSkge1xuICAgICAgICAgICAgICAgIC8vcHVzaCBmcmVzaCBjb25maWdcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3B1c2hWaWV3KHRoaXMuZ2V0RnJlc2hWaWV3Q29uZmlnKHZpZXcsIHZpZXdQcm9wcyksIHNjZW5lUHJvcHMpO1xuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaXNWYWxpZFZpZXdDb25maWcodmlldykpIHtcbiAgICAgICAgICAgIC8vcHVzaCBhbGxyZWFkeSBwcmVwYXJlZCBjb25maWdcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcHVzaFZpZXcoXG4gICAgICAgICAgICAgICAgT2JqZWN0LmFzc2lnbih7fSwgdmlldywge1xuICAgICAgICAgICAgICAgICAgICBwcm9wczogeyAuLi52aWV3LnByb3BzLCAuLi52aWV3UHJvcHMgfVxuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIHNjZW5lUHJvcHNcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoXCJJbnZhbGlkIGB2aWV3YCBhcmd1bWVudCBzcGVjaWZ5XCIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdmlldydzIG5hbWUgaXMgZGVzY3JpYmVkIGJ5IHNvbWUgY29uZmlnIGluIGB0aGlzLnZpZXdzQ29uZmlnYCBvYmplY3RcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEByZXR1cm5zIHtib29sZWFufVxuICAgICAqL1xuICAgIGhhc1ZpZXdJbkNvbmZpZyA9IChuYW1lOiBzdHJpbmcpOiBib29sZWFuID0+IG5hbWUgaW4gdGhpcy52aWV3c0NvbmZpZztcblxuICAgIC8qKlxuICAgICAqIENoZWNrIGlmIHZpZXcgcmVjb2duaXplIGJ5IG5hbWUgYXJndW1lbnQgaXMgcHJlc2VudCBpbiBzdGF0ZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzVmlld0luU3RhdGUgPSAobmFtZTogc3RyaW5nKTogYm9vbGVhbiA9PlxuICAgICAgICB0aGlzLnN0YXRlLnZpZXdzLmZpbmRJbmRleCh2aWV3ID0+IHZpZXcucHJvcHMubmFtZSA9PT0gbmFtZSkgIT09IC0xID8gdHJ1ZSA6IGZhbHNlO1xuXG4gICAgLyoqXG4gICAgICogVXRpbGl0eSBmdW5jdGlvbiB0byBoYW5kbGUgYmFjayBidXR0b24gY2xpY2tzLlxuICAgICAqIENhbiBiZSBvdmVyd3JpdHRlbiBieSBjbGFzcyBleHRlbmRpbmcgdGhpcyB3cmFwcGVyLlxuICAgICAqIEJ5IGRlZmF1bHQgaXQgcG9wcyBjdXJyZW50bHkgYWN0aXZlIHZpZXcuXG4gICAgICogVG8gdXNlIGl0LCBhc3NpZ24gaXQncyB2YWx1ZSB0byBzdGF0ZSBsaWtlIHRoaXM6XG4gICAgICogdGhpcy5zdGF0ZS5oYW5kbGVCYWNrQnV0dG9uID0gdGhpcy5oYW5kbGVCYWNrQnV0dG9uXG4gICAgICpcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gUmVzb2x2ZWQgb24gc3RhdGUgc3VjY2VzZnVsIGNoYW5nZSBvciByZWplY3Qgb24gZmFpbHVyZS5cbiAgICAgKi9cbiAgICBoYW5kbGVCYWNrQnV0dG9uID0gKFxuICAgICAgICB2aWV3UHJvcHM6IFZpZXdQcm9wcyB8IHt9ID0ge30sXG4gICAgICAgIHNjZW5lUHJvcHM6IFByb3BzIHwge30gPSB7fVxuICAgICk6IFByb21pc2U8c3RyaW5nIHwgdm9pZD4gPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS52aWV3cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wb3BWaWV3KHZpZXdQcm9wcywgc2NlbmVQcm9wcyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHNjZW5lJ3Mgc2lkZXBhbmVsIGJ5IHNldHRpbmcgaXQgcHJvcCBlbmFibGVkID0gZmFsc2UuXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IFJlc29sdmVkIG9uIHN0YXRlIHN1Y2Nlc2Z1bCBjaGFuZ2Ugb3IgcmVqZWN0IG9uIGZhaWx1cmUuXG4gICAgICovXG4gICAgZGlzYWJsZVNpZGVwYW5lbCA9ICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2lkZXBhbmVsICYmIHRoaXMucmVmQ09NUFNpZGVwYW5lbC5jdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJlZkNPTVBTaWRlcGFuZWwuY3VycmVudC5kaXNhYmxlKCk7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGVwYW5lbDogdXBkYXRlKHRoaXMuc3RhdGUuc2lkZXBhbmVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZW5hYmxlZDogeyAkc2V0OiBmYWxzZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS53YXJuKFwiW0FpcnJdIE5vIHNpZGVwYW5lbCB0byBkaXNhYmxlXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEVuYWJsZXMgc2NlbmUncyBzaWRlcGFuZWwgYnkgc2V0dGluZyBpdCBwcm9wIGVuYWJsZWQgPSB0cnVlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBSZXNvbHZlZCBvbiBzdGF0ZSBzdWNjZXNmdWwgY2hhbmdlIG9yIHJlamVjdCBvbiBmYWlsdXJlLlxuICAgICAqL1xuICAgIGVuYWJsZVNpZGVwYW5lbCA9ICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2lkZXBhbmVsICYmIHRoaXMucmVmQ09NUFNpZGVwYW5lbC5jdXJyZW50KSB7XG4gICAgICAgICAgICB0aGlzLnJlZkNPTVBTaWRlcGFuZWwuY3VycmVudC5lbmFibGUoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZXBhbmVsOiB1cGRhdGUodGhpcy5zdGF0ZS5zaWRlcGFuZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB7ICRzZXQ6IHRydWUgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUud2FybihcIltBaXJyXSBObyBzaWRlcGFuZWwgdG8gZW5hYmxlXCIpO1xuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNob3dzIHNpZGVwYW5lbFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIG9wZW5TaWRlcGFuZWwgPSAoKTogUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zaWRlcGFuZWwgJiYgdGhpcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICAgIHNpZGVwYW5lbDogdXBkYXRlKHRoaXMuc3RhdGUuc2lkZXBhbmVsLCB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiB7IGVuYWJsZWQ6IHsgJHNldDogdHJ1ZSB9IH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQuc2hvdygpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBIaWRlcyBzaWRlcGFuZWxcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBoaWRlU2lkZXBhbmVsID0gKCk6IFByb21pc2U8Ym9vbGVhbiB8IHZvaWQ+ID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2lkZXBhbmVsICYmIHRoaXMucmVmQ09NUFNpZGVwYW5lbC5jdXJyZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBZGQgbmV3IG1heWVyIHRvIHRoaXMuc3RhdGUubWF5ZXJzIGNvbmZpZ3VyYXRpb25zIGFycmF5LlxuICAgICAqIFRoaXMgd2lsbCBpbW1lZGlhdGVsbHkgb3BlbiBuZXcgbWF5ZXIgZHVlIHRvIGBjb21wb25lbnREaWRNb3VudGAgbGlmZWN5Y2xlIGltcGxlbWVudGF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBNYXllciBjb25maWcgb2JqZWN0LlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIG9wZW5NYXllcihjb25maWc6IE1heWVyUHJvcHMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUubWF5ZXJzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gY29uZmlnLm5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgY29uc29sZS53YXJuKFwiW0FpcnJdIFNjZW5lIGFsbHJlYWR5IGhhcyBNYXllciB3aXRoIHRoaXMgbmFtZTogXCIgKyBjb25maWcubmFtZSk7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vaWYgc2NlbmUgaGFzIHNpZGVwYW5lbCAtIGRpc2FibGUgaXRcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2lkZXBhbmVsICYmIHRoaXMuc3RhdGUuc2lkZXBhbmVsLnByb3BzLmVuYWJsZWQpIHtcbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZVNpZGVwYW5lbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9hZGQgc3BlY2lhbCBmdW5jdGlvbmFsaXR5LHByb3BzXG4gICAgICAgIGNvbnN0IHByZXBhcmVkQ29uZmlnID0gdGhpcy5fX3ByZXBhcmVNYXllckNvbmZpZyhjb25maWcpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLl9fYWRkTWF5ZXIocHJlcGFyZWRDb25maWcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENsb3NlIG1heWVyIGJ5IG5hbWVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lIFVuaXF1ZSBtYXllciBuYW1lXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgY2xvc2VNYXllcihuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgbGV0IG1heWVyQ29uZmlnSW5kZXggPSB0aGlzLnN0YXRlLm1heWVycy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtLm5hbWUgPT09IG5hbWUpO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAgIG1heWVyQ29uZmlnSW5kZXggIT09IC0xICYmXG4gICAgICAgICAgICAodGhpcy5yZWZzQ09NUE1heWVyc1tuYW1lXSAmJiB0aGlzLnJlZnNDT01QTWF5ZXJzW25hbWVdLmN1cnJlbnQpXG4gICAgICAgICkge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMucmVmc0NPTVBNYXllcnNbbmFtZV0uY3VycmVudC5hbmltYXRlT3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy9yZW5ldyBpbmRleCBiZWNhdXNlIGFmdGVyIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICAvL3RoaW5ncyBtaWdodCBoYXZlIGNoYW5nZWRcbiAgICAgICAgICAgICAgICAgICAgbWF5ZXJDb25maWdJbmRleCA9IHRoaXMuc3RhdGUubWF5ZXJzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy9sYXN0IGNoZWNrIGlmIHN0aWwgcHJlc2VudFxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBtYXllckNvbmZpZ0luZGV4ICE9PSAtMSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMucmVmc0NPTVBNYXllcnNbbmFtZV0gJiYgdGhpcy5yZWZzQ09NUE1heWVyc1tuYW1lXS5jdXJyZW50KVxuICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19yZW1vdmVNYXllcihuYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWxldGUgdGhpcy5yZWZzQ09NUE1heWVyc1tuYW1lXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnNpZGVwYW5lbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgaGFzTWF5ZXJMZWZ0ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGNoaWxkcmVuID0gWy4uLkFycmF5LmZyb20odGhpcy5yZWZET00uY3VycmVudC5jaGlsZHJlbildO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaGlsZHJlbi5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWlyci1tYXllclwiKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGhhc01heWVyTGVmdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghaGFzTWF5ZXJMZWZ0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmVuYWJsZVNpZGVwYW5lbCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNwZWNpYWwgbWV0aG9kIHRvIGJlIG92ZXJ3cml0dGVuIGluIGRlc2NlbmRhbnQgY2xhc3Nlcy5cbiAgICAgKiBDYWxsZWQsIGFzIG5hbWUgc3VnZXN0LCB3aGVuIHZpZXdzIGFuaW1hdGlvbiBmaW5pc2guXG4gICAgICovXG4gICAgdmlld3NBbmltYXRpb25FbmQob2xkVmlld05hbWU6IHN0cmluZywgbmV3Vmlld05hbWU6IHN0cmluZyk6IHZvaWQge31cblxuICAgIC8qKlxuICAgICAqIElmIGNvbmZpZyBoYXMgYnV0dG9ucyB0aGF0IGNvbnRhaW5zIGxvZ2ljYWwgdHJ1ZSBgY2xvc2VgIHByb3BlcnR5LFxuICAgICAqIHRoaXMgbWV0aG9kIHdpbGwgYXR0YWNoIGNsb3NlIG1heWVyIGZ1bmN0aW9uYWxpdHkgdG8gdGFwIGV2ZW50IG9uIHRoaXMgYnV0dG9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG1heWVyQ29uZmlnIG1heWVyIGNvbmZpZyBvYmplY3RcbiAgICAgKiBAcmV0dXJucyB7b2JqZWN0fVxuICAgICAqL1xuICAgIF9fcHJlcGFyZU1heWVyQ29uZmlnKG1heWVyQ29uZmlnOiBNYXllclByb3BzKTogTWF5ZXJQcm9wcyB7XG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IE9iamVjdC5hc3NpZ24oeyByZWY6IHVuZGVmaW5lZCB9LCBtYXllckNvbmZpZyk7XG5cbiAgICAgICAgY29uc3QgcmVmID0gUmVhY3QuY3JlYXRlUmVmPEFpcnJNYXllcj4oKTtcbiAgICAgICAgY29uZmlnLnJlZiA9IHJlZjtcbiAgICAgICAgdGhpcy5yZWZzQ09NUE1heWVyc1tjb25maWcubmFtZV0gPSByZWY7XG5cbiAgICAgICAgaWYgKGNvbmZpZy5idXR0b25zICYmIGNvbmZpZy5idXR0b25zLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uZmlnLmJ1dHRvbnMuZm9yRWFjaChcbiAgICAgICAgICAgICAgICAoaXRlbSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jbG9zZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGl0ZW0uaGFuZGxlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZEhhbmRsZXIgPSBpdGVtLmhhbmRsZXI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaXRlbS5oYW5kbGVyID0gKGUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkSGFuZGxlcihlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZU1heWVyKGNvbmZpZy5uYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhbmRsZXIgPSAoZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlTWF5ZXIoY29uZmlnLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLmF2YWlibGVIZWlnaHQgPSB0aGlzLnJlZkRPTS5jdXJyZW50LmNsaWVudEhlaWdodCB8fCB3aW5kb3cuaW5uZXJIZWlnaHQ7XG5cbiAgICAgICAgcmV0dXJuIGNvbmZpZztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIHV0aWxpdHkgZm9yIGFkZGluZyBtYXllcnNcbiAgICAgKiBAcGFyYW0ge29iamVjfSBjb25maWdcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBfX2FkZE1heWVyID0gKGNvbmZpZzogTWF5ZXJQcm9wcyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBjb25zdCBuZXdNYXllcnNEZWYgPSB1cGRhdGUodGhpcy5zdGF0ZS5tYXllcnMsIHsgJHB1c2g6IFtjb25maWddIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgIChyZXNvbHZlKTogdm9pZCA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heWVyczogbmV3TWF5ZXJzRGVmXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgdXRpbGl0eSBmb3IgcmVtb3ZpbmcgbWF5ZXJzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgTWF5ZXIgbmFtZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIF9fcmVtb3ZlTWF5ZXIgPSAobmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IG5ld01heWVyc0RlZiA9IHRoaXMuc3RhdGUubWF5ZXJzLmZpbHRlcihpdGVtID0+IHtcbiAgICAgICAgICAgIHJldHVybiBpdGVtLm5hbWUgIT09IG5hbWU7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgIChyZXNvbHZlKTogdm9pZCA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heWVyczogbmV3TWF5ZXJzRGVmXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIGJhY2sgYnV0dG9uIG1lYW5pbmcgaXQgd2lsbCBub3QgYmUgdmlzaWJsZSBpbiBuYXZiYXIgYW55bW9yZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBkaXNhYmxlQmFja0J1dHRvbiA9ICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gdGhpcy5zZXRTdGF0ZSh7IGJhY2tCdXR0b246IGZhbHNlIH0sIHJlc29sdmUpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBiYWNrIGJ1dHRvbiBtZWFuaW5nIGl0IHdpbGwgYmUgdmlzaWJsZSBpbiBuYXZiYXIuXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgZW5hYmxlQmFja0J1dHRvbiA9ICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4gdGhpcy5zZXRTdGF0ZSh7IGJhY2tCdXR0b246IHRydWUgfSwgcmVzb2x2ZSkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBY3Rpb24gZGlzcGF0Y2hlciBtZXRob2QuIFdpbGwgcmV0dXJuIGEgZnVuY3Rpb24gcmVhZHkgdG8gZmlyZSB2aWV3IGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7YXJyYXl9IHZpZXdzTmFtZXNUb1N0YXlMaXN0XG4gICAgICogQHJldHVybnMge2Z1bmN0aW9ufSBGdW5jdGlvbiB0aGF0IHdpbGwgcmVzb2x2ZSB2aWV3IGNoYW5nZSBvbiBpbnZva2UuXG4gICAgICovXG4gICAgZ29Ub1ZpZXcgPSAobmFtZTogc3RyaW5nLCB2aWV3c05hbWVzVG9TdGF5TGlzdDogc3RyaW5nW10gPSBbXSk6IEZ1bmN0aW9uID0+IHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIHBhcmFtczogVmlld1Byb3BzIHwge30gPSB7fSxcbiAgICAgICAgICAgIHNjZW5lUHJvcHM6IFByb3BzIHwge30gPSB7fVxuICAgICAgICApOiBQcm9taXNlPHN0cmluZyB8IHZvaWQ+ID0+IHtcbiAgICAgICAgICAgIHRoaXMudmlld3NOYW1lc1RvU3RheUxpc3QgPSB2aWV3c05hbWVzVG9TdGF5TGlzdDtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNoYW5nZVZpZXcobmFtZSwgcGFyYW1zLCBzY2VuZVByb3BzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgY29tcG9uZW50RGlkTW91bnQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgIChyZXNvbHZlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgXCJyZXNpemVcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5zaWRlcGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3VwZGF0ZVNpZGVwYW5lbFNpemVQcm9wcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LmNsaWVudEhlaWdodFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5zaWRlcGFuZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3VwZGF0ZVNpZGVwYW5lbFNpemVQcm9wcyhcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuY2xpZW50V2lkdGgsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTS5jdXJyZW50LmNsaWVudEhlaWdodFxuICAgICAgICAgICAgICAgICAgICApLnRoZW4ocmVzb2x2ZSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICAgICAqIENhbGwgZmlyc3QgYWN0aXZlIHZpZXcgbGlmZSBjeWNsZSBtZXRob2QgLSB2aWV3QWZ0ZXJBY3RpdmF0aW9uXG4gICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFjdGl2ZVZpZXdOYW1lICYmXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmc0NPTVBWaWV3c1t0aGlzLnN0YXRlLmFjdGl2ZVZpZXdOYW1lXSAmJlxuICAgICAgICAgICAgICAgICAgICB0eXBlb2YgdGhpcy5yZWZzQ09NUFZpZXdzW3RoaXMuc3RhdGUuYWN0aXZlVmlld05hbWVdLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIC52aWV3QWZ0ZXJBY3RpdmF0aW9uID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzQ09NUFZpZXdzW3RoaXMuc3RhdGUuYWN0aXZlVmlld05hbWVdLmN1cnJlbnQudmlld0FmdGVyQWN0aXZhdGlvbigpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIHV0aWxpdHkgZnVuY3Rpb24gZm9yIHVwZGF0aW5nIHNpZGVwYW5lbCdzIHNjZW5lV2lkdGgsc2NlbmVIZWlnaHQgcHJvcGVydGllc1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSB3aWR0aFxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBoZWlnaHRcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBfX3VwZGF0ZVNpZGVwYW5lbFNpemVQcm9wcyh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoXG4gICAgICAgICAgICAocmVzb2x2ZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNpZGVwYW5lbDogdXBkYXRlKHRoaXMuc3RhdGUuc2lkZXBhbmVsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2NlbmVXaWR0aDogeyAkc2V0OiB3aWR0aCB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZUhlaWdodDogeyAkc2V0OiBoZWlnaHQgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgdXRpbGl0eSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgc2lkZXBhbmVsIGlzU2hvd24gcHJvcFxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gaXNTaG93blxuICAgICAqIEByZXR1cm5zIHt2b2lkfVxuICAgICAqL1xuXG4gICAgX19zaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2sgPSAoaXNTaG93bjogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHNpZGVwYW5lbDogdXBkYXRlKHRoaXMuc3RhdGUuc2lkZXBhbmVsLCB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpc1Nob3duOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNldDogaXNTaG93blxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoKTogdm9pZCA9PlxuICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuc2lkZXBhbmVsVmlzaWJpbGl0eUNhbGxiYWNrICYmXG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2soaXNTaG93bilcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgcmVuZGVyKCk6IFJlYWN0Tm9kZSB7XG4gICAgICAgIGNvbnN0IHsgdmlld3MsIHNpZGVwYW5lbCwgY2xhc3NOYW1lLCAuLi5zdGF0ZVJlc3QgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxBaXJyU2NlbmVcbiAgICAgICAgICAgICAgICB7Li4ue1xuICAgICAgICAgICAgICAgICAgICAuLi5zdGF0ZVJlc3QsXG4gICAgICAgICAgICAgICAgICAgIHZpZXdzOiB2aWV3cyxcbiAgICAgICAgICAgICAgICAgICAgc2lkZXBhbmVsOiBzaWRlcGFuZWwsXG4gICAgICAgICAgICAgICAgICAgIHJlZkRPTUNvbnRhaW5lcjogdGhpcy5yZWZET01Db250YWluZXIsXG4gICAgICAgICAgICAgICAgICAgIHJlZkRPTU5hdmJhcjogdGhpcy5yZWZET01OYXZiYXIsXG4gICAgICAgICAgICAgICAgICAgIHJlZnNDT01QVmlld3M6IHRoaXMucmVmc0NPTVBWaWV3cyxcbiAgICAgICAgICAgICAgICAgICAgcmVmQ09NUFNpZGVwYW5lbDogdGhpcy5yZWZDT01QU2lkZXBhbmVsLFxuICAgICAgICAgICAgICAgICAgICBzaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2s6IHRoaXMuX19zaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2tcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIHsuLi50aGlzLmdldFZpZXdQcm9wcygpfVxuICAgICAgICAgICAgICAgIHsuLi57IGNsYXNzTmFtZSB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXNjcmliZXMgaWYgdmlld3MgYW5pbWF0aW9uIGlzIHRha2luZyBwbGFjZVxuICAgICAqL1xuICAgIHZpZXdDaGFuZ2VJblByb2dyZXNzID0gZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIHV0aWxpdHkgZnVuY3Rpb24gdGhhdCBjaGFuZ2VzIHZpZXdzIHdpdGggYW5pbWF0aW9uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3Vmlld05hbWVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBfX3BlcmZvcm1WaWV3c0FuaW1hdGlvbihuZXdWaWV3TmFtZTogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIGlmICh0eXBlb2YgbmV3Vmlld05hbWUgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIHRoaXMudmlld0NoYW5nZUluUHJvZ3Jlc3MgPSB0cnVlO1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChuZXdWaWV3TmFtZSA9PT0gdGhpcy5zdGF0ZS5hY3RpdmVWaWV3TmFtZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbQWlycl0gVGhpcyBWaWV3IGlzIGFscmVhZHkgYWN0aXZlLlwiKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q2hhbmdlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBHVUlEaXNhYmxlZDogdHJ1ZSwgbW9ja1RpdGxlTmFtZTogbmV3Vmlld05hbWUgfSwgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRWaWV3SW5kZXgobmV3Vmlld05hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkVmlld05hbWUgPSB0aGlzLnN0YXRlLmFjdGl2ZVZpZXdOYW1lO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbmV3Vmlld0NvbXAgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmc0NPTVBWaWV3c1tuZXdWaWV3TmFtZV0gJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNDT01QVmlld3NbbmV3Vmlld05hbWVdLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRWaWV3Q29tcCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzQ09NUFZpZXdzW29sZFZpZXdOYW1lXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmc0NPTVBWaWV3c1tvbGRWaWV3TmFtZV0uY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFuaW1FbmRDYWxsYmFjayA9ICgpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDaGFuZ2VJblByb2dyZXNzID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdDb21wICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBuZXdWaWV3Q29tcC52aWV3QWZ0ZXJBY3RpdmF0aW9uID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0NvbXAudmlld0FmdGVyQWN0aXZhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmlld0NvbXAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG9sZFZpZXdDb21wLnZpZXdBZnRlckRlYWN0aXZhdGlvbiA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZpZXdDb21wLnZpZXdBZnRlckRlYWN0aXZhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy52aWV3c0FuaW1hdGlvbkVuZCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld3NBbmltYXRpb25FbmQob2xkVmlld05hbWUsIG5ld1ZpZXdOYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAobmV3Vmlld0NvbXAgJiYgdHlwZW9mIG5ld1ZpZXdDb21wLnZpZXdCZWZvcmVBY3RpdmF0aW9uID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3Q29tcC52aWV3QmVmb3JlQWN0aXZhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmlld0NvbXAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2xkVmlld0NvbXAudmlld0JlZm9yZURlYWN0aXZhdGlvbiA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWaWV3Q29tcC52aWV3QmVmb3JlRGVhY3RpdmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmFuaW1hdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX19kb1ZpZXdzQW5pbWF0aW9uKG5ld1ZpZXdOYW1lLCBvbGRWaWV3TmFtZSkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVmlld05hbWU6IG5ld1ZpZXdOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdVSURpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2NrVGl0bGVOYW1lOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbUVuZENhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVZpZXdOYW1lOiBuZXdWaWV3TmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdVSURpc2FibGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tUaXRsZU5hbWU6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5pbUVuZENhbGxiYWNrXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NoYW5nZUluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIltBaXJyXSBWaWV3IHdpdGggbmFtZSBcIiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdOYW1lICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCIgaXMgbm90IHByZXNlbmNlIGluIHRoaXMgU2NlbmUuXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZWplY3QoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbQWlycl0gWW91IG11c3Qgc3BlY2lmeSB2aWV3IG5hbWUgcHJvcGVydHkgYXMgc3RyaW5nIHZhbHVlXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIHV0aWxpdHkgZnVuY3Rpb24uIFRoaXMgb25lIGFjdHVhbGx5IG1ha2VzIGNzcyBhbmltYXRpb25zLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5ld1ZpZXdOYW1lXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9sZFZpZXdOYW1lXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgX19kb1ZpZXdzQW5pbWF0aW9uKG5ld1ZpZXdOYW1lOiBzdHJpbmcsIG9sZFZpZXdOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1ZpZXdET00gPVxuICAgICAgICAgICAgICAgIHRoaXMucmVmc0NPTVBWaWV3c1tuZXdWaWV3TmFtZV0gJiZcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnNDT01QVmlld3NbbmV3Vmlld05hbWVdLmN1cnJlbnQgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnNDT01QVmlld3NbbmV3Vmlld05hbWVdLmN1cnJlbnQucmVmRE9NICYmXG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzQ09NUFZpZXdzW25ld1ZpZXdOYW1lXS5jdXJyZW50LnJlZkRPTS5jdXJyZW50O1xuICAgICAgICAgICAgY29uc3Qgb2xkVmlld0luZGV4ID0gdGhpcy5nZXRWaWV3SW5kZXgob2xkVmlld05hbWUpO1xuICAgICAgICAgICAgY29uc3QgbmV3Vmlld0luZGV4ID0gdGhpcy5nZXRWaWV3SW5kZXgobmV3Vmlld05hbWUpO1xuXG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSBuZXdWaWV3SW5kZXggPiBvbGRWaWV3SW5kZXggPyAxIDogLTE7XG5cbiAgICAgICAgICAgIGlmICghbmV3Vmlld0RPTSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIm5ldyB2aWV3IERPTSByZWZmZXJlbmNlIHdhcyBub3QgZm91bmRcIik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLm5hdmJhcikge1xuICAgICAgICAgICAgICAgIC8vcGVyZm9ybSBuYXZiYXIgYW5pbWF0aW9uc1xuICAgICAgICAgICAgICAgIGNvbnN0IHRpdGxlTm9kZSA9IHRoaXMucmVmRE9NTmF2YmFyLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcIi50aXRsZVwiKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2NrVGl0bGUgPSB0aGlzLnJlZkRPTU5hdmJhci5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICAgICAgICAgIFwiLm1vY2stdGl0bGVcIlxuICAgICAgICAgICAgICAgICkgYXMgSFRNTEVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgY29uc3QgbW9ja1RleHRTcGFuID0gbW9ja1RpdGxlICYmIG1vY2tUaXRsZS5jaGlsZHJlblswXTtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2NrVGV4dFNwYW5XaWR0aCA9IG1vY2tUZXh0U3BhbiA/IG1vY2tUZXh0U3Bhbi5jbGllbnRXaWR0aCA6IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodGl0bGVOb2RlKSB7XG4gICAgICAgICAgICAgICAgICAgIEFpcnJGWC5kb1RyYW5zaXRpb25BbmltYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICB0aXRsZU5vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHsodGl0bGVOb2RlLmNsaWVudFdpZHRoIC8gMiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tUZXh0U3BhbldpZHRoIC8gMikgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInB4XCJ9LDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7KHRpdGxlTm9kZS5jbGllbnRXaWR0aCAvIDIgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb2NrVGV4dFNwYW5XaWR0aCAvIDIpICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGlyZWN0aW9uICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJweFwifSwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBvcGFjaXR5ICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgdHJhbnNmb3JtICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWVcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAobW9ja1RpdGxlKSB7XG4gICAgICAgICAgICAgICAgICAgIEFpcnJGWC5kb1RyYW5zaXRpb25BbmltYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBtb2NrVGl0bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUzZCgwLDAsMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBvcGFjaXR5ICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgdHJhbnNmb3JtICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YFxuICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke21vY2tUZXh0U3BhbldpZHRoICogZGlyZWN0aW9uICogLTEgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInB4XCJ9LDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7bW9ja1RleHRTcGFuV2lkdGggKiBkaXJlY3Rpb24gKiAtMSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHhcIn0sMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWVcbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5iYWNrQnV0dG9uICYmICF0aGlzLnN0YXRlLmJhY2tCdXR0b25PbkZpcnN0Vmlldykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBiYWNrRE9NID0gdGhpcy5yZWZET01OYXZiYXIuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwiLmJhY2tcIikgYXMgSFRNTEVsZW1lbnQ7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFZpZXdJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9zaG93IGJhY2sgYnV0dG9uIHdpdGggYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICBBaXJyRlguZG9UcmFuc2l0aW9uQW5pbWF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tET00sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IFwidHJhbnNsYXRlM2QoMTAwJSwwLDApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogXCJ0cmFuc2xhdGUzZCgxMDAlLDAsMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgb3BhY2l0eSAke3RoaXMuc3RhdGUuYW5pbWF0aW9uVGltZX1tcyBlYXNlLW91dGAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB0cmFuc2Zvcm0gJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmtpdFRyYW5zZm9ybTogXCJ0cmFuc2xhdGUzZCgwLDAsMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiBiYWNrRE9NLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lXG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5ld1ZpZXdJbmRleCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy9oaWRlIGJhY2tidXR0b24gd2l0aCBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIEFpcnJGWC5kb1RyYW5zaXRpb25BbmltYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja0RPTSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmtpdFRyYW5zZm9ybTogXCJ0cmFuc2xhdGUzZCgwLDAsMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBvcGFjaXR5ICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHRyYW5zZm9ybSAke3RoaXMuc3RhdGUuYW5pbWF0aW9uVGltZX1tcyBlYXNlLW91dGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKC0xMDAlLDAsMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKC0xMDAlLDAsMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrRE9NLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tET00uc3R5bGUudHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja0RPTS5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5hbmltYXRpb24gPT09IFwic2xpZGVcIiAmJiBvbGRWaWV3TmFtZSkge1xuICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICBsZXQgc3RhcnRQcm9wczogQ1NTU3RyaW5nUHJvcGVydGllcyA9IHt9O1xuICAgICAgICAgICAgICAgIGxldCBlbmRQcm9wczogQ1NTU3RyaW5nUHJvcGVydGllcyA9IHt9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgc3RhcnRQcm9wcy53ZWJraXRUcmFuc2Zvcm0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUzZChcIiArIC0xICogdGhpcy5yZWZET00uY3VycmVudC5jbGllbnRXaWR0aCArIFwicHgsMCwwKVwiO1xuICAgICAgICAgICAgICAgICAgICBzdGFydFByb3BzLnRyYW5zZm9ybSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZTNkKFwiICsgLTEgKiB0aGlzLnJlZkRPTS5jdXJyZW50LmNsaWVudFdpZHRoICsgXCJweCwwLDApXCI7XG4gICAgICAgICAgICAgICAgICAgIGVuZFByb3BzLndlYmtpdFRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoMCwwLDApXCI7XG4gICAgICAgICAgICAgICAgICAgIGVuZFByb3BzLnRyYW5zZm9ybSA9IFwidHJhbnNsYXRlM2QoMCwwLDApXCI7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZW5kUHJvcHMud2Via2l0VHJhbnNmb3JtID1cbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlM2QoXCIgKyAtMSAqIHRoaXMucmVmRE9NLmN1cnJlbnQuY2xpZW50V2lkdGggKyBcInB4LDAsMClcIjtcbiAgICAgICAgICAgICAgICAgICAgZW5kUHJvcHMudHJhbnNmb3JtID1cbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlM2QoXCIgKyAtMSAqIHRoaXMucmVmRE9NLmN1cnJlbnQuY2xpZW50V2lkdGggKyBcInB4LDAsMClcIjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBBaXJyRlguZG9UcmFuc2l0aW9uQW5pbWF0aW9uKFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LFxuICAgICAgICAgICAgICAgICAgICBzdGFydFByb3BzLFxuICAgICAgICAgICAgICAgICAgICBbYHRyYW5zZm9ybSAke3RoaXMuc3RhdGUuYW5pbWF0aW9uVGltZX1tcyBlYXNlLW91dGBdLFxuICAgICAgICAgICAgICAgICAgICBlbmRQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lLFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01Db250YWluZXIuY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01Db250YWluZXIuY3VycmVudC5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01Db250YWluZXIuY3VycmVudC5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQ29udGFpbmVyLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LnN0eWxlLnRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01Db250YWluZXIuY3VycmVudC5zdHlsZS53ZWJraXRCYWNrZmFjZVZpc2liaWxpdHkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01Db250YWluZXIuY3VycmVudC5zdHlsZS5iYWNrZmFjZVZpc2liaWxpdHkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmFuaW1hdGlvbiA9PT0gXCJvdmVybGF5XCIgJiYgb2xkVmlld05hbWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIEFpcnJGWC5kb1RyYW5zaXRpb25BbmltYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7dGhpcy5yZWZET01Db250YWluZXIuY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xpZW50V2lkdGggKyBcInB4XCJ9LDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7dGhpcy5yZWZET01Db250YWluZXIuY3VycmVudC5jbGllbnRXaWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHhcIn0sMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXNwbGF5OiBcImJsb2NrXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYG9wYWNpdHkgJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB0cmFuc2Zvcm0gJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gKG5ld1ZpZXdET00uc3R5bGUuekluZGV4ID0gXCIxMDJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS56SW5kZXggPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLnRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zdGF0ZS5zdGFja01vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFZpZXdET00gPSB0aGlzLnJlZnNDT01QVmlld3Nbb2xkVmlld05hbWVdLmN1cnJlbnQucmVmRE9NLmN1cnJlbnQ7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLmRpc3BsYXkgPSBcImJsb2NrXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLm9wYWNpdHkgPSBcIjFcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgQWlyckZYLmRvVHJhbnNpdGlvbkFuaW1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWaWV3RE9NLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgb3BhY2l0eSAke3RoaXMuc3RhdGUuYW5pbWF0aW9uVGltZX1tcyBlYXNlLW91dGAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB0cmFuc2Zvcm0gJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsJHt0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xpZW50SGVpZ2h0IC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJweFwifSwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsJHt0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2xpZW50SGVpZ2h0IC9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDQgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJweFwifSwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmlld0RPTS5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmlld0RPTS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmlld0RPTS5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWaWV3RE9NLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZpZXdET00uc3R5bGUub3BhY2l0eSA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgQWlyckZYLmRvVHJhbnNpdGlvbkFuaW1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHstMSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LmNsaWVudFdpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHhcIn0sMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7LTEgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01Db250YWluZXIuY3VycmVudC5jbGllbnRXaWR0aCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInB4XCJ9LDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBvcGFjaXR5ICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHRyYW5zZm9ybSAke3RoaXMuc3RhdGUuYW5pbWF0aW9uVGltZX1tcyBlYXNlLW91dGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4gKG5ld1ZpZXdET00uc3R5bGUuekluZGV4ID0gXCIxMDJcIiksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS56SW5kZXggPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zdGF0ZS5hbmltYXRpb24gPT09IFwiZmFkZVwiIHx8ICFvbGRWaWV3TmFtZSkge1xuICAgICAgICAgICAgICAgIEFpcnJGWC5kb1RyYW5zaXRpb25BbmltYXRpb24oXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIixcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgW2BvcGFjaXR5ICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YF0sXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4gKG5ld1ZpZXdET00uc3R5bGUuekluZGV4ID0gXCIxMDJcIiksXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYW5pbWF0aW9uVGltZSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUuekluZGV4ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUudHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19