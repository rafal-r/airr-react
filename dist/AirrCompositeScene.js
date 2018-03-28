'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _AirrScene = require('./AirrScene');

var _AirrScene2 = _interopRequireDefault(_AirrScene);

var _AirrComponent2 = require('./AirrComponent');

var _AirrComponent3 = _interopRequireDefault(_AirrComponent2);

var _immutabilityHelper = require('immutability-helper');

var _immutabilityHelper2 = _interopRequireDefault(_immutabilityHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrCompositeScene = function (_AirrComponent) {
    _inherits(AirrCompositeScene, _AirrComponent);

    function AirrCompositeScene(props) {
        _classCallCheck(this, AirrCompositeScene);

        var _this = _possibleConstructorReturn(this, (AirrCompositeScene.__proto__ || Object.getPrototypeOf(AirrCompositeScene)).call(this, props));

        _this.state = {
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

    _createClass(AirrCompositeScene, [{
        key: 'pushView',
        value: function pushView(config) {
            var newviewdefinition = (0, _immutabilityHelper2.default)(this.state.views, { $push: [config] });
            this.setState({
                views: newviewdefinition,
                activeViewName: config.props.name
            });
        }
    }, {
        key: 'popView',
        value: function popView() {
            if (this.state.views.length > 1) {

                var newviewdefinition = (0, _immutabilityHelper2.default)(this.state.views, { $splice: [[this.state.views.length - 1, 1]] });

                this.setState({
                    activeViewName: this.state.views[this.state.views.length - 2].props.name,
                    views: newviewdefinition
                });
            }
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            if (!this.state.active && nextProps.active) {
                this.setState({ active: true });
            }
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(_AirrScene2.default, {
                ref: 'airrView',
                name: this.props.name,
                animationTime: this.state.animationTime,
                handleBackBehaviourOnFirstView: this.state.handleBackBehaviourOnFirstView,
                handleBackButton: this.state.handleBackButton,
                viewsAnimationEndCallback: this.state.viewsAnimationEndCallback,
                stackMode: this.state.stackMode,
                GUIDisabled: this.state.GUIDisabled,
                GUIDisableCover: this.state.GUIDisableCover,
                active: this.state.active,
                views: this.state.views,
                mayers: this.state.mayers,
                activeViewName: this.state.activeViewName,
                sidepanel: this.state.sidepanel,
                navbar: this.state.navbar,
                navbarHeight: this.state.navbarHeight,
                navbarMenu: this.state.navbarMenu,
                navbarClass: this.state.navbarClass,
                animation: this.state.animation,
                backButton: this.state.backButton,
                backButtonOnFirstView: this.state.backButtonOnFirstView,
                children: this.state.children });
        }
    }]);

    return AirrCompositeScene;
}(_AirrComponent3.default);

exports.default = AirrCompositeScene;

AirrCompositeScene.propTypes = _AirrScene2.default.propTypes;
AirrCompositeScene.defaultProps = _AirrScene2.default.defaultProps;