import { ViewProps } from "./ViewRenderer";
/**
 * Special method for delivering props to View component's.
 * Used in render method.
 */
export function getViewProps(): ViewProps {
    return {
        refDOM: this.refDOM,
        name: this.props.name,
        active: this.props.active,
        title: this.props.title,
        className: this.props.className,
        style: this.props.style
    };
}
