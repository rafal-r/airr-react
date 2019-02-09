import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { renderChildrenProp, commonChildrenProp } from "./propTypes";

export default class AirrView extends PureComponent {
	render() {
		const { active, refDOM, className, style, ...rest } = this.props;
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

AirrView.propTypes = {
	/**
	 * The name of the view. Must be unique among others views in scene. Will be used as identification string
	 */
	name: PropTypes.string.isRequired,
	/**
	 * Titlebar name. if parent scene navbar is enabled, this title will be showed there. Might be string or React element.
	 */
	title: commonChildrenProp,
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
	style: PropTypes.object,
	children: renderChildrenProp
};

AirrView.defaultProps = {
	name: "",
	title: "",
	active: false,
	refDOM: null,
	className: "",
	style: {}
};
