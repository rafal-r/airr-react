import Slide from './Slide';
import {CompositeScene} from 'airr-react';
import update from 'immutability-helper';

class Inheritance extends CompositeScene {

    constructor(props) {
        super(props);

        this.handleNextClick = this.handleNextClick.bind(this);
        this.handlePrevClick = this.handlePrevClick.bind(this);
        this.handleAnimationChange = this.handleAnimationChange.bind(this);

        this.state.animation = 'slide';
        this.state.activeViewName = props.activeViewName;
        this.state.views = [
                {
                    type: Slide,
                    props: {
                        name: props.activeViewName,
                        title: '1',
                        isFirst: true,
                        handleNextClick: this.handleNextClick,
                        handlePrevClick: this.handlePrevClick,
                        handleAnimationChange: this.handleAnimationChange,
                        animation: 'slide'
                    }
                }
        ];
    }

    handleAnimationChange(e) {
        const val = e.target.dataset.value;
        const views = this.state.views.map((item) => {
            return update(item, {props: {animation: {$set: val}}});
        });

        this.setState({animation: val, views: views});
    }

    handleNextClick(e) {
        const viewName = 'v' + (this.state.views.length + 1);
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
    }

    handlePrevClick(e) {
        this.popView();
    }
}

export default Inheritance;