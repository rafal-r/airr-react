# airr-react

This library is set of several components that helps building Single Page Apps with ReactJS.  
airr-react defines few basic UI classes and features that every app needs. The core component is responsible for maintaining navigation in the app.
All of it when minified and gzipped weights ~11.8kB ([bundlephobia.com](https://bundlephobia.com/result?p=airr-react@latest)).

Library can be used for:

-   creating unique looking and behaving apps,
-   rapidly designing prototypes showing your ideas,
-   creating responsive apps that will handle mobile and desktop rendering.

# Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

-   [Installation](#installation)
-   [Usage](#usage)
-   [Concept](#concept)
    -   [PureComponents](#purecomponents)
-   [View's life-cycles](#views-life-cycles)
-   [React Component's life-cycles](#react-components-life-cycles)
-   [Rendering View's content](#rendering-views-content)
-   [Props documentation](#props-documentation)
    -   [SceneWrapper Props](#scenewrapper-props)
    -   [Common types](#common-types)
        -   [AnimationType](#animationtype)
-   [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm i airr-react
```

## Usage

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
                <button onClick={this.props.openSidepanel}>open sidepanel</button>
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
                                <button onClick={() => this.closeMayer("foo-mayer")}>
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
            views: [this.getFreshViewConfig(BlueViewName), this.getFreshViewConfig(RedViewName)]
        };
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Viewport />, rootElement);
```

## Concept

The main concept is to put most of your jsx and html code into the View's components and to render them with `content()` method. That will be classes that extends `ViewWrapper` component.

All of the props and logic will be passed to this views from Scenes - these are classes that extends `SceneWrapper`.
They will be responsible for navigating between views and filling them with data.

### PureComponents

From version 3.0.0 of airr-react all components are implementing PureComponents approach.
So remember that your views will not be updated unless you provide them with different props.

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
        return <AirrView {...this.getViewProps()}>{() => this.content()}</AirrView>;
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

## Props documentation

### SceneWrapper Props

| property                       | type                                      | description                                                                                                                                                                  |
| ------------------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                           | string                                    | The name of the scene. Must be unique among others views in parent scene. Will be used as identification string                                                              |
| activeViewName                 | string                                    | Name of the active view                                                                                                                                                      |
| GUIDisabled                    | boolean                                   | Boolean telling if GUI should be disabled meaning no user actions, events are allowed. GUI is disabled via absolute positioned, not visible div that has the biggest z-Index |
| GUIDisableCover                | ?ReactNode                                | React element to be placed in GUI disabling div                                                                                                                              |
| animation                      | [AnimationType](#animationtype)           | Type of animation to perform when switching views                                                                                                                            |
| animationTime                  | number                                    | Time of views changing animation in miliseconds                                                                                                                              |
| navbar                         | 1                                         | true                                                                                                                                                                         | -1 | 0 | false | Specify if navbar is present (1,true) or not (0,false). Or maybe hidden (-1) |
| navbarHeight                   | number                                    | Height of the navbar in pixels                                                                                                                                               |
| navbarMenu                     | [?NavbarMenu](#navbarmenu)                | Navbar menu is placed on the right most side. Might contain "toggleSidepanel" button or any custom buttons list.                                                             |
| navbarClass                    | string                                    | Extra, space separated, navbar's class list                                                                                                                                  |
| backButton                     | boolean                                   | Boolean specifing if navbar renders BackButton. Placed by default on the left side of navbar.                                                                                |
| backButtonOnFirstView          | boolean                                   | Do you need to still show backButton even if scene is rendering first view from stack?                                                                                       |
| handleBackButton               | ?(e: SyntheticEvent<HTMLElement>) => void | Function that will handle back button click events                                                                                                                           |
| handleBackBehaviourOnFirstView | ?() => void                               | Function that will handle back button clicks events on when first view in stack is active                                                                                    |
| active                         | boolean                                   | Is this view active in parent scene. Readonly. Set by parent Scene.                                                                                                          |
| sidepanel                      | [?SidepanelConfig](#sidepanelconfig)      | Sidepanels configuration declaration. Must contain two properties: `type` and `props`                                                                                        |
| sidepanelVisibilityCallback    | ?(isShown: boolean) => void               | This function will be called when sidepanel changes it's visibility. It's argument will be isShown bool.                                                                     |
| views                          | [ViewConfig[]](#viewconfig)               | Array of `views`. Every view object declaration must contain two properties: `type` and `props`.                                                                             |
|                                |                                           |                                                                                                                                                                              |
|                                |                                           |                                                                                                                                                                              |
|                                |                                           |                                                                                                                                                                              |
|                                |                                           |                                                                                                                                                                              |

### Sidepanel Props

### Common types

##### AnimationType

`"slide" | "overlay" | "fade"`

##### NavbarMenu

`"toggleSidepanl" | ReactNode[]`

##### SidepanelConfig

```javascript
{
    /**
     * reference to class or function that will render AirrSidepanel. Might be AirrSidepanel itself.
     */
    type: ComponentClass<[SidepanelProps](#sidepanel-props), any>;
    /**
     * Special properties of AirrSidepanel class. Go to class declaration for further properties documenation.
     */
    props: SidepanelProps;
}
```

##### ViewConfig

```javascript
{
    /**
     * Refference to class or function that will render AirrView. The most common and adviced approach is to use AirrViewWrapper.
     */
    type: ComponentClass<ViewProps, any>;
    /**
     * Special properties of AirrView class. Go to class declaration for further properties documenation.
     */
    props: ViewProps;
}
```

## License

Licensed under the MIT License.
Copyright (c) 2018 Rafal Rajtar
