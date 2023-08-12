import React from 'react';
import { HeadingComponent } from "../components/heading-component.jsx";
import { MenuComponent } from "../components/menu-component.jsx";

export  const HeaderContainer = ({ title, values }) => {
    return (
        <header>
            <HeadingComponent text={title} />
            <MenuComponent id="header" menuCl="header-menu" items={ values } />
        </header>
    );
}