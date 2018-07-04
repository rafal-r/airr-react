import React from "react";
import { SceneWrapper, Sidepanel } from "../../../airr-react/Airr";
import HelloWorld, {
    viewName as HelloWorldViewName
} from "../views/HelloWorld";
import CommonView, {
    getNextCommonViewName2,
    viewNameTpl as CommonViewNameTpl
} from "../views/CommonView";

export default class SimpleScene extends SceneWrapper {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            activeViewName: HelloWorldViewName,
            sidepanel: {
                type: Sidepanel,
                props: {
                    side: "top",
                    children: (
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                textAlign: "center",
                                paddingTop: "2rem",
                                color: "white",
                                backgroundColor: "purple"
                            }}
                        >
                            I am the Sidepanel<br />
                            {this.props.handleSidepanelMethod && (
                                <button
                                    style={{ fontSize: "2rem" }}
                                    onClick={
                                        this[this.props.handleSidepanelMethod]
                                    }
                                >
                                    Click me
                                </button>
                            )}
                        </div>
                    ),
                    enabled: false,
                    sizeFactor: 1 / 3,
                    animationTime: 200
                }
            },
            views: this.props.views && [
                this.getFreshViewConfig(CommonViewNameTpl),
                this.getFreshViewConfig(HelloWorldViewName)
            ]
        };
    }

    componentDidMount() {
        //these rules are only added to sustain proper render in storybooks
        const root = document.getElementById("root");
        root.style.height = "100%";
        root.children[0].style.height = "100%";
        root.children[0].children[0].style.height = "100%";

        super.componentDidMount();
    }

    componentWillUnmount() {
        //these rules are only added to sustain proper render in storybooks
        const root = document.getElementById("root");
        root.style.height = "";
        root.children[0].style.height = "";
        root.children[0].children[0].style.height = "";
    }

    goToAnotherView = e => {
        const firstViewName = this.state.views[0].props.name;

        this.changeView(firstViewName, {
            children: (
                <h2 style={{ textAlign: "center" }}>
                    We moved back to previous view.
                </h2>
            )
        });
    };

    pushNewViewFromViewsConfig = e => {
        this.changeView(CommonViewNameTpl, {
            children: (
                <h2 style={{ textAlign: "center" }}>
                    This views was pushed from SimpleScene's `viewsConfig`
                    special object which defines views specifications.
                </h2>
            )
        });
    };

    pushNewViewFromRawConfigDefinition = e => {
        this.changeView({
            type: CommonView,
            props: {
                name: "view-from-raw-config",
                children: (
                    <h2 style={{ textAlign: "center" }}>
                        This views was pushed by passing raw object specifying
                        view's configuration.
                    </h2>
                ),
                style: { backgroundColor: "green" }
            }
        });
    };

    updateCurrentView = e => {
        this.changeView(HelloWorldViewName, {
            children: (
                <h2 style={{ textAlign: "center" }}>
                    The button was removed and this header was render instead.
                    Background color also changed.
                </h2>
            ),
            style: { backgroundColor: "yellow" }
        });
    };

    updateScene = e => {
        this.changeView(
            HelloWorldViewName,
            {
                children: (
                    <h2 style={{ textAlign: "center" }}>
                        The scene was altered. Navbar was added.
                    </h2>
                )
            },
            {
                navbar: true,
                style: { backgroundColor: "green" }
            }
        );
    };

    openSidepanelExample = () => {
        return this.openSidepanel();
    };

    hideSidepanelExample = () => {
        return this.hideSidepanel();
    };

    viewsConfig = {
        [HelloWorldViewName]: {
            type: HelloWorld,
            props: {
                name: HelloWorldViewName,
                title: "This is Title in navbar",
                children: (
                    <button
                        onClick={this[this.props.handleMethod]}
                        style={{ fontSize: "2rem" }}
                    >
                        Click me
                    </button>
                )
            }
        },
        [CommonViewNameTpl]: {
            type: CommonView,
            nameGenerator: getNextCommonViewName2,
            props: { name: null },
            sceneProps: {
                //to change scene state when needed (eg. when activated)
            }
        }
    };
}
