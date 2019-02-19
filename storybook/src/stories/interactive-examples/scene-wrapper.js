import React from "react";
import { text, number, boolean, select, selectV2 } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import "airr-react/dist/airr-react.css";
import InfiniteViewport from "../../app/scenes/InfiniteViewport";

export default function() {
	const viewportRef = React.createRef();

	const GROUP_IDS = {
		GENERAL: "General",
		ANIMATION: "Animation",
		NAVBAR: "Navbar"
	};

	//GENERAL
	const name = text("name", "infinite-viewport", GROUP_IDS.GENERAL);
	const GUIDisabled = boolean("GUIDisabled", false, GROUP_IDS.GENERAL);
	const GUIDisabledCoverText = text("GUIDisabledCoverText", "", GROUP_IDS.GENERAL);
	const active = boolean("active", true, GROUP_IDS.GENERAL);
	const title = text("title", "Infinite Viewport", GROUP_IDS.GENERAL);
	const className = text("className", "extra-viewport-class", GROUP_IDS.GENERAL);

	//ANIMATION
	const animation = selectV2(
		"animation",
		{
			overlay: "overlay",
			slide: "slide",
			fade: "fade"
		},
		"overlay",
		GROUP_IDS.ANIMATION
	);
	const animationTime = number("animationTime (ms)", 300, { range: false }, GROUP_IDS.ANIMATION);
	const stackMode = boolean("stackMode", true, GROUP_IDS.ANIMATION);

	//NAVBAR
	const navbar = selectV2("navbar", { "1": 1, "0": 0, "-1": -1 }, "1", GROUP_IDS.NAVBAR);

	const navbarHeight = number(
		"navbarHeight",
		48,
		{ range: true, min: 0, max: 180, step: 1 },
		GROUP_IDS.NAVBAR
	);
	const navbarMenu = select("navbarMenu", [CUSTOM_MENU, NONE], NONE, GROUP_IDS.NAVBAR);
	const navbarClass = selectV2(
		"navbarClass",
		{
			"grey-bg": "grey-bg",
			"yellow-bg": "yellow-bg",
			none: ""
		},
		"",
		GROUP_IDS.NAVBAR
	);
	const backButton = boolean("backButton", true, GROUP_IDS.NAVBAR);
	const backButtonOnFirstView = boolean("backButtonOnFirstView", false, GROUP_IDS.NAVBAR);
	const handleBackButton = select(
		"handleBackButton",
		[GO_BACK, POP_VIEW, ALERT_SOMETHING, NONE],
		GO_BACK,
		GROUP_IDS.NAVBAR
	);
	const handleBackBehaviourOnFirstView = select(
		"handleBackBehaviourOnFirstView",
		[ALERT_SOMETHING, LOG_IN_CONSOLE, NONE],
		ALERT_SOMETHING,
		GROUP_IDS.NAVBAR
	);

	const properties = {
		active,
		title,
		className,
		name,
		GUIDisabled,
		GUIDisableCover: <div className="gui-mask-cover">{GUIDisabledCoverText}</div>,

		stackMode,
		animation,
		animationTime,
		navbar: parseInt(navbar, 10),
		navbarHeight,
		navbarMenu: getNavbarMenuValue(navbarMenu),
		navbarClass,
		backButton,
		backButtonOnFirstView,

		handleBackButton: getHandleBackButtonValue(handleBackButton, viewportRef),
		handleBackBehaviourOnFirstView: getHandleBackBahaviourOnFirstView(
			handleBackBehaviourOnFirstView,
			viewportRef
		)
	};

	return <InfiniteViewport {...properties} ref={viewportRef} />;
}

const NONE = "none";
const CUSTOM_MENU = "custom items";
const ALERT_SOMETHING = "alert something";
const LOG_IN_CONSOLE = "log in console";
const GO_BACK = "go back";
const POP_VIEW = "pop view";

function getNavbarMenuValue(selected) {
	switch (selected) {
		case CUSTOM_MENU:
			return [
				<i
					claassName="fa fab-android"
					onClick={action("android clicked")}
					style={{ marginRight: "5px" }}
					key="android"
				/>,
				<i
					className="fa fab-apple"
					onClick={action("apple clicked")}
					style={{ marginRight: "5px" }}
					key="apple"
				/>,
				<i className="fa fa-trash" onClick={action("trash clicked")} key="trash" />
			];
		default:
			return null;
	}
}

function getHandleBackButtonValue(selected, viewportRef) {
	switch (selected) {
		case GO_BACK:
			return () => {
				const activeViewIndex = viewportRef.current.state.views.findIndex(
					view => view.props.name === viewportRef.current.state.activeViewName
				);
				const nextView = viewportRef.current.state.views[activeViewIndex - 1];

				if (nextView) {
					viewportRef.current.changeView(nextView.props.name);
				} else {
					console.log("You are on first view. Can't go back anymore.");
				}
			};
		case POP_VIEW:
			return () => {
				const activeViewIndex = viewportRef.current.state.views.findIndex(
					view => view.props.name === viewportRef.current.state.activeViewName
				);
				const lastViewName = viewportRef.current.state.activeViewName;
				const nextView = viewportRef.current.state.views[activeViewIndex - 1];

				if (nextView) {
					viewportRef.current
						.changeView(nextView.props.name)
						.then(() => viewportRef.current.destroyView(lastViewName));
				}
			};
		case ALERT_SOMETHING:
			return () => alert("The back button was clicked");
		default:
			return null;
	}
}

function getHandleBackBahaviourOnFirstView(selected, viewportRef) {
	switch (selected) {
		case ALERT_SOMETHING:
			return () => alert("Handling back button click on first view in stack!");
		case LOG_IN_CONSOLE:
			return () => console.log("Handling back button click on first view in stack");
		default:
			return null;
	}
}
