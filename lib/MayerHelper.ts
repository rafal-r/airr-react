import FX, { TransitionAnimationConfig } from "./FX";
import { Placement } from "./airr-react";
import { resetCSSAndFireCallback } from "./FXHelpers";
import { isTopOrBottomPlacement } from "./Utils";

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
function getTransformStyle(scale: string, translate: string): string {
    return `scale(${scale}) translate3d(${translate})`;
}
function getOutAnimTransform(headTo: Placement, width: number, height: number): string {
    let scaleValue: string, translateValue: string;

    if (isTopOrBottomPlacement(headTo)) {
        scaleValue = "0,1";
        translateValue = `0,${headTo === "top" ? -1 * height : height}px,0`;
    } else {
        scaleValue = "1,0";
        translateValue = `${headTo === "left" ? -1 * width : width}px,0,0`;
    }
    return getTransformStyle(scaleValue, translateValue);
}
function getInAnimTransform(appearFrom: Placement, width: number, height: number): string {
    let scaleValue: string, translateValue: string;

    if (isTopOrBottomPlacement(appearFrom)) {
        scaleValue = "0,1";
        translateValue = `0,${appearFrom === "bottom" ? height : -1 * height}px,0`;
    } else {
        scaleValue = "1,0";
        translateValue = `${appearFrom === "right" ? width : -1 * width}px,0,0`;
    }
    return getTransformStyle(scaleValue, translateValue);
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
        const endTransform = "scale(1, 1) translate3d(0,0,0)";
        transform = getInAnimTransform(appearFrom, width, height);
        startProps = { WebkitTransform: transform, transform };
        endProps = {
            zIndex: 102,
            WebkitTransform: endTransform,
            transform: endTransform,
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
    const { dom, width, height, t, headTo, callback, appearFrom } = config;

    FX.doTransitionAnimation(
        getOverlayAnimationConfig({ dom, width, height, t, headTo, appearFrom, callback })
    );
}
