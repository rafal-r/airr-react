import * as React from "react";
import { SyntheticEvent } from "react";
import { PureComponent, ReactNode, createRef, CSSProperties } from "react";
import FX from "./FX";
import { Placement } from "./airr-react";

interface MayerButtonProps {
    /**
     * Extra class names to use upon button
     */
    className?: string;
    /**
     * Extra attributes to apply on HTML element
     */
    attrs?: CSSProperties;
    /**
     * Additional inline styles
     */
    style?: CSSProperties;
    /**
     * Option bool that will automatically add close functionality to the button
     */
    close?: boolean;
    /**
     * OnClick function handler
     */
    handler?: (e: SyntheticEvent<HTMLButtonElement>) => void;
    /**
     * Content of button
     */
    children?: ReactNode;
}
interface ButtonRendererProps {
    buttons?: MayerButtonProps[];
}
export interface Props {
    /**
     * The name of the mayer. Must be unique among others mayers in scene. Will be used as identification.
     */
    name: string;
    /**
     * Extra styles to apply on Mayer's DOM element
     */
    style?: CSSProperties;
    /**
     * Side from which mayer content box will enter
     */
    appearFrom: Placement;
    /**
     * Side to which mayer content box will leave
     */
    leaveTo: Placement;
    /**
     * Content of mayer
     */
    content?: ReactNode;
    /**
     * Array with buttons configuration
     */
    buttons?: MayerButtonProps[];
    /**
     * Time in miliseconds of mayer's appear/disappear animation
     */
    animationTime: number;
    children: ReactNode;
}
export interface PreparedProps extends Props {
    /**
     * Parent scene height. Set by parent Scene. Do not overwrite!
     */
    avaibleHeight?: number;
}
export default class Mayer extends PureComponent<PreparedProps> {
    static defaultProps: PreparedProps = {
        name: "",
        appearFrom: "bottom",
        leaveTo: "bottom",
        buttons: [],
        animationTime: 300,
        style: null,
        content: null,
        children: null
    };
    /**
     * Mayer's HTML DOM Element refferency
     */
    refDOMMayer = createRef<HTMLDivElement>();
    /**
     * Mayer's container's HTML DOM Element refferency
     */
    refDOMCtn = createRef<HTMLDivElement>();

    constructor(props: Props) {
        super(props);
        if (!props.name) {
            throw new Error("Every Mayer must has its `name` property set");
        }
    }

    componentDidMount(): void {
        const refDOMCtn = this.refDOMCtn.current;
        if (refDOMCtn && refDOMCtn.clientHeight >= this.props.avaibleHeight) {
            refDOMCtn.style.height = this.props.avaibleHeight + "px";
            refDOMCtn.classList && refDOMCtn.classList.add("full");
        }

        this.animateIn();
    }

    /**
     * Animates Mayers html dom element into the screen
     */
    animateIn(): void {
        const refDOMMayer = this.refDOMMayer.current;
        const bgDOM = refDOMMayer && refDOMMayer.querySelector(".bg");
        const startProps = { opacity: "0" };
        const endProps = { opacity: "1" };

        if (bgDOM) {
            FX.doTransitionAnimation({
                element: bgDOM as HTMLElement,
                startProps: startProps as CSSProperties,
                transitionProps: ["opacity " + this.props.animationTime + "ms ease-out"],
                endProps: endProps as CSSProperties
            });
        }

        const refDOMCtn = this.refDOMCtn.current;

        if (refDOMCtn && refDOMMayer) {
            FX.doOverlayInAnimation({
                dom: refDOMCtn,
                width: refDOMMayer.clientWidth,
                height: refDOMMayer.clientHeight,
                t: this.props.animationTime,
                appearFrom: this.props.appearFrom
            });
        }
    }

    /**
     * Animates Mayers html dom element out of the screen
     * @param {function} callback Called after animation end
     */
    animateOut(callback: () => void): void {
        const refDOMMayer = this.refDOMMayer.current;
        const bgDOM = refDOMMayer && refDOMMayer.querySelector(".bg");
        const startProps = { opacity: "1" };
        const endProps = { opacity: "0" };

        if (bgDOM) {
            FX.doTransitionAnimation({
                element: bgDOM as HTMLElement,
                startProps: startProps as CSSProperties,
                transitionProps: ["opacity " + this.props.animationTime + "ms ease-out"],
                endProps: endProps as CSSProperties
            });
        }

        const refDOMCtn = this.refDOMCtn.current;

        if (refDOMCtn && refDOMMayer) {
            FX.doOverlayOutAnimation({
                dom: refDOMCtn,
                height: refDOMMayer.clientHeight,
                width: refDOMMayer.clientWidth,
                t: this.props.animationTime,
                headTo: this.props.leaveTo,
                callback
            });
        }
    }

    render(): ReactNode {
        return (
            <div className="airr-mayer" ref={this.refDOMMayer} style={this.props.style}>
                <BgRenderer />
                <div className="ctn" ref={this.refDOMCtn}>
                    <BodyRenderer content={this.props.content}>{this.props.children}</BodyRenderer>
                    <ButtonRenderer buttons={this.props.buttons} />
                </div>
            </div>
        );
    }
}

const BgRenderer = React.memo(function BgRenderer(): any {
    return <div className="bg" />;
});
interface BodyRendererProps {
    children?: ReactNode;
    content?: ReactNode;
}
const BodyRenderer = React.memo<BodyRendererProps>(function BodyRenderer({
    children,
    content
}: BodyRendererProps): any {
    return (
        <div className="text">
            {children}
            {content}
        </div>
    );
});
const MayerButton = React.memo<MayerButtonProps>(function MayerButton({
    className,
    style,
    handler,
    children,
    ...spareAttribs
}: MayerButtonProps): any {
    return (
        <button className={className} style={style} onClick={handler} {...spareAttribs}>
            {children}
        </button>
    );
});
const ButtonRenderer = React.memo<ButtonRendererProps>(function ButtonRenderer({
    buttons
}: ButtonRendererProps): any {
    return (
        <div className="btns">
            {buttons &&
                buttons.map(
                    (config, index): ReactNode => {
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
                                handler={config.handler || null}
                                {...spareAttribs}
                            >
                                {config.children}
                            </MayerButton>
                        );
                    }
                )}
        </div>
    );
});
