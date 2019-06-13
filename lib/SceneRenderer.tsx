import * as React from "react";
import {
    BlankMaskRenderer,
    ChildrenRenderer,
    MayersRenderer,
    NavbarRenderer,
    SidepanelRenderer,
    ViewsRenderer
} from "./SceneRenderer/Items";
import { PureComponent, SyntheticEvent, ReactNode, RefObject } from "react";
import { Props as MayerProps } from "./Mayer";
import Sidepanel from "./Sidepanel";
import { AnimationType, NavbarMenu, SidepanelConfig } from "./Airr";
import { ViewsConfigItem } from "./Scene";

export type NavbarProp = 1 | true | -1 | 0 | false;
export type ViewsArray = ViewsConfigItem<any>[];

export interface CoreSceneProps {
    /**
     * The name of the scene. Must be unique among others views in parent scene. Will be used as identification string
     */
    name: string;
    /**
     * Name of the active view
     */
    activeViewName?: string;
    /**
     * Boolean telling if GUI should be disabled meaning no user actions, events are allowed.
     * GUI is disabled via absolute positioned, not visible div that has the biggest z-Index
     */
    GUIDisabled?: boolean;
    /**
     * React element to be placed in GUI disabling div
     */
    GUIDisableCover?: ReactNode;
    /**
     * Type of animation to perform when switching views
     */
    animation?: AnimationType;
    /**
     * Time of views changing animation in miliseconds
     */
    animationTime?: number;
    /**
     * Specify if navbar is present (1,true) or not (0,false). Or maybe hidden (-1)
     */
    navbar?: NavbarProp;
    /**
     * Height of the navbar in pixels
     */
    navbarHeight?: number;
    /**
     * Navbar menu is placed on the right most side. Might contain "toggleSidepanel" button or any custom buttons list.
     */
    navbarMenu?: NavbarMenu;
    /**
     * Extra, space separated, navbar's class list
     */
    navbarClass?: string;
    /**
     * Boolean specifing if navbar renders BackButton. Placed by default on the left side of navbar.
     */
    backButton?: boolean;
    /**
     * Do you need to still show backButton even if scene is rendering first view from stack?
     */
    backButtonOnFirstView?: boolean;
    /**
     * Function that will handle back button click events
     */
    handleBackButton?: (e: SyntheticEvent<HTMLElement>) => void;
    /**
     * Function that will handle back button clicks events on when first view in stack is active
     */
    handleBackBehaviourOnFirstView?: () => void;
    /**
     * Is this view active in parent scene. Readonly.
     */
    active?: boolean;
    /**
     * Sidepanels declaration. Must contain two properties: `type` and `props`
     **/
    sidepanel?: SidepanelConfig;
    /**
     * This function will be called when sidepanel changes it's visibility.
     * It's argument will be isShown bool.
     */
    sidepanelVisibilityCallback?(isShown: boolean): void;
    /**
     * Array of `views`. Every view object declaration must contain two properties: `type` and `props`.
     */
    views?: ViewsArray;
    /**
     * Array of `mayers` objects that will be render into this Scene. Must contain special Mayer class properties.
     * To check the possible values of properties go to Mayer declaration.
     */
    mayers?: MayerProps[];
    /**
     * Title that will be use in parent Scene navbar title section
     */
    title?: ReactNode;
    /**
     * Extra, space separated classes names to use upon first div element.
     */
    className?: string;
    /**
     * Children prop
     */
    children?: ReactNode;
    /**
     * Inner, private prop for manipulating navbar title. Do not set manually.
     */
    mockTitleName?: string;

    //inner props
    key?: string;
    ref?: React.LegacyRef<PureComponent>;
}
export interface Props extends CoreSceneProps {
    /**
     * React component's ref object
     */
    refCOMPSidepanel: RefObject<Sidepanel>;
    /**
     * React ref to dom object
     */
    refDOM: RefObject<HTMLDivElement>;
    /**
     * React ref to dom object
     */
    refDOMNavbar: RefObject<HTMLDivElement>;
    /**
     * Object of React refs components specified under string keys
     */
    refsCOMPViews: { [name: string]: RefObject<PureComponent> };
    /**
     * React component's ref object
     */
    refDOMContainer: RefObject<HTMLDivElement>;
    /**
     * Inner, private prop with containers height information
     */
    containersHeight: number;
}

export const sceneDefaultProps: CoreSceneProps = {
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
    className: "",
    sidepanelVisibilityCallback: null,
    children: null,
    mockTitleName: null
};
export default class SceneRenderer extends PureComponent<Props> {
    static defaultProps: Props = {
        ...sceneDefaultProps,
        refCOMPSidepanel: null,
        refDOM: null,
        refDOMNavbar: null,
        refsCOMPViews: null,
        refDOMContainer: null,
        mockTitleName: "",
        containersHeight: null
    };
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
    getViewIndex(viewName: string): number {
        return this.props.views.findIndex((config): boolean => config.props.name === viewName);
    }

    /**
     * Handles navbar backbutton tap events
     *
     * @param {object} e Event object
     * @returns {void}
     */
    handleBackButton = (e: SyntheticEvent<HTMLElement>): void => {
        const backBtn = e.currentTarget;
        backBtn.classList.add("clicked");

        setTimeout((): void => {
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
            console.warn("[] Back button handler was not specified.");
        }
    };

    /**
     * Handles navbar menu button tap events
     *
     * @param {object} e Event object
     * @returns {void}
     */
    handleMenuButtonToggleSidepanel = (e: SyntheticEvent<HTMLElement>): void => {
        if (this.props.refCOMPSidepanel && this.props.refCOMPSidepanel.current) {
            this.props.refCOMPSidepanel.current.isShown()
                ? this.props.refCOMPSidepanel.current.hide()
                : this.props.refCOMPSidepanel.current.show();
        }
    };

    checkValidActiveView = (): boolean => {
        const isAnyViewActive = this.props.views.some(
            (view): boolean => view.props.name === this.props.activeViewName
        );

        if (!isAnyViewActive) {
            console.warn(
                "[] No view was set as active" +
                    (this.props.name && " in Scene named `" + this.props.name + "`") +
                    "."
            );
        }

        return Boolean(isAnyViewActive);
    };

    render(): ReactNode {
        let className = "airr-view airr-scene";
        this.props.active && (className += " active");
        this.props.className && (className += " " + this.props.className);

        this.checkValidActiveView();

        const activeViewIndex = this.getViewIndex(this.props.activeViewName);
        let mockViewTitle;
        if (this.props.mockTitleName) {
            const mockViewIndex = this.getViewIndex(this.props.mockTitleName);
            if (mockViewIndex >= 0) {
                const mockView = this.props.views[mockViewIndex];
                if (mockView.props.title) {
                    mockViewTitle = mockView.props.title;
                }
            }
        }
        return (
            <div className={className} ref={this.props.refDOM}>
                <div className="airr-content-wrap">
                    <NavbarRenderer
                        navbar={this.props.navbar}
                        activeViewIndex={activeViewIndex}
                        backButtonOnFirstView={this.props.backButtonOnFirstView}
                        backButton={this.props.backButton}
                        handleBackButton={this.handleBackButton}
                        navbarMenu={this.props.navbarMenu}
                        hasSidepanel={Boolean(this.props.sidepanel)}
                        handleMenuButtonToggleSidepanel={this.handleMenuButtonToggleSidepanel}
                        navbarClass={this.props.navbarClass}
                        mockViewTitle={mockViewTitle}
                        activeViewTitle={
                            this.props.views[activeViewIndex] &&
                            this.props.views[activeViewIndex].props.title
                        }
                        refDOMNavbar={this.props.refDOMNavbar}
                        navbarHeight={this.props.navbarHeight}
                    />
                    <ViewsRenderer
                        className={this.props.animation ? this.props.animation + "-animation" : ""}
                        refsCOMPViews={this.props.refsCOMPViews}
                        activeViewName={this.props.activeViewName}
                        views={this.props.views}
                        refDOMContainer={this.props.refDOMContainer}
                        containersHeight={this.props.containersHeight}
                    />
                </div>
                <ChildrenRenderer {...this.props}>{this.props.children}</ChildrenRenderer>
                {this.props.sidepanel && (
                    <SidepanelRenderer
                        type={this.props.sidepanel.type}
                        refCOMPSidepanel={this.props.refCOMPSidepanel}
                        visibilityCallback={this.props.sidepanelVisibilityCallback}
                        sceneHasMayers={Boolean(this.props.mayers.length)}
                        props={this.props.sidepanel.props}
                    />
                )}
                <MayersRenderer mayers={this.props.mayers} />
                <BlankMaskRenderer
                    GUIDisabled={this.props.GUIDisabled}
                    GUIDisableCover={this.props.GUIDisableCover}
                />
            </div>
        );
    }
}
