import React, {Component} from 'react';

class Nav extends Component {
    dom;
    centerX;

    getTranslateValue() {
        let active = this.dom.querySelector('.active');
        return this.centerX - (active.offsetLeft + active.clientWidth / 2);
    }

    updateTranslateValue() {
        this.dom.style.webkitTransform = 'translate3d(' + this.getTranslateValue() + 'px,0,0)';
        this.dom.style.transform = 'translate3d(' + this.getTranslateValue() + 'px,0,0)';
    }

    componentDidMount()  {
        this.centerX = this.dom.parentNode.clientWidth / 2;
        this.updateTranslateValue();
    }


    componentDidUpdate(nextProps) {
        console.log('componentDidUpdate');

       this.updateTranslateValue();
    }

    handleItemClick(e) {
        return this.props.handleClick(e, e.target.dataset.action);
    }

    render() {
        console.log('Nav render');

        let options = [];
        this.props.views.forEach((view,i) => {
            options.push(<div className={this.props.activeViewName === view.props.name ? 'active' : ''} data-action={view.props.name} key={view.props.name} onClick={e => this.handleItemClick(e)}>{i + 1}</div>);
        });

        return (
            <div id="nav" style={{zIndex: 104}} ref={(dom) => this.dom = dom}>
                {options}
            </div>
        );
    }
}

export default Nav;