import { CSSProperties } from "react";
import { Placement } from "./Airr";
import {
    prepareElementForAnimaton,
    refreshElement,
    resetElementTransition,
    setElementTransitions,
    setElementTransforms
} from "./FXHelpers";

export interface TransitionAnimationConfig {
    element: HTMLElement;
    startProps: CSSProperties;
    transitionProps: string[];
    endProps: CSSProperties;
    preAnimationCallback?: () => void;
    endAfter?: number;
    endCallback?: () => void;
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
