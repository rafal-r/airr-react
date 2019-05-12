import "babel-polyfill";
import React from "react";
import { mount, configure } from "enzyme";
import { Scene, View } from "../airr-react";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("Scene", () => {
    let props;
    let mountedComponent;

    const getComponent = () => {
        if (!mountedComponent) {
            mountedComponent = mount(<Scene {...props} />);
        }
        return mountedComponent;
    };

    beforeEach(() => {
        props = {};
        mountedComponent = undefined;
    });

    it("renders without crashing", () => {
        const div = getComponent();
        expect(div.length).toBeGreaterThan(0);
    });

    it("has proper class attribute", () => {
        const cmp = getComponent();
        const div = cmp.find("AirrSceneRenderer").childAt(0);
        expect(div.is(".airr-view")).toBe(true);
        expect(div.is(".airr-scene")).toBe(true);
    });

    describe("render with one view", () => {
        beforeEach(() => {
            props = {
                animation: "overlay",
                activeViewName: "view-1",
                views: [
                    {
                        type: View,
                        props: {
                            name: "view-1",
                            children: <div className="view-wrapper">Foo</div>
                        }
                    }
                ]
            };
            mountedComponent = undefined;
        });

        it("has views length", () => {
            const cmp = getComponent();
            expect(cmp.props().views.length).toBe(1);
        });

        it("has activeViewName", () => {
            const cmp = getComponent();
            expect(cmp.props().activeViewName).toBe("view-1");
        });
    });
});
