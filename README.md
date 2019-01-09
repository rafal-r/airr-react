# airr-react

This library is set of several React components that helps building Single Page Apps for desktop and mobile apps as well.  
airr-react defines few basic UI classes and features that every app needs. The core component is responsible for maintaining navigation in the app.
All of it when minified and gzipped weights only ~13.5kB ([bundlephobia.com](https://bundlephobia.com/result?p=airr-react@2.0.20)).  

Library can be used for:

*   creating unique looking and behaving apps,
*   rapidly designing prototypes showing your ideas,
*   creating responsive apps that will handle mobile and desktop rendering.

To check all main features please go and see demonstration app:
**[Mobile Demo App](http://react.airr.pl)**

and for documentation (still uncomplete) and interactive examples check:
**[Storybook](http://react.airr.pl/storybook)**


## Installation

### The library 

```
npm install airr-react
```

### The demo

If you want to explore demo app as a code reference just download `demo-app` directory content, open your system console and execute standard installation and start commands on this directory:

```
npm install;
npm start;
```
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
        BlueView<br />
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
        RedView<br />
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
                Hello! I am modal layer!<br />
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

## Airr Components life-cycles

Airr library provides easy to implement app views life-cycles methods.
When you are dealing with app development you have to deal with many tasks before or after certain view is activated and animated into the screen.

Like Reacts `componentDidMount` method, Airr provides self explanatory methods that can be used by Components that extends `ViewWrapper` and `SceneWrapper` components. These methods are:

*   `viewBeforeActivation`
*   `viewAfterActivation`
*   `viewBeforeDeactivation`
*   `viewAfterDeactivation`

Additionaly `SceneWrapper` has:

* `viewsAnimationEnd(oldViewName: string, newViewName: string)`
 
You can search for these methods in demo-app code to find out how they are used.

## License

Licensed under the MIT License.
Copyright (c) 2018 Rafal Rajtar
