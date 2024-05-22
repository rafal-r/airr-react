import * as React from "react";
import { PureComponent, ReactNode, RefObject, CSSProperties } from "react";
import { isMobileDevice, supportPassive } from "./eventHelpers";
import { Placement, TouchPosition } from "./Airr";
import {
    getProperContent,
    isTopOrLeftPlacement,
    isBottomOrRightPlacement,
    isLeftOrRightPlacement
} from "./Utils";
import {
    makeNewValStickyToLimits,
    getProgressValueForTLSide,
    getProgressValueForBRSide,
    updateDOMItemsStyles,
    bubbleChildTillParent,
    getPosition,
    getLastPosition,
    getEventPos,
    updateShownVal,
    updateCurrentVal,
    updateLastVals,
    getClassName,
    getDOMNodesStyles
} from "./SidepanelHelpers";

export interface SidepanelProps {
    /**
     * Side to which sidepanel will be attached
     */
    side?: Placement;
    /**
     * Bool determining if sidepanel is shown or not. Readonly. Set by inner callback. Do not overwrite.
     */
    isShown?: boolean;
    /**
     * Bool determining if sidepanel is enabled.
     */
    enabled?: boolean;
    /**
     * Number between 0 and 1 determining how much size of whole screen sidepanel will take
     */
    sizeFactor?: number;
    /**
     * Parent scene width dimension. Set by parent scene. Do not overwrite!.
     */
    sceneWidth?: number;
    /**
     * Parent scene height dimension. Set by parent scene. Do not overwrite!.
     */
    sceneHeight?: number;
    /**
     * Callback invoked when sidepanel changes its visibility during touch events. Set by parent scene. Do not overwrite!.
     */
    visibilityCallback?: (isShown: boolean) => void;
    /**
     * Animation time in miliseconds
     */
    animationTime?: number;
    /**
     * Boolean saying if parent scene has any open mayer. Set by parent scene. Do not overwrite!.
     */
    sceneHasMayers?: boolean;
    /**
     * Opacity between 0 and 1
     */
    bgLayerOpacity?: number;
    children?: ReactNode;
    ref?: RefObject<Sidepanel>;
}
export type Axis = "X" | "Y";
export interface DOMNodesStyles {
    dragCtnStyle: CSSProperties;
    sidepanelStyle: CSSProperties;
    bgLayerStyle: CSSProperties;
}

export default class Sidepanel<
    P extends SidepanelProps = SidepanelProps,
    S = {}
> extends PureComponent<P, S> {
    static defaultProps: SidepanelProps = {
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

    currentVal: number;
    transformScheme: string;
    size: number;
    sceneSize: number;
    hiddenVal: number;
    shownVal: number;
    axis: Axis;
    lastSide: Placement;
    lastSizeFactor: number;

    refDOMDragCtn = React.createRef<HTMLDivElement>();
    refDOMBgLayer = React.createRef<HTMLDivElement>();
    refDOM = React.createRef<HTMLDivElement>();
    sceneDOM: Node;

    lastTouch: TouchPosition;

    startEvent = isMobileDevice ? "touchstart" : "mousedown";
    moveEvent = isMobileDevice ? "touchmove" : "mousemove";
    endEvent = isMobileDevice ? "touchend" : "mouseup";

    animating = false;

    lastSceneWidth: number;
    lastSceneHeight: number;

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

    private handleTouchStart = (e: TouchEvent | MouseEvent): void => {
        if (this.props.sceneHasMayers) {
            return;
        }
        const pos = getPosition(e, this.axis);
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
                    bubbleChildTillParent(e.target, this.refDOMDragCtn.current, [
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
                    if (Math.abs(pos - getPosition(e, this.axis)) <= 2.5) {
                        this.hide();
                    }
                };

                this.sceneDOM.addEventListener(this.endEvent, hidedragctn, false);
            }
        }

        this.lastTouch = getLastPosition(e);
    };

    private handleShowTouchMove = (e: TouchEvent | MouseEvent): void => {
        const pos = getPosition(e, this.axis);
        let newVal: number,
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

        updateDOMItemsStyles(newVal, progress, this);

        this.lastTouch = getLastPosition(e);

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
                Math.abs(this.lastTouch.clientX - getEventPos(e, "X")) >=
                Math.abs(this.lastTouch.clientY - getEventPos(e, "Y"))
            ) {
                moveAxis = "X";
            } else {
                moveAxis = "Y";
            }
        }

        if (
            moveAxis === this.axis &&
            ((isTopOrLeftPlacement(this.props.side) && getPosition(e, moveAxis) < this.size) ||
                (isBottomOrRightPlacement(this.props.side) &&
                    getPosition(e, moveAxis) > this.hiddenVal - this.size))
        ) {
            change = getPosition(e, this.axis) - this.lastTouch["client" + this.axis];
            newVal = this.currentVal + change;

            if (isTopOrLeftPlacement(this.props.side)) {
                newVal = makeNewValStickyToLimits(newVal, this.hiddenVal, this.shownVal);
                progress = getProgressValueForTLSide(newVal, this.size);
            } else {
                newVal = makeNewValStickyToLimits(newVal, this.shownVal, this.hiddenVal);
                progress = getProgressValueForBRSide(newVal, this.size, this.sceneSize);
            }

            updateDOMItemsStyles(newVal, progress, this);
        }

        this.lastTouch = getLastPosition(e);
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

    private translateTo = (finishVal: number): Promise<boolean> => {
        return new Promise(
            (resolve): void => {
                this.animating = true;

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
                this.refDOM.current.style.transition = "initial";

                this.refDOMDragCtn.current.style.transition = `transform ${
                    this.props.animationTime
                }ms ease-out`;

                this.refDOMDragCtn.current.offsetHeight;

                this.refDOMDragCtn.current.style.transform = this.transformScheme.replace(
                    "%v",
                    String(finishVal)
                );

                this.refDOMDragCtn.current.offsetHeight;

                setTimeout((): void => {
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

    private updateSideProps = (): void => {
        if (isLeftOrRightPlacement(this.props.side)) {
            this.size = this.props.sceneWidth * this.props.sizeFactor;
            this.sceneSize = this.props.sceneWidth;
            this.hiddenVal = this.props.side === "left" ? -1 * this.size : this.props.sceneWidth;
            this.transformScheme = "translate3d(%vpx,0,0)";
            this.axis = "X";
        } else {
            //top,bottom
            this.size = this.props.sceneHeight * this.props.sizeFactor;
            this.sceneSize = this.props.sceneHeight;
            this.hiddenVal = this.props.side === "top" ? -1 * this.size : this.props.sceneHeight;
            this.transformScheme = "translate3d(0,%vpx,0)";
            this.axis = "Y";
        }

        updateShownVal(this);
        updateCurrentVal(this);
        updateLastVals(this);
    };

    componentDidUpdate(prevProps: SidepanelProps): void {
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
            this.updateSideProps();
        }
    }

    render(): ReactNode {
        const className = getClassName(this.props.side, this.props.enabled);
        this.conditionalyUpdateSideProps();
        const { dragCtnStyle, sidepanelStyle, bgLayerStyle } = getDOMNodesStyles(this);

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
