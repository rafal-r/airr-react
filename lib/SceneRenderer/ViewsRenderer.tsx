import * as React from "react";
import { ReactElement } from "react";
import { Props } from "../SceneRenderer";
import ViewsMapper, { ViewsMapperProps } from "./ViewsMapper";
import { SceneProps } from "../Scene";

type ViewsRendererProps<P extends SceneProps = SceneProps> = ViewsMapperProps<P> & {
    className: Props["className"];
    refDOMContainer: Props["refDOMContainer"];
    containersHeight: Props["containersHeight"];
};

const ViewsRenderer = React.memo(function ViewsRenderer({
    views,
    className = "",
    refDOMContainer,
    activeViewName,
    containersHeight,
    refsCOMPViews,
    ref,
    key,
    ...restProps
}: ViewsRendererProps): ReactElement {
    return (
        <div
            className={"airr-container " + className}
            ref={refDOMContainer}
            style={containersHeight ? { height: containersHeight } : null}
        >
            <ViewsMapper
                views={views}
                activeViewName={activeViewName}
                refsCOMPViews={refsCOMPViews}
                {...restProps}
            />
        </div>
    );
});
ViewsRenderer.displayName = "ViewsRenderer";
export default ViewsRenderer;
