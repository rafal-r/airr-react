import * as React from "react";
import Scene from "../Scene";
import update from "immutability-helper";
import Mayer, { PreparedProps as MayerProps } from "../Mayer";

export default class MayersAPIHelper {
    /**
     * If config has buttons that contains logical true `close` property,
     * this method will attach close mayer functionality to tap event on this button.
     */
    static prepareMayerConfig(scene: Scene, mayerConfig: MayerProps): MayerProps {
        const ref = React.createRef<Mayer>();
        mayerConfig.ref = ref;
        scene.refsCOMPMayers[mayerConfig.name] = ref;

        if (mayerConfig.buttons && mayerConfig.buttons.length) {
            mayerConfig.buttons.forEach(
                (item): void => {
                    if (item.close) {
                        if (item.handler) {
                            const oldHandler = item.handler;
                            item.handler = (e): void => {
                                oldHandler(e);
                                scene.closeMayer(mayerConfig.name);
                            };
                        } else {
                            item.handler = (e): void => {
                                scene.closeMayer(mayerConfig.name);
                            };
                        }
                    }
                }
            );
        }

        mayerConfig.avaibleHeight = scene.refDOM.current.clientHeight || window.innerHeight;

        return mayerConfig;
    }

    /**
     * Utility for adding mayers
     */
    static addMayer = (scene: Scene, config: MayerProps): Promise<void> => {
        const newMayersDef = update(scene.state.mayers, { $push: [config] });

        return new Promise(
            (resolve): void =>
                scene.setState(
                    {
                        mayers: newMayersDef
                    },
                    //TODO think of removal the setTimeout, it wasnt here previosuly, just 'resolve'
                    () => {
                        setTimeout(
                            resolve,
                            config.animationTime || Mayer.defaultProps.animationTime
                        );
                    }
                )
        );
    };

    /**
     * Utility for removing mayers
     */
    static removeMayer = (scene: Scene, name: string): Promise<void> => {
        const animTime = scene.state.mayers.find(item => item.name === name).animationTime;
        const newMayersDef = scene.state.mayers.filter(
            (item): boolean => {
                return item.name !== name;
            }
        );

        return new Promise(
            (resolve): void =>
                scene.setState(
                    {
                        mayers: newMayersDef
                    },
                    () => {
                        delete scene.refsCOMPMayers[name];
                        //TODO think of removal the setTimeout, it wasnt here previosuly, just 'resolve'
                        () => {
                            setTimeout(resolve, animTime || Mayer.defaultProps.animationTime);
                        };
                    }
                )
        );
    };

    static hasMountedMayer = (scene: Scene, name: string): boolean => {
        let mayerConfigIndex = scene.state.mayers.findIndex((item): boolean => item.name === name);

        return Boolean(
            mayerConfigIndex !== -1 &&
                (scene.refsCOMPMayers[name] && scene.refsCOMPMayers[name].current)
        );
    };
}
