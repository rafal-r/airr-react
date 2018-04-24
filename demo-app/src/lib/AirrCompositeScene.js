import React, { Component } from "react";
import AirrScene from "./AirrScene";

export default class AirrCompositeScene extends Component {
    render() {
        return (
            <AirrScene
                ref="airrView"
                name={this.props.name}
                animationTime={this.props.animationTime}
                handleBackBehaviourOnFirstView={
                    this.props.handleBackBehaviourOnFirstView
                }
                handleBackButton={this.props.handleBackButton}
                viewsAnimationEndCallback={this.props.viewsAnimationEndCallback}
                stackMode={this.props.stackMode}
                GUIDisabled={this.props.GUIDisabled}
                GUIDisableCover={this.props.GUIDisableCover}
                active={this.props.active}
                views={this.props.views}
                mayers={this.props.mayers}
                activeViewName={this.props.activeViewName}
                sidepanel={this.props.sidepanel}
                navbar={this.props.navbar}
                navbarHeight={this.props.navbarHeight}
                navbarMenu={this.props.navbarMenu}
                navbarClass={this.props.navbarClass}
                animation={this.props.animation}
                backButton={this.props.backButton}
                backButtonOnFirstView={this.props.backButtonOnFirstView}
                children={this.props.children}
            />
        );
    }
}
AirrCompositeScene.propTypes = AirrScene.propTypes;
AirrCompositeScene.defaultProps = AirrScene.defaultProps;
