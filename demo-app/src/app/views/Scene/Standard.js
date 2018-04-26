import { SceneWrapper } from "./../../../lib/Airr";
import Slide, {
    viewNameTpl as SlideViewNameTpl,
    getNextSlideViewName
} from "./Slide";
import update from "immutability-helper";

class Standard extends SceneWrapper {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            animation: "slide",
            activeViewName: getNextSlideViewName(this.state.views),
            views: [
                this.getFreshViewConfig(SlideViewNameTpl, {
                    animation: "slide",
                    viewNumber: 1
                })
            ]
        };
    }

    viewAfterActivation() {
        console.log("Scene viewAfterActivation");
    }

    viewAfterDeactivation() {
        console.log("Scene viewAfterDeactivation");
    }

    viewBeforeActivation() {
        console.log("Scene viewBeforeActivation");
    }

    viewBeforeDeactivation() {
        console.log("Scene viewBeforeDeactivation");
    }

    componentDidMount() {
        console.log("Scene component did mount");
    }

    componentWillUnmount() {
        console.log("Scene component unmounted");
    }

    handleAnimationChange(e) {
        const val = e.target.dataset.value;
        this.setState({ animation: val });
        const newviewsdefinition = this.state.views.map(item => {
            return update(item, { props: { animation: { $set: val } } });
        });

        this.setState({ views: newviewsdefinition });
    }

    handleNextClick(e) {
        this.changeView(SlideViewNameTpl, {
            viewNumber: this.state.views.length + 1,
            isFirst: false,
            animation: this.state.animation
        });
    }

    handlePrevClick(e) {
        this.popView();
    }

    viewsConfig = {
        [SlideViewNameTpl]: {
            type: Slide,
            nameGenerator: getNextSlideViewName,
            props: {
                name: null,
                viewNumber: null,
                animation: null,
                isFirst: true,
                handleNextClick: e => this.handleNextClick(e),
                handlePrevClick: e => this.handlePrevClick(e),
                handleAnimationChange: e => this.handleAnimationChange(e)
            },
            sceneState: {
                //to change scene state when needed (eg. when activated)
            }
        }
    };
}

export default Standard;
