import React, {Component} from 'react';
import {View} from './../../lib/Airr';
import Composition from './Tabs/Composition';
import Inheritance from './Tabs/Inheritance';
import Menu from '../ui/Menu';
import './css/Scene.css';

class Tabs extends Component {
    
    constructor(props) {
        super(props);
        
        this.tabsOptions = [
        {
            name: 'Composition',
            desc: <span onClick={ e => this.handleInfoBtnClick(e, 'composition') } className="info-icon md"></span>,
            conf: {
                type: Composition,
                props: {
                    name: 'tabs-composition',
                    title: 'Tabs',
                    activeViewName: 'tab1',
                    animation: 'overlay',
                    handleBackBehaviourOnFirstView: props.handleBackBehaviourOnFirstView
                }
            }
        },
        {
            name: 'Inheritance',
            desc: <span onClick={ e => this.handleInfoBtnClick(e, 'inheritance') } className="info-icon md"></span>,
            conf: {
                type: Inheritance,
                props: {
                    name: 'tabs-inheritance',
                    title: 'Tabs',
                    activeViewName: 'tab1',
                    stackMode: false,
                    backButtonOnFirstView: true,
                    backButton: true,
                    navbar: true,
                    handleBackBehaviourOnFirstView: props.handleBackBehaviourOnFirstView
                }
            }
        }];
    }
    
    handleInfoBtnClick(e, type) {
        e.stopPropagation();
        
        let content;
        if (type === 'inheritance') {
            content = <div>Inheritance implementation is based on extending AirrCompositeScene class. <br/>This class has few methods for views manipulation and allready defined render method.<br/>This approach might be usefull when you need to quickly implement simpler Scene with less complexity and controll. When this is your case and You are 100% sure that this Scene won't be modified from parent class, use this approach.</div>;
        }
        else {
            content = <div>When using this approach you are in controll of 100% of Scene code and behaviour.<br/>You must repeat certain code lines when dealing with typicall things like views changing but on the other hand this gives you flexibility and controll.</div>;
        }
        
        this.props.handleInfoBtnClick(content);
    }

    handleItemClick(e) {
        const filteredTabs = this.tabsOptions.filter(val => val.name === e.currentTarget.dataset.view);
        return this.props.handleViewportScenePush(filteredTabs[0].conf, e);
    }

    render() {
        return (
                <View name={this.props.name} active={this.props.active} width={this.props.width} height={this.props.height} ref="airrView">
                    <div className="wrap col tabs-view">
                        {this.props.description}
                        <p className="info">
                            Tap one of <span className="info-icon sm"></span> icons to find out more about certain components.<br/>Both act the same but have different implementation.
                        </p>
                    </div>
                    
                    <Menu items={this.tabsOptions} handleClick={e => this.handleItemClick(e)} title="Tabs implementations:"  className="second-menu" />                    
                </View>
        );
    }
}
export default Tabs;