import React from "react";
import { ViewWrapper } from "../../../airr-react/Airr";
import "../../css/HelloWorld.css";

export const viewName = "hello-world-view";

export default class HelloWorld extends ViewWrapper {
    content() {
        return <div className={viewName}>What up!</div>;
    }
}
