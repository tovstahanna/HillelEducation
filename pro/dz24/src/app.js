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
    headingH1: "Vote for the best icon",
    text: "There is a list of icons that I like. What icon do you like?", 
    menuCl: "main-menu",
    headerItems: [],
    asideItems: []
}));