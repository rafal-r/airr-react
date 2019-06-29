import * as React from "react";
import { ReactElement } from "react";
import { Props } from "../SceneRenderer";
import ViewRenderer from "../ViewRenderer";
import { SceneProps } from "../Scene";

export type ViewsMapperProps<P extends SceneProps = SceneProps> = Partial<P> & {
    views: Props["views"];
    activeViewName: Props["activeViewName"];
    refsCOMPViews: Props["refsCOMPViews"];
};
const ViewsMapper = React.memo(function ViewsMapper<P extends SceneProps = SceneProps>({
    views,
    activeViewName,
    refsCOMPViews,
    ...restProps
}: ViewsMapperProps<P>): any {
    //TODO
    console.log("views mapper render");

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

            if (item.feedWithProps) {
                item.feedWithProps.forEach(prop => {
                    if (prop in restProps) {
                        item.props[prop] = restProps[prop];
                    }
                });
            }

            return React.createElement(item.type, item.props);
        }
    );
});
ViewsMapper.displayName = "ViewsMapper";
export default ViewsMapper;
