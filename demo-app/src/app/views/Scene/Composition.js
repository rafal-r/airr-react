import React, {Component} from 'react';
import {Scene} from './../../../lib/Airr';
import Slide from './Slide';
import update from 'immutability-helper';

class Composition extends Component {

    constructor(props) {
        super(props);

        this.state = {
            animation: 'slide',
            activeViewName: props.activeViewName,
            views: [
                {
                    type: Slide,
                    props: {
                        name: props.activeViewName,
                        title: '1',
                        isFirst: true,
                        handleNextClick: e => this.handleNextClick(e),
                        handlePrevClick: e => this.handlePrevClick(e),
                        handleAnimationChange: e => this.handleAnimationChange(e),
                        animation: 'slide'
                    }
                }
            ]
        };
    }
    
    handleAnimationChange(e) {
        const val = e.target.dataset.value;
        this.setState({animation: val});
        const newviewsdefinition = this.state.views.map((item) => {
            return update(item, {props: {animation: {$set: val}}});
        });
        
        this.setState({views: newviewsdefinition});        
    }

    handleNextClick(e) {
        const viewsCount = this.state.views.length + 1;
        const viewName = 'v' + viewsCount;
        const config = {
            type: Slide,
            props: {
                name: viewName,
                title: viewsCount,
                isFirst: false,
                handleNextClick: e => this.handleNextClick(e),
                handlePrevClick: e => this.handlePrevClick(e),
                handleAnimationChange: e => this.handleAnimationChange(e),
                animation: this.state.animation
            }
        };
        
        const newviewdefinition = update(this.state.views, {$push: [config]});
        this.setState({
            views: newviewdefinition,
            activeViewName: config.props.name
        });
    }

    handlePrevClick(e) {
        if (this.state.views.length > 1) {
            const newviewdefinition = update(this.state.views, {$splice: [[this.state.views.length - 1, 1]]});

            this.setState({
                activeViewName: this.state.views[this.state.views.length - 2].props.name,
                views: newviewdefinition
            });
        }
    }

    render() {
        return (
                <Scene name={this.props.name}
                           ref="airrView"
                           active={this.props.active}
                           views={this.state.views}
                           activeViewName={this.state.activeViewName}
                           animation={this.state.animation}
                           stackMode={true}
                           />
                );
    }
}

export default Composition;