import React from "react";
import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
import SidepanelStory from "./airr-react/sidepanel";
import KitchenSinkStory from "./airr-react/kitchensink";
import { withInfo } from "@storybook/addon-info";
import { SceneWrapper } from "../../airr-react/Airr";
import Foo from "../../airr-react/Foo";

storiesOf("airr-react", module)
    .addDecorator(withKnobs)
    .add(
        "Kitchensink",
        withInfo("Scene component kitchensink story")(KitchenSinkStory)
    )
    .add(
        "SceneWrapper",
        withInfo("blabla")(() => (
            <SceneWrapper />
        ))
    )
    .add(
        "Foo",
        withInfo("blabla")(() => (
            <Foo />
        ))
    );
// .add("Sidepanel", SidepanelStory);
