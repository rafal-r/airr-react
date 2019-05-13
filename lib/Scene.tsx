import * as React from "react";
import { ReactNode, RefObject, CSSProperties } from "react";
import FX from "./FX";
import SceneRenderer, { sceneDefaultProps } from "./SceneRenderer";
import { CoreSceneProps } from "./SceneRenderer.d";
import Sidepanel from "./Sidepanel";
import View from "./View";
import { Props as ViewProps } from "./ViewRenderer";
import Mayer, { PreparedProps as MayerProps } from "./Mayer";
import update from "immutability-helper";
import { ViewConfig, SidepanelConfig } from "./airr-react";

interface Props extends CoreSceneProps {
    /**
     * This propety changes behaviour of views animation when overlay animation is set
     */
    stackMode: boolean;
}
interface ViewsConfigItem extends ViewConfig {
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
interface ViewsConfig {
    /**
     * Simple view configuraion which can be found by key which is also it's name.
     */
    [name: string]: ViewsConfigItem;
}
interface RefsCOMPViews {
    [viewname: string]: RefObject<View>;
}
export default class Scene extends View {
    static defaultProps: Props = {
        ...sceneDefaultProps,
        stackMode: false
    };

    state: Props;
    /**
     * Object that keep information about views configuraion objects.
     * Every key in this object describes another view.
     * That configuration later will be used to create new view and add it to state views array.
     * Used by ::getFreshViewConfig to deliver new view config.
     * This approach is mainly used in crucial components's ::changeView method.
     */
    viewsConfig: ViewsConfig;

    /**
     * Instantiated views Component's refferences
     */
    refsCOMPViews: RefsCOMPViews = {};
    /**
     * Instantiated mayers Components refferences
     */
    refsCOMPMayers: { [configName: string]: RefObject<Mayer> } = {};
    /**
     * Instantiated sidepanel Component refference
     */
    refCOMPSidepanel = React.createRef<Sidepanel>();
    /**
     * Refference to DOM element of container's div (first child of most outer element)
     */
    refDOMContainer = React.createRef<HTMLDivElement>();
    /**
     * Refference to DOM element of navbar's div
     */
    refDOMNavbar = React.createRef<HTMLDivElement>();
    /**
     * Helper variable for storing views names that will be filtered
     */
    viewsNamesToStayList: string[] = [];

    constructor(props: Props) {
        super(props);

        this.state = {
            name: props.name,
            active: props.active,
            className: props.className,
            title: props.title,
            navbar: props.navbar,
            navbarHeight: props.navbarHeight,
            navbarMenu: props.navbarMenu,
            navbarClass: props.navbarClass,
            backButton: props.backButton,
            backButtonOnFirstView: props.backButtonOnFirstView,
            activeViewName: props.activeViewName,
            animation: props.animation,
            views: props.views,
            sidepanel: props.sidepanel,
            sidepanelVisibilityCallback: props.sidepanelVisibilityCallback,
            GUIDisabled: props.GUIDisabled,
            GUIDisableCover: props.GUIDisableCover,
            mayers: props.mayers,
            children: props.children,
            animationTime: props.animationTime,
            handleBackBehaviourOnFirstView: props.handleBackBehaviourOnFirstView,
            handleBackButton: props.handleBackButton,
            stackMode: props.stackMode
        };
    }

    componentDidMount(): Promise<void> {
        return new Promise(
            (resolve): void => {
                if (window.addEventListener) {
                    window.addEventListener(
                        "resize",
                        (): void => {
                            if (this.state.sidepanel) {
                                this.__updateSidepanelSizeProps();
                            }
                        }
                    );
                }

                if (this.state.sidepanel) {
                    this.__updateSidepanelSizeProps().then(resolve);
                } else {
                    resolve();
                }

                /**
                 * Call first active view life cycle method - viewAfterActivation
                 */
                if (
                    this.state.activeViewName &&
                    this.refsCOMPViews[this.state.activeViewName] &&
                    typeof this.refsCOMPViews[this.state.activeViewName].current
                        .viewAfterActivation === "function"
                ) {
                    this.refsCOMPViews[this.state.activeViewName].current.viewAfterActivation();
                }
            }
        );
    }

    render(): ReactNode {
        const { views, sidepanel, className, ...stateRest } = this.state;

        return (
            <SceneRenderer
                {...{
                    ...stateRest,
                    views: views,
                    sidepanel: sidepanel,
                    refDOMContainer: this.refDOMContainer,
                    refDOMNavbar: this.refDOMNavbar,
                    refsCOMPViews: this.refsCOMPViews,
                    refCOMPSidepanel: this.refCOMPSidepanel,
                    sidepanelVisibilityCallback: this.__sidepanelVisibilityCallback
                }}
                {...this.getViewProps()}
                {...{ className }}
            />
        );
    }

    /**
     * Special lifecycle method to be overwritten in descendant classes.
     * Called, as name sugest, when views animation finish.
     */
    viewsAnimationEnd(oldViewName: string, newViewName: string): void {}

    /**
     * Creates new view config base on configuration in `viewsConfig` variable.
     * When `viewNameGenerator` in present base configuration it will use to create new view name property.
     * This feature is handy when you want to easly create next views based upon generic view configuration.
     *
     * @param {string} viewName Name of the configuraion key in `this.viewsConfig` object
     * @param {object} props Additional prop to be merged with base config
     */
    getFreshViewConfig(viewName: string, props: ViewProps | {} = {}): ViewsConfigItem {
        if (viewName in this.viewsConfig) {
            const config = Object.assign({}, this.viewsConfig[viewName]);
            const viewNameGenerator = this.viewsConfig[viewName].nameGenerator;

            return update(this.viewsConfig[viewName], {
                props: {
                    $set: {
                        ...Object.assign({}, config.props),
                        ...Object.assign({}, props),
                        name:
                            viewNameGenerator && typeof viewNameGenerator === "function"
                                ? viewNameGenerator(this.state.views)
                                : viewName
                    }
                }
            });
        } else {
            throw new Error(`Passed view name '${viewName}' is not present in viewsConfig.`);
        }
    }

    /**
     * Removes views that are not contained by name in array
     * @param {array} viewsNameList List of views names that will stay in state
     * @returns {Promise} Will be resolved on succesful state update
     */
    filterViews(viewsNameList: string[] = []): Promise<void> {
        return new Promise(
            (resolve): void => {
                this.setState(
                    {
                        views: this.state.views.filter(
                            (view): boolean => viewsNameList.indexOf(view.props.name) !== -1
                        )
                    },
                    resolve
                );
            }
        );
    }

    /**
     * Pops out with animation currently active view from view's array
     * @param {object} viewProps props to modify the view just before popping
     * @param {object} sceneProps props to modify the scene while popping
     * @returns {Promise}  Will be resolved on succesful state update or rejected when no view to pop
     */
    popView = async (
        viewProps: ViewProps | {} = {},
        sceneProps: Props | {} = {}
    ): Promise<string | void> => {
        if (this.state.views.length > 1) {
            const viewName = this.state.views[this.state.views.length - 2].props.name;

            await this.changeView(viewName, viewProps, sceneProps);
            const newviewdefinition = update(this.state.views, {
                $splice: [[this.state.views.length - 1, 1]]
            });
            delete this.refsCOMPViews[this.state.views[this.state.views.length - 1].props.name];
            return new Promise(
                (resolve): void =>
                    this.setState({ views: newviewdefinition }, (): void => resolve(viewName))
            );
        } else {
            console.warn("[] No view to pop.");
            return Promise.resolve();
        }
    };

    /**
     * Crucial method of the scene component for manipalutaing views and scene properties and performing animations.
     * Can change active view with animation or just update view and scene properties.
     *
     * Change view by:
     * - string name kept in state views array which will lead to view change (with animation) or just update if currently active
     * - string name kept in `this.viewsConfig` which will lead to view push (with animation)
     * - new view config wich will lead to view change
     *
     * @param {string|object} view View name to change or view config to be added
     * @param {object} viewProps Extra props to be added to changing view
     * @param {object} sceneProps Extra props to manipulate this scene while changing view
     * @returns {Promise} Resolved on state succesful change and animation end. Or reject on failure.
     */
    async changeView(
        view: string | ViewConfig,
        viewProps: ViewProps | {} = {},
        sceneProps: Props | {} = {}
    ): Promise<string | void> {
        const viewName = await this.__changeView(view, viewProps, sceneProps);
        return this.__performViewsAnimation(viewName);
    }

    /**
     * Removes view from views array
     * @param {string} name
     */
    destroyView(name: string): Promise<void> {
        return new Promise(
            (resolve, reject): void => {
                const index = this.state.views.findIndex(
                    (view): boolean => view.props.name === name
                );

                if (index !== -1) {
                    this.setState(
                        {
                            views: update(this.state.views, {
                                $splice: [[index, 1]]
                            })
                        },
                        resolve
                    );
                } else {
                    reject(`View with name: ${name} was not found in this scene.`);
                }
            }
        );
    }

    /**
     * Utility function to handle back button clicks.
     * Can be overwritten by class extending this scene.
     * By default it pops currently active view.
     * To use it, assign it's value to state like this:
     * this.state.handleBackButton = this.handleBackButton
     *
     * @returns {Promise} Resolved on state succesful change or reject on failure.
     */
    handleBackButton = (
        viewProps: ViewProps | {} = {},
        sceneProps: Props | {} = {}
    ): Promise<string | void> => {
        if (this.state.views.length > 1) {
            return this.popView(viewProps, sceneProps);
        }

        return Promise.resolve();
    };

    /**
     * Special function for enabling sidepanel config after mounting of scene.
     * Will ensure proper sidepanel size (width,height) after incjeting it into DOM.
     * @returns {Promise} Resolved on state succesful change.
     */
    setSidepanelConfig = (config: SidepanelConfig): Promise<void> => {
        return new Promise(
            (resolve): void =>
                this.setState(
                    {
                        sidepanel: config
                    },
                    (): void => {
                        this.__updateSidepanelSizeProps().then(resolve);
                    }
                )
        );
    };

    /**
     * Disables scene's sidepanel by setting it prop enabled = false.
     * @returns {Promise} Resolved on state succesful change or reject on failure.
     */
    disableSidepanel = (): Promise<void> => {
        if (this.state.sidepanel && this.refCOMPSidepanel.current) {
            this.refCOMPSidepanel.current.disable();
            return new Promise(
                (resolve): void =>
                    this.setState(
                        {
                            sidepanel: update(this.state.sidepanel, {
                                props: {
                                    enabled: { $set: false }
                                }
                            })
                        },
                        resolve
                    )
            );
        }
        console.warn("[] No sidepanel to disable");
        return Promise.resolve();
    };

    /**
     * Enables scene's sidepanel by setting it prop enabled = true.
     * @returns {Promise} Resolved on state succesful change or reject on failure.
     */
    enableSidepanel = (): Promise<void> => {
        if (this.state.sidepanel && this.refCOMPSidepanel.current) {
            this.refCOMPSidepanel.current.enable();
            return new Promise(
                (resolve): void =>
                    this.setState(
                        {
                            sidepanel: update(this.state.sidepanel, {
                                props: {
                                    enabled: { $set: true }
                                }
                            })
                        },
                        resolve
                    )
            );
        }
        console.warn("[] No sidepanel to enable");
        return Promise.resolve();
    };

    /**
     * Shows sidepanel
     * @returns {Promise}
     */
    openSidepanel = (): Promise<boolean | void> => {
        if (this.state.sidepanel && this.refCOMPSidepanel.current) {
            this.setState({
                sidepanel: update(this.state.sidepanel, {
                    props: { enabled: { $set: true } }
                })
            });
            return this.refCOMPSidepanel.current.show();
        }

        return Promise.resolve();
    };

    /**
     * Hides sidepanel
     * @returns {Promise}
     */
    hideSidepanel = (): Promise<boolean | void> => {
        if (this.state.sidepanel && this.refCOMPSidepanel.current) {
            return this.refCOMPSidepanel.current.hide();
        }

        return Promise.resolve();
    };

    /**
     * Add new mayer to this.state.mayers configurations array.
     * This will immediatelly open new mayer due to `componentDidMount` lifecycle implementation.
     *
     * @param {object} config Mayer config object.
     * @returns {Promise}
     */
    openMayer(config: MayerProps): Promise<void> {
        if (this.state.mayers.findIndex((item): boolean => item.name === config.name) !== -1) {
            console.warn("[] Scene allready has Mayer with this name: " + config.name);
            return Promise.reject();
        }

        //if scene has sidepanel - disable it
        if (this.state.sidepanel && this.state.sidepanel.props.enabled) {
            this.disableSidepanel();
        }

        //add special functionality,props
        const preparedConfig = this.__prepareMayerConfig(config);

        return this.__addMayer(preparedConfig);
    }

    /**
     * Close mayer by name
     *
     * @param {string} name Unique mayer name
     * @returns {Promise}
     */
    closeMayer(name: string): Promise<void> {
        let mayerConfigIndex = this.state.mayers.findIndex((item): boolean => item.name === name);

        if (
            mayerConfigIndex !== -1 &&
            (this.refsCOMPMayers[name] && this.refsCOMPMayers[name].current)
        ) {
            return new Promise(
                (resolve): void => {
                    this.refsCOMPMayers[name].current.animateOut(
                        (): void => {
                            //renew index because after animation
                            //things might have changed
                            mayerConfigIndex = this.state.mayers.findIndex(
                                (item): boolean => item.name === name
                            );

                            //last check if stil present
                            if (
                                mayerConfigIndex !== -1 &&
                                (this.refsCOMPMayers[name] && this.refsCOMPMayers[name].current)
                            ) {
                                this.__removeMayer(name).then(
                                    (): void => {
                                        delete this.refsCOMPMayers[name];

                                        if (this.state.sidepanel) {
                                            let hasMayerLeft = false;
                                            const children = [
                                                ...Array.from(this.refDOM.current.children)
                                            ];
                                            children.forEach(
                                                (item): void => {
                                                    if (item.classList.contains("airr-mayer")) {
                                                        hasMayerLeft = true;
                                                    }
                                                }
                                            );

                                            if (!hasMayerLeft) {
                                                this.enableSidepanel();
                                            }
                                        }

                                        resolve();
                                    }
                                );
                            }
                        }
                    );
                }
            );
        }

        return Promise.resolve();
    }

    /**
     * Action dispatcher method. Will return a function ready to fire view change.
     * @param {string} name
     * @param {array} viewsNamesToStayList
     * @returns {function} Function that will resolve view change on invoke.
     */
    goToView = (name: string, viewsNamesToStayList: string[] = []): Function => {
        return (
            params: ViewProps | {} = {},
            sceneProps: Props | {} = {}
        ): Promise<string | void> => {
            this.viewsNamesToStayList = viewsNamesToStayList;
            return this.changeView(name, params, sceneProps);
        };
    };

    /**
     * Check wheter object is valid view config and can be added to view's array
     * @param {object} object
     * @returns {boolean}
     */
    isValidViewConfig(object: ViewConfig): boolean {
        return (
            typeof object === "object" &&
            "type" in object &&
            typeof object.props === "object" &&
            "name" in object.props
        );
    }

    /**
     * Check if view's name is described by some config in `this.viewsConfig` object
     * @param {string} name
     * @returns {boolean}
     */
    hasViewInConfig = (name: string): boolean => name in this.viewsConfig;

    /**
     * Check if view recognize by name argument is present in state
     * @param {string} name
     * @returns {boolean}
     */
    hasViewInState = (name: string): boolean =>
        this.state.views.findIndex((view): boolean => view.props.name === name) !== -1
            ? true
            : false;

    /**
     * Disables back button meaning it will not be visible in navbar anymore.
     * @returns {Promise}
     */
    disableBackButton = (): Promise<void> => {
        return new Promise((resolve): void => this.setState({ backButton: false }, resolve));
    };

    /**
     * Enables back button meaning it will be visible in navbar.
     * @returns {Promise}
     */
    enableBackButton = (): Promise<void> => {
        return new Promise((resolve): void => this.setState({ backButton: true }, resolve));
    };

    /**
     * Disables scene's GUI by provinding extra layer on top of everything else.
     * This layer can be customize by `cover` argument.
     * @param {ReactNode} cover React element to be placed in covering layer
     * @returns {Promise}  Will be resolved on succesful state update
     */
    disableGUI = (cover: ReactNode = null): Promise<void> => {
        return new Promise(
            (resolve): void => this.setState({ GUIDisabled: true, GUIDisableCover: cover }, resolve)
        );
    };

    /**
     * Disables layer covering scene and enable user interactions.
     * @returns {Promise} Will be resolved on succesful state update
     */
    enableGUI = (): Promise<void> => {
        return new Promise(
            (resolve): void => this.setState({ GUIDisabled: false, GUIDisableCover: null }, resolve)
        );
    };

    /**
     * Get view index in views array
     * @param {string} viewName
     * @returns {number}
     */
    getViewIndex = (viewName: string): number =>
        this.state.views.findIndex((view): boolean => view.props.name === viewName);

    /**
     * Private method for pushing new view config into this.state.views array
     * @param {ViewsConfigItem} config
     * @param {Props} sceneProps
     * @returns {Promise}  Will be resolved on succesful state update
     */
    __pushView(config: ViewsConfigItem, sceneProps: Props | {} = {}): Promise<string> {
        const newviewdefinition = update(this.state.views, { $push: [config] });
        const stateChange = Object.assign(
            {
                views: newviewdefinition
            },
            Object.assign({}, config.sceneProps || {}),
            Object.assign({}, sceneProps || {})
        );

        return new Promise(
            (resolve): void => this.setState(stateChange, (): void => resolve(config.props.name))
        );
    }

    /**
     * Make modification to scene's views by pushing new, updating current or changing between added views
     *
     * @param {string|object} view View name to change or view config to be added
     * @param {object} viewProps Extra props to be added to changing view
     * @param {object} sceneProps Extra props to manipulate this scene while changing view
     * @returns {Promise} Resolved on state succesful change and animation end. Or reject on failure.
     */
    __changeView(
        view: string | ViewConfig,
        viewProps: ViewProps | {} = {},
        sceneProps: Props | {} = {}
    ): Promise<string> {
        if (typeof view === "string") {
            if (this.hasViewInState(view)) {
                //if already in state then update its props
                return new Promise(
                    (resolve): void => {
                        const viewIndex = this.getViewIndex(view);
                        const currentViewConfig = Object.assign(
                            { sceneProps: {} }, //for a default props which will be latter used
                            this.state.views[viewIndex]
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
                            views: update(this.state.views, {
                                [viewIndex]: {
                                    $set: newViewConfig
                                }
                            }),
                            ...currentViewConfig.sceneProps,
                            ...Object.assign({}, sceneProps)
                        };

                        this.setState(stateChange, (): void => resolve(view));
                    }
                );
            } else if (this.hasViewInConfig(view)) {
                //push fresh config
                return this.__pushView(this.getFreshViewConfig(view, viewProps), sceneProps);
            } else return Promise.reject();
        } else if (this.isValidViewConfig(view)) {
            //push allready prepared config
            return this.__pushView(
                Object.assign({}, view, {
                    props: { ...view.props, ...viewProps }
                }),
                sceneProps
            );
        } else {
            return Promise.reject("Invalid `view` argument specify");
        }
    }

    /**
     * If config has buttons that contains logical true `close` property,
     * this method will attach close mayer functionality to tap event on this button.
     *
     * @param {object} mayerConfig mayer config object
     * @returns {object}
     */
    __prepareMayerConfig(mayerConfig: MayerProps): MayerProps {
        const config = Object.assign({ ref: undefined }, mayerConfig);

        const ref = React.createRef<Mayer>();
        config.ref = ref;
        this.refsCOMPMayers[config.name] = ref;

        if (config.buttons && config.buttons.length) {
            config.buttons.forEach(
                (item): void => {
                    if (item.close) {
                        if (item.handler) {
                            const oldHandler = item.handler;
                            item.handler = (e): void => {
                                oldHandler(e);
                                this.closeMayer(config.name);
                            };
                        } else {
                            item.handler = (e): void => {
                                this.closeMayer(config.name);
                            };
                        }
                    }
                }
            );
        }

        config.avaibleHeight = this.refDOM.current.clientHeight || window.innerHeight;

        return config;
    }

    /**
     * Private utility for adding mayers
     * @param {objec} config
     * @returns {Promise}
     */
    __addMayer = (config: MayerProps): Promise<void> => {
        const newMayersDef = update(this.state.mayers, { $push: [config] });

        return new Promise(
            (resolve): void =>
                this.setState(
                    {
                        mayers: newMayersDef
                    },
                    resolve
                )
        );
    };

    /**
     * Private utility for removing mayers
     * @param {string} name Mayer name
     * @returns {Promise}
     */
    __removeMayer = (name: string): Promise<void> => {
        const newMayersDef = this.state.mayers.filter(
            (item): boolean => {
                return item.name !== name;
            }
        );

        return new Promise(
            (resolve): void =>
                this.setState(
                    {
                        mayers: newMayersDef
                    },
                    resolve
                )
        );
    };

    /**
     * Private utility function for updating sidepanel's sceneWidth,sceneHeight properties
     * @returns {Promise}
     */
    __updateSidepanelSizeProps(): Promise<void> {
        return new Promise(
            (resolve): void => {
                this.setState(
                    {
                        sidepanel: update(this.state.sidepanel, {
                            props: {
                                sceneWidth: { $set: this.refDOM.current.clientWidth },
                                sceneHeight: { $set: this.refDOM.current.clientHeight }
                            }
                        })
                    },
                    resolve
                );
            }
        );
    }

    /**
     * Private utility function for updating sidepanel isShown prop
     * @param {boolean} isShown
     * @returns {void}
     */

    __sidepanelVisibilityCallback = (isShown: boolean): void => {
        this.setState(
            {
                sidepanel: update(this.state.sidepanel, {
                    props: {
                        isShown: {
                            $set: isShown
                        }
                    }
                })
            },
            (): void =>
                this.state.sidepanelVisibilityCallback &&
                this.state.sidepanelVisibilityCallback(isShown)
        );
    };

    /**
     * Describes if views animation is taking place
     */
    viewChangeInProgress = false;

    /**
     * Private utility function that changes views with animation
     *
     * @param {string} newViewName
     * @returns {Promise}
     */
    __performViewsAnimation(newViewName: string): Promise<void> {
        if (typeof newViewName === "string") {
            this.viewChangeInProgress = true;

            return new Promise(
                (resolve, reject): void => {
                    if (newViewName === this.state.activeViewName) {
                        console.warn("[] This View is already active.");
                        this.viewChangeInProgress = false;
                        return resolve();
                    }

                    this.setState(
                        { GUIDisabled: true, mockTitleName: newViewName },
                        (): void => {
                            if (this.getViewIndex(newViewName) !== -1) {
                                const oldViewName = this.state.activeViewName;
                                const newViewComp =
                                    this.refsCOMPViews[newViewName] &&
                                    this.refsCOMPViews[newViewName].current;
                                const oldViewComp =
                                    this.refsCOMPViews[oldViewName] &&
                                    this.refsCOMPViews[oldViewName].current;
                                const animEndCallback = (): void => {
                                    this.viewChangeInProgress = false;

                                    if (
                                        newViewComp &&
                                        typeof newViewComp.viewAfterActivation === "function"
                                    ) {
                                        newViewComp.viewAfterActivation();
                                    }

                                    if (
                                        oldViewComp &&
                                        typeof oldViewComp.viewAfterDeactivation === "function"
                                    ) {
                                        oldViewComp.viewAfterDeactivation();
                                    }

                                    if (typeof this.viewsAnimationEnd === "function") {
                                        this.viewsAnimationEnd(oldViewName, newViewName);
                                    }

                                    resolve();
                                };

                                if (
                                    newViewComp &&
                                    typeof newViewComp.viewBeforeActivation === "function"
                                ) {
                                    newViewComp.viewBeforeActivation();
                                }

                                if (
                                    oldViewComp &&
                                    typeof oldViewComp.viewBeforeDeactivation === "function"
                                ) {
                                    oldViewComp.viewBeforeDeactivation();
                                }

                                if (this.state.animation) {
                                    this.__doViewsAnimation(newViewName, oldViewName).then(
                                        (): void => {
                                            this.setState(
                                                {
                                                    activeViewName: newViewName,
                                                    GUIDisabled: false,
                                                    mockTitleName: null
                                                },
                                                animEndCallback
                                            );
                                        }
                                    );
                                } else {
                                    this.setState(
                                        {
                                            activeViewName: newViewName,
                                            GUIDisabled: false,
                                            mockTitleName: null
                                        },
                                        animEndCallback
                                    );
                                }
                            } else {
                                this.viewChangeInProgress = false;
                                console.warn(
                                    "[] View with name " +
                                        newViewName +
                                        " is not presence in this Scene."
                                );
                                reject();
                            }
                        }
                    );
                }
            );
        } else {
            console.warn("[] You must specify view name property as string value");
            return Promise.reject();
        }
    }

    /**
     * Private utility function. This one actually makes css animations.
     *
     * @param {string} newViewName
     * @param {string} oldViewName
     * @returns {Promise}
     */
    __doViewsAnimation(newViewName: string, oldViewName: string): Promise<void> {
        return new Promise(
            (resolve, reject): void => {
                const newViewDOM = this.refsCOMPViews[newViewName].current.refDOM.current;
                const oldViewDOM = this.refsCOMPViews[oldViewName].current.refDOM.current;
                const oldViewIndex = this.getViewIndex(oldViewName);
                const newViewIndex = this.getViewIndex(newViewName);

                const direction = newViewIndex > oldViewIndex ? 1 : -1;

                if (!newViewDOM) {
                    throw new Error("new view DOM refference was not found");
                }

                this.__doNavbarItemsAnimation(newViewIndex, oldViewIndex, direction);

                if (this.state.animation === "slide" && oldViewName) {
                    this.__doViewsSlideAnimation(newViewDOM, oldViewDOM, direction).then(resolve);
                } else if (this.state.animation === "overlay" && oldViewName) {
                    this.__doViewsOverlayAnimation(newViewDOM, oldViewDOM, direction).then(resolve);
                } else if (this.state.animation === "fade" || !oldViewName) {
                    this.__doViewsFadeAnimation(newViewDOM, oldViewDOM, direction).then(resolve);
                }
            }
        );
    }

    __doViewsFadeAnimation(
        newViewDOM: HTMLElement,
        oldViewDOM: HTMLElement,
        direction: 1 | -1
    ): Promise<void> {
        return new Promise(
            (resolve): void => {
                FX.doTransitionAnimation({
                    element: newViewDOM,
                    startProps: {
                        display: "block",
                        opacity: 0
                    },
                    transitionProps: [`opacity ${this.state.animationTime}ms ease-out`],
                    endProps: {
                        opacity: 1
                    },
                    preAnimationCallback: (): void => {
                        newViewDOM.style.zIndex = "102";
                    },
                    endAfter: this.state.animationTime,
                    endCallback: (): void => {
                        newViewDOM.style.display = "";
                        newViewDOM.style.zIndex = "";
                        newViewDOM.style.transform = "";
                        newViewDOM.style.webkitTransform = "";
                        newViewDOM.style.transition = "";
                        newViewDOM.style.webkitTransition = "";
                        newViewDOM.style.opacity = "";

                        resolve();
                    }
                });
            }
        );
    }
    __doViewsOverlayAnimation(
        newViewDOM: HTMLElement,
        oldViewDOM: HTMLElement,
        direction: 1 | -1
    ): Promise<void> {
        return new Promise(
            (resolve): void => {
                if (direction === 1) {
                    FX.doTransitionAnimation({
                        element: newViewDOM,
                        startProps: {
                            WebkitTransform: `translate3d(${this.refDOMContainer.current
                                .clientWidth + "px"},0,0)`,
                            transform: `translate3d(${this.refDOMContainer.current.clientWidth +
                                "px"},0,0)`,
                            opacity: 0,
                            display: "block"
                        },
                        transitionProps: [
                            `opacity ${this.state.animationTime}ms ease-out`,
                            `transform ${this.state.animationTime}ms ease-out`
                        ],
                        endProps: {
                            WebkitTransform: `translate3d(0,0,0)`,
                            transform: `translate3d(0,0,0)`,
                            opacity: 1
                        },
                        preAnimationCallback: (): void => {
                            newViewDOM.style.zIndex = "102";
                        },
                        endAfter: this.state.animationTime,
                        endCallback: (): void => {
                            newViewDOM.style.zIndex = "";
                            newViewDOM.style.display = "";
                            newViewDOM.style.transform = "";
                            newViewDOM.style.webkitTransform = "";
                            newViewDOM.style.transition = "";
                            newViewDOM.style.webkitTransition = "";
                            newViewDOM.style.opacity = "";

                            resolve();
                        }
                    });
                } else {
                    if (this.state.stackMode) {
                        newViewDOM.style.display = "block";
                        newViewDOM.style.opacity = "1";

                        FX.doTransitionAnimation({
                            element: oldViewDOM,
                            startProps: {
                                WebkitTransform: `translate3d(0,0,0)`,
                                transform: `translate3d(0,0,0)`,
                                opacity: 1
                            },
                            transitionProps: [
                                `opacity ${this.state.animationTime}ms ease-out`,
                                `transform ${this.state.animationTime}ms ease-out`
                            ],
                            endProps: {
                                WebkitTransform: `translate3d(0,${this.refDOMContainer.current
                                    .clientHeight /
                                    4 +
                                    "px"},0)`,
                                transform: `translate3d(0,${this.refDOMContainer.current
                                    .clientHeight /
                                    4 +
                                    "px"},0)`,
                                opacity: 0
                            },
                            endAfter: this.state.animationTime,
                            endCallback: (): void => {
                                oldViewDOM.style.transition = "";
                                oldViewDOM.style.webkitTransition = "";
                                oldViewDOM.style.transform = "";
                                oldViewDOM.style.webkitTransform = "";
                                oldViewDOM.style.opacity = "";

                                newViewDOM.style.display = "";
                                newViewDOM.style.opacity = "";

                                resolve();
                            }
                        });
                    } else {
                        newViewDOM.style.display = "block";

                        FX.doTransitionAnimation({
                            element: newViewDOM,
                            startProps: {
                                WebkitTransform: `translate3d(${-1 *
                                    this.refDOMContainer.current.clientWidth +
                                    "px"},0,0)`,
                                transform: `translate3d(${-1 *
                                    this.refDOMContainer.current.clientWidth +
                                    "px"},0,0)`,
                                opacity: 0
                            },
                            transitionProps: [
                                `opacity ${this.state.animationTime}ms ease-out`,
                                `transform ${this.state.animationTime}ms ease-out`
                            ],
                            endProps: {
                                WebkitTransform: `translate3d(0,0,0)`,
                                transform: `translate3d(0,0,0)`,
                                opacity: 1
                            },
                            preAnimationCallback: (): void => {
                                newViewDOM.style.zIndex = "102";
                            },
                            endAfter: this.state.animationTime,
                            endCallback: (): void => {
                                newViewDOM.style.display = "";
                                newViewDOM.style.zIndex = "";
                                newViewDOM.style.transform = "";
                                newViewDOM.style.webkitTransform = "";
                                newViewDOM.style.transition = "";
                                newViewDOM.style.webkitTransition = "";
                                newViewDOM.style.opacity = "";

                                resolve();
                            }
                        });
                    }
                }
            }
        );
    }
    __doViewsSlideAnimation(
        newViewDOM: HTMLElement,
        oldViewDOM: HTMLElement,
        direction: 1 | -1
    ): Promise<void> {
        return new Promise(
            (resolve): void => {
                newViewDOM.style.display = "block";
                let startProps: CSSProperties = {};
                let endProps: CSSProperties = {};

                if (direction === -1) {
                    startProps.WebkitTransform =
                        "translate3d(" + -1 * this.refDOM.current.clientWidth + "px,0,0)";
                    startProps.transform =
                        "translate3d(" + -1 * this.refDOM.current.clientWidth + "px,0,0)";
                    endProps.WebkitTransform = "translate3d(0,0,0)";
                    endProps.transform = "translate3d(0,0,0)";
                } else {
                    endProps.WebkitTransform =
                        "translate3d(" + -1 * this.refDOM.current.clientWidth + "px,0,0)";
                    endProps.transform =
                        "translate3d(" + -1 * this.refDOM.current.clientWidth + "px,0,0)";
                }

                FX.doTransitionAnimation({
                    element: this.refDOMContainer.current,
                    startProps,
                    transitionProps: [`transform ${this.state.animationTime}ms ease-out`],
                    endProps,
                    endAfter: this.state.animationTime,
                    endCallback: (): void => {
                        newViewDOM.style.display = "";
                        this.refDOMContainer.current.style.webkitTransform = "";
                        this.refDOMContainer.current.style.transform = "";
                        this.refDOMContainer.current.style.webkitTransition = "";
                        this.refDOMContainer.current.style.transition = "";
                        this.refDOMContainer.current.style.transition = "";
                        this.refDOMContainer.current.style.webkitBackfaceVisibility = "";
                        this.refDOMContainer.current.style.backfaceVisibility = "";

                        resolve();
                    }
                });
            }
        );
    }

    __doNavbarItemsAnimation(newViewIndex: number, oldViewIndex: number, direction: 1 | -1): void {
        if (this.state.navbar) {
            //perform navbar animations
            const titleNode = this.refDOMNavbar.current.querySelector(".title") as HTMLElement;
            const mockTitle = this.refDOMNavbar.current.querySelector(".mock-title") as HTMLElement;
            const mockTextSpan = mockTitle && mockTitle.children[0];
            const mockTextSpanWidth = mockTextSpan ? mockTextSpan.clientWidth : 0;

            if (titleNode) {
                FX.doTransitionAnimation({
                    element: titleNode,
                    startProps: {
                        WebkitTransform: `translate3d(${(titleNode.clientWidth / 2 +
                            mockTextSpanWidth / 2) *
                            direction +
                            "px"},0,0)`,
                        transform: `translate3d(${(titleNode.clientWidth / 2 +
                            mockTextSpanWidth / 2) *
                            direction +
                            "px"},0,0)`,
                        opacity: 0
                    },
                    transitionProps: [
                        `opacity ${this.state.animationTime}ms ease-out`,
                        `transform ${this.state.animationTime}ms ease-out`
                    ],
                    endProps: {
                        WebkitTransform: `translate3d(0,0,0)`,
                        transform: `translate3d(0,0,0)`,
                        opacity: 1
                    },
                    endAfter: this.state.animationTime
                });
            }

            if (mockTitle) {
                FX.doTransitionAnimation({
                    element: mockTitle,
                    startProps: {
                        WebkitTransform: "translate3d(0,0,0)",
                        transform: "translate3d(0,0,0)",
                        opacity: 1
                    },
                    transitionProps: [
                        `opacity ${this.state.animationTime}ms ease-out`,
                        `transform ${this.state.animationTime}ms ease-out`
                    ],
                    endProps: {
                        WebkitTransform: `translate3d(${mockTextSpanWidth * direction * -1 +
                            "px"},0,0)`,
                        transform: `translate3d(${mockTextSpanWidth * direction * -1 + "px"},0,0)`,
                        opacity: 0
                    },
                    endAfter: this.state.animationTime
                });
            }

            if (this.state.backButton && !this.state.backButtonOnFirstView) {
                const backDOM = this.refDOMNavbar.current.querySelector(".back") as HTMLElement;

                if (oldViewIndex === 0) {
                    //show back button with animation
                    FX.doTransitionAnimation({
                        element: backDOM,
                        startProps: {
                            WebkitTransform: "translate3d(100%,0,0)",
                            transform: "translate3d(100%,0,0)",
                            opacity: 0
                        },
                        transitionProps: [
                            `opacity ${this.state.animationTime}ms ease-out`,
                            `transform ${this.state.animationTime}ms ease-out`
                        ],
                        endProps: {
                            WebkitTransform: "translate3d(0,0,0)",
                            transform: "translate3d(0,0,0)",
                            opacity: 1
                        },
                        preAnimationCallback: (): void => {
                            backDOM.classList.remove("hidden");
                        },
                        endAfter: this.state.animationTime
                    });
                } else if (newViewIndex === 0) {
                    //hide backbutton with animation
                    FX.doTransitionAnimation({
                        element: backDOM,
                        startProps: {
                            WebkitTransform: "translate3d(0,0,0)",
                            transform: "translate3d(0,0,0)",
                            opacity: 1
                        },
                        transitionProps: [
                            `opacity ${this.state.animationTime}ms ease-out`,
                            `transform ${this.state.animationTime}ms ease-out`
                        ],
                        endProps: {
                            WebkitTransform: "translate3d(-100%,0,0)",
                            transform: "translate3d(-100%,0,0)",
                            opacity: 0
                        },
                        endAfter: this.state.animationTime,
                        endCallback: (): void => {
                            backDOM.style.webkitTransform = "";
                            backDOM.style.transform = "";
                            backDOM.style.opacity = "";
                        }
                    });
                }
            }
        }
    }
}
