import * as React from "react";
import { Props } from "../SceneRenderer";

interface ChildrenRendererProps {
    children: Props["children"];
}
const ChildrenRenderer = React.memo<ChildrenRendererProps>(function ChildrenRenderer({
    children,
    ...rest
}: ChildrenRendererProps): React.ReactElement {
    return typeof children === "function" ? children(rest) : children;
});
ChildrenRenderer.displayName = "ChildrenRenderer";
export default ChildrenRenderer;
