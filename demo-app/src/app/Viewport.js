import {CompositeScene} from './../lib/Airr';
import MainScene from './MainScene';

export default class Viewport extends CompositeScene {
    
    constructor(props) {
        super(props);

        this.handleViewportScenePush = this.handleViewportScenePush.bind(this);
        this.handleBackBehaviourOnFirstView = this.handleBackBehaviourOnFirstView.bind(this);
        
        this.state.views = [
            {
                type: MainScene,
                props: {
                    name: 'main-scene',
                    navbar: true,
                    backButton: true,
                    handleViewportScenePush: this.handleViewportScenePush,
                    handleBackBehaviourOnFirstView: this.handleBackBehaviourOnFirstView,
                    avaibleHeight: window.innerHeight
                }
            }
        ];
    }
    
    handleBackBehaviourOnFirstView() {
        this.popView();
    }
    
    handleViewportScenePush(sceneConfig) {
        this.pushView(sceneConfig);
    }
}
