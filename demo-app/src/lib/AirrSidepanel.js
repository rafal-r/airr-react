import React from "react";
import PropTypes from "prop-types";
import AirrComponent from "./AirrComponent";
import { isMobileDevice, supportPassive } from "./eventHelpers";

export default class AirrSidepanel extends AirrComponent {
    size;
    sceneSize;
    currentVal;
    hiddenVal;
    shownVal;
    transformScheme;
    axis;

    dragCtnDOM;
    bgLayerDOM;
    sidepanelDOM;
    sceneDOM;

    lastTouch;

    state = {
        side: this.props.side,
        isShown: this.props.isShown,
        sizeFactor: this.props.sizeFactor,
        sceneWidth: this.props.sceneWidth,
        sceneHeight: this.props.sceneHeight
    };

    enabled = this.props.enabled;

    startEvent = isMobileDevice ? "touchstart" : "mousedown";
    moveEvent = isMobileDevice ? "touchmove" : "mousemove";
    endEvent = isMobileDevice ? "touchend" : "mouseup";

    constructor(props) {
        super(props);
        this.updateSideProps(props.side);
    }

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
        this.enabled = true;
    }

    disable() {
        this.sceneDOM.removeEventListener(
            this.startEvent,
            this.handleTouchStart
        );
        this.enabled = false;
    }

    componentDidMount() {
        this.sceneDOM = this.sidepanelDOM.parentNode;

        if (this.enabled) {
            this.enable();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.enabled && this.enabled) {
            this.disable();
        }

        if (nextProps.enabled && !this.enabled) {
            this.enable();
        }

        if (nextProps.dragCtnStyle !== this.state.dragCtnStyle) {
            this.setState({ dragCtnStyle: nextProps.dragCtnStyle });
        }
        if (nextProps.side !== this.state.side) {
            this.updateSideProps(nextProps.side);
            this.setState({ side: nextProps.side });
        }
        if (nextProps.isShown !== this.state.isShown) {
            if (nextProps.animateShown) {
                this.translateTo(
                    nextProps.isShown ? this.shownVal : this.hiddenVal
                );
            } else {
                this.setState({ isShown: nextProps.isShown });
            }
        }
        if (nextProps.sizeFactor !== this.state.sizeFactor) {
            this.setState({ sizeFactor: nextProps.sizeFactor });
        }
        if (nextProps.sceneWidth !== this.state.sceneWidth) {
            this.setState({ sceneWidth: nextProps.sceneWidth });
        }
        if (nextProps.sceneHeight !== this.state.sceneHeight) {
            this.setState({ sceneHeight: nextProps.sceneHeight });
        }
    }

    bubbleChildTillParent(child, parent, tillElements) {
        if (child.parentNode === parent) {
            return true;
        } else {
            if (
                !child.parentNode ||
                tillElements.indexOf(child.parentNode) !== -1
            ) {
                return false;
            } else {
                return this.bubbleChildTillParent(
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
                if (e.path[i] === this.dragCtnDOM) {
                    dragCtnOnTouchPath = true;
                }
            }
        } else {
            if (
                e.target === this.dragCtnDOM ||
                this.bubbleChildTillParent(e.target, this.dragCtnDOM, [
                    this.dragCtnDOM.parentNode,
                    document.body
                ])
            ) {
                dragCtnOnTouchPath = true;
            }
        }

        if (
            !dragCtnOnTouchPath &&
            ((["left", "top"].indexOf(this.state.side) !== -1 && pos < 20) ||
                (["right", "bottom"].indexOf(this.state.side) !== -1 &&
                    pos > this.hiddenVal - 20))
        ) {
            //corner touch, show moves

            this.sidepanelDOM.style.display = "block";
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

            this.triggerCustom("showTouchStart");

            const showmoveend = () => {
                this.sceneDOM.removeEventListener(this.endEvent, showmoveend); //remove self to act like once listener
                this.sceneDOM.removeEventListener(
                    this.moveEvent,
                    this.handleShowTouchMove
                );
                this.triggerCustom("showTouchEnd");
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

            this.triggerCustom("hideTouchStart");

            const hidemoveend = () => {
                this.sceneDOM.removeEventListener(this.endEvent, hidemoveend);
                this.sceneDOM.removeEventListener(
                    this.moveEvent,
                    this.handleHideTouchMove
                );
                this.triggerCustom("hideTouchEnd");
            };

            this.sceneDOM.addEventListener(this.endEvent, hidemoveend, false);
        }

        if (e.target === this.bgLayerDOM) {
            //tap to hide
            if (
                (["left", "top"].indexOf(this.state.side) !== -1 &&
                    this.currentVal === 0) ||
                (["right", "bottom"].indexOf(this.state.side) !== -1 &&
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

        if (["left", "top"].indexOf(this.state.side) !== -1) {
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

            this.bgLayerDOM.style.opacity = progress * 0.7;

            this.dragCtnDOM.style.webkitTransform = this.transformScheme.replace(
                "%v",
                this.currentVal
            );
            this.dragCtnDOM.style.transform = this.transformScheme.replace(
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
            ((["left", "top"].indexOf(this.state.side) !== -1 &&
                this.getPosition(e, moveAxis) < this.size) ||
                (["right", "bottom"].indexOf(this.state.side) !== -1 &&
                    this.getPosition(e, moveAxis) > this.hiddenVal - this.size))
        ) {
            change =
                this.getPosition(e, this.axis) -
                this.lastTouch["client" + this.axis];
            newVal = this.currentVal + change;

            if (this.state.side === "left" || this.state.side === "top") {
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

                this.bgLayerDOM.style.opacity = progress * 0.7;

                this.dragCtnDOM.style.webkitTransform = this.transformScheme.replace(
                    "%v",
                    this.currentVal
                );
                this.dragCtnDOM.style.transform = this.transformScheme.replace(
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
                if (["left", "top"].indexOf(this.state.side) !== -1) {
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
                this.sidepanelDOM.style.display = "none";
            }

            if (val !== null) {
                this.translateTo(val);
            } else {
                if (this.state.isShown !== this.isShown()) {
                    this.setState({ isShown: !this.state.isShown }, () =>
                        this.props.visibilityCallback(this.state.isShown)
                    );
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
        return this.sidepanelDOM.offsetParent !== null;
    };

    translateTo = (finishVal, callback = () => {}) => {
        this.animating = true;

        this.bgLayerDOM.style.webkitTransition = "opacity .2s ease-in";
        this.bgLayerDOM.style.transition = "opacity .2s ease-in";
        // eslint-disable-next-line
        this.bgLayerDOM.offsetHeight;

        if (finishVal === this.shownVal) {
            if (!this.isShown()) {
                this.sidepanelDOM.style.display = "block";
            }

            this.bgLayerDOM.style.opacity = 0.7;
        } else if (finishVal === this.hiddenVal) {
            this.bgLayerDOM.style.opacity = 0;
        }
        // eslint-disable-next-line
        this.sidepanelDOM.offsetHeight;
        this.sidepanelDOM.style.webkitTransition = "initial";
        this.sidepanelDOM.style.transition = "initial";

        this.dragCtnDOM.style.webkitTransition =
            "-webkit-transform 0.2s ease-out";
        this.dragCtnDOM.style.webkitTransition = "transform 0.2s ease-out";
        this.dragCtnDOM.style.transition = "transform 0.2s ease-out";

        // eslint-disable-next-line
        this.dragCtnDOM.offsetHeight;
        this.dragCtnDOM.style.webkitTransform = this.transformScheme.replace(
            "%v",
            finishVal
        );
        this.dragCtnDOM.style.transform = this.transformScheme.replace(
            "%v",
            finishVal
        );

        // eslint-disable-next-line
        this.dragCtnDOM.offsetHeight;

        this.dragCtnDOM.style.webkitTransition = "initial";
        this.dragCtnDOM.style.transition = "initial";

        setTimeout(() => {
            this.bgLayerDOM.style.webkitTransition = "initial";
            this.bgLayerDOM.style.transition = "initial";

            this.currentVal = finishVal;
            if (finishVal === this.hiddenVal) {
                this.sidepanelDOM.style.display = "none";
            }

            this.animating = false;

            if (this.state.isShown !== this.isShown()) {
                this.setState({ isShown: !this.state.isShown }, () =>
                    this.props.visibilityCallback(this.state.isShown)
                );
            }
        }, 205);
    };

    updateSideProps(side) {
        if (side === "left" || side === "right") {
            this.size = this.state.sceneWidth * this.state.sizeFactor;
            this.sceneSize = this.state.sceneWidth;
            this.hiddenVal =
                side === "left" ? -1 * this.size : this.state.sceneWidth;
            this.transformScheme = "translate3d(%vpx,0,0)";
            this.axis = "X";
        } else {
            //top,bottom
            this.size = this.state.sceneHeight * this.state.sizeFactor;
            this.sceneSize = this.state.sceneHeight;
            this.hiddenVal =
                side === "top" ? -1 * this.size : this.state.sceneHeight;
            this.transformScheme = "translate3d(0,%vpx,0)";
            this.axis = "Y";
        }

        if (side === "top" || side === "left") {
            this.shownVal = 0;
        } else {
            this.shownVal = this.sceneSize - this.size;
        }

        if (this.state.isShown) {
            this.currentVal = this.shownVal;
        } else {
            this.currentVal = this.hiddenVal;
        }
    }

    render() {
        const className = "airr-sidepanel " + this.state.side;
        const dragCtnStyle = {};
        let sidepanelStyle;
        let bgLayerStyle;

        if (this.state.side === "left" || this.state.side === "right") {
            dragCtnStyle.width = this.size + "px";
            dragCtnStyle.height = "100%";
        } else {
            //top,bottom
            dragCtnStyle.height = this.size + "px";
            dragCtnStyle.width = "100%";
        }

        if (this.state.isShown) {
            dragCtnStyle.WebkitTransform = this.transformScheme.replace(
                "%v",
                this.shownVal
            );
            dragCtnStyle.transform = this.transformScheme.replace(
                "%v",
                this.shownVal
            );
            sidepanelStyle = { display: "block" };
            bgLayerStyle = { opacity: 0.7 };
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

        return (
            <div
                className={className}
                ref={dom => (this.sidepanelDOM = dom)}
                style={sidepanelStyle}
            >
                <div
                    ref={dom => (this.bgLayerDOM = dom)}
                    style={bgLayerStyle}
                />
                <div ref={dom => (this.dragCtnDOM = dom)} style={dragCtnStyle}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
AirrSidepanel.propTypes = {
    side: PropTypes.oneOf(["left", "right", "top", "bottom"]),
    isShown: PropTypes.bool,
    enabled: PropTypes.bool,
    sizeFactor: PropTypes.number,
    sceneWidth: PropTypes.number.isRequired,
    sceneHeight: PropTypes.number.isRequired,
    animateShown: PropTypes.bool,
    visibilityCallback: PropTypes.func
};
AirrSidepanel.defaultProps = {
    side: "left", //side to which sidepanel will be attached
    isShown: false, //bool determining if sidepanel is shown or not
    enabled: false, //bool determining if sidepanel is enabled, another words, if its can be drag out
    sizeFactor: 2 / 3, //number between 0 and 1 determining how much size of whole screen sidepanel will take
    sceneWidth: null, //number parent side width dimension
    sceneHeight: null, //number parent side height dimension
    animateShown: false, //do you want to animate sidepanel showing in/out
    visibilityCallback: function(isShown) {} //callback called when sidepanel changes its visibility with isShown argument
};
