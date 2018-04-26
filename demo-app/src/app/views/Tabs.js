import React from "react";
import { ViewWrapper } from "./../../lib/Airr";
import Standard from "./Tabs/Standard";
import Menu from "../ui/Menu";
import "./css/Scene.css";

export const viewName = "tabs";

export default class Tabs extends ViewWrapper {
    constructor(props) {
        super(props);

        this.tabsOptions = [
            {
                name: "Standard",
                conf: {
                    type: Standard,
                    props: {
                        name: "Standard",
                        title: "Tabs",
                        handleBackBehaviourOnFirstView:
                            props.handleBackBehaviourOnFirstView
                    }
                }
            }
        ];
    }

    handleItemClick(e) {
        const tab = this.tabsOptions.find(
            val => val.name === e.currentTarget.dataset.view
        );
        return this.props.handleViewportScenePush(tab.conf, e);
    }

    content() {
        return (
            <div>
                <div className="wrap col tabs-view">
                    {this.props.description}
                </div>

                <Menu
                    items={this.tabsOptions}
                    handleClick={e => this.handleItemClick(e)}
                    title="Tabs implementations:"
                    className="second-menu"
                />
            </div>
        );
    }
}
