import { ReactNode } from "react";

export function getProperContent(content: ReactNode, children: ReactNode): ReactNode {
    if (content === undefined) {
        return typeof children === "function" ? children() : children;
    }

    return content;
}
