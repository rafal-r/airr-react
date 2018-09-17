# airr-react

This library is set of several React components that helps building Single Page Apps for desktop and mobile apps aswell.  
Airr-react defines few basic UI classes and features that every app needs. The core component is resposible for maintaining navigation in the app.  
It can be your starting point for creating unique apps. 

It can be used for:

*   creating custom looking and behaving apps,
*   rapidly designing prototypes showing your ideas,
*   creating responsive apps that will handle mobile and desktop rendering.

To check all main features please go and see demonstration app:
**[Mobile Demo App](http://react.airr.pl)**

and for documentation (still uncomplete) and intreactive examples check:
**[Storybook](http://react.airr.pl/storybook)**

Browse both examples in Chrome for best experience.  

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
When you are dealing with app development you have to deal with many tasks before or after certain view is activated and animated into the screen.

Like Reacts `componentDidMount` method, Airr provides self explanatory methods that can be used by Components that extends `ViewWrapper` and `SceneWrapper` components. These methods are:

*   `viewBeforeActivation`
*   `viewAfterActivation`
*   `viewBeforeDeactivation`
*   `viewAfterDeactivation`

You can search for these methods in demo-app code to find out how they are used.

## License

Licensed under the MIT License.
Copyright (c) 2018 Rafal Rajtar
