import React from "react";
import { SceneWrapper } from "../../../airr-react/Airr";
import HelloWorld, {
    viewName as HelloWorldViewName
} from "../views/HelloWorld";
import CommonView, {
    getNextCommonViewName,
    viewNameTpl as CommonViewNameTpl
} from "../views/CommonView";
import "../../css/InfiniteViewport.css";
import { colors } from "./colors";

export default class InfiniteViewport extends SceneWrapper {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            activeViewName: HelloWorldViewName,
            views: [this.getFreshViewConfig(HelloWorldViewName)],
            children: this.renderTabsMenu
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

    static getDerivedStateFromProps(nextProps, prevState) {
        return Object.assign(prevState, nextProps, {
            views: prevState.views,
            activeViewName: prevState.activeViewName
        });
    }

    handleNextClick = () => {
        const color = colors[Math.floor(Math.random() * colors.length)];
        const number =
            this.state.views[this.state.views.length - 1].props.number + 1;

        this.changeView(CommonViewNameTpl, {
            children: "Common view number " + number,
            title: "View number " + number,
            color,
            style: { backgroundColor: color },
            number
        });
    };

    renderTabsMenu = ({ views }) => {
        return (
            <nav className="infinite-viewport-nav">
                <div className="views-links">
                    {views.map(item => (
                        <span
                            style={item.props.style}
                            key={item.props.name}
                            onClick={() => {
                                this.changeView(item.props.name);
                            }}
                        >
                            {item.props.number}
                        </span>
                    ))}
                </div>
                <button className="add-new" onClick={this.handleNextClick}>
                    push new
                </button>
            </nav>
        );
    };

    viewsConfig = {
        [HelloWorldViewName]: {
            type: HelloWorld,
            props: {
                name: HelloWorldViewName,
                number: 1,
                title: "Hello World!",
                color: "white",
                style: { backgroundColor: "white" }
            },
            sceneProps: {
                //to change scene state when needed (eg. when activated)
            }
        },
        [CommonViewNameTpl]: {
            type: CommonView,
            nameGenerator: getNextCommonViewName,
            props: { name: null },
            sceneProps: {
                //to change scene state when needed (eg. when activated)
            }
        }
    };
}
