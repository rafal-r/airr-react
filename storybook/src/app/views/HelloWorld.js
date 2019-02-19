import React from "react";
import { ViewWrapper } from "airr-react/Airr";
import "../../css/HelloWorld.css";

export const viewName = "hello-world-view";

export default class HelloWorld extends ViewWrapper {
	content() {
		const content =
			typeof this.props.render === "function"
				? this.props.render()
				: typeof this.props.children === "function"
				? this.props.children()
				: this.props.children;

		return <div className={viewName}>{content ? content : "What up!"}</div>;
	}
}
