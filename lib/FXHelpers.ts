import { CSSProperties } from "react";

export function refreshElement(el: HTMLElement): void {
    el.offsetHeight;
}
export function setElementTransforms(el: HTMLElement, props: CSSProperties): HTMLElement {
    Object.entries(props).forEach(
        ([key, val]): void => {
            if (key === "transform") {
                el.style.webkitTransform = val;
            }
            el.style[key] = val;
        }
    );
    return el;
}
export function prepareElementForAnimaton(el: HTMLElement, props: CSSProperties): HTMLElement {
    el.style.webkitBackfaceVisibility = "hidden";
    el.style.backfaceVisibility = "hidden";

    setElementTransforms(el, props);

    return el;
}
export function resetElementTransition(el: HTMLElement): HTMLElement {
    el.style.webkitTransition = "none";
    el.style.transition = "none";
    return el;
}
export function getTransformCompatibilityString(transition: string): string | null {
    let string = null;

    if (transition.indexOf("transform") !== -1 && transition.indexOf("-webkit-transform") === -1) {
        string = transition.replace("transform", "-webkit-transform");
    }

    return string;
}
export function setElementTransitions(el: HTMLElement, transitions: string[]): HTMLElement {
    let transitionString = transitions.join(",");
    let compatibilityString = getTransformCompatibilityString(transitionString);

    if (compatibilityString) {
        el.style.webkitTransition = compatibilityString;
    }

    el.style.webkitTransition = transitionString;
    if (compatibilityString) {
        el.style.transition = compatibilityString;
    }
    el.style.transition = transitionString;
    return el;
}
