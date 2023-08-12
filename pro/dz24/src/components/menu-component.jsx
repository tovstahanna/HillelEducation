import React from 'react';

export const MenuComponent = ( { id, menuCl = '', items = [] } ) => {
    return (
        <ul className={menuCl}>
            {
                items.map( 
                    (el, index) => <li key={`elementli-${index}`}>{el}</li>
                    //React.createElement('li', {key: `elementli-${index}`}, el.toLowerCase())
                )
            }
        </ul>
    )

    // return React.createElement('ul',
    //     {
    //         key: id,
    //         className: menuCl
    //     },
    //     items.map( 
    //         (el, index) => React.createElement('li', {key: `elementli-${index}`}, el.toLowerCase())
    //     )
    // )
}