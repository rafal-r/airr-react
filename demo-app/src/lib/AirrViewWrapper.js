import React, { Component } from "react";
import AirrView from "./AirrView";

export default class AirrViewWrapper extends Component {
    refDOM = React.createRef();

    getViewProps = () => ({
        refDOM: this.refDOM,
        name: this.props.name,
        active: this.props.active,
        title: this.props.title,
        className: this.props.className,
        style: this.props.style
    });

    /*
    *render method to be overwritten in desendent class
    */
    content() {}

    render() {
        return (
            <AirrView {...this.getViewProps()}>{() => this.content()}</AirrView>
        );
    }
}

AirrViewWrapper.propTypes = AirrView.propTypes;
AirrViewWrapper.defaultProps = AirrView.defaultProps;
