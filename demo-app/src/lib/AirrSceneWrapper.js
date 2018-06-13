import React from "react";
import AirrFX from "./AirrFX";
import AirrScene from "./AirrScene";
import AirrViewWrapper from "./AirrViewWrapper";
import update from "immutability-helper";
import PropTypes from "prop-types";

export default class AirrSceneWrapper extends AirrViewWrapper {
    /**
     * Object that keep information about views configuraion objects.
     * Every key in this object describes another view.
     * That configuration later will be used to create new view and add it to state views array.
     * Used by ::getFreshViewConfig to deliver new view config.
     * This approach is mainly used in crucial components's ::changeView method.
     */
    viewsConfig = PropTypes.shape({
        /**
         * Simple view configuraion which can be found by key which is also it's name.
         */
        "foo-view-name": {
            /**
             * View type
             */
            type: AirrViewWrapper,
            /**
             * View props
             */
            props: {
                name: "foo-view-name",
                bar: "baz",
                factor: 3
            },
            /**
             * Props to modify Scene
             */
            sceneProps: {
                navbar: 1,
                backbutton: true
            }
        },
        /**
         * Common view configutaion that has nameGenerator property that is function
         * used to create another view name propperty.
         */
        "common-view-*": {
            /**
             * View type
             */
            type: AirrViewWrapper,
            /**
             * View props
             */
            props: {
                name: null,
                baz: "yoo"
            },
            /**
             * Props to modify Scene
             */
            sceneProps: {
                navbar: 0
            },
            /**
             * Function to generate next view name.
             * Gets current state views list as argument.
             */
            nameGenerator: views => {
                return "common-view-*".replace("*", views.length + 1);
            }
        }
    });

    /**
     * Instantiated views Components refferences
     */
    refsCOMPViews = {};
    /**
     * Instantiated mayers Components refferences
     */
    refsCOMPMayers = {};
    /**
     * Instantiated sidepanel Component refference
     */
    refCOMPSidepanel = React.createRef();
    /**
     * Refference to DOM element of container's div (first child of most outer element)
     */
    refDOMContainer = React.createRef();
    /**
     * Refference to DOM element of navbar's div
     */
    refDOMNavbar = React.createRef();

    constructor(props) {
        super(props);

        this.state = {
            name: props.name,
            active: props.active,
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
            GUIDisabled: props.GUIDisabled,
            GUIDisableCover: props.GUIDisableCover,
            mayers: props.mayers,
            children: props.children,
            animationTime: props.animationTime,
            handleBackBehaviourOnFirstView:
                props.handleBackBehaviourOnFirstView,
            viewsAnimationEndCallback: props.viewsAnimationEndCallback,
            handleBackButton: props.handleBackButton,
            stackMode: props.stackMode
        };
    }

    /**
     * Creates new view config base on configuration in `viewsConfig` variable.
     * When `viewNameGenerator` in present base configuration it will use to create new view name property.
     * This feature is handy when you want to easly create next views based upon generic view configuration.
     *
     * @param {string} viewName Name of the configuraion key in `this.viewsConfig` object
     * @param {object} props Additional prop to be merged with base config
     */
    getFreshViewConfig(viewName, props = {}) {
        if (viewName in this.viewsConfig) {
            const config = Object.assign({}, this.viewsConfig[viewName]);
            const viewNameGenerator = this.viewsConfig[viewName].nameGenerator;

            return update(this.viewsConfig[viewName], {
                props: {
                    $set: {
                        ...Object.assign({}, config.props),
                        ...Object.assign({}, props),
                        name:
                            viewNameGenerator &&
                            typeof viewNameGenerator === "function"
                                ? viewNameGenerator(this.state.views)
                                : viewName
                    }
                }
            });
        } else {
            throw new Error(
                `Passed view name '${viewName}' is not present in viewsConfig.`
            );
        }
    }

    /**
     * Array of views names to stay in `this.state.views` array when animation of views finishes.
     * Used in `::viewsAnimationEndCallback` default method to filter views when needed.
     * If you populate names in this array the filter feature will be active by default
     * unless you overwrite `::viewsAnimationEndCallback` method in descendant class.
     */
    viewsNamesToStayList = [];
    viewsAnimationEndCallback = () => {
        /**
         * If instance variable `viewsNamesToStayList` is set
         * then we filter views array to leave only those with names
         * present in `viewsNamesToStayList` list.
         */
        if (
            Array.isArray(this.viewsNamesToStayList) &&
            this.viewsNamesToStayList.length
        ) {
            this.viewsNamesToStayList.push(this.state.activeViewName);
            this.__filterViews(this.viewsNamesToStayList).then(() => {
                this.viewsNamesToStayList = [];
            });
        }
    };

    /**
     * Removes views that are not contained by name in array
     * @param {array} viewsNameList List of views names that will stay in state
     * @returns {Promise} Will be resolved on succesful state update
     */
    __filterViews(viewsNameList = []) {
        return new Promise(resolve => {
            this.setState(
                {
                    views: this.state.views.filter(
                        view => viewsNameList.indexOf(view.props.name) !== -1
                    )
                },
                resolve
            );
        });
    }

    /**
     * Disables scene's GUI by provinding extra layer on top of everything else.
     * This layer can be customize by `cover` argument.
     * @param {object} cover React element to be placed in covering layer
     * @returns {Promise}  Will be resolved on succesful state update
     */
    disableGUI = (cover = null) => {
        return new Promise(resolve =>
            this.setState(
                { GUIDisabled: true, GUIDisableCover: cover },
                resolve
            )
        );
    };

    /**
     * Disables layer covering scene and enable user interactions.
     * @returns {Promise} Will be resolved on succesful state update
     */
    enableGUI = () => {
        return new Promise(resolve =>
            this.setState(
                { GUIDisabled: false, GUIDisableCover: null },
                resolve
            )
        );
    };

    /**
     * Get view index in views array
     * @param {string} viewName
     * @returns {integer}
     */
    getViewIndex = viewName =>
        this.state.views.findIndex(view => view.props.name === viewName);

    /**
     * Private method for pushing new view config into this.state.views array
     * @param {object} config
     * @param {object} sceneProps
     * @returns {Promise}  Will be resolved on succesful state update
     */
    __pushView(config, sceneProps = {}) {
        const newviewdefinition = update(this.state.views, { $push: [config] });
        const stateChange = Object.assign(
            {
                views: newviewdefinition
            },
            Object.assign({}, config.sceneProps || {}),
            Object.assign({}, sceneProps)
        );

        return new Promise(resolve =>
            this.setState(stateChange, () => resolve(config.props.name))
        );
    }

    /**
     * Pops out with animation currently active view from view's array
     * @param {object} viewProps props to modify the view just before popping
     * @param {object} sceneProps props to modify the scene while popping
     * @returns {Promise}  Will be resolved on succesful state update or rejected when no view to pop
     */
    popView = (viewProps = {}, sceneProps = {}) => {
        if (this.state.views.length > 1) {
            const viewName = this.state.views[this.state.views.length - 2].props
                .name;

            return this.changeView(viewName, viewProps, sceneProps).then(() => {
                const newviewdefinition = update(this.state.views, {
                    $splice: [[this.state.views.length - 1, 1]]
                });

                delete this.refsCOMPViews[
                    this.state.views[this.state.views.length - 1].props.name
                ];

                return new Promise(resolve =>
                    this.setState({ views: newviewdefinition }, () =>
                        resolve(viewName)
                    )
                );
            });
        } else {
            return Promise.reject();
        }
    };

    /**
     * Check wheter object is valid view config and can be added to view's array
     * @param {object} object
     * @returns {bool}
     */
    isValidViewConfig(object) {
        return (
            typeof object === "object" &&
            "type" in object &&
            typeof object.props === "object" &&
            "name" in object.props
        );
    }

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
    changeView(view, viewProps = {}, sceneProps = {}) {
        return this.__changeView(view, viewProps, sceneProps).then(viewName => {
            return this.__performViewsAnimation(viewName);
        });
    }

    /**
     * Removes view from views array
     * @param {string} name
     */
    destroyView(name) {
        return new Promise((resolve, reject) => {
            const index = this.state.views.findIndex(
                view => view.props.name === name
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
        });
    }

    /**
     * Make modification to scene's views by pushing new, updating current or changing between added views
     *
     * @param {string|object} view View name to change or view config to be added
     * @param {object} viewProps Extra props to be added to changing view
     * @param {object} sceneProps Extra props to manipulate this scene while changing view
     * @returns {Promise} Resolved on state succesful change and animation end. Or reject on failure.
     */
    __changeView(view, viewProps = {}, sceneProps = {}) {
        if (typeof view === "string") {
            if (this.hasViewInState(view)) {
                //if already in state then update its props
                return new Promise(resolve => {
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

                    this.setState(stateChange, () => resolve(view));
                });
            } else if (this.hasViewInConfig(view)) {
                //push fresh config
                return this.__pushView(
                    this.getFreshViewConfig(view, viewProps),
                    sceneProps
                );
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
     * Check if view's name is described by some config in `this.viewsConfig` object
     * @param {string} name
     * @returns {bool}
     */
    hasViewInConfig = name => name in this.viewsConfig;

    /**
     * Check if view recognize by name argument is present in state
     * @param {string} name
     * @returns {bool}
     */
    hasViewInState = name =>
        this.state.views.findIndex(view => view.props.name === name) !== -1
            ? true
            : false;

    /**
     * Utility function to handle back button clicks.
     * Can be overwritten by class extending this wrapper.
     * By default it pops currently active view.
     * To use it, assign it's value to state like this:
     * this.state.handleBackButton = this.handleBackButton
     *
     * @returns {Promise} Resolved on state succesful change or reject on failure.
     */
    handleBackButton = (viewProps, sceneProps) => {
        if (this.state.views.length > 1) {
            return this.popView(viewProps, sceneProps);
        }

        return Promise.reject();
    };

    /**
     * Disables scene's sidepanel by setting it prop enabled = false.
     * @returns {Promise} Resolved on state succesful change or reject on failure.
     */
    disableSidepanel = () => {
        if (this.state.sidepanel && this.refCOMPSidepanel.current) {
            this.refCOMPSidepanel.current.disable();
            return new Promise(resolve =>
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

        return Promise.reject();
    };

    /**
     * Enables scene's sidepanel by setting it prop enabled = true.
     * @returns {Promise} Resolved on state succesful change or reject on failure.
     */

    enableSidepanel = () => {
        if (this.state.sidepanel && this.refCOMPSidepanel.current) {
            this.refCOMPSidepanel.current.enable();
            return new Promise(resolve =>
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

        return Promise.reject();
    };

    /**
     * Shows sidepanel
     * @returns {Promise}
     */
    openSidepanel = () => {
        if (this.state.sidepanel && this.refCOMPSidepanel.current) {
            return this.refCOMPSidepanel.current.show();
        }

        return Promise.reject();
    };

    /**
     * Hides sidepanel
     * @returns {Promise}
     */
    hideSidepanel = () => {
        if (this.state.sidepanel && this.refCOMPSidepanel.current) {
            return this.refCOMPSidepanel.current.hide();
        }

        return Promise.reject();
    };

    /**
     * Add new mayer to this.state.mayers configurations array.
     * This will immediatelly open new mayer due to `componentDidMount` lifecycle implementation.
     *
     * @param {object} config Mayer config object.
     * @returns {Promise}
     */
    openMayer(config) {
        if (
            this.state.mayers.findIndex(item => item.name === config.name) !==
            -1
        ) {
            console.warn(
                "[Airr] Scene allready has Mayer with this name: " + config.name
            );
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
    closeMayer(name) {
        let mayerConfigIndex = this.state.mayers.findIndex(
            item => item.name === name
        );

        if (
            mayerConfigIndex !== -1 &&
            (this.refsCOMPMayers[name] && this.refsCOMPMayers[name].current)
        ) {
            return new Promise(resolve => {
                this.refsCOMPMayers[name].current.animateOut(() => {
                    //renew index because after animation
                    //things might have changed
                    mayerConfigIndex = this.state.mayers.findIndex(
                        item => item.name === name
                    );

                    //last check if stil present
                    if (
                        mayerConfigIndex !== -1 &&
                        (this.refsCOMPMayers[name] &&
                            this.refsCOMPMayers[name].current)
                    ) {
                        this.__removeMayer(name).then(() => {
                            delete this.refsCOMPMayers[name];

                            if (this.state.sidepanel) {
                                let hasMayerLeft = false;
                                const children = [
                                    ...this.refDOM.current.children
                                ];
                                children.forEach(item => {
                                    if (item.classList.contains("airr-mayer")) {
                                        hasMayerLeft = true;
                                    }
                                });

                                if (!hasMayerLeft) {
                                    this.enableSidepanel();
                                }
                            }

                            resolve();
                        });
                    }
                });
            });
        }

        return Promise.resolve();
    }

    /**
     * If config has buttons that contains logical true `close` property,
     * this method will attach close mayer functionality to tap event on this button.
     *
     * @param {object} mayerConfig mayer config object
     * @returns {object}
     */
    __prepareMayerConfig(mayerConfig) {
        const config = Object.assign({}, mayerConfig);

        const ref = React.createRef();
        config.ref = ref;
        this.refsCOMPMayers[config.name] = ref;

        if (config.buttons && config.buttons.length) {
            config.buttons.forEach(item => {
                if (item.close) {
                    if (item.handler) {
                        const oldHandler = item.handler;
                        item.handler = e => {
                            oldHandler(e);
                            this.closeMayer(config.name);
                        };
                    } else {
                        item.handler = e => {
                            this.closeMayer(config.name);
                        };
                    }
                }
            });
        }

        config.avaibleHeight =
            this.refDOM.current.clientHeight || window.innerHeight;

        return config;
    }

    /**
     * Private utility for adding mayers
     * @param {objec} config
     * @returns {Promise}
     */
    __addMayer = config => {
        const newMayersDef = update(this.state.mayers, { $push: [config] });

        return new Promise(resolve =>
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

    __removeMayer = name => {
        const newMayersDef = this.state.mayers.filter(item => {
            return item.name !== name;
        });

        return new Promise(resolve =>
            this.setState(
                {
                    mayers: newMayersDef
                },
                resolve
            )
        );
    };

    /**
     * Disables back button meaning it will not be visible in navbar anymore.
     * @returns {Promise}
     */
    disableBackButton = () => {
        return new Promise(resolve =>
            this.setState({ backButton: false }, resolve)
        );
    };

    /**
     * Enables back button meaning it will be visible in navbar.
     * @returns {Promise}
     */
    enableBackButton = () => {
        return new Promise(resolve =>
            this.setState({ backButton: true }, resolve)
        );
    };

    /**
     * Action dispatcher method. Will return a function ready to fire view change.
     * @param {string} name
     * @param {array} viewsNamesToStayList
     * @returns {function} Function that will resolve view change on invoke.
     */
    goToView = (name, viewsNamesToStayList = []) => {
        return (params = {}, sceneProps = {}) => {
            this.viewsNamesToStayList = viewsNamesToStayList;
            return this.changeView(name, params, sceneProps);
        };
    };

    componentDidMount() {
        if (
            this.state.navbar &&
            this.state.navbarHeight &&
            this.refDOMContainer.current
        ) {
            //subsctract navbar height from scene's container
            this.refDOMContainer.current.style.height =
                this.refDOMContainer.current.parentNode.clientHeight -
                this.state.navbarHeight +
                "px";
        }

        if (this.state.sidepanel) {
            this.__updateSidepanelSizeProps(
                this.refDOM.current.clientWidth,
                this.refDOM.current.clientHeight
            );
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
            this.refsCOMPViews[
                this.state.activeViewName
            ].current.viewAfterActivation();
        }
    }

    /**
     * Private utility function for updating sidepanel's sceneWidth,sceneHeight properties
     * @param {number} width
     * @param {number} height
     * @returns {void}
     */
    __updateSidepanelSizeProps(width, height) {
        this.setState({
            sidepanel: update(this.state.sidepanel, {
                props: {
                    sceneWidth: { $set: width },
                    sceneHeight: { $set: height }
                }
            })
        });
    }
    /**
     * Private utility function for preparing sidepanel configuration objects
     * @param {object} sidepanel
     * @returns {object}
     */
    __prepareSidepanel(sidepanel) {
        sidepanel.props.ref = this.refCOMPSidepanel;
        sidepanel.props.visibilityCallback = isShown => {
            this.setState({
                sidepanel: update(this.state.sidepanel, {
                    props: {
                        isShown: {
                            $set: isShown
                        }
                    }
                })
            });
        };

        if (typeof sidepanel.props.enabled === "undefined") {
            sidepanel.props.enabled = true; //force explicit value, e.g needed when checking if panel is enabled in `openMayer` method
        }

        return Object.assign({}, sidepanel);
    }

    /**
     * Takes array of views and assign react specific properties (key and ref) to each view configuartion
     *
     * @param {array} views
     * @returns {array}
     */
    __prepareViews(views) {
        return views.map(item => {
            item.props.key = item.props.name;

            const ref = React.createRef();
            item.props.ref = ref;
            this.refsCOMPViews[item.props.name] = ref;

            return item;
        });
    }

    render() {
        const { views, sidepanel, className, ...stateRest } = this.state;

        return (
            <AirrScene
                {...{
                    ...stateRest,
                    views: this.__prepareViews(views),
                    sidepanel: sidepanel && this.__prepareSidepanel(sidepanel),
                    refDOM: this.refDOM,
                    refDOMContainer: this.refDOMContainer,
                    refDOMNavbar: this.refDOMNavbar,
                    refCOMPSidepanel: this.refCOMPSidepanel
                }}
                {...this.getViewProps()}
                {...{ className }}
            />
        );
    }

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
    __performViewsAnimation(newViewName) {
        if (typeof newViewName === "string") {
            this.viewChangeInProgress = true;

            return new Promise((resolve, reject) => {
                if (newViewName === this.state.activeViewName) {
                    console.warn("[Airr] This View is already active.");
                    this.viewChangeInProgress = false;
                    return resolve();
                }

                this.setState(
                    { GUIDisabled: true, mockTitle: newViewName },
                    () => {
                        if (this.getViewIndex(newViewName) !== -1) {
                            const oldViewName = this.state.activeViewName;
                            const newViewComp =
                                this.refsCOMPViews[newViewName] &&
                                this.refsCOMPViews[newViewName].current;
                            const oldViewComp =
                                this.refsCOMPViews[oldViewName] &&
                                this.refsCOMPViews[oldViewName].current;
                            const animEndCallback = () => {
                                this.viewChangeInProgress = false;

                                if (
                                    newViewComp &&
                                    typeof newViewComp.viewAfterActivation ===
                                        "function"
                                ) {
                                    newViewComp.viewAfterActivation();
                                }

                                if (
                                    oldViewComp &&
                                    typeof oldViewComp.viewAfterDeactivation ===
                                        "function"
                                ) {
                                    oldViewComp.viewAfterDeactivation();
                                }

                                if (
                                    typeof this.props
                                        .viewsAnimationEndCallback ===
                                    "function"
                                ) {
                                    this.props.viewsAnimationEndCallback();
                                }

                                resolve();
                            };

                            if (
                                newViewComp &&
                                typeof newViewComp.viewBeforeActivation ===
                                    "function"
                            ) {
                                newViewComp.viewBeforeActivation();
                            }

                            if (
                                oldViewComp &&
                                typeof oldViewComp.viewBeforeDeactivation ===
                                    "function"
                            ) {
                                oldViewComp.viewBeforeDeactivation();
                            }

                            if (this.state.animation) {
                                this.__doViewsAnimation(
                                    newViewName,
                                    oldViewName
                                ).then(() => {
                                    this.setState(
                                        {
                                            activeViewName: newViewName,
                                            GUIDisabled: false,
                                            mockTitle: false
                                        },
                                        animEndCallback
                                    );
                                });
                            } else {
                                this.setState(
                                    {
                                        activeViewName: newViewName,
                                        GUIDisabled: false,
                                        mockTitle: false
                                    },
                                    animEndCallback
                                );
                            }
                        } else {
                            this.viewChangeInProgress = false;
                            console.warn(
                                "[Airr] View with name " +
                                    newViewName +
                                    " is not presence in this Scene."
                            );
                            reject();
                        }
                    }
                );
            });
        } else {
            console.warn(
                "[Airr] You must specify view name property as string value"
            );
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
    __doViewsAnimation(newViewName, oldViewName) {
        return new Promise((resolve, reject) => {
            const newViewDOM =
                this.refsCOMPViews[newViewName] &&
                this.refsCOMPViews[newViewName].current &&
                this.refsCOMPViews[newViewName].current.refDOM &&
                this.refsCOMPViews[newViewName].current.refDOM.current;
            const oldViewIndex = this.getViewIndex(oldViewName);
            const newViewIndex = this.getViewIndex(newViewName);

            const direction = newViewIndex > oldViewIndex ? 1 : -1;

            if (!newViewDOM) {
                throw new Error("new view DOM refference was not found");
            }

            if (this.state.navbar) {
                //perform navbar animations
                const titleNode = this.refDOMNavbar.current.querySelector(
                    ".title"
                );
                const mockTitle = this.refDOMNavbar.current.querySelector(
                    ".mock-title"
                );
                const mockTextSpan = mockTitle && mockTitle.children[0];
                const mockTextSpanWidth = mockTextSpan
                    ? mockTextSpan.clientWidth
                    : 0;

                if (titleNode) {
                    AirrFX.doTransitionAnimation(
                        titleNode,
                        {
                            webkitTransform: `translate3d(${(titleNode.clientWidth /
                                2 +
                                mockTextSpanWidth / 2) *
                                direction +
                                "px"},0,0)`,
                            transform: `translate3d(${(titleNode.clientWidth /
                                2 +
                                mockTextSpanWidth / 2) *
                                direction +
                                "px"},0,0)`,
                            opacity: 0
                        },
                        [
                            `opacity ${this.state.animationTime}ms ease-out`,
                            `transform ${this.state.animationTime}ms ease-out`
                        ],
                        {
                            webkitTransform: `translate3d(0,0,0)`,
                            transform: `translate3d(0,0,0)`,
                            opacity: 1
                        },
                        null,
                        this.state.animationTime
                    );
                }

                if (mockTitle) {
                    AirrFX.doTransitionAnimation(
                        mockTitle,
                        {
                            webkitTransform: "translate3d(0,0,0)",
                            transform: "translate3d(0,0,0)",
                            opacity: 1
                        },
                        [
                            `opacity ${this.state.animationTime}ms ease-out`,
                            `transform ${this.state.animationTime}ms ease-out`
                        ],
                        {
                            webkitTransform: `translate3d(${mockTextSpanWidth *
                                direction *
                                -1 +
                                "px"},0,0)`,
                            transform: `translate3d(${mockTextSpanWidth *
                                direction *
                                -1 +
                                "px"},0,0)`,
                            opacity: 0
                        },
                        null,
                        this.state.animationTime
                    );
                }

                if (
                    this.state.backButton &&
                    !this.state.backButtonOnFirstView
                ) {
                    const backDOM = this.refDOMNavbar.current.querySelector(
                        ".back"
                    );

                    if (oldViewIndex === 0) {
                        //show back button with animation
                        AirrFX.doTransitionAnimation(
                            backDOM,
                            {
                                webkitTransform: "translate3d(100%,0,0)",
                                transform: "translate3d(100%,0,0)",
                                opacity: 0
                            },
                            [
                                `opacity ${
                                    this.state.animationTime
                                }ms ease-out`,
                                `transform ${
                                    this.state.animationTime
                                }ms ease-out`
                            ],
                            {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            },
                            () => backDOM.classList.remove("hidden"),
                            this.state.animationTime
                        );
                    } else if (newViewIndex === 0) {
                        //hide backbutton with animation
                        AirrFX.doTransitionAnimation(
                            backDOM,
                            {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            },
                            [
                                `opacity ${
                                    this.state.animationTime
                                }ms ease-out`,
                                `transform ${
                                    this.state.animationTime
                                }ms ease-out`
                            ],
                            {
                                webkitTransform: "translate3d(-100%,0,0)",
                                transform: "translate3d(-100%,0,0)",
                                opacity: 0
                            },
                            null,
                            this.state.animationTime,
                            () => {
                                backDOM.style.webkitTransform = "";
                                backDOM.style.transform = "";
                                backDOM.style.opacity = "";
                            }
                        );
                    }
                }
            }

            if (this.state.animation === "slide" && oldViewName) {
                newViewDOM.style.display = "block";
                let startProps = {};
                let endProps = {};

                if (direction === -1) {
                    startProps.webkitTransform =
                        "translate3d(" +
                        -1 * this.refDOM.current.clientWidth +
                        "px,0,0)";
                    startProps.transform =
                        "translate3d(" +
                        -1 * this.refDOM.current.clientWidth +
                        "px,0,0)";
                    endProps.webkitTransform = "translate3d(0,0,0)";
                    endProps.transform = "translate3d(0,0,0)";
                } else {
                    endProps.webkitTransform =
                        "translate3d(" +
                        -1 * this.refDOM.current.clientWidth +
                        "px,0,0)";
                    endProps.transform =
                        "translate3d(" +
                        -1 * this.refDOM.current.clientWidth +
                        "px,0,0)";
                }

                AirrFX.doTransitionAnimation(
                    this.refDOMContainer.current,
                    startProps,
                    [`transform ${this.state.animationTime}ms ease-out`],
                    endProps,
                    null,
                    this.state.animationTime,
                    () => {
                        newViewDOM.style.display = "";
                        this.refDOMContainer.current.style.webkitTransform =
                            "translate3d(0,0,0)";
                        this.refDOMContainer.current.style.transform =
                            "translate3d(0,0,0)";
                        this.refDOMContainer.current.style.webkitTransition =
                            "";
                        this.refDOMContainer.current.style.transition = "";
                        this.refDOMContainer.current.style.transition = "";
                        this.refDOMContainer.current.style.webkitBackfaceVisibility =
                            "";
                        this.refDOMContainer.current.style.backfaceVisibility =
                            "";

                        resolve();
                    }
                );
            } else if (this.state.animation === "overlay" && oldViewName) {
                if (direction === 1) {
                    AirrFX.doTransitionAnimation(
                        newViewDOM,
                        {
                            webkitTransform: `translate3d(${this.refDOMContainer
                                .current.clientWidth + "px"},0,0)`,
                            transform: `translate3d(${this.refDOMContainer
                                .current.clientWidth + "px"},0,0)`,
                            opacity: 0,
                            display: "block"
                        },
                        [
                            `opacity ${this.state.animationTime}ms ease-out`,
                            `transform ${this.state.animationTime}ms ease-out`
                        ],
                        {
                            webkitTransform: `translate3d(0,0,0)`,
                            transform: `translate3d(0,0,0)`,
                            opacity: 1
                        },
                        () => (newViewDOM.style.zIndex = 102),
                        this.state.animationTime,
                        () => {
                            newViewDOM.style.zIndex = "";
                            newViewDOM.style.display = "";
                            newViewDOM.style.transform = "";
                            newViewDOM.style.webkitTransform = "";
                            newViewDOM.style.transition = "";
                            newViewDOM.style.webkitTransition = "";
                            newViewDOM.style.opacity = "";

                            resolve();
                        }
                    );
                } else {
                    if (this.state.stackMode) {
                        const oldViewDOM = this.refsCOMPViews[oldViewName]
                            .current.refDOM.current;
                        newViewDOM.style.display = "block";
                        newViewDOM.style.opacity = 1;

                        AirrFX.doTransitionAnimation(
                            oldViewDOM,
                            {
                                webkitTransform: `translate3d(0,0,0)`,
                                transform: `translate3d(0,0,0)`,
                                opacity: 1
                            },
                            [
                                `opacity ${
                                    this.state.animationTime
                                }ms ease-out`,
                                `transform ${
                                    this.state.animationTime
                                }ms ease-out`
                            ],
                            {
                                webkitTransform: `translate3d(0,${this
                                    .refDOMContainer.current.clientHeight /
                                    4 +
                                    "px"},0)`,
                                transform: `translate3d(0,${this.refDOMContainer
                                    .current.clientHeight /
                                    4 +
                                    "px"},0)`,
                                opacity: 0
                            },
                            null,
                            this.state.animationTime,
                            () => {
                                oldViewDOM.style.transition = "";
                                oldViewDOM.style.webkitTransition = "";
                                oldViewDOM.style.transform = "";
                                oldViewDOM.style.webkitTransform = "";
                                oldViewDOM.style.opacity = "";

                                newViewDOM.style.display = "";
                                newViewDOM.style.opacity = "";

                                resolve();
                            }
                        );
                    } else {
                        newViewDOM.style.display = "block";

                        AirrFX.doTransitionAnimation(
                            newViewDOM,
                            {
                                webkitTransform: `translate3d(${-1 *
                                    this.refDOMContainer.current.clientWidth +
                                    "px"},0,0)`,
                                transform: `translate3d(${-1 *
                                    this.refDOMContainer.current.clientWidth +
                                    "px"},0,0)`,
                                opacity: 0
                            },
                            [
                                `opacity ${
                                    this.state.animationTime
                                }ms ease-out`,
                                `transform ${
                                    this.state.animationTime
                                }ms ease-out`
                            ],
                            {
                                webkitTransform: `translate3d(0,0,0)`,
                                transform: `translate3d(0,0,0)`,
                                opacity: 1
                            },
                            () => (newViewDOM.style.zIndex = 102),
                            this.state.animationTime,
                            () => {
                                newViewDOM.style.display = "";
                                newViewDOM.style.zIndex = "";
                                newViewDOM.style.transform = "";
                                newViewDOM.style.webkitTransform = "";
                                newViewDOM.style.transition = "";
                                newViewDOM.style.webkitTransition = "";
                                newViewDOM.style.opacity = "";

                                resolve();
                            }
                        );
                    }
                }
            } else if (this.state.animation === "fade" || !oldViewName) {
                AirrFX.doTransitionAnimation(
                    newViewDOM,
                    {
                        opacity: 0
                    },
                    [`opacity ${this.state.animationTime}ms ease-out`],
                    {
                        opacity: 1
                    },
                    () => (newViewDOM.style.zIndex = 102),
                    this.state.animationTime,
                    () => {
                        newViewDOM.style.zIndex = "";
                        resolve();
                    }
                );
            }
        });
    }
}

AirrSceneWrapper.defaultProps = {
    name: "",
    activeViewName: null,
    GUIDisabled: false,
    GUIDisableCover: null,
    animation: "slide",
    animationTime: 300,
    navbar: false,
    navbarHeight: 48,
    navbarMenu: null,
    navbarClass: "",
    backButton: false,
    backButtonOnFirstView: false,
    handleBackButton: null,
    handleBackBehaviourOnFirstView: null,
    viewsAnimationEndCallback: null,
    active: false,
    sidepanel: null,
    views: [],
    mayers: [],
    title: "",
    className: "",

    stackMode: false
};
AirrSceneWrapper.propTypes = {
    /**
     * The name of the scene. Must be unique among others views in parent scene. Will be used as identification string
     */
    name: PropTypes.string.isRequired,
    /**
     * Name of the active view.
     */
    activeViewName: PropTypes.string,
    /**
     * Boolean telling if GUI should be disabled meaning no user actions, events are allowed.
     * GUI is disabled via absolute positioned, not visible div that has the biggest z-Index
     */
    GUIDisabled: PropTypes.bool,
    /**
     * React element to be placed in GUI disabling div
     */
    GUIDisableCover: PropTypes.object,
    /**
     * Type of animation to perform when switching views
     */
    animation: PropTypes.oneOf(["slide", "overlay", "fade", false]),
    /**
     * Time of views changing animatio
     */
    animationTime: PropTypes.number,
    /**
     * Specify if navbar is present (1,true) or not (0,false). Or maybe hidden (-1)
     */
    navbar: PropTypes.oneOf([-1, 0, false, 1, true]),
    /**
     * Height of the navbar in pixels
     */
    navbarHeight: PropTypes.number,
    /**
     * Navbar menu is placed on the right most side. Might contain "toggleSidepanel" button or any custom buttons list.
     */
    navbarMenu: function(props, propName, componentName) {
        if (props[propName]) {
            if (typeof props[propName] === "string") {
                if (!/toggleSidepanel/.test(props[propName])) {
                    return new Error(
                        "Invalid prop `" +
                            propName +
                            "` supplied to" +
                            " `" +
                            componentName +
                            "`. Value must be `toggleSidepanel` string or array of React elements."
                    );
                } else {
                    return null;
                }
            }

            if (!Array.isArray(props[propName])) {
                return new Error(
                    "Invalid prop `" +
                        propName +
                        "` supplied to" +
                        " `" +
                        componentName +
                        "`. Value must be `toggleSidepanel` string or array of React elements."
                );
            }
        }
    },
    /**
     * Extra, space separated, navbar's class names list
     */
    navbarClass: PropTypes.string,
    /**
     * Boolean specifing if navbar renders BackButton. Placed by default on the left side of navbar.
     */
    backButton: PropTypes.bool,
    /**
     * Do you need to still show backButton even if scene is rendering first view from stack?
     */
    backButtonOnFirstView: PropTypes.bool,
    /**
     * Function that will handle back button click events
     */
    handleBackButton: PropTypes.func,
    /**
     * Function that will handle back button clicks events on when first view in stack is active
     */
    handleBackBehaviourOnFirstView: PropTypes.func,
    /**
     * Callback that will be invoked when views animation finishes
     */
    viewsAnimationEndCallback: PropTypes.func,
    /**
     * Is this view active in parent scene
     */
    active: PropTypes.bool,
    /**
     * Sidepanels declaration. Must contain two properties: `type` and `props`
     **/
    sidepanel: PropTypes.shape({
        /**
         * Refference to class or function that will render AirrSidepanel. Might be AirrSidepanel itself.
         */
        type: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
            .isRequired,
        /**
         * Special properties of AirrSidepanel class. Go to class declaration for further properties documenation.
         */
        props: PropTypes.shape({
            /**
             * Side to which sidepanel will be attached
             */
            side: PropTypes.oneOf(["left", "right", "top", "bottom"]),
            /**
             * Bool determining if sidepanel is shown or not
             */
            isShown: PropTypes.bool,
            /**
             * Bool determining if sidepanel is enabled, another words, if its can be drag out
             */
            enabled: PropTypes.bool,
            /**
             * Number between 0 and 1 determining how much size of whole screen sidepanel will take
             */
            sizeFactor: PropTypes.number,
            /**
             * Parent scene width dimension. Set by parent scene. Do not overwrite!.
             */
            sceneWidth: PropTypes.number,
            /**
             * Parent scene height dimension. Set by parent scene. Do not overwrite!.
             */
            sceneHeight: PropTypes.number,
            /**
             * Do you want to animate sidepanel showing in/out
             */
            animateShown: PropTypes.bool,
            /**
             * Callback called when sidepanel changes its visibility during touch events. Passed by scene itself.
             */
            visibilityCallback: PropTypes.func,
            /**
             * Animation time in miliseconds
             */
            animationTime: PropTypes.number,
            /**
             * Opacity between 0 and 1
             */
            bgLayerOpacity: PropTypes.number
        })
    }),
    /**
     * Array of `views`. Every view object declaration must contain two properties: `type` and `props`.
     */
    views: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * Refference to class or function that will render AirrView. The most common and adviced approach is to use AirrViewWrapper.
             */
            type: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
                .isRequired,
            /**
             * Special properties of AirrView class. Go to class declaration for further properties documenation.
             */
            props: PropTypes.shape({
                /**
                 * The name of the view. Must be unique among others views in scene. Will be used as identification string
                 */
                name: PropTypes.string.isRequired,
                /**
                 * Titlebar name. if parent scene navbar is enabled, this title will be showed there. Might be string or React element.
                 */
                title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
                /**
                 * Determine if this view is active. Set by parent scene.
                 */

                active: PropTypes.bool,
                /**
                 * Refference to view's root DOM element.
                 */
                refDOM: PropTypes.object,
                /**
                 * Extra classes to use. Space separetad string list.
                 */
                className: PropTypes.string,
                /**
                 * Extra styles to use upon root DOM element of view.
                 */
                style: PropTypes.object
            })
        })
    ),
    /**
     * Array of `mayers` objects that will be render into this Scene. Must contain special AirrMayer class properties.
     * To check the possible values of properties go to AirrMayer declaration.
     */
    mayers: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * The name of the mayer. Must be unique among others mayers in scene. Will be used as identification.
             */
            name: PropTypes.string.isRequired,
            /**
             * Extra styles to apply on Mayer's DOM element
             */
            style: PropTypes.object,
            /**
             * Parent scene height. Set by parent Scene. Do not overwrite!
             */
            avaibleHeight: PropTypes.number.isRequired,
            /**
             * Side from which mayer content box will enter
             */
            appearFrom: PropTypes.oneOf(["top", "bottom", "left", "right"]),
            /**
             * Side to which mayer content box will leave
             */
            leaveTo: PropTypes.oneOf(["top", "bottom", "left", "right"]),
            /**
             * Content of mayer
             */

            content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
            /**
             * Array with buttons configuration
             */
            buttons: PropTypes.arrayOf(
                PropTypes.shape({
                    /**
                     * Extra class names to use upon button
                     */
                    className: PropTypes.string,
                    /**
                     * Extra attributes to apply on HTML element
                     */
                    attrs: PropTypes.object,
                    /**
                     * Additional inline styles
                     */
                    style: PropTypes.object,
                    /**
                     * OnClick function handler
                     */
                    handler: PropTypes.func,
                    /**
                     * Content to render inside Mayer. Might be string or ReactElement.
                     */
                    content: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.object
                    ])
                })
            ),
            /**
             * Time in miliseconds of mayer's appear/disappear animation
             */
            animationTime: PropTypes.number
        })
    ),
    /**
     * Title that will be use in parent Scene navbar title section
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * Extra, space separated classes names to use upon first div element.
     */
    className: PropTypes.string,
    /**
     * This propety changes behaviour of views animation when overlay animation is set
     */
    stackMode: PropTypes.bool
};
