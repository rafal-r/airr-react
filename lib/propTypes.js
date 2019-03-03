import PropTypes from "prop-types";
export const sideStringProp = PropTypes.oneOf(["top", "bottom", "left", "right"]);
export const commonChildrenProp = PropTypes.oneOfType([PropTypes.string, PropTypes.element]);
export const renderChildrenProp = PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.element,
    PropTypes.func
]);
export const navbarMenuProp = function(props, propName, componentName) {
    if (props[propName]) {
        if (typeof props[propName] === "string") {
            if (!/toggleSidepanel/.test(props[propName])) {
                return new Error(
                    "Invalid prop `" +
                        propName +
                        "` supplied to" +
                        " `" +
                        componentName +
                        "`. Value must be `toggleSidepanel` string or array of React elements."
                );
            } else {
                return null;
            }
        }

        if (!Array.isArray(props[propName])) {
            return new Error(
                "Invalid prop `" +
                    propName +
                    "` supplied to" +
                    " `" +
                    componentName +
                    "`. Value must be `toggleSidepanel` string or array of React elements."
            );
        }
    }
};
