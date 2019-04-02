import * as React from "react";
import { CSSStringProperties } from "./Types";
import { PureComponent, ReactNode, RefObject } from "react";

export interface CoreViewProps {
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
     * Extra classes to use. Space separetad string list.
     */
    className: string;
    /**
     * Extra styles to use upon root DOM element of view.
     */
    style?: CSSStringProperties;
}
export interface Props extends CoreViewProps {
    /**
     * Refference to view's root DOM element.
     */
    refDOM?: RefObject<HTMLDivElement>;
    children?: ReactNode;
    [propname: string]: any;
}
export default class AirrView extends PureComponent<Props> {
    static defaultProps: Props = {
        name: "",
        title: "",
        active: false,
        className: "",
        style: null
    };

    render(): ReactNode {
        const { active, refDOM, className, style, children } = this.props;
        let viewClass = "airr-view" + (className ? " " + className : "");

        active && (viewClass += " active");

        return (
            <div className={viewClass} style={style} ref={refDOM}>
                {typeof children === "function" ? children() : children}
            </div>
        );
    }
}
