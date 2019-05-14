import { RefObject } from "react";
import { CoreSceneProps } from "./SceneRenderer.d";
import { ViewConfig } from "./airr-react";
import View from "./View";

export interface Props extends CoreSceneProps {
    /**
     * This propety changes behaviour of views animation when overlay animation is set
     */
    stackMode: boolean;
}
export interface ViewsConfigItem extends ViewConfig {
    /**
     * Props to modify Scene
     */
    sceneProps?: Props;
    /**
     *
     * Common view configutaion can have nameGenerator function used to create another view name propperty.
     * Gets current state views list as argument.
     * Example:
     * nameGenerator: views => { return "common-view-*".replace("*", views.length + 1);}
     */
    nameGenerator?(views: Props["views"]): string;
}
export interface ViewsConfig {
    /**
     * Simple view configuraion which can be found by key which is also it's name.
     */
    [name: string]: ViewsConfigItem;
}
export interface RefsCOMPViews {
    [viewname: string]: RefObject<View>;
}
