import * as React from "react";
import { PureComponent, ReactNode } from "react";
// import ViewRenderer, { CoreViewProps, Props } from "./ViewRenderer";
import ViewRenderer, { CommonViewProps } from "./ViewRenderer";
import { getProperContent } from "./Utils";
import { getViewProps } from "./CommonViewHelpers";

export abstract class CommonViewClass {
    static defaultProps: CommonViewProps;
    refDOM: React.Ref<HTMLDivElement>;
    getViewProps: () => CommonViewProps;
    render: () => ReactNode;
    viewAfterActivation: () => void;
    viewAfterDeactivation: () => void;
    viewBeforeActivation: () => void;
    viewBeforeDeactivation: () => void;
}
export default class View extends PureComponent<CommonViewProps> implements CommonViewClass {
    static defaultProps: CommonViewProps = {
        name: "",
        title: "",
        active: false,
        className: "",
        style: null
    };

    /**
     * Refferency to view's DOM element.
     */
    refDOM = React.createRef<HTMLDivElement>();

    /**
     * Special method for delivering props to View component's.
     * Used in render method.
     */
    getViewProps = getViewProps.bind(this);

    /**
     * Primary render method.
     * Should be overwritten in descendant class.
     * @returns {ReactNode}
     */
    content(): ReactNode {
        return undefined;
    }

    /**
     * Wrapper method to render content. Generate special props upon View component.
     * Use ::content() in descenadant class instead of overwritting this one.
     * @returns {ReactNode}
     */
    render(): ReactNode {
        const content: ReactNode = getProperContent(this.content(), this.props.children);

        return <ViewRenderer {...this.getViewProps()}>{content}</ViewRenderer>;
    }

    /**
     * Common view life-cycle method to be overwriten in classes that extends this class
     */
    viewAfterActivation(): void {}
    viewAfterDeactivation(): void {}
    viewBeforeActivation(): void {}
    viewBeforeDeactivation(): void {}
}
