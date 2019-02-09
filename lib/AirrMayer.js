import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AirrFX from "./AirrFX";
import { sideStringProp, commonChildrenProp } from "./propTypes";

export default class AirrMayer extends PureComponent {
	/**
	 * Mayer's HTML DOM Element refferency
	 */
	refDOMMayer = React.createRef();
	/**
	 * Mayer's container's HTML DOM Element refferency
	 */
	refDOMCtn = React.createRef();

	constructor(props) {
		super(props);
		if (!props.name) {
			throw new Error("Every Mayer must has its `name` property set");
		}
	}

	componentDidMount() {
		if (this.refDOMCtn.current.clientHeight >= this.props.avaibleHeight) {
			this.refDOMCtn.current.style.height = this.props.avaibleHeight + "px";
			this.refDOMMayer.current.classList.add("full");
		}

		this.animateIn();
	}

	/**
	 * Animates Mayers html dom element into the screen
	 */
	animateIn() {
		AirrFX.doTransitionAnimation(
			this.refDOMMayer.current.querySelector(".bg"),
			{ opacity: 0 },
			["opacity " + this.props.animationTime + "ms ease-out"],
			{ opacity: 1 }
		);
		AirrFX.doOverlayInAnimation(
			this.refDOMCtn.current,
			this.refDOMMayer.current.clientWidth,
			this.refDOMMayer.current.clientHeight,
			this.props.animationTime,
			this.props.appearFrom
		);
	}

	/**
	 * Animates Mayers html dom element out of the screen
	 * @param {function} callback Called after animation end
	 */
	animateOut(callback) {
		AirrFX.doTransitionAnimation(
			this.refDOMMayer.current.querySelector(".bg"),
			{ opacity: 1 },
			["opacity " + this.props.animationTime + "ms ease-out"],
			{ opacity: 0 }
		);
		AirrFX.doOverlayOutAnimation(
			this.refDOMCtn.current,
			this.refDOMMayer.current.clientHeight,
			this.refDOMMayer.current.clientWidth,
			this.props.animationTime,
			this.props.leaveTo,
			callback
		);
	}

	render() {
		return (
			<div className="airr-mayer" ref={this.refDOMMayer} style={this.props.style}>
				<BgRenderer />
				<div className="ctn" ref={this.refDOMCtn}>
					<BodyRenderer content={this.props.content}>{this.props.children}</BodyRenderer>
					<ButtonRenderer buttons={this.props.buttons} />
				</div>
			</div>
		);
	}
}

const BgRenderer = React.memo(function BgRenderer() {
	return <div className="bg" />;
});
const ChildrenRenderer = React.memo(function ChildrenRenderer({ children }) {
	return children;
});
ChildrenRenderer.propTypes = {
	children: commonChildrenProp
};
const ContentRenderer = React.memo(function ContentRenderer({ content }) {
	return content;
});
ContentRenderer.propTypes = {
	content: commonChildrenProp
};
const BodyRenderer = React.memo(function BodyRenderer({ children, content }) {
	return (
		<div className="text">
			<ChildrenRenderer>{children}</ChildrenRenderer>
			<ContentRenderer content={content} />
		</div>
	);
});
BodyRenderer.propTypes = {
	children: commonChildrenProp,
	content: commonChildrenProp
};
const MayerButton = React.memo(function MayerButton({
	className,
	style,
	handler,
	children,
	...spareAttribs
}) {
	return (
		<button className={className} style={style} onClick={handler} {...spareAttribs}>
			{children}
		</button>
	);
});
MayerButton.propTypes = {
	/**
	 * Extra class names to use upon button
	 */
	className: PropTypes.string,
	/**
	 * Extra attributes to apply on HTML element
	 */
	attrs: PropTypes.object,
	/**
	 * Additional inline styles
	 */
	style: PropTypes.object,
	/**
	 * OnClick function handler
	 */
	handler: PropTypes.func,
	/**
	 * Content to render inside Mayer. Might be string or ReactElement.
	 */
	content: commonChildrenProp,
	children: commonChildrenProp
};
const ButtonRenderer = React.memo(function ButtonRenderer({ buttons }) {
	return (
		<div className="btns">
			{buttons.map((config, index) => {
				let className = "btn text";

				if (config.className) {
					className += " " + config.className;
				}

				let spareAttribs = {};
				if (config.attrs) {
					spareAttribs = config.attrs;
				}

				return (
					<MayerButton
						key={"btn" + index}
						className={className}
						style={config.style || null}
						handler={config.handler || null}
						{...spareAttribs}
					>
						{config.content}
					</MayerButton>
				);
			})}
		</div>
	);
});
ButtonRenderer.propTypes = { buttons: PropTypes.arrayOf(PropTypes.shape(MayerButton.propTypes)) };

AirrMayer.propTypes = {
	/**
	 * The name of the mayer. Must be unique among others mayers in scene. Will be used as identification.
	 */
	name: PropTypes.string.isRequired,
	/**
	 * Extra styles to apply on Mayer's DOM element
	 */
	style: PropTypes.object,
	/**
	 * Parent scene height. Set by parent Scene. Do not overwrite!
	 */
	avaibleHeight: PropTypes.number.isRequired,
	/**
	 * Side from which mayer content box will enter
	 */
	appearFrom: sideStringProp,
	/**
	 * Side to which mayer content box will leave
	 */
	leaveTo: sideStringProp,
	/**
	 * Content of mayer
	 */
	content: commonChildrenProp,
	/**
	 * Array with buttons configuration
	 */
	buttons: ButtonRenderer.propTypes.buttons,
	/**
	 * Time in miliseconds of mayer's appear/disappear animation
	 */
	animationTime: PropTypes.number,
	children: commonChildrenProp
};
AirrMayer.defaultProps = {
	name: "",
	style: null,
	avaibleHeight: null,
	appearFrom: "bottom",
	leaveTo: "bottom",
	content: null,
	buttons: [],
	animationTime: 300
};
