import { PureComponent, SyntheticEvent, ReactNode, RefObject } from "react";
import { Props as MayerProps } from "./Mayer";
import Sidepanel from "./Sidepanel";
import { AnimationType, ViewConfig, NavbarMenu, SidepanelConfig } from "./airr-react";

export type NavbarProp = 1 | true | -1 | 0 | false;
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
    navbar: NavbarProp;
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
     * Array of `mayers` objects that will be render into this Scene. Must contain special Mayer class properties.
     * To check the possible values of properties go to Mayer declaration.
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
     * Inner, private prop for manipulating navbar title
     */
    mockTitleName: string;
    /**
     * Inner, private prop with containers height information
     */
    containersHeight: number;
}
