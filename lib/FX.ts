import { CSSProperties } from "react";
import { Placement } from "./airr-react";
import {
    prepareElementForAnimaton,
    refreshElement,
    resetElementTransition,
    setElementTransitions,
    setElementTransforms
} from "./FXHelpers";

interface TransitionAnimationConfig {
    element: HTMLElement;
    startProps: CSSProperties;
    transitionProps: string[];
    endProps: CSSProperties;
    preAnimationCallback?: () => void;
    endAfter?: number;
    endCallback?: () => void;
}
interface OverlayAnimationConfig {
    dom: HTMLElement;
    width: number;
    height: number;
    t: number;
    callback?: () => void;
}
interface OverlayOutAnimationConfig extends OverlayAnimationConfig {
    headTo: Placement;
}
interface OverlayInAnimationConfig extends OverlayAnimationConfig {
    appearFrom: Placement;
}

/**
 * Animation utiliy class. Performs css based transition animations
 */
export default function FX(): void {}

/**
 * Animate passed HTML element with power of css transitions
 *
 * @param {HTMLElement} element
 * @param {object} startProps css properties that will be set prior the animation
 * @param {array} transitionProps array of css transition definitions, e.g. ['opacity 700ms ease-in', 'transform .4s ease-out']. Compatibility props like `-webkit-transform` are not needed as they will be added automatically
 * @param {object} endProps target css properties values that animation will go to
 * @param {function} preAnimationCallback callback to call before animation begins
 * @param {integer} endAfter time in miliseconds after which `endCallback` will be invoke
 * @param {function} endCallback function to call after endAfter time parameter is gone
 * @returns {void}
 */
FX.doTransitionAnimation = function(config: TransitionAnimationConfig): void {
    const {
        element,
        startProps,
        transitionProps,
        endProps,
        preAnimationCallback,
        endAfter,
        endCallback
    } = config;

    resetElementTransition(element);
    refreshElement(element);
    prepareElementForAnimaton(element, startProps);

    if (typeof preAnimationCallback === "function") {
        preAnimationCallback();
    }

    refreshElement(element);
    setElementTransitions(element, transitionProps);
    refreshElement(element);
    setElementTransforms(element, endProps);

    if (typeof endCallback === "function" && endAfter) {
        setTimeout(function(): void {
            endCallback && endCallback();
        }, endAfter);
    }
};

/**
 * Used by Mayers for leaving animation
 *
 * @param {HTMLElement} dom
 * @param {int} width
 * @param {int} height
 * @param {int} t time in miliseconds
 * @param {string} headTo top,bottom,left,right
 * @param {function} callback
 * @returns {void}
 */
FX.doOverlayOutAnimation = function(config: OverlayOutAnimationConfig): void {
    const { dom, width, height, t, headTo, callback } = config;

    const startProps = { opacity: 1 };
    const endProps = { zIndex: 102, opacity: 0, webkitTransform: "", transform: "" };
    let transform = "";
    if (["top", "bottom"].includes(headTo)) {
        transform = `scale(0, 1) translate3d(0,${headTo === "top" ? -1 * height : height}px,0)`;
    } else {
        transform = `scale(1, 0) translate3d(${headTo === "left" ? -1 * width : width}px,0,0)`;
    }
    endProps.webkitTransform = transform;
    endProps.transform = transform;

    FX.doTransitionAnimation({
        element: dom,
        startProps,
        transitionProps: [`opacity ${t}ms ease-out`, `transform ${t}ms ease-out`],
        endProps,
        endAfter: t,
        endCallback: (): void => {
            dom.style.cssText = "";

            if (typeof callback === "function") {
                callback();
            }
        }
    });
};

/**
 * Used by Mayers for entering animation
 *
 * @param {HTMLElement} dom
 * @param {int} width
 * @param {int} height
 * @param {int} t time in miliseconds
 * @param {string} appearFrom top,bottom,left,right direction from which element will appear on the screen
 * @param {function} callback
 * @returns {void}
 */
FX.doOverlayInAnimation = function(config: OverlayInAnimationConfig): void {
    const { dom, width, height, t, appearFrom, callback } = config;
    let transform = "";
    const startProps = { opacity: 0, webkitTransform: "", transform: "" };

    if (["top", "bottom"].includes(appearFrom)) {
        transform = `scale(0, 1) translate3d(0,${
            appearFrom === "bottom" ? height : -1 * height
        }px,0)`;
    } else {
        transform = `scale(1, 0) translate3d(${appearFrom === "right" ? width : -1 * width}px,0,0)`;
    }

    startProps.webkitTransform = transform;
    startProps.transform = transform;

    const endProps = {
        zIndex: 102,
        webkitTransform: "scale(1, 1) translate3d(0,0,0)",
        transform: "scale(1, 1) translate3d(0,0,0)",
        opacity: 1
    };

    FX.doTransitionAnimation({
        element: dom,
        startProps,
        transitionProps: [`opacity ${t}ms ease-out`, `transform ${t}ms ease-out`],
        endProps: endProps,
        endAfter: t,
        endCallback: (): void => {
            dom.style.cssText = "";

            if (typeof callback === "function") {
                callback();
            }
        }
    });
};

/**
 * Used for animating scroll in vertical axis
 *
 * @param {HTMLElement} element
 * @param {int} scrollDuration time in miliseconds
 * @param {string} direction top or bottom
 * @returns {void}
 */
FX.doVerticalScrollAnimation = function(
    element: HTMLElement,
    scrollDuration: number,
    direction: Placement
): void {
    if (["top", "bottom"].indexOf(direction) === -1) {
        throw new Error("Invalid direction parameter speciefied");
    }

    let scrollHeight = element.scrollHeight,
        scrollStep = Math.PI / (scrollDuration / 15),
        cosParameter = scrollHeight / 2,
        scrollCount = 0,
        scrollMargin,
        scrollEnd = direction === "top" ? 0 : scrollHeight - element.parentElement.clientHeight;

    let scrollInterval = setInterval((): void => {
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
