import * as React from "react";
import { PureComponent, ReactNode, RefObject } from "react";
import { ChildrenProp } from "./Types";

export interface Props {
    /**
     * The name of the view. Must be unique among others views in scene. Will be used as identification string
     */
    name: string;
    /**
     * Titlebar name. if parent scene navbar is enabled, this title will be showed there. Might be string or React element.
     */
    title: ReactNode;
    /**
     * Determine if this view is active. Set by parent scene.
     */
    active: boolean;
    /**
     * Refference to view's root DOM element.
     */
    refDOM: RefObject<HTMLDivElement>;
    /**
     * Extra classes to use. Space separetad string list.
     */
    className: string;
    /**
     * Extra styles to use upon root DOM element of view.
     */
    style: React.CSSProperties;
    children: ChildrenProp;
    key?: string;
    ref?: RefObject<AirrView>;
}
export default class AirrView extends PureComponent<Props> {
    public static defaultProps = {
        name: "",
        title: "",
        active: false,
        className: "",
        style: {}
    };

    public render(): ReactNode {
        const { active, refDOM, className, style, children, title, ...rest } = this.props;
        let viewClass = "airr-view" + (className ? " " + className : "");

        active && (viewClass += " active");

        return (
            <div className={viewClass} style={style} ref={refDOM} {...rest}>
                {typeof children === "function" ? children() : children}
            </div>
        );
    }
}
