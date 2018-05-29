import React, { Component } from "react";
import PropTypes from "prop-types";
import AirrFX from "./AirrFX";

export default class AirrMayer extends Component {
    // <button class="btn text alert">YES</button>
    // <button class="btn text success">CANCEL</button>

    refDOMMayer = React.createRef();
    refDOMCtn = React.createRef();

    constructor(props) {
        super(props);
        if (!props.name) {
            throw new Error("Every Mayer must has its `name` property set");
        }
    }
    /**
     * Creates button upon passed config 
     * @param {object} config 
     * @param {int} index 
     * @returns {ReactElement}
     */
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
        if (this.refDOMCtn.current.clientHeight >= this.props.avaibleHeight) {
            this.refDOMCtn.current.style.height = this.props.avaibleHeight + "px";
            this.refDOMMayer.current.classList.add("full");
        }

        this.animateIn();
    }
    /**
     * Animates Mayers html dom element into the screen
     */
    animateIn() {
        //        (element, startProps, transitionProps, endProps, preAnimationCallback, endAfter, endCallback) {
        AirrFX.doTransitionAnimation(
            this.refDOMMayer.current.querySelector(".bg"),
            { opacity: 0 },
            ["opacity " + this.props.animationTime + "ms ease-out"],
            { opacity: 1 }
        );
        AirrFX.doOverlayInAnimation(
            this.refDOMCtn.current,
            this.refDOMMayer.current.clientWidth,
            this.refDOMMayer.current.clientHeight,
            this.props.animationTime,
            this.props.appearFrom
        );
    }

    /**
     * Animates Mayers html dom element out of the screen 
     * @param {function} callback Called after animation end
     */
    animateOut(callback) {
        AirrFX.doTransitionAnimation(
            this.refDOMMayer.current.querySelector(".bg"),
            { opacity: 1 },
            ["opacity " + this.props.animationTime + "ms ease-out"],
            { opacity: 0 }
        );
        AirrFX.doOverlayOutAnimation(
            this.refDOMCtn.current,
            this.refDOMMayer.current.clientHeight,
            this.refDOMMayer.current.clientWidth,
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
            <div className="airr-mayer" ref={this.refDOMMayer}>
                <div className="bg" />
                <div className="ctn" ref={this.refDOMCtn}>
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
    /**
     * The name of the mayer. Must be unique among others mayers in scene. Will be used as identification.
     */
    name: "",
    /**
     * Parent scene height
     */
    avaibleHeight: null,
    /**
     * Side from which mayer content box will enter
     */
    appearFrom: "bottom",
    /**
     * Side to which mayer content box will leave
     */
    leaveTo: "bottom",
    /**
     * Content of mayer
     */    
    content: null,
    /**
     * Array with buttons configuration
     */
    buttons: [],
    /**
     * Time in miliseconds of mayer's appear/disappear animation
     */
    animationTime: 300
};
