import * as React from "react";
import { ReactNode } from "react";
import { Props } from "../SceneRenderer.d";
import Mayer from "../Mayer";

interface MayersRendererProps {
    mayers: Props["mayers"];
}
const MayersRenderer = React.memo<MayersRendererProps>(function MayersRenderer({
    mayers
}: MayersRendererProps): any {
    return mayers.map(
        ({ name, ...props }): ReactNode => {
            return <Mayer key={name} name={name} {...props} />;
        }
    );
});
MayersRenderer.displayName = "MayersRenderer";
export default MayersRenderer;
