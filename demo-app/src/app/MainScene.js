import React from "react";
import { Sidepanel, SceneWrapper } from "./../lib/Airr";
import Welcome, { viewName as WelcomeViewName } from "./views/Welcome.js";
import MayersView, { viewName as MayersViewName } from "./views/Mayers.js";
import SidepanelView, {
    viewName as SidepanelViewName
} from "./views/Sidepanel.js";
import ScenesView, { viewName as ScenesViewName } from "./views/Scene.js";
import TabsView, { viewName as TabsViewName } from "./views/Tabs.js";
import update from "immutability-helper";

export const viewName = "main-scene";

const sidepanelSide = "left";
const sidepanelSizeFactor = 0.66;

export default class MainScene extends SceneWrapper {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            navbar: true,
            backButton: true,
            navbarMenu: "toggleSidepanel",
            activeViewName: WelcomeViewName,
            views: [this.getFreshViewConfig(WelcomeViewName)],
            handleBackButton: this.handleBackButton,
            mayers: [],
            sidepanel: {
                type: Sidepanel,
                props: {
                    side: sidepanelSide,
                    sizeFactor: sidepanelSizeFactor,
                    isShown: false,
                    children: this.getSidepanelContent(WelcomeViewName)
                }
            }
        };
    }

    viewsAnimationEnd(oldViewName, newViewName) {
        console.log(
            `[MainScene::viewsAnimationEnd] oldViewName: ${oldViewName}, newViewName: ${newViewName}`
        );
    }

    getSidepanelContent = viewname => {
        const description = this.viewsConfig[viewname].props.description;

        return (
            <div className="wrap col text-center">
                <div className="header">
                    <div className="header brd-b">airr-react</div>
                    <span className="info">This is Sidepanel</span>
                    <br />
                    <span className="info">
                        Drag to move: show or hide. Tap outside to close.
                    </span>
                </div>
                <div className="intro">
                    <div>
                        <span className="info">You currently viewing:</span>
                        {viewname}
                        <span className="info">screen</span>
                    </div>
                </div>
                <div className="description">{description}</div>
            </div>
        );
    };

    handleSidepanelSizeChange = e => {
        const sizeFactor = parseFloat(e.target.dataset.value);

        const sidepaneldefinition = update(this.state.sidepanel, {
            props: { sizeFactor: { $set: parseFloat(sizeFactor) } }
        });
        const viewsdefinition = update(this.state.views, {
            [this.getViewIndex(SidepanelViewName)]: {
                props: { sizeFactor: { $set: sizeFactor } }
            }
        });

        this.viewsConfig[SidepanelViewName].props.sizeFactor = sizeFactor;

        this.setState({
            views: viewsdefinition,
            sidepanel: sidepaneldefinition
        });
    };

    handleSidepanelSideChange = e => {
        const side = e.target.dataset.value;
        const sidepaneldefinition = update(this.state.sidepanel, {
            props: { side: { $set: side } }
        });
        const viewsdefinition = update(this.state.views, {
            [this.getViewIndex(SidepanelViewName)]: {
                props: { side: { $set: side } }
            }
        });

        this.viewsConfig[SidepanelViewName].props.side = side;

        this.setState({
            views: viewsdefinition,
            sidepanel: sidepaneldefinition
        });
    };

    handleMayerOpen = (e, cfg) => {
        const config = {
            name: "demo-mayer",
            content: cfg.content,
            appearFrom: cfg.appearFrom,
            leaveTo: cfg.leaveTo,
            buttons: [
                {
                    content: "Ok",
                    handler: () => this.closeMayer("demo-mayer")
                }
            ]
        };

        this.openMayer(config);
    };

    handleSceneViewMenuClick = viewConfig => {
        return this.changeView(viewConfig);
    };

    handleWelcomeViewMenuClick = e => {
        if (e.currentTarget.dataset.view in this.viewsConfig) {
            const viewName = e.currentTarget.dataset.view;
            const sidepanelContent = this.getSidepanelContent(viewName);
            const sidepaneldefinition = update(this.state.sidepanel, {
                props: { children: { $set: sidepanelContent } }
            });

            return this.changeView(
                viewName,
                {},
                { sidepanel: sidepaneldefinition }
            );
        }
    };

    handleBackButton = e => {
        if (this.state.views.length > 1) {
            const viewName = this.state.views[this.state.views.length - 2].props
                .name;

            if (viewName in this.viewsConfig) {
                const sidepanelContent = this.getSidepanelContent(viewName);
                const sidepaneldefinition = update(this.state.sidepanel, {
                    props: { children: { $set: sidepanelContent } }
                });

                return this.popView(null, {
                    sidepanel: sidepaneldefinition
                });
            }
        }
    };

    handleInfoBtnClick = content => {
        const config = {
            name: "scene-view-mayer",
            content: content,
            appearFrom: "top",
            leaveTo: "bottom",
            avaibleHeight: this.props.avaibleHeight,
            buttons: [
                {
                    content: "Ok",
                    handler: () => this.closeMayer("scene-view-mayer")
                }
            ]
        };

        this.openMayer(config);
    };

    viewsConfig = {
        [MayersViewName]: {
            type: MayersView,
            props: {
                name: MayersViewName,
                title: "Mayers",
                handleMayerOpen: this.handleMayerOpen,
                description: (
                    <div>
                        <p>
                            Mayers are Components that allow opening modals,
                            dialogs, popups and other so called boxes.
                        </p>
                        <p className="info">
                            This component is fully customizable. You can
                            declare it's content with text or html and define
                            specific behaviour on this content and Mayer
                            buttons.
                        </p>
                    </div>
                )
            }
        },
        [SidepanelViewName]: {
            type: SidepanelView,
            props: {
                name: SidepanelViewName,
                title: "Sidepanel",
                handleSideChange: this.handleSidepanelSideChange,
                handleSizeChange: this.handleSidepanelSizeChange,
                side: sidepanelSide,
                sizeFactor: sidepanelSizeFactor,
                description: (
                    <div>
                        <p>
                            Sidepanel component let you add draggable content
                            container to one of four sides of Scene component.
                            This space if offten used to hold application menu
                            or current view options.
                        </p>
                    </div>
                )
            }
        },
        [ScenesViewName]: {
            type: ScenesView,
            props: {
                name: ScenesViewName,
                title: "Scene",
                handleMenuClick: this.handleSceneViewMenuClick,
                description: (
                    <div>
                        <p>
                            Scenes are main components in airr-react library and
                            they hold most functionality and responsability.
                            Their purpose it to manage views and their
                            lifecysles during user interactions with the app.
                        </p>
                        <p className="info">
                            You can think of them as containers for views that
                            manipulate their state, animations and events.
                        </p>
                    </div>
                )
            }
        },
        [TabsViewName]: {
            type: TabsView,
            props: {
                name: "tabs",
                handleViewportScenePush: this.props.handleViewportScenePush,
                handleViewportViewPop: this.props.handleViewportViewPop,
                title: "Tabs",
                description: (
                    <div>
                        <p>
                            Tabs are just Scenes components that use custom
                            navigation element visible for user and specific
                            Scene configuration like stackMode=false which
                            signals little change in navbar elements animations.
                        </p>
                    </div>
                )
            }
        },
        [WelcomeViewName]: {
            type: Welcome,
            props: {
                name: WelcomeViewName,
                title: "airr-react",
                menuHandler: this.handleWelcomeViewMenuClick,
                description: (
                    <div>
                        <p>
                            This is entry point of airr-react demo. Explore
                            avaible components and check code for further
                            reference.
                        </p>
                    </div>
                )
            }
        }
    };
}
