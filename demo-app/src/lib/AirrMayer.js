import React, { Component } from "react";
import PropTypes from "prop-types";
import AirrFX from "./AirrFX";

export default class AirrMayer extends Component {
    // <button class="btn text alert">YES</button>
    // <button class="btn text success">CANCEL</button>

    mayerDOM;
    ctnDOM;

    constructor(props) {
        super(props);
        if (!props.name) {
            throw new Error("Every Mayer must has its `name` property set");
        }
    }

    renderButton(config, index) {
        let className = "btn text";
        if (config.className) {
            className += " " + config.className;
        }

        let spareAttribs = {};
        if (config.attrs) {
            spareAttribs = config.attrs;
        }

        return (
            <button
                key={"btn" + index}
                className={className}
                style={config.style || null}
                onClick={config.handler || null}
                {...spareAttribs}
            >
                {config.content}
            </button>
        );
    }

    componentDidMount() {
        if (this.ctnDOM.clientHeight >= this.props.avaibleHeight) {
            this.ctnDOM.style.height = this.props.avaibleHeight + "px";
            this.mayerDOM.classList.add("full");
        }

        this.animateIn();
    }

    animateIn() {
        //        (element, startProps, transitionProps, endProps, preAnimationCallback, endAfter, endCallback) {
        AirrFX.doTransitionAnimation(
            this.mayerDOM.querySelector(".bg"),
            { opacity: 0 },
            ["opacity " + this.props.animationTime + "ms ease-out"],
            { opacity: 1 }
        );
        AirrFX.doOverlayInAnimation(
            this.ctnDOM,
            this.mayerDOM.clientWidth,
            this.mayerDOM.clientHeight,
            this.props.animationTime,
            this.props.appearFrom
        );
    }

    animateOut(callback) {
        AirrFX.doTransitionAnimation(
            this.mayerDOM.querySelector(".bg"),
            { opacity: 1 },
            ["opacity " + this.props.animationTime + "ms ease-out"],
            { opacity: 0 }
        );
        AirrFX.doOverlayOutAnimation(
            this.ctnDOM,
            this.mayerDOM.clientHeight,
            this.mayerDOM.clientWidth,
            this.props.animationTime,
            this.props.leaveTo,
            callback
        );
    }

    render() {
        let buttons = [];
        if (this.props.buttons) {
            this.props.buttons.forEach((config, index) => {
                buttons.push(this.renderButton(config, index));
            });
        }

        return (
            <div className="airr-mayer" ref={dom => (this.mayerDOM = dom)}>
                <div className="bg" />
                <div className="ctn" ref={dom => (this.ctnDOM = dom)}>
                    <div className="text">
                        {this.props.children}
                        {this.props.content}
                    </div>
                    <div className="btns">{buttons}</div>
                </div>
            </div>
        );
    }
}

AirrMayer.propTypes = {
    name: PropTypes.string.isRequired,
    avaibleHeight: PropTypes.number.isRequired,
    appearFrom: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    leaveTo: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    buttons: PropTypes.arrayOf(PropTypes.object),
    animationTime: PropTypes.number
};
AirrMayer.defaultProps = {
    name: "", //the name of the mayer. Must be unique among others views in scene. Will be used as identification string
    avaibleHeight: null, //parent scene height
    appearFrom: "bottom", //side from which mayer content box will enter
    leaveTo: "bottom", //side to which mayer content box will leave
    content: null, //content of mayer
    buttons: [], //array with buttons configuration
    animationTime: 300 //number time in miliseconds of mayer appear/disappear animation
};
