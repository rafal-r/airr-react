import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import SidepanelStory from "./airr-react/sidepanel";
import KitchenSinkStory from "./airr-react/kitchensink";
import { withInfo } from "@storybook/addon-info";
import {
    SceneWrapper,
    Scene,
    View,
    ViewWrapper,
    Sidepanel,
    Mayer
} from "../../airr-react/Airr";
import SceneMd from "../../airr-react/Scene.mkd";
import MayerMd from "../../airr-react/Mayer.mkd";
import SceneWrapperMd from "../../airr-react/SceneWrapper.mkd";
import SidepanelMd from "../../airr-react/Sidepanel.mkd";
import ViewMd from "../../airr-react/View.mkd";
import ViewWrapperMd from "../../airr-react/ViewWrapper.mkd";
import "../css/styles.css";

storiesOf("Examples", module)
    .addDecorator(withKnobs)
    .add(
        "Kitchensink",
        withInfo("Scene component's kitchensink story")(KitchenSinkStory)
    );

//show with examples how to use certain Components method
//example: ::changeView (can have at least 3 examples)
//::openSidepanel, addMayer etc.
//mostly SceneWrapper API
storiesOf("Component's API", module);

storiesOf("Docs", module)
    .add(
        "SceneWrapper",
        withInfo({
            text: SceneWrapperMd,
            inline: true,
            source: false
        })(() => <SceneWrapper />)
    )
    .add(
        "Scene",
        withInfo({
            text: SceneMd,
            inline: true,
            source: false
        })(() => <Scene />)
    )
    .add(
        "ViewWrapper",
        withInfo({
            text: ViewWrapperMd,
            inline: true,
            source: false
        })(() => <ViewWrapper />)
    )
    .add(
        "View",
        withInfo({
            text: ViewMd,
            inline: true,
            source: false
        })(() => <View />)
    )
    .add(
        "Mayer",
        withInfo({
            text: MayerMd,
            inline: true,
            source: false
        })(() => (
            <Mayer
                suppressAnimation={true}
                style={{ display: "none" }}
                name="foo-mayer"
                avaibleHeight={100}
            />
        ))
    )
    .add(
        "Sidepanel",
        withInfo({
            text: SidepanelMd,
            inline: true,
            source: false
        })(() => <Sidepanel sceneWidth={100} sceneHeight={100} />)
    );
