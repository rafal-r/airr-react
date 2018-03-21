import React from "react";
import PropTypes from "prop-types";
import AirrComponent from "./AirrComponent";

export default class AirrView extends AirrComponent {
    render() {
        const { name, title, active, style, ...rest } = this.props;
        let className = "airr-view";

        active && (className += " active");

        return (
            <div className={className} style={style} ref="dom" {...rest}>
                {this.props.children}
            </div>
        );
    }
}

AirrView.propTypes = {
    name: PropTypes.string.isRequired,
    title: PropTypes.string,
    active: PropTypes.bool
};
AirrView.defaultProps = {
    name: "", //the name of the view. Must be unique among others views in scene. Will be used as identification string
    title: "", //titlebar name. if parent scene navbar is enabled, this title will be showed there
    active: false
};
