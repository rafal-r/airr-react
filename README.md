[![Build Status](https://travis-ci.com/rafal-r/airr-react.svg?branch=master)](https://travis-ci.com/rafal-r/airr-react)
[![Maintainability](https://api.codeclimate.com/v1/badges/c19bd22b21a8c3ffc84a/maintainability)](https://codeclimate.com/github/rafal-r/airr-react/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/rafal-r/airr-react/badge.svg?targetFile=package.json)](https://snyk.io/test/github/rafal-r/airr-react?targetFile=package.json)

<hr/>

# airr-react

This library is set of several components that helps building Single Page Apps with ReactJS.  
airr-react defines few basic UI classes and features that every app needs. The core component is responsible for maintaining navigation in the app.
All of it when minified and gzipped weights ~11.8kB ([bundlephobia.com](https://bundlephobia.com/result?p=airr-react@latest)).

Library can be used for:

-   creating unique looking and behaving apps,
-   creating PWA or standard responsive web apps for dektop, phone and tablet browsers,
-   rapidly designing prototypes showing your ideas.

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
-   [Examples](#examples)
    -   [Kitchen sink app](#kitchen-sink-app)
    -   [Infinite viewport](#infinite-viewport)
    -   [Simple Scene](#simple-scene)
-   [Scene API](#scene-api)
    -   [viewsConfig](#viewsconfig)
    -   [changeView](#changeview)
    -   [openSidepanel](#opensidepanel)
    -   [hideSidepanel](#hidesidepanel)
    -   [openMayer](#openmayer)
    -   [closeMayer](#closemayer)
    -   [Other methods](#other-methods)
-   [Props documentation](#props-documentation)
    -   [Scene Props](#scene-props)
    -   [View Props](#view-props)
    -   [Sidepanel Props](#sidepanel-props)
    -   [Mayer Props](#mayer-props)
    -   [Common types](#common-types)
        -   [AnimationType](#animationtype)
        -   [NavbarMenu](#navbarmenu)
        -   [SidepanelConfig](#sidepanelconfig)
        -   [ViewConfig](#viewconfig)
        -   [Placement](#placement)
        -   [MayerButtonProps](#mayerbuttonprops)
-   [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm i airr-react
```

## Usage

Here's a simple code usage that provides a viewport with two views.

[![Edit airr-react-example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/rafal-r/airr-react-simple-scene)

```javascript
import React from "react";
import ReactDOM from "react-dom";
import { Scene, View, Sidepanel } from "airr-react";
import "airr-react/dist/airr-react.css";
import "./styles.css";

const BlueViewName = "blue-view";
const RedViewName = "red-view";

class BlueView extends View {
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
class RedView extends View {
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

class Viewport extends Scene {
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

`View` class component is responsible for your single view instance. Put all other components that creates you view inside it and render with `content()` method.

Other props and functions that will manage changing of your views can be pass to `View` class from `Scene` class.
The `Scene` is a views container, core class that can fill view with proper methods to navigate between views, open popups and define sidepanel.

### PureComponents

From version 3.0.0 of airr-react all components are implementing PureComponents approach.
So remember that your views will not be updated unless you provide them with different props.

## View's life-cycles

Airr library provides easy to implement views life-cycles methods.
When you develop apps divided into certain views you have to deal with many tasks before or after certain view is activated and animated into the screen.

Like React's `componentDidMount` method, Airr provides self explanatory methods that can be used by Components that extends `View` or `Scene` component. These methods are:

-   `viewBeforeActivation`
-   `viewAfterActivation`
-   `viewBeforeDeactivation`
-   `viewAfterDeactivation`

`Scene` or `View` can:

```javascript
class JustView extends View {
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

Additionaly `Scene` has:

-   `viewsAnimationEnd(oldViewName: string, newViewName: string)`

```javascript
class BarScene extends Scene {
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
Only when using `componentDidMount` in the class that extends `Scene` you must also invoke super's method like:

```javascript
  componentDidMount() {
    super.componentDidMount()
    console.log("Scene did mount")
  }
```

## Rendering View's content

In the classes that extends `View` (which will be all your views) to render children elements use `content` method instead of `render`:

```javascript
class FooView extends View {
    content() {
        return <div>Hello Foo world!</div>;
    }
}
```

You have to do it this way because core class must set correct properties to the inner view component:

```javascript
export default class View<P extends ViewProps = ViewProps, S = {}> extends PureComponent<P, S>
    render(): ReactNode {
        const content: ReactNode = getProperContent(this.content(), this.props.children);

        return <ViewRenderer {...this.getViewProps()}>{content}</ViewRenderer>;
    }
}
```

If you would like to overwrite this behaviour, you must do it like this:

```javascript
import { getViewProps } from "airr-react/dist/CommonViewHelpers";
import ViewRenderer from "airr-react/dist/ViewRenderer";

class FooView extends View {
    render(): ReactNode {
        const content: ReactNode = getProperContent(this.content(), this.props.children);

        return (
            <ViewRenderer {...this.getViewProps()}>
                {() => this.myCustomRenderMethodCall()}
                //or
                {content}
            </ViewRenderer>
        );
    }
}
```

## Examples

### Kitchen sink app

Go to example: [Standard](https://codesandbox.io/s/github/rafal-r/airr-react-demo-app), [Typescript](https://codesandbox.io/s/github/rafal-r/airr-react-demo-app-ts)

> Demon app showing all library features.

### Infinite viewport

Go to example: [Standard](https://codesandbox.io/s/github/rafal-r/airr-react-infinite-viewport), [Typescript](https://codesandbox.io/s/github/rafal-r/airr-react-infinite-viewport-ts)

> In this example you can push unlimited views and play with Scene properties.

### Simple Scene

Go to example: [Standard](https://codesandbox.io/s/github/rafal-r/airr-react-simple-scene), [Typescript](https://codesandbox.io/s/github/rafal-r/airr-react-simple-scene-ts)

> Very simple app from 'Usage' chapter.

## Scene API

Scene class has many helpfull methods to navigate through views and modify Scene properties. Some properties needs to be modify only by using coresponding methods. Which properties requires this approach is described in [Props documentation](#props-documentation) in 'change with method' column.

### viewsConfig

`viewsConfig: ViewsConfig`

> Class member that keep information about views configuraion objects.
> Every key in this object describes another view.
> That configuration later will be used to create new view and add it to state views array.
> Used by ::getFreshViewConfig to deliver new view config.
> This variable is mainly used in crucial components's ::changeView method.

### changeView

`async changeView( view: string | ViewConfig<CommonViewProps>, viewProps: CommonViewProps | {} = {}, sceneProps: SceneProps | {} = {} ): Promise<string | void>`

> Crucial method of the scene component for manipalutaing views and scene properties and performing animations.
> Can change active view with animation or just update view and scene properties.
> Change view by:
>
> -   string name kept in state views array which will lead to view change (with animation) or just update if currently active
> -   string name kept in `this.viewsConfig` which will lead to view push (with animation)
> -   new view config wich will lead to view change

Examples:

-   Go to another view - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/ViewsAPI/GoToAnotherView.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api-ts?module=./src/Scene/ViewsAPI/GoToAnotherView.tsx&moduleview=1)
-   Push new view from views config - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/ViewsAPI/PushNewViewFromViewsConfig.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api-ts?module=./src/Scene/ViewsAPI/PushNewViewFromViewsConfig.tsx&moduleview=1)
-   Push new view from raw config definition - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/ViewsAPI/PushNewViewFromRawConfigDefinition.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api-ts?module=./src/Scene/ViewsAPI/PushNewViewFromRawConfigDefinition.tsx&moduleview=1)
-   Update current, active view - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/ViewsAPI/UpdateCurrentView.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api-ts?module=./src/Scene/ViewsAPI/UpdateCurrentView.tsx&moduleview=1)
-   Update scene - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/ViewsAPI/UpdateScene.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/ViewsAPI/UpdateScene.tsx&moduleview=1)

### openSidepanel

`openSidepanel(): Promise<boolean | void>`

> Opens sidepanel if was previously defined

Example:

-   Manually open sidepanel - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/SidepanelAPI/OpenSidepanel.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api-ts?module=./src/Scene/SidepanelAPI/OpenSidepanel.tsx&moduleview=1)

### hideSidepanel

`hideSidepanel(): Promise<boolean | void>`

> Hides sidepanel

Example:

-   Manually hide sidepanel - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/SidepanelAPI/HideSidepanel.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api-ts?module=./src/Scene/SidepanelAPI/HideSidepanel.tsx&moduleview=1)

### openMayer

`openMayer(config: MayerProps): Promise<void>`

> Add new mayer to this.state.mayers configurations array.
> This will immediatelly open new mayer.

Example:

-   Manually open modal layer - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/MayersAPI/OpenMayer.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api-ts?module=./src/Scene/MayersAPI/OpenMayer.tsx&moduleview=1)

### closeMayer

`closeMayer(name: string): Promise<void>`

> Close mayer by its name.

Examples:

-   Close mayer by prop drilling - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/MayersAPI/CloseMayer.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api-ts?module=./src/Scene/MayersAPI/CloseMayer.tsx&moduleview=1)
-   Close mayer by mayer button config - [standard](https://codesandbox.io/s/github/rafal-r/airr-react-components-api?module=./src/Scene/MayersAPI/CloseMayerFromButtonsConfig.js&moduleview=1), [typescript](https://codesandbox.io/s/github/rafal-r/airr-react-components-api-ts?module=./src/Scene/MayersAPI/CloseMayerFromButtonsConfig.tsx&moduleview=1)

### Other methods

For more detailed documentation of these methods please go to lib/Scene.tsx file. As everything is typescripted now I hope finding good information will not be a problem.

> getFreshViewConfig - very usefull for getting new view config from viewsConfig variable.

> filterViews - removes views that are not pointed in array.

> popView - go back one view and removes currently active view.

> destroyView - removes view from Scene views property.

> handleBackButton - utility function. Overwrite it in your Scene class to define back button click behaviour. On default it pops view out.

> setSidepanelConfig - special function for enabling sidepanel config after mounting of scene. It will ensure proper sidepanel size (width,height) after incjeting it into DOM.

> disableSidepanel - self explanatory.

> enableSidepanel - self explanatory.

> goToView - action dispatcher method. It will return a function ready to fire view change.

> isValidViewConfig - checks wheter object is valid view config and can be added to view's array.

> hasViewInConfig - checks if view's name is described by some config in `this.viewsConfig` object.

> hasViewInState - checks if view recognized by name argument is present in state.

> getViewIndex - self explanatory.

## Props documentation

### Scene Props

| property                       | type                                      | description                                                                                                                                                                  | change with method                                                                                                                                               |
| ------------------------------ | ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name                           | string (required)                         | The name of the scene. Must be unique among others views in parent scene. Will be used as identification string                                                              | setState                                                                                                                                                         |
| activeViewName                 | string                                    | Name of the active view                                                                                                                                                      | setState                                                                                                                                                         |
| GUIDisabled                    | boolean                                   | Boolean telling if GUI should be disabled meaning no user actions, events are allowed. GUI is disabled via absolute positioned, not visible div that has the biggest z-Index | setState                                                                                                                                                         |
| GUIDisableCover                | ?ReactNode                                | React element to be placed in GUI disabling div                                                                                                                              | setState                                                                                                                                                         |
| animation                      | [AnimationType](#animationtype)           | Type of animation to perform when switching views                                                                                                                            | setState                                                                                                                                                         |
| animationTime                  | number                                    | Time of views changing animation in miliseconds                                                                                                                              | setState                                                                                                                                                         |
| navbar                         | 1 / true / -1 / 0 / false                 | Specify if navbar is present (1,true) or not (0,false). Or maybe hidden (-1)                                                                                                 | setState                                                                                                                                                         |
| navbarHeight                   | number                                    | Height of the navbar in pixels                                                                                                                                               | setState                                                                                                                                                         |
| navbarMenu                     | [?NavbarMenu](#navbarmenu)                | Navbar menu is placed on the right most side. Might contain "toggleSidepanel" button or any custom buttons list.                                                             | setState                                                                                                                                                         |
| navbarClass                    | string                                    | Extra, space separated, navbar's class list                                                                                                                                  | setState                                                                                                                                                         |
| backButton                     | boolean                                   | Boolean specifing if navbar renders BackButton. Placed by default on the left side of navbar.                                                                                | setState                                                                                                                                                         |
| backButtonOnFirstView          | boolean                                   | Do you need to still show backButton even if scene is rendering first view from stack?                                                                                       | setState                                                                                                                                                         |
| handleBackButton               | ?(e: SyntheticEvent<HTMLElement>) => void | Function that will handle back button click events                                                                                                                           | setState                                                                                                                                                         |
| handleBackBehaviourOnFirstView | ?() => void                               | Function that will handle back button clicks events on when first view in stack is active                                                                                    | setState                                                                                                                                                         |
| sidepanel                      | [?SidepanelConfig](#sidepanelconfig)      | Sidepanels configuration declaration. Must contain two properties: `type` and `props`                                                                                        | setState (for side, sizeFactor, animationTime,bgLayerOpacity), openSidepanel and hideSidepanel (for isShown), enableSidepanel and disableSidepanel (for enabled) |
| sidepanelVisibilityCallback    | ?(isShown: boolean) => void               | This function will be called when sidepanel changes it's visibility. It's argument will be isShown bool.                                                                     | setState                                                                                                                                                         |
| views                          | [ViewConfig[]](#viewconfig)               | Array of `views`. Every view object declaration must contain two properties: `type` and `props`.                                                                             | changeView                                                                                                                                                       |
| mayers                         | [MayerProps[]](#mayer-props)              | Array of `mayers` objects that will be render into this Scene. Must contain special AirrMayer class properties.                                                              | openMayer, closeMayer                                                                                                                                            |
| title                          | ReactNode                                 | Title that will be use in parent Scene navbar title section                                                                                                                  | setState                                                                                                                                                         |
| className                      | string                                    | Extra, space separated classes names to use upon first div element.                                                                                                          | setState                                                                                                                                                         |
| children                       | ReactNode                                 | Children to be render in Scene's container. Might be useful for creating navigation UI.                                                                                      | setState                                                                                                                                                         |
| stackMode                      | boolean                                   | This propety changes behaviour of views animation when overlay animation is set                                                                                              | setState                                                                                                                                                         |
| active                         | boolean                                   | Determine if this scene is active. Set by parent scene. Readonly.                                                                                                            | none                                                                                                                                                             |

### View Props

| property          | type              | description                                                                                                          |
| ----------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------- |
| name              | string (required) | The name of the view. Must be unique among others views in scene. Will be used as identification string              |
| title             | ReactNode         | Titlebar name. If parent scene navbar is enabled, this title will be showed there. Might be string or React element. |
| active            | boolean           | Determine if this view is active. Set by parent scene. Readonly.                                                     |
| className         | string            | Extra classes to use. Space separetad string list.                                                                   |
| style             | ?CSSProperties    | Extra styles to use upon root DOM element of view.                                                                   |
| [propname:string] | any               | Any property you will need to populate into the view                                                                 |

### Sidepanel Props

| property       | name                    | description                                                                                                                                    |
| -------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| side           | [Placement](#placement) | Side to which sidepanel will be attached                                                                                                       |
| isShown        | boolean                 | Bool determining if sidepanel is shown or not. Use Scene's methods (openSidepanel,closeSidepanel) to manipulate this bool. Do no set manually. |
| enabled        | boolean                 | Bool determining if sidepanel is enabled.                                                                                                      |
| sizeFactor     | number                  | Number between 0 and 1 determining how much size of whole screen sidepanel will take                                                           |
| animationTime  | number                  | Animation time in miliseconds                                                                                                                  |
| bgLayerOpacity | number                  | Opacity between 0 and 1                                                                                                                        |

### Mayer Props

| property      | name                                     | description                                                                                         |
| ------------- | ---------------------------------------- | --------------------------------------------------------------------------------------------------- |
| name          | string (required)                        | The name of the mayer. Must be unique among others mayers in scene. Will be used as identification. |
| style         | ?CSSProperties                           | Extra styles to apply on Mayer's DOM element                                                        |
| appearFrom    | [Placement](#placement)                  | Side from which mayer content box will enter                                                        |
| leaveTo       | [Placement](#placement)                  | Side to which mayer content box will leave                                                          |
| content       | ?ReactNode                               | Content of mayer                                                                                    |
| buttons       | ?[MayerButtonProps[]](#mayerbuttonprops) | Array with buttons configuration                                                                    |
| animationTime | number                                   | Time in miliseconds of mayer's appear/disappear animation                                           |

### Common types

#### AnimationType

`"slide" | "overlay" | "fade"`

#### NavbarMenu

`"toggleSidepanel" | ReactNode[]`

#### SidepanelConfig

Object defined with:

| property name |                          type                           |                                                                                             description |
| ------------- | :-----------------------------------------------------: | ------------------------------------------------------------------------------------------------------: |
| type          | ComponentClass<[SidepanelProps](#sidepanel-props), any> |            Reference to class or function that will render AirrSidepanel. Might be AirrSidepanel itself |
| props         |           [SidepanelProps](#sidepanel-props)            | Special properties of AirrSidepanel class. Go to class declaration for further properties documenation. |

#### ViewConfig

Object defined with:

| property name |                      type                      |                                                                                                                                description |
| ------------- | :--------------------------------------------: | -----------------------------------------------------------------------------------------------------------------------------------------: |
| type          | ComponentClass<[ViewProps](#views-props), any> | Refference to class or function that will render AirrView. The most common and adviced approach is to specify class that extends AirrView. |
| props         |           [ViewProps](#views-props)            |                                         Special properties of AirrView class. Go to class declaration for further properties documenation. |

#### Placement

`"top" | "bottom" | "left" | "right"`

#### MayerButtonProps

| property  | name                                            | description                                                                 |
| --------- | ----------------------------------------------- | --------------------------------------------------------------------------- |
| className | string                                          | Extra class names to use upon button                                        |
| attrs     | ?CSSProperties                                  | Extra attributes to apply on HTML element                                   |
| style     | ?CSSProperties                                  | Additional inline styles                                                    |
| close     | boolean                                         | Optional bool that will automatically add close functionality to the button |
| handler   | ?(e: SyntheticEvent<HTMLButtonElement>) => void | OnClick function handler                                                    |
| children  | ?ReactNode                                      | Content to render inside button element                                     |

## License

Licensed under the MIT License.
Copyright (c) 2018 Rafal Rajtar
