import * as React from "react";
import { ComponentClass } from "react";
import { Props } from "../SceneRenderer.d";
import { Props as SidepanelProps } from "../Sidepanel.d";

interface SidepanelRendererProps {
    type: ComponentClass<SidepanelProps, any>;
    props: SidepanelProps;
    refCOMPSidepanel: Props["refCOMPSidepanel"];
    visibilityCallback: Props["sidepanelVisibilityCallback"];
    sceneHasMayers: boolean;
}
const SidepanelRenderer = React.memo<SidepanelRendererProps>(function SidepanelRenderer({
    type,
    refCOMPSidepanel,
    visibilityCallback,
    sceneHasMayers,
    props
}: SidepanelRendererProps): React.ReactElement {
    props.sceneHasMayers = sceneHasMayers;
    if (!props.ref) {
        props.ref = refCOMPSidepanel;
    }
    if (!props.visibilityCallback) {
        props.visibilityCallback = visibilityCallback;
    }

    return React.createElement(type, props);
});
SidepanelRenderer.displayName = "SidepanelRenderer";
export default SidepanelRenderer;
