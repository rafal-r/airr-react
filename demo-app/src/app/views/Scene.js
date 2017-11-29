import React, {Component} from 'react';
import {View} from 'airr-react';
import Inheritance from './Scene/Inheritance';
import Composition from './Scene/Composition';
import Menu from '../ui/Menu';

import './css/Scene.css';

class Scene extends Component {
    sceneOptions = [
        {
            name: 'composition',
            desc: <span onClick={ e => this.handleInfoBtnClick(e, 'composition') } className="info-icon md"></span>,
            conf: {
                type: Composition,
                props: {
                    name: 'scene-composition',
                    activeViewName: 'v1',
                    title: 'Scene - Composition'
                }
            }
        },
        {
            name: 'inheritance',
            desc: <span onClick={ e => this.handleInfoBtnClick(e, 'inheritance') } className="info-icon md"></span>,
            conf: {
                type: Inheritance,
                props: {
                    name: 'scene-inheritance',
                    activeViewName: 'v1',
                    title: 'Scene - Inheritance'
                }
            }
        }
    ];

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
        return this.props.handleMenuClick(this.sceneOptions.filter(val => val.name === e.currentTarget.dataset.view)[0].conf, e);
    }

    render() {
        return (
                <View name={this.props.name} active={this.props.active} width={this.props.width} height={this.props.height} ref="airrView">
                    <div className="wrap col scene-view">
                        {this.props.description}
                        <p className="info">
                            Tap one of <span className="info-icon sm"></span> icons to find out more about certain components.<br/>Both act the same but have different implementation.
                        </p>
                    </div>
                    
                    <Menu items={this.sceneOptions} handleClick={e => this.handleItemClick(e)} title="Scene implementations:" className="second-menu" />
                </View>
                );
    }
}
export default Scene;