import React, { Component } from 'react';
import { View } from './../../lib/Airr';
import Menu from '../ui/Menu';
import './css/Welcome.css';

export const viewName = "welcome";

export default class Welcome extends Component {
    menuOptions = [
        {
            name: 'mayers',
            desc: 'modal layers a.k.a. dialogs, popups'
        },
        {
            name: 'sidepanel',
            desc: 'draggable side container'
        },
        {
            name: 'scene',
            desc: 'views management'
        },
        {
            name: 'tabs',
            desc: 'scene with nav'
        }
    ];

    render() {
        return (
            <View name={this.props.name} active={this.props.active} ref="airrView">
                <div className="wrap">
                    <div className="col">
                        Welcome to airr-react demo.<br />
                        Here you can test all main features of this small but functional library.
                        </div>
                    <Menu items={this.menuOptions} handleClick={e => this.props.menuHandler(e)} title="Components:" />
                </div>
            </View>
        );
    }
}
Welcome.defaultProps = {
    name: 'welcome'
};