import React from 'react';
import PropTypes from 'prop-types';
import AirrComponent from './AirrComponent';

class AirrView extends AirrComponent {

    render() {
        let className = 'view';
        let style = this.props.style || {};

        style.width = this.props.width + 'px';
        style.height = this.props.height + 'px';
        this.props.active && (className += ' active');

        return (
            <div className={className} style={style} ref="dom">
                {this.props.children}
            </div>
        );
    }
};

AirrView.propTypes = {
    name: PropTypes.string.isRequired, 
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    title: PropTypes.string, 
    active: PropTypes.bool
};
AirrView.defaultProps = {
    name: '',//the name of the view. Must be unique among others views in scene. Will be used as identification string
    title: '', //titlebar name. if parent scene navbar is enabled, this title will be showed there
    active: false,
    width: null,
    height: null
};

module.exports = AirrView;