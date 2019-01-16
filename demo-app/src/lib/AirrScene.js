import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import AirrMayer from "./AirrMayer";

const ChildrenRenderer = React.memo(function ChildrenRenderer({ children }) {
    return typeof children === "function" ? children() : children;
});
const MayersRenderer = React.memo(function MayersRenderer({ mayers }) {
    return mayers.map(({ name, ...props }) => {
        return <AirrMayer key={name} {...props} />;
    });
});
const SidepanelRenderer = React.memo(function SidepanelRenderer({
    type,
    ...props
}) {
    return React.createElement(type, props);
});
const BlankmaskRenderer = React.memo(function BlankmaskRenderer({
    GUIDisabled,
    GUIDisableCover
}) {
    return (
        GUIDisabled && <div className="airr-blank-mask">{GUIDisableCover}</div>
    );
});
const NavbarRenderer = React.memo(function NavbarRenderer({
    navbar,
    activeViewIndex,
    backButtonOnFirstView,
    handleBackButton,
    backButton,
    navbarMenu,
    hasSidepanel,
    handleMenuButtonToggleSidepanel,
    mockViewTitle,
    activeViewTitle,
    navbarClass,
    refDOMNavbar,
    navbarHeight
}) {
    if (navbar) {
        let mockTitle = null;
        let title = "";
        let back = null;

        if (backButton) {
            const backClassName =
                "back " +
                (activeViewIndex < 1 && !backButtonOnFirstView ? "hidden" : "");
            back = (
                <div className={backClassName} onClick={handleBackButton}>
                    <div />
                </div>
            );
        }

        let menu;
        if (navbarMenu) {
            if (navbarMenu === "toggleSidepanel") {
                menu = hasSidepanel ? (
                    <div
                        className="menu"
                        onClick={handleMenuButtonToggleSidepanel}
                    >
                        <div />
                    </div>
                ) : null;
            } else if (Array.isArray(navbarMenu)) {
                menu = <div className="menu">{navbarMenu}</div>;
            }
        }

        const navbarStyle = {};
        if ([1, true].indexOf(navbar) === -1) {
            navbarStyle.visibility = "hidden";
        }

        if (mockViewTitle) {
            mockTitle = (
                <div className="mock-title">
                    <span>{activeViewTitle}</span>
                </div>
            );
            title = mockViewTitle;
        } else {
            title = activeViewTitle;
        }

        return (
            <div
                className={
                    "airr-navbar " +
                    (typeof navbarClass === "string" ? navbarClass : "")
                }
                ref={refDOMNavbar}
                style={navbarStyle}
            >
                <div style={{ height: navbarHeight + "px" }}>
                    {mockTitle}
                    {back}
                    <div
                        className="title"
                        style={{ opacity: mockViewTitle ? 0 : 1 }}
                    >
                        <span>{title}</span>
                    </div>
                    {menu}
                </div>
            </div>
        );
    }
});
export default class AirrScene extends PureComponent {
    /**
     * Mayers Components refferencies
     */
    mayersCompsRefs = {};

    /**
     * Returns view index from this.props.views array
     *
     * @param {string} viewName
     * @returns {Number}
     */
    getViewIndex(viewName) {
        let index = -1;

        this.props.views.forEach((config, i) => {
            if (config.props.name === viewName) {
                index = i;
            }
        });

        return index;
    }

    /**
     * Handles navbar backbutton tap events
     *
     * @param {object} e Event object
     * @returns {void}
     */
    handleBackButton = e => {
        const backBtn = e.currentTarget;
        backBtn.classList.add("clicked");

        setTimeout(() => {
            backBtn.classList.remove("clicked");
        }, 300);

        if (
            this.getViewIndex(this.props.activeViewName) === 0 &&
            this.props.handleBackBehaviourOnFirstView
        ) {
            return this.props.handleBackBehaviourOnFirstView();
        }

        if (this.props.handleBackButton) {
            this.props.handleBackButton(e);
        } else {
            console.warn("[Airr] Back button handler was not specified.");
        }
    };

    /**
     * Handles navbar menu button tap events
     *
     * @param {object} e Event object
     * @returns {void}
     */
    handleMenuButtonToggleSidepanel = e => {
        if (
            this.props.refCOMPSidepanel &&
            this.props.refCOMPSidepanel.current
        ) {
            this.props.refCOMPSidepanel.current.isShown()
                ? this.props.refCOMPSidepanel.current.hide()
                : this.props.refCOMPSidepanel.current.show();
        }
    };

    render() {
        const containerClassList = ["airr-container"];
        if (this.props.animation) {
            containerClassList.push(this.props.animation + "-animation");
        }

        let className = "airr-view airr-scene";
        this.props.active && (className += " active");
        this.props.className && (className += " " + this.props.className);

        let views = [];
        let isAnyViewActive = false;
        this.props.views.forEach(item => {
            let viewProps = Object.assign({}, item.props);

            if (viewProps.name === this.props.activeViewName) {
                viewProps.active = true;
                isAnyViewActive = true;
            }

            views.push(React.createElement(item.type, viewProps));
        });

        if (!isAnyViewActive) {
            console.warn(
                "[Airr] No view was set as active" +
                    (this.props.name && " in Scene named `" + this.props.name) +
                    "."
            );
        }
        const activeViewIndex = this.getViewIndex(this.props.activeViewName);

        return (
            <div className={className} ref={this.props.refDOM}>
                <div className="content-wrap">
                    <NavbarRenderer
                        navbar={this.props.navbar}
                        activeViewIndex={activeViewIndex}
                        backButtonOnFirstView={this.props.backButtonOnFirstView}
                        backButton={this.props.backButton}
                        handleBackButton={this.handleBackButton}
                        navbarMenu={this.props.navbarMenu}
                        hasSidepanel={this.props.hasSidepanel}
                        handleMenuButtonToggleSidepanel={
                            this.handleMenuButtonToggleSidepanel
                        }
                        navbarClass={this.props.navbarClass}
                        mockViewTitle={
                            this.props.mockTitle &&
                            this.props.views[
                                this.getViewIndex(this.props.mockTitle)
                            ] &&
                            this.props.views[
                                this.getViewIndex(this.props.mockTitle)
                            ].props.title
                        }
                        activeViewTitle={
                            this.props.views[activeViewIndex] &&
                            this.props.views[activeViewIndex].props.title
                        }
                        refDOMNavbar={this.props.refDOMNavbar}
                        navbarHeight={this.props.navbarHeight}
                    />
                    <div
                        className={containerClassList.join(" ")}
                        ref={this.props.refDOMContainer}
                        style={
                            this.props.containersHeight
                                ? { height: this.props.containersHeight }
                                : null
                        }
                    >
                        {views}
                    </div>
                </div>
                <ChildrenRenderer>{this.props.children}</ChildrenRenderer>
                {this.props.sidepanel && (
                    <SidepanelRenderer
                        type={this.props.sidepanel.type}
                        {...this.props.sidepanel.props}
                    />
                )}
                <MayersRenderer mayers={this.props.mayers} />
                <BlankmaskRenderer
                    GUIDisabled={this.props.GUIDisabled}
                    GUIDisableCover={this.props.GUIDisableCover}
                />
            </div>
        );
    }
}

AirrScene.defaultProps = {
    name: "",

    activeViewName: null,
    GUIDisabled: false,
    GUIDisableCover: null,
    animation: "slide",
    animationTime: 300,
    navbar: false,
    navbarHeight: 48,
    navbarMenu: null,
    navbarClass: "",
    backButton: false,
    backButtonOnFirstView: false,
    handleBackButton: null,
    handleBackBehaviourOnFirstView: null,
    active: false,
    sidepanel: null,
    views: [],
    mayers: [],
    title: "",
    className: ""
};

AirrScene.propTypes = {
    /**
     * The name of the scene. Must be unique among others views in parent scene. Will be used as identification string
     */
    name: PropTypes.string.isRequired,
    /**
     * Name of the active view.
     */
    activeViewName: PropTypes.string,
    /**
     * Boolean telling if GUI should be disabled meaning no user actions, events are allowed.
     * GUI is disabled via absolute positioned, not visible div that has the biggest z-Index
     */
    GUIDisabled: PropTypes.bool,
    /**
     * React element to be placed in GUI disabling div
     */
    GUIDisableCover: PropTypes.object,
    /**
     * Type of animation to perform when switching views
     */
    animation: PropTypes.oneOf(["slide", "overlay", "fade", false]),
    /**
     * Time of views changing animatio
     */
    animationTime: PropTypes.number,
    /**
     * Specify if navbar is present (1,true) or not (0,false). Or maybe hidden (-1)
     */
    navbar: PropTypes.oneOf([-1, 0, false, 1, true]),
    /**
     * Height of the navbar in pixels
     */
    navbarHeight: PropTypes.number,
    /**
     * Navbar menu is placed on the right most side. Might contain "toggleSidepanel" button or any custom buttons list.
     */
    navbarMenu: function(props, propName, componentName) {
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
    },
    /**
     * Extra, space separated, navbar's class names list
     */
    navbarClass: PropTypes.string,
    /**
     * Boolean specifing if navbar renders BackButton. Placed by default on the left side of navbar.
     */
    backButton: PropTypes.bool,
    /**
     * Do you need to still show backButton even if scene is rendering first view from stack?
     */
    backButtonOnFirstView: PropTypes.bool,
    /**
     * Function that will handle back button click events
     */
    handleBackButton: PropTypes.func,
    /**
     * Function that will handle back button clicks events on when first view in stack is active
     */
    handleBackBehaviourOnFirstView: PropTypes.func,
    /**
     * Is this view active in parent scene
     */
    active: PropTypes.bool,
    /**
     * Sidepanels declaration. Must contain two properties: `type` and `props`
     **/
    sidepanel: PropTypes.shape({
        /**
         * Refference to class or function that will render AirrSidepanel. Might be AirrSidepanel itself.
         */
        type: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
            .isRequired,
        /**
         * Special properties of AirrSidepanel class. Go to class declaration for further properties documenation.
         */
        props: PropTypes.shape({
            /**
             * Side to which sidepanel will be attached
             */
            side: PropTypes.oneOf(["left", "right", "top", "bottom"]),
            /**
             * Bool determining if sidepanel is shown or not
             */
            isShown: PropTypes.bool,
            /**
             * Bool determining if sidepanel is enabled, another words, if its can be drag out
             */
            enabled: PropTypes.bool,
            /**
             * Number between 0 and 1 determining how much size of whole screen sidepanel will take
             */
            sizeFactor: PropTypes.number,
            /**
             * Parent scene width dimension. Set by parent scene. Do not overwrite!.
             */
            sceneWidth: PropTypes.number,
            /**
             * Parent scene height dimension. Set by parent scene. Do not overwrite!.
             */
            sceneHeight: PropTypes.number,
            /**
             * Callback called when sidepanel changes its visibility during touch events. Passed by scene itself. Do not overwrite.
             */
            visibilityCallback: PropTypes.func,
            /**
             * Animation time in miliseconds
             */
            animationTime: PropTypes.number,
            /**
             * Opacity between 0 and 1
             */
            bgLayerOpacity: PropTypes.number
        })
    }),
    /**
     * Array of `views`. Every view object declaration must contain two properties: `type` and `props`.
     */
    views: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * Refference to class or function that will render AirrView. The most common and adviced approach is to use AirrViewWrapper.
             */
            type: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
                .isRequired,
            /**
             * Special properties of AirrView class. Go to class declaration for further properties documenation.
             */
            props: PropTypes.shape({
                /**
                 * The name of the view. Must be unique among others views in scene. Will be used as identification string
                 */
                name: PropTypes.string.isRequired,
                /**
                 * Titlebar name. if parent scene navbar is enabled, this title will be showed there. Might be string or React element.
                 */
                title: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.object
                ]),
                /**
                 * Determine if this view is active. Set by parent scene.
                 */
                active: PropTypes.bool,
                /**
                 * Refference to view's root DOM element.
                 */
                refDOM: PropTypes.object,
                /**
                 * Extra classes to use. Space separetad string list.
                 */
                className: PropTypes.string,
                /**
                 * Extra styles to use upon root DOM element of view.
                 */
                style: PropTypes.object
            })
        })
    ),
    /**
     * Array of `mayers` objects that will be render into this Scene. Must contain special AirrMayer class properties.
     * To check the possible values of properties go to AirrMayer declaration.
     */
    mayers: PropTypes.arrayOf(
        PropTypes.shape({
            /**
             * The name of the mayer. Must be unique among others mayers in scene. Will be used as identification.
             */
            name: PropTypes.string.isRequired,
            /**
             * Extra styles to apply on Mayer's DOM element
             */
            style: PropTypes.object,
            /**
             * Parent scene height. Set by parent Scene. Do not overwrite!
             */
            avaibleHeight: PropTypes.number.isRequired,
            /**
             * Side from which mayer content box will enter
             */
            appearFrom: PropTypes.oneOf(["top", "bottom", "left", "right"]),
            /**
             * Side to which mayer content box will leave
             */
            leaveTo: PropTypes.oneOf(["top", "bottom", "left", "right"]),
            /**
             * Content of mayer
             */
            content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
            /**
             * Array with buttons configuration
             */
            buttons: PropTypes.arrayOf(
                PropTypes.shape({
                    /**
                     * Extra class names to use upon button
                     */
                    className: PropTypes.string,
                    /**
                     * Extra attributes to apply on HTML element
                     */
                    attrs: PropTypes.object,
                    /**
                     * Additional inline styles
                     */
                    style: PropTypes.object,
                    /**
                     * OnClick function handler
                     */
                    handler: PropTypes.func,
                    /**
                     * Content to render inside Mayer. Might be string or ReactElement.
                     */
                    content: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.object
                    ])
                })
            ),
            /**
             * Time in miliseconds of mayer's appear/disappear animation
             */
            animationTime: PropTypes.number
        })
    ),
    /**
     * Title that will be use in parent Scene navbar title section
     */
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    /**
     * Extra, space separated classes names to use upon first div element.
     */
    className: PropTypes.string
};
