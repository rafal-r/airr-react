import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { commonChildrenProp, navbarMenuProp } from "./propTypes";
import AirrMayer from "./AirrMayer";
import AirrView from "./AirrView";
import AirrSceneWrapper from "./AirrSceneWrapper";
import AirrSidepanel from "./AirrSidepanel";

export default class AirrScene extends PureComponent {
	/**
	 * Mayers Components refferencies
	 */
	mayersCompsRefs = {};

	/**
	 * Returns view index from this.props.views array
	 *
	 * @param {string} viewName
	 * @returns {Number}
	 */
	getViewIndex(viewName) {
		return this.props.views.findIndex(config => config.props.name === viewName);
	}

	/**
	 * Handles navbar backbutton tap events
	 *
	 * @param {object} e Event object
	 * @returns {void}
	 */
	handleBackButton = e => {
		const backBtn = e.currentTarget;
		backBtn.classList.add("clicked");

		setTimeout(() => {
			backBtn.classList.remove("clicked");
		}, 300);

		if (
			this.getViewIndex(this.props.activeViewName) === 0 &&
			this.props.handleBackBehaviourOnFirstView
		) {
			return this.props.handleBackBehaviourOnFirstView();
		}

		if (this.props.handleBackButton) {
			this.props.handleBackButton(e);
		} else {
			console.warn("[Airr] Back button handler was not specified.");
		}
	};

	/**
	 * Handles navbar menu button tap events
	 *
	 * @param {object} e Event object
	 * @returns {void}
	 */
	handleMenuButtonToggleSidepanel = e => {
		if (this.props.refCOMPSidepanel && this.props.refCOMPSidepanel.current) {
			this.props.refCOMPSidepanel.current.isShown()
				? this.props.refCOMPSidepanel.current.hide()
				: this.props.refCOMPSidepanel.current.show();
		}
	};

	checkValidActiveView = () => {
		const isAnyViewActive = this.props.views.some(
			view => view.props.name === this.props.activeViewName
		);

		if (!isAnyViewActive) {
			console.warn(
				"[Airr] No view was set as active" +
					(this.props.name && " in Scene named `" + this.props.name + "`") +
					"."
			);
		}

		return isAnyViewActive;
	};

	render() {
		let className = "airr-view airr-scene";
		this.props.active && (className += " active");
		this.props.className && (className += " " + this.props.className);

		this.checkValidActiveView();

		const activeViewIndex = this.getViewIndex(this.props.activeViewName);
		let mockViewTitle;
		if (this.props.mockTitleName) {
			const mockViewIndex = this.getViewIndex(this.props.mockTitleName);
			if (mockViewIndex >= 0) {
				const mockView = this.props.views[mockViewIndex];
				if (mockView.props.title) {
					mockViewTitle = mockView.props.title;
				}
			}
		}
		return (
			<div className={className} ref={this.props.refDOM}>
				<div className="content-wrap">
					<NavbarRenderer
						navbar={this.props.navbar}
						activeViewIndex={activeViewIndex}
						backButtonOnFirstView={this.props.backButtonOnFirstView}
						backButton={this.props.backButton}
						handleBackButton={this.handleBackButton}
						navbarMenu={this.props.navbarMenu}
						hasSidepanel={Boolean(this.props.sidepanel)}
						handleMenuButtonToggleSidepanel={this.handleMenuButtonToggleSidepanel}
						navbarClass={this.props.navbarClass}
						mockViewTitle={mockViewTitle}
						activeViewTitle={
							this.props.views[activeViewIndex] &&
							this.props.views[activeViewIndex].props.title
						}
						refDOMNavbar={this.props.refDOMNavbar}
						navbarHeight={this.props.navbarHeight}
					/>
					<ViewsRenderer
						className={this.props.animation ? this.props.animation + "-animation" : ""}
						refsCOMPViews={this.props.refsCOMPViews}
						activeViewName={this.props.activeViewName}
						views={this.props.views}
						refDOMContainer={this.props.refDOMContainer}
						containersHeight={this.props.containersHeight}
					/>
				</div>
				<ChildrenRenderer {...this.props}>{this.props.children}</ChildrenRenderer>
				{this.props.sidepanel && (
					<SidepanelRenderer
						type={this.props.sidepanel.type}
						refCOMPSidepanel={this.props.refCOMPSidepanel}
						visibilityCallback={this.props.sidepanelVisibilityCallback}
						{...this.props.sidepanel.props}
					/>
				)}
				<MayersRenderer mayers={this.props.mayers} />
				<BlankmaskRenderer
					GUIDisabled={this.props.GUIDisabled}
					GUIDisableCover={this.props.GUIDisableCover}
				/>
			</div>
		);
	}
}

AirrScene.defaultProps = {
	name: "",

	activeViewName: null,
	GUIDisabled: false,
	GUIDisableCover: null,
	animation: "slide",
	animationTime: 300,
	navbar: false,
	navbarHeight: 48,
	navbarMenu: null,
	navbarClass: "",
	backButton: false,
	backButtonOnFirstView: false,
	handleBackButton: null,
	handleBackBehaviourOnFirstView: null,
	active: false,
	sidepanel: null,
	views: [],
	mayers: [],
	title: "",
	className: ""
};

AirrScene.propTypes = {
	/**
	 * The name of the scene. Must be unique among others views in parent scene. Will be used as identification string
	 */
	name: PropTypes.string.isRequired,
	/**
	 * Name of the active view.
	 */
	activeViewName: PropTypes.string,
	/**
	 * Boolean telling if GUI should be disabled meaning no user actions, events are allowed.
	 * GUI is disabled via absolute positioned, not visible div that has the biggest z-Index
	 */
	GUIDisabled: PropTypes.bool,
	/**
	 * React element to be placed in GUI disabling div
	 */
	GUIDisableCover: PropTypes.object,
	/**
	 * Type of animation to perform when switching views
	 */
	animation: PropTypes.oneOf(["slide", "overlay", "fade", false]),
	/**
	 * Time of views changing animatio
	 */
	animationTime: PropTypes.number,
	/**
	 * Specify if navbar is present (1,true) or not (0,false). Or maybe hidden (-1)
	 */
	navbar: PropTypes.oneOf([-1, 0, false, 1, true]),
	/**
	 * Height of the navbar in pixels
	 */
	navbarHeight: PropTypes.number,
	/**
	 * Navbar menu is placed on the right most side. Might contain "toggleSidepanel" button or any custom buttons list.
	 */
	navbarMenu: navbarMenuProp,
	/**
	 * Extra, space separated, navbar's class names list
	 */
	navbarClass: PropTypes.string,
	/**
	 * Boolean specifing if navbar renders BackButton. Placed by default on the left side of navbar.
	 */
	backButton: PropTypes.bool,
	/**
	 * Do you need to still show backButton even if scene is rendering first view from stack?
	 */
	backButtonOnFirstView: PropTypes.bool,
	/**
	 * Function that will handle back button click events
	 */
	handleBackButton: PropTypes.func,
	/**
	 * Function that will handle back button clicks events on when first view in stack is active
	 */
	handleBackBehaviourOnFirstView: PropTypes.func,
	/**
	 * Is this view active in parent scene
	 */
	active: PropTypes.bool,
	/**
	 * Sidepanels declaration. Must contain two properties: `type` and `props`
	 **/
	sidepanel: PropTypes.shape({
		/**
		 * Refference to class or function that will render AirrSidepanel. Might be AirrSidepanel itself.
		 */
		type: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
		/**
		 * Special properties of AirrSidepanel class. Go to class declaration for further properties documenation.
		 */
		props: PropTypes.shape(AirrSidepanel.propTypes)
	}),
	/**
	 * Array of `views`. Every view object declaration must contain two properties: `type` and `props`.
	 */
	views: PropTypes.arrayOf(
		PropTypes.shape({
			/**
			 * Refference to class or function that will render AirrView. The most common and adviced approach is to use AirrViewWrapper.
			 */
			type: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
			/**
			 * Special properties of AirrView class. Go to class declaration for further properties documenation.
			 */
			props: PropTypes.shape(AirrView.propTypes)
		})
	),
	/**
	 * Array of `mayers` objects that will be render into this Scene. Must contain special AirrMayer class properties.
	 * To check the possible values of properties go to AirrMayer declaration.
	 */
	mayers: PropTypes.arrayOf(PropTypes.shape(AirrMayer.propTypes)),
	/**
	 * Title that will be use in parent Scene navbar title section
	 */
	title: commonChildrenProp,
	/**
	 * Extra, space separated classes names to use upon first div element.
	 */
	className: PropTypes.string,
	/**
	 * React component's ref object
	 */
	refCOMPSidepanel: PropTypes.object,
	/**
	 * React ref to dom object
	 */
	refDOM: PropTypes.object,
	/**
	 * React ref to dom object
	 */
	refDOMNavbar: PropTypes.object,
	/**
	 * Object of React refs components specified under string keys
	 */
	refsCOMPViews: PropTypes.object,
	/**
	 * React component's ref object
	 */
	refDOMContainer: PropTypes.object,
	/**
	 * Inner, private prop for manipulating navbar title
	 */
	mockTitleName: PropTypes.string,
	/**
	 * Inner, private prop with containers height information
	 */
	containersHeight: PropTypes.number,
	/**
	 * Children prop
	 */
	children: commonChildrenProp,
	sidepanelVisibilityCallback: AirrSceneWrapper.propTypes.sidepanelVisibilityCallback
};

const ChildrenRenderer = React.memo(function ChildrenRenderer({ children, ...rest }) {
	return typeof children === "function" ? children(rest) : children;
});
ChildrenRenderer.propTypes = {
	children: commonChildrenProp
};
const MayersRenderer = React.memo(function MayersRenderer({ mayers }) {
	return mayers.map(({ name, ...props }) => {
		return <AirrMayer key={name} name={name} {...props} />;
	});
});
MayersRenderer.propTypes = {
	mayers: PropTypes.arrayOf(PropTypes.shape(AirrMayer.propTypes))
};
const SidepanelRenderer = React.memo(function SidepanelRenderer({
	type,
	refCOMPSidepanel,
	visibilityCallback,
	...props
}) {
	if (!props.ref) {
		props.ref = refCOMPSidepanel;
	}
	if (!props.visibilityCallback) {
		props.visibilityCallback = visibilityCallback;
	}
	if (typeof props.enabled === "undefined") {
		props.enabled = true; //force explicit value, e.g needed when checking if panel is enabled in `openMayer` method
	}

	return React.createElement(type, props);
});
SidepanelRenderer.propTypes = {
	type: PropTypes.oneOfType([PropTypes.func, PropTypes.object]).isRequired,
	props: PropTypes.shape(AirrSidepanel.propTypes),
	ref: PropTypes.object,
	refCOMPSidepanel: PropTypes.object,
	visibilityCallback: AirrSceneWrapper.propTypes.sidepanelVisibilityCallback,
	enabled: PropTypes.bool
};
const BlankmaskRenderer = React.memo(function BlankmaskRenderer({ GUIDisabled, GUIDisableCover }) {
	return GUIDisabled && <div className="airr-blank-mask">{GUIDisableCover}</div>;
});
BlankmaskRenderer.propTypes = {
	GUIDisabled: PropTypes.bool,
	GUIDisableCover: commonChildrenProp
};
const NavbarRenderer = React.memo(function NavbarRenderer({
	navbar,
	activeViewIndex,
	backButtonOnFirstView,
	handleBackButton,
	backButton,
	navbarMenu,
	hasSidepanel,
	handleMenuButtonToggleSidepanel,
	mockViewTitle,
	activeViewTitle,
	navbarClass,
	refDOMNavbar,
	navbarHeight
}) {
	if (navbar) {
		let mockTitle = null;
		let title = "";
		let back = null;

		if (backButton) {
			const backClassName =
				"back " + (activeViewIndex < 1 && !backButtonOnFirstView ? "hidden" : "");
			back = (
				<div className={backClassName} onClick={handleBackButton}>
					<div />
				</div>
			);
		}

		let menu;
		if (navbarMenu) {
			if (navbarMenu === "toggleSidepanel") {
				menu = hasSidepanel ? (
					<div className="menu" onClick={handleMenuButtonToggleSidepanel}>
						<div />
					</div>
				) : null;
			} else if (Array.isArray(navbarMenu)) {
				menu = <div className="menu">{navbarMenu}</div>;
			}
		}

		const navbarStyle = {};
		if ([1, true].indexOf(navbar) === -1) {
			navbarStyle.visibility = "hidden";
		}

		if (mockViewTitle) {
			mockTitle = (
				<div className="mock-title">
					<span>{activeViewTitle}</span>
				</div>
			);
			title = mockViewTitle;
		} else {
			title = activeViewTitle;
		}

		return (
			<div
				className={"airr-navbar " + (typeof navbarClass === "string" ? navbarClass : "")}
				ref={refDOMNavbar}
				style={navbarStyle}
			>
				<div style={{ height: navbarHeight + "px" }}>
					{mockTitle}
					{back}
					<div className="title" style={{ opacity: mockViewTitle ? 0 : 1 }}>
						<span>{title}</span>
					</div>
					{menu}
				</div>
			</div>
		);
	}
});
NavbarRenderer.propTypes = {
	navbar: PropTypes.oneOf([-1, 0, false, 1, true]),
	activeViewIndex: PropTypes.number,
	backButtonOnFirstView: PropTypes.bool,
	backButton: PropTypes.bool,
	handleBackButton: PropTypes.func,
	navbarMenu: navbarMenuProp,
	hasSidepanel: PropTypes.bool,
	handleMenuButtonToggleSidepanel: PropTypes.func,
	navbarClass: PropTypes.string,
	mockViewTitle: commonChildrenProp,
	activeViewTitle: PropTypes.string,
	refDOMNavbar: PropTypes.object,
	navbarHeight: PropTypes.number
};
const ViewsMapper = React.memo(function ViewsMapper({ views, activeViewName, refsCOMPViews }) {
	return views.map(item => {
		if (item.props.name === activeViewName) {
			item.props.active = true;
		} else {
			item.props.active = false;
		}

		item.props.key = item.props.name;
		if (!item.props.ref) {
			item.props.ref = React.createRef();
			refsCOMPViews[item.props.name] = item.props.ref;
		}

		return React.createElement(item.type, item.props);
	});
});
ViewsMapper.propTypes = {
	views: AirrScene.propTypes.views,
	activeViewName: PropTypes.string,
	refsCOMPViews: PropTypes.object
};
const ViewsRenderer = React.memo(function ViewsRenderer({
	views,
	className = "",
	refDOMContainer,
	activeViewName,
	containersHeight,
	refsCOMPViews
}) {
	return (
		<div
			className={"airr-container " + className}
			ref={refDOMContainer}
			style={containersHeight ? { height: containersHeight } : null}
		>
			<ViewsMapper
				views={views}
				activeViewName={activeViewName}
				refsCOMPViews={refsCOMPViews}
			/>
		</div>
	);
});
ViewsRenderer.propTypes = {
	...ViewsMapper.propTypes,
	className: PropTypes.string,
	refDOMContainer: PropTypes.object,
	containersHeight: PropTypes.number
};
