# airr-react

This library is set of several components that helps building Single Page Apps with ReactJS.  
airr-react defines few basic UI classes and features that every app needs. The core component is responsible for maintaining navigation in the app.
All of it when minified and gzipped weights ~13.7kB ([bundlephobia.com](https://bundlephobia.com/result?p=airr-react@2.0.20)).

Library can be used for:

-   creating unique looking and behaving apps,
-   rapidly designing prototypes showing your ideas,
-   creating responsive apps that will handle mobile and desktop rendering.

To check all main features please go and see demonstration app:
**[Mobile Demo App](http://react.airr.pl)**

and for documentation (still uncomplete) and interactive examples check:
**[Storybook](http://react.airr.pl/storybook)**

## Installation

### The library

```
npm i airr-react
```

### The demo

If you want to explore demo app as a code reference just download `demo-app` directory content and perform standard installation procedures. Demo app is created with `create-react-app` so you only need to `npm install; npm start`.

## Example

Here's a simple code usage that provides a viewport with two views.

[![Edit airr-react-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/pz83nwo50)

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { SceneWrapper, ViewWrapper, Sidepanel } from "airr-react";
import "airr-react/dist/airr-react.css";
import "./styles.css";

const BlueViewName = "blue-view";
const RedViewName = "red-view";

class BlueView extends ViewWrapper {
    content() {
        return (
            <div className={BlueViewName}>
                BlueView
                <br />
                <button onClick={this.props.goToRedView}>go to red</button>
                <button onClick={this.props.openSidepanel}>
                    open sidepanel
                </button>
                <button onClick={this.props.openMayer}>open modal</button>
            </div>
        );
    }
}
class RedView extends ViewWrapper {
    content() {
        return (
            <div className={RedViewName}>
                RedView
                <br />
                <button onClick={this.props.goToBlueView}>go to blue</button>
            </div>
        );
    }
}

class Viewport extends SceneWrapper {
    viewsConfig = {
        [BlueViewName]: {
            type: BlueView,
            props: {
                name: BlueViewName,
                goToRedView: () => this.changeView(RedViewName),
                openSidepanel: this.openSidepanel,
                openMayer: () =>
                    this.openMayer({
                        name: "foo-mayer",
                        content: (
                            <div>
                                Hello! I am modal layer!
                                <br />
                                <button
                                    onClick={() => this.closeMayer("foo-mayer")}
                                >
                                    close me
                                </button>
                            </div>
                        )
                    })
            }
        },
        [RedViewName]: {
            type: RedView,
            props: {
                name: RedViewName,
                goToBlueView: () => this.changeView(BlueViewName)
            }
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            activeViewName: BlueViewName,
            sidepanel: {
                type: Sidepanel,
                props: {
                    children: "Hello! I'm sidepanel!"
                }
            },
            views: [
                this.getFreshViewConfig(BlueViewName),
                this.getFreshViewConfig(RedViewName)
            ]
        };
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Viewport />, rootElement);
```

## View's life-cycles

Airr library provides easy to implement views life-cycles methods.
When you develop apps divided into certain views you have to deal with many tasks before or after certain view is activated and animated into the screen.

Like React's `componentDidMount` method, Airr provides self explanatory methods that can be used by Components that extends `ViewWrapper` or `SceneWrapper` components. These methods are:

-   `viewBeforeActivation`
-   `viewAfterActivation`
-   `viewBeforeDeactivation`
-   `viewAfterDeactivation`

`SceneWrapper` or `ViewWrapper` can:

```javascript
class JustView extends ViewWrapper {
    viewBeforeActivation() {
        console.log("JustView will be active soon");
    }
    viewAfterActivation() {
        console.log("JustView was activated soon");
    }
    viewBeforeDeactivation() {
        console.log("JustView will be deactivated");
    }
    viewAfterDeactivation() {
        console.log("JustView is now inactive");
    }
    componentDidUpdate() {
        console.log("JustView was updated");
    }
}
```

Additionaly `SceneWrapper` has:

-   `viewsAnimationEnd(oldViewName: string, newViewName: string)`

```javascript
class BarScene extends SceneWrapper {
    viewsAnimationEnd(oldViewName, newViewName) {
        console.log(
            `[BarScene::viewsAnimationEnd] oldViewName: ${oldViewName}, newViewName: ${newViewName}`
        );
    }

    componentDidMount() {
        super.componentDidMount();
        console.log("Scene did mount");
    }
}
```

## React Component's life-cycles

You can use all well known React's life-cycles methods when extending airr-react's components.  
Only when using `componentDidMount` in the class that extends `SceneWrapper` you must also invoke super's method like:

```javascript
  componentDidMount() {
  	super.componentDidMount()
    console.log("Scene did mount")
  }
```

## Rendering View's content

In the classes that extends `ViewWrapper` (which will be all your views) to render children elements use `content` method instead of `render`:

```javascript
class FooView extends ViewWrapper {
    content() {
        return <div>Hello Foo world!</div>;
    }
}
```

You have to do it this way because core class must set correct properties to the inner view component:

```javascript
export default class AirrViewWrapper extends PureComponent {
    render() {
        return (
            <AirrView {...this.getViewProps()}>{() => this.content()}</AirrView>
        );
    }
}
```

If you would like to overwrite this behaviour, you must do it like this:

```javascript
class FooView extends ViewWrapper {
    render() {
        return (
            <AirrView {...this.getViewProps()}>
                {() => this.myCustomRenderMethodCall()}
                //or
                {this.props.customChildThing}
            </AirrView>
        );
    }
}
```

## License

Licensed under the MIT License.
Copyright (c) 2018 Rafal Rajtar
