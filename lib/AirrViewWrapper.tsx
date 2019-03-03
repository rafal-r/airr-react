import * as React from "react";
import { PureComponent, ReactNode, Ref } from "react";
import { React.CSSProperties } from "./Types";
import AirrView from "./AirrView";

interface Props {
    /**
     * The name of the view. Must be unique among others views in scene. Will be used as identification string
     */
    name: string;
    /**
     * Titlebar name. if parent scene navbar is enabled, this title will be showed there. Might be string or React element
     */
    title: ReactNode;
    /**
     * Determine if this view is active. Set by parent scene.
     */
    active: boolean;
    /**
     * Refference to view's root DOM element.
     */
    refDOM?: Ref<HTMLDivElement>;
    /**
     * Extra classes to use. Space separetad string list.
     */
    className: string;
    /**
     * Extra styles to use upon root DOM element of view.
     */
    style: React.CSSProperties;
}

export default class AirrViewWrapper extends PureComponent<Props> {
    public static defaultProps = {
        name: "",
        title: "",
        active: false,
        className: "",
        style: {}
    };
    /**
     * Refferency to view's DOM element.
     */
    public refDOM = React.createRef<HTMLDivElement>();

    /**
     * Special method for delivering props to AirrView component's.
     * Used in render method.
     */
    public getViewProps = () => ({
        refDOM: this.refDOM,
        name: this.props.name,
        active: this.props.active,
        title: this.props.title,
        className: this.props.className,
        style: this.props.style
    });

    /**
     * Primary render method.
     * Should be overwritten in descendant class.
     * @returns {ReactNode}
     */
    public content(): void {
        console.warn("[Airr] This method should be overwritten in descendant class");
    }

    /**
     * Wrapper method to render content. Generate special props upon AirrView component.
     * Use ::content() in descenadant class instead of overwritting this one.
     * @returns {ReactNode}
     */
    public render(): ReactNode {
        return <AirrView {...this.getViewProps()}>{() => this.content()}</AirrView>;
    }
}
