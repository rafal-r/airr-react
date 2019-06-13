/**
 * Animation utility functions. Performs css based transition animations
 */
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
    startProps: CSSProperties; //css properties that will be set prior the animation
    transitionProps: string[]; //array of css transition definitions, e.g. ['opacity 700ms ease-in', 'transform .4s ease-out']. Compatibility props like `-webkit-transform` are not needed as they will be added automatically
    endProps: CSSProperties; //target css properties values that animation will go to
    preAnimationCallback?: () => void; //callback to call before animation begins
    endAfter?: number; //time in miliseconds after which `endCallback` will be invoke
    endCallback?: () => void; //function to call after endAfter time parameter is gone
}

/**
 * Animate passed HTML element with power of css transitions
 */
export function doTransitionAnimation(config: TransitionAnimationConfig): void {
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
}

/**
 * Used for animating scroll in vertical axis
 *
 * @param {HTMLElement} element
 * @param {int} scrollDuration time in miliseconds
 * @param {string} direction top or bottom
 * @returns {void}
 */
export function doVerticalScrollAnimation(
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
}
