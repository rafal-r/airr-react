import { ReactNode, CSSProperties, ReactHTML } from "react";
import { Props as ViewProps } from "./AirrView";

export type Placement = "top" | "bottom" | "left" | "right";
export type AnimationType = "slide" | "overlay" | "fade";
export interface ViewConfig {
    /**
     * Refference to class or function that will render AirrView. The most common and adviced approach is to use AirrViewWrapper.
     */
    type: keyof ReactHTML;
    /**
     * Special properties of AirrView class. Go to class declaration for further properties documenation.
     */
    props: ViewProps;
}
export interface CSSStringProperties extends CSSProperties {
    [index: string]: string | {};
}
export type NavbarMenu = "toggleSidepanl" | ReactNode[];
export type ChildrenProp = ReactNode | ((props?: {}) => ReactNode);
export interface TouchPosition {
    [index: string]: number;
    clientX: number;
    clientY: number;
}
