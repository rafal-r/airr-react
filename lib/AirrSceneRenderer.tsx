import * as React from "react";
import {
    PureComponent,
    SyntheticEvent,
    ReactNode,
    ReactElement,
    RefObject,
    CSSProperties,
    ComponentClass
} from "react";
import AirrViewRenderer from "./AirrViewRenderer";
import AirrMayer, { Props as MayerProps } from "./AirrMayer";
import AirrSidepanel, { Props as SidepanelProps } from "./AirrSidepanel";
import { AnimationType, ViewConfig, NavbarMenu, SidepanelConfig } from "./airr-react";

export interface CoreSceneProps {
    /**
     * The name of the scene. Must be unique among others views in parent scene. Will be used as identification string
     */
    name: string;
    /**
     * Name of the active view
     */
    activeViewName: string;
    /**
     * Boolean telling if GUI should be disabled meaning no user actions, events are allowed.
     * GUI is disabled via absolute positioned, not visible div that has the biggest z-Index
     */
    GUIDisabled: boolean;
    /**
     * React element to be placed in GUI disabling div
     */
    GUIDisableCover?: ReactNode;
    /**
     * Type of animation to perform when switching views
     */
    animation: AnimationType;
    /**
     * Time of views changing animation in miliseconds
     */
    animationTime: number;
    /**
     * Specify if navbar is present (1,true) or not (0,false). Or maybe hidden (-1)
     */
    navbar: 1 | true | -1 | 0 | false;
    /**
     * Height of the navbar in pixels
     */
    navbarHeight: number;
    /**
     * Navbar menu is placed on the right most side. Might contain "toggleSidepanel" button or any custom buttons list.
     */
    navbarMenu?: NavbarMenu;
    /**
     * Extra, space separated, navbar's class list
     */
    navbarClass: string;
    /**
     * Boolean specifing if navbar renders BackButton. Placed by default on the left side of navbar.
     */
    backButton: boolean;
    /**
     * Do you need to still show backButton even if scene is rendering first view from stack?
     */
    backButtonOnFirstView: boolean;
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
    active: boolean;
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
    views: ViewConfig[];
    /**
     * Array of `mayers` objects that will be render into this Scene. Must contain special AirrMayer class properties.
     * To check the possible values of properties go to AirrMayer declaration.
     */
    mayers: MayerProps[];
    /**
     * Title that will be use in parent Scene navbar title section
     */
    title: ReactNode;
    /**
     * Extra, space separated classes names to use upon first div element.
     */
    className: string;
    /**
     * Children prop
     */
    children: ReactNode;
}
export interface Props extends CoreSceneProps {
    /**
     * React component's ref object
     */
    refCOMPSidepanel: RefObject<AirrSidepanel>;
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
     * Inner, private prop for manipulating navbar title
     */
    mockTitleName: string;
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
    children: null
};
export default class AirrSceneRenderer extends PureComponent<Props> {
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
            console.warn("[Airr] Back button handler was not specified.");
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
                "[Airr] No view was set as active" +
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
                        props={this.props.sidepanel.props}
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
interface ChildrenRendererProps {
    children: Props["children"];
}
const ChildrenRenderer = React.memo<ChildrenRendererProps>(function ChildrenRenderer({
    children,
    ...rest
}: ChildrenRendererProps): any {
    return typeof children === "function" ? children(rest) : children;
});
interface MayersRendererProps {
    mayers: Props["mayers"];
}
const MayersRenderer = React.memo<MayersRendererProps>(function MayersRenderer({
    mayers
}: MayersRendererProps): any {
    return mayers.map(
        ({ name, ...props }): ReactNode => {
            return <AirrMayer key={name} name={name} {...props} />;
        }
    );
});
interface SidepanelRendererProps {
    type: ComponentClass<SidepanelProps, any>;
    props: SidepanelProps;
    refCOMPSidepanel: Props["refCOMPSidepanel"];
    visibilityCallback: Props["sidepanelVisibilityCallback"];
}
const SidepanelRenderer = React.memo<SidepanelRendererProps>(function SidepanelRenderer({
    type,
    refCOMPSidepanel,
    visibilityCallback,
    props
}: SidepanelRendererProps): any {
    if (!props.ref) {
        props.ref = refCOMPSidepanel;
    }
    if (!props.visibilityCallback) {
        props.visibilityCallback = visibilityCallback;
    }
    if (typeof props.enabled === "undefined") {
        props.enabled = true; //force explicit value, e.g needed when checking if panel is enabled in `openMayer` method
    }

    return React.createElement(type, props);
});
interface BlankmaskRendererProps {
    GUIDisabled: Props["GUIDisabled"];
    GUIDisableCover: Props["GUIDisableCover"];
}
const BlankmaskRenderer = React.memo<BlankmaskRendererProps>(function BlankmaskRenderer({
    GUIDisabled,
    GUIDisableCover
}: BlankmaskRendererProps): ReactElement<any> {
    return GUIDisabled && <div className="airr-blank-mask">{GUIDisableCover}</div>;
});
interface NavbarRendererProps {
    navbar: Props["navbar"];
    activeViewIndex: number;
    backButtonOnFirstView: Props["backButtonOnFirstView"];
    handleBackButton: Props["handleBackButton"];
    backButton: Props["backButton"];
    navbarMenu: Props["navbarMenu"];
    hasSidepanel: boolean;
    handleMenuButtonToggleSidepanel(e: SyntheticEvent<HTMLElement>): void;
    mockViewTitle: ReactNode;
    activeViewTitle: ReactNode;
    navbarClass: string;
    refDOMNavbar: Props["refDOMNavbar"];
    navbarHeight: Props["navbarHeight"];
}
const NavbarRenderer = React.memo<NavbarRendererProps>(function NavbarRenderer({
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
}: NavbarRendererProps): any {
    if (navbar) {
        let mockTitle = null;
        let title: ReactNode;
        let back = null;

        if (backButton) {
            const backClassName =
                "back " + (activeViewIndex < 1 && !backButtonOnFirstView ? "hidden" : "");
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
                    <div className="menu" onClick={handleMenuButtonToggleSidepanel}>
                        <div />
                    </div>
                ) : null;
            } else if (Array.isArray(navbarMenu)) {
                menu = <div className="menu">{navbarMenu}</div>;
            }
        }

        const navbarStyle: CSSProperties = {};
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
                className={"airr-navbar " + (typeof navbarClass === "string" ? navbarClass : "")}
                ref={refDOMNavbar}
                style={navbarStyle}
            >
                <div style={{ height: navbarHeight + "px" }}>
                    {mockTitle}
                    {back}
                    <div className="title" style={{ opacity: mockViewTitle ? 0 : 1 }}>
                        <span>{title}</span>
                    </div>
                    {menu}
                </div>
            </div>
        );
    }
});
interface ViewsMapperProps {
    views: Props["views"];
    activeViewName: Props["activeViewName"];
    refsCOMPViews: Props["refsCOMPViews"];
}
const ViewsMapper = React.memo<ViewsMapperProps>(function ViewsMapper({
    views,
    activeViewName,
    refsCOMPViews
}: ViewsMapperProps): any {
    return views.map(
        (item): ReactNode => {
            if (item.props.name === activeViewName) {
                item.props.active = true;
            } else {
                item.props.active = false;
            }

            item.props.key = item.props.name;
            if (!item.props.ref) {
                item.props.ref = React.createRef<AirrViewRenderer>();
                refsCOMPViews[item.props.name] = item.props.ref;
            }

            return React.createElement(item.type, item.props);
        }
    );
});
interface ViewsRendererProps extends ViewsMapperProps {
    className: Props["className"];
    refDOMContainer: Props["refDOMContainer"];
    containersHeight: Props["containersHeight"];
}

const ViewsRenderer = React.memo<ViewsRendererProps>(function ViewsRenderer({
    views,
    className = "",
    refDOMContainer,
    activeViewName,
    containersHeight,
    refsCOMPViews
}: ViewsRendererProps): ReactElement<any> {
    return (
        <div
            className={"airr-container " + className}
            ref={refDOMContainer}
            style={containersHeight ? { height: containersHeight } : null}
        >
            <ViewsMapper
                views={views}
                activeViewName={activeViewName}
                refsCOMPViews={refsCOMPViews}
            />
        </div>
    );
});
