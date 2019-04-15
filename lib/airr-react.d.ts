import { ReactNode, CSSProperties, ComponentClass } from "react";
import { Props as ViewProps } from "./AirrView";
import { Props as SidepanelProps } from "./AirrSidepanel";

export type Placement = "top" | "bottom" | "left" | "right";
export type AnimationType = "slide" | "overlay" | "fade";
export interface ViewConfig {
    /**
     * Refference to class or function that will render AirrView. The most common and adviced approach is to use AirrViewWrapper.
     */
    type: ComponentClass<ViewProps, any>;
    /**
     * Special properties of AirrView class. Go to class declaration for further properties documenation.
     */
    props: ViewProps;
}
export interface CSSStringProperties extends CSSProperties {
    [index: string]: string | {};
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
    type: ComponentClass<SidepanelProps, any>;
    /**
     * Special properties of AirrSidepanel class. Go to class declaration for further properties documenation.
     */
    props: SidepanelProps;
}
