# airr-react

This library is set of several React components that allows building mobile apps using React, HTML5 and Cordova.
Airr-react defines few basic classes and features that every UI of mobile app has. It can be your starting point for creating unique apps.

It can be used for:
* creating custom looking and behaving mobile apps,
* rapidly designing prototypes showing you ideas,
* creating common web apps.

To check all main features of library go and see demonstration app:
### [airr-react demo app](http://react.airr.pl) 
browse in Chrome for best experience. 

Libary code was designed to handle WebViews runtimes from Android 4.4+ and iOS8+.

## Prerequisites
Before you continue with project installation make sure you have installed:
* [node.js](https://nodejs.org/en/) 


## Instalation
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

Like Reacts `componentDidMount` method, Airr provides self explanatory methods that can be used by Components that are or act like (use composition) of `AirrView` and `AirrScene` components. These methods are:
* `viewBeforeActivation`
* `viewAfterActivation`
* `viewBeforeDeactivation`
* `viewAfterDeactivation`

You can search for these methods in demo-app code to find out how they are used.

## Usage
For components usage please reffer at the moment to the demo app code. 

## Documentation.
Real docs are planned to be written in the future. 
Methods and properties descriptions aswell as properties specification can be found in library directory at `airr-react/lib`.
For Airr Components descriptions check [the demo app](http://react.airr.pl). 

## License

This project is licensed under the MIT License
