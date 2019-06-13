import * as React from "react";
import { CSSProperties } from "react";
import { PureComponent, ReactNode, RefObject } from "react";

export interface ViewProps {
    /**
     * The name of the view. Must be unique among others views in scene. Will be used as identification string
     */
    name: string;
    /**
     * Titlebar name. if parent scene navbar is enabled, this title will be showed there. Might be string or React element.
     */
    title?: ReactNode;
    /**
     * Extra classes to use. Space separetad string list.
     */
    className?: string;
    /**
     * Extra styles to use upon root DOM element of view.
     */
    style?: CSSProperties;
    /**
     * Determine if this view is active. Set by parent scene. Readonly.
     */
    active?: boolean;
    /**
     * Refference to view's root DOM element. Passed by parent scene. Do not overwrite.
     */
    refDOM?: RefObject<HTMLDivElement>;
    children?: ReactNode;
    key?: string;
    ref?: React.LegacyRef<PureComponent>;
}
export default class ViewRenderer extends PureComponent<ViewProps> {
    static defaultProps = {
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
