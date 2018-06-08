import React, { Component } from "react";
import PropTypes from "prop-types";

export const propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    active: PropTypes.bool,
    refDOM: PropTypes.object,
    className: PropTypes.string,
    style: PropTypes.object
};
export const defaultProps = {
    name: "", //the name of the view. Must be unique among others views in scene. Will be used as identification string
    title: "", //titlebar name. if parent scene navbar is enabled, this title will be showed there
    active: false,
    refDOM: null,
    className: "", //extra classes to use
    style: {}
}
export default class AirrView extends Component {
    render() {
        const {
            name,
            title,
            active,
            refDOM,
            className,
            style,
            ...rest
        } = this.props;
        let viewClass = "airr-view" + (className ? " " + className : "");

        active && (viewClass += " active");

        return (
            <div className={viewClass} style={style} ref={refDOM} {...rest}>
                {typeof this.props.children === "function"
                    ? this.props.children()
                    : this.props.children}
            </div>
        );
    }
}

AirrView.propTypes = propTypes;
AirrView.defaultProps = defaultProps;
