import React, {Component} from 'react';
import Viewport from './app/Viewport.js';

class App extends Component {
    render() {
        return (
            <Viewport  name="viewport" animation="overlay" width={window.innerWidth} height={window.innerHeight} activeViewName="main-scene"/>
        );
    }
}

export default App;
