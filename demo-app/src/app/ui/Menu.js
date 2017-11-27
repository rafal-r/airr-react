import React from 'react';

function Menu(props) {
    function handleItemClick(e) {
        const item = e.currentTarget;
        item.classList.add('clicked');
        setTimeout(()=> {
            item.classList.remove('clicked');
        }, 300);
        
        props.handleClick(e);
    }    
    
    const items = props.items.map(function(element) {
        return <li key={element.name} data-view={element.name} onClick={handleItemClick}><span className="decor">{'{'}</span><span className="text">{element.name}</span><span className="desc">{element.desc}</span><span className="decor">{'}'}</span></li>
    });
    
    
    return (
        <div className={props.className}>
            {props.title &&
                <div className="col"><h1 className="menu-title">{props.title}</h1></div>
            }
            <ul className="menu">
                {items}
            </ul>            
        </div>
    );
}


export default Menu;