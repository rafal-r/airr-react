import * as React from "react";
import { PureComponent, SyntheticEvent, ReactNode } from "react";
import { CoreSceneProps, Props } from "./SceneRenderer.d";
import {
    BlankMaskRenderer,
    ChildrenRenderer,
    MayersRenderer,
    NavbarRenderer,
    SidepanelRenderer,
    ViewsRenderer
} from "./SceneRenderer/Items";

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
    children: null
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
