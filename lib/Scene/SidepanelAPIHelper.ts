import Scene from "../Scene";
import update from "immutability-helper";

export default class SidepanelAPIHelper {
    /**
     * Toggle scene's sidepanel by setting it enabled property
     */
    static toggleSidepanel = (scene: Scene, enable: boolean): Promise<void> => {
        if (scene.state.sidepanel && scene.refCOMPSidepanel.current) {
            scene.refCOMPSidepanel.current[enable ? "enable" : "disable"]();
            return new Promise(
                (resolve): void =>
                    scene.setState(
                        {
                            sidepanel: update(scene.state.sidepanel, {
                                props: {
                                    enabled: { $set: enable }
                                }
                            })
                        },
                        resolve
                    )
            );
        }
        console.warn(`[Scene] No sidepanel to ${enable ? "enable" : "disable"}`);
        return Promise.resolve();
    };

    /**
     * Utility function for updating sidepanel's sceneWidth,sceneHeight properties
     */
    static updateSidepanelSizeProps(scene: Scene): Promise<void> {
        return new Promise(
            (resolve): void => {
                scene.setState(
                    {
                        sidepanel: update(scene.state.sidepanel, {
                            props: {
                                sceneWidth: { $set: scene.refDOM.current.clientWidth },
                                sceneHeight: { $set: scene.refDOM.current.clientHeight }
                            }
                        })
                    },
                    resolve
                );
            }
        );
    }

    /**
     * Utility function for updating sidepanel isShown prop
     */
    static sidepanelVisibilityCallback = (scene: Scene, isShown: boolean): void => {
        scene.setState(
            {
                sidepanel: update(scene.state.sidepanel, {
                    props: {
                        isShown: {
                            $set: isShown
                        }
                    }
                })
            },
            (): void =>
                scene.state.sidepanelVisibilityCallback &&
                scene.state.sidepanelVisibilityCallback(isShown)
        );
    };
}
