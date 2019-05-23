import { RefObject, ReactNode, CSSProperties } from "react";
import { Placement } from "./airr-react";
import Sidepanel from "./Sidepanel";

export interface Props {
    /**
     * Side to which sidepanel will be attached
     */
    side: Placement;
    /**
     * Bool determining if sidepanel is shown or not
     */
    isShown: boolean;
    /**
     * Bool determining if sidepanel is enabled.
     */
    enabled: boolean;
    /**
     * Number between 0 and 1 determining how much size of whole screen sidepanel will take
     */
    sizeFactor: number;
    /**
     * Parent scene width dimension. Set by parent scene. Do not overwrite!.
     */
    sceneWidth: number;
    /**
     * Parent scene height dimension. Set by parent scene. Do not overwrite!.
     */
    sceneHeight: number;
    /**
     * Callback invoked when sidepanel changes its visibility during touch events. Set by parent scene. Do not overwrite!.
     */
    visibilityCallback: (isShown: boolean) => void;
    /**
     * Animation time in miliseconds
     */
    animationTime: number;
    /**
     * Boolean saying if parent scene has any open mayer. Set by parent scene. Do not overwrite!.
     */
    sceneHasMayers: boolean;
    /**
     * Opacity between 0 and 1
     */
    bgLayerOpacity: number;
    children?: ReactNode;
    ref?: RefObject<Sidepanel>;
}
export type Axis = "X" | "Y";
export interface DOMNodesStyles {
    dragCtnStyle: CSSProperties;
    sidepanelStyle: CSSProperties;
    bgLayerStyle: CSSProperties;
}
