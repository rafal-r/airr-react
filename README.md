# airr-react

This library is set of several React components that allows building Single Page Apps for desktop and mobile using React.js itself.
Airr-react defines few basic UI classes and features that every app needs.
It can be your starting point for creating unique apps.

It can be used for:

*   creating custom looking and behaving apps,
*   rapidly designing prototypes showing your ideas,
*   creating responsive apps that will handle mobile and desktop rendering.

Create unique apps with minimal or none overwrites upon choosen library styles and structures and keep your DOM tree simple.
Core elements are allready defined and working and the rest is up to you.

To check all main features go and see demonstration app:

**[airr-react mobile demo app](http://react.airr.pl)**

browse in Chrome for best experience.

Libary code was designed to handle WebViews runtimes from Android 4.4+ and iOS8+.

## Prerequisites

Before you continue with project installation make sure you have installed:

*   [node.js](https://nodejs.org/en/)

## Installation

### The simplest

The most easy way to start using airr-react components in your React app is to add it to your allready created project with npm

```
npm install airr-react
```

### The demo

If you want to explore demo app as a code refference just download `demo-app` directory content, open your system console and execute standard installation command on this directory:

```
npm install
```

after that you can perform another known line:

```
npm start
```

to activate react scripts and your local version of demo-app.

### Other

If you are having custom react configuration feel free to investigate airr-react usage on your own. Just install it with npm like in "The simplest" section.

## Airr Components life-cycles

Airr library provides easy to implement app views life-cycles methods.
When you are dealing with mobile app development you have to deal with many tasks before or after certain view is activated and animated into the screen.

Like Reacts `componentDidMount` method, Airr provides self explanatory methods that can be used by Components that extends `ViewWrapper` and `SceneWrapper` components. These methods are:

*   `viewBeforeActivation`
*   `viewAfterActivation`
*   `viewBeforeDeactivation`
*   `viewAfterDeactivation`

You can search for these methods in demo-app code to find out how they are used.

## Usage

For components usage please reffer at the moment to the demo app code.

## Documentation

Real docs are planned to be written in the future.
Methods and properties descriptions aswell as properties specification can be found in library files at `airr-react/lib`.
For Airr Components descriptions check [the demo app](http://react.airr.pl).

### Building project for Cordova

When building your production code using `npm run build` with `react-scripts` remember about proper configuration for specific platforms:

*   Android - add `"homepage": "file:///android_asset/www"` entry to your package.json
*   iOS - snippet will be added soon

## License

Licensed under the MIT License.
Copyright (c) 2017 Rafal Rajtar
