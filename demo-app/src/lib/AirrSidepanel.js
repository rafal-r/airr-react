import React, { Component } from "react";
import PropTypes from "prop-types";
import { isMobileDevice, supportPassive } from "./eventHelpers";

export default class AirrSidepanel extends Component {
    size;
    sceneSize;
    currentVal;
    hiddenVal;
    shownVal;
    transformScheme;
    axis;
    lastSide;
    lastSizeFactor;

    refDOMDragCtn = React.createRef();
    refDOMBgLayer = React.createRef();
    refDOM = React.createRef();
    sceneDOM;

    lastTouch;

    startEvent = isMobileDevice ? "touchstart" : "mousedown";
    moveEvent = isMobileDevice ? "touchmove" : "mousemove";
    endEvent = isMobileDevice ? "touchend" : "mouseup";

    enable() {
        this.sceneDOM.removeEventListener(
            this.startEvent,
            this.handleTouchStart
        );
        this.sceneDOM.addEventListener(
            this.startEvent,
            this.handleTouchStart,
            supportPassive
        );
    }

    disable() {
        this.sceneDOM.removeEventListener(
            this.startEvent,
            this.handleTouchStart
        );
    }

    componentDidMount() {
        this.sceneDOM = this.refDOM.current.parentNode;

        if (this.props.enabled) {
            this.enable();
        }
    }

    __bubbleChildTillParent(child, parent, tillElements) {
        if (child.parentNode === parent) {
            return true;
        } else {
            if (
                !child.parentNode ||
                tillElements.indexOf(child.parentNode) !== -1
            ) {
                return false;
            } else {
                return this.__bubbleChildTillParent(
                    child.parentNode,
                    parent,
                    tillElements
                );
            }
        }
    }

    getPosition = (e, axis) => {
        return "changedTouches" in e
            ? e.changedTouches[0]["client" + axis]
            : e["client" + axis];
    };

    getLastPosition = e => {
        return "changedTouches" in e
            ? e.changedTouches[0]
            : { clientX: e.clientX, clientY: e.clientY };
    };

    getEventX = e => {
        return "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    };

    getEventY = e => {
        return "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
    };

    handleTouchStart = e => {
        const pos = this.getPosition(e, this.axis);
        let dragCtnOnTouchPath = false;

        if (e.path) {
            for (let i = 0; i < e.path.length; i++) {
                if (e.path[i] === this.refDOMDragCtn.current) {
                    dragCtnOnTouchPath = true;
                }
            }
        } else {
            if (
                e.target === this.refDOMDragCtn.current ||
                this.__bubbleChildTillParent(
                    e.target,
                    this.refDOMDragCtn.current,
                    [this.refDOMDragCtn.current.parentNode, document.body]
                )
            ) {
                dragCtnOnTouchPath = true;
            }
        }

        if (
            !dragCtnOnTouchPath &&
            ((["left", "top"].indexOf(this.props.side) !== -1 && pos < 20) ||
                (["right", "bottom"].indexOf(this.props.side) !== -1 &&
                    pos > this.hiddenVal - 20))
        ) {
            //corner touch, show moves

            this.refDOM.current.style.display = "block";
            this.sceneDOM.addEventListener(
                this.moveEvent,
                this.handleShowTouchMove,
                supportPassive
            );
            this.sceneDOM.addEventListener(
                this.endEvent,
                this.handleTouchEnd,
                false
            );

            // this.triggerCustom("showTouchStart");

            const showmoveend = () => {
                this.sceneDOM.removeEventListener(this.endEvent, showmoveend); //remove self to act like once listener
                this.sceneDOM.removeEventListener(
                    this.moveEvent,
                    this.handleShowTouchMove
                );
                // this.triggerCustom("showTouchEnd");
            };

            this.sceneDOM.addEventListener(this.endEvent, showmoveend, false);
        } else if (this.currentVal === this.shownVal) {
            //fully visible, hide moves
            this.sceneDOM.addEventListener(
                this.moveEvent,
                this.handleHideTouchMove,
                supportPassive
            );
            this.sceneDOM.addEventListener(
                this.endEvent,
                this.handleTouchEnd,
                false
            );

            // this.triggerCustom("hideTouchStart");

            const hidemoveend = () => {
                this.sceneDOM.removeEventListener(this.endEvent, hidemoveend);
                this.sceneDOM.removeEventListener(
                    this.moveEvent,
                    this.handleHideTouchMove
                );
                // this.triggerCustom("hideTouchEnd");
            };

            this.sceneDOM.addEventListener(this.endEvent, hidemoveend, false);
        }

        if (e.target === this.refDOMBgLayer.current) {
            //tap to hide
            if (
                (["left", "top"].indexOf(this.props.side) !== -1 &&
                    this.currentVal === 0) ||
                (["right", "bottom"].indexOf(this.props.side) !== -1 &&
                    this.currentVal)
            ) {
                const hidedragctn = e => {
                    this.sceneDOM.removeEventListener(
                        this.endEvent,
                        hidedragctn
                    );
                    if (Math.abs(pos - this.getPosition(e, this.axis)) <= 2.5) {
                        this.hide();
                    }
                };

                this.sceneDOM.addEventListener(
                    this.endEvent,
                    hidedragctn,
                    false
                );
            }
        }

        this.lastTouch = this.getLastPosition(e);
    };

    handleShowTouchMove = e => {
        const pos = this.getPosition(e, this.axis);
        let newVal, progress;

        if (["left", "top"].indexOf(this.props.side) !== -1) {
            if (pos <= -1 * this.hiddenVal) {
                newVal = this.hiddenVal + pos;
            } else {
                newVal = this.shownVal;
            }
            progress = pos / this.size;
        } else {
            if (this.hiddenVal - pos <= this.size) {
                newVal = pos;
            } else {
                newVal = this.shownVal;
            }
            progress = (this.sceneSize - pos) / this.size;
        }

        if (newVal !== this.currentVal) {
            this.currentVal = newVal;
            progress = parseFloat(progress);
            progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

            this.refDOMBgLayer.current.style.opacity =
                progress * this.props.bgLayerOpacity;

            this.refDOMDragCtn.current.style.webkitTransform = this.transformScheme.replace(
                "%v",
                this.currentVal
            );
            this.refDOMDragCtn.current.style.transform = this.transformScheme.replace(
                "%v",
                this.currentVal
            );
        }

        this.lastTouch = this.getLastPosition(e);

        if (!supportPassive) {
            e.preventDefault();
        }
    };

    handleHideTouchMove = e => {
        let progress, newVal, change, moveAxis;

        if (this.lastTouch) {
            if (
                Math.abs(this.lastTouch.clientX - this.getEventX(e)) >=
                Math.abs(this.lastTouch.clientY - this.getEventY(e))
            ) {
                if (this.getEventX(e) - this.lastTouch.clientX <= 0) {
                    // move = 'left';
                    moveAxis = "X";
                } else {
                    // move = 'right';
                    moveAxis = "X";
                }
            } else {
                if (this.getEventY(e) - this.lastTouch.clientY <= 0) {
                    // move = 'top';
                    moveAxis = "Y";
                } else {
                    // move = 'bottom';
                    moveAxis = "Y";
                }
            }
        }

        if (
            moveAxis === this.axis &&
            ((["left", "top"].indexOf(this.props.side) !== -1 &&
                this.getPosition(e, moveAxis) < this.size) ||
                (["right", "bottom"].indexOf(this.props.side) !== -1 &&
                    this.getPosition(e, moveAxis) > this.hiddenVal - this.size))
        ) {
            change =
                this.getPosition(e, this.axis) -
                this.lastTouch["client" + this.axis];
            newVal = this.currentVal + change;

            if (this.props.side === "left" || this.props.side === "top") {
                if (newVal < this.hiddenVal) {
                    newVal = this.hiddenVal;
                } else if (newVal > this.shownVal) {
                    newVal = this.shownVal;
                }

                progress = 1 - Math.abs(newVal / this.size);
            } else {
                if (newVal > this.hiddenVal) {
                    newVal = this.hiddenVal;
                } else if (newVal < this.shownVal) {
                    newVal = this.shownVal;
                }

                progress = (this.sceneSize - newVal) / this.size;
            }

            if (newVal !== this.currentVal) {
                this.currentVal = newVal;
                progress = parseFloat(progress);
                progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

                this.refDOMBgLayer.current.style.opacity =
                    progress * this.props.bgLayerOpacity;

                this.refDOMDragCtn.current.style.webkitTransform = this.transformScheme.replace(
                    "%v",
                    this.currentVal
                );
                this.refDOMDragCtn.current.style.transform = this.transformScheme.replace(
                    "%v",
                    this.currentVal
                );
            }
        }

        this.lastTouch = this.getLastPosition(e);
        if (!supportPassive) {
            e.preventDefault();
        }
    };

    handleTouchEnd = e => {
        let val = null;

        if (!this.animating) {
            if (
                this.currentVal !== this.shownVal &&
                this.currentVal !== this.hiddenVal
            ) {
                if (["left", "top"].indexOf(this.props.side) !== -1) {
                    if (this.currentVal >= this.hiddenVal / 2) {
                        val = this.shownVal;
                    } else {
                        val = this.hiddenVal;
                    }
                } else {
                    if (this.currentVal < this.hiddenVal - this.size / 2) {
                        val = this.shownVal;
                    } else {
                        val = this.hiddenVal;
                    }
                }
            } else if (this.currentVal === this.hiddenVal) {
                this.refDOM.current.style.display = "none";
            }

            if (val !== null) {
                this.translateTo(val);
            } else {
                if (this.props.isShown !== this.isShown()) {
                    this.props.visibilityCallback(this.isShown());
                }
            }
        }

        this.sceneDOM.removeEventListener(this.endEvent, this.handleTouchEnd);
    };

    hide = () => {
        return this.translateTo(this.hiddenVal);
    };

    show = () => {
        return this.translateTo(this.shownVal);
    };

    isShown = () => {
        return this.refDOM.current.offsetParent !== null;
    };

    translateTo = finishVal => {
        return new Promise(resolve => {
            this.animating = true;

            this.refDOMBgLayer.current.style.webkitTransition = `opacity ${
                this.props.animationTime
            }ms ease-in`;
            this.refDOMBgLayer.current.style.transition = `opacity ${
                this.props.animationTime
            }ms ease-in`;
            // eslint-disable-next-line
            this.refDOMBgLayer.current.offsetHeight;

            if (finishVal === this.shownVal) {
                if (!this.isShown()) {
                    this.refDOM.current.style.display = "block";
                }

                this.refDOMBgLayer.current.style.opacity = this.props.bgLayerOpacity;
            } else if (finishVal === this.hiddenVal) {
                this.refDOMBgLayer.current.style.opacity = 0;
            }
            // eslint-disable-next-line
            this.refDOM.current.offsetHeight;
            this.refDOM.current.style.webkitTransition = "initial";
            this.refDOM.current.style.transition = "initial";

            this.refDOMDragCtn.current.style.webkitTransition = `-webkit-transform ${
                this.props.animationTime
            }ms ease-out`;
            this.refDOMDragCtn.current.style.webkitTransition = `transform ${
                this.props.animationTime
            }ms ease-out`;
            this.refDOMDragCtn.current.style.transition = `transform ${
                this.props.animationTime
            }ms ease-out`;

            // eslint-disable-next-line
            this.refDOMDragCtn.current.offsetHeight;
            this.refDOMDragCtn.current.style.webkitTransform = this.transformScheme.replace(
                "%v",
                finishVal
            );
            this.refDOMDragCtn.current.style.transform = this.transformScheme.replace(
                "%v",
                finishVal
            );

            // eslint-disable-next-line
            this.refDOMDragCtn.current.offsetHeight;

            this.refDOMDragCtn.current.style.webkitTransition = "initial";
            this.refDOMDragCtn.current.style.transition = "initial";

            setTimeout(() => {
                this.refDOMBgLayer.current.style.webkitTransition = "initial";
                this.refDOMBgLayer.current.style.transition = "initial";

                this.currentVal = finishVal;

                if (finishVal === this.hiddenVal) {
                    this.refDOM.current.style.display = "none";
                }

                this.animating = false;

                if (this.props.isShown !== this.isShown()) {
                    this.props.visibilityCallback(this.isShown());
                }

                resolve(this.isShown());
            }, this.props.animationTime + 5);
        });
    };

    updateSideProps(side, sizeFactor) {
        if (side === "left" || side === "right") {
            this.size = this.props.sceneWidth * sizeFactor;
            this.sceneSize = this.props.sceneWidth;
            this.hiddenVal =
                side === "left" ? -1 * this.size : this.props.sceneWidth;
            this.transformScheme = "translate3d(%vpx,0,0)";
            this.axis = "X";
        } else {
            //top,bottom
            this.size = this.props.sceneHeight * sizeFactor;
            this.sceneSize = this.props.sceneHeight;
            this.hiddenVal =
                side === "top" ? -1 * this.size : this.props.sceneHeight;
            this.transformScheme = "translate3d(0,%vpx,0)";
            this.axis = "Y";
        }

        if (side === "top" || side === "left") {
            this.shownVal = 0;
        } else {
            this.shownVal = this.sceneSize - this.size;
        }

        if (this.props.isShown) {
            this.currentVal = this.shownVal;
        } else {
            this.currentVal = this.hiddenVal;
        }

        this.lastSide = side;
        this.lastSizeFactor = sizeFactor;
        this.lastSceneWidth = this.props.sceneWidth;
        this.lastSceneHeight = this.props.sceneHeight;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.enabled !== this.props.enabled) {
            return this[this.props.enabled ? "enable" : "disable"]();
        }
    }

    render() {
        const className =
            "airr-sidepanel " +
            this.props.side +
            " " +
            (this.props.enabled ? "enabled" : "disabled");
        const dragCtnStyle = {};
        let sidepanelStyle;
        let bgLayerStyle;

        if (
            this.props.side !== this.lastSide ||
            this.props.sizeFactor !== this.lastSizeFactor ||
            this.props.sceneWidth !== this.lastSceneWidth ||
            this.props.sceneHeight !== this.lastSceneHeight
        ) {
            this.updateSideProps(this.props.side, this.props.sizeFactor);
        }

        if (this.props.side === "left" || this.props.side === "right") {
            dragCtnStyle.width = this.size + "px";
            dragCtnStyle.height = "100%";
        } else {
            //top,bottom
            dragCtnStyle.height = this.size + "px";
            dragCtnStyle.width = "100%";
        }

        if (this.props.isShown) {
            dragCtnStyle.WebkitTransform = this.transformScheme.replace(
                "%v",
                this.shownVal
            );
            dragCtnStyle.transform = this.transformScheme.replace(
                "%v",
                this.shownVal
            );
            sidepanelStyle = { display: "block" };
            bgLayerStyle = { opacity: this.props.bgLayerOpacity };
        } else {
            dragCtnStyle.WebkitTransform = this.transformScheme.replace(
                "%v",
                this.hiddenVal
            );
            dragCtnStyle.transform = this.transformScheme.replace(
                "%v",
                this.hiddenVal
            );
            sidepanelStyle = { display: "none" };
            bgLayerStyle = { opacity: 0 };
        }

        const children =
            typeof this.props.children === "function"
                ? this.props.children()
                : this.props.children;

        return (
            <div className={className} ref={this.refDOM} style={sidepanelStyle}>
                <div ref={this.refDOMBgLayer} style={bgLayerStyle} />
                <div ref={this.refDOMDragCtn} style={dragCtnStyle}>
                    {children}
                </div>
            </div>
        );
    }
}
AirrSidepanel.propTypes = {
    /**
     * Side to which sidepanel will be attached
     */
    side: PropTypes.oneOf(["left", "right", "top", "bottom"]),
    /**
     * Bool determining if sidepanel is shown or not
     */
    isShown: PropTypes.bool,
    /**
     * Bool determining if sidepanel is enabled, another words, if its can be drag out
     */
    enabled: PropTypes.bool,
    /**
     * Number between 0 and 1 determining how much size of whole screen sidepanel will take
     */
    sizeFactor: PropTypes.number,
    /**
     * Parent scene width dimension. Set by parent scene. Do not overwrite!.
     */
    sceneWidth: PropTypes.number,
    /**
     * Parent scene height dimension. Set by parent scene. Do not overwrite!.
     */
    sceneHeight: PropTypes.number,
    /**
     * Do you want to animate sidepanel showing in/out
     */
    animateShown: PropTypes.bool,
    /**
     * Callback called when sidepanel changes its visibility during touch events. Set by parent scene. Do not overwrite!.
     */
    visibilityCallback: PropTypes.func,
    /**
     * Animation time in miliseconds
     */
    animationTime: PropTypes.number,
    /**
     * Opacity between 0 and 1
     */
    bgLayerOpacity: PropTypes.number
};
AirrSidepanel.defaultProps = {
    side: "left",
    isShown: false,
    enabled: false,
    sizeFactor: 2 / 3,
    sceneWidth: null,
    sceneHeight: null,
    animateShown: true,
    visibilityCallback: function(isShown) {},
    animationTime: 200,
    bgLayerOpacity: 0.7
};
