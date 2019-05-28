import { ReactNode } from "react";
import { Placement } from "./Airr";

export function getProperContent(content: ReactNode, children: ReactNode): ReactNode {
    if (content === undefined) {
        return typeof children === "function" ? children() : children;
    }

    return content;
}
export function isLeftOrRightPlacement(placement: Placement): boolean {
    return placement === "left" || placement === "right";
}
export function isTopOrLeftPlacement(placement: Placement): boolean {
    return placement === "top" || placement === "left";
}
export function isBottomOrRightPlacement(placement: Placement): boolean {
    return placement === "bottom" || placement === "right";
}
export function isTopOrBottomPlacement(placement: Placement): boolean {
    return placement === "bottom" || placement === "top";
}
