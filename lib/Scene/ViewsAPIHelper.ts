import Scene from "../Scene";
// import { Props as ViewProps } from "../ViewRenderer";
import { ViewProps } from "../ViewRenderer";
import { ViewConfig, CommonViewProps } from "../Airr";
import { SceneProps, ViewsConfigItem } from "../Scene";
import update from "immutability-helper";
import { performViewsTransition, getViewsTransitionConfig } from "./ViewsAnimationHelpers";

export default class ViewsAPIHelper {
    /**
     * Make modification to scene's views by pushing new, updating current or changing between added views
     */
    static changeView(
        scene: Scene,
        view: string | ViewConfig<CommonViewProps>,
        viewProps: ViewProps | {} = {},
        sceneProps: SceneProps | {} = {}
    ): Promise<string> {
        let promiseToReturn: Promise<string>;

        if (typeof view === "string") {
            if (scene.hasViewInState(view)) {
                //if already in state then update its props
                promiseToReturn = new Promise(
                    (resolve): void => {
                        const viewIndex = scene.getViewIndex(view);
                        const currentViewConfig = Object.assign(
                            { sceneProps: {} }, //for a default props which will be latter used
                            scene.state.views[viewIndex]
                        );
                        const newViewConfig = update(currentViewConfig, {
                            props: {
                                $set: {
                                    ...currentViewConfig.props,
                                    ...viewProps
                                }
                            }
                        });

                        let stateChange = {
                            name: scene.props.name, //special fix for TS not to report missing 'name' prop error, TODO find better solution
                            views: update(scene.state.views, {
                                [viewIndex]: {
                                    $set: newViewConfig
                                }
                            }),
                            ...currentViewConfig.sceneProps,
                            ...Object.assign({}, sceneProps)
                        };

                        scene.setState(stateChange, (): void => resolve(view));
                    }
                );
            } else if (scene.hasViewInConfig(view)) {
                //push fresh config
                promiseToReturn = ViewsAPIHelper.pushView(
                    scene,
                    scene.getFreshViewConfig(view, viewProps),
                    sceneProps
                );
            } else return Promise.reject();
        } else if (scene.isValidViewConfig(view)) {
            //push allready prepared config
            promiseToReturn = ViewsAPIHelper.pushView(
                scene,
                Object.assign({}, view, {
                    props: { ...view.props, ...viewProps }
                }),
                sceneProps
            );
        } else {
            promiseToReturn = Promise.reject("Invalid `view` argument specify");
        }

        return promiseToReturn;
    }

    /**
     * Helper method for pushing new view config into this.state.views array
     */
    static pushView<T>(
        scene: Scene,
        config: ViewsConfigItem<T>,
        sceneProps: SceneProps | {} = {}
    ): Promise<string> {
        const newviewdefinition = update(scene.state.views, { $push: [config] });
        const stateChange = Object.assign(
            {
                views: newviewdefinition
            },
            Object.assign({}, config.sceneProps || {}),
            Object.assign({}, sceneProps || {})
        );

        return new Promise(
            (resolve): void => scene.setState(stateChange, (): void => resolve(config.props.name))
        );
    }

    /**
     * Utility function that changes views with animation
     */
    static performViewsAnimation(scene: Scene, newViewName: string): Promise<void> {
        if (typeof newViewName === "string") {
            scene.viewChangeInProgress = true;

            return new Promise(
                (resolve, reject): void => {
                    if (newViewName === scene.state.activeViewName) {
                        console.warn("[] This View is already active.");
                        scene.viewChangeInProgress = false;
                        return resolve();
                    }
                    if (scene.getViewIndex(newViewName) === -1) {
                        scene.viewChangeInProgress = false;
                        console.warn(
                            "[] View with name " + newViewName + " is not presence in this Scene."
                        );
                        return reject();
                    }

                    scene.setState(
                        { GUIDisabled: true, mockTitleName: newViewName },
                        (): void => {
                            performViewsTransition(
                                getViewsTransitionConfig(newViewName, scene, resolve)
                            );
                        }
                    );
                }
            );
        } else {
            console.warn("[] You must specify view name property as string value");
            return Promise.reject();
        }
    }

    static invokeActivationEffectOnActiveView = (scene: Scene): void => {
        if (
            scene.state.activeViewName &&
            scene.refsCOMPViews[scene.state.activeViewName] &&
            typeof scene.refsCOMPViews[scene.state.activeViewName].current.viewAfterActivation ===
                "function"
        ) {
            scene.refsCOMPViews[scene.state.activeViewName].current.viewAfterActivation();
        }
    };
}
