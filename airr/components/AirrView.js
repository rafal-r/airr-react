import React from 'react';
import AirrNavComponent from './AirrNavComponent.js';

class AirrView extends AirrNavComponent {

    constructor(props) {
        super(props);
        console.log('constructor ' + props.name);
    }

    componentDidMount(nextProps, nextState) {
        // console.log('componentDidMount ' + this.props.name);
    }

    componentWillUpdate(nextProps, nextState) {
        // console.log('componentWillUpdate ' + this.props.name);
    }

    render() {
        let className = 'view';
        let style = this.props.style || {};

        style.width = this.props.width + 'px';
        style.height = this.props.height + 'px'
        this.props.active && (className += ' active');

        return (
            <div className={className} style={style} ref={this.props.viewDOMRef}>
                {this.props.children}
            </div>
        );
    }
}

AirrView.defaultProps = {
    name: '',
    active: false,
    width: null,
    height: null,
    viewDOMRef: null
};

export default AirrView;