// @flow
import React, { PureComponent } from "react";
import AirrFX from "./AirrFX";
import type { Node as ReactNode } from "react";
import type { CSSPropObject, Placement } from "./Types";

type MayerButtonProps = {
	/**
	 * Extra class names to use upon button
	 */
	className?: string,
	/**
	 * Extra attributes to apply on HTML element
	 */
	attrs?: ?CSSPropObject,
	/**
	 * Additional inline styles
	 */
	style?: ?CSSPropObject,
	/**
	 * OnClick function handler
	 */
	handler?: ?() => void,
	/**
	 * Content to render inside Mayer. Might be string or ReactElement.
	 */
	content?: ?ReactNode,
	children?: ?ReactNode
};
type ButtonRendererProps = {
	buttons?: MayerButtonProps[]
};
type Props = {
	/**
	 * The name of the mayer. Must be unique among others mayers in scene. Will be used as identification.
	 */
	name: string,
	/**
	 * Extra styles to apply on Mayer's DOM element
	 */
	style?: CSSPropObject,
	/**
	 * Parent scene height. Set by parent Scene. Do not overwrite!
	 */
	avaibleHeight: number,
	/**
	 * Side from which mayer content box will enter
	 */
	appearFrom: Placement,
	/**
	 * Side to which mayer content box will leave
	 */
	leaveTo: Placement,
	/**
	 * Content of mayer
	 */
	content?: ReactNode,
	/**
	 * Array with buttons configuration
	 */
	buttons?: MayerButtonProps[],
	/**
	 * Time in miliseconds of mayer's appear/disappear animation
	 */
	animationTime: number,
	children: ReactNode
};

export default class AirrMayer extends PureComponent<Props> {
	static defaultProps = {
		name: "",
		style: null,
		avaibleHeight: null,
		appearFrom: "bottom",
		leaveTo: "bottom",
		content: null,
		buttons: [],
		animationTime: 300
	};
	/**
	 * Mayer's HTML DOM Element refferency
	 */
	refDOMMayer = React.createRef<HTMLDivElement>();
	/**
	 * Mayer's container's HTML DOM Element refferency
	 */
	refDOMCtn = React.createRef<HTMLDivElement>();

	constructor(props: Props) {
		super(props);
		if (!props.name) {
			throw new Error("Every Mayer must has its `name` property set");
		}
	}

	componentDidMount() {
		const refDOMCtn = this.refDOMCtn.current;
		if (refDOMCtn && refDOMCtn.clientHeight >= this.props.avaibleHeight) {
			refDOMCtn.style.height = this.props.avaibleHeight + "px";
			refDOMCtn.classList && refDOMCtn.classList.add("full");
		}

		this.animateIn();
	}

	/**
	 * Animates Mayers html dom element into the screen
	 */
	animateIn() {
		const refDOMMayer = this.refDOMMayer.current;
		const bgDOM = refDOMMayer && refDOMMayer.querySelector(".bg");

		if (bgDOM) {
			AirrFX.doTransitionAnimation(
				bgDOM,
				{ opacity: "0" },
				["opacity " + this.props.animationTime + "ms ease-out"],
				{ opacity: "1" }
			);
		}

		const refDOMCtn = this.refDOMCtn.current;

		if (refDOMCtn && refDOMMayer) {
			AirrFX.doOverlayInAnimation(
				refDOMCtn,
				refDOMMayer.clientWidth,
				refDOMMayer.clientHeight,
				this.props.animationTime,
				this.props.appearFrom
			);
		}
	}

	/**
	 * Animates Mayers html dom element out of the screen
	 * @param {function} callback Called after animation end
	 */
	animateOut(callback: () => void) {
		const refDOMMayer = this.refDOMMayer.current;
		const bgDOM = refDOMMayer && refDOMMayer.querySelector(".bg");

		if (bgDOM) {
			AirrFX.doTransitionAnimation(
				bgDOM,
				{ opacity: "1" },
				["opacity " + this.props.animationTime + "ms ease-out"],
				{ opacity: "0" }
			);
		}

		const refDOMCtn = this.refDOMCtn.current;

		if (refDOMCtn && refDOMMayer) {
			AirrFX.doOverlayOutAnimation(
				refDOMCtn,
				refDOMMayer.clientHeight,
				refDOMMayer.clientWidth,
				this.props.animationTime,
				this.props.leaveTo,
				callback
			);
		}
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
type ChildrenRendererProps = {
	children: ReactNode
};
const ChildrenRenderer = React.memo<ChildrenRendererProps>(function ChildrenRenderer({
	children
}: ChildrenRendererProps) {
	return children;
});
type ContentRendererProps = {
	content: ReactNode
};
const ContentRenderer = React.memo<ContentRendererProps>(function ContentRenderer({
	content
}: ContentRendererProps) {
	return content;
});
type BodyRendererProps = {
	children: ReactNode,
	content?: ReactNode
};
const BodyRenderer = React.memo<BodyRendererProps>(function BodyRenderer({
	children,
	content
}: BodyRendererProps) {
	return (
		<div className="text">
			<ChildrenRenderer>{children}</ChildrenRenderer>
			{content && <ContentRenderer content={content} />}
		</div>
	);
});
const MayerButton = React.memo<MayerButtonProps>(function MayerButton({
	className,
	style,
	handler,
	children,
	...spareAttribs
}: MayerButtonProps) {
	return (
		<button className={className} style={style} onClick={handler} {...spareAttribs}>
			{children}
		</button>
	);
});
const ButtonRenderer = React.memo<ButtonRendererProps>(function ButtonRenderer({
	buttons
}: ButtonRendererProps) {
	return (
		<div className="btns">
			{buttons &&
				buttons.map((config, index) => {
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
