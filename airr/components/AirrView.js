import React from 'react';
import AirrComponent from './AirrComponent.js';

class AirrView extends AirrComponent {

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