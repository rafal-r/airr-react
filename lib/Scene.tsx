import * as React from "react";
import { ReactNode, RefObject, PureComponent } from "react";
import SceneRenderer, { sceneDefaultProps } from "./SceneRenderer";
import Sidepanel from "./Sidepanel";
import View, { CommonViewClass } from "./View";
import { ViewProps } from "./ViewRenderer";
import Mayer, { PreparedProps as MayerProps } from "./Mayer";
import update from "immutability-helper";
import { SidepanelConfig } from "./Airr";
import ViewsAPIHelper from "./Scene/ViewsAPIHelper";
import SidepanelAPIHelper from "./Scene/SidepanelAPIHelper";
import MayersAPIHelper from "./Scene/MayersAPIHelper";
import { CoreSceneProps } from "./SceneRenderer";
import { getViewProps } from "./CommonViewHelpers";

export interface SceneProps extends CoreSceneProps {
    /**
     * This propety changes behaviour of views animation when overlay animation is set
     */
    stackMode?: boolean;
}
export type SceneState = SceneProps;
export type CommonViewProps = ViewProps | SceneProps;

export interface ViewConfigItem<T> {
    /**
     * Refference to class or function that will render View. Use View class refference or class that extends View.
     */
    type: React.ComponentClass<T & CommonViewProps, any>;
    /**
     * Special properties of AirrView class. Go to class declaration for further properties documenation.
     */
    props: T & CommonViewProps;
    //TODO
    feedWithProps?: string[];
    /**
     * Props to modify this Scene
     */
    sceneProps?: Pick<SceneProps, Exclude<keyof SceneProps, "name">>;
    /**
     *
     * Common view configutaion can have nameGenerator function used to create another view name propperty.
     * Gets current state views list as argument.
     * Example:
     * nameGenerator: views => { return "common-view-*".replace("*", views.length + 1);}
     */
    nameGenerator?(views: SceneProps["views"]): string;
}
/**
 * View configuraion which can be found by key which is also it's name.
 */
export type ViewsConfig<T = {}> = { [K in keyof T]: ViewConfigItem<T[K]> };

export interface RefsCOMPViews {
    [viewname: string]: RefObject<View<ViewProps>>;
}

export default class Scene<P extends SceneProps = SceneProps, S extends SceneState = SceneState>
    extends PureComponent<P, S>
    implements CommonViewClass {
    static defaultProps = {
        ...sceneDefaultProps,
        stackMode: false
    };

    /**
     * Class member that keep information about views configuraion objects.
     * Every key in this object describes another view.
     * That configuration later will be used to create new view and add it to state views array.
     * Used by ::getFreshViewConfig to deliver new view config.
     * This variable is mainly used in crucial components's ::changeView method.
     */
    viewsConfig: ViewsConfig;

    /**
     * Refferency to view's DOM element.
     */
    refDOM = React.createRef<HTMLDivElement>();

    /**
     * Special method for delivering props to View component's.
     * Used in render method.
     */
    getViewProps = getViewProps.bind(this);

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

    /**
     * Describes if views animation is taking place
     */
    viewChangeInProgress = false;

    /**
     * Common view life-cycle method to be overwriten in classes that extends this class
     */
    viewAfterActivation(): void {}
    viewAfterDeactivation(): void {}
    viewBeforeActivation(): void {}
    viewBeforeDeactivation(): void {}

    state: S = {
        ...this.state,
        name: this.props.name,
        active: this.props.active,
        className: this.props.className,
        title: this.props.title,
        navbar: this.props.navbar,
        navbarHeight: this.props.navbarHeight,
        navbarMenu: this.props.navbarMenu,
        navbarClass: this.props.navbarClass,
        backButton: this.props.backButton,
        backButtonOnFirstView: this.props.backButtonOnFirstView,
        activeViewName: this.props.activeViewName,
        animation: this.props.animation,
        views: this.props.views,
        sidepanel: this.props.sidepanel,
        sidepanelVisibilityCallback: this.props.sidepanelVisibilityCallback,
        GUIDisabled: this.props.GUIDisabled,
        GUIDisableCover: this.props.GUIDisableCover,
        mayers: this.props.mayers,
        children: this.props.children,
        animationTime: this.props.animationTime,
        handleBackBehaviourOnFirstView: this.props.handleBackBehaviourOnFirstView,
        handleBackButton: this.props.handleBackButton,
        stackMode: this.props.stackMode
    };

    componentDidMount(): Promise<void> {
        return new Promise(
            (resolve): void => {
                SidepanelAPIHelper.initWindowResizeListener(this);

                /**
                 * Call first active view life cycle method - viewAfterActivation
                 */
                ViewsAPIHelper.invokeActivationEffectOnActiveView(this);

                if (this.state.sidepanel) {
                    SidepanelAPIHelper.updateSidepanelSizeProps(this).then(resolve);
                } else {
                    resolve();
                }
            }
        );
    }

    render(): ReactNode {
        const { views, sidepanel, className, ...stateRest } = this.state;

        return (
            <SceneRenderer<P>
                {...{
                    ...this.props,
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
     * @param {string|ViewConfigItem} view Name of the configuraion key in `this.viewsConfig` object or raw ViewConfigItem object
     * @param {object} props Additional prop to be merged with base config
     */
    getFreshViewConfig<T>(
        view: string | ViewConfigItem<T>,
        props: CommonViewProps | {} = {}
    ): ViewConfigItem<T> {
        if (typeof view === "string" && view in this.viewsConfig) {
            const config = Object.assign({}, this.viewsConfig[view]);
            const viewGenerator = this.viewsConfig[view].nameGenerator;

            return update(this.viewsConfig[view], {
                props: {
                    $set: {
                        ...Object.assign({}, config.props),
                        ...Object.assign({}, props),
                        name:
                            viewGenerator && typeof viewGenerator === "function"
                                ? viewGenerator(this.state.views)
                                : view
                    }
                }
            });
        } else if (typeof view === "object" && this.isValidViewConfig<T>(view)) {
            return Object.assign({}, view, {
                props: { ...view.props, ...props }
            });
        } else {
            throw new Error(
                `Passed view is not present in viewsConfig or is invalid raw ViewConfig object.`
            );
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
        sceneProps: SceneProps | {} = {}
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
        view: string | ViewConfigItem<CommonViewProps>,
        viewProps: CommonViewProps | {} = {},
        sceneProps: SceneProps | {} = {}
    ): Promise<string | void> {
        this.viewChangeInProgress = true;
        const viewName = await ViewsAPIHelper.changeView(this, view, viewProps, sceneProps);
        return ViewsAPIHelper.performViewsAnimation(this, viewName);
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
        sceneProps: SceneProps | {} = {}
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
                        SidepanelAPIHelper.updateSidepanelSizeProps(this).then(resolve);
                    }
                )
        );
    };

    /**
     * Disables scene's sidepanel by setting it prop enabled = false.
     * @returns {Promise} Resolved on state succesful change or reject on failure.
     */
    disableSidepanel = (): Promise<void> => {
        return SidepanelAPIHelper.toggleSidepanel(this, false);
    };

    /**
     * Enables scene's sidepanel by setting it prop enabled = true.
     * @returns {Promise} Resolved on state succesful change or reject on failure.
     */
    enableSidepanel = (): Promise<void> => {
        return SidepanelAPIHelper.toggleSidepanel(this, true);
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

        //add special functionality,props
        const preparedConfig = MayersAPIHelper.prepareMayerConfig(this, config);

        return MayersAPIHelper.addMayer(this, preparedConfig);
    }

    /**
     * Close mayer by name
     *
     * @param {string} name Unique mayer name
     * @returns {Promise}
     */
    closeMayer(name: string): Promise<void> {
        //TODO hasMountedMayer might be deprecated in favour to simple check in this.state.mayers
        if (MayersAPIHelper.hasMountedMayer(this, name)) {
            return new Promise(
                (resolve): void => {
                    this.refsCOMPMayers[name].current.animateOut(
                        (): void => {
                            //renew check because after animation things might have changed
                            if (MayersAPIHelper.hasMountedMayer(this, name)) {
                                MayersAPIHelper.removeMayer(this, name).then(resolve);
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
            sceneProps: SceneProps | {} = {}
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
    isValidViewConfig<T>(object: ViewConfigItem<T>): boolean {
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
     * Check if view recognized by name argument is present in state
     * @param {string} name
     * @returns {boolean}
     */
    hasViewInState = (name: string): boolean =>
        this.state.views.findIndex((view): boolean => view.props.name === name) !== -1
            ? true
            : false;

    /**
     * Get view index in views array
     * @param {string} viewName
     * @returns {number}
     */
    getViewIndex = (viewName: string): number =>
        this.state.views.findIndex((view): boolean => view.props.name === viewName);

    /**
     * Utility function for updating sidepanel isShown prop
     */
    __sidepanelVisibilityCallback = (isShown: boolean): void => {
        return SidepanelAPIHelper.sidepanelVisibilityCallback(this, isShown);
    };
}
