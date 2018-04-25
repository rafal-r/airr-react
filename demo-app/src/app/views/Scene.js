import React from "react";
import { View, ViewWrapper } from "./../../lib/Airr";
import Standard from "./Scene/Standard";
import Menu from "../ui/Menu";

import "./css/Scene.css";

export const viewName = "scene";

export default class Scene extends ViewWrapper {
    sceneOptions = [
        {
            name: "Standard",
            desc: (
                <span
                    onClick={e => this.handleInfoBtnClick(e, "standard-scene-wrapper")}
                    className="info-icon md"
                />
            ),
            conf: {
                type: Standard,
                props: {
                    name: "Standard",
                    title: "SceneWrapper"
                }
            }
        }
    ];

    handleInfoBtnClick = (e, type) => {
        e.stopPropagation();

        let content;
        if (type === "standard-scene-wrapper") {
            content = (
                <div>
                    New standard SceneWrapper implementation.
                </div>
            );
        } 

        this.props.handleInfoBtnClick(content);
    };

    handleItemClick = e => {
        return this.props.handleMenuClick(
            this.sceneOptions.filter(
                val => val.name === e.currentTarget.dataset.view
            )[0].conf
        );
    };

    render() {
        return (
            <View {...this.getViewProps()}>
                <div className="wrap col scene-view">
                    {this.props.description}
                    <p className="info">
                        Tap one of <span className="info-icon sm" /> icons to
                        find out more about certain components.
                    </p>
                </div>

                <Menu
                    items={this.sceneOptions}
                    handleClick={this.handleItemClick}
                    title="Scene implementations:"
                    className="second-menu"
                />
            </View>
        );
    }
}
