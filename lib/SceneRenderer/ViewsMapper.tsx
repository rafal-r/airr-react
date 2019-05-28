import * as React from "react";
import { ReactElement } from "react";
import { Props } from "../SceneRenderer";
import ViewRenderer from "../ViewRenderer";

export interface ViewsMapperProps {
    views: Props["views"];
    activeViewName: Props["activeViewName"];
    refsCOMPViews: Props["refsCOMPViews"];
}
const ViewsMapper = React.memo<ViewsMapperProps>(function ViewsMapper({
    views,
    activeViewName,
    refsCOMPViews
}: ViewsMapperProps): any {
    return views.map(
        (item): ReactElement => {
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
ViewsMapper.displayName = "ViewsMapper";
export default ViewsMapper;
