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
import {SceneWrapper} from "../../../airr-react/Airr";

export default () => {

    const properties = {
        
    };

    return <SceneWrapper {...properties} />;
};
