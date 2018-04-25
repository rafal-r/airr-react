import React from "react";
import { View, ViewWrapper } from "./../../lib/Airr";
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
                desc: (
                    <span
                        onClick={e => this.handleInfoBtnClick(e, "scene-wrapper")}
                        className="info-icon md"
                    />
                ),
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

    handleInfoBtnClick(e, type) {
        e.stopPropagation();

        let content;
        if (type === "scene-wrapper") {
            content = (
                <div>
                    New standard SceneWrapper implementation.
                </div>
            );
        } 

        this.props.handleInfoBtnClick(content);
    }

    handleItemClick(e) {
        const tab = this.tabsOptions.find(
            val => val.name === e.currentTarget.dataset.view
        );
        return this.props.handleViewportScenePush(tab.conf, e);
    }

    render() {
        return (
            <View {...this.getViewProps()}>
                <div className="wrap col tabs-view">
                    {this.props.description}
                    <p className="info">
                        Tap one of <span className="info-icon sm" /> icons to
                        find out more about certain components.
                    </p>
                </div>

                <Menu
                    items={this.tabsOptions}
                    handleClick={e => this.handleItemClick(e)}
                    title="Tabs implementations:"
                    className="second-menu"
                />
            </View>
        );
    }
}
