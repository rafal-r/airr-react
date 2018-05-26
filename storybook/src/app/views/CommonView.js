import React from "react";
import { ViewWrapper } from "../../../airr-react/Airr";
import "../../css/CommonView.css";

export const viewNameTpl = "common-view-*";
const viewClass = "common-view";

export const getNextCommonViewName = views => {
    return viewNameTpl.replace("*", views[views.length - 1].props.number + 1);
};

export const countCommonViews = views => {
    return views.reduce((prev, curr) => {
        if (curr.type === CommonView) {
            prev += 1;
        }

        return prev;
    }, 0);
};

export default class CommonView extends ViewWrapper {
    content() {
        const content =
            typeof this.props.render === "function"
                ? this.props.render()
                : typeof this.props.children === "function"
                    ? this.props.children()
                    : this.props.children;

        return <div className={viewClass}>{content}</div>;
    }
}
