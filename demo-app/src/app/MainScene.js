import React, {Component} from 'react';
import {Scene} from './../lib/Airr';
import {Sidepanel} from './../lib/Airr';
import Welcome from './views/Welcome.js';
import MayersView from './views/Mayers.js';
import SidepanelView from './views/Sidepanel.js';
import ScenesView from './views/Scene.js';
import TabsView from './views/Tabs.js';
import update from 'immutability-helper';

class MainScene extends Component {
    
    viewsConfig = {
            mayers: {
                type: MayersView,
                props: {
                    name: 'mayers',
                    title: 'Mayers',
                    handleMayerOpen: this.handleMayerOpen.bind(this),
                    description: (
                        <div>
                            <p>
                                Mayers are Components that allow opening modals, dialogs, popups and other so called boxes.
                            </p>
                            <p className="info">
                                This component is fully customizable. You can declare it's content with text or html and define specific behaviour on this content and Mayer buttons.
                            </p>
                        </div>
                    )
                }
            },
            sidepanel: {
                type: SidepanelView,
                props: {
                    name: 'sidepanel',
                    title: 'Sidepanel',
                    handleSideChange: this.handleSidepanelSideChange.bind(this),
                    handleSizeChange: this.handleSidepanelSizeChange.bind(this),
                    description: (
                        <div>
                            <p>
                                Sidepanel component let you add draggable content container to one of four sides of Scene component. 
                                This space if offten used to hold application menu or current view options.
                            </p>
                        </div>
                    )
                }
            },
            scene: {
                type: ScenesView,
                props: {
                    name: 'scenes-list',
                    title: 'Scene',
                    handleInfoBtnClick: this.handleInfoBtnClick.bind(this),
                    handleMenuClick: this.handleSceneViewMenuClick.bind(this),
                    description: (
                        <div>
                            <p>
                                Scenes are main components in airr-react library and they hold most functionality and responsability.
                                Their purpose it to manage views and their lifecysles during user interactions with the app.
                            </p>
                            <p className="info">
                                You can think of them as containers for views that manipulate their state, animations and events.
                            </p>
                        </div>
                    )
                }
            },
            tabs: {
                type: TabsView,
                props: {
                    name: 'tabs',
                    handleInfoBtnClick: this.handleInfoBtnClick.bind(this),
                    handleViewportScenePush: null,
                    handleBackBehaviourOnFirstView: null,
                    title: 'Tabs',
                    description: (
                        <div>
                            <p>
                                Tabs are just Scenes components that use custom navigation element visible for user and specific Scene configuration like stackMode=false. This stops views from being destroyed after it's deactivation.
                            </p>
                        </div>                            
                    )
                }
            },
            welcome: {
                props: {
                    description: (
                        <div>
                            <p>
                                This is entry point of airr-react demo. Explore avaible components and check code for further reference.
                            </p>
                        </div>                            
                    )
                }
            }
        };
    
    constructor(props) {
        super(props);

        this.handleMayerOpen = this.handleMayerOpen.bind(this);
        this.handleWelcomeViewMenuClick = this.handleWelcomeViewMenuClick.bind(this);
        this.handleSceneViewMenuClick = this.handleSceneViewMenuClick.bind(this);
        this.handleBackButton = this.handleBackButton.bind(this);
        
        this.viewsConfig.tabs.props.handleViewportScenePush = props.handleViewportScenePush;
        this.viewsConfig.tabs.props.handleBackBehaviourOnFirstView = props.handleBackBehaviourOnFirstView;
        
        const views = [
            {
                type: Welcome,
                props: {
                    name: 'welcome',
                    title: 'airr-react',
                    menuHandler: this.handleWelcomeViewMenuClick
                }
            }];

        const sidepanel = {
            type: Sidepanel,
            props: {
                children: this.getSidepanelContent('welcome'),
                sceneWidth: window.innerWidth,
                sceneHeight: window.innerHeight,
                side: 'left',
                sizeFactor: 0.66
            }
        };
        
        
        this.state = {
            views: views,
            activeViewName: 'welcome',
            sidepanel: sidepanel,
            mayers: []
        };
        
        this.viewsConfig.sidepanel.props.side = this.state.sidepanel.props.side;
        this.viewsConfig.sidepanel.props.sizeFactor = this.state.sidepanel.props.sizeFactor;
    }
    
    getSidepanelContent(viewname) {
        const description = this.viewsConfig[viewname].props.description;
        
        return (
            <div className="wrap col text-center">
                <div className="header">
                    <div className="header brd-b">airr-react</div>
                    <span className="info">This is Sidepanel</span><br/>
                    <span className="info">Drag to move: show or hide. Tap outside to close.</span>
                </div>
                <div className="intro">
                    <div><span className="info">You currently viewing:</span>{viewname}<span className="info">screen</span></div>
                </div>
                <div className="description">{description}</div>
            </div>
        );
    }
    
    handleSidepanelSizeChange(e) {
        const sizeFactor = parseFloat(e.target.dataset.value);
        
        const sidepaneldefinition = update(this.state.sidepanel, {props: {sizeFactor: {$set: parseFloat(sizeFactor)}}});
        const viewsdefinition = update(this.state.views, {[this.state.views.length - 1]: {props: {sizeFactor: {$set: sizeFactor}}}});
        
        this.viewsConfig.sidepanel.props.sizeFactor = sizeFactor;
        
        this.setState({
            views: viewsdefinition,
            sidepanel: sidepaneldefinition
        });
    }
    
    handleSidepanelSideChange(e) {
        const side = e.target.dataset.value;
        const sidepaneldefinition = update(this.state.sidepanel, {props: {side: {$set: side}}});
        const viewsdefinition = update(this.state.views, {[this.state.views.length - 1]: {props: {side: {$set: side}}}});
        
        this.viewsConfig.sidepanel.props.side = side;
        
        this.setState({
            views: viewsdefinition,
            sidepanel: sidepaneldefinition
        });
    }
    
    handleMayerOpen(e, cfg) {
        const config = {
            name: 'demo-mayer',
            content: cfg.content,
            appearFrom: cfg.appearFrom,
            leaveTo: cfg.leaveTo,
            avaibleHeight: this.props.avaibleHeight,
            buttons: [
                {
                    content: 'Ok',
                    handler: (e) => {
                        this.setState({mayers: []});
                    }
                }
            ]
        };
        
        const newmayersdefinition = update(this.state.mayers, {$push: [config]});
        this.setState({
            mayers: newmayersdefinition
        });
    }
    
    handleSceneViewMenuClick(viewConfig, e) {
        const newviewsdefinition = update(this.state.views, {$push: [viewConfig]});
        this.setState({
            activeViewName: viewConfig.props.name,
            views: newviewsdefinition
        });
    }

    handleWelcomeViewMenuClick(e) {
        if (e.currentTarget.dataset.view in this.viewsConfig) {
            
            const viewName = e.currentTarget.dataset.view;
            const viewConf = this.viewsConfig[viewName];
            const sidepanelContent = this.getSidepanelContent(viewName);
            const sidepaneldefinition = update(this.state.sidepanel, {props: {children: {$set: sidepanelContent}}});
            const newviewsdefinition = update(this.state.views, {$push: [viewConf]});
            
            this.setState({
                views: newviewsdefinition,
                activeViewName: viewConf.props.name,
                sidepanel: sidepaneldefinition
            });
        }
    }
    
    handleBackButton(e) {
        if (this.state.views.length > 1) {
            const viewName = this.state.views[this.state.views.length - 2].props.name;
            const newviewdefinition = update(this.state.views, {$splice: [[this.state.views.length - 1, 1]]});
            let stateUpdate = {
                activeViewName: viewName,
                views: newviewdefinition
            };
            
            if (viewName in this.viewsConfig) {
                const sidepanelContent = this.getSidepanelContent(viewName);
                const sidepaneldefinition = update(this.state.sidepanel, {props: {children: {$set: sidepanelContent}}});
                stateUpdate.sidepanel = sidepaneldefinition;
            }
            
            this.setState(stateUpdate);
        }        
    }
    
    handleInfoBtnClick(content) {
        const config = {
            name: 'scene-view-mayer',
            content: content,
            appearFrom: 'top',
            leaveTo: 'bottom',
            avaibleHeight: this.props.avaibleHeight,
            buttons: [
                {
                    content: 'Ok',
                    handler: (e) => {
                        this.setState({mayers: []});
                    }
                }
            ]
        };
        
        const newmayersdefinition = update(this.state.mayers, {$push: [config]});
        this.setState({
            mayers: newmayersdefinition
        });        
    }
    
    render() {
        return (
                <Scene 
                    views={this.state.views}
                    sidepanel={this.state.sidepanel}
                    activeViewName={this.state.activeViewName}
                    mayers={this.state.mayers}
                    animation={this.state.animation}
                    name={this.props.name}
                    ref="airrView"
                    animationTime={this.props.animationTime}
                    active={this.props.active}
                    navbar={this.props.navbar}
                    navbarMenu={this.props.navbarMenu}
                    backButton={this.props.backButton}
                    handleBackButton={this.handleBackButton}
                    backButtonOnFirstView={this.props.backButtonOnFirstView}
                    handleBackBehaviourOnFirstView={this.props.handleBackBehaviourOnFirstView}>
                </Scene>
                );
    }
}

export default MainScene;