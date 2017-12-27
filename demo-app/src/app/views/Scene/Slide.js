import React, {Component} from 'react';
import {View} from './../../../lib/Airr';

class Slide extends Component {
    render() {
        return (
                <View name={this.props.name} active={this.props.active} width={this.props.width} height={this.props.height} ref="airrView">
                    
                    <div className="wrap col scene-slide">
                        
                        {this.props.isFirst && <p className="text-center">
                            Let's begin views shifting. Tap on `Next` button.
                        </p>}
                        
                        <h1 className="view-number"><span>{this.props.title}</span></h1>
                            
                        <div className="nav">
                            {!this.props.isFirst && <button onClick={this.props.handlePrevClick} className="prev">Prev</button>}
                            <button onClick={this.props.handleNextClick} className="next">Next</button>
                        </div>
                        
                        <div className="header brd-b view-anim-header">
                            Choose view animation:
                        </div>
                        
                        <div className="radio-group">
                            <div className="row">
                                <div className="col-4">
                                    <span className={'radio anim ' + (this.props.animation === 'slide' ? 'checked':'')} data-value="slide" onClick={this.props.handleAnimationChange} >
                                        <span />
                                    </span>
                                    <label>Slide</label>
                                </div>
                                <div className="col-4">
                                    <span className={'radio anim ' + (this.props.animation === 'overlay' ? 'checked':'')} data-value="overlay" onClick={this.props.handleAnimationChange} >
                                        <span />
                                    </span>
                                    <label>Overlay</label>
                                </div>
                                <div className="col-4">
                                    <span className={'radio anim ' + (this.props.animation === 'fade' ? 'checked':'')} data-value="fade" onClick={this.props.handleAnimationChange} >
                                        <span />
                                    </span>
                                    <label>Fade</label>
                                </div>
                            </div>
                        </div>
                    </div> 
                    
                </View>
                );
    }
}
    
export default Slide;