import * as React from "react";
import { PureComponent, ReactNode } from "react";
import ViewRenderer, { CoreViewProps } from "./ViewRenderer";

export default class View extends PureComponent<CoreViewProps> {
    static defaultProps: CoreViewProps = {
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
    getViewProps = () => ({
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
    content(): ReactNode {
        return undefined;
    }

    /**
     * Wrapper method to render content. Generate special props upon View component.
     * Use ::content() in descenadant class instead of overwritting this one.
     * @returns {ReactNode}
     */
    render(): ReactNode {
        let content: ReactNode = this.content();
        if (content === undefined) {
            content =
                typeof this.props.children === "function"
                    ? this.props.children()
                    : this.props.children;
        }

        return <ViewRenderer {...this.getViewProps()}>{content}</ViewRenderer>;
    }

    viewAfterActivation(): void {}
    viewAfterDeactivation(): void {}
    viewBeforeActivation(): void {}
    viewBeforeDeactivation(): void {}
}
