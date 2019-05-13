import * as React from "react";
import { ComponentClass } from "react";
import { Props } from "../SceneRenderer.d";
import { Props as SidepanelProps } from "../Sidepanel.d";

interface SidepanelRendererProps {
    type: ComponentClass<SidepanelProps, any>;
    props: SidepanelProps;
    refCOMPSidepanel: Props["refCOMPSidepanel"];
    visibilityCallback: Props["sidepanelVisibilityCallback"];
}
export default React.memo<SidepanelRendererProps>(function SidepanelRenderer({
    type,
    refCOMPSidepanel,
    visibilityCallback,
    props
}: SidepanelRendererProps): any {
    if (!props.ref) {
        props.ref = refCOMPSidepanel;
    }
    if (!props.visibilityCallback) {
        props.visibilityCallback = visibilityCallback;
    }
    if (typeof props.enabled === "undefined") {
        props.enabled = true; //force explicit value, e.g needed when checking if panel is enabled in `openMayer` method
    }

    return React.createElement(type, props);
});
