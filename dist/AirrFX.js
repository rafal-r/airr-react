"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = AirrFX;
function AirrFX() {}

AirrFX.doTransitionAnimation = function (element, startProps, transitionProps, endProps, preAnimationCallback, endAfter, endCallback) {
	element.style.webkitTransition = "none";
	element.style.transition = "none";

	element.offsetHeight;

	element.style.webkitBackfaceVisibility = "hidden";
	element.style.backfaceVisibility = "hidden";
	for (var prop in startProps) {
		if (prop === "transform") {
			element.style.webkitTransform = startProps[prop];
		}
		element.style[prop] = startProps[prop];
	}
	var compatibilityString = null;
	var transitionString = transitionProps.join(",");

	if (transitionString.indexOf("transform") !== -1 && transitionString.indexOf("-webkit-transform") === -1) {
		compatibilityString = transitionString.replace("transform", "-webkit-transform");
	}

	if (typeof preAnimationCallback === "function") {
		preAnimationCallback();
	}

	element.offsetHeight;

	if (compatibilityString) {
		element.style.webkitTransition = compatibilityString;
	}
	element.style.webkitTransition = transitionString;
	if (compatibilityString) {
		element.style.transition = compatibilityString;
	}
	element.style.transition = transitionString;

	element.offsetHeight;

	for (var _prop in endProps) {
		if (_prop === "transform") {
			element.style.webkitTransform = endProps[_prop];
		}
		element.style[_prop] = endProps[_prop];
	}

	if (typeof endCallback === "function") {
		setTimeout(function () {
			endCallback();
		}, endAfter);
	}
};

AirrFX.doOverlayOutAnimation = function (dom, width, height, t, headTo, callback) {
	var startProps = { opacity: 1 };
	var endProps = { zIndex: 102, opacity: 0 };

	if (["top", "bottom"].indexOf(headTo) !== -1) {
		if (headTo === "top") {
			endProps.webkitTransform = "scale(0, 1) translate3d(0,-" + height + "px,0)";
			endProps.transform = "scale(0, 1) translate3d(0,-" + height + "px,0)";
		} else {
			endProps.webkitTransform = "scale(0, 1) translate3d(0," + height + "px,0)";
			endProps.transform = "scale(0, 1) translate3d(0," + height + "px,0)";
		}
	} else {
		if (headTo === "left") {
			endProps.webkitTransform = "scale(1, 0) translate3d(-" + width + "px,0,0)";
			endProps.transform = "scale(1, 0) translate3d(-" + width + "px,0,0)";
		} else {
			endProps.webkitTransform = "scale(1, 0) translate3d(" + width + "px,0,0)";
			endProps.transform = "scale(1, 0) translate3d(" + width + "px,0,0)";
		}
	}

	AirrFX.doTransitionAnimation(dom, startProps, ["opacity " + t + "ms ease-out", "transform " + t + "ms ease-out"], endProps, null, t, function () {
		dom.style.cssText = "";

		if (typeof callback === "function") {
			callback();
		}
	});
};

AirrFX.doOverlayInAnimation = function (dom, width, height, t, appearFrom, callback) {
	var startProps = { opacity: 0 };

	if (["top", "bottom"].indexOf(appearFrom) !== -1) {
		if (appearFrom === "bottom") {
			startProps.webkitTransform = "scale(0, 1) translate3d(0," + height + "px,0)";
			startProps.transform = "scale(0, 1) translate3d(0," + height + "px,0)";
		} else {
			startProps.webkitTransform = "scale(0, 1) translate3d(0," + -1 * height + "px,0)";
			startProps.transform = "scale(0, 1) translate3d(0," + -1 * height + "px,0)";
		}
	} else {
		if (appearFrom === "right") {
			startProps.webkitTransform = "scale(1, 0) translate3d(" + width + "px,0,0)";
			startProps.transform = "scale(1, 0) translate3d(" + width + "px,0,0)";
		} else {
			startProps.webkitTransform = "scale(1, 0) translate3d(" + -1 * width + "px,0,0)";
			startProps.transform = "scale(1, 0) translate3d(" + -1 * width + "px,0,0)";
		}
	}

	AirrFX.doTransitionAnimation(dom, startProps, ["opacity " + t + "ms ease-out", "transform " + t + "ms ease-out"], {
		zIndex: 102,
		webkitTransform: "scale(1, 1) translate3d(0,0,0)",
		transform: "scale(1, 1) translate3d(0,0,0)",
		opacity: 1
	}, null, t, function () {
		dom.style.cssText = "";

		if (typeof callback === "function") {
			callback();
		}
	});
};

AirrFX.doVerticalScrollAnimation = function (element, scrollDuration, direction) {
	if (["top", "bottom"].indexOf(direction) === -1) {
		throw new Error("Invalid direction parameter speciefied");
	}

	var scrollHeight = element.scrollHeight,
	    scrollStep = Math.PI / (scrollDuration / 15),
	    cosParameter = scrollHeight / 2,
	    scrollCount = 0,
	    scrollMargin = void 0,
	    scrollEnd = direction === "top" ? 0 : scrollHeight - element.parentNode.clientHeight;
	var scrollInterval = setInterval(function () {
		if (element.scrollTop !== scrollEnd) {
			scrollCount += 1;
			scrollMargin = cosParameter - cosParameter * Math.cos(scrollCount * scrollStep);

			if (direction === "top") {
				element.scrollTop = element.scrollTop - scrollMargin;
			} else {
				element.scrollTop = element.scrollTop + scrollMargin;
			}
		} else {
			clearInterval(scrollInterval);
		}
	}, 15);
};