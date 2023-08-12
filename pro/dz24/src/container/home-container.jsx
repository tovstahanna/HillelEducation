import React from 'react';
import { HeaderContainer } from './header-container.jsx'
import { MenuComponent } from "../components/menu-component.jsx";
import { HeadingComponent } from "../components/heading-component.jsx";
import { IconSmile } from '../components/icon-component.jsx';

export class HomeContainer extends React.Component {
    constructor(){
        super();
        this.winnerElement = document.createElement('div');
        this.winnerElement.classList.add('winner');
        this.state = { 
            winner: this.winnerElement.innerHTML
        }
        this.onButtonClick = this.onButtonClick.bind(this);
    }

    componentDidMount(){
        
    }

    onButtonClick(){
        const icons = document.getElementById('icons');
        let max = 0;
        for (const child of icons.children) {
            if(child.getAttribute('data-count') > max){
                max = new Number(child.getAttribute('data-count'));
                this.setState({
                    winner: child.getAttribute('data-name')
                });
            }
        }        
    }

    render(){
        const iconList = new Array('em-apple', 'em-avocado', 'em-beetle', 'em-bee');
        const items = iconList.map( (el, index) => <IconSmile key={`icon-${index}`} iconClass={el} /> );
        return (
            <main>
                <HeaderContainer title="I am Header" values={this.props.headerItems} />
                <div className="container">
                    <aside>
                        <MenuComponent id="menu" menuCl={this.props.menuCl} items={this.props.asideItems} />
                    </aside>
                    <div className="content">
                        <HeadingComponent text={this.props.headingH1} />
                        {this.props.text}
                        <div id='icons' className='icons-list'>
                            { items }
                        </div>
                        <button id='result' onClick={this.onButtonClick}>
                            Show the winner
                        </button>
                        { this.state.winner && (
                            <div className='winner1'>The winner is  <i className={`em ${this.state.winner}`}></i></div>
                        )}   
                    </div>
                </div>
            </main>
        );
    }
}