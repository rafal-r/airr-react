import * as React from "react";
import { Props } from "../SceneRenderer.d";

interface ChildrenRendererProps {
    children: Props["children"];
}
export default React.memo<ChildrenRendererProps>(function ChildrenRenderer({
    children,
    ...rest
}: ChildrenRendererProps): any {
    return typeof children === "function" ? children(rest) : children;
});
