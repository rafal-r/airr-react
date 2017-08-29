import React from 'react';
import AirrComponent from './AirrComponent.js';
import AirrFX from '../utils/AirrFX.js';
import AirrMayer from './AirrMayer';
import update from 'react-addons-update';

class AirrScene extends AirrComponent {
    viewsDOMRefs = {};
    sceneDOM = null;
    containerDOM = null;
    mayersCompsRefs = {};

    constructor(props) {
        super(props);
        const self = this;

        const views = props.views.map((item) => {
            item.props.key = item.props.name;
            item.props.viewDOMRef = (view) => self.viewsDOMRefs[item.props.name] = view;
            return item;
        });

        if (props.sidepanel && typeof props.sidepanel.props.enabled === 'undefined') {
            props.sidepanel.props.enabled = true; //force default explicit value, e.g needed when checking if panel is enabled in `openMayer` method
        }

        this.state = {
            active: props.active,
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
                this.changeActiveView(nextProps.activeViewName)
            }
            else {
                this.setState({
                    activeViewName: nextProps.activeViewName
                });
            }
        }
    }

    openMayer(config) {
        let cancel = false;
        this.state.mayers.forEach(item => {
            if (item.name === config.name) {
                console.warn('Scene allready has Mayer with this name: ' + item.name);
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

    changeActiveView(newViewName) {
        if (typeof newViewName === 'string') {

            this.setState({GUIDisabled: true});

            if (newViewName === this.state.activeViewName) {
                console.warn('This View is already active.');
                return;
            }

            let found = false;

            this.state.views.forEach((view) => {
                if (view.props.name === newViewName) {
                    found = true;
                }
            });

            if (!found) {
                console.warn('View with name ' + newViewName + ' is not presence in this Scene.');
            }
            else {
                this.doViewAnimation(newViewName, this.state.activeViewName, () => {
                    this.setState({
                        activeViewName: newViewName,
                        GUIDisabled: false
                    });
                });
            }
        }
        else {
            console.warn('You must specify view name property as string value');
        }
    }

    doViewAnimation(newViewName, oldViewName, callback) {
        const newViewDOM = this.viewsDOMRefs[newViewName];
        let oldViewIndex, newViewIndex;

        this.state.views.forEach((item, i) => {
            if (item.props.name === newViewName) {
                newViewIndex = i;
            }
            if (item.props.name === oldViewName) {
                oldViewIndex = i;
            }
        });


        if (this.state.animation === 'slide') {
            const direction = newViewIndex > oldViewIndex ? 1 : -1;
            AirrFX.doSlideAnimation(newViewDOM, this.sceneDOM, this.containerDOM, this.props.animationTime, direction, callback);
        }
        else {
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
            blankmask = <div className="blank-mask"/>
        }

        let mayers = [];
        if (this.state.mayers.length) {
            mayers = this.state.mayers.map((mayerProps) => {
                mayerProps.key = mayerProps.name;
                mayerProps.ref = (component) => this.mayersCompsRefs[mayerProps.name] = component;
                return React.createElement(AirrMayer, mayerProps);
            });
        }

        return (
            <div className={className} style={{width: this.props.width + 'px', height: this.props.height + 'px'}}
                 ref={div => this.sceneDOM = div}>
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
    animation: 'slide',
    activeViewName: null,
    name: '',
    active: false,
    width: null,
    animationTime: 300,
    height: null,
    sidepanel: null, //{type: Foo, props: {}}
    views: []
};

export default AirrScene;
