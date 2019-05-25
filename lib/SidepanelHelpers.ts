import { Sidepanel } from "./Airr";

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
    if (newVal !== sidepanel.getCurrentVal()) {
        sidepanel.setCurrentVal(newVal);
        const newProgress = fixProgressValue(progress);
        const transform = sidepanel
            .getTransformScheme()
            .replace("%v", String(sidepanel.getCurrentVal()));
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
