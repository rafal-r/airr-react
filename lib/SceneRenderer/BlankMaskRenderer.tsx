import * as React from "react";
import { ReactElement } from "react";
import { Props } from "../SceneRenderer.d";

interface BlankMaskRendererProps {
    GUIDisabled: Props["GUIDisabled"];
    GUIDisableCover: Props["GUIDisableCover"];
}
const BlankMaskRenderer = React.memo<BlankMaskRendererProps>(function BlankMaskRenderer({
    GUIDisabled,
    GUIDisableCover
}: BlankMaskRendererProps): ReactElement {
    return GUIDisabled && <div className="airr-blank-mask">{GUIDisableCover}</div>;
});
BlankMaskRenderer.displayName = "BlankMaskRenderer";
export default BlankMaskRenderer;
