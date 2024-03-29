import React from 'react';
import {createRoot} from 'react-dom/client';
import {HomeContainer} from './container/index.jsx';
import "./styles/style.scss";

const App = ({headingH1, text, menuCl, headerItems, asideItems}) => {
    return (
        <HomeContainer headingH1={headingH1} text={text} menuCl={menuCl} headerItems={headerItems} asideItems={asideItems} />
    );
};

const root = createRoot(document.getElementById('app'));
root.render(App({
    headingH1: "My Heading",
    text: "Lorem ipsim text.. Text test here..", 
    menuCl: "main-menu",
    headerItems: ['Header1', 'Header2'],
    asideItems: ['Aside Item 1', 'Aside Item 2', 'Aside Item 3']
}));