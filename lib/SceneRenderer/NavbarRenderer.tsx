import * as React from "react";
import { ReactNode, SyntheticEvent, CSSProperties } from "react";
import { Props } from "../SceneRenderer.d";

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
}: NavbarRendererProps): React.ReactElement {
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
NavbarRenderer.displayName = "NavbarRenderer";
export default NavbarRenderer;
