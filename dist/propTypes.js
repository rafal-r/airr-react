"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.navbarMenuProp = exports.renderChildrenProp = exports.commonChildrenProp = exports.sideStringProp = undefined;

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sideStringProp = exports.sideStringProp = _propTypes2.default.oneOf(["top", "bottom", "left", "right"]);
var commonChildrenProp = exports.commonChildrenProp = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element]);
var renderChildrenProp = exports.renderChildrenProp = _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.element, _propTypes2.default.func]);
var navbarMenuProp = exports.navbarMenuProp = function navbarMenuProp(props, propName, componentName) {
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
};