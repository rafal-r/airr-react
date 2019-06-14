import * as React from "react";
import { Props } from "../SceneRenderer";
import { SidepanelConfig } from "../Airr";

interface SidepanelRendererProps extends SidepanelConfig {
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
