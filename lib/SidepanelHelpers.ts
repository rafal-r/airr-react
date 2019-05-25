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
 * Get progress value for top or left side
 */
export function getProgressValueForBRSide(newVal: number, size: number, sceneSize: number): number {
    return (sceneSize - newVal) / size;
}
