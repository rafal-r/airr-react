import * as React from "react";
import { ReactNode } from "react";
import { Props } from "../SceneRenderer.d";
import ViewRenderer from "../ViewRenderer";

export interface ViewsMapperProps {
    views: Props["views"];
    activeViewName: Props["activeViewName"];
    refsCOMPViews: Props["refsCOMPViews"];
}
export default React.memo<ViewsMapperProps>(function ViewsMapper({
    views,
    activeViewName,
    refsCOMPViews
}: ViewsMapperProps): any {
    return views.map(
        (item): ReactNode => {
            if (item.props.name === activeViewName) {
                item.props.active = true;
            } else {
                item.props.active = false;
            }

            item.props.key = item.props.name;
            if (!item.props.ref) {
                item.props.ref = React.createRef<ViewRenderer>();
                refsCOMPViews[item.props.name] = item.props.ref;
            }

            return React.createElement(item.type, item.props);
        }
    );
});
