import { ViewsArray } from "./SceneRenderer";
import Mayer, { Props as MayerProps } from "./Mayer";
import Sidepanel from "./Sidepanel";
import Scene, { SceneProps, SceneState, ViewConfig, CommonViewProps, ViewsConfig } from "./Scene";
import View from "./View";
import { doTransitionAnimation, doVerticalScrollAnimation } from "./FX";
import { supportPassive, isMobileDevice } from "./eventHelpers";
import { ReactNode } from "react";
import { ViewProps } from "./ViewRenderer";
import { Props as SidepanelProps } from "./Sidepanel";
import { TSValidateViewsConfig } from "./Scene/Helpers";

export type Placement = "top" | "bottom" | "left" | "right";
function isPlacement(val?: string): val is Placement {
    if (val && (val === "top" || val === "bottom" || val === "let" || val === "right")) {
        return true;
    }
    return false;
}
export type AnimationType = "slide" | "overlay" | "fade";
function isAnimation(val?: string): val is AnimationType {
    if (val && (val === "slide" || val === "overlay" || val === "fade")) {
        return true;
    }
    return false;
}
export type NavbarMenu = "toggleSidepanel" | ReactNode[];
export interface TouchPosition {
    [index: string]: number;
    clientX: number;
    clientY: number;
}
export interface SidepanelConfig {
    /**
     * Reference to class or function that will render AirrSidepanel. Might be AirrSidepanel itself.
     */
    type: React.ComponentClass<SidepanelProps>;
    /**
     * Special properties of AirrSidepanel class. Go to class declaration for further properties documenation.
     */
    props: SidepanelProps;
}
export type Direction = 1 | -1;

export const Helpers = { supportPassive, isMobileDevice };
//Typescript related things:
export {
    ViewProps,
    SceneProps,
    SceneState,
    ViewConfig,
    CommonViewProps,
    ViewsConfig,
    MayerProps,
    ViewsArray,
    TSValidateViewsConfig,
    isPlacement,
    isAnimation
};
//FX functions:
export { doTransitionAnimation, doVerticalScrollAnimation };
//Main lib classes:
export { Mayer, Sidepanel, Scene, View };
