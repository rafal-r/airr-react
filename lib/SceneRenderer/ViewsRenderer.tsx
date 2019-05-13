import * as React from "react";
import { ReactElement } from "react";
import { Props } from "../SceneRenderer.d";
import ViewsMapper, { ViewsMapperProps } from "./ViewsMapper";

interface ViewsRendererProps extends ViewsMapperProps {
    className: Props["className"];
    refDOMContainer: Props["refDOMContainer"];
    containersHeight: Props["containersHeight"];
}

export default React.memo<ViewsRendererProps>(function ViewsRenderer({
    views,
    className = "",
    refDOMContainer,
    activeViewName,
    containersHeight,
    refsCOMPViews
}: ViewsRendererProps): ReactElement<any> {
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
            />
        </div>
    );
});
