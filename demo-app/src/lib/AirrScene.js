import React, { Component } from "react";
import PropTypes from "prop-types";
import AirrMayer from "./AirrMayer";

export default class AirrScene extends Component {
    static defaultProps = {
        name: "", //the name of the scene. Must be unique among others views in parent scene. Will be used as identification string

        activeViewName: null, //string
        GUIDisabled: false, //bool
        GUIDisableCover: null, //react element
        animation: "slide", //slide,overlay,fade or false if no animation
        animationTime: 300, //number time in miliseconds of views change animation, used also in navbar animations
        navbar: false, // possible values: boolean or one of integers -1 (hidden), 0 (no navbar), 1 (visible)
        navbarHeight: 48, //navbar height in px
        navbarMenu: null, //string `toggleSidepanel` or array of React elements
        navbarClass: "", //string
        backButton: false, //bool
        backButtonOnFirstView: false, //bool To show backButton in navbar if currently showing first view in stack.
        handleBackButton: null, //parent function to handle back button tap
        handleBackBehaviourOnFirstView: null, //null or function e.g. if this scene is view in some parent scene, and you want to pop out of it - this function will come from parent scene and will handle this behaviour
        viewsAnimationEndCallback: null, //called after views animation ends
        stackMode: true, //bool - if false Scene views will be assumed as tabs rather then stack order views. (view change vs. view pop/push)
        active: false, //bool is currently active in parent scene
        sidepanel: null, //{type: AirrSidepanel, props: {}}
        views: [], //array,
        mayers: [], //mayers conf list
        title: "" //titlebar name
    };

    static propTypes = {
        name: PropTypes.string.isRequired,

        activeViewName: PropTypes.string,
        GUIDisabled: PropTypes.bool,
        GUIDisableCover: PropTypes.object,
        animation: PropTypes.oneOf(["slide", "overlay", "fade", false]),
        animationTime: PropTypes.number,
        navbar: PropTypes.oneOf([-1, 0, false, 1, true]),
        navbarHeight: PropTypes.number,
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
        navbarClass: PropTypes.string,
        backButton: PropTypes.bool,
        backButtonOnFirstView: PropTypes.bool,
        handleBackButton: PropTypes.func,
        handleBackBehaviourOnFirstView: PropTypes.func,
        viewsAnimationEndCallback: PropTypes.func,
        stackMode: PropTypes.bool,
        active: PropTypes.bool,
        /**
         * Sidepanels object must contain two properties.
         * 1. Type - being refference to class of which item will be instantiated
         * 2. Props - special properties of AirrSidepanel class. Go to class declaration for further properties documenation
         *
         * Example:
         * {
         *    type: AirrSidepanel,
         *    props: {
         *        children: <div>sidepanel html content</div>,
         *        sceneWidth: window.innerWidth,
         *        sceneHeight: window.innerHeight,
         *        side: 'left',
         *        sizeFactor: 0.66
         *    }
         * }
         **/
        sidepanel: PropTypes.object,

        /**
         * Objects of `views` array MUST contains two properties.
         * 1. Type - being reffrence to class of which item will be instantiated.
         * 2. Props - object that acts like components properties.
         *    For special AirrView class properties go to its declaration to check out.
         *
         * Example:
         * this.props.views = [
         *      {
         *          type: AirrView,
         *          props: {
         *              name: 'Foobar',
         *              title: 'Foo is in the house',
         *              children: <div>This is Dave. Dave is div.</div>
         *              extraParam: bazHandler
         *          }
         *      }
         * ]
         */
        views: PropTypes.arrayOf(PropTypes.object),

        /**
         * Objects of `mayers` array MUST contain special Mayer class properties.
         * For checkout of possible properties go to Mayer declaration.
         *
         * Example:
         * this.props.mayers. = [
         *   {
         *       name: 'demo-mayer',
         *       content: <div>Hello cruel world!</div>,
         *       appearFrom: 'left',
         *       leaveTo: 'right',
         *       avaibleHeight: this.props.height, //read from scenes properties
         *       buttons: [
         *           {
         *               content: 'Ok',
         *               handler: (e) => {
         *                   this.setState({mayers: []});
         *               }
         *           }
         *       ]
         *   }
         * ]
         */
        mayers: PropTypes.arrayOf(PropTypes.object),
        title: PropTypes.string
    };

    mayersCompsRefs = {};

    /**
     * Returns view index in this.props.views array
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

        if (this.props.stackMode && this.props.views.length > 1) {
            if (this.props.handleBackButton) {
                this.props.handleBackButton(e);
            }
        } else if (this.props.handleBackBehaviourOnFirstView) {
            this.props.handleBackBehaviourOnFirstView();
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
                    "`."
            );
        }

        let sidepanel = null;
        if (this.props.sidepanel) {
            sidepanel = React.createElement(
                this.props.sidepanel.type,
                this.props.sidepanel.props
            );
        }

        let blankmask = null;
        if (this.props.GUIDisabled) {
            blankmask = (
                <div className="airr-blank-mask">
                    {this.props.GUIDisableCover}
                </div>
            );
        }

        let mayers = [];
        if (this.props.mayers.length) {
            mayers = this.props.mayers.map(mayerProps => {
                mayerProps.key = mayerProps.name;
                return React.createElement(AirrMayer, mayerProps);
            });
        }

        let navbar = null;
        if (this.props.navbar) {
            let mockTitle = null;
            let title = "";
            let back = null;
            const activeViewIndex = this.getViewIndex(
                this.props.activeViewName
            );

            if (this.props.backButton) {
                const backClassName =
                    "back " +
                    (activeViewIndex < 1 && !this.props.backButtonOnFirstView
                        ? "hidden"
                        : "");
                back = (
                    <div
                        className={backClassName}
                        onClick={this.handleBackButton}
                    >
                        <div />
                    </div>
                );
            }

            let menu;
            if (this.props.navbarMenu) {
                if (this.props.navbarMenu === "toggleSidepanel") {
                    menu = this.props.sidepanel ? (
                        <div
                            className="menu"
                            onClick={this.handleMenuButtonToggleSidepanel}
                        >
                            <div />
                        </div>
                    ) : null;
                } else if (Array.isArray(this.props.navbarMenu)) {
                    menu = <div className="menu">{this.props.navbarMenu}</div>;
                }
            }

            const navbarStyle = {};
            if ([1, true].indexOf(this.props.navbar) === -1) {
                navbarStyle.visibility = "hidden";
            }

            if (this.props.mockTitle) {
                const mockTitleContent =
                    this.props.views[activeViewIndex] &&
                    this.props.views[activeViewIndex].props.title;
                const mockTitleViewIndex = this.getViewIndex(
                    this.props.mockTitle
                );
                mockTitle = this.props.mockTitle ? (
                    <div className="mock-title">
                        <span>{mockTitleContent}</span>
                    </div>
                ) : null;
                title = this.props.views[mockTitleViewIndex]
                    ? this.props.views[mockTitleViewIndex].props.title
                    : "";
            } else {
                title = this.props.views[activeViewIndex]
                    ? this.props.views[activeViewIndex].props.title
                    : "";
            }

            navbar = (
                <div
                    className="airr-navbar"
                    ref={this.props.refDOMNavbar}
                    style={navbarStyle}
                >
                    <div
                        className={this.props.navbarClass}
                        style={{ height: this.props.navbarHeight + "px" }}
                    >
                        {mockTitle}
                        {back}
                        <div
                            className="title"
                            style={{ opacity: this.props.mockTitle ? 0 : 1 }}
                        >
                            <span>{title}</span>
                        </div>
                        {menu}
                    </div>
                </div>
            );
        }

        const children =
            typeof this.props.children === "function"
                ? this.props.children()
                : this.props.children;

        return (
            <div className={className} ref={this.props.refDOM}>
                {navbar}
                <div
                    className={containerClassList.join(" ")}
                    ref={this.props.refDOMContainer}
                >
                    {views}
                </div>
                {children}
                {sidepanel}
                {mayers}
                {blankmask}
            </div>
        );
    }
}
