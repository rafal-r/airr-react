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
import "airr-react/dist/airr-react.css";
import InfiniteViewport from "../../app/scenes/InfiniteViewport";

export default () => {

    const properties = {
        active: true,
        name: "sidepanel-showcase",
        navbar: 1,
        navbarMenu: "toggleSidepanel",
        sidepanel: {}
    };

    return <InfiniteViewport {...properties} />;
};
