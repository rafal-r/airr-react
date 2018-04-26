import React from "react";
import { ViewWrapper } from "./../../lib/Airr";

export const viewName = "sidepanel";

export default class Sidepanel extends ViewWrapper {
    content() {
        return (
                <div className="wrap col sidepanel-view">
                    {this.props.description}
                    <p className="info">
                        To test this component yourself just make a swipe
                        gesture from currently set side.
                    </p>

                    <div className="header brd-b">Set sidepanel's side</div>

                    <div className="radio-group">
                        <div className="row">
                            <div className="col-3">
                                <span
                                    className={
                                        "radio side " +
                                        (this.props.side === "left"
                                            ? "checked"
                                            : "")
                                    }
                                    data-value="left"
                                    onClick={this.props.handleSideChange}
                                >
                                    <span />
                                </span>
                                <label>Left</label>
                            </div>
                            <div className="col-3">
                                <span
                                    className={
                                        "radio side " +
                                        (this.props.side === "right"
                                            ? "checked"
                                            : "")
                                    }
                                    data-value="right"
                                    onClick={this.props.handleSideChange}
                                >
                                    <span />
                                </span>
                                <label>Right</label>
                            </div>
                            <div className="col-3">
                                <span
                                    className={
                                        "radio side " +
                                        (this.props.side === "top"
                                            ? "checked"
                                            : "")
                                    }
                                    data-value="top"
                                    onClick={this.props.handleSideChange}
                                >
                                    <span />
                                </span>
                                <label>Top</label>
                            </div>
                            <div className="col-3">
                                <span
                                    className={
                                        "radio side " +
                                        (this.props.side === "bottom"
                                            ? "checked"
                                            : "")
                                    }
                                    data-value="bottom"
                                    onClick={this.props.handleSideChange}
                                >
                                    <span />
                                </span>
                                <label>Bottom</label>
                            </div>
                        </div>
                    </div>

                    <div className="header brd-b">Set sidepanel's size</div>

                    <div className="radio-flat-group">
                        <div className="row">
                            <div className="col-4">
                                <span
                                    className={
                                        "radio onethird side " +
                                        (this.props.sizeFactor === 0.33
                                            ? "checked"
                                            : "")
                                    }
                                    data-value={0.33}
                                    onClick={this.props.handleSizeChange}
                                >
                                    <span />
                                </span>
                                <label>
                                    1/3<br />of side
                                </label>
                            </div>
                            <div className="col-4">
                                <span
                                    className={
                                        "radio twothird side " +
                                        (this.props.sizeFactor === 0.66
                                            ? "checked"
                                            : "")
                                    }
                                    data-value={0.66}
                                    onClick={this.props.handleSizeChange}
                                >
                                    <span />
                                </span>
                                <label>
                                    2/3<br />of side
                                </label>
                            </div>
                            <div className="col-4">
                                <span
                                    className={
                                        "radio full side " +
                                        (this.props.sizeFactor === 1
                                            ? "checked"
                                            : "")
                                    }
                                    data-value={1}
                                    onClick={this.props.handleSizeChange}
                                >
                                    <span />
                                </span>
                                <label>
                                    full<br />size
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
        );
    }
}
