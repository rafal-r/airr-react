import React from "react";
import { ViewWrapper } from "./../../lib/Airr";
import Standard from "./Scene/Standard";
import Menu from "../ui/Menu";

import "./css/Scene.css";

export const viewName = "scene";

export default class Scene extends ViewWrapper {
    sceneOptions = [
        {
            name: "Standard",
            conf: {
                type: Standard,
                props: {
                    name: "Standard",
                    title: "SceneWrapper"
                }
            }
        }
    ];

    handleItemClick = e => {
        return this.props.handleMenuClick(
            this.sceneOptions.filter(
                val => val.name === e.currentTarget.dataset.view
            )[0].conf
        );
    };

    content() {
        return (
            <div>
                <div className="wrap col scene-view">
                    {this.props.description}
                </div>

                <Menu
                    items={this.sceneOptions}
                    handleClick={this.handleItemClick}
                    title="Scene implementations:"
                    className="second-menu"
                />
            </div>
        );
    }
}
