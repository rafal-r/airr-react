'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AirrFX = require('./AirrFX');

var _AirrFX2 = _interopRequireDefault(_AirrFX);

var _AirrComponent2 = require('./AirrComponent');

var _AirrComponent3 = _interopRequireDefault(_AirrComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrMayer = function (_AirrComponent) {
    _inherits(AirrMayer, _AirrComponent);

    // <button class="btn text alert">YES</button>
    // <button class="btn text success">CANCEL</button>

    function AirrMayer(props) {
        _classCallCheck(this, AirrMayer);

        var _this = _possibleConstructorReturn(this, (AirrMayer.__proto__ || Object.getPrototypeOf(AirrMayer)).call(this, props));

        if (!props.name) {
            throw new Error('Every Mayer must has its `name` property set');
        }
        return _this;
    }

    _createClass(AirrMayer, [{
        key: 'renderButton',
        value: function renderButton(config, index) {
            var className = "btn text";
            if (config.className) {
                className += " " + config.className;
            }

            var spareAttribs = {};
            if (config.attrs) {
                spareAttribs = config.attrs;
            }

            return _react2.default.createElement(
                'button',
                _extends({ key: 'btn' + index, className: className, style: config.style || null, onClick: config.handler || null }, spareAttribs),
                config.content
            );
        }
    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            if (this.ctnDOM.clientHeight >= this.props.avaibleHeight) {
                this.ctnDOM.style.height = this.props.avaibleHeight + 'px';
                this.mayerDOM.classList.add('full');
            }

            this.animateIn();
        }
    }, {
        key: 'animateIn',
        value: function animateIn() {
            //        (element, startProps, transitionProps, endProps, preAnimationCallback, endAfter, endCallback) {
            _AirrFX2.default.doTransitionAnimation(this.mayerDOM.querySelector('.bg'), { opacity: 0 }, ['opacity ' + this.props.animationTime + 'ms ease-out'], { opacity: 1 });
            _AirrFX2.default.doOverlayInAnimation(this.ctnDOM, this.mayerDOM.clientWidth, this.mayerDOM.clientHeight, this.props.animationTime, this.props.appearFrom);
        }
    }, {
        key: 'animateOut',
        value: function animateOut(callback) {
            _AirrFX2.default.doTransitionAnimation(this.mayerDOM.querySelector('.bg'), { opacity: 1 }, ['opacity ' + this.props.animationTime + 'ms ease-out'], { opacity: 0 });
            _AirrFX2.default.doOverlayOutAnimation(this.ctnDOM, this.mayerDOM.clientHeight, this.mayerDOM.clientWidth, this.props.animationTime, this.props.leaveTo, callback);
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var buttons = [];
            if (this.props.buttons) {
                this.props.buttons.forEach(function (config, index) {
                    buttons.push(_this2.renderButton(config, index));
                });
            }

            return _react2.default.createElement(
                'div',
                { className: 'mayer', ref: function ref(dom) {
                        return _this2.mayerDOM = dom;
                    } },
                _react2.default.createElement('div', { className: 'bg' }),
                _react2.default.createElement(
                    'div',
                    { className: 'ctn', ref: function ref(dom) {
                            return _this2.ctnDOM = dom;
                        } },
                    _react2.default.createElement(
                        'div',
                        { className: 'text' },
                        this.props.children,
                        this.props.content
                    ),
                    _react2.default.createElement(
                        'div',
                        { className: 'btns' },
                        buttons
                    )
                )
            );
        }
    }]);

    return AirrMayer;
}(_AirrComponent3.default);

AirrMayer.propTypes = {
    name: _propTypes2.default.string.isRequired,
    avaibleHeight: _propTypes2.default.number.isRequired,
    appearFrom: _propTypes2.default.oneOf(['top', 'bottom', 'left', 'right']),
    leaveTo: _propTypes2.default.oneOf(['top', 'bottom', 'left', 'right']),
    content: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.object]),
    buttons: _propTypes2.default.arrayOf(_propTypes2.default.object),
    animationTime: _propTypes2.default.number
};
AirrMayer.defaultProps = {
    name: '', //the name of the mayer. Must be unique among others views in scene. Will be used as identification string
    avaibleHeight: null, //parent scene height
    appearFrom: 'bottom', //side from which mayer content box will enter
    leaveTo: 'bottom', //side to which mayer content box will leave
    content: null, //content of mayer
    buttons: [], //array with buttons configuration
    animationTime: 300 //number time in miliseconds of mayer appear/disappear animation
};

module.exports = AirrMayer;