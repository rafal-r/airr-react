'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _AirrComponent2 = require('./AirrComponent');

var _AirrComponent3 = _interopRequireDefault(_AirrComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AirrView = function (_AirrComponent) {
    _inherits(AirrView, _AirrComponent);

    function AirrView() {
        _classCallCheck(this, AirrView);

        return _possibleConstructorReturn(this, (AirrView.__proto__ || Object.getPrototypeOf(AirrView)).apply(this, arguments));
    }

    _createClass(AirrView, [{
        key: 'render',
        value: function render() {
            var className = 'view';
            var style = this.props.style || {};

            style.width = this.props.width + 'px';
            style.height = this.props.height + 'px';
            this.props.active && (className += ' active');

            return _react2.default.createElement(
                'div',
                { className: className, style: style, ref: 'dom' },
                this.props.children
            );
        }
    }]);

    return AirrView;
}(_AirrComponent3.default);

;

AirrView.propTypes = {
    name: _propTypes2.default.string.isRequired,
    width: _propTypes2.default.number.isRequired,
    height: _propTypes2.default.number.isRequired,
    title: _propTypes2.default.string,
    active: _propTypes2.default.bool
};
AirrView.defaultProps = {
    name: '', //the name of the view. Must be unique among others views in scene. Will be used as identification string
    title: '', //titlebar name. if parent scene navbar is enabled, this title will be showed there
    active: false,
    width: null,
    height: null
};

module.exports = AirrView;