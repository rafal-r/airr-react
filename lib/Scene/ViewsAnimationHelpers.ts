import FX from "../FX";
import { clearElementAnimationsStyles } from "../FXHelpers";
import { getCommonTransitionsSpec } from "./ItemsAnimationHelpers";
import { CSSProperties } from "react";

interface ViewsCommonOverlayAnimation {
    newViewDOM: HTMLElement;
    animationTime: number;
    ctnWidth: number;
}
interface ViewsStackOverlayAnimation extends ViewsCommonOverlayAnimation {
    oldViewDOM: HTMLElement;
    ctnHeight: number;
}
interface ViewsOverlayAnimation extends ViewsCommonOverlayAnimation {
    oldViewDOM: HTMLElement;
    direction: 1 | -1;
    stackMode: boolean;
    ctnHeight: number;
}
function doViewsOverlayForwardAnimation({
    newViewDOM,
    animationTime,
    ctnWidth
}: ViewsCommonOverlayAnimation): Promise<void> {
    const transform = `translate3d(${ctnWidth + "px"},0,0)`;
    const endTransform = `translate3d(0,0,0)`;

    return new Promise(
        (resolve): void => {
            FX.doTransitionAnimation({
                element: newViewDOM,
                startProps: {
                    WebkitTransform: transform,
                    transform,
                    opacity: 0,
                    display: "block"
                },
                transitionProps: getCommonTransitionsSpec(animationTime),
                endProps: {
                    WebkitTransform: endTransform,
                    transform: endTransform,
                    opacity: 1
                },
                preAnimationCallback: (): void => {
                    newViewDOM.style.zIndex = "102";
                },
                endAfter: animationTime,
                endCallback: (): void => {
                    clearElementAnimationsStyles(newViewDOM);
                    resolve();
                }
            });
        }
    );
}
function doViewsOverlayBackwardStackAnimation({
    newViewDOM,
    oldViewDOM,
    animationTime,
    ctnHeight
}: ViewsStackOverlayAnimation): Promise<void> {
    return new Promise(
        (resolve): void => {
            const transform = `translate3d(0,0,0)`;
            const endTransform = `translate3d(0,${ctnHeight / 4 + "px"},0)`;

            newViewDOM.style.display = "block";
            newViewDOM.style.opacity = "1";

            FX.doTransitionAnimation({
                element: oldViewDOM,
                startProps: {
                    WebkitTransform: transform,
                    transform,
                    opacity: 1
                },
                transitionProps: [
                    `opacity ${animationTime}ms ease-out`,
                    `transform ${animationTime}ms ease-out`
                ],
                endProps: {
                    WebkitTransform: endTransform,
                    transform: endTransform,
                    opacity: 0
                },
                endAfter: animationTime,
                endCallback: (): void => {
                    clearElementAnimationsStyles(oldViewDOM);
                    clearElementAnimationsStyles(newViewDOM);
                    resolve();
                }
            });
        }
    );
}
function doViewsOverlayBackwardAnimation({
    newViewDOM,
    animationTime,
    ctnWidth
}: ViewsCommonOverlayAnimation): Promise<void> {
    return new Promise(
        (resolve): void => {
            const transform = `translate3d(${-1 * ctnWidth + "px"},0,0)`;
            const endTransform = `translate3d(0,0,0)`;

            newViewDOM.style.display = "block";

            FX.doTransitionAnimation({
                element: newViewDOM,
                startProps: {
                    WebkitTransform: transform,
                    transform,
                    opacity: 0
                },
                transitionProps: getCommonTransitionsSpec(animationTime),
                endProps: {
                    WebkitTransform: endTransform,
                    transform: endTransform,
                    opacity: 1
                },
                preAnimationCallback: (): void => {
                    newViewDOM.style.zIndex = "102";
                },
                endAfter: animationTime,
                endCallback: (): void => {
                    clearElementAnimationsStyles(newViewDOM);
                    resolve();
                }
            });
        }
    );
}
export function doViewsOverlayAnimation({
    newViewDOM,
    oldViewDOM,
    direction,
    animationTime,
    ctnWidth,
    ctnHeight,
    stackMode
}: ViewsOverlayAnimation): Promise<void> {
    let promise: Promise<void>;

    if (direction === 1) {
        promise = doViewsOverlayForwardAnimation({ newViewDOM, animationTime, ctnWidth });
    } else {
        if (stackMode) {
            promise = doViewsOverlayBackwardStackAnimation({
                newViewDOM,
                oldViewDOM,
                animationTime,
                ctnWidth,
                ctnHeight
            });
        } else {
            promise = doViewsOverlayBackwardAnimation({ newViewDOM, animationTime, ctnWidth });
        }
    }

    return promise;
}
export function doViewsFadeAnimation(
    newViewDOM: HTMLElement,
    animationTime: number
): Promise<void> {
    return new Promise(
        (resolve): void => {
            FX.doTransitionAnimation({
                element: newViewDOM,
                startProps: {
                    display: "block",
                    opacity: 0
                },
                transitionProps: [`opacity ${animationTime}ms ease-out`],
                endProps: {
                    opacity: 1
                },
                preAnimationCallback: (): void => {
                    newViewDOM.style.zIndex = "102";
                },
                endAfter: animationTime,
                endCallback: (): void => {
                    clearElementAnimationsStyles(newViewDOM);
                    resolve();
                }
            });
        }
    );
}
function getSlideAnimationProps(
    direction: 1 | -1,
    sceneWidth: number
): { startProps: CSSProperties; endProps: CSSProperties } {
    let startProps: CSSProperties = {};
    let endProps: CSSProperties = {};

    if (direction === -1) {
        const transform = "translate3d(" + -1 * sceneWidth + "px,0,0)";
        const endTransform = "translate3d(0,0,0)";
        startProps = {
            WebkitTransform: transform,
            transform
        };
        endProps = {
            WebkitTransform: endTransform,
            transform: endTransform
        };
    } else {
        const transform = "translate3d(" + -1 * sceneWidth + "px,0,0)";
        endProps.WebkitTransform = transform;
        endProps.transform = transform;
    }

    return { startProps, endProps };
}
export function doViewsSlideAnimation(
    newViewDOM: HTMLElement,
    sceneWidth: number,
    ctnDOM: HTMLElement,
    direction: 1 | -1,
    animationTime: number
): Promise<void> {
    return new Promise(
        (resolve): void => {
            const { startProps, endProps } = getSlideAnimationProps(direction, sceneWidth);
            newViewDOM.style.display = "block";

            FX.doTransitionAnimation({
                element: ctnDOM,
                startProps,
                transitionProps: [`transform ${animationTime}ms ease-out`],
                endProps,
                endAfter: animationTime,
                endCallback: (): void => {
                    clearElementAnimationsStyles(newViewDOM);
                    clearElementAnimationsStyles(ctnDOM);
                    resolve();
                }
            });
        }
    );
}
