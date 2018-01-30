import React from 'react';
import AirrScene from './AirrScene';
import AirrComponent from './AirrComponent';
import update from 'immutability-helper';

export default class AirrCompositeScene extends AirrComponent {

    constructor(props) {
        super(props);

        this.state = {
            active: props.active,
            navbar: props.navbar,
            navbarHeight: props.navbarHeight,
            backButton: props.backButton,
            backButtonOnFirstView: props.backButtonOnFirstView,
            activeViewName: props.activeViewName,
            animation: props.animation,
            views: props.views,
            sidepanel: props.sidepanel,
            GUIDisabled: props.GUIDisabled,
            mayers: props.mayers,
            children: props.children
        };
    }

    pushView(config) {
        const newviewdefinition = update(this.state.views, {$push: [config]});
        this.setState({
            views: newviewdefinition,
            activeViewName: config.props.name
        });
    }

    popView() {
        if (this.state.views.length > 1) {

            const newviewdefinition = update(this.state.views, {$splice: [[this.state.views.length - 1, 1]]});

            this.setState({
                activeViewName: this.state.views[this.state.views.length - 2].props.name,
                views: newviewdefinition
            });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!this.state.active && nextProps.active) {
            this.setState({active: true});
        }
    }

    render() {
        return (
                <AirrScene 
                    ref="airrView"
                    name={this.props.name}
                    animationTime={this.props.animationTime}
                    handleBackBehaviourOnFirstView={this.props.handleBackBehaviourOnFirstView}
                    stackMode={this.props.stackMode}
                    GUIDisabled={this.state.GUIDisabled}
                    active={this.state.active}
                    views={this.state.views}
                    mayers={this.state.mayers}
                    activeViewName={this.state.activeViewName}
                    sidepanel={this.state.sidepanel}
                    navbar={this.state.navbar}
                    navbarHeight={this.state.navbarHeight}
                    animation={this.state.animation}
                    backButton={this.state.backButton}
                    backButtonOnFirstView={this.state.backButtonOnFirstView}
                    children={this.state.children}/>
                );
    }
}
AirrCompositeScene.propTypes = AirrScene.propTypes;
AirrCompositeScene.defaultProps = AirrScene.defaultProps;