import React from 'react';
import AirrNavComponent from './AirrNavComponent.js';
import AirrFX from '../utils/AirrFX';

class AirrMayer extends AirrNavComponent {

    // <button class="btn text alert">YES</button>
    // <button class="btn text success">CANCEL</button>

    mayerDOM;
    ctnDOM;

    constructor(props) {
        super(props);
        if (!props.name) {
            throw new Error('Every AirrMayer must has its `name` property set');
        }
    }

    renderButton(config) {
        let className = "btn text";
        if (config.className) {
            className += " " + config.className;
        }

        let spareAttribs = {};
        if (config.attrs) {
            spareAttribs = config.attrs;
        }

        return <button className={className} style={config.style || null} onClick={config.handler || null} {...spareAttribs}>{config.content}</button>
    }

    componentDidMount() {
        if (this.ctnDOM.clientHeight >= this.props.avaibleHeight) {
            this.ctnDOM.style.height = this.props.avaibleHeight + 'px';
            this.mayerDOM.classList.add('full');
        }

        this.animateIn();
    }

    animateIn() {
        AirrFX.doOverlayAnimation(this.ctnDOM, this.mayerDOM, 300, 'bottom');
    }

    animateOut(callback) {
        AirrFX.doOverlayOutAnimation(this.ctnDOM, this.mayerDOM, 300, 'bottom', callback);
    }

    render() {
        let buttons = [];
        if (this.props.buttons) {
            buttons = this.props.buttons.map((config) => {
                return this.renderButton(config);
            });
        }

        return (
            <div className="mayer" ref={dom => this.mayerDOM = dom}>
                <div className="ctn" ref={dom => this.ctnDOM = dom}>
                    <div className="text">
                        {this.props.children}
                        {this.props.content}
                    </div>
                    <div className="btns">
                        {buttons}
                    </div>
                </div>
            </div>
        );
    }
}

AirrMayer.defaultProps = {
};

export default AirrMayer;