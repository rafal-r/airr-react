import FX from "./FX";
import { CSSProperties } from "react";

interface NavbarMockTitleAnimationConfig {
    element: HTMLElement;
    direction: 1 | -1;
    mockTextSpanWidth: number;
    animationTime: number;
}
interface NavbarTitleAnimationConfig extends NavbarMockTitleAnimationConfig {
    titleNodeWidth: number;
}
function getCommonTransitionsSpec(animationTime: number): string[] {
    return [`opacity ${animationTime}ms ease-out`, `transform ${animationTime}ms ease-out`];
}
export function clearViewAnimationStyles(view: HTMLElement): void {
    view.style.display = "";
    view.style.opacity = "";
    view.style.transform = "";
    view.style.transition = "";
    view.style.webkitTransform = "";
    view.style.webkitTransition = "";
    view.style.zIndex = "";
    view.style.webkitBackfaceVisibility = "";
    view.style.backfaceVisibility = "";
}
export function doNavbarTitleAnimation({
    element,
    titleNodeWidth,
    direction,
    mockTextSpanWidth,
    animationTime
}: NavbarTitleAnimationConfig): void {
    const transform = `translate3d(${(titleNodeWidth / 2 + mockTextSpanWidth / 2) * direction +
        "px"},0,0)`;
    const endTransform = "translate3d(0,0,0)";

    FX.doTransitionAnimation({
        element,
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
        endAfter: animationTime
    });
}
export function doNavbarMockTitleAnimation({
    element,
    direction,
    mockTextSpanWidth,
    animationTime
}: NavbarMockTitleAnimationConfig): void {
    const startTransform = "translate3d(0,0,0)";
    const endTransform = `translate3d(${mockTextSpanWidth * direction * -1 + "px"},0,0)`;

    FX.doTransitionAnimation({
        element,
        startProps: {
            WebkitTransform: startTransform,
            transform: startTransform,
            opacity: 1
        },
        transitionProps: getCommonTransitionsSpec(animationTime),
        endProps: {
            WebkitTransform: endTransform,
            transform: endTransform,
            opacity: 0
        },
        endAfter: animationTime
    });
}
export function doBackButtonAnimation(
    type: "hide" | "show",
    element: HTMLElement,
    animationTime: number
): void {
    let startProps: CSSProperties,
        endProps: CSSProperties,
        preAnimationCallback: () => void = (): void => {},
        endCallback: () => void = (): void => {};

    const transform = type === "show" ? "translate3d(100%,0,0)" : "translate3d(0,0,0)";
    const endTransform = type === "show" ? "translate3d(0,0,0)" : "translate3d(-100%,0,0)";
    const startOpacity = type === "show" ? 0 : 1;
    const endOpacity = type === "show" ? 1 : 0;

    if (type === "show") {
        preAnimationCallback = (): void => {
            element.classList.remove("hidden");
        };
    } else {
        endCallback = (): void => {
            clearViewAnimationStyles(element);
        };
    }

    startProps = {
        WebkitTransform: transform,
        transform,
        opacity: startOpacity
    };
    endProps = {
        WebkitTransform: endTransform,
        transform: endTransform,
        opacity: endOpacity
    };

    FX.doTransitionAnimation({
        element,
        startProps,
        transitionProps: getCommonTransitionsSpec(animationTime),
        endProps,
        preAnimationCallback,
        endAfter: animationTime,
        endCallback
    });
}
