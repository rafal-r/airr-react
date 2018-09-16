import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import SidepanelExample from "./interactive-examples/sidepanel";
import SceneWrapperExample from "./interactive-examples/scene-wrapper";
import { withInfo } from "@storybook/addon-info";
import {
    SceneWrapper,
    Scene,
    View,
    ViewWrapper,
    Sidepanel,
    Mayer
} from "../../airr-react/Airr";
import SimpleScene from "../app/scenes/SimpleScene";
import SceneMd from "../../airr-react/Scene.mkd";
import MayerMd from "../../airr-react/Mayer.mkd";
import SceneWrapperMd from "../../airr-react/SceneWrapper.mkd";
import SidepanelMd from "../../airr-react/Sidepanel.mkd";
import ViewMd from "../../airr-react/View.mkd";
import ViewWrapperMd from "../../airr-react/ViewWrapper.mkd";
import "../css/styles.css";

storiesOf("Interactive examples", module)
    .addDecorator(withKnobs)
    .add(
        "SceneWrapper",
        withInfo(
            "This example provides overview of most vital features of SceneWrapper Component - the heart of the library."
        )(SceneWrapperExample)
    )
    .add(
        "Sidepanel",
        withInfo(
            "The addon component to the SceneWrapper. Provides helpful panel hidden in one of the screen corners. Can be shown with a swipe gesture."
        )(() => <SidepanelExample />)
    );

//show with examples how to use certain Components method
//example: ::changeView (can have at least 3 examples)
//::openSidepanel, addMayer etc.
//mostly SceneWrapper API
//view lifecycle methods

storiesOf("Component's API/SceneWrapper/::changeView", module)
    .add(
        "Push new view from viewsConfig",
        withInfo(
            "Check [SimpleScene::pushNewViewFromViewsConfig](https://github.com/rafal-r/airr-react/blob/8098385cc1e95a7b2b433afab3fe6a1accb526ba/storybook/src/app/scenes/SimpleScene.js#L88) method for implementation details."
        )(() => <SimpleScene handleMethod="pushNewViewFromViewsConfig" />)
    )
    .add(
        "Push new view via raw config",
        withInfo(
            "Check [SimpleScene::pushNewViewFromRawConfigDefinition](https://github.com/rafal-r/airr-react/blob/8098385cc1e95a7b2b433afab3fe6a1accb526ba/storybook/src/app/scenes/SimpleScene.js#L99) method for implementation details."
        )(() => (
            <SimpleScene handleMethod="pushNewViewFromRawConfigDefinition" />
        ))
    )
    .add(
        "Go to another view",
        withInfo(
            "Check [SimpleScene::goToAnotherView](https://github.com/rafal-r/airr-react/blob/8098385cc1e95a7b2b433afab3fe6a1accb526ba/storybook/src/app/scenes/SimpleScene.js#L76) method for implementation details."
        )(() => <SimpleScene handleMethod="goToAnotherView" />)
    )
    .add(
        "Update current view",
        withInfo(
            "Check [SimpleScene::updateCurrentView](https://github.com/rafal-r/airr-react/blob/8098385cc1e95a7b2b433afab3fe6a1accb526ba/storybook/src/app/scenes/SimpleScene.js#L115) method for implementation details."
        )(() => <SimpleScene handleMethod="updateCurrentView" />)
    )
    .add(
        "Update scene",
        withInfo(
            "Check [SimpleScene::updateScene](https://github.com/rafal-r/airr-react/blob/8098385cc1e95a7b2b433afab3fe6a1accb526ba/storybook/src/app/scenes/SimpleScene.js#L127) method for implementation details."
        )(() => <SimpleScene handleMethod="updateScene" />)
    );

storiesOf("Component's API/SceneWrapper", module).add(
    "::openSidepanel",
    withInfo(
        "Check [SimpleScene::openSidepanelExample](https://github.com/rafal-r/airr-react/blob/8098385cc1e95a7b2b433afab3fe6a1accb526ba/storybook/src/app/scenes/SimpleScene.js#L144) method for implementation details."
    )(() => <SimpleScene handleMethod="openSidepanelExample" />)
);

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
