import React from "react";
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
import "../../../airr-react/airr-react.css";
import { Sidepanel } from "../../../airr-react/Airr";
import HelloWorld from "../../app/views/HelloWorld";
import JustScene from "../../app/scenes/JustScene";

export default () => {
    const side = select("side", ["left", "right", "top", "bottom"], "left");
    const children = text(
        "children",
        "This is example text set as Sidepanel's children"
    );
    const isShown = boolean("isShown", false);
    const enabled = boolean("enabled", true);
    const sizeFactor = number("sizeFactor", 1 / 3);
    const animateShown = boolean("animateShown", true);
    const animationTime = number("animationTime", 200);
    const bgLayerOpacity = number("bgLayerOpacity", 0.7);

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
                    animateShown,
                    animationTime,
                    bgLayerOpacity
                }
            }}
            views={[
                {
                    type: HelloWorld,
                    props: {
                        name: "hello-world",
                        children:
                            "Swipe from " + side + " side to open sidepanel."
                    }
                }
            ]}
            activeViewName="hello-world"
        />
    );
};
