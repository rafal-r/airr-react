import React from 'react';
import AirrComponent from './AirrComponent.js';
import AirrFX from '../utils/AirrFX.js';
import AirrMayer from './AirrMayer';
import update from 'immutability-helper';

class AirrScene extends AirrComponent {
    //TODO Czy nie zamienić activeViewName na activeViewIndex
    
    viewsDOMRefs = {};
    sceneDOM = null;
    containerDOM = null;
    navbarDOM = null;
    mayersCompsRefs = {};
    sidepanelComp = null;

    constructor(props) {
        super(props);
        const self = this;

        const views = props.views.map((item) => {
            item.props.key = item.props.name;
            item.props.viewDOMRef = (view) => self.viewsDOMRefs[item.props.name] = view;
            return item;
        });

        if (props.sidepanel) {
            props.sidepanel.props.ref = comp => this.sidepanelComp = comp;
            if (typeof props.sidepanel.props.enabled === 'undefined') {
                props.sidepanel.props.enabled = true; //force default explicit value, e.g needed when checking if panel is enabled in `openMayer` method
            }
        }


        this.state = {
            active: props.active,
            navbar: props.navbar,
            width: props.width,
            height: props.height,
            activeViewName: props.activeViewName,
            animation: props.animation,
            views: views,
            sidepanel: props.sidepanel,
            GUIDisabled: false,
            mayers: []
        };
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps');

        if (this.state.activeViewName !== nextProps.activeViewName) {
            if (this.state.animation) {
                this.changeActiveView(nextProps.activeViewName);
            } else {
                this.setState({
                    activeViewName: nextProps.activeViewName
                });
            }
        }
    }

    getViewIndex(viewName) {
        let index = -1;

        this.state.views.forEach((config, i) => {
            if (config.props.name === viewName) {
                index = i;
            }
        });

        return index;
    }

    popView() {
        const index = this.getViewIndex(this.state.activeViewName);

        if (index >= 1) {
            const prevIndex = index - 1;
            const prevViewName = this.state.views[prevIndex].props.name;
            const newviewdefinition = update(this.state.views, {$splice: [[index, 1]]});

            this.changeActiveView(prevViewName, () => {
                this.setState({
                    views: newviewdefinition
                });
            });
        } else {
            console.warn('[Airr] Can`t pop view. Only one view in stack.');
        }
    }

    pushView(config) {
        config.props.key = config.props.name;
        config.props.viewDOMRef = (view) => this.viewsDOMRefs[config.props.name] = view;

        const newviewdefinition = update(this.state.views, {$push: [config]});
        
        this.setState({views: newviewdefinition}, () => {
            this.changeActiveView(config.props.name);
        });
    }

    openMayer(config) {
        let cancel = false;
        this.state.mayers.forEach(item => {
            if (item.name === config.name) {
                console.warn('[Airr] Scene allready has Mayer with this name: ' + item.name);
                cancel = true;
            }
        });

        if (cancel) {
            return false;
        }

        if (this.state.sidepanel && this.state.sidepanel.props.enabled) {
            this.disableSidepanel();
        }

        const newMayersDefinition = update(this.state.mayers, {$push: [config]});
        this.setState({mayers: newMayersDefinition});
    }

    closeMayer(name) {
        let mayerConfigIndex = -1;

        this.state.mayers.forEach((config, i) => {
            if (config.name === name) {
                mayerConfigIndex = i;
            }
        });

        if (mayerConfigIndex >= 0 && this.mayersCompsRefs[name]) {
            this.mayersCompsRefs[name].animateOut(() => {
                const newMayerDefinition = update(this.state.mayers, {$splice: [[mayerConfigIndex, 1]]});
                delete this.mayersCompsRefs[name];
                this.setState({mayers: newMayerDefinition});

                if (this.state.sidepanel) {
                    let hasMayerLeft = false;
                    const children = [...this.sceneDOM.children];
                    children.forEach((item) => {
                        if (item.classList.contains('mayer')) {
                            hasMayerLeft = true;
                        }
                    });

                    if (!hasMayerLeft) {
                        this.enableSidepanel();
                    }
                }
            });
        }


    }

    closeALlMayers() {
        if (this.state.mayers.length) {
            this.setState({mayers: []});
        }

        if (this.state.sidepanel && !this.state.sidepanel.props.enabled) {
            this.enableSidepanel();
        }

        this.mayersCompsRefs = {};
    }

    changeActiveView(newViewName, callback) {
        if (typeof newViewName === 'string') {

            this.setState({GUIDisabled: true}, () => {

                if (newViewName === this.state.activeViewName) {
                    console.warn('[Airr] This View is already active.');
                    return;
                }

                let found = false;

                this.state.views.forEach((view) => {
                    if (view.props.name === newViewName) {
                        found = true;
                    }
                });

                if (!found) {
                    console.warn('[Airr] View with name ' + newViewName + ' is not presence in this Scene.');
                } else {
                    this.doViewAnimation(newViewName, this.state.activeViewName, () => {
                        this.setState({
                            activeViewName: newViewName,
                            GUIDisabled: false
                        }, () => {
                            if (typeof callback === 'function') {
                                callback();
                            }
                        });
                    });
                }
            });

        } else {
            console.warn('[Airr] You must specify view name property as string value');
        }
    }

    doViewAnimation(newViewName, oldViewName, callback) {
        const newViewDOM = this.viewsDOMRefs[newViewName];
        const oldViewIndex = this.getViewIndex(oldViewName);
        const newViewIndex = this.getViewIndex(newViewName);

        if (this.state.animation === 'slide') {
            const direction = newViewIndex > oldViewIndex ? 1 : -1;
            
            if (this.state.navbar) {
                const newTitle = document.createElement('div');
                const oldTitle = this.navbarDOM.querySelector('.title');
                newTitle.classList.add('new-title');
                newTitle.textContent = this.state.views[this.getViewIndex(newViewName)].props.title;
                
                this.navbarDOM.appendChild(newTitle);
                
                const transVal = (this.navbarDOM.querySelector('.title').clientWidth / 2 + newTitle.clientWidth / 2) * direction;
                newTitle.style.webkitTransform = `translate3d(${transVal}px,0,0)`;
                newTitle.style.transform = `translate3d(${transVal}px,0,0)`;
                AirrFX.doTitlebarAnimation(oldTitle, newTitle, this.props.animationTime, direction === 1 ? 'left' : 'right', this.navbarDOM);
                setTimeout(()=> {
                    oldTitle.style.cssText = null;
                    this.navbarDOM.removeChild(newTitle);
                }, this.props.animationTime);
            }
            
            AirrFX.doSlideAnimation(newViewDOM, this.sceneDOM, this.containerDOM, this.props.animationTime, direction, callback);
        } else if (this.state.animation === 'overlay') {
            AirrFX.doOverlayAnimation(newViewDOM, this.sceneDOM, this.props.animationTime, 'top', callback);
        }
    }

    enableGUI() {
        this.setState({GUIDisabled: false});
    }

    disableGUI() {
        this.setState({GUIDisabled: true});
    }

    enableSidepanel() {
        if (this.state.sidepanel) {
            const newPanelDefinition = update(this.state.sidepanel, {props: {enabled: {$set: true}}});
            this.setState({sidepanel: newPanelDefinition});
        }
    }

    disableSidepanel() {
        if (this.state.sidepanel) {
            const newPanelDefinition = update(this.state.sidepanel, {props: {enabled: {$set: false}}});
            this.setState({sidepanel: newPanelDefinition});
        }
    }

    updateSidepanel(sidepanel) {
        // let sp =  {
        //     type: MainNavSidepanel,
        //     props: {
        //         sceneWidth: window.innerWidth,
        //         sceneHeight: window.innerHeight,
        //         side: 'right',
        //         isShown: true,
        //         dragCtnStyle: {backgroundColor: 'yellow'},
        //         enabled: false
        //     }
        // };

        this.setState({
            sidepanel: sidepanel
        });
    }

    getNavbarTitle() {
        let title = '';
        this.state.views.forEach((item) => {
            if (item.props.name === this.state.activeViewName) {
                title = item.props.title;
            }
        });

        return title;
    }

    handleBackButton(e) {
        if (this.state.views.length > 1) {
            this.popView();
        }
    }

    handleMenuButton(e) {
        if (this.sidepanelComp) {
            this.sidepanelComp.isShown() ? this.sidepanelComp.hide() : this.sidepanelComp.show();
        }
    }

    render() {
        console.log('Airr Scene render');

        const containerClassList = ['container', this.state.animation + '-animation'];

        let className = 'view scene';
        this.state.active && (className += ' active');

        let views = [];
        this.state.views.forEach((item) => {
            let viewProps = {};
            Object.assign(viewProps, item.props);

            viewProps.width = this.state.width;
            viewProps.height = this.state.height;

            if (viewProps.name === this.state.activeViewName) {
                viewProps.active = true;
            }

            views.push(React.createElement(item.type, viewProps));
        });



        let containerStyle = {};
        if (this.state.animation === 'slide') {
            containerStyle = {width: this.props.width ? this.props.width * 2 + 'px' : parseFloat(this.props.width) * 2 + 'px'};
        }

        let sidepanel = null;
        if (this.state.sidepanel) {
            sidepanel = React.createElement(this.state.sidepanel.type, this.state.sidepanel.props);
        }


        let blankmask = null;
        if (this.state.GUIDisabled) {
            blankmask = <div className="blank-mask"/>;
        }

        let mayers = [];
        if (this.state.mayers.length) {
            mayers = this.state.mayers.map((mayerProps) => {
                mayerProps.key = mayerProps.name;
                mayerProps.ref = (component) => this.mayersCompsRefs[mayerProps.name] = component;
                return React.createElement(AirrMayer, mayerProps);
            });
        }

        let navbar = null;
        if (this.state.navbar) {
            const back = this.state.views.length > 1 ? <div className="back" onClick={(e) => this.handleBackButton(e)}><div></div></div> : null;
            const menu = this.state.sidepanel ? <div className="menu" onClick={(e) => this.handleMenuButton(e)}><div></div></div> : null;
            navbar = (
                    <div className="navbar" ref={dom => this.navbarDOM = dom}>
                        {back}
                        <div className="title">{this.getNavbarTitle()}</div>
                        {menu}
                    </div>
                    );
        }

        return (
                <div className={className} style={{width: this.props.width + 'px', height: this.props.height + 'px'}}
                     ref={div => this.sceneDOM = div}>
                                    {navbar}
                    <div className={containerClassList.join(' ')} style={containerStyle}
                         ref={div => this.containerDOM = div}>
                        {views}
                    </div>
                    {this.props.children}
                    {sidepanel}
                    {mayers}
                    {blankmask}
                </div>
                            );
                }
    }

    AirrScene.defaultProps = {
        animation: 'slide', //slide or overlay
        navbar: false, //bool
        activeViewName: null, //string 
        name: '', //Scene name
        active: false, //bool
        width: null, //number
        height: null, //number
        animationTime: 300, //number
        sidepanel: null, //{type: AirrSidepanel, props: {}}
        views: [] //array
    };

    export default AirrScene;
