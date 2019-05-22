import View from "../View";
import { doNavbarItemsAnimation } from "./ItemsAnimationHelpers";
import {
    doViewsSlideAnimation,
    doViewsOverlayAnimation,
    doViewsFadeAnimation
} from "./ViewsAnimationHelpers";
import { NavbarProp } from "../SceneRenderer.d";
import { AnimationType } from "../airr-react";
import Scene from "../Scene";

function invokeViewsAfterEffects(newViewComp: View, oldViewComp: View): void {
    if (newViewComp && typeof newViewComp.viewAfterActivation === "function") {
        newViewComp.viewAfterActivation();
    }

    if (oldViewComp && typeof oldViewComp.viewAfterDeactivation === "function") {
        oldViewComp.viewAfterDeactivation();
    }
}
interface DoViewsAnimationConfig {
    newViewComp: View;
    oldViewComp: View;
    newViewIndex: number;
    oldViewIndex: number;
    navbar: NavbarProp;
    animationTime: number;
    animation: AnimationType;
    stackMode: boolean;
    ctnDOM: HTMLElement;
    sceneWidth: number;
    mockTitle?: HTMLElement;
    titleNode?: HTMLElement;
    backDOM?: HTMLElement;
}
function doViewsAnimation({
    newViewComp,
    oldViewComp,
    newViewIndex,
    oldViewIndex,
    navbar,
    mockTitle,
    titleNode,
    backDOM,
    animation,
    animationTime,
    stackMode,
    ctnDOM,
    sceneWidth
}: DoViewsAnimationConfig): Promise<void> {
    return new Promise(
        (resolve): void => {
            const oldViewName = oldViewComp.props.name;
            const newViewDOM = newViewComp.refDOM.current;
            const oldViewDOM = oldViewComp.refDOM.current;

            const direction = newViewIndex > oldViewIndex ? 1 : -1;

            if (!newViewDOM) {
                throw new Error("new view DOM refference was not found");
            }

            if (navbar) {
                doNavbarItemsAnimation({
                    newViewIndex,
                    oldViewIndex,
                    direction,
                    mockTitle,
                    titleNode,
                    backDOM,
                    animationTime
                });
            }

            if (animation === "slide" && oldViewName) {
                doViewsSlideAnimation(
                    newViewDOM,
                    sceneWidth,
                    ctnDOM,
                    direction,
                    animationTime
                ).then(resolve);
            } else if (animation === "overlay" && oldViewName) {
                doViewsOverlayAnimation({
                    newViewDOM,
                    oldViewDOM,
                    direction,
                    animationTime,
                    ctnWidth: ctnDOM.clientWidth,
                    ctnHeight: ctnDOM.clientHeight,
                    stackMode
                }).then(resolve);
            } else if (animation === "fade" || !oldViewName) {
                doViewsFadeAnimation(newViewDOM, animationTime).then(resolve);
            }
        }
    );
}
interface PerformViewsTransitionConfig extends DoViewsAnimationConfig {
    animEndCallback: () => void;
}
export function performViewsTransition({
    newViewComp,
    oldViewComp,
    newViewIndex,
    oldViewIndex,
    navbar,
    mockTitle,
    titleNode,
    backDOM,
    animation,
    animationTime,
    stackMode,
    ctnDOM,
    sceneWidth,
    animEndCallback
}: PerformViewsTransitionConfig): void {
    if (newViewComp && typeof newViewComp.viewBeforeActivation === "function") {
        newViewComp.viewBeforeActivation();
    }

    if (oldViewComp && typeof oldViewComp.viewBeforeDeactivation === "function") {
        oldViewComp.viewBeforeDeactivation();
    }

    if (animation) {
        doViewsAnimation({
            newViewComp,
            oldViewComp,
            newViewIndex,
            oldViewIndex,
            navbar,
            mockTitle,
            titleNode,
            backDOM,
            animation,
            animationTime,
            stackMode,
            ctnDOM,
            sceneWidth
        }).then(
            (): void => {
                animEndCallback();
            }
        );
    } else {
        animEndCallback();
    }
}

function scenePreAnimEndStateChange(scene: Scene, newViewName: string): Promise<void> {
    return new Promise(resolve => {
        scene.setState(
            {
                activeViewName: newViewName,
                GUIDisabled: false,
                mockTitleName: null
            },
            resolve
        );
    });
}

export function getViewsTransitionConfig(
    newViewName: string,
    scene: Scene,
    callback: () => void
): PerformViewsTransitionConfig {
    const oldViewName = scene.state.activeViewName;
    const newViewComp = scene.refsCOMPViews[newViewName].current;
    const oldViewComp = scene.refsCOMPViews[oldViewName].current;
    const newViewIndex = scene.getViewIndex(newViewName);
    const oldViewIndex = scene.getViewIndex(oldViewName);

    return {
        newViewComp,
        oldViewComp,
        newViewIndex,
        oldViewIndex,
        navbar: scene.state.navbar,
        titleNode:
            scene.refDOMNavbar.current &&
            (scene.refDOMNavbar.current.querySelector(".title") as HTMLElement),
        mockTitle:
            scene.refDOMNavbar.current &&
            (scene.refDOMNavbar.current.querySelector(".mock-title") as HTMLElement),
        animation: scene.state.animation,
        animationTime: scene.state.animationTime,
        sceneWidth: scene.refDOM.current.clientWidth,
        ctnDOM: scene.refDOMContainer.current,
        stackMode: scene.state.stackMode,
        backDOM:
            scene.state.backButton && !scene.state.backButtonOnFirstView
                ? (scene.refDOMNavbar.current.querySelector(".back") as HTMLElement)
                : null,
        animEndCallback: () => {
            scenePreAnimEndStateChange(scene, newViewName).then(() => {
                scene.viewChangeInProgress = false;

                invokeViewsAfterEffects(newViewComp, oldViewComp);

                if (typeof scene.viewsAnimationEnd === "function") {
                    scene.viewsAnimationEnd(oldViewName, newViewName);
                }

                callback();
            });
        }
    };
}
