import * as React from "react";
import { PureComponent, RefObject } from "react";
import { isMobileDevice, supportPassive } from "./eventHelpers";
import { ReactNode } from "react";
import { Placement, TouchPosition } from "./Types";

export interface Props {
    /**
     * Side to which sidepanel will be attached
     */
    side: Placement;
    /**
     * Bool determining if sidepanel is shown or not
     */
    isShown: boolean;
    /**
     * Bool determining if sidepanel is enabled, another words, if its can be drag out
     */
    enabled: boolean;
    /**
     * Number between 0 and 1 determining how much size of whole screen sidepanel will take
     */
    sizeFactor: number;
    /**
     * Parent scene width dimension. Set by parent scene. Do not overwrite!.
     */
    sceneWidth: number;
    /**
     * Parent scene height dimension. Set by parent scene. Do not overwrite!.
     */
    sceneHeight: number;
    /**
     * Callback invoked when sidepanel changes its visibility during touch events. Set by parent scene. Do not overwrite!.
     */
    visibilityCallback: (isShown: boolean) => void;
    /**
     * Animation time in miliseconds
     */
    animationTime: number;
    /**
     * Opacity between 0 and 1
     */
    bgLayerOpacity: number;
    children?: ReactNode;
    ref?: RefObject<AirrSidepanel>;
}
type Axis = "X" | "Y";
export default class AirrSidepanel extends PureComponent<Props> {
    static defaultProps: Props = {
        side: "left",
        isShown: false,
        enabled: false,
        sizeFactor: 2 / 3,
        sceneWidth: null,
        sceneHeight: null,
        visibilityCallback: (isShown: boolean) => {},
        animationTime: 200,
        bgLayerOpacity: 0.7
    };
    private size: number;
    private sceneSize: number;
    private currentVal: number;
    private hiddenVal: number;
    private shownVal: number;
    private transformScheme: string;
    private axis: Axis;
    private lastSide: Placement;
    private lastSizeFactor: number;

    refDOMDragCtn = React.createRef<HTMLDivElement>();
    refDOMBgLayer = React.createRef<HTMLDivElement>();
    refDOM = React.createRef<HTMLDivElement>();
    sceneDOM: Node;

    private lastTouch: TouchPosition;

    private startEvent = isMobileDevice ? "touchstart" : "mousedown";
    private moveEvent = isMobileDevice ? "touchmove" : "mousemove";
    private endEvent = isMobileDevice ? "touchend" : "mouseup";

    private animating = false;

    private lastSceneWidth: number;
    private lastSceneHeight: number;

    enable(): void {
        this.sceneDOM.removeEventListener(this.startEvent, this.handleTouchStart);
        this.sceneDOM.addEventListener(this.startEvent, this.handleTouchStart, supportPassive);
    }

    disable(): void {
        this.sceneDOM.removeEventListener(this.startEvent, this.handleTouchStart);
    }

    componentDidMount(): void {
        const refSceneDOM = this.refDOM.current && this.refDOM.current.parentNode;

        if (refSceneDOM) {
            this.sceneDOM = refSceneDOM;
        }

        if (this.props.enabled) {
            this.enable();
        }
    }

    private __bubbleChildTillParent(
        child: Element,
        parent: Element,
        tillElements: Element[]
    ): boolean {
        if (child.parentNode === parent) {
            return true;
        } else {
            if (!child.parentElement || tillElements.indexOf(child.parentElement) !== -1) {
                return false;
            } else {
                return this.__bubbleChildTillParent(child.parentElement, parent, tillElements);
            }
        }
    }

    private getPosition = (e: TouchEvent | MouseEvent, axis: Axis) => {
        const obj = "changedTouches" in e ? e.changedTouches[0] : e;
        return axis === "X" ? obj.clientX : obj.clientY;
    };

    private getLastPosition = (e: TouchEvent | MouseEvent) => {
        const obj = "changedTouches" in e ? e.changedTouches[0] : e;
        return { clientX: obj.clientX, clientY: obj.clientY };
    };

    private getEventX = (e: TouchEvent | MouseEvent) => {
        return "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    };

    private getEventY = (e: TouchEvent | MouseEvent) => {
        return "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
    };

    private handleTouchStart = (e: TouchEvent | MouseEvent) => {
        const pos = this.getPosition(e, this.axis);
        let dragCtnOnTouchPath = false;
        // @ts-ignore
        const path = e.path || (e.composedPath && e.composedPath());

        if (path) {
            for (let i = 0; i < path.length; i++) {
                if (path[i] === this.refDOMDragCtn.current) {
                    dragCtnOnTouchPath = true;
                }
            }
        } else {
            if (
                e.target instanceof Element &&
                (e.target === this.refDOMDragCtn.current ||
                    this.__bubbleChildTillParent(e.target, this.refDOMDragCtn.current, [
                        this.refDOMDragCtn.current.parentElement,
                        document.body
                    ]))
            ) {
                dragCtnOnTouchPath = true;
            }
        }

        if (
            !dragCtnOnTouchPath &&
            ((["left", "top"].indexOf(this.props.side) !== -1 && pos < 20) ||
                (["right", "bottom"].indexOf(this.props.side) !== -1 && pos > this.hiddenVal - 20))
        ) {
            //corner touch, show moves

            this.refDOM.current.style.display = "block";
            this.sceneDOM.addEventListener(
                this.moveEvent,
                this.handleShowTouchMove,
                supportPassive
            );
            this.sceneDOM.addEventListener(this.endEvent, this.handleTouchEnd, false);

            // this.triggerCustom("showTouchStart");

            const showmoveend = (): void => {
                this.sceneDOM.removeEventListener(this.endEvent, showmoveend); //remove self to act like once listener
                this.sceneDOM.removeEventListener(this.moveEvent, this.handleShowTouchMove);
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
            this.sceneDOM.addEventListener(this.endEvent, this.handleTouchEnd, false);

            // this.triggerCustom("hideTouchStart");

            const hidemoveend = (): void => {
                this.sceneDOM.removeEventListener(this.endEvent, hidemoveend);
                this.sceneDOM.removeEventListener(this.moveEvent, this.handleHideTouchMove);
                // this.triggerCustom("hideTouchEnd");
            };

            this.sceneDOM.addEventListener(this.endEvent, hidemoveend, false);
        }

        if (e.target === this.refDOMBgLayer.current) {
            //tap to hide
            if (
                (["left", "top"].indexOf(this.props.side) !== -1 && this.currentVal === 0) ||
                (["right", "bottom"].indexOf(this.props.side) !== -1 && this.currentVal)
            ) {
                const hidedragctn = (e: TouchEvent | MouseEvent): void => {
                    this.sceneDOM.removeEventListener(this.endEvent, hidedragctn);
                    if (Math.abs(pos - this.getPosition(e, this.axis)) <= 2.5) {
                        this.hide();
                    }
                };

                this.sceneDOM.addEventListener(this.endEvent, hidedragctn, false);
            }
        }

        this.lastTouch = this.getLastPosition(e);
    };

    private handleShowTouchMove = (e: TouchEvent | MouseEvent) => {
        const pos = this.getPosition(e, this.axis);
        let newVal,
            progress = 0;

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
            progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

            this.refDOMBgLayer.current.style.opacity = String(progress * this.props.bgLayerOpacity);

            this.refDOMDragCtn.current.style.webkitTransform = this.transformScheme.replace(
                "%v",
                String(this.currentVal)
            );
            this.refDOMDragCtn.current.style.transform = this.transformScheme.replace(
                "%v",
                String(this.currentVal)
            );
        }

        this.lastTouch = this.getLastPosition(e);

        if (!supportPassive) {
            e.preventDefault();
        }
    };

    private handleHideTouchMove = (e: TouchEvent | MouseEvent) => {
        let progress = 0,
            newVal,
            change,
            moveAxis;

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
            change = this.getPosition(e, this.axis) - this.lastTouch["client" + this.axis];
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
                progress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

                this.refDOMBgLayer.current.style.opacity = String(
                    progress * this.props.bgLayerOpacity
                );

                this.refDOMDragCtn.current.style.webkitTransform = this.transformScheme.replace(
                    "%v",
                    String(this.currentVal)
                );
                this.refDOMDragCtn.current.style.transform = this.transformScheme.replace(
                    "%v",
                    String(this.currentVal)
                );
            }
        }

        this.lastTouch = this.getLastPosition(e);
        if (!supportPassive) {
            e.preventDefault();
        }
    };

    private handleTouchEnd = (e: TouchEvent | MouseEvent) => {
        let val = null;

        if (!this.animating) {
            if (this.currentVal !== this.shownVal && this.currentVal !== this.hiddenVal) {
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

    show = (): Promise<boolean> => {
        this.enable();
        return this.translateTo(this.shownVal);
    };

    isShown = () => {
        return this.refDOM.current.offsetParent !== null;
    };

    private translateTo = (finishVal: number): Promise<boolean> => {
        return new Promise(resolve => {
            this.animating = true;

            this.refDOMBgLayer.current.style.webkitTransition = `opacity ${
                this.props.animationTime
            }ms ease-in`;
            this.refDOMBgLayer.current.style.transition = `opacity ${
                this.props.animationTime
            }ms ease-in`;
            this.refDOMBgLayer.current.offsetHeight;

            if (finishVal === this.shownVal) {
                if (!this.isShown()) {
                    this.refDOM.current.style.display = "block";
                }

                this.refDOMBgLayer.current.style.opacity = String(this.props.bgLayerOpacity);
            } else if (finishVal === this.hiddenVal) {
                this.refDOMBgLayer.current.style.opacity = "0";
            }

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

            this.refDOMDragCtn.current.offsetHeight;
            this.refDOMDragCtn.current.style.webkitTransform = this.transformScheme.replace(
                "%v",
                String(finishVal)
            );
            this.refDOMDragCtn.current.style.transform = this.transformScheme.replace(
                "%v",
                String(finishVal)
            );

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

    private updateSideProps(side: Placement, sizeFactor: number): void {
        if (side === "left" || side === "right") {
            this.size = this.props.sceneWidth * sizeFactor;
            this.sceneSize = this.props.sceneWidth;
            this.hiddenVal = side === "left" ? -1 * this.size : this.props.sceneWidth;
            this.transformScheme = "translate3d(%vpx,0,0)";
            this.axis = "X";
        } else {
            //top,bottom
            this.size = this.props.sceneHeight * sizeFactor;
            this.sceneSize = this.props.sceneHeight;
            this.hiddenVal = side === "top" ? -1 * this.size : this.props.sceneHeight;
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

    componentDidUpdate(prevProps: Props): void {
        if (prevProps.enabled !== this.props.enabled) {
            this[this.props.enabled ? "enable" : "disable"]();
        }
    }

    render(): ReactNode {
        const className =
            "airr-sidepanel " +
            this.props.side +
            " " +
            (this.props.enabled ? "enabled" : "disabled");
        const dragCtnStyle = { width: "", height: "", transform: "", WebkitTransform: "" };
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
                String(this.shownVal)
            );
            dragCtnStyle.transform = this.transformScheme.replace("%v", String(this.shownVal));
            sidepanelStyle = { display: "block" };
            bgLayerStyle = { opacity: this.props.bgLayerOpacity };
        } else {
            dragCtnStyle.WebkitTransform = this.transformScheme.replace(
                "%v",
                String(this.hiddenVal)
            );
            dragCtnStyle.transform = this.transformScheme.replace("%v", String(this.hiddenVal));
            sidepanelStyle = { display: "none" };
            bgLayerStyle = { opacity: 0 };
        }

        const children =
            typeof this.props.children === "function" ? this.props.children() : this.props.children;

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
