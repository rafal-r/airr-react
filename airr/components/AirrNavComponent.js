import {Component} from 'react';

class AirrNavComponent extends Component {
    customEvents = [];

    onCustom(eventName, handler) {
        if (!Array.isArray(this.customEvents[eventName])) {
            this.customEvents[eventName] = [];
        }
        if (typeof handler === 'function') {
            this.customEvents[eventName].push(handler);
        }
    }

    offCustom(eventName, handler) {
        if (Array.isArray(this.customEvents[eventName])) {
            for (var i = 0; i < this.customEvents[eventName]; i++) {
                if (this.customEvents[eventName][i] === handler) {
                    this.customEvents[eventName].splice(i, 1);
                }
            }
        }
    }

    triggerCustom(eventName) {
        if (Array.isArray(this.customEvents[eventName])) {
            for (var i = 0; i < this.customEvents[eventName].length; i++) {
                this.customEvents[eventName][i].call(this);
            }
        }
    }
}

export default AirrNavComponent;