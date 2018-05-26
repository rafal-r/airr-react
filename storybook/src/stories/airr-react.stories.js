import { storiesOf } from "@storybook/react";
import { withKnobs } from "@storybook/addon-knobs/react";
// import SidepanelStory from "./airr-react/sidepanel";
import KitchenSinkStory from "./airr-react/kitchensink";

storiesOf("airr-react", module)
    .addDecorator(withKnobs)
    .add("Kitchensink", KitchenSinkStory)
    // .add("Sidepanel", SidepanelStory);
