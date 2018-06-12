import React, { Component } from "react";
import AirrView from "./AirrView";
import PropTypes from "prop-types";

export default class AirrViewWrapper extends Component {
    /**
     * Refferency to view's DOM element.
     */
    refDOM = React.createRef();

    /**
     * Special method for delivering props to AirrView component's.
     * Used in render method.
     */
    getViewProps = () => ({
        refDOM: this.refDOM,
        name: this.props.name,
        active: this.props.active,
        title: this.props.title,
        className: this.props.className,
        style: this.props.style
    });

    /**
     * Primary render method.
     * Should be overwritten in descendant class.
     * @returns {ReactElement}
     */
    content() {
        console.warn(
            "[Airr] This method should be overwritten in descendant class"
        );
    }

    /**
     * Wrapper method to render content. Generate special props upon AirrView component.
     * Use ::content() in descenadant class instead of overwritting this one.
     * @returns {ReactElement}
     */
    render() {
        return (
            <AirrView {...this.getViewProps()}>{() => this.content()}</AirrView>
        );
    }
}

AirrViewWrapper.propTypes = {
    /**
     * The name of the view. Must be unique among others views in scene. Will be used as identification string
     */
    name: PropTypes.string.isRequired,
    /**
     * Titlebar name. if parent scene navbar is enabled, this title will be showed there
     */
    title: PropTypes.string,
    /**
     * Determine if this view is active. Set by parent scene.
     */
    active: PropTypes.bool,
    /**
     * Refference to view's root DOM element.
     */
    refDOM: PropTypes.object,
    /**
     * Extra classes to use. Space separetad string list.
     */
    className: PropTypes.string,
    /**
     * Extra styles to use upon root DOM element of view.
     */
    style: PropTypes.object
};
AirrViewWrapper.defaultProps = {
    name: "",
    title: "",
    active: false,
    refDOM: null,
    className: "",
    style: {}
};
