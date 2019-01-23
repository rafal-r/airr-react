import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AirrFX from "./AirrFX";

export default class AirrMayer extends PureComponent {
    /**
     * Mayer's HTML DOM Element refferency
     */
    refDOMMayer = React.createRef();
    /**
     * Mayer's container's HTML DOM Element refferency
     */
    refDOMCtn = React.createRef();

    constructor(props) {
        super(props);
        if (!props.name) {
            throw new Error("Every Mayer must has its `name` property set");
        }
    }

    componentDidMount() {
        if (this.refDOMCtn.current.clientHeight >= this.props.avaibleHeight) {
            this.refDOMCtn.current.style.height =
                this.props.avaibleHeight + "px";
            this.refDOMMayer.current.classList.add("full");
        }

        this.animateIn();
    }

    /**
     * Animates Mayers html dom element into the screen
     */
    animateIn() {
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
        return (
            <div
                className="airr-mayer"
                ref={this.refDOMMayer}
                style={this.props.style}
            >
                <BgRenderer />
                <div className="ctn" ref={this.refDOMCtn}>
                    <BodyRenderer
                        children={this.props.children}
                        content={this.props.content}
                    />
                    <ButtonRenderer buttons={this.props.buttons} />
                </div>
            </div>
        );
    }
}

const BgRenderer = React.memo(function BgRenderer() {
    return <div className="bg" />;
});
const ChildrenRenderer = React.memo(function ChildrenRenderer({ children }) {
    return children;
});
const ContentRenderer = React.memo(function ContentRenderer({ content }) {
    return content;
});
const BodyRenderer = React.memo(function BodyRenderer({ children, content }) {
    return (
        <div className="text">
            <ChildrenRenderer children={children} />
            <ContentRenderer content={content} />
        </div>
    );
});
const MayerButton = React.memo(function MayerButton({
    className,
    style,
    onClick,
    children,
    ...spareAttribs
}) {
    return (
        <button
            className={className}
            style={style}
            onClick={onClick}
            {...spareAttribs}
        >
            {children}
        </button>
    );
});
const ButtonRenderer = React.memo(function ButtonRenderer({ buttons }) {
    return (
        <div className="btns">
            {buttons.map((config, index) => {
                let className = "btn text";

                if (config.className) {
                    className += " " + config.className;
                }

                let spareAttribs = {};
                if (config.attrs) {
                    spareAttribs = config.attrs;
                }

                return (
                    <MayerButton
                        key={"btn" + index}
                        className={className}
                        style={config.style || null}
                        onClick={config.handler || null}
                        {...spareAttribs}
                    >
                        {config.content}
                    </MayerButton>
                );
            })}
        </div>
    );
});

AirrMayer.propTypes = {
    /**
     * The name of the mayer. Must be unique among others mayers in scene. Will be used as identification.
     */
    name: PropTypes.string.isRequired,
    /**
     * Extra styles to apply on Mayer's DOM element
     */
    style: PropTypes.object,
    /**
     * Parent scene height. Set by parent Scene. Do not overwrite!
     */
    avaibleHeight: PropTypes.number.isRequired,
    /**
     * Side from which mayer content box will enter
     */
    appearFrom: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    /**
     * Side to which mayer content box will leave
     */
    leaveTo: PropTypes.oneOf(["top", "bottom", "left", "right"]),
    /**
     * Content of mayer
     */
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * Array with buttons configuration
     */
    buttons: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * Extra class names to use upon button
             */
            className: PropTypes.string,
            /**
             * Extra attributes to apply on HTML element
             */
            attrs: PropTypes.object,
            /**
             * Additional inline styles
             */
            style: PropTypes.object,
            /**
             * OnClick function handler
             */
            handler: PropTypes.func,
            /**
             * Content to render inside Mayer. Might be string or ReactElement.
             */
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
        })
    ),
    /**
     * Time in miliseconds of mayer's appear/disappear animation
     */
    animationTime: PropTypes.number
};
AirrMayer.defaultProps = {
    name: "",
    style: null,
    avaibleHeight: null,
    appearFrom: "bottom",
    leaveTo: "bottom",
    content: null,
    buttons: [],
    animationTime: 300
};
