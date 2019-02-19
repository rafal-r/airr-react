import React, { Component } from "react";
import {
	withKnobs,
	withKnobsOptions,
	text,
	number,
	boolean,
	color,
	select,
	selectV2,
	array,
	date,
	button,
	object,
	files
} from "@storybook/addon-knobs/react";
import "airr-react/dist/airr-react.css";
import { Sidepanel } from "airr-react/Airr";
import HelloWorld from "../../app/views/HelloWorld";
import JustScene from "../../app/scenes/JustScene";

export default class SidepanelExample extends Component {
	state = {
		isShown: false
	};

	render() {
		const side = select("side", ["left", "right", "top", "bottom"], "left");
		const children = text("children", "This is example text set as Sidepanel's children");
		const isShown = boolean("isShown", this.state.isShown);
		const enabled = boolean("enabled", true);
		const sizeFactor = number("sizeFactor", 1 / 3, {
			range: true,
			min: 0.05,
			max: 1,
			step: 0.05
		});
		const animationTime = number("animationTime (ms)", 200);
		const bgLayerOpacity = number("bgLayerOpacity", 0.7, {
			range: true,
			min: 0,
			max: 1,
			step: 0.05
		});

		return (
			<JustScene
				sidepanel={{
					type: Sidepanel,
					props: {
						side,
						children: (
							<div
								style={{
									width: "100%",
									height: "100%",
									backgroundColor: "cyan"
								}}
							>
								{children}
							</div>
						),
						isShown,
						enabled,
						sizeFactor,
						animationTime,
						bgLayerOpacity
					}
				}}
				sidepanelVisibilityCallback={isShown => this.setState({ isShown })}
				views={[
					{
						type: HelloWorld,
						props: {
							name: "hello-world",
							children: "Swipe from " + side + " side to open sidepanel."
						}
					}
				]}
				activeViewName="hello-world"
			/>
		);
	}
}
