"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var React = _interopRequireWildcard(require("react"));

var _AirrFX = _interopRequireDefault(require("./AirrFX"));

var _AirrScene = _interopRequireWildcard(require("./AirrScene"));

var _AirrViewWrapper2 = _interopRequireDefault(require("./AirrViewWrapper"));

var _immutabilityHelper = _interopRequireDefault(require("immutability-helper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

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
              newviewdefinition = (0, _immutabilityHelper.default)(_this.state.views, {
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
            sidepanel: (0, _immutabilityHelper.default)(_this.state.sidepanel, {
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
            sidepanel: (0, _immutabilityHelper.default)(_this.state.sidepanel, {
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
          sidepanel: (0, _immutabilityHelper.default)(_this.state.sidepanel, {
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
      var newMayersDef = (0, _immutabilityHelper.default)(_this.state.mayers, {
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
        sidepanel: (0, _immutabilityHelper.default)(_this.state.sidepanel, {
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
        return (0, _immutabilityHelper.default)(this.viewsConfig[viewName], {
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
      var newviewdefinition = (0, _immutabilityHelper.default)(this.state.views, {
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
            views: (0, _immutabilityHelper.default)(_this4.state.views, {
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
            var newViewConfig = (0, _immutabilityHelper.default)(currentViewConfig, {
              props: {
                $set: _objectSpread({}, currentViewConfig.props, viewProps)
              }
            });

            var stateChange = _objectSpread({
              views: (0, _immutabilityHelper.default)(_this5.state.views, _defineProperty({}, viewIndex, {
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
          sidepanel: (0, _immutabilityHelper.default)(_this9.state.sidepanel, {
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

      return React.createElement(_AirrScene.default, _extends({}, _objectSpread({}, stateRest, {
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
            _AirrFX.default.doTransitionAnimation(titleNode, {
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
            _AirrFX.default.doTransitionAnimation(mockTitle, {
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
              _AirrFX.default.doTransitionAnimation(backDOM, {
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
              _AirrFX.default.doTransitionAnimation(backDOM, {
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

          _AirrFX.default.doTransitionAnimation(_this11.refDOMContainer.current, startProps, ["transform ".concat(_this11.state.animationTime, "ms ease-out")], endProps, null, _this11.state.animationTime, function () {
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
            _AirrFX.default.doTransitionAnimation(newViewDOM, {
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

              _AirrFX.default.doTransitionAnimation(oldViewDOM, {
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

              _AirrFX.default.doTransitionAnimation(newViewDOM, {
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
          _AirrFX.default.doTransitionAnimation(newViewDOM, {
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
}(_AirrViewWrapper2.default);

exports.default = AirrSceneWrapper;

_defineProperty(AirrSceneWrapper, "defaultProps", _objectSpread({}, _AirrScene.sceneDefaultProps, {
  stackMode: false
}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL2xpYi9BaXJyU2NlbmVXcmFwcGVyLnRzeCJdLCJuYW1lcyI6WyJBaXJyU2NlbmVXcmFwcGVyIiwicHJvcHMiLCJSZWFjdCIsImNyZWF0ZVJlZiIsImNvdmVyIiwiUHJvbWlzZSIsInJlc29sdmUiLCJzZXRTdGF0ZSIsIkdVSURpc2FibGVkIiwiR1VJRGlzYWJsZUNvdmVyIiwidmlld05hbWUiLCJzdGF0ZSIsInZpZXdzIiwiZmluZEluZGV4IiwidmlldyIsIm5hbWUiLCJ2aWV3UHJvcHMiLCJzY2VuZVByb3BzIiwibGVuZ3RoIiwiY2hhbmdlVmlldyIsIm5ld3ZpZXdkZWZpbml0aW9uIiwiJHNwbGljZSIsInJlZnNDT01QVmlld3MiLCJjb25zb2xlIiwid2FybiIsInZpZXdzQ29uZmlnIiwicG9wVmlldyIsInNpZGVwYW5lbCIsInJlZkNPTVBTaWRlcGFuZWwiLCJjdXJyZW50IiwiZGlzYWJsZSIsImVuYWJsZWQiLCIkc2V0IiwiZW5hYmxlIiwic2hvdyIsImhpZGUiLCJjb25maWciLCJuZXdNYXllcnNEZWYiLCJtYXllcnMiLCIkcHVzaCIsImZpbHRlciIsIml0ZW0iLCJiYWNrQnV0dG9uIiwidmlld3NOYW1lc1RvU3RheUxpc3QiLCJwYXJhbXMiLCJpc1Nob3duIiwic2lkZXBhbmVsVmlzaWJpbGl0eUNhbGxiYWNrIiwiYWN0aXZlIiwiY2xhc3NOYW1lIiwidGl0bGUiLCJuYXZiYXIiLCJuYXZiYXJIZWlnaHQiLCJuYXZiYXJNZW51IiwibmF2YmFyQ2xhc3MiLCJiYWNrQnV0dG9uT25GaXJzdFZpZXciLCJhY3RpdmVWaWV3TmFtZSIsImFuaW1hdGlvbiIsImNoaWxkcmVuIiwiYW5pbWF0aW9uVGltZSIsImhhbmRsZUJhY2tCZWhhdmlvdXJPbkZpcnN0VmlldyIsImhhbmRsZUJhY2tCdXR0b24iLCJzdGFja01vZGUiLCJPYmplY3QiLCJhc3NpZ24iLCJ2aWV3TmFtZUdlbmVyYXRvciIsIm5hbWVHZW5lcmF0b3IiLCJFcnJvciIsInZpZXdzTmFtZUxpc3QiLCJpbmRleE9mIiwic3RhdGVDaGFuZ2UiLCJvYmplY3QiLCJfX2NoYW5nZVZpZXciLCJfX3BlcmZvcm1WaWV3c0FuaW1hdGlvbiIsInJlamVjdCIsImluZGV4IiwiaGFzVmlld0luU3RhdGUiLCJ2aWV3SW5kZXgiLCJnZXRWaWV3SW5kZXgiLCJjdXJyZW50Vmlld0NvbmZpZyIsIm5ld1ZpZXdDb25maWciLCJoYXNWaWV3SW5Db25maWciLCJfX3B1c2hWaWV3IiwiZ2V0RnJlc2hWaWV3Q29uZmlnIiwiaXNWYWxpZFZpZXdDb25maWciLCJkaXNhYmxlU2lkZXBhbmVsIiwicHJlcGFyZWRDb25maWciLCJfX3ByZXBhcmVNYXllckNvbmZpZyIsIl9fYWRkTWF5ZXIiLCJtYXllckNvbmZpZ0luZGV4IiwicmVmc0NPTVBNYXllcnMiLCJhbmltYXRlT3V0IiwiX19yZW1vdmVNYXllciIsInRoZW4iLCJoYXNNYXllckxlZnQiLCJBcnJheSIsImZyb20iLCJyZWZET00iLCJmb3JFYWNoIiwiY2xhc3NMaXN0IiwiY29udGFpbnMiLCJlbmFibGVTaWRlcGFuZWwiLCJvbGRWaWV3TmFtZSIsIm5ld1ZpZXdOYW1lIiwibWF5ZXJDb25maWciLCJyZWYiLCJ1bmRlZmluZWQiLCJidXR0b25zIiwiY2xvc2UiLCJoYW5kbGVyIiwib2xkSGFuZGxlciIsImUiLCJjbG9zZU1heWVyIiwiYXZhaWJsZUhlaWdodCIsImNsaWVudEhlaWdodCIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwiYWRkRXZlbnRMaXN0ZW5lciIsIl9fdXBkYXRlU2lkZXBhbmVsU2l6ZVByb3BzIiwiY2xpZW50V2lkdGgiLCJ2aWV3QWZ0ZXJBY3RpdmF0aW9uIiwid2lkdGgiLCJoZWlnaHQiLCJzY2VuZVdpZHRoIiwic2NlbmVIZWlnaHQiLCJzdGF0ZVJlc3QiLCJyZWZET01Db250YWluZXIiLCJyZWZET01OYXZiYXIiLCJfX3NpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjayIsImdldFZpZXdQcm9wcyIsInZpZXdDaGFuZ2VJblByb2dyZXNzIiwibW9ja1RpdGxlTmFtZSIsIm5ld1ZpZXdDb21wIiwib2xkVmlld0NvbXAiLCJhbmltRW5kQ2FsbGJhY2siLCJ2aWV3QWZ0ZXJEZWFjdGl2YXRpb24iLCJ2aWV3c0FuaW1hdGlvbkVuZCIsInZpZXdCZWZvcmVBY3RpdmF0aW9uIiwidmlld0JlZm9yZURlYWN0aXZhdGlvbiIsIl9fZG9WaWV3c0FuaW1hdGlvbiIsIm5ld1ZpZXdET00iLCJvbGRWaWV3SW5kZXgiLCJuZXdWaWV3SW5kZXgiLCJkaXJlY3Rpb24iLCJ0aXRsZU5vZGUiLCJxdWVyeVNlbGVjdG9yIiwibW9ja1RpdGxlIiwibW9ja1RleHRTcGFuIiwibW9ja1RleHRTcGFuV2lkdGgiLCJBaXJyRlgiLCJkb1RyYW5zaXRpb25BbmltYXRpb24iLCJ3ZWJraXRUcmFuc2Zvcm0iLCJ0cmFuc2Zvcm0iLCJvcGFjaXR5IiwiYmFja0RPTSIsInJlbW92ZSIsInN0eWxlIiwiZGlzcGxheSIsInN0YXJ0UHJvcHMiLCJlbmRQcm9wcyIsIndlYmtpdFRyYW5zaXRpb24iLCJ0cmFuc2l0aW9uIiwid2Via2l0QmFja2ZhY2VWaXNpYmlsaXR5IiwiYmFja2ZhY2VWaXNpYmlsaXR5IiwiekluZGV4Iiwib2xkVmlld0RPTSIsIkFpcnJWaWV3V3JhcHBlciIsInNjZW5lRGVmYXVsdFByb3BzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBRUE7O0FBQ0E7O0FBRUE7O0FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQ3FCQSxnQjs7Ozs7QUFPakI7Ozs7Ozs7O0FBU0E7Ozs7QUFJQTs7OztBQUlBOzs7O0FBSUE7Ozs7QUFJQTs7OztBQUlBOzs7QUFLQSw0QkFBWUMsS0FBWixFQUEwQjtBQUFBOztBQUFBOztBQUN0QiwwRkFBTUEsS0FBTjs7QUFEc0I7O0FBQUE7O0FBQUEsb0VBdEJLLEVBc0JMOztBQUFBLHFFQWxCdUMsRUFrQnZDOztBQUFBLHVFQWRQQyxLQUFLLENBQUNDLFNBQU4sRUFjTzs7QUFBQSxzRUFWUkQsS0FB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IjtcbmltcG9ydCB7IFJlYWN0Tm9kZSwgUmVmT2JqZWN0IH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgQWlyckZYIGZyb20gXCIuL0FpcnJGWFwiO1xuaW1wb3J0IEFpcnJTY2VuZSwgeyBDb3JlU2NlbmVQcm9wcywgc2NlbmVEZWZhdWx0UHJvcHMgfSBmcm9tIFwiLi9BaXJyU2NlbmVcIjtcbmltcG9ydCBBaXJyU2lkZXBhbmVsIGZyb20gXCIuL0FpcnJTaWRlcGFuZWxcIjtcbmltcG9ydCBBaXJyVmlld1dyYXBwZXIgZnJvbSBcIi4vQWlyclZpZXdXcmFwcGVyXCI7XG5pbXBvcnQgeyBQcm9wcyBhcyBWaWV3UHJvcHMgfSBmcm9tIFwiLi9BaXJyVmlld1wiO1xuaW1wb3J0IEFpcnJNYXllciwgeyBQcmVwYXJlZFByb3BzIGFzIE1heWVyUHJvcHMgfSBmcm9tIFwiLi9BaXJyTWF5ZXJcIjtcbmltcG9ydCB1cGRhdGUgZnJvbSBcImltbXV0YWJpbGl0eS1oZWxwZXJcIjtcbmltcG9ydCB7IFZpZXdDb25maWcsIENTU1N0cmluZ1Byb3BlcnRpZXMgfSBmcm9tIFwiLi9haXJyLXJlYWN0XCI7XG5cbmludGVyZmFjZSBQcm9wcyBleHRlbmRzIENvcmVTY2VuZVByb3BzIHtcbiAgICAvKipcbiAgICAgKiBUaGlzIHByb3BldHkgY2hhbmdlcyBiZWhhdmlvdXIgb2Ygdmlld3MgYW5pbWF0aW9uIHdoZW4gb3ZlcmxheSBhbmltYXRpb24gaXMgc2V0XG4gICAgICovXG4gICAgc3RhY2tNb2RlOiBib29sZWFuO1xufVxuaW50ZXJmYWNlIFZpZXdzQ29uZmlnSXRlbSBleHRlbmRzIFZpZXdDb25maWcge1xuICAgIC8qKlxuICAgICAqIFByb3BzIHRvIG1vZGlmeSBTY2VuZVxuICAgICAqL1xuICAgIHNjZW5lUHJvcHM/OiBQcm9wcztcbiAgICAvKipcbiAgICAgKlxuICAgICAqIENvbW1vbiB2aWV3IGNvbmZpZ3V0YWlvbiBjYW4gaGF2ZSBuYW1lR2VuZXJhdG9yIGZ1bmN0aW9uIHVzZWQgdG8gY3JlYXRlIGFub3RoZXIgdmlldyBuYW1lIHByb3BwZXJ0eS5cbiAgICAgKiBHZXRzIGN1cnJlbnQgc3RhdGUgdmlld3MgbGlzdCBhcyBhcmd1bWVudC5cbiAgICAgKiBFeGFtcGxlOlxuICAgICAqIG5hbWVHZW5lcmF0b3I6IHZpZXdzID0+IHsgcmV0dXJuIFwiY29tbW9uLXZpZXctKlwiLnJlcGxhY2UoXCIqXCIsIHZpZXdzLmxlbmd0aCArIDEpO31cbiAgICAgKi9cbiAgICBuYW1lR2VuZXJhdG9yPyh2aWV3czogUHJvcHNbXCJ2aWV3c1wiXSk6IHN0cmluZztcbn1cbmludGVyZmFjZSBWaWV3c0NvbmZpZyB7XG4gICAgLyoqXG4gICAgICogU2ltcGxlIHZpZXcgY29uZmlndXJhaW9uIHdoaWNoIGNhbiBiZSBmb3VuZCBieSBrZXkgd2hpY2ggaXMgYWxzbyBpdCdzIG5hbWUuXG4gICAgICovXG4gICAgW25hbWU6IHN0cmluZ106IFZpZXdzQ29uZmlnSXRlbTtcbn1cbmludGVyZmFjZSBSZWZzQ09NUFZpZXdzIHtcbiAgICBbdmlld25hbWU6IHN0cmluZ106IFJlZk9iamVjdDxBaXJyVmlld1dyYXBwZXI+O1xufVxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWlyclNjZW5lV3JhcHBlciBleHRlbmRzIEFpcnJWaWV3V3JhcHBlciB7XG4gICAgc3RhdGljIGRlZmF1bHRQcm9wczogUHJvcHMgPSB7XG4gICAgICAgIC4uLnNjZW5lRGVmYXVsdFByb3BzLFxuICAgICAgICBzdGFja01vZGU6IGZhbHNlXG4gICAgfTtcblxuICAgIHN0YXRlOiBQcm9wcztcbiAgICAvKipcbiAgICAgKiBPYmplY3QgdGhhdCBrZWVwIGluZm9ybWF0aW9uIGFib3V0IHZpZXdzIGNvbmZpZ3VyYWlvbiBvYmplY3RzLlxuICAgICAqIEV2ZXJ5IGtleSBpbiB0aGlzIG9iamVjdCBkZXNjcmliZXMgYW5vdGhlciB2aWV3LlxuICAgICAqIFRoYXQgY29uZmlndXJhdGlvbiBsYXRlciB3aWxsIGJlIHVzZWQgdG8gY3JlYXRlIG5ldyB2aWV3IGFuZCBhZGQgaXQgdG8gc3RhdGUgdmlld3MgYXJyYXkuXG4gICAgICogVXNlZCBieSA6OmdldEZyZXNoVmlld0NvbmZpZyB0byBkZWxpdmVyIG5ldyB2aWV3IGNvbmZpZy5cbiAgICAgKiBUaGlzIGFwcHJvYWNoIGlzIG1haW5seSB1c2VkIGluIGNydWNpYWwgY29tcG9uZW50cydzIDo6Y2hhbmdlVmlldyBtZXRob2QuXG4gICAgICovXG4gICAgdmlld3NDb25maWc6IFZpZXdzQ29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogSW5zdGFudGlhdGVkIHZpZXdzIENvbXBvbmVudCdzIHJlZmZlcmVuY2VzXG4gICAgICovXG4gICAgcmVmc0NPTVBWaWV3czogUmVmc0NPTVBWaWV3cyA9IHt9O1xuICAgIC8qKlxuICAgICAqIEluc3RhbnRpYXRlZCBtYXllcnMgQ29tcG9uZW50cyByZWZmZXJlbmNlc1xuICAgICAqL1xuICAgIHJlZnNDT01QTWF5ZXJzOiB7IFtjb25maWdOYW1lOiBzdHJpbmddOiBSZWZPYmplY3Q8QWlyck1heWVyPiB9ID0ge307XG4gICAgLyoqXG4gICAgICogSW5zdGFudGlhdGVkIHNpZGVwYW5lbCBDb21wb25lbnQgcmVmZmVyZW5jZVxuICAgICAqL1xuICAgIHJlZkNPTVBTaWRlcGFuZWwgPSBSZWFjdC5jcmVhdGVSZWY8QWlyclNpZGVwYW5lbD4oKTtcbiAgICAvKipcbiAgICAgKiBSZWZmZXJlbmNlIHRvIERPTSBlbGVtZW50IG9mIGNvbnRhaW5lcidzIGRpdiAoZmlyc3QgY2hpbGQgb2YgbW9zdCBvdXRlciBlbGVtZW50KVxuICAgICAqL1xuICAgIHJlZkRPTUNvbnRhaW5lciA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcbiAgICAvKipcbiAgICAgKiBSZWZmZXJlbmNlIHRvIERPTSBlbGVtZW50IG9mIG5hdmJhcidzIGRpdlxuICAgICAqL1xuICAgIHJlZkRPTU5hdmJhciA9IFJlYWN0LmNyZWF0ZVJlZjxIVE1MRGl2RWxlbWVudD4oKTtcbiAgICAvKipcbiAgICAgKiBIZWxwZXIgdmFyaWFibGUgZm9yIHN0b3Jpbmcgdmlld3MgbmFtZXMgdGhhdCB3aWxsIGJlIGZpbHRlcmVkXG4gICAgICovXG4gICAgdmlld3NOYW1lc1RvU3RheUxpc3Q6IHN0cmluZ1tdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICAgICAgc3VwZXIocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICAgICAgICBuYW1lOiBwcm9wcy5uYW1lLFxuICAgICAgICAgICAgYWN0aXZlOiBwcm9wcy5hY3RpdmUsXG4gICAgICAgICAgICBjbGFzc05hbWU6IHByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgICAgIHRpdGxlOiBwcm9wcy50aXRsZSxcbiAgICAgICAgICAgIG5hdmJhcjogcHJvcHMubmF2YmFyLFxuICAgICAgICAgICAgbmF2YmFySGVpZ2h0OiBwcm9wcy5uYXZiYXJIZWlnaHQsXG4gICAgICAgICAgICBuYXZiYXJNZW51OiBwcm9wcy5uYXZiYXJNZW51LFxuICAgICAgICAgICAgbmF2YmFyQ2xhc3M6IHByb3BzLm5hdmJhckNsYXNzLFxuICAgICAgICAgICAgYmFja0J1dHRvbjogcHJvcHMuYmFja0J1dHRvbixcbiAgICAgICAgICAgIGJhY2tCdXR0b25PbkZpcnN0VmlldzogcHJvcHMuYmFja0J1dHRvbk9uRmlyc3RWaWV3LFxuICAgICAgICAgICAgYWN0aXZlVmlld05hbWU6IHByb3BzLmFjdGl2ZVZpZXdOYW1lLFxuICAgICAgICAgICAgYW5pbWF0aW9uOiBwcm9wcy5hbmltYXRpb24sXG4gICAgICAgICAgICB2aWV3czogcHJvcHMudmlld3MsXG4gICAgICAgICAgICBzaWRlcGFuZWw6IHByb3BzLnNpZGVwYW5lbCxcbiAgICAgICAgICAgIHNpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjazogcHJvcHMuc2lkZXBhbmVsVmlzaWJpbGl0eUNhbGxiYWNrLFxuICAgICAgICAgICAgR1VJRGlzYWJsZWQ6IHByb3BzLkdVSURpc2FibGVkLFxuICAgICAgICAgICAgR1VJRGlzYWJsZUNvdmVyOiBwcm9wcy5HVUlEaXNhYmxlQ292ZXIsXG4gICAgICAgICAgICBtYXllcnM6IHByb3BzLm1heWVycyxcbiAgICAgICAgICAgIGNoaWxkcmVuOiBwcm9wcy5jaGlsZHJlbixcbiAgICAgICAgICAgIGFuaW1hdGlvblRpbWU6IHByb3BzLmFuaW1hdGlvblRpbWUsXG4gICAgICAgICAgICBoYW5kbGVCYWNrQmVoYXZpb3VyT25GaXJzdFZpZXc6IHByb3BzLmhhbmRsZUJhY2tCZWhhdmlvdXJPbkZpcnN0VmlldyxcbiAgICAgICAgICAgIGhhbmRsZUJhY2tCdXR0b246IHByb3BzLmhhbmRsZUJhY2tCdXR0b24sXG4gICAgICAgICAgICBzdGFja01vZGU6IHByb3BzLnN0YWNrTW9kZVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgbmV3IHZpZXcgY29uZmlnIGJhc2Ugb24gY29uZmlndXJhdGlvbiBpbiBgdmlld3NDb25maWdgIHZhcmlhYmxlLlxuICAgICAqIFdoZW4gYHZpZXdOYW1lR2VuZXJhdG9yYCBpbiBwcmVzZW50IGJhc2UgY29uZmlndXJhdGlvbiBpdCB3aWxsIHVzZSB0byBjcmVhdGUgbmV3IHZpZXcgbmFtZSBwcm9wZXJ0eS5cbiAgICAgKiBUaGlzIGZlYXR1cmUgaXMgaGFuZHkgd2hlbiB5b3Ugd2FudCB0byBlYXNseSBjcmVhdGUgbmV4dCB2aWV3cyBiYXNlZCB1cG9uIGdlbmVyaWMgdmlldyBjb25maWd1cmF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHZpZXdOYW1lIE5hbWUgb2YgdGhlIGNvbmZpZ3VyYWlvbiBrZXkgaW4gYHRoaXMudmlld3NDb25maWdgIG9iamVjdFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBwcm9wcyBBZGRpdGlvbmFsIHByb3AgdG8gYmUgbWVyZ2VkIHdpdGggYmFzZSBjb25maWdcbiAgICAgKi9cbiAgICBnZXRGcmVzaFZpZXdDb25maWcodmlld05hbWU6IHN0cmluZywgcHJvcHM6IFZpZXdQcm9wcyB8IHt9ID0ge30pOiBWaWV3c0NvbmZpZ0l0ZW0ge1xuICAgICAgICBpZiAodmlld05hbWUgaW4gdGhpcy52aWV3c0NvbmZpZykge1xuICAgICAgICAgICAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7fSwgdGhpcy52aWV3c0NvbmZpZ1t2aWV3TmFtZV0pO1xuICAgICAgICAgICAgY29uc3Qgdmlld05hbWVHZW5lcmF0b3IgPSB0aGlzLnZpZXdzQ29uZmlnW3ZpZXdOYW1lXS5uYW1lR2VuZXJhdG9yO1xuXG4gICAgICAgICAgICByZXR1cm4gdXBkYXRlKHRoaXMudmlld3NDb25maWdbdmlld05hbWVdLCB7XG4gICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgJHNldDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uT2JqZWN0LmFzc2lnbih7fSwgY29uZmlnLnByb3BzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLk9iamVjdC5hc3NpZ24oe30sIHByb3BzKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWU6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmlld05hbWVHZW5lcmF0b3IgJiYgdHlwZW9mIHZpZXdOYW1lR2VuZXJhdG9yID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyB2aWV3TmFtZUdlbmVyYXRvcih0aGlzLnN0YXRlLnZpZXdzKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IHZpZXdOYW1lXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgUGFzc2VkIHZpZXcgbmFtZSAnJHt2aWV3TmFtZX0nIGlzIG5vdCBwcmVzZW50IGluIHZpZXdzQ29uZmlnLmApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB2aWV3cyB0aGF0IGFyZSBub3QgY29udGFpbmVkIGJ5IG5hbWUgaW4gYXJyYXlcbiAgICAgKiBAcGFyYW0ge2FycmF5fSB2aWV3c05hbWVMaXN0IExpc3Qgb2Ygdmlld3MgbmFtZXMgdGhhdCB3aWxsIHN0YXkgaW4gc3RhdGVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gV2lsbCBiZSByZXNvbHZlZCBvbiBzdWNjZXNmdWwgc3RhdGUgdXBkYXRlXG4gICAgICovXG4gICAgZmlsdGVyVmlld3Modmlld3NOYW1lTGlzdDogc3RyaW5nW10gPSBbXSk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdmlld3M6IHRoaXMuc3RhdGUudmlld3MuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlldyA9PiB2aWV3c05hbWVMaXN0LmluZGV4T2Yodmlldy5wcm9wcy5uYW1lKSAhPT0gLTFcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcmVzb2x2ZVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgc2NlbmUncyBHVUkgYnkgcHJvdmluZGluZyBleHRyYSBsYXllciBvbiB0b3Agb2YgZXZlcnl0aGluZyBlbHNlLlxuICAgICAqIFRoaXMgbGF5ZXIgY2FuIGJlIGN1c3RvbWl6ZSBieSBgY292ZXJgIGFyZ3VtZW50LlxuICAgICAqIEBwYXJhbSB7UmVhY3ROb2RlfSBjb3ZlciBSZWFjdCBlbGVtZW50IHRvIGJlIHBsYWNlZCBpbiBjb3ZlcmluZyBsYXllclxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSAgV2lsbCBiZSByZXNvbHZlZCBvbiBzdWNjZXNmdWwgc3RhdGUgdXBkYXRlXG4gICAgICovXG4gICAgZGlzYWJsZUdVSSA9IChjb3ZlcjogUmVhY3ROb2RlID0gbnVsbCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PlxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEdVSURpc2FibGVkOiB0cnVlLCBHVUlEaXNhYmxlQ292ZXI6IGNvdmVyIH0sIHJlc29sdmUpXG4gICAgICAgICk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIERpc2FibGVzIGxheWVyIGNvdmVyaW5nIHNjZW5lIGFuZCBlbmFibGUgdXNlciBpbnRlcmFjdGlvbnMuXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IFdpbGwgYmUgcmVzb2x2ZWQgb24gc3VjY2VzZnVsIHN0YXRlIHVwZGF0ZVxuICAgICAqL1xuICAgIGVuYWJsZUdVSSA9ICgpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT5cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBHVUlEaXNhYmxlZDogZmFsc2UsIEdVSURpc2FibGVDb3ZlcjogbnVsbCB9LCByZXNvbHZlKVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdmlldyBpbmRleCBpbiB2aWV3cyBhcnJheVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB2aWV3TmFtZVxuICAgICAqIEByZXR1cm5zIHtudW1iZXJ9XG4gICAgICovXG4gICAgZ2V0Vmlld0luZGV4ID0gKHZpZXdOYW1lOiBzdHJpbmcpOiBudW1iZXIgPT5cbiAgICAgICAgdGhpcy5zdGF0ZS52aWV3cy5maW5kSW5kZXgodmlldyA9PiB2aWV3LnByb3BzLm5hbWUgPT09IHZpZXdOYW1lKTtcblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgbWV0aG9kIGZvciBwdXNoaW5nIG5ldyB2aWV3IGNvbmZpZyBpbnRvIHRoaXMuc3RhdGUudmlld3MgYXJyYXlcbiAgICAgKiBAcGFyYW0ge1ZpZXdzQ29uZmlnSXRlbX0gY29uZmlnXG4gICAgICogQHBhcmFtIHtQcm9wc30gc2NlbmVQcm9wc1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSAgV2lsbCBiZSByZXNvbHZlZCBvbiBzdWNjZXNmdWwgc3RhdGUgdXBkYXRlXG4gICAgICovXG4gICAgX19wdXNoVmlldyhjb25maWc6IFZpZXdzQ29uZmlnSXRlbSwgc2NlbmVQcm9wczogUHJvcHMgfCB7fSA9IHt9KTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICAgICAgY29uc3QgbmV3dmlld2RlZmluaXRpb24gPSB1cGRhdGUodGhpcy5zdGF0ZS52aWV3cywgeyAkcHVzaDogW2NvbmZpZ10gfSk7XG4gICAgICAgIGNvbnN0IHN0YXRlQ2hhbmdlID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB2aWV3czogbmV3dmlld2RlZmluaXRpb25cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBjb25maWcuc2NlbmVQcm9wcyB8fCB7fSksXG4gICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCBzY2VuZVByb3BzIHx8IHt9KVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHRoaXMuc2V0U3RhdGUoc3RhdGVDaGFuZ2UsICgpID0+IHJlc29sdmUoY29uZmlnLnByb3BzLm5hbWUpKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUG9wcyBvdXQgd2l0aCBhbmltYXRpb24gY3VycmVudGx5IGFjdGl2ZSB2aWV3IGZyb20gdmlldydzIGFycmF5XG4gICAgICogQHBhcmFtIHtvYmplY3R9IHZpZXdQcm9wcyBwcm9wcyB0byBtb2RpZnkgdGhlIHZpZXcganVzdCBiZWZvcmUgcG9wcGluZ1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzY2VuZVByb3BzIHByb3BzIHRvIG1vZGlmeSB0aGUgc2NlbmUgd2hpbGUgcG9wcGluZ1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSAgV2lsbCBiZSByZXNvbHZlZCBvbiBzdWNjZXNmdWwgc3RhdGUgdXBkYXRlIG9yIHJlamVjdGVkIHdoZW4gbm8gdmlldyB0byBwb3BcbiAgICAgKi9cbiAgICBwb3BWaWV3ID0gYXN5bmMgKFxuICAgICAgICB2aWV3UHJvcHM6IFZpZXdQcm9wcyB8IHt9ID0ge30sXG4gICAgICAgIHNjZW5lUHJvcHM6IFByb3BzIHwge30gPSB7fVxuICAgICk6IFByb21pc2U8c3RyaW5nIHwgdm9pZD4gPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS52aWV3cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgICBjb25zdCB2aWV3TmFtZSA9IHRoaXMuc3RhdGUudmlld3NbdGhpcy5zdGF0ZS52aWV3cy5sZW5ndGggLSAyXS5wcm9wcy5uYW1lO1xuXG4gICAgICAgICAgICBhd2FpdCB0aGlzLmNoYW5nZVZpZXcodmlld05hbWUsIHZpZXdQcm9wcywgc2NlbmVQcm9wcyk7XG4gICAgICAgICAgICBjb25zdCBuZXd2aWV3ZGVmaW5pdGlvbiA9IHVwZGF0ZSh0aGlzLnN0YXRlLnZpZXdzLCB7XG4gICAgICAgICAgICAgICAgJHNwbGljZTogW1t0aGlzLnN0YXRlLnZpZXdzLmxlbmd0aCAtIDEsIDFdXVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5yZWZzQ09NUFZpZXdzW3RoaXMuc3RhdGUudmlld3NbdGhpcy5zdGF0ZS52aWV3cy5sZW5ndGggLSAxXS5wcm9wcy5uYW1lXTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZpZXdzOiBuZXd2aWV3ZGVmaW5pdGlvbiB9LCAoKSA9PiByZXNvbHZlKHZpZXdOYW1lKSlcbiAgICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbQWlycl0gTm8gdmlldyB0byBwb3AuXCIpO1xuICAgICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrIHdoZXRlciBvYmplY3QgaXMgdmFsaWQgdmlldyBjb25maWcgYW5kIGNhbiBiZSBhZGRlZCB0byB2aWV3J3MgYXJyYXlcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gb2JqZWN0XG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaXNWYWxpZFZpZXdDb25maWcob2JqZWN0OiBWaWV3Q29uZmlnKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICB0eXBlb2Ygb2JqZWN0ID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBcInR5cGVcIiBpbiBvYmplY3QgJiZcbiAgICAgICAgICAgIHR5cGVvZiBvYmplY3QucHJvcHMgPT09IFwib2JqZWN0XCIgJiZcbiAgICAgICAgICAgIFwibmFtZVwiIGluIG9iamVjdC5wcm9wc1xuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENydWNpYWwgbWV0aG9kIG9mIHRoZSBzY2VuZSBjb21wb25lbnQgZm9yIG1hbmlwYWx1dGFpbmcgdmlld3MgYW5kIHNjZW5lIHByb3BlcnRpZXMgYW5kIHBlcmZvcm1pbmcgYW5pbWF0aW9ucy5cbiAgICAgKiBDYW4gY2hhbmdlIGFjdGl2ZSB2aWV3IHdpdGggYW5pbWF0aW9uIG9yIGp1c3QgdXBkYXRlIHZpZXcgYW5kIHNjZW5lIHByb3BlcnRpZXMuXG4gICAgICpcbiAgICAgKiBDaGFuZ2UgdmlldyBieTpcbiAgICAgKiAtIHN0cmluZyBuYW1lIGtlcHQgaW4gc3RhdGUgdmlld3MgYXJyYXkgd2hpY2ggd2lsbCBsZWFkIHRvIHZpZXcgY2hhbmdlICh3aXRoIGFuaW1hdGlvbikgb3IganVzdCB1cGRhdGUgaWYgY3VycmVudGx5IGFjdGl2ZVxuICAgICAqIC0gc3RyaW5nIG5hbWUga2VwdCBpbiBgdGhpcy52aWV3c0NvbmZpZ2Agd2hpY2ggd2lsbCBsZWFkIHRvIHZpZXcgcHVzaCAod2l0aCBhbmltYXRpb24pXG4gICAgICogLSBuZXcgdmlldyBjb25maWcgd2ljaCB3aWxsIGxlYWQgdG8gdmlldyBjaGFuZ2VcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfG9iamVjdH0gdmlldyBWaWV3IG5hbWUgdG8gY2hhbmdlIG9yIHZpZXcgY29uZmlnIHRvIGJlIGFkZGVkXG4gICAgICogQHBhcmFtIHtvYmplY3R9IHZpZXdQcm9wcyBFeHRyYSBwcm9wcyB0byBiZSBhZGRlZCB0byBjaGFuZ2luZyB2aWV3XG4gICAgICogQHBhcmFtIHtvYmplY3R9IHNjZW5lUHJvcHMgRXh0cmEgcHJvcHMgdG8gbWFuaXB1bGF0ZSB0aGlzIHNjZW5lIHdoaWxlIGNoYW5naW5nIHZpZXdcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gUmVzb2x2ZWQgb24gc3RhdGUgc3VjY2VzZnVsIGNoYW5nZSBhbmQgYW5pbWF0aW9uIGVuZC4gT3IgcmVqZWN0IG9uIGZhaWx1cmUuXG4gICAgICovXG4gICAgYXN5bmMgY2hhbmdlVmlldyhcbiAgICAgICAgdmlldzogc3RyaW5nIHwgVmlld0NvbmZpZyxcbiAgICAgICAgdmlld1Byb3BzOiBWaWV3UHJvcHMgfCB7fSA9IHt9LFxuICAgICAgICBzY2VuZVByb3BzOiBQcm9wcyB8IHt9ID0ge31cbiAgICApOiBQcm9taXNlPHN0cmluZyB8IHZvaWQ+IHtcbiAgICAgICAgY29uc3Qgdmlld05hbWUgPSBhd2FpdCB0aGlzLl9fY2hhbmdlVmlldyh2aWV3LCB2aWV3UHJvcHMsIHNjZW5lUHJvcHMpO1xuICAgICAgICByZXR1cm4gdGhpcy5fX3BlcmZvcm1WaWV3c0FuaW1hdGlvbih2aWV3TmFtZSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB2aWV3IGZyb20gdmlld3MgYXJyYXlcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZVxuICAgICAqL1xuICAgIGRlc3Ryb3lWaWV3KG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLnN0YXRlLnZpZXdzLmZpbmRJbmRleCh2aWV3ID0+IHZpZXcucHJvcHMubmFtZSA9PT0gbmFtZSk7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2aWV3czogdXBkYXRlKHRoaXMuc3RhdGUudmlld3MsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc3BsaWNlOiBbW2luZGV4LCAxXV1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZWplY3QoYFZpZXcgd2l0aCBuYW1lOiAke25hbWV9IHdhcyBub3QgZm91bmQgaW4gdGhpcyBzY2VuZS5gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTWFrZSBtb2RpZmljYXRpb24gdG8gc2NlbmUncyB2aWV3cyBieSBwdXNoaW5nIG5ldywgdXBkYXRpbmcgY3VycmVudCBvciBjaGFuZ2luZyBiZXR3ZWVuIGFkZGVkIHZpZXdzXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xvYmplY3R9IHZpZXcgVmlldyBuYW1lIHRvIGNoYW5nZSBvciB2aWV3IGNvbmZpZyB0byBiZSBhZGRlZFxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSB2aWV3UHJvcHMgRXh0cmEgcHJvcHMgdG8gYmUgYWRkZWQgdG8gY2hhbmdpbmcgdmlld1xuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBzY2VuZVByb3BzIEV4dHJhIHByb3BzIHRvIG1hbmlwdWxhdGUgdGhpcyBzY2VuZSB3aGlsZSBjaGFuZ2luZyB2aWV3XG4gICAgICogQHJldHVybnMge1Byb21pc2V9IFJlc29sdmVkIG9uIHN0YXRlIHN1Y2Nlc2Z1bCBjaGFuZ2UgYW5kIGFuaW1hdGlvbiBlbmQuIE9yIHJlamVjdCBvbiBmYWlsdXJlLlxuICAgICAqL1xuICAgIF9fY2hhbmdlVmlldyhcbiAgICAgICAgdmlldzogc3RyaW5nIHwgVmlld0NvbmZpZyxcbiAgICAgICAgdmlld1Byb3BzOiBWaWV3UHJvcHMgfCB7fSA9IHt9LFxuICAgICAgICBzY2VuZVByb3BzOiBQcm9wcyB8IHt9ID0ge31cbiAgICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgICBpZiAodHlwZW9mIHZpZXcgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc1ZpZXdJblN0YXRlKHZpZXcpKSB7XG4gICAgICAgICAgICAgICAgLy9pZiBhbHJlYWR5IGluIHN0YXRlIHRoZW4gdXBkYXRlIGl0cyBwcm9wc1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgdmlld0luZGV4ID0gdGhpcy5nZXRWaWV3SW5kZXgodmlldyk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWaWV3Q29uZmlnID0gT2JqZWN0LmFzc2lnbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHsgc2NlbmVQcm9wczoge30gfSwgLy9mb3IgYSBkZWZhdWx0IHByb3BzIHdoaWNoIHdpbGwgYmUgbGF0dGVyIHVzZWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUudmlld3Nbdmlld0luZGV4XVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWaWV3Q29uZmlnID0gdXBkYXRlKGN1cnJlbnRWaWV3Q29uZmlnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICRzZXQ6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLi4uY3VycmVudFZpZXdDb25maWcucHJvcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC4uLnZpZXdQcm9wc1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHN0YXRlQ2hhbmdlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmlld3M6IHVwZGF0ZSh0aGlzLnN0YXRlLnZpZXdzLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3ZpZXdJbmRleF06IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHNldDogbmV3Vmlld0NvbmZpZ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uY3VycmVudFZpZXdDb25maWcuc2NlbmVQcm9wcyxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLk9iamVjdC5hc3NpZ24oe30sIHNjZW5lUHJvcHMpXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShzdGF0ZUNoYW5nZSwgKCkgPT4gcmVzb2x2ZSh2aWV3KSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuaGFzVmlld0luQ29uZmlnKHZpZXcpKSB7XG4gICAgICAgICAgICAgICAgLy9wdXNoIGZyZXNoIGNvbmZpZ1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcHVzaFZpZXcodGhpcy5nZXRGcmVzaFZpZXdDb25maWcodmlldywgdmlld1Byb3BzKSwgc2NlbmVQcm9wcyk7XG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIFByb21pc2UucmVqZWN0KCk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1ZhbGlkVmlld0NvbmZpZyh2aWV3KSkge1xuICAgICAgICAgICAgLy9wdXNoIGFsbHJlYWR5IHByZXBhcmVkIGNvbmZpZ1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wdXNoVmlldyhcbiAgICAgICAgICAgICAgICBPYmplY3QuYXNzaWduKHt9LCB2aWV3LCB7XG4gICAgICAgICAgICAgICAgICAgIHByb3BzOiB7IC4uLnZpZXcucHJvcHMsIC4uLnZpZXdQcm9wcyB9XG4gICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgc2NlbmVQcm9wc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdChcIkludmFsaWQgYHZpZXdgIGFyZ3VtZW50IHNwZWNpZnlcIik7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBDaGVjayBpZiB2aWV3J3MgbmFtZSBpcyBkZXNjcmliZWQgYnkgc29tZSBjb25maWcgaW4gYHRoaXMudmlld3NDb25maWdgIG9iamVjdFxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHJldHVybnMge2Jvb2xlYW59XG4gICAgICovXG4gICAgaGFzVmlld0luQ29uZmlnID0gKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4gPT4gbmFtZSBpbiB0aGlzLnZpZXdzQ29uZmlnO1xuXG4gICAgLyoqXG4gICAgICogQ2hlY2sgaWYgdmlldyByZWNvZ25pemUgYnkgbmFtZSBhcmd1bWVudCBpcyBwcmVzZW50IGluIHN0YXRlXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcbiAgICAgKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAgICAgKi9cbiAgICBoYXNWaWV3SW5TdGF0ZSA9IChuYW1lOiBzdHJpbmcpOiBib29sZWFuID0+XG4gICAgICAgIHRoaXMuc3RhdGUudmlld3MuZmluZEluZGV4KHZpZXcgPT4gdmlldy5wcm9wcy5uYW1lID09PSBuYW1lKSAhPT0gLTEgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAvKipcbiAgICAgKiBVdGlsaXR5IGZ1bmN0aW9uIHRvIGhhbmRsZSBiYWNrIGJ1dHRvbiBjbGlja3MuXG4gICAgICogQ2FuIGJlIG92ZXJ3cml0dGVuIGJ5IGNsYXNzIGV4dGVuZGluZyB0aGlzIHdyYXBwZXIuXG4gICAgICogQnkgZGVmYXVsdCBpdCBwb3BzIGN1cnJlbnRseSBhY3RpdmUgdmlldy5cbiAgICAgKiBUbyB1c2UgaXQsIGFzc2lnbiBpdCdzIHZhbHVlIHRvIHN0YXRlIGxpa2UgdGhpczpcbiAgICAgKiB0aGlzLnN0YXRlLmhhbmRsZUJhY2tCdXR0b24gPSB0aGlzLmhhbmRsZUJhY2tCdXR0b25cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfSBSZXNvbHZlZCBvbiBzdGF0ZSBzdWNjZXNmdWwgY2hhbmdlIG9yIHJlamVjdCBvbiBmYWlsdXJlLlxuICAgICAqL1xuICAgIGhhbmRsZUJhY2tCdXR0b24gPSAoXG4gICAgICAgIHZpZXdQcm9wczogVmlld1Byb3BzIHwge30gPSB7fSxcbiAgICAgICAgc2NlbmVQcm9wczogUHJvcHMgfCB7fSA9IHt9XG4gICAgKTogUHJvbWlzZTxzdHJpbmcgfCB2b2lkPiA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnZpZXdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnBvcFZpZXcodmlld1Byb3BzLCBzY2VuZVByb3BzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgc2NlbmUncyBzaWRlcGFuZWwgYnkgc2V0dGluZyBpdCBwcm9wIGVuYWJsZWQgPSBmYWxzZS5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX0gUmVzb2x2ZWQgb24gc3RhdGUgc3VjY2VzZnVsIGNoYW5nZSBvciByZWplY3Qgb24gZmFpbHVyZS5cbiAgICAgKi9cbiAgICBkaXNhYmxlU2lkZXBhbmVsID0gKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zaWRlcGFuZWwgJiYgdGhpcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVmQ09NUFNpZGVwYW5lbC5jdXJyZW50LmRpc2FibGUoKTtcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZXBhbmVsOiB1cGRhdGUodGhpcy5zdGF0ZS5zaWRlcGFuZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbmFibGVkOiB7ICRzZXQ6IGZhbHNlIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZXNvbHZlXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLndhcm4oXCJbQWlycl0gTm8gc2lkZXBhbmVsIHRvIGRpc2FibGVcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRW5hYmxlcyBzY2VuZSdzIHNpZGVwYW5lbCBieSBzZXR0aW5nIGl0IHByb3AgZW5hYmxlZCA9IHRydWUuXG4gICAgICogQHJldHVybnMge1Byb21pc2V9IFJlc29sdmVkIG9uIHN0YXRlIHN1Y2Nlc2Z1bCBjaGFuZ2Ugb3IgcmVqZWN0IG9uIGZhaWx1cmUuXG4gICAgICovXG4gICAgZW5hYmxlU2lkZXBhbmVsID0gKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zaWRlcGFuZWwgJiYgdGhpcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVmQ09NUFNpZGVwYW5lbC5jdXJyZW50LmVuYWJsZSgpO1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT5cbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXRlKFxuICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzaWRlcGFuZWw6IHVwZGF0ZSh0aGlzLnN0YXRlLnNpZGVwYW5lbCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVuYWJsZWQ6IHsgJHNldDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS53YXJuKFwiW0FpcnJdIE5vIHNpZGVwYW5lbCB0byBlbmFibGVcIik7XG4gICAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogU2hvd3Mgc2lkZXBhbmVsXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgb3BlblNpZGVwYW5lbCA9ICgpOiBQcm9taXNlPGJvb2xlYW4gfCB2b2lkPiA9PiB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLnNpZGVwYW5lbCAmJiB0aGlzLnJlZkNPTVBTaWRlcGFuZWwuY3VycmVudCkge1xuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgICAgc2lkZXBhbmVsOiB1cGRhdGUodGhpcy5zdGF0ZS5zaWRlcGFuZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHsgZW5hYmxlZDogeyAkc2V0OiB0cnVlIH0gfVxuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZkNPTVBTaWRlcGFuZWwuY3VycmVudC5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEhpZGVzIHNpZGVwYW5lbFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGhpZGVTaWRlcGFuZWwgPSAoKTogUHJvbWlzZTxib29sZWFuIHwgdm9pZD4gPT4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zaWRlcGFuZWwgJiYgdGhpcy5yZWZDT01QU2lkZXBhbmVsLmN1cnJlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlZkNPTVBTaWRlcGFuZWwuY3VycmVudC5oaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFkZCBuZXcgbWF5ZXIgdG8gdGhpcy5zdGF0ZS5tYXllcnMgY29uZmlndXJhdGlvbnMgYXJyYXkuXG4gICAgICogVGhpcyB3aWxsIGltbWVkaWF0ZWxseSBvcGVuIG5ldyBtYXllciBkdWUgdG8gYGNvbXBvbmVudERpZE1vdW50YCBsaWZlY3ljbGUgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gY29uZmlnIE1heWVyIGNvbmZpZyBvYmplY3QuXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgb3Blbk1heWVyKGNvbmZpZzogTWF5ZXJQcm9wcyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5tYXllcnMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5uYW1lID09PSBjb25maWcubmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oXCJbQWlycl0gU2NlbmUgYWxscmVhZHkgaGFzIE1heWVyIHdpdGggdGhpcyBuYW1lOiBcIiArIGNvbmZpZy5uYW1lKTtcbiAgICAgICAgICAgIHJldHVybiBQcm9taXNlLnJlamVjdCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9pZiBzY2VuZSBoYXMgc2lkZXBhbmVsIC0gZGlzYWJsZSBpdFxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5zaWRlcGFuZWwgJiYgdGhpcy5zdGF0ZS5zaWRlcGFuZWwucHJvcHMuZW5hYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kaXNhYmxlU2lkZXBhbmVsKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2FkZCBzcGVjaWFsIGZ1bmN0aW9uYWxpdHkscHJvcHNcbiAgICAgICAgY29uc3QgcHJlcGFyZWRDb25maWcgPSB0aGlzLl9fcHJlcGFyZU1heWVyQ29uZmlnKGNvbmZpZyk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuX19hZGRNYXllcihwcmVwYXJlZENvbmZpZyk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ2xvc2UgbWF5ZXIgYnkgbmFtZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgVW5pcXVlIG1heWVyIG5hbWVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBjbG9zZU1heWVyKG5hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICBsZXQgbWF5ZXJDb25maWdJbmRleCA9IHRoaXMuc3RhdGUubWF5ZXJzLmZpbmRJbmRleChpdGVtID0+IGl0ZW0ubmFtZSA9PT0gbmFtZSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICAgbWF5ZXJDb25maWdJbmRleCAhPT0gLTEgJiZcbiAgICAgICAgICAgICh0aGlzLnJlZnNDT01QTWF5ZXJzW25hbWVdICYmIHRoaXMucmVmc0NPTVBNYXllcnNbbmFtZV0uY3VycmVudClcbiAgICAgICAgKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzQ09NUE1heWVyc1tuYW1lXS5jdXJyZW50LmFuaW1hdGVPdXQoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvL3JlbmV3IGluZGV4IGJlY2F1c2UgYWZ0ZXIgYW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICAgIC8vdGhpbmdzIG1pZ2h0IGhhdmUgY2hhbmdlZFxuICAgICAgICAgICAgICAgICAgICBtYXllckNvbmZpZ0luZGV4ID0gdGhpcy5zdGF0ZS5tYXllcnMuZmluZEluZGV4KGl0ZW0gPT4gaXRlbS5uYW1lID09PSBuYW1lKTtcblxuICAgICAgICAgICAgICAgICAgICAvL2xhc3QgY2hlY2sgaWYgc3RpbCBwcmVzZW50XG4gICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heWVyQ29uZmlnSW5kZXggIT09IC0xICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAodGhpcy5yZWZzQ09NUE1heWVyc1tuYW1lXSAmJiB0aGlzLnJlZnNDT01QTWF5ZXJzW25hbWVdLmN1cnJlbnQpXG4gICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX3JlbW92ZU1heWVyKG5hbWUpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJlZnNDT01QTWF5ZXJzW25hbWVdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuc2lkZXBhbmVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBoYXNNYXllckxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgY2hpbGRyZW4gPSBbLi4uQXJyYXkuZnJvbSh0aGlzLnJlZkRPTS5jdXJyZW50LmNoaWxkcmVuKV07XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoaWxkcmVuLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5jbGFzc0xpc3QuY29udGFpbnMoXCJhaXJyLW1heWVyXCIpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaGFzTWF5ZXJMZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFoYXNNYXllckxlZnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5hYmxlU2lkZXBhbmVsKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogU3BlY2lhbCBtZXRob2QgdG8gYmUgb3ZlcndyaXR0ZW4gaW4gZGVzY2VuZGFudCBjbGFzc2VzLlxuICAgICAqIENhbGxlZCwgYXMgbmFtZSBzdWdlc3QsIHdoZW4gdmlld3MgYW5pbWF0aW9uIGZpbmlzaC5cbiAgICAgKi9cbiAgICB2aWV3c0FuaW1hdGlvbkVuZChvbGRWaWV3TmFtZTogc3RyaW5nLCBuZXdWaWV3TmFtZTogc3RyaW5nKTogdm9pZCB7fVxuXG4gICAgLyoqXG4gICAgICogSWYgY29uZmlnIGhhcyBidXR0b25zIHRoYXQgY29udGFpbnMgbG9naWNhbCB0cnVlIGBjbG9zZWAgcHJvcGVydHksXG4gICAgICogdGhpcyBtZXRob2Qgd2lsbCBhdHRhY2ggY2xvc2UgbWF5ZXIgZnVuY3Rpb25hbGl0eSB0byB0YXAgZXZlbnQgb24gdGhpcyBidXR0b24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gbWF5ZXJDb25maWcgbWF5ZXIgY29uZmlnIG9iamVjdFxuICAgICAqIEByZXR1cm5zIHtvYmplY3R9XG4gICAgICovXG4gICAgX19wcmVwYXJlTWF5ZXJDb25maWcobWF5ZXJDb25maWc6IE1heWVyUHJvcHMpOiBNYXllclByb3BzIHtcbiAgICAgICAgY29uc3QgY29uZmlnID0gT2JqZWN0LmFzc2lnbih7IHJlZjogdW5kZWZpbmVkIH0sIG1heWVyQ29uZmlnKTtcblxuICAgICAgICBjb25zdCByZWYgPSBSZWFjdC5jcmVhdGVSZWY8QWlyck1heWVyPigpO1xuICAgICAgICBjb25maWcucmVmID0gcmVmO1xuICAgICAgICB0aGlzLnJlZnNDT01QTWF5ZXJzW2NvbmZpZy5uYW1lXSA9IHJlZjtcblxuICAgICAgICBpZiAoY29uZmlnLmJ1dHRvbnMgJiYgY29uZmlnLmJ1dHRvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25maWcuYnV0dG9ucy5mb3JFYWNoKFxuICAgICAgICAgICAgICAgIChpdGVtKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpdGVtLmNsb3NlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXRlbS5oYW5kbGVyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkSGFuZGxlciA9IGl0ZW0uaGFuZGxlcjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpdGVtLmhhbmRsZXIgPSAoZSk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRIYW5kbGVyKGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlTWF5ZXIoY29uZmlnLm5hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZW0uaGFuZGxlciA9IChlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VNYXllcihjb25maWcubmFtZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25maWcuYXZhaWJsZUhlaWdodCA9IHRoaXMucmVmRE9NLmN1cnJlbnQuY2xpZW50SGVpZ2h0IHx8IHdpbmRvdy5pbm5lckhlaWdodDtcblxuICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgdXRpbGl0eSBmb3IgYWRkaW5nIG1heWVyc1xuICAgICAqIEBwYXJhbSB7b2JqZWN9IGNvbmZpZ1xuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIF9fYWRkTWF5ZXIgPSAoY29uZmlnOiBNYXllclByb3BzKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICAgIGNvbnN0IG5ld01heWVyc0RlZiA9IHVwZGF0ZSh0aGlzLnN0YXRlLm1heWVycywgeyAkcHVzaDogW2NvbmZpZ10gfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgKHJlc29sdmUpOiB2b2lkID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF5ZXJzOiBuZXdNYXllcnNEZWZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUHJpdmF0ZSB1dGlsaXR5IGZvciByZW1vdmluZyBtYXllcnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmFtZSBNYXllciBuYW1lXG4gICAgICogQHJldHVybnMge1Byb21pc2V9XG4gICAgICovXG4gICAgX19yZW1vdmVNYXllciA9IChuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgICAgY29uc3QgbmV3TWF5ZXJzRGVmID0gdGhpcy5zdGF0ZS5tYXllcnMuZmlsdGVyKGl0ZW0gPT4ge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW0ubmFtZSAhPT0gbmFtZTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgKHJlc29sdmUpOiB2b2lkID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF5ZXJzOiBuZXdNYXllcnNEZWZcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGlzYWJsZXMgYmFjayBidXR0b24gbWVhbmluZyBpdCB3aWxsIG5vdCBiZSB2aXNpYmxlIGluIG5hdmJhciBhbnltb3JlLlxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIGRpc2FibGVCYWNrQnV0dG9uID0gKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0aGlzLnNldFN0YXRlKHsgYmFja0J1dHRvbjogZmFsc2UgfSwgcmVzb2x2ZSkpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGVzIGJhY2sgYnV0dG9uIG1lYW5pbmcgaXQgd2lsbCBiZSB2aXNpYmxlIGluIG5hdmJhci5cbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBlbmFibGVCYWNrQnV0dG9uID0gKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiB0aGlzLnNldFN0YXRlKHsgYmFja0J1dHRvbjogdHJ1ZSB9LCByZXNvbHZlKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEFjdGlvbiBkaXNwYXRjaGVyIG1ldGhvZC4gV2lsbCByZXR1cm4gYSBmdW5jdGlvbiByZWFkeSB0byBmaXJlIHZpZXcgY2hhbmdlLlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHthcnJheX0gdmlld3NOYW1lc1RvU3RheUxpc3RcbiAgICAgKiBAcmV0dXJucyB7ZnVuY3Rpb259IEZ1bmN0aW9uIHRoYXQgd2lsbCByZXNvbHZlIHZpZXcgY2hhbmdlIG9uIGludm9rZS5cbiAgICAgKi9cbiAgICBnb1RvVmlldyA9IChuYW1lOiBzdHJpbmcsIHZpZXdzTmFtZXNUb1N0YXlMaXN0OiBzdHJpbmdbXSA9IFtdKTogRnVuY3Rpb24gPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgcGFyYW1zOiBWaWV3UHJvcHMgfCB7fSA9IHt9LFxuICAgICAgICAgICAgc2NlbmVQcm9wczogUHJvcHMgfCB7fSA9IHt9XG4gICAgICAgICk6IFByb21pc2U8c3RyaW5nIHwgdm9pZD4gPT4ge1xuICAgICAgICAgICAgdGhpcy52aWV3c05hbWVzVG9TdGF5TGlzdCA9IHZpZXdzTmFtZXNUb1N0YXlMaXN0O1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2hhbmdlVmlldyhuYW1lLCBwYXJhbXMsIHNjZW5lUHJvcHMpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICBjb21wb25lbnREaWRNb3VudCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKFxuICAgICAgICAgICAgKHJlc29sdmUpOiB2b2lkID0+IHtcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgICAgICAgICAgICAgICBcInJlc2l6ZVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnNpZGVwYW5lbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdXBkYXRlU2lkZXBhbmVsU2l6ZVByb3BzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET00uY3VycmVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnNpZGVwYW5lbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9fdXBkYXRlU2lkZXBhbmVsU2l6ZVByb3BzKFxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET00uY3VycmVudC5jbGllbnRXaWR0aCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NLmN1cnJlbnQuY2xpZW50SGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICkudGhlbihyZXNvbHZlKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQ2FsbCBmaXJzdCBhY3RpdmUgdmlldyBsaWZlIGN5Y2xlIG1ldGhvZCAtIHZpZXdBZnRlckFjdGl2YXRpb25cbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYWN0aXZlVmlld05hbWUgJiZcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzQ09NUFZpZXdzW3RoaXMuc3RhdGUuYWN0aXZlVmlld05hbWVdICYmXG4gICAgICAgICAgICAgICAgICAgIHR5cGVvZiB0aGlzLnJlZnNDT01QVmlld3NbdGhpcy5zdGF0ZS5hY3RpdmVWaWV3TmFtZV0uY3VycmVudFxuICAgICAgICAgICAgICAgICAgICAgICAgLnZpZXdBZnRlckFjdGl2YXRpb24gPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNDT01QVmlld3NbdGhpcy5zdGF0ZS5hY3RpdmVWaWV3TmFtZV0uY3VycmVudC52aWV3QWZ0ZXJBY3RpdmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgdXRpbGl0eSBmdW5jdGlvbiBmb3IgdXBkYXRpbmcgc2lkZXBhbmVsJ3Mgc2NlbmVXaWR0aCxzY2VuZUhlaWdodCBwcm9wZXJ0aWVzXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IHdpZHRoXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IGhlaWdodFxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIF9fdXBkYXRlU2lkZXBhbmVsU2l6ZVByb3BzKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZShcbiAgICAgICAgICAgIChyZXNvbHZlKTogdm9pZCA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lkZXBhbmVsOiB1cGRhdGUodGhpcy5zdGF0ZS5zaWRlcGFuZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY2VuZVdpZHRoOiB7ICRzZXQ6IHdpZHRoIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjZW5lSGVpZ2h0OiB7ICRzZXQ6IGhlaWdodCB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJpdmF0ZSB1dGlsaXR5IGZ1bmN0aW9uIGZvciB1cGRhdGluZyBzaWRlcGFuZWwgaXNTaG93biBwcm9wXG4gICAgICogQHBhcmFtIHtib29sZWFufSBpc1Nob3duXG4gICAgICogQHJldHVybnMge3ZvaWR9XG4gICAgICovXG5cbiAgICBfX3NpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjayA9IChpc1Nob3duOiBib29sZWFuKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgc2lkZXBhbmVsOiB1cGRhdGUodGhpcy5zdGF0ZS5zaWRlcGFuZWwsIHtcbiAgICAgICAgICAgICAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlzU2hvd246IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkc2V0OiBpc1Nob3duXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICgpOiB2b2lkID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5zaWRlcGFuZWxWaXNpYmlsaXR5Q2FsbGJhY2sgJiZcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLnNpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjayhpc1Nob3duKVxuICAgICAgICApO1xuICAgIH07XG5cbiAgICByZW5kZXIoKTogUmVhY3ROb2RlIHtcbiAgICAgICAgY29uc3QgeyB2aWV3cywgc2lkZXBhbmVsLCBjbGFzc05hbWUsIC4uLnN0YXRlUmVzdCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPEFpcnJTY2VuZVxuICAgICAgICAgICAgICAgIHsuLi57XG4gICAgICAgICAgICAgICAgICAgIC4uLnN0YXRlUmVzdCxcbiAgICAgICAgICAgICAgICAgICAgdmlld3M6IHZpZXdzLFxuICAgICAgICAgICAgICAgICAgICBzaWRlcGFuZWw6IHNpZGVwYW5lbCxcbiAgICAgICAgICAgICAgICAgICAgcmVmRE9NQ29udGFpbmVyOiB0aGlzLnJlZkRPTUNvbnRhaW5lcixcbiAgICAgICAgICAgICAgICAgICAgcmVmRE9NTmF2YmFyOiB0aGlzLnJlZkRPTU5hdmJhcixcbiAgICAgICAgICAgICAgICAgICAgcmVmc0NPTVBWaWV3czogdGhpcy5yZWZzQ09NUFZpZXdzLFxuICAgICAgICAgICAgICAgICAgICByZWZDT01QU2lkZXBhbmVsOiB0aGlzLnJlZkNPTVBTaWRlcGFuZWwsXG4gICAgICAgICAgICAgICAgICAgIHNpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFjazogdGhpcy5fX3NpZGVwYW5lbFZpc2liaWxpdHlDYWxsYmFja1xuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgey4uLnRoaXMuZ2V0Vmlld1Byb3BzKCl9XG4gICAgICAgICAgICAgICAgey4uLnsgY2xhc3NOYW1lIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERlc2NyaWJlcyBpZiB2aWV3cyBhbmltYXRpb24gaXMgdGFraW5nIHBsYWNlXG4gICAgICovXG4gICAgdmlld0NoYW5nZUluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgdXRpbGl0eSBmdW5jdGlvbiB0aGF0IGNoYW5nZXMgdmlld3Mgd2l0aCBhbmltYXRpb25cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBuZXdWaWV3TmFtZVxuICAgICAqIEByZXR1cm5zIHtQcm9taXNlfVxuICAgICAqL1xuICAgIF9fcGVyZm9ybVZpZXdzQW5pbWF0aW9uKG5ld1ZpZXdOYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBuZXdWaWV3TmFtZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICAgICAgdGhpcy52aWV3Q2hhbmdlSW5Qcm9ncmVzcyA9IHRydWU7XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKG5ld1ZpZXdOYW1lID09PSB0aGlzLnN0YXRlLmFjdGl2ZVZpZXdOYW1lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltBaXJyXSBUaGlzIFZpZXcgaXMgYWxyZWFkeSBhY3RpdmUuXCIpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZpZXdDaGFuZ2VJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IEdVSURpc2FibGVkOiB0cnVlLCBtb2NrVGl0bGVOYW1lOiBuZXdWaWV3TmFtZSB9LCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFZpZXdJbmRleChuZXdWaWV3TmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRWaWV3TmFtZSA9IHRoaXMuc3RhdGUuYWN0aXZlVmlld05hbWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBuZXdWaWV3Q29tcCA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzQ09NUFZpZXdzW25ld1ZpZXdOYW1lXSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmc0NPTVBWaWV3c1tuZXdWaWV3TmFtZV0uY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFZpZXdDb21wID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZnNDT01QVmlld3Nbb2xkVmlld05hbWVdICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZzQ09NUFZpZXdzW29sZFZpZXdOYW1lXS5jdXJyZW50O1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5pbUVuZENhbGxiYWNrID0gKCk6IHZvaWQgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmlld0NoYW5nZUluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0NvbXAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHlwZW9mIG5ld1ZpZXdDb21wLnZpZXdBZnRlckFjdGl2YXRpb24gPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3Q29tcC52aWV3QWZ0ZXJBY3RpdmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWaWV3Q29tcCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlb2Ygb2xkVmlld0NvbXAudmlld0FmdGVyRGVhY3RpdmF0aW9uID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmlld0NvbXAudmlld0FmdGVyRGVhY3RpdmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLnZpZXdzQW5pbWF0aW9uRW5kID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3c0FuaW1hdGlvbkVuZChvbGRWaWV3TmFtZSwgbmV3Vmlld05hbWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChuZXdWaWV3Q29tcCAmJiB0eXBlb2YgbmV3Vmlld0NvbXAudmlld0JlZm9yZUFjdGl2YXRpb24gPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdDb21wLnZpZXdCZWZvcmVBY3RpdmF0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWaWV3Q29tcCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVvZiBvbGRWaWV3Q29tcC52aWV3QmVmb3JlRGVhY3RpdmF0aW9uID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZpZXdDb21wLnZpZXdCZWZvcmVEZWFjdGl2YXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUuYW5pbWF0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fX2RvVmlld3NBbmltYXRpb24obmV3Vmlld05hbWUsIG9sZFZpZXdOYW1lKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVWaWV3TmFtZTogbmV3Vmlld05hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR1VJRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tUaXRsZU5hbWU6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltRW5kQ2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVmlld05hbWU6IG5ld1ZpZXdOYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgR1VJRGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ja1RpdGxlTmFtZTogbnVsbFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbmltRW5kQ2FsbGJhY2tcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52aWV3Q2hhbmdlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwiW0FpcnJdIFZpZXcgd2l0aCBuYW1lIFwiICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld05hbWUgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcIiBpcyBub3QgcHJlc2VuY2UgaW4gdGhpcyBTY2VuZS5cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJlamVjdCgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUud2FybihcIltBaXJyXSBZb3UgbXVzdCBzcGVjaWZ5IHZpZXcgbmFtZSBwcm9wZXJ0eSBhcyBzdHJpbmcgdmFsdWVcIik7XG4gICAgICAgICAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByaXZhdGUgdXRpbGl0eSBmdW5jdGlvbi4gVGhpcyBvbmUgYWN0dWFsbHkgbWFrZXMgY3NzIGFuaW1hdGlvbnMuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbmV3Vmlld05hbWVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb2xkVmlld05hbWVcbiAgICAgKiBAcmV0dXJucyB7UHJvbWlzZX1cbiAgICAgKi9cbiAgICBfX2RvVmlld3NBbmltYXRpb24obmV3Vmlld05hbWU6IHN0cmluZywgb2xkVmlld05hbWU6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3Vmlld0RPTSA9XG4gICAgICAgICAgICAgICAgdGhpcy5yZWZzQ09NUFZpZXdzW25ld1ZpZXdOYW1lXSAmJlxuICAgICAgICAgICAgICAgIHRoaXMucmVmc0NPTVBWaWV3c1tuZXdWaWV3TmFtZV0uY3VycmVudCAmJlxuICAgICAgICAgICAgICAgIHRoaXMucmVmc0NPTVBWaWV3c1tuZXdWaWV3TmFtZV0uY3VycmVudC5yZWZET00gJiZcbiAgICAgICAgICAgICAgICB0aGlzLnJlZnNDT01QVmlld3NbbmV3Vmlld05hbWVdLmN1cnJlbnQucmVmRE9NLmN1cnJlbnQ7XG4gICAgICAgICAgICBjb25zdCBvbGRWaWV3SW5kZXggPSB0aGlzLmdldFZpZXdJbmRleChvbGRWaWV3TmFtZSk7XG4gICAgICAgICAgICBjb25zdCBuZXdWaWV3SW5kZXggPSB0aGlzLmdldFZpZXdJbmRleChuZXdWaWV3TmFtZSk7XG5cbiAgICAgICAgICAgIGNvbnN0IGRpcmVjdGlvbiA9IG5ld1ZpZXdJbmRleCA+IG9sZFZpZXdJbmRleCA/IDEgOiAtMTtcblxuICAgICAgICAgICAgaWYgKCFuZXdWaWV3RE9NKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwibmV3IHZpZXcgRE9NIHJlZmZlcmVuY2Ugd2FzIG5vdCBmb3VuZFwiKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMuc3RhdGUubmF2YmFyKSB7XG4gICAgICAgICAgICAgICAgLy9wZXJmb3JtIG5hdmJhciBhbmltYXRpb25zXG4gICAgICAgICAgICAgICAgY29uc3QgdGl0bGVOb2RlID0gdGhpcy5yZWZET01OYXZiYXIuY3VycmVudC5xdWVyeVNlbGVjdG9yKFwiLnRpdGxlXCIpIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vY2tUaXRsZSA9IHRoaXMucmVmRE9NTmF2YmFyLmN1cnJlbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgICAgICAgICAgXCIubW9jay10aXRsZVwiXG4gICAgICAgICAgICAgICAgKSBhcyBIVE1MRWxlbWVudDtcbiAgICAgICAgICAgICAgICBjb25zdCBtb2NrVGV4dFNwYW4gPSBtb2NrVGl0bGUgJiYgbW9ja1RpdGxlLmNoaWxkcmVuWzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vY2tUZXh0U3BhbldpZHRoID0gbW9ja1RleHRTcGFuID8gbW9ja1RleHRTcGFuLmNsaWVudFdpZHRoIDogMDtcblxuICAgICAgICAgICAgICAgIGlmICh0aXRsZU5vZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgQWlyckZYLmRvVHJhbnNpdGlvbkFuaW1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIHRpdGxlTm9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgkeyh0aXRsZU5vZGUuY2xpZW50V2lkdGggLyAyICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW9ja1RleHRTcGFuV2lkdGggLyAyKSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpcmVjdGlvbiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHhcIn0sMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHsodGl0bGVOb2RlLmNsaWVudFdpZHRoIC8gMiArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tUZXh0U3BhbldpZHRoIC8gMikgKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkaXJlY3Rpb24gK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInB4XCJ9LDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYG9wYWNpdHkgJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB0cmFuc2Zvcm0gJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKDAsMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYW5pbWF0aW9uVGltZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChtb2NrVGl0bGUpIHtcbiAgICAgICAgICAgICAgICAgICAgQWlyckZYLmRvVHJhbnNpdGlvbkFuaW1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vY2tUaXRsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IFwidHJhbnNsYXRlM2QoMCwwLDApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYG9wYWNpdHkgJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGB0cmFuc2Zvcm0gJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgXG4gICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmtpdFRyYW5zZm9ybTogYHRyYW5zbGF0ZTNkKCR7bW9ja1RleHRTcGFuV2lkdGggKiBkaXJlY3Rpb24gKiAtMSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHhcIn0sMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHttb2NrVGV4dFNwYW5XaWR0aCAqIGRpcmVjdGlvbiAqIC0xICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJweFwifSwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYW5pbWF0aW9uVGltZVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmJhY2tCdXR0b24gJiYgIXRoaXMuc3RhdGUuYmFja0J1dHRvbk9uRmlyc3RWaWV3KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJhY2tET00gPSB0aGlzLnJlZkRPTU5hdmJhci5jdXJyZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmFja1wiKSBhcyBIVE1MRWxlbWVudDtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob2xkVmlld0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL3Nob3cgYmFjayBidXR0b24gd2l0aCBhbmltYXRpb25cbiAgICAgICAgICAgICAgICAgICAgICAgIEFpcnJGWC5kb1RyYW5zaXRpb25BbmltYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja0RPTSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdlYmtpdFRyYW5zZm9ybTogXCJ0cmFuc2xhdGUzZCgxMDAlLDAsMClcIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKDEwMCUsMCwwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBvcGFjaXR5ICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHRyYW5zZm9ybSAke3RoaXMuc3RhdGUuYW5pbWF0aW9uVGltZX1tcyBlYXNlLW91dGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlM2QoMCwwLDApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IGJhY2tET00uY2xhc3NMaXN0LnJlbW92ZShcImhpZGRlblwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobmV3Vmlld0luZGV4ID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvL2hpZGUgYmFja2J1dHRvbiB3aXRoIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgQWlyckZYLmRvVHJhbnNpdGlvbkFuaW1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrRE9NLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBcInRyYW5zbGF0ZTNkKDAsMCwwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlM2QoMCwwLDApXCIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYG9wYWNpdHkgJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgdHJhbnNmb3JtICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IFwidHJhbnNsYXRlM2QoLTEwMCUsMCwwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IFwidHJhbnNsYXRlM2QoLTEwMCUsMCwwKVwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYW5pbWF0aW9uVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tET00uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja0RPTS5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrRE9NLnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLmFuaW1hdGlvbiA9PT0gXCJzbGlkZVwiICYmIG9sZFZpZXdOYW1lKSB7XG4gICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgICAgICAgICAgICAgIGxldCBzdGFydFByb3BzOiBDU1NTdHJpbmdQcm9wZXJ0aWVzID0ge307XG4gICAgICAgICAgICAgICAgbGV0IGVuZFByb3BzOiBDU1NTdHJpbmdQcm9wZXJ0aWVzID0ge307XG5cbiAgICAgICAgICAgICAgICBpZiAoZGlyZWN0aW9uID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICBzdGFydFByb3BzLndlYmtpdFRyYW5zZm9ybSA9XG4gICAgICAgICAgICAgICAgICAgICAgICBcInRyYW5zbGF0ZTNkKFwiICsgLTEgKiB0aGlzLnJlZkRPTS5jdXJyZW50LmNsaWVudFdpZHRoICsgXCJweCwwLDApXCI7XG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0UHJvcHMudHJhbnNmb3JtID1cbiAgICAgICAgICAgICAgICAgICAgICAgIFwidHJhbnNsYXRlM2QoXCIgKyAtMSAqIHRoaXMucmVmRE9NLmN1cnJlbnQuY2xpZW50V2lkdGggKyBcInB4LDAsMClcIjtcbiAgICAgICAgICAgICAgICAgICAgZW5kUHJvcHMud2Via2l0VHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUzZCgwLDAsMClcIjtcbiAgICAgICAgICAgICAgICAgICAgZW5kUHJvcHMudHJhbnNmb3JtID0gXCJ0cmFuc2xhdGUzZCgwLDAsMClcIjtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBlbmRQcm9wcy53ZWJraXRUcmFuc2Zvcm0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUzZChcIiArIC0xICogdGhpcy5yZWZET00uY3VycmVudC5jbGllbnRXaWR0aCArIFwicHgsMCwwKVwiO1xuICAgICAgICAgICAgICAgICAgICBlbmRQcm9wcy50cmFuc2Zvcm0gPVxuICAgICAgICAgICAgICAgICAgICAgICAgXCJ0cmFuc2xhdGUzZChcIiArIC0xICogdGhpcy5yZWZET00uY3VycmVudC5jbGllbnRXaWR0aCArIFwicHgsMCwwKVwiO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIEFpcnJGWC5kb1RyYW5zaXRpb25BbmltYXRpb24oXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQ29udGFpbmVyLmN1cnJlbnQsXG4gICAgICAgICAgICAgICAgICAgIHN0YXJ0UHJvcHMsXG4gICAgICAgICAgICAgICAgICAgIFtgdHJhbnNmb3JtICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YF0sXG4gICAgICAgICAgICAgICAgICAgIGVuZFByb3BzLFxuICAgICAgICAgICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWUsXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUuZGlzcGxheSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5yZWZET01Db250YWluZXIuY3VycmVudC5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQ29udGFpbmVyLmN1cnJlbnQuc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LnN0eWxlLndlYmtpdEJhY2tmYWNlVmlzaWJpbGl0eSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LnN0eWxlLmJhY2tmYWNlVmlzaWJpbGl0eSA9IFwiXCI7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3RhdGUuYW5pbWF0aW9uID09PSBcIm92ZXJsYXlcIiAmJiBvbGRWaWV3TmFtZSkge1xuICAgICAgICAgICAgICAgIGlmIChkaXJlY3Rpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgQWlyckZYLmRvVHJhbnNpdGlvbkFuaW1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGllbnRXaWR0aCArIFwicHhcIn0sMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHt0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LmNsaWVudFdpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJweFwifSwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6IFwiYmxvY2tcIlxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBgb3BhY2l0eSAke3RoaXMuc3RhdGUuYW5pbWF0aW9uVGltZX1tcyBlYXNlLW91dGAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYHRyYW5zZm9ybSAke3RoaXMuc3RhdGUuYW5pbWF0aW9uVGltZX1tcyBlYXNlLW91dGBcbiAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiAobmV3Vmlld0RPTS5zdHlsZS56SW5kZXggPSBcIjEwMlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhdGUuYW5pbWF0aW9uVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLnpJbmRleCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUudHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS53ZWJraXRUcmFuc2l0aW9uID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN0YXRlLnN0YWNrTW9kZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkVmlld0RPTSA9IHRoaXMucmVmc0NPTVBWaWV3c1tvbGRWaWV3TmFtZV0uY3VycmVudC5yZWZET00uY3VycmVudDtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUub3BhY2l0eSA9IFwiMVwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBBaXJyRlguZG9UcmFuc2l0aW9uQW5pbWF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZpZXdET00sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBvcGFjaXR5ICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYHRyYW5zZm9ybSAke3RoaXMuc3RhdGUuYW5pbWF0aW9uVGltZX1tcyBlYXNlLW91dGBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2Via2l0VHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwke3RoaXMucmVmRE9NQ29udGFpbmVyLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGllbnRIZWlnaHQgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInB4XCJ9LDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoMCwke3RoaXMucmVmRE9NQ29udGFpbmVyLmN1cnJlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5jbGllbnRIZWlnaHQgL1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgNCArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBcInB4XCJ9LDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWaWV3RE9NLnN0eWxlLnRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWaWV3RE9NLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWaWV3RE9NLnN0eWxlLnRyYW5zZm9ybSA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9sZFZpZXdET00uc3R5bGUud2Via2l0VHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2xkVmlld0RPTS5zdHlsZS5vcGFjaXR5ID0gXCJcIjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICBBaXJyRlguZG9UcmFuc2l0aW9uQW5pbWF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgkey0xICpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucmVmRE9NQ29udGFpbmVyLmN1cnJlbnQuY2xpZW50V2lkdGggK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJweFwifSwwLDApYCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdHJhbnNmb3JtOiBgdHJhbnNsYXRlM2QoJHstMSAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlZkRPTUNvbnRhaW5lci5jdXJyZW50LmNsaWVudFdpZHRoICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFwicHhcIn0sMCwwKWAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYG9wYWNpdHkgJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgdHJhbnNmb3JtICR7dGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lfW1zIGVhc2Utb3V0YFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3ZWJraXRUcmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgwLDAsMClgLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKSA9PiAobmV3Vmlld0RPTS5zdHlsZS56SW5kZXggPSBcIjEwMlwiKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLnpJbmRleCA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUudHJhbnNmb3JtID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLnRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnN0YXRlLmFuaW1hdGlvbiA9PT0gXCJmYWRlXCIgfHwgIW9sZFZpZXdOYW1lKSB7XG4gICAgICAgICAgICAgICAgQWlyckZYLmRvVHJhbnNpdGlvbkFuaW1hdGlvbihcbiAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzcGxheTogXCJibG9ja1wiLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBbYG9wYWNpdHkgJHt0aGlzLnN0YXRlLmFuaW1hdGlvblRpbWV9bXMgZWFzZS1vdXRgXSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgb3BhY2l0eTogMVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiAobmV3Vmlld0RPTS5zdHlsZS56SW5kZXggPSBcIjEwMlwiKSxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGF0ZS5hbmltYXRpb25UaW1lLFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLmRpc3BsYXkgPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS56SW5kZXggPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS50cmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS53ZWJraXRUcmFuc2Zvcm0gPSBcIlwiO1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV3Vmlld0RPTS5zdHlsZS50cmFuc2l0aW9uID0gXCJcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5ld1ZpZXdET00uc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9IFwiXCI7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXdWaWV3RE9NLnN0eWxlLm9wYWNpdHkgPSBcIlwiO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG59XG4iXX0=