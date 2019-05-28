import { Sidepanel } from "./Airr";
import { Axis, DOMNodesStyles } from "./Sidepanel";
import { isTopOrLeftPlacement, isLeftOrRightPlacement } from "./Utils";
import { Placement } from "./Airr";
import { CSSProperties } from "react";

export function makeNewValStickyToLimits(newVal: number, limit1: number, limit2: number): number {
    if (newVal < limit1) {
        newVal = limit1;
    } else if (newVal > limit2) {
        newVal = limit2;
    }
    return newVal;
}
/**
 * Get progress value for top or left side
 */
export function getProgressValueForTLSide(newVal: number, size: number): number {
    return 1 - Math.abs(newVal / size);
}
/**
 * Get progress value for bottom or right side
 */
export function getProgressValueForBRSide(newVal: number, size: number, sceneSize: number): number {
    return (sceneSize - newVal) / size;
}
function fixProgressValue(progress: number): number {
    if (progress > 1) {
        return 1;
    }

    if (progress < 0) {
        return 0;
    }

    return progress;
}
export function updateDOMItemsStyles(newVal: number, progress: number, sidepanel: Sidepanel): void {
    if (newVal !== sidepanel.currentVal) {
        sidepanel.currentVal = newVal;
        const newProgress = fixProgressValue(progress);
        const transform = sidepanel.transformScheme.replace("%v", String(sidepanel.currentVal));
        const dragCtn = sidepanel.refDOMDragCtn.current;
        sidepanel.refDOMBgLayer.current.style.opacity = String(
            newProgress * sidepanel.props.bgLayerOpacity
        );
        dragCtn.style.webkitTransform = transform;
        dragCtn.style.transform = transform;
    }
}
export function bubbleChildTillParent(
    child: Element,
    parent: Element,
    tillElements: Element[]
): boolean {
    if (child.parentNode === parent) {
        return true;
    } else {
        if (!child.parentElement || tillElements.indexOf(child.parentElement) !== -1) {
            return false;
        } else {
            return bubbleChildTillParent(child.parentElement, parent, tillElements);
        }
    }
}
export function getPosition(e: TouchEvent | MouseEvent, axis: Axis): number {
    const obj = "changedTouches" in e ? e.changedTouches[0] : e;
    return axis === "X" ? obj.clientX : obj.clientY;
}

export function getLastPosition(e: TouchEvent | MouseEvent): { clientX: number; clientY: number } {
    const obj = "changedTouches" in e ? e.changedTouches[0] : e;
    return { clientX: obj.clientX, clientY: obj.clientY };
}
export function getEventPos(e: TouchEvent | MouseEvent, axis: Axis): number {
    return "changedTouches" in e ? e.changedTouches[0]["client" + axis] : e["client" + axis];
}
export function updateShownVal(sidepanel: Sidepanel): void {
    if (isTopOrLeftPlacement(sidepanel.props.side)) {
        sidepanel.shownVal = 0;
    } else {
        sidepanel.shownVal = sidepanel.sceneSize - sidepanel.size;
    }
}
export function updateCurrentVal(sidepanel: Sidepanel): void {
    if (sidepanel.props.isShown) {
        sidepanel.currentVal = sidepanel.shownVal;
    } else {
        sidepanel.currentVal = sidepanel.hiddenVal;
    }
}
export function updateLastVals(sidepanel: Sidepanel): void {
    sidepanel.lastSide = sidepanel.props.side;
    sidepanel.lastSizeFactor = sidepanel.props.sizeFactor;
    sidepanel.lastSceneWidth = sidepanel.props.sceneWidth;
    sidepanel.lastSceneHeight = sidepanel.props.sceneHeight;
}
export function getClassName(side: Placement, enabled: boolean): string {
    return "airr-sidepanel " + side + " " + (enabled ? "enabled" : "disabled");
}
export function getDOMNodesStyles(sidepanel: Sidepanel): DOMNodesStyles {
    const dragCtnStyle = { width: "", height: "", transform: "", WebkitTransform: "" };
    let sidepanelStyle: CSSProperties;
    let bgLayerStyle: CSSProperties;
    let dragCtnTransform: string;

    if (isLeftOrRightPlacement(sidepanel.props.side)) {
        dragCtnStyle.width = sidepanel.size + "px";
        dragCtnStyle.height = "100%";
    } else {
        //top,bottom
        dragCtnStyle.height = sidepanel.size + "px";
        dragCtnStyle.width = "100%";
    }

    if (sidepanel.props.isShown) {
        dragCtnTransform = sidepanel.transformScheme.replace("%v", String(sidepanel.shownVal));
        sidepanelStyle = { display: "block" };
        bgLayerStyle = { opacity: sidepanel.props.bgLayerOpacity };
    } else {
        dragCtnTransform = sidepanel.transformScheme.replace("%v", String(sidepanel.hiddenVal));
        sidepanelStyle = { display: "none" };
        bgLayerStyle = { opacity: 0 };
    }
    dragCtnStyle.WebkitTransform = dragCtnTransform;
    dragCtnStyle.transform = dragCtnTransform;

    return { dragCtnStyle, sidepanelStyle, bgLayerStyle };
}
