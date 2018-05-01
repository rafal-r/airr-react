import React from "react";
import { SceneWrapper, ViewWrapper } from "./../../../lib/Airr";
import "../css/Tabs.css";

class Tab1 extends ViewWrapper {
    content() {
        return (
            <div className="wrap col tab">
                She wholly fat who window extent either formal. Removing
                welcomed civility or hastened is. Justice elderly but perhaps
                expense six her are another passage. Full her ten open fond walk
                not down. For request general express unknown are. He in just mr
                door body held john down he. So journey greatly or garrets. Draw
                door kept do so come on open mean. Estimating stimulated how
                reasonably precaution diminution she simplicity sir but.
                Questions am sincerity zealously concluded consisted or no
                gentleman it.
            </div>
        );
    }
}
class Tab2 extends ViewWrapper {
    content() {
        return (
            <div className="wrap col tab">
                In to am attended desirous raptures declared diverted confined
                at. Collected instantly remaining up certainly to necessary as.
                Over walk dull into son boy door went new. At or happiness
                commanded daughters as. Is handsome an declared at received in
                extended vicinity subjects. Into miss on he over been late pain
                an. Only week bore boy what fat case left use. Match round scale
                now sex style far times. Your me past an much.
            </div>
        );
    }
}
class Tab3 extends ViewWrapper {
    content() {
        return (
            <div className="wrap col tab">
                If wandered relation no surprise of screened doubtful. Overcame
                no insisted ye of trifling husbands. Might am order hours on
                found. Or dissimilar companions friendship impossible at
                diminution. Did yourself carriage learning she man its replying.
                Sister piqued living her you enable mrs off spirit really.
                Parish oppose repair is me misery. Quick may saw style after
                money mrs.
            </div>
        );
    }
}
class Tab4 extends ViewWrapper {
    content() {
        return (
            <div className="wrap col tab">
                Perpetual sincerity out suspected necessary one but provision
                satisfied. Respect nothing use set waiting pursuit nay you
                looking. If on prevailed concluded ye abilities. Address say you
                new but minuter greater. Do denied agreed in innate. Can and
                middletons thoroughly themselves him. Tolerably sportsmen
                belonging in september no am immediate newspaper. Theirs expect
                dinner it pretty indeed having no of. Principle september she
                conveying did eat may extensive.
            </div>
        );
    }
}

export default class Standard extends SceneWrapper {
    constructor(props) {
        super(props);

        const activeViewName = "tab1";
        const views = [
            {
                type: Tab1,
                props: {
                    name: "tab1",
                    title: "Tab 1"
                }
            },
            {
                type: Tab2,
                props: {
                    name: "tab2",
                    title: "Tab 2"
                }
            },
            {
                type: Tab3,
                props: {
                    name: "tab3",
                    title: "Tab 3"
                }
            },
            {
                type: Tab4,
                props: {
                    name: "tab4",
                    title: "Tab 4"
                }
            }
        ];

        this.state = {
            ...this.state,
            activeViewName,
            animation: "overlay",
            stackMode: false,
            backButtonOnFirstView: true,
            backButton: true,
            navbar: true,
            children: this.renderTabsMenu(views, activeViewName),
            views
        };
    }

    renderTabsMenu = (views, activeTab) => {
        return (
            <div className="tabs-nav">
                <ul>
                    {views.map(item => {
                        return (
                            <li
                                data-view={item.props.name}
                                key={item.props.name}
                                className={
                                    activeTab === item.props.name
                                        ? "active"
                                        : ""
                                }
                                onClick={this.handleNavItemClick}
                            >
                                {item.props.title}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    handleNavItemClick = e => {
        const viewName = e.currentTarget.dataset.view;
        this.setState(
            { children: this.renderTabsMenu(this.state.views, viewName) },
            () => {
                this.changeView(viewName);
            }
        );
    };
}
