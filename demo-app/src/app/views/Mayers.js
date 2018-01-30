import React, {Component} from 'react';
import {View} from './../../lib/Airr';

class Mayers extends Component {
    
    constructor() {
        super();
        this.handleRadioChange = this.handleRadioChange.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
        
        this.state = {
            content: 'This is the content of mayer',
            appearFrom: 'top',
            leaveTo: 'top'
        };
    }

    handleTextChange(e) {
        this.setState({content: e.target.value});
    }

    handleOpen(e) {
        this.props.handleMayerOpen(e, {
            appearFrom: this.state.appearFrom,
            leaveTo: this.state.leaveTo,
            content: this.state.content
        });
    }

    viewAfterActivation() {
        console.log('Mayer viewAfterActivation');
    }

    viewAfterDeactivation() {
        console.log('Mayer viewAfterDeactivation');
    }

    viewBeforeActivation(endCallback) {
        console.log('Mayer viewBeforeActivation');
        endCallback();
    }

    viewBeforeDeactivation(endCallback) {
        console.log('Mayer viewBeforeDeactivation');
        endCallback();
    }

    componentWillMount() {
        console.log('Mayers component will mount');
    }

    componentDidMount() {
        console.log('Mayers component did mount');
    }

    componentWillUnmount() {
        console.log('Mayers component unmounted');
    }

    handleRadioChange(e) {
        if (e.target.classList.contains('appearFrom')) {
            this.setState({appearFrom: e.target.dataset.value});
        }
        
        if (e.target.classList.contains('leaveTo')) {
            this.setState({leaveTo: e.target.dataset.value});
        }
    }

    render() {
        return (
            <View name={this.props.name} active={this.props.active} ref="airrView">
                <div className="wrap col mayers-view">
                    {this.props.description}
                    <div className="btn-ctn">
                        <button onClick={this.handleOpen}>Open mayer</button>
                    </div>                    
                    <p className="info">
                        Below You can specify from which direction on the screen Mayer will appear and leave.
                    </p>

                    <div className="anim-ctn">
                        <div className="col-6">
                            <div className="header">
                            Appear moving<br/>from
                            </div>

                            <div className="radio-group">
                                <div className="row">
                                    <div className="col-6">
                                        <span className={'radio appearFrom ' + (this.state.appearFrom === 'top' ? 'checked':'')} data-value="top" onClick={this.handleRadioChange} >
                                            <span />
                                        </span>
                                        <label>Top</label>
                                    </div>
                                    <div className="col-6">
                                        <span className={'radio appearFrom ' + (this.state.appearFrom === 'bottom' ? 'checked':'')} data-value="bottom" onClick={this.handleRadioChange} >
                                            <span />
                                        </span>
                                        <label>Bottom</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <span className={'radio appearFrom ' + (this.state.appearFrom === 'left' ? 'checked':'')} data-value="left" onClick={this.handleRadioChange} >
                                            <span />
                                        </span>
                                        <label>Left</label>
                                    </div>
                                    <div className="col-6">
                                        <span className={'radio appearFrom ' + (this.state.appearFrom === 'right' ? 'checked':'')} data-value="right" onClick={this.handleRadioChange} >
                                            <span />
                                        </span>
                                        <label>Right</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-6">
                            <div className="header">
                                Leave moving<br/>to
                            </div>

                            <div className="radio-group">
                                <div className="row">
                                    <div className="col-6">
                                        <span className={'radio leaveTo ' + (this.state.leaveTo === 'top' ? 'checked':'')} data-value="top" onClick={this.handleRadioChange} >
                                            <span />
                                        </span>
                                        <label>Top</label>
                                    </div>
                                    <div className="col-6">
                                        <span className={'radio leaveTo ' + (this.state.leaveTo === 'bottom' ? 'checked':'')} data-value="bottom" onClick={this.handleRadioChange} >
                                            <span />
                                        </span>
                                        <label>Bottom</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-6">
                                        <span className={'radio leaveTo ' + (this.state.leaveTo === 'left' ? 'checked':'')} data-value="left" onClick={this.handleRadioChange} >
                                            <span />
                                        </span>
                                        <label>Left</label>
                                    </div>
                                    <div className="col-6">
                                        <span className={'radio leaveTo ' + (this.state.leaveTo === 'right' ? 'checked':'')} data-value="right" onClick={this.handleRadioChange} >
                                            <span />
                                        </span>
                                        <label>Right</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div>
                        <textarea onChange={this.handleTextChange} rows="5" value={this.state.content} />
                    </div>
                </div>
            </View>);
    }
    
}

export default Mayers;