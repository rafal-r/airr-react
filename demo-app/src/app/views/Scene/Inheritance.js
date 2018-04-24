import Slide from "./Slide";
import { CompositeScene } from "./../../../lib/Airr";
import update from "immutability-helper";

class Inheritance extends CompositeScene {
    constructor(props) {
        super(props);

        this.state = {
            initialState: true, //to override this state over props getDerivedStateFromProps
            animation: "slide",
            activeViewName: props.activeViewName,
            views: [
                {
                    type: Slide,
                    props: {
                        name: props.activeViewName,
                        title: "1",
                        isFirst: true,
                        handleNextClick: this.handleNextClick,
                        handlePrevClick: this.handlePrevClick,
                        handleAnimationChange: this.handleAnimationChange,
                        animation: "slide"
                    }
                }
            ]
        };
    }

    handleAnimationChange = e => {
        const val = e.target.dataset.value;
        const views = this.state.views.map(item => {
            return update(item, { props: { animation: { $set: val } } });
        });

        this.setState({ animation: val, views: views });
    };

    handleNextClick = e => {
        const viewName = "v" + (this.state.views.length + 1);
        const config = {
            type: Slide,
            props: {
                name: viewName,
                title: this.state.views.length + 1,
                isFirst: false,
                handleNextClick: this.handleNextClick,
                handlePrevClick: this.handlePrevClick,
                handleAnimationChange: this.handleAnimationChange,
                animation: this.state.animation
            }
        };

        this.pushView(config);
    };

    handlePrevClick = e => {
        this.popView();
    };
}

export default Inheritance;
