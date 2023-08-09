import React from 'react';
import { HeaderContainer } from './header-container.jsx'
import { MenuComponent } from "../components/menu-component.jsx";
import { HeadingComponent } from "../components/heading-component.jsx";

export  const HomeContainer = ({headingH1, text, menuCl, headerItems, asideItems }) => {
    return (
        <main>
            <HeaderContainer title="I am Header" values={headerItems} />
            <div className="container">
                <aside>
                    <MenuComponent id="menu" menuCl={menuCl} items={asideItems} />
                </aside>
                <div className="content">
                    <HeadingComponent text={headingH1} />
                    {text}
                </div>
            </div>
        </main>
    );
}