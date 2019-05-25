import * as React from "react";
import { PureComponent, ReactNode } from "react";
import { isMobileDevice, supportPassive } from "./eventHelpers";
import { Placement, TouchPosition } from "./airr-react";
import { Props, Axis, DOMNodesStyles } from "./Sidepanel.d";
import { getProperContent, isTopOrLeftPlacement, isBottomOrRightPlacement } from "./Utils";
import {
    makeNewValStickyToLimits,
    getProgressValueForTLSide,
    getProgressValueForBRSide
} from "./SidepanelHelpers";

export default class Sidepanel extends PureComponent<Props> {
    static defaultProps: Props = {
        side: "left",
        isShown: false,
        enabled: false,
        sizeFactor: 2 / 3,
        sceneWidth: null,
        sceneHeight: null,
        visibilityCallback: (isShown: boolean): void => {},
        animationTime: 200,
        bgLayerOpacity: 0.7,
        sceneHasMayers: false
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

    componentWillUnmount(): void {
        this.disable();
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

    private getPosition = (e: TouchEvent | MouseEvent, axis: Axis): number => {
        const obj = "changedTouches" in e ? e.changedTouches[0] : e;
        return axis === "X" ? obj.clientX : obj.clientY;
    };

    private getLastPosition = (
        e: TouchEvent | MouseEvent
    ): { clientX: number; clientY: number } => {
        const obj = "changedTouches" in e ? e.changedTouches[0] : e;
        return { clientX: obj.clientX, clientY: obj.clientY };
    };

    private getEventPos = (e: TouchEvent | MouseEvent, axis: Axis): number => {
        return "changedTouches" in e ? e.changedTouches[0]["client" + axis] : e["client" + axis];
    };

    private handleTouchStart = (e: TouchEvent | MouseEvent): void => {
        if (this.props.sceneHasMayers) {
            return;
        }
        const pos = this.getPosition(e, this.axis);
        let dragCtnOnTouchPath = false;
        // @ts-ignore
        const path = e.path || (e.composedPath && e.composedPath());

        if (path) {
            dragCtnOnTouchPath = path.reduce((dragCtnOnTouchPath: boolean, item: HTMLElement) => {
                if (item === this.refDOMDragCtn.current) {
                    dragCtnOnTouchPath = true;
                }
                return dragCtnOnTouchPath;
            }, false);
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
            ((isTopOrLeftPlacement(this.props.side) && pos < 20) ||
                (isBottomOrRightPlacement(this.props.side) && pos > this.hiddenVal - 20))
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
                (isTopOrLeftPlacement(this.props.side) && this.currentVal === 0) ||
                (isBottomOrRightPlacement(this.props.side) && this.currentVal)
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

    private handleShowTouchMove = (e: TouchEvent | MouseEvent): void => {
        const pos = this.getPosition(e, this.axis);
        let newVal,
            progress = 0;

        if (isTopOrLeftPlacement(this.props.side)) {
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

        this.updateDOMItemsPosition(newVal, progress);

        this.lastTouch = this.getLastPosition(e);

        if (!supportPassive) {
            e.preventDefault();
        }
    };

    private handleHideTouchMove = (e: TouchEvent | MouseEvent): void => {
        let progress = 0,
            newVal: number,
            change: number,
            moveAxis: string;

        if (this.lastTouch) {
            if (
                Math.abs(this.lastTouch.clientX - this.getEventPos(e, "X")) >=
                Math.abs(this.lastTouch.clientY - this.getEventPos(e, "Y"))
            ) {
                moveAxis = "X";
            } else {
                moveAxis = "Y";
            }
        }

        if (
            moveAxis === this.axis &&
            ((isTopOrLeftPlacement(this.props.side) && this.getPosition(e, moveAxis) < this.size) ||
                (isBottomOrRightPlacement(this.props.side) &&
                    this.getPosition(e, moveAxis) > this.hiddenVal - this.size))
        ) {
            change = this.getPosition(e, this.axis) - this.lastTouch["client" + this.axis];
            newVal = this.currentVal + change;

            if (isTopOrLeftPlacement(this.props.side)) {
                newVal = makeNewValStickyToLimits(newVal, this.hiddenVal, this.shownVal);
                progress = getProgressValueForTLSide(newVal, this.size);
            } else {
                newVal = makeNewValStickyToLimits(newVal, this.shownVal, this.hiddenVal);
                progress = getProgressValueForBRSide(newVal, this.size, this.sceneSize);
            }

            this.updateDOMItemsPosition(newVal, progress);
        }

        this.lastTouch = this.getLastPosition(e);
        if (!supportPassive) {
            e.preventDefault();
        }
    };

    private handleTouchEnd = (e: TouchEvent | MouseEvent): void => {
        let val = null;

        if (!this.animating) {
            if (this.currentVal !== this.shownVal && this.currentVal !== this.hiddenVal) {
                if (isTopOrLeftPlacement(this.props.side)) {
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
                this.checkAndRevokeVisibilityCallback();
            }
        }

        this.sceneDOM.removeEventListener(this.endEvent, this.handleTouchEnd);
    };

    private checkAndRevokeVisibilityCallback(): void {
        if (this.props.isShown !== this.isShown()) {
            this.props.visibilityCallback(this.isShown());
        }
    }

    hide = (): Promise<boolean> => {
        return this.translateTo(this.hiddenVal);
    };

    show = (): Promise<boolean> => {
        this.enable();
        return this.translateTo(this.shownVal);
    };

    isShown = (): boolean => {
        return this.refDOM.current.offsetParent !== null;
    };

    private updateDOMItemsPosition(newVal: number, progress: number): void {
        if (newVal !== this.currentVal) {
            this.currentVal = newVal;
            const newProgress = progress > 1 ? 1 : progress < 0 ? 0 : progress;

            this.refDOMBgLayer.current.style.opacity = String(
                newProgress * this.props.bgLayerOpacity
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

    private translateTo = (finishVal: number): Promise<boolean> => {
        return new Promise(
            (resolve): void => {
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

                setTimeout((): void => {
                    this.refDOMBgLayer.current.style.webkitTransition = "initial";
                    this.refDOMBgLayer.current.style.transition = "initial";

                    this.currentVal = finishVal;

                    if (finishVal === this.hiddenVal) {
                        this.refDOM.current.style.display = "none";
                    }

                    this.animating = false;

                    this.checkAndRevokeVisibilityCallback();

                    resolve(this.isShown());
                }, this.props.animationTime + 5);
            }
        );
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

    /**
     * Primary render method.
     * Should be overwritten in descendant class.
     * @returns {ReactNode}
     */
    content(): ReactNode {
        return undefined;
    }

    private conditionalyUpdateSideProps(): void {
        if (
            this.props.side !== this.lastSide ||
            this.props.sizeFactor !== this.lastSizeFactor ||
            this.props.sceneWidth !== this.lastSceneWidth ||
            this.props.sceneHeight !== this.lastSceneHeight
        ) {
            this.updateSideProps(this.props.side, this.props.sizeFactor);
        }
    }

    private getDOMNodesStyles(): DOMNodesStyles {
        const dragCtnStyle = { width: "", height: "", transform: "", WebkitTransform: "" };
        let sidepanelStyle;
        let bgLayerStyle;
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

        return { dragCtnStyle, sidepanelStyle, bgLayerStyle };
    }

    private getClassName(): string {
        return (
            "airr-sidepanel " +
            this.props.side +
            " " +
            (this.props.enabled ? "enabled" : "disabled")
        );
    }

    render(): ReactNode {
        const className = this.getClassName();
        this.conditionalyUpdateSideProps();
        const { dragCtnStyle, sidepanelStyle, bgLayerStyle } = this.getDOMNodesStyles();

        const content: ReactNode = getProperContent(this.content(), this.props.children);

        return (
            <div className={className} ref={this.refDOM} style={sidepanelStyle}>
                <div ref={this.refDOMBgLayer} style={bgLayerStyle} />
                <div ref={this.refDOMDragCtn} style={dragCtnStyle}>
                    {content}
                </div>
            </div>
        );
    }
}
