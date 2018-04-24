import "babel-polyfill";
import React from "react";
import ReactDOM from "react-dom";
import "./lib/airr-react.css";
import "./app.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

if (window.cordova) {
    document.addEventListener("deviceready", function() {
        ReactDOM.render(<App />, document.getElementById("root"));
    });
} else {
    ReactDOM.render(<App />, document.getElementById("root"));
}
registerServiceWorker();
