import FX, { TransitionAnimationConfig } from "./FX";
import { Placement } from "./airr-react";
import { resetCSSAndFireCallback } from "./FXHelpers";

interface OverlayAnimationConfig {
    dom: HTMLElement;
    width: number;
    height: number;
    t: number;
    callback?: () => void;
    headTo?: Placement; //direction to move out mayer during animation
    appearFrom?: Placement; //direction to move in mayer during animation
}
function getTransitionProps(t: number): string[] {
    return [`opacity ${t}ms ease-out`, `transform ${t}ms ease-out`];
}
function getOutAnimTransform(headTo: Placement, width: number, height: number): string {
    let transform: string;
    if (["top", "bottom"].includes(headTo)) {
        transform = `scale(0, 1) translate3d(0,${headTo === "top" ? -1 * height : height}px,0)`;
    } else {
        transform = `scale(1, 0) translate3d(${headTo === "left" ? -1 * width : width}px,0,0)`;
    }
    return transform;
}
function getInAnimTransform(appearFrom: Placement, width: number, height: number): string {
    let transform: string;
    if (["top", "bottom"].includes(appearFrom)) {
        transform = `scale(0, 1) translate3d(0,${
            appearFrom === "bottom" ? height : -1 * height
        }px,0)`;
    } else {
        transform = `scale(1, 0) translate3d(${appearFrom === "right" ? width : -1 * width}px,0,0)`;
    }
    return transform;
}

function getOverlayAnimationConfig(config: OverlayAnimationConfig): TransitionAnimationConfig {
    const { dom, width, height, t, callback, headTo, appearFrom } = config;
    let startProps: TransitionAnimationConfig["startProps"],
        endProps: TransitionAnimationConfig["endProps"],
        transform: string,
        transitionProps = getTransitionProps(t);

    if (headTo) {
        transform = getOutAnimTransform(headTo, width, height);
        startProps = { opacity: 1 };
        endProps = { zIndex: 102, opacity: 0, WebkitTransform: transform, transform };
    } else if (appearFrom) {
        transform = getInAnimTransform(appearFrom, width, height);
        startProps = { WebkitTransform: transform, transform };
        endProps = {
            zIndex: 102,
            WebkitTransform: "scale(1, 1) translate3d(0,0,0)",
            transform: "scale(1, 1) translate3d(0,0,0)",
            opacity: 1
        };
    }

    return {
        element: dom,
        startProps,
        endProps,
        transitionProps,
        endAfter: t,
        endCallback: (): void => {
            resetCSSAndFireCallback(dom, callback);
        }
    };
}

/**
 * Used by Mayers for leaving animation
 */
export function doOverlayAnimation(config: OverlayAnimationConfig): void {
    const { dom, width, height, t, headTo, callback } = config;

    FX.doTransitionAnimation(
        getOverlayAnimationConfig({ dom, width, height, t, headTo, callback })
    );
}
