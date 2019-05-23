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
        const config = Object.assign({ ref: undefined }, mayerConfig);

        const ref = React.createRef<Mayer>();
        config.ref = ref;
        scene.refsCOMPMayers[config.name] = ref;

        if (config.buttons && config.buttons.length) {
            config.buttons.forEach(
                (item): void => {
                    if (item.close) {
                        if (item.handler) {
                            const oldHandler = item.handler;
                            item.handler = (e): void => {
                                oldHandler(e);
                                scene.closeMayer(config.name);
                            };
                        } else {
                            item.handler = (e): void => {
                                scene.closeMayer(config.name);
                            };
                        }
                    }
                }
            );
        }

        config.avaibleHeight = scene.refDOM.current.clientHeight || window.innerHeight;

        return config;
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
                    resolve
                )
        );
    };

    /**
     * Utility for removing mayers
     */
    static removeMayer = (scene: Scene, name: string): Promise<void> => {
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
                        resolve();
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
