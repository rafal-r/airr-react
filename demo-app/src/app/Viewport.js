import { SceneWrapper } from "./../lib/Airr";
import MainScene, { viewName as MainSceneViewName } from "./MainScene.js";

export default class Viewport extends SceneWrapper {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            initialState: true, //to override this state over props on initial getDerivedStateFromProps
            activeViewName: MainSceneViewName,
            name: "viewport",
            animation: "overlay",
            active: true,
            views: [
                {
                    type: MainScene,
                    props: {
                        name: MainSceneViewName,
                        handleViewportScenePush: this.handleViewportScenePush,
                        handleBackBehaviourOnFirstView: this
                            .handleBackBehaviourOnFirstView,
                        avaibleHeight: window.innerHeight
                    }
                }
            ]
        };
    }

    handleBackBehaviourOnFirstView = () => {
        this.popView();
    };

    handleViewportScenePush = sceneConfig => {
        this.pushView(sceneConfig);
    };
}
