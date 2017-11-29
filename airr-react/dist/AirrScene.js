'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AirrComponent2 = require('./AirrComponent');

var _AirrComponent3 = _interopRequireDefault(_AirrComponent2);

var _AirrFX = require('./AirrFX');

var _AirrFX2 = _interopRequireDefault(_AirrFX);

var _AirrMayer = require('./AirrMayer');

var _AirrMayer2 = _interopRequireDefault(_AirrMayer);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrScene = function (_AirrComponent) {
    _inherits(AirrScene, _AirrComponent);

    function AirrScene(props) {
        _classCallCheck(this, AirrScene);

        var _this = _possibleConstructorReturn(this, (AirrScene.__proto__ || Object.getPrototypeOf(AirrScene)).call(this, props));

        _this.viewsCompsRefs = {};
        _this.containerDOM = null;
        _this.navbarDOM = null;
        _this.mayersCompsRefs = {};
        _this.sidepanelComp = null;


        var views = _this.prepareViews(props.views);

        if (props.sidepanel) {
            props.sidepanel.props.ref = function (comp) {
                return _this.sidepanelComp = comp;
            };
            if (typeof props.sidepanel.props.enabled === 'undefined') {
                props.sidepanel.props.enabled = true; //force explicit value, e.g needed when checking if panel is enabled in `openMayer` method
            }
        }

        _this.state = {
            active: props.active,
            navbar: props.navbar,
            navbarHeight: props.navbarHeight,
            backButton: props.backButton,
            backButtonOnFirstView: props.backButtonOnFirstView,
            width: props.width,
            height: props.height,
            activeViewName: props.activeViewName,
            animation: props.animation,
            views: views,
            sidepanel: props.sidepanel,
            GUIDisabled: props.GUIDisabled,
            mayers: props.mayers
        };
        return _this;
    }

    /**
     * Takes array of views and assign react specific properties (key and ref) to each view configuartion
     * 
     * @param {array} views
     * @returns {void}
     */


    _createClass(AirrScene, [{
        key: 'prepareViews',
        value: function prepareViews(views) {
            var _this2 = this;

            return views.map(function (item) {
                item.props.key = item.props.name;
                item.props.ref = function (comp) {
                    return _this2.viewsCompsRefs[item.props.name] = comp;
                };
                return item;
            });
        }

        /**
         * 
         * @param {string} animation
         * @returns {void}
         */

    }, {
        key: 'updateAnimation',
        value: function updateAnimation(animation) {
            this.setState({ animation: animation });
        }

        /**
         * Updates Scenes state by updating every view configurion using immutability-helper::update function
         * 
         * @param {object} updateDefinition Object specifing update operation that will be applied on every view configuraion 
         * @returns {void}
         */

    }, {
        key: 'updateViews',
        value: function updateViews(updateDefinition) {
            var newviewsdefinition = this.state.views.map(function (item) {
                return (0, _immutabilityHelper2.default)(item, updateDefinition);
            });

            this.setState({ views: newviewsdefinition });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            var _this3 = this;

            if (this.state.views.length !== nextProps.views.length) {
                //Is views array different in length ?

                if (this.state.activeViewName !== nextProps.activeViewName) {
                    if (this.state.views.length > nextProps.views.length) {
                        //Views POP operation
                        var oldActiveViewName = this.state.activeViewName;
                        this.changeActiveView(nextProps.activeViewName, function () {
                            _this3.setState({ views: _this3.prepareViews(nextProps.views) });
                            delete _this3.viewsCompsRefs[oldActiveViewName];
                        });
                    } else {
                        //Views PUSH operation
                        this.setState({ views: this.prepareViews(nextProps.views) }, function () {
                            return _this3.changeActiveView(nextProps.activeViewName);
                        });
                    }
                } else {
                    this.setState({ views: this.prepareViews(nextProps.views) });
                }
            } else {
                //else check if every view configuration is the same
                var equal = true;
                this.state.views.forEach(function (item, i) {
                    if (item !== nextProps.views[i]) {
                        equal = false; //NOT equal!
                        return;
                    }
                });

                if (!equal) {
                    //update views state
                    this.setState({ views: this.prepareViews(nextProps.views) }, function () {
                        if (_this3.state.activeViewName !== nextProps.activeViewName) {
                            //now we can check if active view has changed
                            _this3.changeActiveView(nextProps.activeViewName);
                        }
                    });
                } else if (this.state.activeViewName !== nextProps.activeViewName) {
                    ///if only active view has changed
                    this.changeActiveView(nextProps.activeViewName);
                }
            }

            if (this.state.mayers.length !== nextProps.mayers.length) {
                //Is mayer array different in length ?
                if (this.state.mayers.length > nextProps.mayers.length) {
                    //close mayer
                    //find missing mayer name
                    var missingMayerName = '';
                    this.state.mayers.forEach(function (mayer) {
                        var found = false;
                        nextProps.mayers.forEach(function (mayer2) {
                            if (mayer.name === mayer2.name) {
                                found = true;
                            }
                        });

                        if (!found) {
                            missingMayerName = mayer.name;
                        }
                    });

                    if (missingMayerName) {
                        this.closeMayer(missingMayerName);
                    }
                } else {
                    //add new mayer, it will open automatically by componentDidMount mechanism
                    this.openMayer(nextProps.mayers[nextProps.mayers.length - 1]);
                }
            } else {
                //else check if every mayer configuration is the same
                var _equal = true;
                this.state.mayers.forEach(function (item, i) {
                    if (item !== nextProps.mayers[i]) {
                        _equal = false;
                        return;
                    }
                });

                if (!_equal) {
                    //NOT same, update mayers state
                    this.setState({ mayers: nextProps.mayers });
                }
            }

            //SIMPLE STATE UPDATES OPERATIONS:
            if (this.state.active !== nextProps.active) {
                this.setState({ active: nextProps.active });
            }
            if (this.state.animation !== nextProps.animation) {
                this.setState({ animation: nextProps.animation });
            }
            if (this.state.sidepanel !== nextProps.sidepanel) {
                this.setState({ sidepanel: nextProps.sidepanel });
            }
            if (this.state.navbar !== nextProps.navbar) {
                this.setState({ navbar: nextProps.navbar });
            }
            if (this.state.navbarHeight !== nextProps.navbarHeight) {
                this.setState({ navbarHeight: nextProps.navbarHeight });
            }
            if (this.state.backButton !== nextProps.backButton) {
                this.setState({ backButton: nextProps.backButton });
            }
            if (this.state.backButtonOnFirstView !== nextProps.backButtonOnFirstView) {
                this.setState({ backButtonOnFirstView: nextProps.backButtonOnFirstView });
            }
            if (this.state.width !== nextProps.width) {
                this.setState({ width: nextProps.width });
            }
            if (this.state.height !== nextProps.height) {
                this.setState({ height: nextProps.height });
            }
            if (this.state.GUIDisabled !== nextProps.GUIDisabled) {
                this.setState({ GUIDisabled: nextProps.GUIDisabled });
            }
        }

        /**
         * Returns view index in this.state.views array
         * 
         * @param {string} viewName
         * @returns {Number}
         */

    }, {
        key: 'getViewIndex',
        value: function getViewIndex(viewName) {
            var index = -1;

            this.state.views.forEach(function (config, i) {
                if (config.props.name === viewName) {
                    index = i;
                }
            });

            return index;
        }

        /**
         * Pops view out of this.state.views array, firstly requesting views animation
         * 
         * @returns {void}
         */

    }, {
        key: 'popView',
        value: function popView() {
            var _this4 = this;

            var index = this.getViewIndex(this.state.activeViewName);

            if (index >= 1) {
                var prevIndex = index - 1;
                var prevViewName = this.state.views[prevIndex].props.name;
                var oldViewName = this.state.activeViewName;
                var newviewdefinition = (0, _immutabilityHelper2.default)(this.state.views, { $splice: [[index, 1]] });

                this.changeActiveView(prevViewName, function () {
                    if (oldViewName in _this4.viewsCompsRefs) {
                        delete _this4.viewsCompsRefs[oldViewName];
                    }
                    _this4.setState({
                        views: newviewdefinition
                    });
                });
            } else {
                console.warn('[Airr] Can`t pop view. Only one view in stack.');
            }
        }

        /**
         * Pushes new view config into this.state.views array. This operation will invoke views animation if one is specified
         * 
         * @param {object} config new view configuration object
         * @returns {void}
         */

    }, {
        key: 'pushView',
        value: function pushView(config) {
            var _this5 = this;

            config.props.key = config.props.name;
            config.props.ref = function (comp) {
                return _this5.viewsCompsRefs[config.props.name] = comp;
            };

            var newviewdefinition = (0, _immutabilityHelper2.default)(this.state.views, { $push: [config] });

            this.setState({ views: newviewdefinition }, function () {
                _this5.changeActiveView(config.props.name);
            });
        }

        /**
         * If config has buttons that contains logical true `close` property, 
         * this method will attach close mayer functionality to tap event on this button.
         * 
         * @param {object} config mayer config object
         * @returns {void}
         */

    }, {
        key: 'prepareMayerConfig',
        value: function prepareMayerConfig(config) {
            var _this6 = this;

            if (config.buttons.length) {
                config.buttons.forEach(function (item) {
                    if (item.close) {
                        if (item.handler) {
                            var oldHandler = item.handler;
                            item.handler = function (e) {
                                oldHandler(e);
                                _this6.closeMayer(config.name);
                            };
                        } else {
                            item.handler = function (e) {
                                _this6.closeMayer(config.name);
                            };
                        }
                    }
                });
            }
        }

        /**
         * Add new mayer to this.state.mayers configurations array which will immediatelly open new mayer due to its nature
         * 
         * @param {object} config
         * @returns {void}
         */

    }, {
        key: 'openMayer',
        value: function openMayer(config) {
            var cancel = false;
            this.state.mayers.forEach(function (item) {
                if (item.name === config.name) {
                    console.warn('[Airr] Scene allready has Mayer with this name: ' + item.name);
                    cancel = true;
                }
            });

            //cancel if mayer name is repeated
            if (cancel) {
                return;
            }

            //if scene has sidepanel - disable it
            if (this.state.sidepanel && this.state.sidepanel.props.enabled) {
                this.disableSidepanel();
            }

            //add special functionality
            this.prepareMayerConfig(config);

            var newMayersDefinition = (0, _immutabilityHelper2.default)(this.state.mayers, { $push: [config] });
            this.setState({ mayers: newMayersDefinition });
        }

        /**
         * Close mayer by name
         * 
         * @param {string} name
         * @returns {void}
         */

    }, {
        key: 'closeMayer',
        value: function closeMayer(name) {
            var _this7 = this;

            var mayerConfigIndex = -1;

            this.state.mayers.forEach(function (config, i) {
                if (config.name === name) {
                    mayerConfigIndex = i;
                }
            });

            if (mayerConfigIndex >= 0 && this.mayersCompsRefs[name]) {
                this.mayersCompsRefs[name].animateOut(function () {
                    var newMayerDefinition = (0, _immutabilityHelper2.default)(_this7.state.mayers, { $splice: [[mayerConfigIndex, 1]] });
                    delete _this7.mayersCompsRefs[name];
                    _this7.setState({ mayers: newMayerDefinition });

                    if (_this7.state.sidepanel) {
                        var hasMayerLeft = false;
                        var children = [].concat(_toConsumableArray(_this7.refs.dom.children));
                        children.forEach(function (item) {
                            if (item.classList.contains('airr-mayer')) {
                                hasMayerLeft = true;
                            }
                        });

                        if (!hasMayerLeft) {
                            _this7.enableSidepanel();
                        }
                    }
                });
            }
        }

        /**
         * Close every mayer by resetting this.state.mayers to empty array value
         * 
         * @returns {void}
         */

    }, {
        key: 'closeALlMayers',
        value: function closeALlMayers() {
            if (this.state.mayers.length) {
                this.setState({ mayers: [] });
            }

            if (this.state.sidepanel && !this.state.sidepanel.props.enabled) {
                this.enableSidepanel();
            }

            this.mayersCompsRefs = {};
        }

        /**
         * Changes scenes active view
         * 
         * @param {string} newViewName
         * @param {function} callback
         * @returns {void}
         */

    }, {
        key: 'changeActiveView',
        value: function changeActiveView(newViewName, callback) {
            var _this8 = this;

            if (typeof newViewName === 'string') {

                this.setState({ GUIDisabled: true }, function () {

                    if (newViewName === _this8.state.activeViewName) {
                        console.warn('[Airr] This View is already active.');
                        _this8.setState({ GUIDisabled: false });
                        return;
                    }

                    var found = false;

                    _this8.state.views.forEach(function (view) {
                        if (view.props.name === newViewName) {
                            found = true;
                        }
                    });

                    if (!found) {
                        console.warn('[Airr] View with name ' + newViewName + ' is not presence in this Scene.');
                    } else {
                        var oldViewName = _this8.state.activeViewName;
                        var newViewComp = _this8.viewsCompsRefs[newViewName];
                        var oldViewComp = _this8.viewsCompsRefs[oldViewName];

                        if (typeof newViewComp.viewBeforeActivation === 'function') {
                            newViewComp.viewBeforeActivation();
                        }

                        if (typeof oldViewComp.viewBeforeDeactivation === 'function') {
                            oldViewComp.viewBeforeDeactivation();
                        }

                        if (_this8.state.animation) {

                            _this8.doViewAnimation(newViewName, oldViewName, function () {
                                _this8.setState({
                                    activeViewName: newViewName,
                                    GUIDisabled: false
                                }, function () {
                                    if (typeof newViewComp.viewAfterActivation === 'function') {
                                        newViewComp.viewAfterActivation();
                                    }
                                    if (typeof oldViewComp.viewAfterDeactivation === 'function') {
                                        oldViewComp.viewAfterDeactivation();
                                    }

                                    if (typeof callback === 'function') {
                                        callback();
                                    }
                                });
                            });
                        } else {
                            _this8.setState({
                                activeViewName: newViewName,
                                GUIDisabled: false
                            }, function () {
                                if (typeof newViewComp.viewAfterActivation === 'function') {
                                    newViewComp.viewAfterActivation();
                                }
                                if (typeof oldViewComp.viewAfterDeactivation === 'function') {
                                    oldViewComp.viewAfterDeactivation();
                                }

                                if (typeof callback === 'function') {
                                    callback();
                                }
                            });
                        }
                    }
                });
            } else {
                console.warn('[Airr] You must specify view name property as string value');
            }
        }

        /**
         * Perform animation between old and new active view
         * 
         * @param {string} newViewName
         * @param {string} oldViewName
         * @param {function} callback
         * @returns {void}
         */

    }, {
        key: 'doViewAnimation',
        value: function doViewAnimation(newViewName, oldViewName, callback) {
            var _this9 = this;

            var newViewDOM = this.viewsCompsRefs[newViewName].refs.airrView.refs.dom;
            var oldViewIndex = this.getViewIndex(oldViewName);
            var newViewIndex = this.getViewIndex(newViewName);

            var direction = newViewIndex > oldViewIndex ? 1 : -1;

            if (this.state.navbar) {
                //perform navbar animations
                var newTitle = document.createElement('div');
                var textSpan = document.createElement('span');
                var oldTitle = this.navbarDOM.querySelector('.title');
                newTitle.classList.add('new-title');
                textSpan.textContent = this.state.views[this.getViewIndex(newViewName)].props.title;
                newTitle.appendChild(textSpan);

                this.navbarDOM.insertBefore(newTitle, this.navbarDOM.children[0]);

                if (this.state.backButton && this.props.stackMode) {
                    var backDOM = this.navbarDOM.querySelector('.back');
                    if (oldViewIndex === 0) {

                        _AirrFX2.default.doTransitionAnimation(backDOM, {
                            webkitTransform: 'translate3d(100%,0,0)',
                            transform: 'translate3d(100%,0,0)',
                            opacity: 0
                        }, ['opacity ' + this.props.animationTime + 'ms ease-out', 'transform ' + this.props.animationTime + 'ms ease-out'], {
                            webkitTransform: 'translate3d(0,0,0)',
                            transform: 'translate3d(0,0,0)',
                            opacity: 1
                        }, function () {
                            return backDOM.classList.remove('hidden');
                        }, this.props.animationTime);
                    } else if (newViewIndex === 0) {

                        _AirrFX2.default.doTransitionAnimation(backDOM, {
                            webkitTransform: 'translate3d(0,0,0)',
                            transform: 'translate3d(0,0,0)',
                            opacity: 1
                        }, ['opacity ' + this.props.animationTime + 'ms ease-out', 'transform ' + this.props.animationTime + 'ms ease-out'], {
                            webkitTransform: 'translate3d(-100%,0,0)',
                            transform: 'translate3d(-100%,0,0)',
                            opacity: 0
                        }, null, this.props.animationTime);
                    }
                }

                _AirrFX2.default.doTransitionAnimation(oldTitle, {
                    webkitTransform: 'translate3d(0,0,0)',
                    transform: 'translate3d(0,0,0)',
                    opacity: 1
                }, ['opacity ' + this.props.animationTime + 'ms ease-out', 'transform ' + this.props.animationTime + 'ms ease-out'], {
                    webkitTransform: 'translate3d(' + (oldTitle.clientWidth * direction * -1 + 'px') + ',0,0)',
                    transform: 'translate3d(' + (oldTitle.clientWidth * direction * -1 + 'px') + ',0,0)',
                    opacity: 0
                }, null, this.props.animationTime);

                _AirrFX2.default.doTransitionAnimation(newTitle, {
                    webkitTransform: 'translate3d(' + ((oldTitle.clientWidth / 2 + textSpan.clientWidth / 2) * direction + 'px') + ',0,0)',
                    transform: 'translate3d(' + ((oldTitle.clientWidth / 2 + textSpan.clientWidth / 2) * direction + 'px') + ',0,0)',
                    opacity: 0
                }, ['opacity ' + this.props.animationTime + 'ms ease-out', 'transform ' + this.props.animationTime + 'ms ease-out'], {
                    webkitTransform: 'translate3d(0,0,0)',
                    transform: 'translate3d(0,0,0)',
                    opacity: 1
                }, null, this.props.animationTime);

                setTimeout(function () {
                    newTitle.classList.remove('new-title');
                    newTitle.classList.add('title');
                    _this9.navbarDOM.removeChild(oldTitle);
                }, this.props.animationTime);
            }

            if (this.state.animation === 'slide') {
                newViewDOM.style.display = 'block';
                var startProps = {};
                var endProps = {};

                if (direction === -1) {
                    startProps.webkitTransform = 'translate3d(' + -1 * this.refs.dom.clientWidth + 'px,0,0)';
                    startProps.transform = 'translate3d(' + -1 * this.refs.dom.clientWidth + 'px,0,0)';
                    endProps.webkitTransform = 'translate3d(0,0,0)';
                    endProps.transform = 'translate3d(0,0,0)';
                } else {
                    endProps.webkitTransform = 'translate3d(' + -1 * this.refs.dom.clientWidth + 'px,0,0)';
                    endProps.transform = 'translate3d(' + -1 * this.refs.dom.clientWidth + 'px,0,0)';
                }

                _AirrFX2.default.doTransitionAnimation(this.containerDOM, startProps, ['transform ' + this.props.animationTime + 'ms ease-out'], endProps, null, this.props.animationTime, function () {
                    newViewDOM.style.display = '';
                    _this9.containerDOM.style.webkitTransform = 'translate3d(0,0,0)';
                    _this9.containerDOM.style.transform = 'translate3d(0,0,0)';
                    _this9.containerDOM.style.webkitTransition = '';
                    _this9.containerDOM.style.transition = '';
                    _this9.containerDOM.style.transition = '';
                    _this9.containerDOM.style.webkitBackfaceVisibility = '';
                    _this9.containerDOM.style.backfaceVisibility = '';

                    if (typeof callback === 'function') {
                        callback();
                    }
                });
            } else if (this.state.animation === 'overlay') {
                if (direction === 1) {
                    _AirrFX2.default.doTransitionAnimation(newViewDOM, {
                        webkitTransform: 'translate3d(' + (this.containerDOM.clientWidth + 'px') + ',0,0)',
                        transform: 'translate3d(' + (this.containerDOM.clientWidth + 'px') + ',0,0)',
                        opacity: 0
                    }, ['opacity ' + this.props.animationTime + 'ms ease-out', 'transform ' + this.props.animationTime + 'ms ease-out'], {
                        webkitTransform: 'translate3d(0,0,0)',
                        transform: 'translate3d(0,0,0)',
                        opacity: 1
                    }, function () {
                        return newViewDOM.style.zIndex = 102;
                    }, this.props.animationTime, function () {
                        newViewDOM.style.zIndex = '';
                        callback();
                    });
                } else {
                    if (this.props.stackMode) {
                        _AirrFX2.default.doTransitionAnimation(this.viewsCompsRefs[oldViewName].refs.airrView.refs.dom, {
                            webkitTransform: 'translate3d(0,0,0)',
                            transform: 'translate3d(0,0,0)',
                            opacity: 1
                        }, ['opacity ' + this.props.animationTime + 'ms ease-out', 'transform ' + this.props.animationTime + 'ms ease-out'], {
                            webkitTransform: 'translate3d(0,' + (this.containerDOM.clientHeight / 4 + 'px') + ',0)',
                            transform: 'translate3d(0,' + (this.containerDOM.clientHeight / 4 + 'px') + ',0)',
                            opacity: 0
                        }, null, this.props.animationTime, callback);
                    } else {
                        _AirrFX2.default.doTransitionAnimation(newViewDOM, {
                            webkitTransform: 'translate3d(' + (-1 * this.containerDOM.clientWidth + 'px') + ',0,0)',
                            transform: 'translate3d(' + (-1 * this.containerDOM.clientWidth + 'px') + ',0,0)',
                            opacity: 0
                        }, ['opacity ' + this.props.animationTime + 'ms ease-out', 'transform ' + this.props.animationTime + 'ms ease-out'], {
                            webkitTransform: 'translate3d(0,0,0)',
                            transform: 'translate3d(0,0,0)',
                            opacity: 1
                        }, function () {
                            return newViewDOM.style.zIndex = 102;
                        }, this.props.animationTime, function () {
                            newViewDOM.style.zIndex = '';
                            callback();
                        });
                    }
                }
            } else if (this.state.animation === 'fade') {
                _AirrFX2.default.doTransitionAnimation(newViewDOM, {
                    opacity: 0
                }, ['opacity ' + this.props.animationTime + 'ms ease-out'], {
                    opacity: 1
                }, function () {
                    return newViewDOM.style.zIndex = 102;
                }, this.props.animationTime, function () {
                    newViewDOM.style.zIndex = '';
                    callback();
                });
            }
        }

        /**
         * Enables scenes GUI by removing blank-mask class div element
         * 
         * @returns {void}
         */

    }, {
        key: 'enableGUI',
        value: function enableGUI() {
            this.setState({ GUIDisabled: false });
        }

        /**
         * Disables scenes GUI by adding blank-mask class div element
         * 
         * @returns {undefined}
         */

    }, {
        key: 'disableGUI',
        value: function disableGUI() {
            this.setState({ GUIDisabled: true });
        }

        /**
         * Makes sidepanel draggable
         * 
         * @returns {void}
         */

    }, {
        key: 'enableSidepanel',
        value: function enableSidepanel() {
            if (this.state.sidepanel) {
                var newPanelDefinition = (0, _immutabilityHelper2.default)(this.state.sidepanel, { props: { enabled: { $set: true } } });
                this.setState({ sidepanel: newPanelDefinition });
            }
        }

        /**
         * Disables sidepanel from being dragged
         * 
         * @returns {void}
         */

    }, {
        key: 'disableSidepanel',
        value: function disableSidepanel() {
            if (this.state.sidepanel) {
                var newPanelDefinition = (0, _immutabilityHelper2.default)(this.state.sidepanel, { props: { enabled: { $set: false } } });
                this.setState({ sidepanel: newPanelDefinition });
            }
        }

        /**
         * Updates sidepanels state configuration
         * 
         * @param {object} sidepanel
         * @returns {void}
         */

    }, {
        key: 'updateSidepanel',
        value: function updateSidepanel(sidepanel) {
            this.setState({
                sidepanel: sidepanel
            });
        }

        /**
         * Handles navbar backbutton tap events
         * 
         * @param {object} e Event object
         * @returns {void}
         */

    }, {
        key: 'handleBackButton',
        value: function handleBackButton(e) {
            var backBtn = e.currentTarget;
            backBtn.classList.add('clicked');

            setTimeout(function () {
                backBtn.classList.remove('clicked');
            }, 300);

            if (this.props.stackMode && this.state.views.length > 1) {
                if (this.props.handleBackButton) {
                    this.props.handleBackButton(e);
                } else {
                    this.popView();
                }
            } else if (this.props.handleBackBehaviourOnFirstView) {
                this.props.handleBackBehaviourOnFirstView();
            }
        }

        /**
         * Handles navbar menu button tap events
         * 
         * @param {object} e Event object
         * @returns {void}
         */

    }, {
        key: 'handleMenuButton',
        value: function handleMenuButton(e) {
            if (this.sidepanelComp) {
                this.sidepanelComp.isShown() ? this.sidepanelComp.hide() : this.sidepanelComp.show();
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _this10 = this;

            var containerClassList = ['airr-container'];
            if (this.state.animation) {
                containerClassList.push(this.state.animation + '-animation');
            }

            var className = 'airr-view airr-scene';
            this.state.active && (className += ' active');

            var views = [];
            var isAnyViewActive = false;
            this.state.views.forEach(function (item) {
                var viewProps = {};
                Object.assign(viewProps, item.props);

                viewProps.width = _this10.state.width;
                viewProps.height = _this10.state.navbar ? parseFloat(_this10.state.height) - _this10.state.navbarHeight : _this10.state.height;

                if (viewProps.name === _this10.state.activeViewName) {
                    viewProps.active = true;
                    isAnyViewActive = true;
                }

                views.push(_react2.default.createElement(item.type, viewProps));
            });

            if (!isAnyViewActive) {
                console.warn('[Airr] No view was set as active' + (this.props.name && ' in Scene named `' + this.props.name) + '`.');
            }

            var containerStyle = {};
            if (this.state.animation === 'slide') {
                containerStyle = { width: this.state.width ? this.state.width * 2 + 'px' : parseFloat(this.state.width) * 2 + 'px' };
            }

            var sidepanel = null;
            if (this.state.sidepanel) {
                sidepanel = _react2.default.createElement(this.state.sidepanel.type, this.state.sidepanel.props);
            }

            var blankmask = null;
            if (this.state.GUIDisabled) {
                blankmask = _react2.default.createElement('div', { className: 'airr-blank-mask' });
            }

            var mayers = [];
            if (this.state.mayers.length) {
                mayers = this.state.mayers.map(function (mayerProps) {
                    mayerProps.key = mayerProps.name;
                    mayerProps.ref = function (component) {
                        return _this10.mayersCompsRefs[mayerProps.name] = component;
                    };
                    return _react2.default.createElement(_AirrMayer2.default, mayerProps);
                });
            }

            var navbar = null;
            if (this.state.navbar) {
                var back = null;
                if (this.state.backButton) {
                    var backClassName = 'back ' + (this.getViewIndex(this.state.activeViewName) < 1 && !this.state.backButtonOnFirstView ? 'hidden' : '');
                    back = _react2.default.createElement(
                        'div',
                        { className: backClassName, onClick: function onClick(e) {
                                return _this10.handleBackButton(e);
                            } },
                        _react2.default.createElement('div', null)
                    );
                }
                var menu = this.state.sidepanel ? _react2.default.createElement(
                    'div',
                    { className: 'menu', onClick: function onClick(e) {
                            return _this10.handleMenuButton(e);
                        } },
                    _react2.default.createElement('div', null)
                ) : null;
                var title = null;
                views.forEach(function (v) {
                    if (v.props.name === _this10.state.activeViewName) {
                        title = v.props.title;
                    }
                });
                navbar = _react2.default.createElement(
                    'div',
                    { className: 'airr-navbar', ref: function ref(dom) {
                            return _this10.navbarDOM = dom;
                        }, style: { height: this.state.navbarHeight + 'px' } },
                    back,
                    _react2.default.createElement(
                        'div',
                        { className: 'title' },
                        _react2.default.createElement(
                            'span',
                            null,
                            title
                        )
                    ),
                    menu
                );
            }

            return _react2.default.createElement(
                'div',
                { className: className,
                    style: { width: this.state.width + 'px', height: this.state.height + 'px' },
                    ref: 'dom' },
                navbar,
                _react2.default.createElement(
                    'div',
                    { className: containerClassList.join(' '), style: containerStyle,
                        ref: function ref(div) {
                            return _this10.containerDOM = div;
                        } },
                    views
                ),
                this.props.children,
                sidepanel,
                mayers,
                blankmask
            );
        }
    }]);

    return AirrScene;
}(_AirrComponent3.default);

AirrScene.propTypes = {
    name: _propTypes2.default.string.isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    activeViewName: _propTypes2.default.string.isRequired,

    GUIDisabled: _propTypes2.default.bool,
    animation: _propTypes2.default.oneOf(['slide', 'overlay', 'fade']),
    animationTime: _propTypes2.default.number,
    navbar: _propTypes2.default.bool,
    navbarHeight: _propTypes2.default.number,
    backButton: _propTypes2.default.bool,
    backButtonOnFirstView: _propTypes2.default.bool,
    handleBackButton: _propTypes2.default.func,
    handleBackBehaviourOnFirstView: _propTypes2.default.func,
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
     * this.state.views = [
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
     * this.mayers.views = [
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
AirrScene.defaultProps = {
    name: '', //the name of the scene. Must be unique among others views in parent scene. Will be used as identification string
    width: null, //number
    height: null, //number
    activeViewName: null, //string 

    GUIDisabled: false, //bool
    animation: 'slide', //slide,overlay or fade
    animationTime: 300, //number time in miliseconds of views change animation, used also in navbar animations
    navbar: false, //bool
    navbarHeight: 48, //navbar height in px
    backButton: false, //bool
    backButtonOnFirstView: false, //bool To show backButton in navbar if currently showing first view in stack.
    handleBackButton: null, //parent function to handle back button tap
    handleBackBehaviourOnFirstView: null, //null or function e.g. if this scene is view in some parent scene, and you want to pop out of it - this function will come from parent scene and will handle this behaviour
    stackMode: true, //bool - if false Scene views will be assumed as tabs rather then stack order views. (view change vs. view pop/push)
    active: false, //bool is currently active in parent scene
    sidepanel: null, //{type: AirrSidepanel, props: {}}
    views: [], //array,
    mayers: [], //mayers conf list
    title: '' //titlebar name
};

module.exports = AirrScene;