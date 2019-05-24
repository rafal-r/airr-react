import FX from "../FX";
import { CSSProperties } from "react";
import { clearElementAnimationsStyles } from "../FXHelpers";
import { Direction } from "../airr-react.d";

interface NavbarTitleElementAnimationConfig {
    element: HTMLElement;
    direction: Direction;
    mockTextSpanWidth: number;
    animationTime: number;
    titleNodeWidth?: number;
    target: "title" | "mock-title";
}
export function getCommonTransitionsSpec(animationTime: number): string[] {
    return [`opacity ${animationTime}ms ease-out`, `transform ${animationTime}ms ease-out`];
}
export function doNavbarTitleElementAnimation({
    target,
    element,
    direction,
    mockTextSpanWidth,
    titleNodeWidth,
    animationTime
}: NavbarTitleElementAnimationConfig): void {
    let startTransform: string, endTransform: string, startOpacity: number, endOpacity: number;

    if (target === "title" && titleNodeWidth) {
        startTransform = `translate3d(${(titleNodeWidth / 2 + mockTextSpanWidth / 2) * direction +
            "px"},0,0)`;
        endTransform = "translate3d(0,0,0)";
        startOpacity = 0;
        endOpacity = 1;
    } else {
        startTransform = "translate3d(0,0,0)";
        endTransform = `translate3d(${mockTextSpanWidth * direction * -1 + "px"},0,0)`;
        startOpacity = 1;
        endOpacity = 0;
    }

    FX.doTransitionAnimation({
        element,
        startProps: {
            WebkitTransform: startTransform,
            transform: startTransform,
            opacity: startOpacity
        },
        transitionProps: getCommonTransitionsSpec(animationTime),
        endProps: {
            WebkitTransform: endTransform,
            transform: endTransform,
            opacity: endOpacity
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
            clearElementAnimationsStyles(element);
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
interface DoNavbarItemsAnimationArg {
    newViewIndex: number;
    oldViewIndex: number;
    direction: Direction;
    titleNode: HTMLElement;
    mockTitle: HTMLElement;
    animationTime: number;
    backDOM?: HTMLElement;
}
export function doNavbarItemsAnimation({
    newViewIndex,
    oldViewIndex,
    direction,
    titleNode,
    mockTitle,
    animationTime,
    backDOM
}: DoNavbarItemsAnimationArg): void {
    //perform navbar animations
    const mockTextSpan = mockTitle && mockTitle.children[0];
    const mockTextSpanWidth = mockTextSpan ? mockTextSpan.clientWidth : 0;

    if (titleNode) {
        doNavbarTitleElementAnimation({
            target: "title",
            element: titleNode,
            titleNodeWidth: titleNode.clientWidth,
            direction,
            mockTextSpanWidth: mockTextSpanWidth,
            animationTime
        });
    }

    if (mockTitle) {
        doNavbarTitleElementAnimation({
            target: "mock-title",
            element: mockTitle,
            direction,
            mockTextSpanWidth,
            animationTime
        });
    }

    if (backDOM) {
        if (oldViewIndex === 0) {
            doBackButtonAnimation("show", backDOM, animationTime);
        } else if (newViewIndex === 0) {
            //hide backbutton with animation
            doBackButtonAnimation("hide", backDOM, animationTime);
        }
    }
}
