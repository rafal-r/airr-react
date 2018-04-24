import React, { Component } from "react";
import AirrFX from "./AirrFX";
import AirrScene from "./AirrScene";
import update from "immutability-helper";

export default class AirrSceneWrapper extends Component {
    viewsConfig = {};

    refsCOMPViews = {};
    refCOMPSidepanel = React.createRef();
    refDOMContainer = React.createRef();
    refDOMNavbar = React.createRef();
    refDOMScene = React.createRef();

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
            stackMode: props.stackMode,
            handleBackButton: props.handleBackButton
        };
    }

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
            this.filterViews(this.viewsNamesToStayList).then(() => {
                this.viewsNamesToStayList = [];
            });
        }
    };

    filterViews(viewsNameList = []) {
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

    disableGUI = (cover = null) => {
        return new Promise(resolve =>
            this.setState(
                { GUIDisabled: true, GUIDisableCover: cover },
                resolve
            )
        );
    };

    enableGUI = () => {
        return new Promise(resolve =>
            this.setState(
                { GUIDisabled: false, GUIDisableCover: null },
                resolve
            )
        );
    };

    popView = () => {
        if (this.state.views.length > 1) {
            const viewName = this.state.views[this.state.views.length - 2].props
                .name;
            const newviewdefinition = update(this.state.views, {
                $splice: [[this.state.views.length - 1, 1]]
            });
            const stateChange = Object.assign(
                {
                    activeViewName: viewName,
                    views: newviewdefinition
                },
                Object.assign(
                    {},
                    this.viewsConfig[viewName] &&
                        this.viewsConfig[viewName].sceneProps
                )
            );

            return new Promise(resolve =>
                this.setState(stateChange, () => {
                    setTimeout(resolve, this.viewAnimationTime + 10);
                })
            );
        } else {
            return Promise.reject();
        }
    };

    pushView(config, sceneProps = {}) {
        const newviewdefinition = update(this.state.views, { $push: [config] });
        const stateChange = Object.assign(
            {
                views: newviewdefinition
            },
            typeof config.sceneProps === "object"
                ? { ...config.sceneProps }
                : {},
            ...Object.assign({}, sceneProps)
        );

        return new Promise(resolve => this.setState(stateChange, resolve));
    }

    getViewIndex = viewName =>
        this.state.views.findIndex(view => view.props.name === viewName);

    animateViewChange(name, viewProps = {}, sceneProps = {}) {
        return this.changeView(name, viewProps, sceneProps).then(() => {
            return this.__performViewsAnimation(name);
        });
    }

    changeView(name, viewProps = {}, sceneProps = {}) {
        if (this.hasViewInState(name)) {
            return new Promise(resolve => {
                const viewIndex = this.getViewIndex(name);
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

                this.setState(stateChange, resolve);
            });
        } else if (this.hasViewInConfig(name)) {
            return this.pushView(
                this.getFreshViewConfig(name, viewProps),
                sceneProps
            );
        } else return Promise.reject();
    }

    viewChangeInProgress = false;
    /**
     * Changes scenes active view
     *
     * @param {string} newViewName
     * @returns {void}
     */
    __performViewsAnimation(newViewName) {
        if (typeof newViewName === "string") {
            /**
             * viewChangeInProgress
             * set here before any next setState call which might be executed after some batched state changes
             * (that will repeat activeViewName and viewChangeInProgress will not be set in componentWillReceiveProps)
             */
            this.viewChangeInProgress = true;
            return new Promise((resolve, reject) => {
                this.setState(
                    { GUIDisabled: true, mockTitle: newViewName },
                    () => {
                        if (newViewName === this.state.activeViewName) {
                            console.warn("[Airr] This View is already active.");
                            this.viewChangeInProgress = false;
                            this.setState({ GUIDisabled: false });
                            return;
                        }

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
     * Perform animation between old and new active view
     *
     * @param {string} newViewName
     * @param {string} oldViewName
     * @returns {void}
     */
    __doViewsAnimation(newViewName, oldViewName) {
        return new Promise((resolve, reject) => {
            const newViewDOM =
                this.refsCOMPViews[newViewName] &&
                this.refsCOMPViews[newViewName].current &&
                this.refsCOMPViews[newViewName].current.refs.airrView.refs.dom;
            const oldViewIndex = this.getViewIndex(oldViewName);
            const newViewIndex = this.getViewIndex(newViewName);

            const direction = newViewIndex > oldViewIndex ? 1 : -1;

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
                            `opacity ${this.props.animationTime}ms ease-out`,
                            `transform ${this.props.animationTime}ms ease-out`
                        ],
                        {
                            webkitTransform: `translate3d(0,0,0)`,
                            transform: `translate3d(0,0,0)`,
                            opacity: 1
                        },
                        null,
                        this.props.animationTime
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
                            `opacity ${this.props.animationTime}ms ease-out`,
                            `transform ${this.props.animationTime}ms ease-out`
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
                        this.props.animationTime
                    );
                }

                if (this.state.backButton && this.props.stackMode) {
                    const backDOM = this.refDOMNavbar.current.querySelector(
                        ".back"
                    );

                    if (oldViewIndex === 0) {
                        AirrFX.doTransitionAnimation(
                            backDOM,
                            {
                                webkitTransform: "translate3d(100%,0,0)",
                                transform: "translate3d(100%,0,0)",
                                opacity: 0
                            },
                            [
                                `opacity ${
                                    this.props.animationTime
                                }ms ease-out`,
                                `transform ${
                                    this.props.animationTime
                                }ms ease-out`
                            ],
                            {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            },
                            () => backDOM.classList.remove("hidden"),
                            this.props.animationTime
                        );
                    } else if (newViewIndex === 0) {
                        AirrFX.doTransitionAnimation(
                            backDOM,
                            {
                                webkitTransform: "translate3d(0,0,0)",
                                transform: "translate3d(0,0,0)",
                                opacity: 1
                            },
                            [
                                `opacity ${
                                    this.props.animationTime
                                }ms ease-out`,
                                `transform ${
                                    this.props.animationTime
                                }ms ease-out`
                            ],
                            {
                                webkitTransform: "translate3d(-100%,0,0)",
                                transform: "translate3d(-100%,0,0)",
                                opacity: 0
                            },
                            null,
                            this.props.animationTime
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
                        -1 * this.refDOMScene.current.clientWidth +
                        "px,0,0)";
                    startProps.transform =
                        "translate3d(" +
                        -1 * this.refDOMScene.current.clientWidth +
                        "px,0,0)";
                    endProps.webkitTransform = "translate3d(0,0,0)";
                    endProps.transform = "translate3d(0,0,0)";
                } else {
                    endProps.webkitTransform =
                        "translate3d(" +
                        -1 * this.refDOMScene.current.clientWidth +
                        "px,0,0)";
                    endProps.transform =
                        "translate3d(" +
                        -1 * this.refDOMScene.current.clientWidth +
                        "px,0,0)";
                }

                AirrFX.doTransitionAnimation(
                    this.refDOMContainer.current,
                    startProps,
                    [`transform ${this.props.animationTime}ms ease-out`],
                    endProps,
                    null,
                    this.props.animationTime,
                    () => {
                        newViewDOM.style.display = "";
                        this.refDOMContainer.current.style.webkitTransform =
                            "translate3d(0,0,0)";
                        this.refDOMContainer.current.style.transform =
                            "translate3d(0,0,0)";
                        this.refDOMContainer.current.style.webkitTransition = "";
                        this.refDOMContainer.current.style.transition = "";
                        this.refDOMContainer.current.style.transition = "";
                        this.refDOMContainer.current.style.webkitBackfaceVisibility = "";
                        this.refDOMContainer.current.style.backfaceVisibility = "";

                        resolve();
                    }
                );
            } else if (this.state.animation === "overlay" && oldViewName) {
                if (direction === 1) {
                    AirrFX.doTransitionAnimation(
                        newViewDOM,
                        {
                            webkitTransform: `translate3d(${this.refDOMContainer.current
                                .clientWidth + "px"},0,0)`,
                            transform: `translate3d(${this.refDOMContainer.current
                                .clientWidth + "px"},0,0)`,
                            opacity: 0
                        },
                        [
                            `opacity ${this.props.animationTime}ms ease-out`,
                            `transform ${this.props.animationTime}ms ease-out`
                        ],
                        {
                            webkitTransform: `translate3d(0,0,0)`,
                            transform: `translate3d(0,0,0)`,
                            opacity: 1
                        },
                        () => (newViewDOM.style.zIndex = 102),
                        this.props.animationTime,
                        () => {
                            newViewDOM.style.zIndex = "";
                            resolve();
                        }
                    );
                } else {
                    if (this.props.stackMode) {
                        AirrFX.doTransitionAnimation(
                            this.refsCOMPViews[oldViewName].refs.airrView.refs
                                .dom,
                            {
                                webkitTransform: `translate3d(0,0,0)`,
                                transform: `translate3d(0,0,0)`,
                                opacity: 1
                            },
                            [
                                `opacity ${
                                    this.props.animationTime
                                }ms ease-out`,
                                `transform ${
                                    this.props.animationTime
                                }ms ease-out`
                            ],
                            {
                                webkitTransform: `translate3d(0,${this
                                    .refDOMContainer.current.clientHeight /
                                    4 +
                                    "px"},0)`,
                                transform: `translate3d(0,${this.refDOMContainer.current
                                    .clientHeight /
                                    4 +
                                    "px"},0)`,
                                opacity: 0
                            },
                            null,
                            this.props.animationTime,
                            resolve
                        );
                    } else {
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
                                    this.props.animationTime
                                }ms ease-out`,
                                `transform ${
                                    this.props.animationTime
                                }ms ease-out`
                            ],
                            {
                                webkitTransform: `translate3d(0,0,0)`,
                                transform: `translate3d(0,0,0)`,
                                opacity: 1
                            },
                            () => (newViewDOM.style.zIndex = 102),
                            this.props.animationTime,
                            () => {
                                newViewDOM.style.zIndex = "";
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
                    [`opacity ${this.props.animationTime}ms ease-out`],
                    {
                        opacity: 1
                    },
                    () => (newViewDOM.style.zIndex = 102),
                    this.props.animationTime,
                    () => {
                        newViewDOM.style.zIndex = "";
                        resolve();
                    }
                );
            }
        });
    }

    hasViewInConfig = name => name in this.viewsConfig;

    hasViewInState = name =>
        this.state.views.findIndex(view => view.props.name === name) !== -1
            ? true
            : false;

    handleBackButton = () => {
        if (this.state.views.length > 1) {
            return this.popView();
        }

        return Promise.reject();
    };

    disableSidepanel = () => {
        if (this.state.sidepanel.props.enabled) {
            return new Promise(resolve =>
                this.setState(
                    {
                        sidepanel: update(this.state.sidepanel, {
                            props: { enabled: { $set: false } }
                        })
                    },
                    resolve
                )
            );
        }

        return Promise.reject();
    };

    enableSidepanel = (content = null) => {
        return new Promise(resolve =>
            this.setState(
                {
                    sidepanel: update(this.state.sidepanel, {
                        props: {
                            enabled: { $set: true },
                            children: { $set: content }
                        }
                    })
                },
                resolve
            )
        );
    };

    openSidepanel = () => {
        return new Promise(resolve =>
            this.setState(
                {
                    sidepanel: update(this.state.sidepanel, {
                        props: {
                            isShown: { $set: true },
                            animateShown: { $set: true }
                        }
                    })
                },
                resolve
            )
        );
    };

    addMayer = config => {
        const newMayersDef = update(this.state.mayers, { $push: [config] });

        return new Promise(resolve =>
            this.setState(
                {
                    mayers: newMayersDef
                },
                () => {
                    setTimeout(resolve, this.mayerAnimationTime);
                }
            )
        );
    };

    removeMayer = name => {
        const newMayersDef = this.state.mayers.filter(item => {
            return item.name !== name;
        });

        return new Promise(resolve =>
            this.setState(
                {
                    mayers: newMayersDef
                },
                () => {
                    setTimeout(resolve, this.mayerAnimationTime);
                }
            )
        );
    };

    disableBackButton = () => {
        return new Promise(resolve =>
            this.setState({ backButton: false }, resolve)
        );
    };

    enableBackButton = () => {
        return new Promise(resolve =>
            this.setState({ backButton: true }, resolve)
        );
    };

    goToView = (name, viewsNamesToStayList = []) => {
        return (params = {}) => {
            this.viewsNamesToStayList = viewsNamesToStayList;
            return this.changeView(name, params);
        };
    };

    componentDidMount() {
        if (
            this.state.navbar &&
            this.state.navbarHeight &&
            this.refDOMContainer.current
        ) {
            this.refDOMContainer.current.style.height =
                this.refDOMContainer.current.parentNode.clientHeight -
                this.state.navbarHeight +
                "px";
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

    prepareSidepanel(sidepanel) {
        sidepanel.props.ref = this.refCOMPSidepanel;
        if (typeof sidepanel.props.enabled === "undefined") {
            sidepanel.props.enabled = true; //force explicit value, e.g needed when checking if panel is enabled in `openMayer` method
        }
        return sidepanel;
    }

    /**
     * Takes array of views and assign react specific properties (key and ref) to each view configuartion
     *
     * @param {array} views
     * @returns {void}
     */
    prepareViews(views) {
        return views.map(item => {
            item.props.key = item.props.name;

            if (!this.refsCOMPViews[item.props.name]) {
                const ref = React.createRef();
                item.props.ref = ref;
                this.refsCOMPViews[item.props.name] = ref;
            }

            return item;
        });
    }

    render() {
        console.log("airr scene wrapper render");

        return (
            <AirrScene
                {...{
                    ...this.state,
                    views: this.prepareViews(this.state.views),
                    sidepanel:
                        this.state.sidepanel &&
                        this.prepareSidepanel(this.state.sidepanel),
                    refDOMScene: this.refDOMScene,
                    refDOMContainer: this.refDOMContainer,
                    refDOMNavbar: this.refDOMNavbar
                }}
            />
        );
    }
}
AirrSceneWrapper.propTypes = AirrScene.propTypes;
AirrSceneWrapper.defaultProps = AirrScene.defaultProps;
